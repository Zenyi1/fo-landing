"use client";

import { useEffect, useRef } from "react";

/* The paperwork of a drug company, scattered across the hero, gathering into
   one filled square. It is the argument of the site in a single object:
   material arriving from everywhere, in different shapes and colours because it
   comes from different places, assembled into one structure without anyone
   tidying it by hand.

   From lg up the reader drives it. The hero pins and scroll position is the
   animation's clock, so the square is finished before the page is allowed to
   move on. Below lg there is nothing to pin to that is not most of a phone
   screen, so it runs once on a timer there instead.

   Pieces are cut in PAIRS. A shape can only be cut from the box it is clipped
   to, so two complementary halves have to share one box: the grid is 3 by 4
   dominoes, each holding two pieces whose clip paths are exact complements of
   the same boundary. That is what lets a triangle sit against a triangle and a
   bulge sit inside its own bite, with the square still coming out solid.
   Cutting each cell on its own would leave a hole wherever a piece was not a
   rectangle, which is the whole thing this avoids.

   Twenty-four pieces, not the eighty this started as. Eighty were too small for
   a ruled line to read, which left the field looking like confetti rather than
   like paper. */

const DOM_COLS = 3;
const ROWS = 4;
const COLS = DOM_COLS * 2;
const COUNT = COLS * ROWS;

// The id of the tall element the hero sticks inside. The page owns it; this
// reads it, so the scroll maths lives next to the thing it animates.
const TRACK_ID = "hero-track";

// The pieces finish before the pin lets go, so the completed square gets a beat
// on screen rather than being released the instant it lands.
const FINISH_AT = 0.86;

// Timer fallback, below lg only.
const DELAY_MS = 400;
const RUN_MS = 2400;

// Each piece gathers over 45% of the run, staggered by index, so the square
// fills in rather than snapping together all at once.
const SETTLE = 0.45;
const STAGGER = 1 - SETTLE;

/* One colour per source. The accent carries most of the field so the thing
   still reads as this page rather than as confetti; the rest are held to the
   same value and saturation as each other, so they sit as siblings of the blue
   instead of competing with it. */
const ACCENT = "#2f6592";
const OTHERS = ["#3d8b87", "#7a6ea6", "#b5813f", "#a85a4e", "#4a5a6b"];

// Deterministic scatter. Math.random would give the server and the client
// different layouts and blow up hydration, so everything is hashed from the
// index instead — random-looking, and identical in both places.
function noise(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* A cut is described once, as the boundary running down its domino from the top
   edge to the bottom edge. Both halves are then derived from that same list of
   points, so they cannot disagree: the left half closes down the left edge, the
   right half closes down the right edge, and between them they account for
   every point in the box exactly once.

   Percentages are of the domino, which is 2:1, so a circular bulge comes out as
   an ellipse. That is fine and it is why the arc is written with separate x and
   y radii rather than as a circle. */
type Pt = [number, number];

const arc = (cx: number, cy: number, rx: number, ry: number, dir: 1 | -1) =>
  Array.from({ length: 11 }, (_, k): Pt => {
    const a = -Math.PI / 2 + (k / 10) * Math.PI;
    return [cx + dir * rx * Math.cos(a), cy + ry * Math.sin(a)];
  });

const CUTS: Pt[][] = [
  // straight: two rectangles
  [
    [50, 0],
    [50, 100],
  ],
  // corner to corner, both ways: two triangles
  [
    [0, 0],
    [100, 100],
  ],
  [
    [100, 0],
    [0, 100],
  ],
  // a bulge one way and then the other: a half-moon against its own bite
  [[50, 0], ...arc(50, 50, 19, 30, 1), [50, 100]],
  [[50, 0], ...arc(50, 50, 19, 30, -1), [50, 100]],
  // a slow S: the closest thing here to a blob
  [
    [50, 0],
    [66, 26],
    [40, 52],
    [62, 76],
    [50, 100],
  ],
];

const clip = (pts: Pt[]) =>
  `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(", ")})`;

// left half closes down the left edge, right half down the right edge
function halves(cut: Pt[]) {
  const left: Pt[] = [[0, 0], ...cut, [0, 100]];
  const right: Pt[] = [[100, 0], [100, 100], ...[...cut].reverse()];
  return [clip(left), clip(right)];
}

/* Offsets are percentages of a piece's own size. The frame is the hero's right
   column, so the space to scatter into is almost all to the left: dx runs from
   roughly a screen-width out to just past the right edge, which puts the
   starting field across the whole hero. */
const PIECES = Array.from({ length: COUNT }, (_, i) => {
  const hue = noise(i, 4);
  // two pieces per domino, and the domino decides which cut they share
  const dom = Math.floor(i / 2);
  return {
    dx: -1050 * noise(i, 1) + 60,
    dy: (noise(i, 2) - 0.5) * 780,
    rot: (noise(i, 3) - 0.5) * 130,
    start: (i / COUNT) * STAGGER,
    color: hue < 0.5 ? ACCENT : OTHERS[Math.floor(noise(i, 6) * OTHERS.length)],
    // pale body, saturated header: the field stays colourful where the pieces
    // meet, and stays quiet enough to read as paper rather than as a swatch
    tint: 14 + noise(i, 5) * 16,
    clip: halves(CUTS[Math.floor(noise(dom, 8) * CUTS.length)])[i % 2],
    // the box is the domino, not the cell: both halves sit on top of it
    left: ((dom % DOM_COLS) / DOM_COLS) * 100,
    top: (Math.floor(dom / DOM_COLS) / ROWS) * 100,
  };
});

/* The scattered state has to be legible on its own — it is half the point, and
   it is what is on screen while the reader takes in the headline. An earlier
   pass started the pieces at 0.2 opacity and half scale, which on a tint mixed
   into white came out about four percent off the page background: they were
   there, and invisible. They start solid and near full size now, and the
   gathering is carried by position rather than by fading in. */
/* Everything here is rounded to three decimals, and that is load-bearing rather
   than tidiness. Browsers normalise parsed CSS values to six decimal places, so
   a server-rendered `translate(-936.201569499317%, ...)` comes back out of the
   CSSOM as `-936.201569%`. React then compares its own full-precision value
   against the normalised one, finds them different, and reports a hydration
   mismatch it refuses to patch up. Rounding short of six decimals leaves the
   browser nothing to normalise. */
const px = (n: number) => n.toFixed(3);

function frame(p: (typeof PIECES)[number], t: number) {
  const local = Math.min(1, Math.max(0, (t - p.start) / SETTLE));
  const e = 1 - Math.pow(1 - local, 3);
  const away = 1 - e;
  return {
    transform: `translate(${px(p.dx * away)}%, ${px(p.dy * away)}%) rotate(${px(p.rot * away)}deg) scale(${px(0.78 + 0.22 * e)})`,
    opacity: px(0.72 + 0.28 * e),
  };
}

export function HeroSort() {
  const cells = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const paint = (t: number) => {
      for (let i = 0; i < COUNT; i++) {
        const cell = cells.current[i];
        if (!cell) continue;
        const f = frame(PIECES[i], t);
        cell.style.transform = f.transform;
        cell.style.opacity = f.opacity;
      }
    };

    // once gathered they never move again, so drop the compositor hint rather
    // than leaving the pieces promoted for the rest of the session
    const release = () => {
      for (const cell of cells.current) {
        if (cell) cell.style.willChange = "auto";
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      release();
      return;
    }

    const track = document.getElementById(TRACK_ID);
    const scrubs = window.matchMedia("(min-width: 1024px)");

    // ── scroll-driven, where the hero pins ────────────────────────────────
    if (scrubs.matches && track) {
      let raf = 0;
      const read = () => {
        raf = 0;
        const r = track.getBoundingClientRect();
        const scrollable = r.height - window.innerHeight;
        if (scrollable <= 0) return paint(1);
        const p = Math.min(1, Math.max(0, -r.top / scrollable));
        paint(Math.min(1, p / FINISH_AT));
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
    }

    // ── timed, everywhere else ────────────────────────────────────────────
    let raf = 0;
    let t0 = 0;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const t = Math.min(1, Math.max(0, (now - t0 - DELAY_MS) / RUN_MS));
      paint(t);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
        release();
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // No overflow-hidden and no fill: the pieces have to be able to sit outside
    // the frame on the way in, and the frame has to be empty for them to fill.
    <div
      // a wide band where it sits under the copy, the portrait panel where it
      // sits beside it
      className="relative aspect-[16/10] w-full rounded-[var(--bp-r-md)] border lg:aspect-[4/5]"
      style={{ borderColor: "var(--bp-hairline)" }}
      aria-hidden
    >
      <div
        aria-hidden
        className="bp-grid pointer-events-none absolute inset-0 rounded-[var(--bp-r-md)] opacity-60"
      />

      {PIECES.map((p, i) => {
        const initial = frame(p, 0);
        return (
          <div
            key={i}
            ref={(el) => {
              cells.current[i] = el;
            }}
            className="absolute will-change-transform"
            style={{
              // rounded for the same reason as the transform above: 100/3 is
              // 33.33333333333333, which the browser hands back as 33.333333
              left: `${px(p.left)}%`,
              top: `${px(p.top)}%`,
              width: `${px(100 / DOM_COLS)}%`,
              height: `${px(100 / ROWS)}%`,
              // painted from the scattered frame, so there is no flash of the
              // gathered square before the effect runs
              transform: initial.transform,
              opacity: initial.opacity,
            }}
          >
            {/* flush to the domino, with no inset. The pieces have to actually
                meet for the cut to read as a cut rather than as two tiles that
                happen to be near each other. */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: p.clip,
                background: `color-mix(in srgb, ${p.color} ${Math.round(p.tint)}%, #fff)`,
              }}
            >
              {/* a header band and three rules: enough for a shape to read as a
                  document at this size, and no more */}
              <div
                className="absolute inset-x-0 top-0 h-[13%]"
                style={{
                  background: `color-mix(in srgb, ${p.color} 74%, #fff)`,
                }}
              />
              {[46, 60, 74].map((top) => (
                <div
                  key={top}
                  className="absolute left-[9%] right-[22%] h-px"
                  style={{
                    top: `${top}%`,
                    background: `color-mix(in srgb, ${p.color} 46%, #fff)`,
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
