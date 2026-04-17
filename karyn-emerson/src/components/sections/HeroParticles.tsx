"use client";
import { useEffect, useRef } from "react";

/**
 * HeroParticles — Layer 1 of the 3-layer hero.
 *
 * Brand brief (design-system.md §8): Intimate (1.5/10), Quiet (3/10),
 * Traditional (4.5/10). Translation to motion: SLOW, AMBIENT, WARM DRIFT —
 * pollen motes / October ash / sunbeam dust. NOT explosive, NOT geometric,
 * NOT electric.
 *
 * Source pattern: Sylvia Rich HeroParticles (motes + glimmers) — adapted for
 * a LIGHT cream background. Particles are DARKER than the cream bg
 * (iron-oxide at low opacity 0.10–0.28) so they read as pollen/ash drifting
 * across paper — NOT inverted from a dark-theme reference.
 *
 * Palette: iron-oxide #B5532C (--accent) motes + warm near-brown accents.
 * Cycle: ~12–15s drift (slower than Sylvia's 8s). Respects prefers-reduced-motion.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  type: "mote" | "glimmer";
  tint: "oxide" | "umber"; // two subtly different warm tones
  glimmerLife?: number;
  glimmerMaxLife?: number;
}

// Mobile-aware density — ~60% reduction under 768px per brief.
const DESKTOP_BREAKPOINT = 768;
const MOTE_COUNT_MOBILE = 36;
const MOTE_COUNT_DESKTOP = 95;
const GLIMMER_INTERVAL_MOBILE = 140;  // frames between glimmer spawns
const GLIMMER_INTERVAL_DESKTOP = 75;

// Iron-oxide hex — the brand accent. We render as rgba to vary alpha per particle.
const OXIDE_RGB = "181, 83, 44";      // #B5532C — design-system.md §2 --accent
const UMBER_RGB = "120, 75, 50";      // warm near-brown — a second drift tone for depth

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion — skip canvas entirely, let the static
    // cream background read through (no frozen canvas artifact).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let animId = 0;
    let frame = 0;
    let paused = false;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const viewW = () => canvas.offsetWidth || 800;
    const viewH = () => canvas.offsetHeight || 600;

    const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;
    const moteCount = () => (isDesktop() ? MOTE_COUNT_DESKTOP : MOTE_COUNT_MOBILE);
    const glimmerInterval = () =>
      isDesktop() ? GLIMMER_INTERVAL_DESKTOP : GLIMMER_INTERVAL_MOBILE;

    const spawnMote = (seedY = false): Particle => ({
      x: Math.random() * viewW(),
      y: seedY ? Math.random() * viewH() : viewH() + Math.random() * 40,
      // Slow warm drift — design-system §8 "pollen / leaf-fall / ash drift"
      // vy between -0.10 and -0.32 = ~12–15s to traverse a 540px hero container.
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.10 + Math.random() * 0.22),
      opacity: 0,
      targetOpacity: 0.10 + Math.random() * 0.18, // 0.10–0.28 against cream
      size: 0.7 + Math.random() * 1.4,
      type: "mote",
      tint: Math.random() < 0.72 ? "oxide" : "umber",
    });

    const spawnGlimmer = (): Particle => ({
      x: 60 + Math.random() * (viewW() - 120),
      y: 60 + Math.random() * (viewH() * 0.75),
      vx: 0,
      vy: -0.06,
      opacity: 0,
      targetOpacity: 0.32,   // glimmers are subtle — Quiet 3/10, not flashy
      size: 2.2 + Math.random() * 2.2,
      type: "glimmer",
      tint: "oxide",
      glimmerLife: 0,
      glimmerMaxLife: 70 + Math.random() * 40, // ~1.2–1.8s at 60fps
    });

    const init = () => {
      resize();
      particles.length = 0;
      for (let i = 0; i < moteCount(); i++) {
        const p = spawnMote(true);
        p.opacity = p.targetOpacity * Math.random();
        particles.push(p);
      }
    };

    const drawGlimmer = (p: Particle) => {
      const maxLife = p.glimmerMaxLife ?? 90;
      const life = p.glimmerLife ?? 0;
      const progress = life / maxLife;
      const fade = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
      const alpha = p.targetOpacity * fade;
      const s = p.size * (0.55 + fade * 0.45);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(${OXIDE_RGB}, 0.9)`;
      ctx.lineWidth = 0.7;
      ctx.translate(p.x, p.y);

      // 4-point editorial star — soft, not spiky
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * s * 2.1, Math.sin(angle) * s * 2.1);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${OXIDE_RGB}, 0.85)`;
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const tick = () => {
      if (paused) {
        animId = requestAnimationFrame(tick);
        return;
      }
      frame++;

      // Throttle to ~30fps on mobile for battery
      if (!isDesktop() && frame % 2 !== 0) {
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, viewW(), viewH());

      if (frame % glimmerInterval() === 0) {
        particles.push(spawnGlimmer());
      }

      // Batch by tint to minimise fillStyle switches
      const oxideMotes: Particle[] = [];
      const umberMotes: Particle[] = [];

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === "glimmer") {
          p.glimmerLife = (p.glimmerLife ?? 0) + 1;
          if ((p.glimmerLife ?? 0) >= (p.glimmerMaxLife ?? 90)) {
            particles.splice(i, 1);
            continue;
          }
          p.y += p.vy;
          drawGlimmer(p);
          continue;
        }

        // Mote physics — slow drift upward, occasional alpha breathe
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += (p.targetOpacity - p.opacity) * 0.015;

        if (Math.random() < 0.003) {
          p.targetOpacity = 0.08 + Math.random() * 0.20;
        }

        if (p.y < -10 || p.x < -10 || p.x > viewW() + 10) {
          particles[i] = spawnMote(false);
          continue;
        }

        if (p.tint === "oxide") oxideMotes.push(p);
        else umberMotes.push(p);
      }

      ctx.fillStyle = `rgb(${OXIDE_RGB})`;
      for (const p of oxideMotes) {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = `rgb(${UMBER_RGB})`;
      for (const p of umberMotes) {
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

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    init();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default HeroParticles;
