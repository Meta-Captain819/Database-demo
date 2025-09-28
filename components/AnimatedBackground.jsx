"use client"
import { useEffect, useRef } from 'react';

// Optional subtle animated canvas particle field (non-blocking)
export function AnimatedBackground({ density = 28, className='' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame, w, h;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const points = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 2 + 0.6
    }));

    function step() {
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
        g.addColorStop(0,'rgba(79,210,255,0.9)');
        g.addColorStop(1,'rgba(155,107,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 w-full h-full opacity-50 ${className}`} aria-hidden="true" />;
}
