"use client";

import { useEffect, useRef } from "react";

/* Eighty pieces, scattered across the whole hero, that gather into one filled
   square. It is the argument of the site in a single object: material arriving
   from everywhere, in different colours because it comes from different
   places, assembled into one structure without anyone tidying it by hand.

   It runs once, shortly after load. The pieces overflow the frame on the way
   in, so they start spread across the full width of the hero — behind the
   headline, not inside the box they end up filling. */

const COLS = 8;
const ROWS = 10;
const COUNT = COLS * ROWS;

// The pause before it starts, and how long the whole field takes to gather.
const DELAY_MS = 550;
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

/* Offsets are percentages of a piece's own size. The frame is the hero's right
   column, so the space to scatter into is almost all to the left: dx runs from
   roughly a screen-width out to just past the right edge, which puts the
   starting field across the whole hero. */
const PIECES = Array.from({ length: COUNT }, (_, i) => {
  const hue = noise(i, 4);
  return {
    dx: -1050 * noise(i, 1) + 60,
    dy: (noise(i, 2) - 0.5) * 780,
    rot: (noise(i, 3) - 0.5) * 130,
    start: (i / COUNT) * STAGGER,
    color: hue < 0.5 ? ACCENT : OTHERS[Math.floor(noise(i, 6) * OTHERS.length)],
    outlined: noise(i, 7) > 0.74,
    tone: 22 + noise(i, 5) * 68,
  };
});

function frame(p: (typeof PIECES)[number], t: number) {
  const local = Math.min(1, Math.max(0, (t - p.start) / SETTLE));
  const e = 1 - Math.pow(1 - local, 3);
  const away = 1 - e;
  return {
    transform: `translate(${p.dx * away}%, ${p.dy * away}%) rotate(${p.rot * away}deg) scale(${0.5 + 0.5 * e})`,
    opacity: String(0.2 + 0.8 * e),
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
    // than leaving eighty promoted layers behind for the rest of the session
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
      className="relative aspect-[4/5] w-full rounded-[var(--bp-r-md)] border"
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
              left: `${((i % COLS) / COLS) * 100}%`,
              top: `${(Math.floor(i / COLS) / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              // painted from the scattered frame, so there is no flash of the
              // gathered square before the effect runs
              transform: initial.transform,
              opacity: initial.opacity,
            }}
          >
            <div
              className="absolute inset-[6%] rounded-[3px]"
              style={
                p.outlined
                  ? { boxShadow: `inset 0 0 0 1px ${p.color}` }
                  : {
                      background: `color-mix(in srgb, ${p.color} ${Math.round(p.tone)}%, #fff)`,
                    }
              }
            />
          </div>
        );
      })}
    </div>
  );
}
