'use client';

import { useEffect, useRef } from "react";
import mapData from "@/data/world-dots.json";

// the homepage cyclic automaton, masked to the world-map dots: each land dot holds one of
// N states and advances when a neighbour already holds the next state, so colour waves
// roll across the continents. emerging-market dots render brighter and larger.
const DOTS = mapData.dots as [number, number, number][];
const STEP_MS = 150;
const STATES = 7;
const THRESHOLD = 1;

// same 7 deep, cool hues as GameOfLife so the two backgrounds read as one system
const COLORS: Array<[number, number, number]> = [
  [13, 109, 109],
  [12, 94, 130],
  [30, 72, 150],
  [55, 48, 163],
  [91, 45, 170],
  [14, 90, 140],
  [110, 50, 160],
];

// lifted variant keeps the emerging-markets emphasis the static teal map had
const BRIGHT: Array<[number, number, number]> = COLORS.map(([r, g, b]) => [
  r + (255 - r) * 0.4,
  g + (255 - g) * 0.4,
  b + (255 - b) * 0.4,
]);

// precomputed 8-neighbourhoods among land dots, wrapping horizontally at the date line
const index = new Map<number, number>();
DOTS.forEach(([c, r], i) => index.set(r * mapData.cols + c, i));
const NEIGHBORS: number[][] = DOTS.map(([c, r]) => {
  const out: number[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nc = (c + dx + mapData.cols) % mapData.cols;
      const n = index.get((r + dy) * mapData.cols + nc);
      if (n !== undefined) out.push(n);
    }
  }
  return out;
});

// components smaller than the four continental landmasses (min 172 dots) cannot sustain
// waves and freeze within seconds, so island dots cycle states unconditionally instead
const ISLAND = new Uint8Array(DOTS.length);
{
  const seen = new Uint8Array(DOTS.length);
  for (let i = 0; i < DOTS.length; i++) {
    if (seen[i]) continue;
    const members = [i];
    seen[i] = 1;
    for (let k = 0; k < members.length; k++) {
      for (const nb of NEIGHBORS[members[k]]) {
        if (!seen[nb]) {
          seen[nb] = 1;
          members.push(nb);
        }
      }
    }
    if (members.length < 100) for (const m of members) ISLAND[m] = 1;
  }
}

export function WorldMap({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mql.matches;
    const n = DOTS.length;
    let grid = new Uint8Array(n);
    let next = new Uint8Array(n);
    const cr = new Float32Array(n);
    const cg = new Float32Array(n);
    const cb = new Float32Array(n);
    let cell = 0;
    let raf = 0;
    let last = 0;
    let acc = 0;

    function palette(i: number) {
      return DOTS[i][2] ? BRIGHT[grid[i]] : COLORS[grid[i]];
    }

    function seed() {
      for (let i = 0; i < n; i++) {
        grid[i] = Math.floor(Math.random() * STATES);
        const c = palette(i);
        cr[i] = c[0];
        cg[i] = c[1];
        cb[i] = c[2];
      }
    }

    function step() {
      for (let i = 0; i < n; i++) {
        const want = (grid[i] + 1) % STATES;
        let count = 0;
        for (const nb of NEIGHBORS[i]) {
          if (grid[nb] === want) count++;
        }
        next[i] = ISLAND[i] || count >= THRESHOLD ? want : grid[i];
      }
      const tmp = grid;
      grid = next;
      next = tmp;
    }

    function ease() {
      for (let i = 0; i < n; i++) {
        const c = palette(i);
        cr[i] += (c[0] - cr[i]) * 0.14;
        cg[i] += (c[1] - cg[i]) * 0.14;
        cb[i] += (c[2] - cb[i]) * 0.14;
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const r = cell * 0.32;
      for (let i = 0; i < n; i++) {
        const [c, row, emerging] = DOTS[i];
        const x = (c + 0.5) * cell;
        const y = (row + 0.5) * cell;
        ctx.fillStyle = `rgba(${cr[i] | 0}, ${cg[i] | 0}, ${cb[i] | 0}, ${emerging ? 0.9 : 0.35})`;
        ctx.beginPath();
        ctx.arc(x, y, emerging ? r * 1.2 : r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function resize() {
      if (!canvas || !parent) return;
      const width = parent.clientWidth;
      if (!width) return;
      const height = Math.round(width * (mapData.rows / mapData.cols));
      // 1x backing store — the canvas sits blurred behind content, extra pixels are wasted
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cell = width / mapData.cols;
      draw();
    }

    function frame(t: number) {
      if (!last) last = t;
      acc += t - last;
      last = t;
      if (acc >= STEP_MS) {
        step();
        acc %= STEP_MS;
      }
      ease();
      draw();
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduce && raf === 0) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    function onMotionChange() {
      reduce = mql.matches;
      if (reduce) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!document.hidden && raf === 0) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    seed();
    if (reduce) {
      for (let k = 0; k < 40; k++) step();
      for (let i = 0; i < n; i++) {
        const c = palette(i);
        cr[i] = c[0];
        cg[i] = c[1];
        cb[i] = c[2];
      }
    }
    resize();
    if (!reduce) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      last = 0;
      resize();
    });
    ro.observe(parent);
    document.addEventListener("visibilitychange", onVisibility);
    mql.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mql.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
