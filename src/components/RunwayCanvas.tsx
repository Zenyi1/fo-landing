"use client";

import { useEffect, useRef } from "react";

// The vision graphic as a fuel gauge, not a chart. Two horizontal runway bars
// fill green (months funded) then run empty, both racing to the same fixed "data
// readout" flag. Without first ocean, the bar empties BEFORE the flag — you raise
// out of cash, forced and dilutive. With first ocean (recovered spend + a tighter
// close), the same money funds you PAST the flag — you cross the readout still
// funded and raise from strength. The green bracket is the runway we add, with
// the flag sitting inside it. One dimension only: how far you get before empty.
// Loops; respects prefers-reduced-motion by drawing the finished state.

const INK = "#e8eaed";
const DIM = "rgba(232,234,237,0.5)";
const MONEY = "#5fd0a0";
const DANGER = "#e8825f";
const TRACK = "rgba(255,255,255,0.06)";
const FONT = "ui-sans-serif, system-ui, -apple-system, sans-serif";

// funded fraction of the programme timeline px∈[0,1]
const BASE_FUNDED = 0.46; // without first ocean: empties here
const OPT_FUNDED = 0.96; // with first ocean: empties here
const READOUT_PX = 0.68; // data-readout flag, fixed on the timeline
const TIMELINE_MONTHS = 24;
const ADDED_MONTHS = Math.round((OPT_FUNDED - BASE_FUNDED) * TIMELINE_MONTHS);

// animation phases (ms)
const D = { base: 1100, opt: 1500, mark: 900, hold: 2600 };
const T1 = D.base;
const T2 = T1 + D.opt;
const T3 = T2 + D.mark;
const CYCLE = T3 + D.hold;

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function RunwayCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const box: HTMLDivElement = wrap;
    const cv: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;

    function resize() {
      const rect = box.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const geom = () => {
      const x0 = w * 0.08;
      const x1 = w * 0.94;
      const X = (px: number) => x0 + (x1 - x0) * px;
      const barH = Math.max(15, Math.min(30, h * 0.11));
      const bar1Y = h * 0.34;
      const bar2Y = h * 0.6;
      const flagX = X(READOUT_PX);
      const flagTop = h * 0.19;
      const flagBottom = bar2Y + barH + h * 0.05;
      return { x0, x1, X, barH, bar1Y, bar2Y, flagX, flagTop, flagBottom };
    };
    type Geom = ReturnType<typeof geom>;

    function rr(x: number, y: number, wd: number, ht: number, r: number) {
      const rad = Math.max(0, Math.min(r, ht / 2, wd / 2));
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.arcTo(x + wd, y, x + wd, y + ht, rad);
      ctx.arcTo(x + wd, y + ht, x, y + ht, rad);
      ctx.arcTo(x, y + ht, x, y, rad);
      ctx.arcTo(x, y, x + wd, y, rad);
      ctx.closePath();
    }

    // one runway bar: dim track, green funded portion, optional danger tail
    function bar(g: Geom, topY: number, funded: number, danger: boolean) {
      const bw = g.x1 - g.x0;
      const r = g.barH / 2;
      // track
      rr(g.x0, topY, bw, g.barH, r);
      ctx.fillStyle = TRACK;
      ctx.fill();
      // clip to the pill, then paint fills as plain rects
      ctx.save();
      rr(g.x0, topY, bw, g.barH, r);
      ctx.clip();
      const fx = g.X(funded);
      // danger tail (running on empty) behind the green
      if (danger) {
        ctx.fillStyle = "rgba(232,130,95,0.16)";
        ctx.fillRect(fx, topY, g.x1 - fx, g.barH);
      }
      // funded (green)
      ctx.fillStyle = MONEY;
      ctx.fillRect(g.x0, topY, fx - g.x0, g.barH);
      ctx.restore();
    }

    function draw(pt: number) {
      const g = geom();
      ctx.clearRect(0, 0, w, h);

      // ── data-readout flag: fixed milestone crossing both bars ──
      const goalA = clamp01(pt / 400);
      ctx.globalAlpha = goalA;
      ctx.strokeStyle = "rgba(232,234,237,0.28)";
      ctx.setLineDash([4, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(g.flagX, g.flagTop + 8);
      ctx.lineTo(g.flagX, g.flagBottom);
      ctx.stroke();
      ctx.setLineDash([]);
      // pennant
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.moveTo(g.flagX, g.flagTop);
      ctx.lineTo(g.flagX + 11, g.flagTop + 4);
      ctx.lineTo(g.flagX, g.flagTop + 8);
      ctx.closePath();
      ctx.fill();
      ctx.font = `600 11.5px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("data readout", g.flagX, g.flagTop - 4);
      ctx.globalAlpha = 1;

      // ── bar identity labels ──
      ctx.font = `11.5px ${FONT}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = DIM;
      ctx.fillText("without firstocean", g.x0, g.bar1Y - 8);
      ctx.fillStyle = "rgba(95,208,160,0.85)";
      ctx.fillText("with firstocean", g.x0, g.bar2Y - 8);

      // ── the two runway bars fill in sequence ──
      const f1 = BASE_FUNDED * easeOut(clamp01(pt / T1));
      const f2 = OPT_FUNDED * easeOut(clamp01((pt - T1 * 0.5) / D.opt));
      bar(g, g.bar1Y, f1, true);
      bar(g, g.bar2Y, f2, false);

      // timeline direction cue
      ctx.fillStyle = DIM;
      ctx.font = `10.5px ${FONT}`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("programme timeline →", g.x1, h * 0.96);

      // ── runway we add: bracket under the second bar ──
      if (pt >= T2) {
        const b = easeOut(clamp01((pt - T2) / D.mark));
        const by = g.bar2Y + g.barH + Math.max(14, g.barH * 0.6);
        const xa = g.X(BASE_FUNDED);
        const xEnd = g.X(BASE_FUNDED + (OPT_FUNDED - BASE_FUNDED) * b);
        ctx.strokeStyle = MONEY;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xa, by);
        ctx.lineTo(xEnd, by);
        ctx.moveTo(xa, by - 5);
        ctx.lineTo(xa, by);
        ctx.moveTo(xEnd, by - 5);
        ctx.lineTo(xEnd, by);
        ctx.stroke();
        if (b > 0.6) {
          ctx.globalAlpha = clamp01((b - 0.6) / 0.4);
          ctx.fillStyle = MONEY;
          ctx.font = `700 12.5px ${FONT}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            `+${ADDED_MONTHS} months of runway`,
            (xa + g.X(OPT_FUNDED)) / 2,
            by + 6,
          );
          ctx.globalAlpha = 1;
        }
      }

      // ── outcome: forced raise (bar 1 empties before the flag) ──
      if (f1 >= BASE_FUNDED - 0.002) {
        const mx = g.X(BASE_FUNDED);
        const my = g.bar1Y + g.barH / 2;
        ctx.strokeStyle = DANGER;
        ctx.lineWidth = 2;
        const s = 4.5;
        ctx.beginPath();
        ctx.moveTo(mx - s, my - s);
        ctx.lineTo(mx + s, my + s);
        ctx.moveTo(mx + s, my - s);
        ctx.lineTo(mx - s, my + s);
        ctx.stroke();
        ctx.fillStyle = DANGER;
        ctx.font = `600 11.5px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("forced raise", mx, g.bar1Y + g.barH + 7);
      }

      // ── outcome: raise from strength (bar 2 crosses the flag funded) ──
      if (f2 >= READOUT_PX - 0.002) {
        const my = g.bar2Y + g.barH / 2;
        ctx.fillStyle = MONEY;
        ctx.beginPath();
        ctx.arc(g.flagX, my, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(10,11,13,0.9)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = INK;
        ctx.font = `600 11.5px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("raise from strength", g.flagX, g.bar2Y - 8 - 16);
      }
    }

    let raf = 0;
    let last = 0;
    let elapsed = 0;

    function frame(now: number) {
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;
      elapsed = (elapsed + dt) % CYCLE;
      draw(elapsed);
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(T3);
    });
    ro.observe(box);
    resize();

    if (reduce) draw(T3);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
