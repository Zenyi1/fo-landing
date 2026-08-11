"use client";

import { useEffect, useRef } from "react";

/* A field of dots that gathers into a double helix, then a microscope, then a
   page of text, and scatters between each, on a 16 second loop.

   Ported from the prototype in `Morphing Dots.html`, which ran on that tool's
   `window.CompositionStage` engine. The geometry and the timing are its; the
   engine is not, so the cue table below is computed from the scene durations
   rather than read off a global, and the loop is a plain requestAnimationFrame.

   It draws to a canvas rather than to SVG. Four hundred circles re-rendered
   through React sixty times a second is thousands of DOM writes per frame; a
   canvas is one. The prototype's glow filter is dropped for the same reason: a
   full-frame Gaussian blur every frame is not worth what it costs. */

const W = 1920;
const H = 1080;
const CX = W / 2;
const CY = H / 2;

/* VIEW is the window the SHAPES are sized against: the prototype draws them in
   1920x1080 but they only occupy the middle of it, so cropping to this keeps
   every coordinate below exactly as authored and still fills the column. */
const VIEW = { x: 560, y: 40, w: 800, h: 1000 };

/* FIELD is the window the DOTS are free to wander in. It is wide, so the drift
   spreads sideways across the hero, and exactly one box tall, so it cannot
   reach the section above or the one below.

   The vertical bound is enforced twice over. The canvas is only ever as tall as
   its layout box, and a canvas clips anything drawn past its own bitmap, so
   nothing can escape upward or downward whatever the maths does. On top of that
   the scatter is held inside SAFE below, which is solved so that no dot ever
   reaches an edge to be clipped in the first place. The clip is the guarantee;
   SAFE is what keeps it invisible. */
const FIELD_X = 1.7;
const FIELD_Y = 1;
const FIELD = { w: VIEW.w * FIELD_X, h: VIEW.h * FIELD_Y };

// drift: generous sideways, restrained vertically
const DRIFT_X = { min: 30, range: 70 };
const DRIFT_Y = { min: 16, range: 30 };
const MAX_R = 10.5;

// the whole field breathes and rocks, so a held shape is never fully still
const BREATHE = 0.022;
const ROCK_DEG = 1.6;
const ROCK = (ROCK_DEG * Math.PI) / 180;

/* How far from centre a dot may be scattered and still be inside the canvas
   once everything downstream has been applied to it: its own drift, its own
   radius, the breathe scale, and the rock rotation, which trades one axis
   against the other and so has to be solved for both together.

   Derived rather than eyeballed, because a hand-picked margin that only
   accounted for drift and radius came out 20 units over and clipped the top and
   bottom rows on every rock. */
const SAFE = {
  x:
    (FIELD.w / 2 / (1 + BREATHE) - (FIELD.h / 2) * Math.sin(ROCK)) /
      Math.cos(ROCK) -
    (DRIFT_X.min + DRIFT_X.range) -
    MAX_R,
  y:
    (FIELD.h / 2 / (1 + BREATHE) - (FIELD.w / 2) * Math.sin(ROCK)) /
      Math.cos(ROCK) -
    (DRIFT_Y.min + DRIFT_Y.range) -
    MAX_R,
};

const COUNT = 420;
const TOTAL = 16;

/* Authored seconds per scene, in order. These sum to TOTAL, which is what lets
   the loop close on itself with no seam. */
const SCENES = [
  ["Drift", 1.6],
  ["DNA", 3.2],
  ["Break1", 1.6],
  ["Microscope", 3.2],
  ["Break2", 1.6],
  ["Document", 3.2],
  ["Return", 1.6],
] as const;

const CUES: Record<string, number> = {};
SCENES.reduce((t, [name, dur]) => {
  CUES[name] = t;
  return t + dur;
}, 0);

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeInCubic = (t: number) => t * t * t;

const ramp = (
  t: number,
  start: number,
  end: number,
  ease: (n: number) => number,
) => ease(clamp((t - start) / (end - start), 0, 1));

/* ── geometry ─────────────────────────────────────────────────────────────
   Deterministic throughout: the scatter is hashed from a fixed seed so the
   server and the client lay out the same field. */

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type P = [number, number];

const circlePts = (cx: number, cy: number, r: number, steps: number): P[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as P;
  });

const quadPts = (p0: P, p1: P, p2: P, steps: number): P[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return [
      u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
      u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    ] as P;
  });

const closed = (pts: P[]): P[] => pts.concat([pts[0]]);

// even spacing along a set of polylines, by cumulative arc length, so a dot
// never bunches at a corner
function sampleStrokes(strokes: P[][], n: number) {
  const segs: { a: P; b: P; len: number; acc: number }[] = [];
  let total = 0;
  for (const line of strokes) {
    for (let i = 0; i < line.length - 1; i++) {
      const a = line[i];
      const b = line[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len > 0.0001) {
        segs.push({ a, b, len, acc: total });
        total += len;
      }
    }
  }
  const out: { x: number; y: number }[] = [];
  let si = 0;
  for (let k = 0; k < n; k++) {
    const d = ((k + 0.5) / n) * total;
    while (si < segs.length - 1 && segs[si].acc + segs[si].len < d) si++;
    const s = segs[si];
    const t = clamp((d - s.acc) / s.len, 0, 1);
    out.push({
      x: s.a[0] + (s.b[0] - s.a[0]) * t,
      y: s.a[1] + (s.b[1] - s.a[1]) * t,
    });
  }
  return out;
}

function dnaPoints(n: number) {
  const pts: { x: number; y: number }[] = [];
  const strandN = Math.round((n * 0.68) / 2);
  const rungCount = 13;
  const rungN = Math.max(1, Math.round((n - strandN * 2) / rungCount));
  const top = 130;
  const bot = 950;
  const amp = 165;
  const turns = 2.15;
  const strandX = (t: number, phase: number) =>
    CX + amp * Math.sin(t * Math.PI * 2 * turns + phase);
  for (let s = 0; s < 2; s++) {
    const phase = s * Math.PI;
    for (let i = 0; i < strandN; i++) {
      const t = i / (strandN - 1);
      pts.push({ x: strandX(t, phase), y: top + t * (bot - top) });
    }
  }
  for (let r = 0; r < rungCount; r++) {
    const t = (r + 0.5) / rungCount;
    const x0 = strandX(t, 0);
    const x1 = strandX(t, Math.PI);
    const y = top + t * (bot - top);
    for (let i = 0; i < rungN; i++) {
      const u = rungN === 1 ? 0.5 : i / (rungN - 1);
      pts.push({ x: x0 + (x1 - x0) * u, y });
    }
  }
  while (pts.length < n) pts.push(pts[pts.length % strandN]);
  return pts.slice(0, n);
}

const microscopePoints = (n: number) =>
  sampleStrokes(
    [
      closed([
        [930, 150],
        [1010, 150],
        [1010, 245],
        [930, 245],
      ]), // eyepiece
      closed([
        [912, 245],
        [1028, 245],
        [1028, 520],
        [912, 520],
      ]), // body tube
      closed([
        [934, 520],
        [1006, 520],
        [990, 590],
        [950, 590],
      ]), // objective
      closed([
        [780, 612],
        [1150, 612],
        [1150, 654],
        [780, 654],
      ]), // stage
      closed([
        [1086, 654],
        [1146, 654],
        [1146, 856],
        [1086, 856],
      ]), // stand
      closed([
        [742, 856],
        [1198, 856],
        [1240, 930],
        [700, 930],
      ]), // base
      quadPts([1028, 300], [1230, 430], [1146, 690], 34), // arm
      circlePts(1218, 606, 40, 26), // focus knob
      circlePts(960, 596, 26, 18), // lens
    ],
    n,
  );

const documentPoints = (n: number) =>
  sampleStrokes(
    [
      [
        [660, 140],
        [1120, 140],
        [1258, 288],
        [1258, 940],
        [660, 940],
        [660, 140],
      ],
      [
        [1120, 140],
        [1120, 288],
        [1258, 288],
      ], // the folded corner
      [
        [726, 372],
        [1010, 372],
      ],
      [
        [726, 412],
        [1010, 412],
      ],
      [
        [726, 520],
        [1190, 520],
      ],
      [
        [726, 586],
        [1190, 586],
      ],
      [
        [726, 652],
        [1190, 652],
      ],
      [
        [726, 718],
        [1190, 718],
      ],
      [
        [726, 784],
        [1190, 784],
      ],
      [
        [726, 850],
        [982, 850],
      ],
    ],
    n,
  );

/* Hues walk the colour wheel by the golden angle, so no two neighbours in the
   field land on the same colour. Held to one saturation and lightness band, so
   it reads as many sources rather than as confetti. Change the two numbers in
   `fill` to pull the whole field toward the page accent. */
function buildField(n: number, seed: number) {
  const rnd = mulberry32(seed);
  const scatter = Array.from({ length: n }, (_, i) => ({
    // spread across the roaming field, inside the safe extent so nothing is
    // ever carried to an edge and cut
    x: CX - SAFE.x + rnd() * SAFE.x * 2,
    y: CY - SAFE.y + rnd() * SAFE.y * 2,
    ax: DRIFT_X.min + rnd() * DRIFT_X.range,
    ay: DRIFT_Y.min + rnd() * DRIFT_Y.range,
    fx: 1 + Math.floor(rnd() * 3),
    fy: 1 + Math.floor(rnd() * 3),
    px: rnd(),
    py: rnd(),
    r: 4 + rnd() * 6.5,
    d: rnd() * 0.42,
    fill: `hsl(${((i * 137.508 + rnd() * 14) % 360).toFixed(1)} 52% ${(60 + rnd() * 10).toFixed(1)}%)`,
    op: 0.72 + rnd() * 0.28,
  }));

  /* Targets are matched to dots by angle around the centre rather than by
     index. Without it a dot on the left of the field would be assigned a point
     on the right and the whole cloud would cross over itself on every gather. */
  const ang = (p: { x: number; y: number }) => Math.atan2(p.y - CY, p.x - CX);
  const order = scatter
    .map((_, i) => i)
    .sort((a, b) => ang(scatter[a]) - ang(scatter[b]));
  const targets = [dnaPoints(n), microscopePoints(n), documentPoints(n)].map(
    (pts) => {
      const sorted = pts.slice().sort((a, b) => ang(a) - ang(b));
      const mapped = new Array<{ x: number; y: number }>(n);
      order.forEach((pi, k) => {
        mapped[pi] = sorted[k];
      });
      return mapped;
    },
  );

  return { scatter, targets };
}

// when each shape starts pulling together, and when it lets go again
const WINDOWS = [
  { gather: CUES.DNA - 0.6, release: CUES.Break1 - 0.3 },
  { gather: CUES.Microscope - 0.4, release: CUES.Break2 - 0.3 },
  { gather: CUES.Document - 0.4, release: CUES.Return },
];

export function HeroMorph() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const field = buildField(COUNT, 7);
    let dpr = 1;
    let cw = 0;
    let ch = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = el.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      el.width = Math.round(cw * dpr);
      el.height = Math.round(ch * dpr);
    };

    const draw = (T: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      /* The canvas is wider than its layout box, so the scale is taken
         from the box rather than from the canvas: a shape stays exactly the
         size it would be if the canvas were not oversized, and all the extra
         pixels go to the drift. Everything is then drawn relative to the
         canvas centre, which is where the shapes' centre sits. */
      const s = Math.min(cw / FIELD_X / VIEW.w, ch / FIELD_Y / VIEW.h);

      const breathe = 1 + BREATHE * Math.sin((T / TOTAL) * Math.PI * 4);
      const rock = ROCK * Math.sin((T / TOTAL) * Math.PI * 2);

      ctx.save();
      ctx.translate(cw / 2, ch / 2);
      ctx.scale(breathe, breathe);
      ctx.rotate(rock);

      for (let i = 0; i < COUNT; i++) {
        const p = field.scatter[i];

        // how much of this dot belongs to a shape right now, and which one
        let weight = 0;
        let tx = 0;
        let ty = 0;
        for (let k = 0; k < WINDOWS.length; k++) {
          const w = WINDOWS[k];
          const on = ramp(
            T,
            w.gather + p.d,
            w.gather + 1.5 + p.d,
            easeInOutCubic,
          );
          const off = ramp(
            T,
            w.release + p.d * 0.6,
            w.release + 1 + p.d * 0.6,
            easeInCubic,
          );
          const held = on * (1 - off);
          if (held > 0.001) {
            const q = field.targets[k][i];
            weight += held;
            tx += q.x * held;
            ty += q.y * held;
          }
        }
        weight = clamp(weight, 0, 1);

        // free drift, damped to nothing as the dot is claimed by a shape
        const loose = 1 - 0.88 * weight;
        const sx =
          p.x +
          p.ax *
            loose *
            Math.sin((T / TOTAL) * Math.PI * 2 * p.fx + p.px * Math.PI * 2);
        const sy =
          p.y +
          p.ay *
            loose *
            Math.cos((T / TOTAL) * Math.PI * 2 * p.fy + p.py * Math.PI * 2);

        const x = sx * (1 - weight) + tx;
        const y = sy * (1 - weight) + ty;
        const r = p.r * (1 - 0.18 * weight) * s;

        ctx.globalAlpha = p.op * (0.68 + 0.32 * weight);
        ctx.fillStyle = p.fill;
        ctx.beginPath();
        // offset from the shapes' centre, which is the canvas centre
        ctx.arc((x - CX) * s, (y - CY) * s, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    };

    resize();

    // Reduced motion gets one held frame, parked on the helix: the shapes are
    // the content, so stopping on a scatter would show nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(CUES.DNA + 1.6);
      const onResize = () => {
        resize();
        draw(CUES.DNA + 1.6);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let t0 = 0;
    const step = (now: number) => {
      if (!t0) t0 = now;
      draw(((now - t0) / 1000) % TOTAL);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* No frame, no rule, no fill. The canvas is cleared rather than painted, so
     the dots sit straight on the hero background with nothing boxing them in.
     The canvas overflows sideways for the drift to use, but is exactly as tall
     as its layout box, so the field can never reach the sections around it.
     pointer-events-none so the overflow never eats a click meant for the copy
     it now sits over. */
  const wide = `${(FIELD_X * 100).toFixed(2)}%`;
  const tall = `${(FIELD_Y * 100).toFixed(2)}%`;

  return (
    <div className="relative aspect-[4/3] w-full lg:aspect-[4/5]">
      <canvas
        ref={canvas}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: wide, height: tall }}
        role="img"
        aria-label="A field of coloured dots gathering into a DNA double helix, then a microscope, then a page of text."
      />
    </div>
  );
}
