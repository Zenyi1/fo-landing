"use client";

import { memo, useEffect, useRef, useState } from "react";

// Three scenes on one stage: what we learn, what the agents then do with it,
// and what it becomes as the company grows.
//
// From lg up the stage pins to the viewport and the scroll position drives
// which scene is showing: the section holds while you scroll through it, then
// releases and the page carries on. Below lg it cannot pin — the stacked
// layout is taller than a phone viewport — so the scenes advance on a timer
// there instead.
//
// Every scene is remounted on change (key={step}), which is what replays the
// entry animations without any imperative restart, and what puts the timed
// scenes' clocks back at zero the next time somebody scrolls to them.

const STEPS = [
  {
    title: "Discovery",
    body: "We learn how you already work and plug into the systems you already run, until there is a working model of your company, your drug and your pipeline.",
  },
  {
    title: "Execution",
    body: "Agents reconcile, check, chase, prepare, and escalate. when the evidence is unclear, they stop and hand the decision to a person.",
  },
  {
    title: "Learning",
    body: "As you grow we take on more, one domain at a time, until everything the company knows is a single connected record.",
  },
];

const CYCLE_MS = 7000;

/* ── the shared clock ─────────────────────────────────────────────────────
   Scenes 1 and 2 are camera moves over a stage rather than sets of
   independent element animations, so neither can be expressed as CSS
   keyframes that stay in step. Both run one clock and every value in them is
   a pure function of `t`, in seconds. Nothing in either holds state, so a
   loop restarts with no teardown.

   Both are authored in a fixed 1200×900 space and scaled to whatever the
   panel is, which is why their numbers are in scene units and not in rem.
   Scene 3 is still a drawing, on the SVG space further down. */

const SCENE_W = 1200;
const SCENE_H = 900;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const outCubic = (t: number) => (t - 1) ** 3 + 1;
const inOutCubic = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) ** 2 + 1;
const outBack = (t: number) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;

type Ease = (t: number) => number;

// one segment: `from` before `start`, `to` after `end`
function tween(
  from: number,
  to: number,
  start: number,
  end: number,
  ease: Ease = inOutCubic,
) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

// piecewise keyframes: [[second, value], ...]
function key(t: number, frames: [number, number][], ease: Ease = inOutCubic) {
  if (t <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    if (t <= frames[i][0]) {
      const [t0, v0] = frames[i - 1];
      const [t1, v1] = frames[i];
      return v0 + (v1 - v0) * ease(clamp01((t - t0) / (t1 - t0 || 1)));
    }
  }
  return frames[frames.length - 1][1];
}

const INK = "var(--bp-ink)";
const PAPER = "var(--bp-paper)";
const ACCENT = "var(--bp-blue)";
// the greys the rows are ruled in, as fractions of ink rather than fixed hexes
const RULE = "color-mix(in srgb, var(--bp-ink) 20%, transparent)";
const RULE_SOFT = "color-mix(in srgb, var(--bp-ink) 12%, transparent)";
const ink = (pct: number) =>
  `color-mix(in srgb, var(--bp-ink) ${pct}%, transparent)`;
// The stage behind these scenes is paper, so a paper card needs an edge to
// exist at all. The lift is what separates a card from the page under it.
const CARD_EDGE = "1px solid var(--bp-hairline)";
const LIFT = "0 18px 44px rgba(12, 14, 17, 0.1)";

// blend toward a colour by `t`; at 0 the base is left untouched
const mix = (base: string, to: string, t: number) =>
  t <= 0.01
    ? base
    : t >= 0.99
      ? to
      : `color-mix(in oklab, ${to} ${Math.round(t * 100)}%, ${base})`;

// A seeded generator, because Math.random() at module scope would give the
// server and the client different layouts and blow up hydration.
function seeded(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}


/* ── scene 1 · discovery ──────────────────────────────────────────────────
   What a company's knowledge looks like on the way in: documents, email, chat
   threads and a handwritten note, flung across the stage in the formats they
   actually arrive in. A sweep reads each one where it lies, then every format
   glides into one grid and normalises into identical library cards.

   That ordering is the claim. The reading happens on the mess, before the
   tidying — we take the shapes you already have rather than asking for them
   in ours. */

// intake cues in seconds — the scatter lands, the sweep reads, the grid forms
const INTAKE = { drift: 0, read: 1.6, assemble: 4.2 };
const INTAKE_LOOP_S = 8.6;
// The frame the scene rests on under reduced motion: the grid is built and
// settled, the same finished state the other two scenes hold on.
const INTAKE_STILL_S = 6.6;

const CARD_W = 160;
const CARD_H = 210;
const CARD_GAP = 26;
const COLS = 4;
const CARD_ROWS = 3;
const GRID_X = (SCENE_W - (COLS * CARD_W + (COLS - 1) * CARD_GAP)) / 2;
// centred rather than hung from the top: the panel is wider than the authored
// stage, so the crop takes its slice off the top and bottom
const GRID_Y = (SCENE_H - (CARD_ROWS * CARD_H + (CARD_ROWS - 1) * CARD_GAP)) / 2;

type Kind = "doc" | "email" | "message" | "note";

const KIND_SIZE: Record<Kind, { w: number; h: number }> = {
  doc: { w: 160, h: 210 },
  email: { w: 214, h: 142 },
  message: { w: 196, h: 168 },
  note: { w: 168, h: 156 },
};

// what arrives, in grid order — mixed on purpose, so no row is one format
const ARRIVALS: Kind[] = [
  "doc",
  "email",
  "doc",
  "message",
  "note",
  "doc",
  "email",
  "doc",
  "message",
  "doc",
  "note",
  "email",
];

const INTAKE_ITEMS = ARRIVALS.map((kind, i) => {
  const r = seeded(7 + i * 13);
  const size = KIND_SIZE[kind];
  const gx = GRID_X + (i % COLS) * (CARD_W + CARD_GAP) + CARD_W / 2;
  const gy = GRID_Y + Math.floor(i / COLS) * (CARD_H + CARD_GAP) + CARD_H / 2;
  const sx = 140 + r() * (SCENE_W - 280);
  const sy = 120 + r() * (SCENE_H - 250);
  // the bearing out from the middle, so a sheet flies in from the edge it is
  // already nearest rather than the whole field arriving from one side
  const ang = Math.atan2(sy - SCENE_H / 2, sx - SCENE_W / 2);
  return {
    i,
    kind,
    w: size.w,
    h: size.h,
    gx,
    gy,
    sx,
    sy,
    rot: (r() - 0.5) * (kind === "note" ? 34 : 24),
    scale: 0.82 + r() * 0.26,
    offX: Math.cos(ang) * (620 + r() * 320),
    offY: Math.sin(ang) * (520 + r() * 260),
    drift: r() * Math.PI * 2,
    lines: 4 + Math.floor(r() * 4),
    widths: Array.from({ length: 7 }, () => 0.42 + r() * 0.52),
    sides: Array.from({ length: 5 }, () => r() > 0.45),
    accentLine: Math.floor(r() * 3),
  };
});

type IntakeItem = (typeof INTAKE_ITEMS)[number];

// a ruled line standing in for a line of text
function Bar({
  w,
  h = 4,
  c = RULE,
  style,
}: {
  w: number;
  h?: number;
  c?: string;
  style?: React.CSSProperties;
}) {
  return <div style={{ height: h, width: `${w * 100}%`, background: c, ...style }} />;
}

// the handwritten note's ink, as a few wobbling lines seeded per card
function scribble(seed: number, width: number, rows: number) {
  const r = seeded(seed);
  return Array.from({ length: rows }, (_, n) => {
    const y = 10 + n * 15;
    const len = width * (0.55 + r() * 0.4);
    const segs = Math.max(3, Math.round(len / 16));
    let d = `M 6 ${y}`;
    for (let k = 1; k <= segs; k++) {
      const x = 6 + (len / segs) * k;
      d += ` Q ${x - len / segs / 2} ${y - 5 - r() * 5} ${x} ${y + (r() - 0.5) * 3}`;
    }
    return d;
  });
}

/* The card in the format it arrived in. `read` is how lit this one is as the
   sweep crosses it — it goes up on the way in and back down behind it, so the
   light travels rather than accumulating. */
function Native({ it, read }: { it: IntakeItem; read: number }) {
  const hot = (t: number) => mix(RULE, ACCENT, read * t);

  if (it.kind === "email") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* the flap, cut as a triangle hanging into a clipped band */}
        <div
          style={{
            height: 34,
            background: mix(ink(6), ACCENT, read * 0.35),
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -34,
              width: 0,
              height: 0,
              transform: "translateX(-50%)",
              borderLeft: "107px solid transparent",
              borderRight: "107px solid transparent",
              borderTop: `56px solid ${mix(ink(10), ACCENT, read * 0.4)}`,
            }}
          />
        </div>
        <div
          style={{
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 99,
                background: hot(0.9),
              }}
            />
            <Bar w={0.42} h={6} c={hot(1)} />
          </div>
          <Bar w={it.widths[0]} c={hot(0.8)} />
          <Bar w={it.widths[1]} c={RULE_SOFT} />
          <Bar w={it.widths[2] * 0.7} c={RULE_SOFT} />
        </div>
      </div>
    );
  }

  if (it.kind === "message") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {it.sides.map((right, k) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: right ? "flex-end" : "flex-start",
            }}
          >
            {/* the tail corner is squared off, which is what makes a rounded
                rectangle read as a chat bubble */}
            <div
              style={{
                width: `${(0.4 + it.widths[k] * 0.45) * 100}%`,
                height: 14,
                borderRadius: 8,
                borderBottomRightRadius: right ? 2 : 8,
                borderBottomLeftRadius: right ? 8 : 2,
                background: right ? mix(ink(16), ACCENT, read * 0.6) : ink(22),
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (it.kind === "note") {
    return (
      <svg
        viewBox={`0 0 ${it.w} ${it.h}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {scribble(it.i + 3, it.w - 30, 7).map((d, k) => (
          <path
            key={k}
            d={d}
            transform="translate(10, 16)"
            fill="none"
            stroke={k === it.accentLine ? mix(ink(42), ACCENT, read) : ink(42)}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <Bar w={0.62} h={9} c={mix(INK, ACCENT, read)} style={{ opacity: 0.85 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginTop: 4,
        }}
      >
        {it.widths.slice(0, it.lines).map((w, k) => (
          <Bar key={k} w={w} c={hot(k % 2 ? 0.72 : 1)} />
        ))}
      </div>
    </div>
  );
}

/* The same card once it has been normalised — every format ends up one record
   with the same shape. The accent rule at the foot is the only thing that
   grows after the move, so the grid finishes settling rather than stopping. */
function Normalised({ it, settled }: { it: IntakeItem; settled: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <Bar w={0.55} h={9} c={INK} style={{ opacity: 0.85 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 7,
          marginTop: 4,
        }}
      >
        {it.widths.map((w, k) => (
          <Bar key={k} w={w} c={k % 2 ? RULE_SOFT : RULE} />
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          height: 3,
          width: `${18 + settled * 30}%`,
          background: ACCENT,
          opacity: settled * 0.9,
        }}
      />
    </div>
  );
}

function IntakeCard({ it, t }: { it: IntakeItem; t: number }) {
  const enterAt = INTAKE.drift + it.i * 0.055;
  // the sweep runs top to bottom, so a card lights when the line reaches it
  const readAt = INTAKE.read + 0.25 + ((it.sy - 80) / (SCENE_H - 160)) * 1.75;
  const homeAt =
    INTAKE.assemble + (it.i % COLS) * 0.06 + Math.floor(it.i / COLS) * 0.13;

  const enter = tween(0, 1, enterAt, enterAt + 0.8, outCubic)(t);
  const home = tween(0, 1, homeAt, homeAt + 1)(t);
  const morph = tween(0, 1, homeAt + 0.25, homeAt + 0.85)(t);

  // the hang before the grid takes them; it goes as the card finds its place
  const bob = Math.sin(t * 1.1 + it.drift) * 6 * (1 - home);
  const x = it.sx + it.offX * (1 - enter) + (it.gx - it.sx) * home;
  const y = it.sy + it.offY * (1 - enter) + bob + (it.gy - (it.sy + bob)) * home;
  const rot =
    (it.rot + (1 - enter) * 18) * (1 - home) +
    Math.sin(t * 0.9 + it.drift) * 0.5 * (1 - home);
  const scale = (it.scale + (1 - enter) * 0.12) * (1 - home) + home;
  const w = it.w + (CARD_W - it.w) * home;
  const h = it.h + (CARD_H - it.h) * home;

  const read = clamp01((t - readAt) / 0.45) * clamp01(1 - (t - readAt - 0.9) / 0.6);
  const settled = clamp01((t - homeAt - 0.55) / 0.5);
  // a note is a scrap, not a document, so it sits closer to the page until it
  // is normalised into one
  const scrap = it.kind === "note" && morph < 0.5;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        transform: `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${rot}deg) scale(${scale})`,
        transformOrigin: "50% 50%",
        background: PAPER,
        border: CARD_EDGE,
        boxShadow: scrap
          ? `0 ${1 + 4 * (1 - home)}px ${4 + 12 * (1 - home)}px rgba(12, 14, 17, ${0.07 * (1 - morph) + 0.1 * morph})`
          : `0 ${2 + 10 * (1 - home)}px ${8 + 26 * (1 - home)}px rgba(12, 14, 17, ${0.1 + 0.06 * (1 - home)})`,
        opacity: enter,
        overflow: "hidden",
      }}
    >
      {/* both faces stay mounted and cross-fade, so nothing reflows on the
          swap and the card's own box is the only thing that animates */}
      <div style={{ position: "absolute", inset: 0, opacity: 1 - morph }}>
        <Native it={it} read={read} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: morph }}>
        <Normalised it={it} settled={settled} />
      </div>
    </div>
  );
}

/* The read sweep. It crosses the whole stage once, over the mess, with the
   glow trailing behind the line so the direction is never ambiguous. */
function Sweep({ t }: { t: number }) {
  const start = INTAKE.read;
  const end = INTAKE.read + 2.15;
  const y = tween(-20, SCENE_H + 20, start, end)(t);
  const on = clamp01((t - start) / 0.25) * clamp01(1 - (t - end + 0.3) / 0.35);
  if (on <= 0) return null;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: y - 90,
          width: SCENE_W,
          height: 90,
          opacity: on * 0.5,
          background: `linear-gradient(to bottom, transparent, color-mix(in oklab, ${ACCENT} 16%, transparent))`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: y,
          width: SCENE_W,
          height: 2,
          background: ACCENT,
          opacity: on,
        }}
      />
      {/* the two end markers, which is what makes it a instrument travelling
          over the page rather than a gradient */}
      {[26, SCENE_W - 38].map((left) => (
        <div
          key={left}
          style={{
            position: "absolute",
            left,
            top: y - 5,
            width: 12,
            height: 12,
            background: ACCENT,
            opacity: on,
            transform: "rotate(45deg)",
          }}
        />
      ))}
    </>
  );
}

function Discovery() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [clock, setClock] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The scene has a fixed authored size, so it is measured and scaled to cover
  // the panel. Until the first measurement lands there is no honest scale to
  // draw at, which is what the 0 means.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(width / SCENE_W, height / SCENE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let origin = 0;
    const frame = (now: number) => {
      if (!origin) origin = now;
      setClock(((now - origin) / 1000) % INTAKE_LOOP_S);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const t = reduced ? INTAKE_STILL_S : clock;

  // the camera eases back off the scatter as the grid forms, then breathes so
  // the long hold on the finished library is never dead still
  const z = tween(1.06, 1, INTAKE.assemble, INTAKE.assemble + 3.2)(t);
  const held = Math.min(9, Math.max(0, t - INTAKE.assemble - 1.8));
  const breathe = 1 + Math.sin(held * 1.4) * 0.004;
  // out before the loop point, so the cut back to the scatter is never seen
  const fade = 1 - clamp01((t - INTAKE_LOOP_S + 1) / 0.8);

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="Documents, email, chat threads and a handwritten note arrive scattered across the page in their own formats. A sweep reads each one where it lies, then every format glides into a grid and normalises into identical library cards."
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: SCENE_W,
          height: SCENE_H,
          marginLeft: -SCENE_W / 2,
          marginTop: -SCENE_H / 2,
          transform: `scale(${scale})`,
          opacity: scale ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: fade,
            transform: `scale(${z * breathe})`,
            transformOrigin: "50% 52%",
          }}
        >
          {INTAKE_ITEMS.map((it) => (
            <IntakeCard key={it.i} it={it} t={t} />
          ))}
          <Sweep t={t} />
        </div>
      </div>
    </div>
  );
}

/* ── scene 2 · execution ──────────────────────────────────────────────────
   The one scene that is not a drawing. The chain plays out on documents rather
   than on a diagram: an agent runs down a record, stops on the line that does
   not add up, checks it against the reference stack until a clause lights up,
   the line corrects itself, a reply writes itself and a cursor sends it.

   Like scene 1 it runs on the shared clock above: a camera move over a stage —
   the frame pushes in on the flagged row, swings to the stack and pulls back
   out — which is not something a set of independent element animations could
   be kept in step through. */

// Cue starts in seconds — scan, flag, check, draft, send, clear — then the
// loop point, which is the end of the clear.
const CUE = { scan: 0, flag: 2.2, check: 3.8, draft: 6.4, send: 9, clear: 11 };
const LOOP_S = 12.2;
// The frame the scene rests on under reduced motion: the reply is written and
// the cursor is on the button, so the work reads as done the way the other two
// scenes settle on their finished state.
const STILL_S = 9.5;

const DOC = { x: 300, y: 130, w: 560, h: 620 };
const ROWS = 11;
const ROW_H = 42;
const ROW_TOP = DOC.y + 132;
const BAD_ROW = 6;
const rowY = (i: number) => ROW_TOP + i * ROW_H + ROW_H / 2;

const STACK = { x: 900, y: 300 };
const REPLY = { x: 340, y: 250, w: 520, h: 400 };

/* Label and value widths per row. A seeded generator rather than Math.random()
   at module scope: the server and the client have to lay out the same page. */
const ROW_W: [number, number][] = (() => {
  let s = 11 * 9301 + 49297;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from(
    { length: ROWS },
    () => [0.3 + r() * 0.3, 0.12 + r() * 0.14] as [number, number],
  );
})();

/* The record under review. The flagged row rings itself, then the correction
   is written in beside its value and the old value greys out. */
function Sheet({ t }: { t: number }) {
  const flag = clamp01((t - CUE.flag) / 0.5);
  const fix = clamp01((t - CUE.check - 1.6) / 0.6);
  const fade = 1 - clamp01((t - CUE.clear) / 0.7);
  const rise = tween(40, 0, 0, 0.9, outCubic)(t);
  const app = tween(0, 1, 0, 0.9, outCubic)(t);

  return (
    <div
      style={{
        position: "absolute",
        left: DOC.x,
        top: DOC.y,
        width: DOC.w,
        height: DOC.h,
        boxSizing: "border-box",
        padding: "38px 40px",
        background: PAPER,
        border: CARD_EDGE,
        borderRadius: 20,
        boxShadow: LIFT,
        transform: `translateY(${rise}px)`,
        opacity: app * fade,
      }}
    >
      <div style={{ height: 12, width: "46%", background: INK, opacity: 0.85 }} />
      <div
        style={{ height: 5, width: "28%", background: RULE_SOFT, marginTop: 14 }}
      />
      <div style={{ marginTop: 44 }}>
        {ROW_W.map(([labelW, valueW], i) => {
          const bad = i === BAD_ROW;
          const hot = bad ? flag : 0;
          return (
            <div
              key={i}
              style={{
                position: "relative",
                height: ROW_H,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {bad && (
                <div
                  style={{
                    position: "absolute",
                    left: -14,
                    right: -14,
                    top: 3,
                    bottom: 3,
                    border: `2px solid ${ACCENT}`,
                    borderRadius: 6,
                    opacity: hot,
                    transform: `scale(${0.96 + 0.04 * hot})`,
                  }}
                />
              )}
              <div
                style={{
                  height: 6,
                  width: `${labelW * 100}%`,
                  background: bad ? INK : RULE,
                  opacity: bad ? 0.5 + 0.4 * hot : 1,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* the corrected figure, written in from nothing */}
                {bad && <div style={{ height: 6, width: 46 * fix, background: ACCENT }} />}
                <div
                  style={{
                    height: 6,
                    width: valueW * DOC.w * 0.8,
                    background: bad ? (fix > 0.5 ? RULE_SOFT : ACCENT) : RULE,
                    opacity: bad && fix > 0.5 ? 0.6 : 1,
                    transform: `scaleX(${bad && fix > 0.5 ? 0.7 : 1})`,
                    transformOrigin: "right",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* The agent itself: a dot that runs the rows, rings the one it stops on, then
   carries on to the stack and away once the reply exists. */
function Finder({ t }: { t: number }) {
  const path: [number, number, number][] = [
    [0.4, DOC.x + 40, rowY(0)],
    [CUE.scan + 0.2, DOC.x + 40, rowY(0)],
    [CUE.scan + 1.6, DOC.x + 40, rowY(BAD_ROW)],
    [CUE.flag + 1.4, DOC.x + 40, rowY(BAD_ROW)],
    [CUE.check + 0.8, STACK.x - 40, STACK.y + 120],
    [CUE.check + 2, STACK.x - 40, STACK.y + 210],
    [CUE.draft + 0.9, REPLY.x + 60, REPLY.y + 90],
    [CUE.draft + 2.4, REPLY.x + 60, REPLY.y + 90],
  ];
  const x = key(t, path.map(([s, v]) => [s, v]));
  const y = key(t, path.map(([s, , v]) => [s, v]));
  const on = clamp01(t / 0.5) * (1 - clamp01((t - CUE.draft - 0.2) / 0.4));
  const pulse = 1 + Math.sin(t * 6) * 0.08;
  // the halo that fires on the find, then settles
  const found =
    clamp01((t - CUE.flag) / 0.3) * (1 - clamp01((t - CUE.flag - 1.1) / 0.5));

  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: on }}>
      <div
        style={{
          position: "absolute",
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: 99,
          background: ACCENT,
          opacity: 0.14 * found,
          transform: `scale(${1 + found * 1.6})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -18,
          top: -18,
          width: 36,
          height: 36,
          borderRadius: 99,
          border: `2px solid ${ACCENT}`,
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -7,
          top: -7,
          width: 14,
          height: 14,
          borderRadius: 99,
          background: ACCENT,
          transform: `scale(${pulse})`,
        }}
      />
    </div>
  );
}

/* What the record is checked against. The cards fan out, the middle one lifts
   and one clause on it lights up: that is the match. */
function Stack({ t }: { t: number }) {
  const app = tween(0, 1, CUE.check - 0.5, CUE.check + 0.4, outCubic)(t);
  const fan = tween(0, 1, CUE.check + 0.2, CUE.check + 1.2)(t);
  const hit = clamp01((t - CUE.check - 1.4) / 0.4);
  const out = 1 - clamp01((t - CUE.draft - 0.6) / 0.6);

  return (
    <div
      style={{
        position: "absolute",
        left: STACK.x,
        top: STACK.y,
        opacity: app * out,
      }}
    >
      {[0, 1, 2].map((k) => {
        const lifted = k === 1;
        const dx = (k - 1) * 26 * fan;
        const dy = (k - 1) * 34 * fan - (lifted ? 22 * hit : 0);
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: dx,
              top: dy,
              width: 220,
              height: 290,
              boxSizing: "border-box",
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: PAPER,
              borderRadius: 16,
              border:
                lifted && hit > 0 ? `2px solid ${ACCENT}` : CARD_EDGE,
              boxShadow: `0 ${8 + 10 * (lifted ? hit : 0)}px ${20 + 20 * (lifted ? hit : 0)}px rgba(12, 14, 17, 0.11)`,
              transform: `rotate(${(k - 1) * 4 * fan}deg)`,
            }}
          >
            <div
              style={{ height: 8, width: "52%", background: INK, opacity: 0.8 }}
            />
            {[0.9, 0.72, 0.85, 0.6, 0.8, 0.55].map((w, n) => {
              const clause = lifted && n === 2;
              return (
                <div
                  key={n}
                  style={{
                    height: 4,
                    width: `${w * 100}%`,
                    background: clause ? ACCENT : RULE_SOFT,
                    opacity: clause ? hit : 1,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* The reply, writing itself line by line and then flying off when it is sent. */
function Reply({ t }: { t: number }) {
  const app = tween(0, 1, CUE.draft, CUE.draft + 0.8, outBack)(t);
  const lift = tween(60, 0, CUE.draft, CUE.draft + 0.9)(t);
  const gone = tween(0, 1, CUE.send + 0.75, CUE.send + 1.5, outCubic)(t);
  const press =
    clamp01((t - CUE.send - 0.55) / 0.12) *
    (1 - clamp01((t - CUE.send - 0.78) / 0.15));

  return (
    <div
      style={{
        position: "absolute",
        left: REPLY.x,
        top: REPLY.y,
        width: REPLY.w,
        height: REPLY.h,
        boxSizing: "border-box",
        padding: "34px 36px",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        border: CARD_EDGE,
        borderRadius: 20,
        boxShadow: "0 30px 66px rgba(12, 14, 17, 0.16)",
        opacity: app * (1 - gone),
        transform: `translate(${gone * 220}px, ${lift - gone * 260}px) scale(${(0.9 + 0.1 * app) * (1 - gone * 0.15)}) rotate(${gone * 4}deg)`,
        transformOrigin: "50% 100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{ width: 18, height: 18, borderRadius: 99, background: ACCENT }}
        />
        <div style={{ height: 8, width: 150, background: INK, opacity: 0.82 }} />
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[0.92, 0.78, 0.88, 0.64, 0.83, 0.5].map((w, n) => {
          const typed = tween(
            0,
            1,
            CUE.draft + 0.55 + n * 0.16,
            CUE.draft + 0.95 + n * 0.16,
          )(t);
          // the fourth line is the claim itself, so it carries the accent
          return (
            <div
              key={n}
              style={{
                height: 5,
                width: `${w * 100 * typed}%`,
                background: n === 3 ? ACCENT : RULE,
                opacity: n === 3 ? 0.9 : 1,
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 22px",
            borderRadius: 12,
            background: ACCENT,
            opacity: 1 - press * 0.25,
            transform: `scale(${1 - press * 0.06})`,
          }}
        >
          <div style={{ height: 6, width: 46, background: "#fff", opacity: 0.9 }} />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "10px solid #fff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* The person in the loop. It is the only thing on the stage that is not the
   agent's own work, which is the point: nothing goes out until it arrives. */
function Cursor({ t }: { t: number }) {
  const bx = REPLY.x + REPLY.w - 96;
  const by = REPLY.y + REPLY.h - 42;
  const x = key(t, [
    [CUE.send - 0.5, bx + 260],
    [CUE.send + 0.5, bx],
    [CUE.send + 1.1, bx],
    [CUE.send + 1.6, bx + 60],
  ]);
  const y = key(t, [
    [CUE.send - 0.5, by + 200],
    [CUE.send + 0.5, by],
    [CUE.send + 1.1, by],
    [CUE.send + 1.6, by + 80],
  ]);
  const on =
    clamp01((t - (CUE.send - 0.5)) / 0.3) *
    (1 - clamp01((t - CUE.send - 1.2) / 0.4));
  const press =
    clamp01((t - CUE.send - 0.55) / 0.1) *
    (1 - clamp01((t - CUE.send - 0.8) / 0.15));

  return (
    <svg
      width="30"
      height="34"
      viewBox="0 0 30 34"
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: on,
        transform: `scale(${1 - press * 0.15})`,
        transformOrigin: "0 0",
      }}
    >
      <path
        d="M2 2 L2 26 L9 19.5 L13.5 29 L18 27 L13.5 17.5 L23 17 Z"
        fill={INK}
        stroke={PAPER}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Execution() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [clock, setClock] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The scene has a fixed authored size, so it is measured and scaled to cover
  // the panel. Until the first measurement lands there is no honest scale to
  // draw at, which is what the 0 means.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(width / SCENE_W, height / SCENE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let origin = 0;
    const frame = (now: number) => {
      if (!origin) origin = now;
      setClock(((now - origin) / 1000) % LOOP_S);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const t = reduced ? STILL_S : clock;

  // The camera. It pushes in on the flagged row, swings right to the stack,
  // pulls back for the reply and settles once the reply is gone.
  const z = key(t, [
    [0, 0.86],
    [CUE.scan + 0.4, 0.94],
    [CUE.flag + 0.3, 1.5],
    [CUE.flag + 1.4, 1.5],
    [CUE.check + 0.9, 1.18],
    [CUE.draft + 0.6, 1.02],
    [CUE.send + 0.4, 1.16],
    [CUE.send + 1.6, 1],
    [CUE.clear + 0.8, 0.94],
  ]);
  const camX = key(t, [
    [0, 600],
    [CUE.scan + 0.4, 580],
    [CUE.flag + 0.3, 580],
    [CUE.flag + 1.4, 580],
    [CUE.check + 0.9, 880],
    [CUE.draft + 0.6, 600],
    [CUE.send + 0.4, 720],
    [CUE.send + 1.6, 620],
    [CUE.clear + 0.8, 600],
  ]);
  const camY = key(t, [
    [0, 470],
    [CUE.scan + 0.4, 455],
    [CUE.flag + 0.3, rowY(BAD_ROW)],
    [CUE.flag + 1.4, rowY(BAD_ROW)],
    [CUE.check + 0.9, 460],
    [CUE.draft + 0.6, 450],
    [CUE.send + 0.4, 600],
    [CUE.send + 1.6, 460],
    [CUE.clear + 0.8, 450],
  ]);
  // a slow sway, so the stage is never dead still between cues
  const drift = Math.sin(t * 0.5) * 4;
  const fade = 1 - clamp01((t - CUE.clear - 0.2) / 0.8);

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="An agent runs down a record, stops on the line that does not add up, checks it against the reference stack until one clause matches, corrects the figure, drafts a reply, and a cursor sends it."
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: SCENE_W,
          height: SCENE_H,
          marginLeft: -SCENE_W / 2,
          marginTop: -SCENE_H / 2,
          transform: `scale(${scale})`,
          opacity: scale ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: fade,
            transform: `translate(${SCENE_W / 2 - camX * z + drift}px, ${SCENE_H / 2 - camY * z}px) scale(${z})`,
            transformOrigin: "0 0",
          }}
        >
          <Sheet t={t} />
          <Stack t={t} />
          <Reply t={t} />
          <Finder t={t} />
          <Cursor t={t} />
        </div>
      </div>
    </div>
  );
}

/* ── scene 3 · learning ───────────────────────────────────────────────────
   The record as a place. An axonometric island built out of paper: every
   ground tile is an open spread and everything standing on it is a stack of
   volumes. It keeps extending — tiles lay down, stacks rise, and the camera
   pulls back to keep the whole thing in frame as it outgrows the shot.

   The ground past the built edge is already marked out in dashed outline, and
   that is the scene's argument: what has been taken on is a fraction of what
   is surveyed, and the plot it grows into was there from the first second.

   Same clock as the first two scenes. */

// growth cues in seconds — the plot is marked, the world builds, then it holds
const WORLD = { seed: 0, grow: 1.2, hold: 10.2 };
const WORLD_LOOP_S = 13;
// the frame it rests on under reduced motion: the world built and the camera
// settled, which is the finished state the other two scenes also hold on
const WORLD_STILL_S = 10.6;
// how long the build runs, which every tile and stack divides between them
const GROW_SPAN = 9;

/* Tile footprint and one storey, in scene units. A 2:1-ish dimetric rather
   than a true isometric, which is what keeps the spreads reading as open
   rectangular pages rather than lozenges. */
const TILE_W = 210;
const TILE_H = 122;
const STOREY = 30;
const WORLD_X = 600;
const WORLD_Y = 470;

type Iso = { X: number; Y: number };

const iso = (x: number, y: number, z: number): Iso => ({
  X: WORLD_X + (x - y) * (TILE_W / 2),
  Y: WORLD_Y + (x + y) * (TILE_H / 2) - z * STOREY,
});
const pt = (p: Iso) => `${p.X},${p.Y}`;

/* The faces of a solid, lit from above: paper on top, two washes down the
   sides. Opaque rather than ink fractions, because the world is painted back
   to front and a near stack has to occlude the one behind it. */
const FACE_TOP = PAPER;
const FACE_LEFT = "color-mix(in srgb, var(--bp-ink) 7%, var(--bp-paper))";
const FACE_RIGHT = "color-mix(in srgb, var(--bp-ink) 13%, var(--bp-paper))";
const EDGE = ink(42);

// the plan — which cells have ground under them
const TILES: [number, number][] = [
  [0, 0], [1, 0], [0, 1], [1, 1], [2, 0],
  [2, 1], [0, 2], [1, 2], [-1, 0], [-1, 1],
  [2, 2], [3, 1], [-1, 2], [0, 3], [1, 3],
  [3, 0], [2, 3], [-1, -1], [0, -1], [1, -1],
];

// stack: volumes lying flat · tower: upright, the tallest things on the
// island · spread: an open book used as a roof
type Structure = {
  c: [number, number];
  kind: "stack" | "tower" | "spread";
  h: number;
};

const BUILDS: Structure[] = [
  { c: [0, 0], kind: "stack", h: 4 },
  { c: [1, 0], kind: "tower", h: 7 },
  { c: [0, 1], kind: "spread", h: 2 },
  { c: [2, 1], kind: "stack", h: 5 },
  { c: [1, 2], kind: "tower", h: 9 },
  { c: [-1, 1], kind: "stack", h: 3 },
  { c: [2, 2], kind: "spread", h: 2 },
  { c: [3, 1], kind: "tower", h: 6 },
  { c: [0, 3], kind: "stack", h: 4 },
  { c: [-1, -1], kind: "stack", h: 3 },
  { c: [1, -1], kind: "tower", h: 5 },
  { c: [2, 3], kind: "stack", h: 6 },
];

// ground marked out past the built edge — surveyed, not yet taken on
const GHOSTS: [number, number][] = [
  [4, 0], [4, 1], [4, 2], [3, 3], [1, 4], [2, 4], [-2, 0],
  [-2, 1], [-1, 3], [0, 4], [-2, -1], [2, -1], [3, -1],
];

/* Painter's order: back to front by depth, ground before whatever stands on
   it. The plan is static, so this is sorted once rather than every frame. */
type Drawn =
  | { depth: number; layer: 0; i: number; tile: [number, number] }
  | { depth: number; layer: 1; i: number; build: Structure };

const DRAWN: Drawn[] = [
  ...TILES.map(
    (c, i): Drawn => ({ depth: c[0] + c[1], layer: 0, i, tile: c }),
  ),
  ...BUILDS.map(
    (b, i): Drawn => ({ depth: b.c[0] + b.c[1], layer: 1, i, build: b }),
  ),
].sort((a, b) => a.depth - b.depth || a.layer - b.layer);

/* One ground tile, an open spread laid down flat. It falls the last of its
   way in, so the ground reads as paper being turned rather than a surface
   switching on.

   Memoised, and so is the stack below: this scene is several hundred SVG
   nodes and each one's `p` is pinned at 1 the moment its own entrance is
   over, so the long hold at the end costs almost nothing to hold. */
const Tile = memo(function Tile({
  c,
  p,
}: {
  c: [number, number];
  p: number;
}) {
  const [gx, gy] = c;
  const a = iso(gx, gy, 0);
  const b = iso(gx + 1, gy, 0);
  const near = iso(gx + 1, gy + 1, 0);
  const d = iso(gx, gy + 1, 0);
  // the tile's own basis, so the ruling is authored in unit space once and
  // projected with the tile instead of being solved line by line
  const u = { x: b.X - a.X, y: b.Y - a.Y };
  const v = { x: d.X - a.X, y: d.Y - a.Y };

  return (
    <g transform={`translate(0, ${-(1 - p) * 300})`} opacity={clamp01(p * 3)}>
      <polygon
        points={`${pt(a)} ${pt(b)} ${pt(near)} ${pt(d)}`}
        fill={FACE_TOP}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <g
        transform={`matrix(${u.x} ${u.y} ${v.x} ${v.y} ${a.X} ${a.Y})`}
        opacity={p}
      >
        {/* the gutter, which is what makes one rectangle read as two pages */}
        <line
          x1={0.5}
          y1={0.06}
          x2={0.5}
          y2={0.94}
          stroke={INK}
          strokeOpacity={0.3}
          strokeWidth={0.012}
        />
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <line
              x1={0.08}
              y1={0.15 + i * 0.115}
              x2={0.44}
              y2={0.15 + i * 0.115}
              stroke={INK}
              strokeOpacity={0.18}
              strokeWidth={0.016}
            />
            <line
              x1={0.56}
              y1={0.15 + i * 0.115}
              x2={0.92}
              y2={0.15 + i * 0.115}
              stroke={INK}
              strokeOpacity={0.18}
              strokeWidth={0.016}
            />
          </g>
        ))}
      </g>
    </g>
  );
});

/* A structure standing on a tile. Its height grows with `p`, and the page
   edges are ruled one line per volume, so a taller stack is visibly more
   paper rather than a taller box. */
const Volume = memo(function Volume({ b, p }: { b: Structure; p: number }) {
  const [gx, gy] = b.c;
  // towers are drawn narrower in plan than stacks, so the two read apart even
  // where they are the same height
  const inset = b.kind === "tower" ? 0.26 : 0.14;
  const x0 = gx + inset;
  const x1 = gx + 1 - inset;
  const y0 = gy + inset;
  const y1 = gy + 1 - inset;
  const hz = b.h * p;

  const T0 = iso(x0, y0, hz);
  const T1 = iso(x1, y0, hz);
  const T2 = iso(x1, y1, hz);
  const T3 = iso(x0, y1, hz);
  const B1 = iso(x1, y0, 0);
  const B2 = iso(x1, y1, 0);
  const B3 = iso(x0, y1, 0);
  const layers = Math.max(1, Math.round(b.h * p));

  return (
    <g opacity={clamp01(p * 4)}>
      <polygon
        points={`${pt(T1)} ${pt(T2)} ${pt(B2)} ${pt(B1)}`}
        fill={FACE_RIGHT}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      <polygon
        points={`${pt(T3)} ${pt(T2)} ${pt(B2)} ${pt(B3)}`}
        fill={FACE_LEFT}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      {Array.from({ length: layers }, (_, i) => {
        const z = ((i + 1) * hz) / layers;
        const L1 = iso(x1, y0, z);
        const L2 = iso(x1, y1, z);
        const L3 = iso(x0, y1, z);
        // the volume most recently added to a tower takes the accent: the
        // domain taken on last, still the live one
        const newest = i === layers - 1 && b.kind === "tower";
        return (
          <g key={i}>
            <line
              x1={L1.X}
              y1={L1.Y}
              x2={L2.X}
              y2={L2.Y}
              stroke={newest ? ACCENT : INK}
              strokeOpacity={newest ? 0.9 : 0.3}
              strokeWidth={newest ? 3 : 1.6}
            />
            <line
              x1={L2.X}
              y1={L2.Y}
              x2={L3.X}
              y2={L3.Y}
              stroke={newest ? ACCENT : INK}
              strokeOpacity={newest ? 0.9 : 0.3}
              strokeWidth={newest ? 3 : 1.6}
            />
          </g>
        );
      })}
      <polygon
        points={`${pt(T0)} ${pt(T1)} ${pt(T2)} ${pt(T3)}`}
        fill={FACE_TOP}
        stroke={EDGE}
        strokeWidth={1.4}
      />
      {b.kind === "spread" && (
        <line
          x1={(T0.X + T3.X) / 2}
          y1={(T0.Y + T3.Y) / 2}
          x2={(T1.X + T2.X) / 2}
          y2={(T1.Y + T2.Y) / 2}
          stroke={INK}
          strokeOpacity={0.35}
          strokeWidth={2}
        />
      )}
      {b.kind === "stack" && (
        <line
          x1={T0.X + (T1.X - T0.X) * 0.5}
          y1={T0.Y + (T1.Y - T0.Y) * 0.5}
          x2={T3.X + (T2.X - T3.X) * 0.5}
          y2={T3.Y + (T2.Y - T3.Y) * 0.5}
          stroke={ACCENT}
          strokeOpacity={0.75}
          strokeWidth={2.5}
        />
      )}
    </g>
  );
});

function Learning() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [clock, setClock] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The scene has a fixed authored size, so it is measured and scaled to cover
  // the panel. Until the first measurement lands there is no honest scale to
  // draw at, which is what the 0 means.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(width / SCENE_W, height / SCENE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let origin = 0;
    const frame = (now: number) => {
      if (!origin) origin = now;
      setClock(((now - origin) / 1000) % WORLD_LOOP_S);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const t = reduced ? WORLD_STILL_S : clock;

  // ground lays down across the whole span; a stack starts once its own tile
  // is under it
  const tileAt = (i: number) =>
    WORLD.grow + (i / TILES.length) * GROW_SPAN * 0.92;
  const buildAt = (i: number) =>
    WORLD.grow + 0.5 + (i / BUILDS.length) * GROW_SPAN * 0.9;

  // The camera pulls back and drops its angle as the island spreads, so the
  // world stays framed while it outgrows the shot. It never quite catches up,
  // which is the intended read.
  const z = key(t, [
    [0, 1.95],
    [WORLD.grow, 1.85],
    [WORLD.grow + 2.5, 1.5],
    [WORLD.grow + 5, 1.22],
    [WORLD.grow + 8, 1],
    [WORLD.grow + GROW_SPAN + 1.4, 0.94],
  ]);
  const camX = key(t, [
    [0, WORLD_X + 40],
    [WORLD.grow + 5, WORLD_X + 20],
    [WORLD.grow + GROW_SPAN, WORLD_X],
  ]);
  const camY = key(t, [
    [0, WORLD_Y + 40],
    [WORLD.grow + 5, WORLD_Y + 110],
    [WORLD.grow + GROW_SPAN, WORLD_Y + 150],
  ]);
  // a slow sway, so the stage is never dead still during the hold
  const drift = Math.sin(t * 0.45) * 6;
  // the survey is drawn before anything is built on it
  const ghost = tween(0, 1, 0.3, 1.2, outCubic)(t);
  // out before the loop point, so the cut back to bare ground is never seen
  const fade = 1 - clamp01((t - WORLD_LOOP_S + 1) / 0.8);

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="An island built out of paper, seen from above at an angle. Ground tiles of open book spreads lay themselves down and stacks of volumes rise on them, extending in every direction as the camera pulls back, with more ground already marked out in dashed outline beyond the built edge."
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: SCENE_W,
          height: SCENE_H,
          marginLeft: -SCENE_W / 2,
          marginTop: -SCENE_H / 2,
          transform: `scale(${scale})`,
          opacity: scale ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: fade,
            transform: `translate(${SCENE_W / 2 - camX * z + drift}px, ${SCENE_H / 2 - camY * z}px) scale(${z})`,
            transformOrigin: "0 0",
          }}
        >
          {/* oversized and offset, with overflow visible: the world runs well
              past the authored frame and the panel above is what crops it */}
          <svg
            width={2600}
            height={2000}
            viewBox="-700 -500 2600 2000"
            style={{
              position: "absolute",
              left: -700,
              top: -500,
              overflow: "visible",
            }}
          >
            {GHOSTS.map(([gx, gy], i) => (
              <polygon
                key={i}
                points={[
                  iso(gx, gy, 0),
                  iso(gx + 1, gy, 0),
                  iso(gx + 1, gy + 1, 0),
                  iso(gx, gy + 1, 0),
                ]
                  .map(pt)
                  .join(" ")}
                fill="none"
                stroke={EDGE}
                strokeOpacity={0.25}
                strokeWidth={1.4}
                strokeDasharray="7 8"
                opacity={ghost}
              />
            ))}
            {DRAWN.map((d, k) => {
              if (d.layer === 0) {
                const p = tween(
                  0,
                  1,
                  tileAt(d.i) - 0.5,
                  tileAt(d.i) + 0.3,
                  outCubic,
                )(t);
                return p > 0 ? <Tile key={`t${k}`} c={d.tile} p={p} /> : null;
              }
              // outBack overshoots, so a stack lands with a settle; it is held
              // off zero so the first frame still has a solid to draw
              const p = tween(0, 1, buildAt(d.i), buildAt(d.i) + 0.85, outBack)(t);
              return p > 0 ? (
                <Volume
                  key={`b${k}`}
                  b={d.build}
                  p={Math.min(1.06, Math.max(0.02, p))}
                />
              ) : null;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

function Scene({ step }: { step: number }) {
  if (step === 0) return <Discovery />;
  if (step === 1) return <Execution />;
  return <Learning />;
}

export function KnowledgeEngine() {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  // The scrub only runs where the stage actually pins. Matching the lg
  // breakpoint in JS rather than guessing, so the two never disagree.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    // matchMedia is client-only, so this has to settle in an effect
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pinned: how far through the track we are picks the scene. -top / scrollable
  // is 0 the moment the stage sticks and 1 the moment it lets go, so the three
  // scenes divide the hold evenly.
  useEffect(() => {
    if (!pinned) return;
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / scrollable));
      setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  // Unpinned: nothing is driving the scenes, so run them on a timer. Execution
  // is a timeline of its own and runs longer than one cycle, so the timer would
  // cut it off halfway — it stops once the reader is on that step.
  useEffect(() => {
    if (pinned || step === 1) return;
    const id = setTimeout(
      () => setStep((s) => (s + 1) % STEPS.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [pinned, step]);

  // A step is a scroll position now, not a state, so clicking one scrolls to
  // the middle of its band rather than setting it behind the scroll's back.
  function goTo(i: number) {
    const el = track.current;
    if (!pinned || !el) {
      setStep(i);
      return;
    }
    const r = el.getBoundingClientRect();
    const scrollable = r.height - window.innerHeight;
    // no behavior: the html rule already smooths this, and already turns it
    // off under prefers-reduced-motion
    window.scrollTo({
      top: window.scrollY + r.top + (scrollable * (i + 0.5)) / STEPS.length,
    });
  }

  return (
    <section
      id="graph"
      className="w-full scroll-mt-[92px] border-t"
      style={{
        borderColor: "var(--bp-hairline)",
        background: "var(--bp-wash)",
      }}
    >
      {/* The track is the scroll budget. The stage sticks inside it, so it
          holds for the track's height minus one viewport and then releases on
          its own — no scroll hijacking, no wheel handlers, nothing to get
          stuck behind. */}
      <div
        ref={track}
        // The track height is CSS, not state: `pinned` is false on the first
        // render and only settles in an effect, so driving the height from it
        // would shift the layout a frame after paint.
        className="relative py-[clamp(80px,12vh,152px)] lg:h-[300vh] lg:py-0"
      >
        {/* py clears the sticky nav at the top and gives the same breathing
            room at the bottom, so the centred content never sits under it */}
        <div className="px-6 sm:px-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-24">
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="bp-steps">
              <h2
                className="max-w-[16ch] text-balance leading-[1.04] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
              >
                How firstocean works.
              </h2>

              {/* All three steps stay visible as a row; only the current one is
                  lit, and only its copy is on the page. Not role="tablist":
                  these are also driven by scroll position, and tab semantics
                  would promise arrow-key navigation that does not exist. */}
              <ol className="mt-9 flex flex-wrap gap-2">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={s.title}>
                      {/* Ink on paper until it is this step's turn, then the
                          whole pill inverts. State is carried by the reversal
                          alone, which is why there is no longer a dot inside
                          it and why the resting label is full-strength ink
                          rather than a muted grey: nothing here is disabled,
                          so nothing should read as faded.

                          font-sans overrides the display face .bp-root sets on
                          the page, and `lowercase` is a CSS transform rather
                          than the data, so the accessible name stays capitalised. */}
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? "step" : undefined}
                        className="inline-flex items-center rounded-full border px-5 py-2.5 font-sans text-[0.92rem] font-medium lowercase leading-none tracking-[-0.005em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
                        style={{
                          background: active
                            ? "var(--bp-ink)"
                            : "var(--bp-paper)",
                          borderColor: active
                            ? "var(--bp-ink)"
                            : "var(--bp-hairline-strong)",
                          color: active ? "var(--bp-paper)" : "var(--bp-ink)",
                        }}
                      >
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* key remounts the copy, which is what fades the new step in.
                  The min-height is the tallest of the three bodies: without it
                  the centred grid would shift every time the step changes. */}
              <p
                key={step}
                className="bp-fly mt-10 min-h-[10rem] max-w-[38ch] text-[1.18rem] leading-[1.5] sm:text-[1.32rem]"
                style={{ color: "var(--bp-ink)" }}
              >
                {STEPS[step].body}
              </p>
            </div>

            <div
              className="bp-stage relative aspect-[468/334] overflow-hidden rounded-[var(--bp-r-md)] border"
              style={{
                color: "var(--bp-blue)",
                borderColor: "var(--bp-hairline)",
                background: "var(--bp-paper)",
              }}
            >
              {/* key remounts the scene, which replays its entry animation */}
              <Scene key={step} step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
