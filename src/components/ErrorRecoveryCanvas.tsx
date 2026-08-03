"use client";

import { useEffect, useRef } from "react";

// A single, self-contained vignette that loops: one document arrives, the agent
// reads it against the contract, flags an error, pursues it, and the money comes
// back — then it resets with the next kind of error. Deliberately NOT a running
// tally; each loop is one clean story. Respects prefers-reduced-motion by
// holding the resolved "recovered" frame.

const EVENTS = [
  { doc: "Invoice", vendor: "CRO", issue: "Duplicate invoice", amount: 18400 },
  { doc: "Change notice", vendor: "CRO", issue: "Change order out of scope", amount: 42600 },
  { doc: "Invoice", vendor: "CDMO", issue: "Overbilled vs contract", amount: 27300 },
  { doc: "Payment", vendor: "Central lab", issue: "VAT unrecovered", amount: 9200 },
];

const INK = "#e8eaed";
const DIM = "rgba(232,234,237,0.55)";
const ACCENT = "#88a6f8";
const FLAG = "#f0b83e";
const MONEY = "#5fd0a0";

// phase durations (ms)
const D = { in: 700, inspect: 850, flag: 850, pursue: 1200, recover: 1100, hold: 900, out: 600 };
const T1 = D.in;
const T2 = T1 + D.inspect;
const T3 = T2 + D.flag;
const T4 = T3 + D.pursue;
const T5 = T4 + D.recover;
const T6 = T5 + D.hold;
const CYCLE = T6 + D.out;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function ErrorRecoveryCanvas() {
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

    function roundRect(x: number, y: number, rw: number, rh: number, r: number) {
      const rr = Math.min(r, rw / 2, rh / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + rw, y, x + rw, y + rh, rr);
      ctx.arcTo(x + rw, y + rh, x, y + rh, rr);
      ctx.arcTo(x, y + rh, x, y, rr);
      ctx.arcTo(x, y, x + rw, y, rr);
      ctx.closePath();
    }

    // draw one full state of the vignette at cycle-time `pt` for event `ev`
    function draw(pt: number, ev: (typeof EVENTS)[number], now: number) {
      ctx.clearRect(0, 0, w, h);

      const cardW = Math.min(310, w * 0.72);
      const cardH = 66;
      const cy = h * 0.44;
      const ax = w * 0.5 - cardW / 2 - 34; // agent node, left of the card
      const cardLeft0 = w * 0.5 - cardW / 2;

      // phase + status color
      let statusColor = "rgba(255,255,255,0.28)";
      let dotColor = ACCENT;
      let alpha = 1;
      let slide = 0;
      if (pt < T1) {
        alpha = clamp01(pt / T1);
        slide = (1 - easeOut(pt / T1)) * -46;
      } else if (pt < T2) {
        statusColor = "rgba(255,255,255,0.32)";
      } else if (pt < T4) {
        statusColor = "rgba(240,184,62,0.7)";
        dotColor = FLAG;
      } else if (pt < T6) {
        statusColor = "rgba(95,208,160,0.75)";
        dotColor = MONEY;
      } else {
        alpha = 1 - clamp01((pt - T6) / D.out);
        statusColor = "rgba(95,208,160,0.6)";
        dotColor = MONEY;
      }

      const cardLeft = cardLeft0 + slide;
      ctx.save();
      ctx.globalAlpha = alpha;

      // agent node + connector to the card, lit by the current phase
      const pulse = 0.5 + 0.5 * Math.sin(now / 600);
      const connLit = pt >= T2 && pt < T6;
      ctx.strokeStyle = connLit ? statusColor : "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ax + 10, cy);
      ctx.lineTo(cardLeft, cy);
      ctx.stroke();
      ctx.strokeStyle = "rgba(136,166,248,0.4)";
      ctx.beginPath();
      ctx.arc(ax, cy, 12 + pulse * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(ax, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = DIM;
      ctx.font = "11px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("agent", ax, cy + 20);

      // the document card
      ctx.fillStyle =
        pt >= T2 && pt < T4
          ? "rgba(240,184,62,0.07)"
          : pt >= T4
            ? "rgba(95,208,160,0.07)"
            : "rgba(255,255,255,0.04)";
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = 1.2;
      roundRect(cardLeft, cy - cardH / 2, cardW, cardH, 10);
      ctx.fill();
      ctx.stroke();

      // status dot + document identity
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(cardLeft + 16, cy - cardH / 2 + 18, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = "600 13px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(`${ev.doc} · ${ev.vendor}`, cardLeft + 28, cy - cardH / 2 + 18);

      // amount on the card — amber while flagged, green once recovered
      const showMoney = pt >= T2;
      if (showMoney) {
        const recovered = pt >= T4;
        ctx.fillStyle = recovered ? MONEY : FLAG;
        ctx.font = "600 17px ui-sans-serif, system-ui, -apple-system, sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(money(ev.amount), cardLeft + cardW - 16, cy + 10);
      }

      // inspection scan line sweeping across the card
      if (pt >= T1 && pt < T2) {
        const s = (pt - T1) / D.inspect;
        const sx = cardLeft + 10 + (cardW - 20) * s;
        ctx.strokeStyle = "rgba(136,166,248,0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, cy - cardH / 2 + 6);
        ctx.lineTo(sx, cy + cardH / 2 - 6);
        ctx.stroke();
      }

      // status caption below the card
      let caption = "";
      let capColor = DIM;
      if (pt < T1) caption = "";
      else if (pt < T2) caption = "reading against the contract";
      else if (pt < T3) {
        caption = ev.issue;
        capColor = FLAG;
      } else if (pt < T4) {
        const dots = ".".repeat(1 + (Math.floor(now / 350) % 3));
        caption = `pursuing reimbursement${dots}`;
        capColor = FLAG;
      } else {
        caption = "recovered";
        capColor = MONEY;
      }
      if (caption) {
        ctx.fillStyle = capColor;
        ctx.font = "600 12.5px ui-sans-serif, system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        // small check when recovered
        const prefix = pt >= T4 ? "✓  " : pt >= T2 && pt < T3 ? "⚠  " : "";
        ctx.fillText(prefix + caption, w * 0.5, cy + cardH / 2 + 16);
      }

      ctx.restore();
    }

    let raf = 0;
    let last = 0;
    let elapsed = 0;

    function frame(now: number) {
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;
      elapsed += dt;
      const idx = Math.floor(elapsed / CYCLE) % EVENTS.length;
      const pt = elapsed % CYCLE;
      draw(pt, EVENTS[idx], now);
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(T4 + 200, EVENTS[0], 600);
    });
    ro.observe(box);
    resize();

    if (reduce) draw(T4 + 200, EVENTS[0], 600);
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
