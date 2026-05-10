'use client';

import { useEffect, useRef } from 'react';

export function FlowFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = (now: number) => {
      const t = now - start;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = 60;
      const len = 10;
      for (let y = step / 2; y < rect.height; y += step) {
        for (let x = step / 2; x < rect.width; x += step) {
          const angle =
            Math.sin(x * 0.005 + t * 0.0003) *
            Math.cos(y * 0.005 - t * 0.0002) *
            Math.PI;
          const dx = (Math.cos(angle) * len) / 2;
          const dy = (Math.sin(angle) * len) / 2;

          ctx.strokeStyle = 'rgba(20, 52, 203, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - dx, y - dy);
          ctx.lineTo(x + dx, y + dy);
          ctx.stroke();

          const px = -Math.sin(angle) * 1.5;
          const py = Math.cos(angle) * 1.5;
          ctx.strokeStyle = 'rgba(122, 138, 232, 0.4)';
          ctx.beginPath();
          ctx.moveTo(x - dx + px, y - dy + py);
          ctx.lineTo(x + dx + px, y + dy + py);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
