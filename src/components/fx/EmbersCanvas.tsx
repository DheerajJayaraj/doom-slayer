import React, { useEffect, useRef } from 'react';

export const EmbersCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const embers = Array.from({ length: reduceMotion ? 12 : 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.5,
      s: Math.random() * 0.0007 + 0.00025,
      a: Math.random() * 0.6 + 0.25,
    }));

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const drawEmbers = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((p) => {
        p.y -= p.s;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        ctx.fillStyle = `rgba(255,86,45,${p.a})`;
        ctx.fillRect(p.x * canvas.width, p.y * canvas.height, p.r, p.r * 3);
      });

      if (!reduceMotion) {
        animId = requestAnimationFrame(drawEmbers);
      }
    };

    drawEmbers();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="praetor-embers" aria-hidden="true" />;
};
