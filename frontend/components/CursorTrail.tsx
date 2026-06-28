"use client";

import { useEffect, useRef } from "react";

/**
 * Jejak kursor ala "Google Antigravity".
 * Butiran yang mengikuti kursor diganti dengan simbol kesehatan
 * (palang medis & hati) yang melayang naik lalu memudar.
 *
 * Hanya aktif di area kosong (latar). Saat kursor di atas kartu, tombol,
 * input, atau sedang mengetik, jejak TIDAK muncul.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  kind: "cross" | "heart";
  color: string;
};

const COLORS = ["#0a84ff", "#34c759", "#ff453a", "#ff9f0a"];

// Selektor area "box" tempat jejak harus dimatikan.
const BLOCK_SELECTOR =
  ".glass, .glass-strong, .glass-soft, .doc-card, .doc-panel, input, textarea, select, button, a, [data-no-trail]";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCross(ctx: CanvasRenderingContext2D, s: number) {
  const t = s * 0.36; // tebal lengan
  const l = s; // panjang
  roundRect(ctx, -t / 2, -l / 2, t, l, t * 0.35);
  ctx.fill();
  roundRect(ctx, -l / 2, -t / 2, l, t, t * 0.35);
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  const k = s / 32;
  ctx.beginPath();
  ctx.moveTo(0, 10 * k);
  ctx.bezierCurveTo(-14 * k, -4 * k, -8 * k, -16 * k, 0, -7 * k);
  ctx.bezierCurveTo(8 * k, -16 * k, 14 * k, -4 * k, 0, 10 * k);
  ctx.closePath();
  ctx.fill();
}

export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];
    let lastSpawn = 0;

    const spawn = (cx: number, cy: number) => {
      const now = performance.now();
      if (now - lastSpawn < 22) return;
      lastSpawn = now;
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: cx + (Math.random() * 12 - 6),
          y: cy + (Math.random() * 12 - 6),
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.35 - Math.random() * 0.6,
          life: 0,
          max: 750 + Math.random() * 600,
          size: 9 + Math.random() * 11,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.05,
          kind: Math.random() < 0.78 ? "cross" : "heart",
          color,
        });
      }
      if (particles.length > 180) particles = particles.slice(-180);
    };

    const onMove = (e: MouseEvent) => {
      // Lewati jika kursor berada di atas sebuah "box" (kartu/tombol/input).
      const el = e.target as HTMLElement | null;
      if (el && typeof el.closest === "function" && el.closest(BLOCK_SELECTOR)) {
        return;
      }
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let prev = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(t - prev, 50);
      prev = t;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter((p) => p.life < p.max);
      for (const p of particles) {
        p.life += dt;
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.rot += p.vr;
        const k = p.life / p.max;
        const alpha = k < 0.18 ? k / 0.18 : 1 - (k - 0.18) / 0.82;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, alpha) * 0.85;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        if (p.kind === "cross") drawCross(ctx, p.size);
        else drawHeart(ctx, p.size);
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
