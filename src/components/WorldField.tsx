'use client';

import { useEffect, useRef } from "react";
import { GRID, GRID_COLS, GRID_ROWS } from "@/lib/worldGrid";

/* The markets visual.

   Three deliberate choices. It is flat rather than a globe, because a rotating
   world is the house style of every company in this category and says nothing.
   It is an Equal Earth projection rather than Mercator, because Mercator
   inflates the wealthy north and shrinks exactly the regions this page argues
   for — the projection would contradict the text beside it. And it animates
   once, on entry, rather than looping: a loop asks to be watched, and this is
   a background for an argument.

   The sequence is the argument in three beats. Everything appears equal. The
   core three brighten and the rest falls away, which is the industry as it
   stands. Then the rest warms back up, which is the part we work on. */

type Dot = { x: number; y: number; core: boolean; delay: number };

const DOTS: Dot[] = (() => {
  const out: Dot[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = GRID[r];
    for (let c = 0; c < GRID_COLS; c++) {
      const v = row[c];
      if (v === "0") continue;
      // Beat three sweeps west to east so the eye is led across the territory
      // rather than having it all arrive at once.
      out.push({ x: c, y: r, core: v === "2", delay: c / GRID_COLS });
    }
  }
  return out;
})();

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Beat boundaries in seconds.
const T_IN = 1.1; // everything fades up, equal
const T_SPLIT = 2.5; // core asserts, rest recedes
const T_WARM = 4.4; // rest returns in the accent

export function WorldField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let start = 0;
    let running = false;

    // Read the palette off the stylesheet rather than hard-coding it, so the
    // canvas cannot drift from the rest of the page.
    const css = getComputedStyle(document.documentElement);
    const inkRGB = css.getPropertyValue("--world-ink").trim() || "22,24,27";
    const accentRGB = css.getPropertyValue("--world-accent").trim() || "36,72,92";

    function draw(elapsed: number) {
      const cv = ref.current;
      if (!cv || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (cv.width !== w * dpr || cv.height !== h * dpr) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Fit the grid to the box, preserving the projection's aspect ratio.
      const cell = Math.min(w / GRID_COLS, h / GRID_ROWS);
      const ox = (w - cell * GRID_COLS) / 2;
      const oy = (h - cell * GRID_ROWS) / 2;
      const r = Math.max(0.7, cell * 0.3);

      for (const d of DOTS) {
        let alpha: number;
        let rgb: string;

        if (elapsed < T_IN) {
          // beat one: everything equal
          alpha = easeOut(clamp01(elapsed / T_IN)) * 0.3;
          rgb = inkRGB;
        } else if (elapsed < T_SPLIT) {
          // beat two: the core asserts, the rest recedes
          const t = easeOut(clamp01((elapsed - T_IN) / (T_SPLIT - T_IN)));
          alpha = d.core ? 0.3 + t * 0.55 : 0.3 - t * 0.22;
          rgb = inkRGB;
        } else {
          // beat three: the rest returns, swept west to east
          const t = easeOut(
            clamp01(((elapsed - T_SPLIT) / (T_WARM - T_SPLIT) - d.delay * 0.55) / 0.45)
          );
          if (d.core) {
            alpha = 0.85 - t * 0.55;
            rgb = inkRGB;
          } else {
            alpha = 0.08 + t * 0.62;
            rgb = accentRGB;
          }
        }

        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.beginPath();
        ctx.arc(ox + (d.x + 0.5) * cell, oy + (d.y + 0.5) * cell, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now: number) {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;
      draw(elapsed);
      if (elapsed < T_WARM + 0.4) raf = requestAnimationFrame(frame);
      else running = false;
    }

    function play() {
      if (running) return;
      running = true;
      start = 0;
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      // Hold the finished state. The argument survives without the motion.
      draw(T_WARM + 1);
    } else {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && play()),
        { threshold: 0.25 }
      );
      io.observe(canvas);
      const onResize = () => draw(running ? 0 : T_WARM + 1);
      window.addEventListener("resize", onResize);
      return () => {
        io.disconnect();
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(raf);
      };
    }

    const onResize = () => draw(T_WARM + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={ref}
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="Equal-area world map. The United States, Western Europe and Japan are marked apart from the rest of the world."
    />
  );
}
