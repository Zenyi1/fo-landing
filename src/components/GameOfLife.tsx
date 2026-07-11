'use client';

import { useEffect, useRef } from "react";

// A cyclic cellular automaton: each cell holds one of N states/colours; a cell in state s
// advances to state s+1 when enough neighbours already hold s+1. From random noise this
// self-organises into rotating multi-colour spirals — far more complex than Conway.
// Bounded state (fixed typed arrays, no growth), pauses when the tab is hidden, and cleans
// up on unmount, so it is safe to run indefinitely.
const CELL = 13; // css px per cell
const STEP_MS = 150; // ms between generations
const ALPHA = 0.5; // cell opacity over the dark gradient
const STATES = 7;
const THRESHOLD = 1;

// 7 deep, cool hues (teal -> cyan -> blue -> violet) — dark enough to keep white text legible
const COLORS: Array<[number, number, number]> = [
  [13, 109, 109],
  [12, 94, 130],
  [30, 72, 150],
  [55, 48, 163],
  [91, 45, 170],
  [14, 90, 140],
  [110, 50, 160],
];

export function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = 1; // soft background — 1x keeps pixel work light
    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
    let next = new Uint8Array(0);
    let dr = new Float32Array(0);
    let dg = new Float32Array(0);
    let db = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let acc = 0;

    const at = (x: number, y: number) => y * cols + x;

    function seed() {
      const n = cols * rows;
      grid = new Uint8Array(n);
      next = new Uint8Array(n);
      dr = new Float32Array(n);
      dg = new Float32Array(n);
      db = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const s = Math.floor(Math.random() * STATES);
        grid[i] = s;
        dr[i] = COLORS[s][0];
        dg[i] = COLORS[s][1];
        db[i] = COLORS[s][2];
      }
    }

    function step() {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const s = grid[at(x, y)];
          const want = (s + 1) % STATES;
          let c = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + cols) % cols;
              const ny = (y + dy + rows) % rows;
              if (grid[at(nx, ny)] === want) c++;
            }
          }
          next[at(x, y)] = c >= THRESHOLD ? want : s;
        }
      }
      const tmp = grid;
      grid = next;
      next = tmp;
    }

    function ease() {
      for (let i = 0; i < grid.length; i++) {
        const c = COLORS[grid[i]];
        dr[i] += (c[0] - dr[i]) * 0.14;
        dg[i] += (c[1] - dg[i]) * 0.14;
        db[i] += (c[2] - db[i]) * 0.14;
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, cols * CELL, rows * CELL);
      const size = CELL - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = at(x, y);
          ctx!.fillStyle = `rgba(${dr[i] | 0}, ${dg[i] | 0}, ${db[i] | 0}, ${ALPHA})`;
          ctx!.fillRect(x * CELL, y * CELL, size, size);
        }
      }
    }

    function resize() {
      const w = parent!.clientWidth;
      const h = parent!.clientHeight;
      if (w === 0 || h === 0) return;
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      canvas!.width = Math.round(cols * CELL * dpr);
      canvas!.height = Math.round(rows * CELL * dpr);
      canvas!.style.width = `${cols * CELL}px`;
      canvas!.style.height = `${rows * CELL}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) {
        for (let k = 0; k < 40; k++) step();
        for (let i = 0; i < grid.length; i++) {
          dr[i] = COLORS[grid[i]][0];
          dg[i] = COLORS[grid[i]][1];
          db[i] = COLORS[grid[i]][2];
        }
        draw();
      }
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

    resize();
    if (!reduce) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      last = 0;
      resize();
    });
    ro.observe(parent);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute left-0 top-0" aria-hidden />;
}
