'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const COLORS = ['#F08A6C', '#F2B24C', '#4FB3A9', '#5BA4D9', '#9C86D9', '#E27FA8', '#FFFFFF'];
const SPEED = 0.7;

type Particle = { x: number; y: number; c: number; life: number };

// Coloured strokes following a slowly shifting flow field.
export default function FlowPanel({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, t = Math.random() * 1e4, frame = 0, raf = 0, visible = true;
    let ps: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      c: Math.floor(Math.random() * COLORS.length),
      life: 200 + Math.random() * 400,
    });

    const angle = (x: number, y: number) =>
      (Math.sin(x * 0.006 + t * 0.002) + Math.cos(y * 0.005 - t * 0.0015) + Math.sin((x - y) * 0.003 + t * 0.001)) * 1.3;

    const step = () => {
      t++;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.7;
      for (let c = 0; c < COLORS.length; c++) {
        ctx.strokeStyle = COLORS[c];
        ctx.beginPath();
        for (const p of ps) {
          if (p.c !== c) continue;
          const a = angle(p.x, p.y);
          ctx.moveTo(p.x, p.y);
          p.x += Math.cos(a) * SPEED;
          p.y += Math.sin(a) * SPEED;
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      ps = ps.map((p) => (--p.life < 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h ? spawn() : p));
    };

    const fade = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 0.04;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: Math.round((w * h) / 500) }, spawn);
      if (still) for (let i = 0; i < 160; i++) step();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || ++frame % 2) return;
      step();
      if (frame % 8 === 0) fade();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    if (!still) loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className={cn('flow-panel overflow-hidden rounded-2xl border border-border', className)}>
      <canvas ref={ref} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}
