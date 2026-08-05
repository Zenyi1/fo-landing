"use client";

import { useEffect, useRef } from "react";

// The hero animation is the system of record. The agent sits at the centre; the
// vendors a clinical-stage sponsor actually outsources to ring it in an almost-
// full circle, open to the left. Paperwork rises from the bottom, the agent
// reads each piece and flings it to the right record. No errors, no money here —
// that story lives in the reconciliation vignette below. The point is breadth:
// someone who coordinates this every day should see their whole mess absorbed.
// Respects prefers-reduced-motion with a single settled frame.

// The real spread of what a sponsor outsources — each is a record. Representative
// documents per function so a flying doc always matches where it lands.
const RECORDS: { label: string; docs: string[] }[] = [
  { label: "CRO", docs: ["Work order", "Monitoring report", "Change order"] },
  { label: "CDMO", docs: ["Batch record", "Certificate of analysis", "Work order"] },
  { label: "Central lab", docs: ["Lab manual", "Kit invoice", "Sample report"] },
  { label: "Bioanalysis", docs: ["PK report", "Assay invoice"] },
  { label: "Biostatistics", docs: ["Analysis plan", "TLF package"] },
  { label: "Medical writing", docs: ["CSR draft", "Protocol amendment"] },
  { label: "Regulatory", docs: ["Submission", "IND update"] },
  { label: "Pharmacovigilance", docs: ["SAE report", "Safety update"] },
  { label: "Randomisation", docs: ["Randomisation list", "IRT invoice"] },
  { label: "IMP logistics", docs: ["Shipment", "Depot invoice"] },
  { label: "Comparator", docs: ["Comparator PO", "Sourcing invoice"] },
  { label: "Sites", docs: ["Site contract", "Site payment"] },
];

const INK = "#e8eaed";
const DIM = "rgba(232,234,237,0.55)";
const ACCENT = "#88a6f8";
const HAIRLINE = "rgba(255,255,255,0.06)";

// arc geometry: a 260° ring with the 100° gap centred on the left (180°)
const ARC_START = 130; // degrees (lower-left)
const ARC_SWEEP = -260; // clockwise to upper-left
const DEG = Math.PI / 180;

type Phase = "toHub" | "atHub" | "toFolder";
type Doc = { label: string; record: number; phase: Phase; t: number; sy: number };
type Folder = { count: number; flash: number };

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function AgentFilingCanvas() {
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

    const folders: Folder[] = RECORDS.map(() => ({ count: 0, flash: 0 }));
    const docs: Doc[] = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

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
      // hub sits left-of-centre so the ring and its right-side labels have room
      const hubX = w * 0.43;
      const hubY = h * 0.5;
      const R = Math.min(h * 0.31, w * 0.2);
      const small = w < 520;
      const angleOf = (i: number) =>
        (ARC_START + ARC_SWEEP * (i / (RECORDS.length - 1))) * DEG;
      const point = (i: number) => {
        const a = angleOf(i);
        return { x: hubX + R * Math.cos(a), y: hubY + R * Math.sin(a), a };
      };
      return { hubX, hubY, R, small, point };
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

    function spawn() {
      const r = Math.floor(rand() * RECORDS.length) % RECORDS.length;
      const opts = RECORDS[r].docs;
      const label = opts[Math.floor(rand() * opts.length) % opts.length];
      // enter from the left, through the open mouth of the ring
      docs.push({ label, record: r, phase: "toHub", t: 0, sy: 0.28 + rand() * 0.44 });
    }

    function docPos(d: Doc, L: Layout) {
      const startX = -w * 0.06;
      const startY = h * d.sy;
      if (d.phase === "toHub") {
        const e = easeInOut(d.t);
        return {
          x: startX + (L.hubX - startX) * e,
          y: startY + (L.hubY - startY) * e,
          scale: 1,
          alpha: Math.min(1, d.t * 3),
        };
      }
      if (d.phase === "atHub") return { x: L.hubX, y: L.hubY, scale: 1, alpha: 1 };
      const e = easeOut(d.t);
      const p = L.point(d.record);
      return {
        x: L.hubX + (p.x - L.hubX) * e,
        y: L.hubY + (p.y - L.hubY) * e,
        scale: 1 - 0.55 * e,
        alpha: 1 - (1 / 0.55) * 0.9 * Math.max(0, e - 0.45),
      };
    }

    function drawDoc(d: Doc, L: Layout) {
      const p = docPos(d, L);
      const dw = 100 * p.scale;
      const dh = 23 * p.scale;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.strokeStyle = "rgba(255,255,255,0.26)";
      ctx.lineWidth = 1;
      roundRect(p.x - dw / 2, p.y - dh / 2, dw, dh, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(p.x - dw / 2 + 9, p.y, 2.3 * p.scale, 0, Math.PI * 2);
      ctx.fill();
      if (p.scale > 0.78) {
        ctx.fillStyle = INK;
        ctx.font = "10.5px ui-sans-serif, system-ui, -apple-system, sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(d.label, p.x - dw / 2 + 16, p.y + 0.5);
      }
      ctx.restore();
    }

    function drawHub(now: number, L: Layout) {
      const pulse = 0.5 + 0.5 * Math.sin(now / 640);
      ctx.save();
      ctx.strokeStyle = "rgba(136,166,248,0.4)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(L.hubX, L.hubY, 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.16 + 0.2 * pulse;
      ctx.strokeStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(L.hubX, L.hubY, 21 + pulse * 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(L.hubX, L.hubY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = DIM;
      ctx.font = "11px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      //ctx.fillText("agent", L.hubX, L.hubY);
      ctx.restore();
    }

    function drawBucket(i: number, L: Layout) {
      const f = folders[i];
      const p = L.point(i);
      const ca = Math.cos(p.a);
      const sa = Math.sin(p.a);

      // faint spoke from hub to the record
      ctx.strokeStyle = HAIRLINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(L.hubX + ca * 18, L.hubY + sa * 18);
      ctx.lineTo(p.x - ca * 10, p.y - sa * 10);
      ctx.stroke();

      // node — grows subtly as its record fills, brightens on receipt
      const grow = Math.min(4, Math.log2(f.count + 1));
      const rad = 3.2 + grow + f.flash * 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = f.flash > 0 ? ACCENT : "rgba(136,166,248,0.55)";
      ctx.fill();
      if (f.flash > 0) {
        ctx.globalAlpha = f.flash * 0.5;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad + 4 + (1 - f.flash) * 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // label placed radially outward, aligned by which side of the ring it's on
      ctx.fillStyle = f.flash > 0 ? INK : "rgba(232,234,237,0.82)";
      ctx.font = `${L.small ? 10.5 : 11.5}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
      const off = rad + 8;
      if (ca > 0.25) {
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(RECORDS[i].label, p.x + off, p.y);
      } else if (ca < -0.25) {
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(RECORDS[i].label, p.x - off, p.y);
      } else {
        ctx.textAlign = "center";
        ctx.textBaseline = sa > 0 ? "top" : "bottom";
        ctx.fillText(RECORDS[i].label, p.x, p.y + (sa > 0 ? off : -off));
      }
    }

    let raf = 0;
    let last = 0;
    let sinceSpawn = 400;

    function frame(now: number) {
      const L = layout();
      ctx.clearRect(0, 0, w, h);
      const dt = last ? Math.min(48, now - last) : 16;
      last = now;

      sinceSpawn += dt;
      if (sinceSpawn > 1000 && docs.length < 12) {
        sinceSpawn = 0;
        spawn();
      }

      for (let i = docs.length - 1; i >= 0; i--) {
        const d = docs[i];
        if (d.phase === "toHub") {
          d.t += dt / 1300;
          if (d.t >= 1) {
            d.t = 0;
            d.phase = "atHub";
          }
        } else if (d.phase === "atHub") {
          d.t += dt / 320;
          if (d.t >= 1) {
            d.t = 0;
            d.phase = "toFolder";
          }
        } else {
          d.t += dt / 820;
          if (d.t >= 1) {
            folders[d.record].count += 1;
            folders[d.record].flash = 1;
            docs.splice(i, 1);
          }
        }
      }

      for (const f of folders) f.flash = Math.max(0, f.flash - dt / 620);

      ctx.save();
      for (let i = 0; i < RECORDS.length; i++) drawBucket(i, L);
      ctx.restore();
      drawHub(now, L);
      for (const d of docs) drawDoc(d, L);

      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      const L = layout();
      ctx.clearRect(0, 0, w, h);
      folders.forEach((f, i) => (f.count = 2 + ((i * 5) % 9)));
      ctx.save();
      for (let i = 0; i < RECORDS.length; i++) drawBucket(i, L);
      ctx.restore();
      drawHub(600, L);
      drawDoc({ label: "Work order", record: 6, phase: "toFolder", t: 0.4, sy: 0.5 }, L);
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
