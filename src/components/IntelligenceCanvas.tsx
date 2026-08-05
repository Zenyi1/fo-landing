"use client";

import { useEffect, useRef } from "react";

// Hero animation: firstocean as an intelligence layer over the systems a biotech
// already runs. On the left, the existing systems — ERP, accounting, bank feeds,
// CTMS, email, vendor portals — stream data into a live reconciling core. The core
// reads it against the contract and fires insights back out to the right: an
// overbill flagged, a duplicate caught, spend to recover, runway extended. It
// integrates in and acts out. Deliberately near-wordless — the motion carries it.
// Respects prefers-reduced-motion with a settled frame.

const INK = "#e8eaed";
const DIM = "rgba(232,234,237,0.55)";
const ACCENT = "#88a6f8";
const MONEY = "#5fd0a0";
const FLAG = "#f0b83e";
const FONT = "ui-sans-serif, system-ui, -apple-system, sans-serif";

// existing systems firstocean plugs into — left side, feeding the core
const SOURCES = ["ERP", "Accounting", "Bank feeds", "CTMS", "Email", "Vendor portals"];

// what the core fires back out — opportunities and actions, kept short
type Kind = "flag" | "money" | "accent";
const INSIGHTS: { label: string; kind: Kind }[] = [
  { label: "Overbill flagged", kind: "flag" },
  { label: "Recover $97,500", kind: "money" },
  { label: "Duplicate caught", kind: "flag" },
  { label: "Accrual reconciled", kind: "accent" },
  { label: "Off-contract rate", kind: "flag" },
  { label: "Runway extended", kind: "money" },
  { label: "VAT to recover", kind: "money" },
  { label: "Forecast refreshed", kind: "accent" },
];
const kindColor = (k: Kind) => (k === "flag" ? FLAG : k === "money" ? MONEY : ACCENT);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

type Packet = { src: number; t: number };
type Insight = { idx: number; t: number; lane: number };

export function IntelligenceCanvas() {
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

    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const packets: Packet[] = [];
    const insights: Insight[] = [];
    let coreGlow = 0;

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

    const layout = () => {
      const small = w < 520;
      const cx = w * 0.44;
      const cy = h * 0.5;
      const coreR = Math.max(14, Math.min(24, w * 0.05));
      const srcX = w * 0.06;
      const n = SOURCES.length;
      const srcY = (i: number) => h * (0.13 + (0.74 * i) / (n - 1));
      return { small, cx, cy, coreR, srcX, srcY };
    };
    type Layout = ReturnType<typeof layout>;

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

    // right edge of a source chip, where its link to the core begins
    function chipMetrics(i: number, L: Layout, fontPx: number) {
      ctx.font = `${fontPx}px ${FONT}`;
      const padX = 9;
      const tw = ctx.measureText(SOURCES[i]).width;
      const cw = tw + padX * 2 + 12; // room for the leading dot
      const ch = fontPx + 12;
      const x = L.srcX;
      const y = L.srcY(i) - ch / 2;
      return { x, y, cw, ch, right: x + cw, cy: L.srcY(i), padX };
    }

    function drawSources(L: Layout) {
      const fontPx = L.small ? 10.5 : 12;
      for (let i = 0; i < SOURCES.length; i++) {
        const m = chipMetrics(i, L, fontPx);
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        roundRect(m.x, m.y, m.cw, m.ch, 7);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(136,166,248,0.7)";
        ctx.beginPath();
        ctx.arc(m.x + m.padX + 2, m.cy, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(232,234,237,0.82)";
        ctx.font = `${fontPx}px ${FONT}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(SOURCES[i], m.x + m.padX + 10, m.cy + 0.5);
      }
    }

    function drawLinks(L: Layout) {
      const fontPx = L.small ? 10.5 : 12;
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      for (let i = 0; i < SOURCES.length; i++) {
        const m = chipMetrics(i, L, fontPx);
        ctx.beginPath();
        ctx.moveTo(m.right + 4, m.cy);
        ctx.lineTo(L.cx - L.coreR, L.cy);
        ctx.stroke();
      }
    }

    function packetPos(p: Packet, L: Layout, fontPx: number) {
      const m = chipMetrics(p.src, L, fontPx);
      const x0 = m.right + 4;
      const y0 = m.cy;
      const x1 = L.cx - L.coreR;
      const y1 = L.cy;
      const e = p.t;
      return { x: x0 + (x1 - x0) * e, y: y0 + (y1 - y0) * e };
    }

    function drawPackets(L: Layout) {
      const fontPx = L.small ? 10.5 : 12;
      for (const p of packets) {
        const pos = packetPos(p, L, fontPx);
        const a = Math.sin(p.t * Math.PI); // fade in and out along the link
        ctx.globalAlpha = 0.25 + 0.6 * a;
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawCore(now: number, L: Layout) {
      const pulse = 0.5 + 0.5 * Math.sin(now / 620);
      ctx.save();
      // absorb glow
      if (coreGlow > 0) {
        ctx.globalAlpha = coreGlow * 0.4;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(L.cx, L.cy, L.coreR + 6 + (1 - coreGlow) * 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // outer pulse ring
      ctx.globalAlpha = 0.18 + 0.22 * pulse;
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, L.coreR + 5 + pulse * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      // core ring
      ctx.strokeStyle = "rgba(136,166,248,0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, L.coreR, 0, Math.PI * 2);
      ctx.stroke();
      // rotating processing arc — the "alive" cue
      const a0 = (now / 900) % (Math.PI * 2);
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, L.coreR, a0, a0 + Math.PI * 0.5);
      ctx.stroke();
      // bright centre
      ctx.fillStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(L.cx, L.cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawInsight(ins: Insight, L: Layout) {
      const item = INSIGHTS[ins.idx];
      const color = kindColor(item.kind);
      const fontPx = L.small ? 11 : 12.5;
      ctx.font = `600 ${fontPx}px ${FONT}`;
      const tw = ctx.measureText(item.label).width;
      const padX = 11;
      const cw = tw + padX * 2 + 12;
      const ch = fontPx + 14;

      const e = easeOut(clamp01(ins.t));
      const startX = L.cx + L.coreR;
      const endRight = w * 0.975;
      const endX = Math.max(startX, endRight - cw);
      const x = startX + (endX - startX) * e;
      const y = L.cy + ins.lane * h * 0.15 - ch / 2;

      const fadeIn = clamp01(ins.t * 6);
      const fadeOut = clamp01((1 - ins.t) * 4);
      const alpha = Math.min(fadeIn, fadeOut);
      const scale = 0.72 + 0.28 * clamp01(ins.t * 4);

      // spark from the core to the card while it emerges
      if (ins.t < 0.4) {
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, L.cy);
        ctx.lineTo(x, y + ch / 2);
        ctx.stroke();
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x + cw / 2, y + ch / 2);
      ctx.scale(scale, scale);
      ctx.translate(-(cw / 2), -(ch / 2));
      // card
      ctx.fillStyle = "rgba(14,16,19,0.92)";
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha * 0.9;
      ctx.lineWidth = 1.2;
      roundRect(0, 0, cw, ch, 8);
      ctx.fill();
      ctx.stroke();
      // dot
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(padX + 2, ch / 2, 2.8, 0, Math.PI * 2);
      ctx.fill();
      // label
      ctx.fillStyle = INK;
      ctx.font = `600 ${fontPx}px ${FONT}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(item.label, padX + 12, ch / 2 + 0.5);
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // caption anchoring the two sides, the only fixed words in the frame
    function drawSideLabels(L: Layout) {
      ctx.fillStyle = DIM;
      ctx.font = `600 10px ${FONT}`;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.fillText("YOUR SYSTEMS", L.srcX, h * 0.055);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(136,166,248,0.75)";
      ctx.fillText("FIRSTOCEAN ACTS", w * 0.975, h * 0.055);
    }

    let raf = 0;
    let last = 0;
    let sincePacket = 0;
    let sinceInsight = 600;
    let insightCursor = 0;
    let laneCursor = 0;
    const LANES = [-1.5, 1.5, -0.6, 0.6];

    function frame(now: number) {
      const L = layout();
      ctx.clearRect(0, 0, w, h);
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;

      // spawn packets on a rotating source, steady inbound stream
      sincePacket += dt;
      if (sincePacket > 220 && packets.length < 26) {
        sincePacket = 0;
        packets.push({ src: Math.floor(rand() * SOURCES.length) % SOURCES.length, t: 0 });
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].t += dt / 1400;
        if (packets[i].t >= 1) {
          packets.splice(i, 1);
          coreGlow = 1;
        }
      }
      coreGlow = Math.max(0, coreGlow - dt / 520);

      // fire an insight on a steady cadence
      sinceInsight += dt;
      if (sinceInsight > 1150 && insights.length < 4) {
        sinceInsight = 0;
        insights.push({ idx: insightCursor % INSIGHTS.length, t: 0, lane: LANES[laneCursor % LANES.length] });
        insightCursor++;
        laneCursor++;
      }
      for (let i = insights.length - 1; i >= 0; i--) {
        insights[i].t += dt / 2700;
        if (insights[i].t >= 1) insights.splice(i, 1);
      }

      drawLinks(L);
      drawPackets(L);
      drawCore(now, L);
      drawSources(L);
      for (const ins of insights) drawInsight(ins, L);
      drawSideLabels(L);

      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      const L = layout();
      ctx.clearRect(0, 0, w, h);
      drawLinks(L);
      drawCore(600, L);
      drawSources(L);
      // a couple of settled insight cards so the "acts out" side reads
      drawInsight({ idx: 1, t: 0.5, lane: -0.9 }, L);
      drawInsight({ idx: 0, t: 0.5, lane: 0.9 }, L);
      drawSideLabels(L);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawStatic();
    });
    ro.observe(box);
    resize();

    if (reduce) drawStatic();
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
