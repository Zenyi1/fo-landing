"use client";

import { useEffect, useRef } from "react";

// Ambient layer: tiny pixelated gulls drift left→right behind the page. Kept
// faint and small on purpose so body copy stays fully readable — they only show
// in the dark negative space around the text. Parallaxes gently with scroll and
// holds still under prefers-reduced-motion.

// two flap frames, as pixel offsets on a 5-wide grid: wings up (V), wings down (^)
const FRAMES: [number, number][][] = [
  [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 1],
    [4, 0],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
    [3, 1],
    [4, 2],
  ],
];

type Bird = {
  x: number;
  y: number;
  speed: number;
  px: number;
  alpha: number;
  depth: number;
  flap: number;
  t0: number;
};

export function BirdsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // The global <body> is navy (#071a2b) for the main site; this page is
    // near-black. That body colour is what the browser paints into the
    // overscroll ("rubber-band") area past the top and bottom, so neutralise it
    // at the source — on both <html> and <body> — and restore on unmount.
    const root = document.documentElement;
    const { body } = document;
    const prevRootBg = root.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;
    root.style.backgroundColor = "#0a0b0d";
    body.style.backgroundColor = "#0a0b0d";
    const restoreBg = () => {
      root.style.backgroundColor = prevRootBg;
      body.style.backgroundColor = prevBodyBg;
    };

    const canvas = canvasRef.current;
    if (!canvas) return restoreBg;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return restoreBg;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return restoreBg;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    // spread the flock across depth bands: near birds are larger, faster, and a
    // touch brighter; far ones drift slowly. Index-based so it's stable.
    const N = 16;
    const birds: Bird[] = Array.from({ length: N }, (_, i) => {
      const depthT = (i % 4) / 3; // 0 near → 1 far
      return {
        x: ((i * 137.5) % (w + 200)) - 100,
        y: (((i * 89) % 100) / 100) * h,
        speed: 22 - depthT * 13, // px/s, near birds faster
        px: depthT < 0.5 ? 2 : 1.5,
        alpha: 0.18 - depthT * 0.09, // 0.18 near → 0.09 far
        depth: 0.03 + depthT * 0.06,
        flap: 1.5 + ((i * 7) % 5) * 0.25,
        t0: (i * 313) % 1000,
      };
    });

    let raf = 0;
    let last = 0;
    const draw = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const b of birds) {
        b.x += b.speed * dt;
        if (b.x > w + 40) {
          b.x = -40;
          b.y = (((b.y + 173) % h) + h) % h;
        }
        const y = (((b.y - scrollY * b.depth) % h) + h) % h;
        const frame = FRAMES[Math.floor(((now + b.t0) / 1000) * b.flap) % 2];
        ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
        const s = b.px;
        const step = Math.ceil(s);
        for (const [dx, dy] of frame) {
          ctx.fillRect(Math.round(b.x + dx * s), Math.round(y + dy * s), step, step);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      restoreBg();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
