"use client";
import { useEffect, useRef } from "react";

/**
 * AmbientParticles — lightweight interior-page ambient effect.
 *
 * Per CLAUDE.md Page Animation Rule: interior pages get ambient effects ONLY,
 * never the full 3-layer hero stack. This is a low-density pollen / ash drift
 * canvas suitable for /services, /testimonials, /contact, /faq, /about header
 * areas. Iron-oxide motes on cream (matches design-system.md §8).
 *
 * Not a copy of HeroParticles — lower particle count (22–40), no glimmers.
 * Respects prefers-reduced-motion.
 */

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  size: number;
}

const DESKTOP_BREAKPOINT = 768;

interface AmbientParticlesProps {
  density?: "low" | "medium";
  className?: string;
}

export function AmbientParticles({
  density = "low",
  className,
}: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let animId = 0;
    let frame = 0;
    let paused = false;
    const particles: Mote[] = [];

    const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;
    const moteCount = () => {
      const base = density === "medium" ? 42 : 24;
      return isDesktop() ? base : Math.round(base * 0.55);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const viewW = () => canvas.offsetWidth || 800;
    const viewH = () => canvas.offsetHeight || 400;

    const spawn = (seedY = false): Mote => ({
      x: Math.random() * viewW(),
      y: seedY ? Math.random() * viewH() : viewH() + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.09,
      vy: -(0.08 + Math.random() * 0.18),
      opacity: 0,
      targetOpacity: 0.08 + Math.random() * 0.16,
      size: 0.6 + Math.random() * 1.2,
    });

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < moteCount(); i++) {
        const p = spawn(true);
        p.opacity = p.targetOpacity * Math.random();
        particles.push(p);
      }
    };

    const tick = () => {
      if (paused) {
        animId = requestAnimationFrame(tick);
        return;
      }
      frame++;
      if (!isDesktop() && frame % 2 !== 0) {
        animId = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, viewW(), viewH());
      ctx.fillStyle = "rgb(181, 83, 44)";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += (p.targetOpacity - p.opacity) * 0.015;
        if (Math.random() < 0.003) {
          p.targetOpacity = 0.06 + Math.random() * 0.18;
        }
        if (p.y < -10 || p.x < -10 || p.x > viewW() + 10) {
          particles[i] = spawn(false);
          continue;
        }
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    init();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={
        className ?? "pointer-events-none absolute inset-0 h-full w-full"
      }
      aria-hidden="true"
    />
  );
}

export default AmbientParticles;
