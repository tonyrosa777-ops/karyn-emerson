"use client";
import { useEffect, useRef } from "react";

/**
 * FallingLeaves — slow-falling autumn leaves ambient effect.
 *
 * Mirrors AmbientParticles.tsx structure (ResizeObserver, DPI handling,
 * visibility pause, reduced-motion guard, mobile half-rate tick) for
 * cognitive-load symmetry. Differences: downward gravity-ish drift,
 * sine-wave horizontal sway, per-leaf rotation, rendered as rotated
 * ellipses across three autumn color stops.
 *
 * Per CLAUDE.md Page Animation Rule: ambient effect only — never used as
 * a hero replacement. Respects prefers-reduced-motion.
 */

interface Leaf {
  baseX: number;
  x: number;
  y: number;
  vy: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  colorIndex: number;
  age: number;
}

const DESKTOP_BREAKPOINT = 768;

const AUTUMN_STOPS: ReadonlyArray<readonly [number, number, number]> = [
  [181, 83, 44],
  [168, 112, 54],
  [139, 75, 42],
];

const EMBER_STOPS: ReadonlyArray<readonly [number, number, number]> = [
  [181, 83, 44],
];

// Saturated maple reds — firebrick / deep maroon / red-orange that bridges to --accent
const CRIMSON_STOPS: ReadonlyArray<readonly [number, number, number]> = [
  [178, 34, 34],
  [139, 30, 30],
  [200, 66, 40],
];

interface FallingLeavesProps {
  density?: "low" | "medium" | "high";
  className?: string;
  tone?: "autumn" | "ember" | "crimson";
}

export function FallingLeaves({
  density = "low",
  className,
  tone = "autumn",
}: FallingLeavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const stops =
      tone === "ember"
        ? EMBER_STOPS
        : tone === "crimson"
          ? CRIMSON_STOPS
          : AUTUMN_STOPS;

    let animId = 0;
    let frame = 0;
    let paused = false;
    const leaves: Leaf[] = [];

    const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;
    const leafCount = () => {
      if (density === "high") {
        return isDesktop() ? 20 : 10;
      }
      if (density === "medium") {
        return isDesktop() ? 14 : 7;
      }
      return isDesktop() ? 8 : 4;
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

    const spawn = (seedY = false): Leaf => {
      const baseX = Math.random() * viewW();
      return {
        baseX,
        x: baseX,
        y: seedY
          ? Math.random() * viewH()
          : -10 - Math.random() * 20,
        vy: 0.25 + Math.random() * 0.35,
        swayAmp: 8 + Math.random() * 14,
        swayFreq: 0.002 + Math.random() * 0.003,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: 0,
        targetOpacity: 0.12 + Math.random() * 0.16,
        size: 3 + Math.random() * 2,
        colorIndex: Math.floor(Math.random() * stops.length),
        age: Math.floor(Math.random() * 400),
      };
    };

    const init = () => {
      resize();
      leaves.length = 0;
      for (let i = 0; i < leafCount(); i++) {
        const p = spawn(true);
        p.opacity = p.targetOpacity * Math.random();
        leaves.push(p);
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
      for (let i = leaves.length - 1; i >= 0; i--) {
        const p = leaves[i];
        p.age += 1;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity += (p.targetOpacity - p.opacity) * 0.015;
        if (Math.random() < 0.003) {
          p.targetOpacity = 0.1 + Math.random() * 0.18;
        }
        const displayX =
          p.baseX + Math.sin(p.age * p.swayFreq + p.swayPhase) * p.swayAmp;
        if (p.y > viewH() + 10) {
          leaves[i] = spawn(false);
          continue;
        }
        const stop = stops[p.colorIndex % stops.length];
        ctx.fillStyle = `rgb(${stop[0]}, ${stop[1]}, ${stop[2]})`;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.ellipse(
          displayX,
          p.y,
          p.size,
          p.size * 0.5,
          p.rotation,
          0,
          Math.PI * 2,
        );
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
  }, [density, tone]);

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

export default FallingLeaves;
