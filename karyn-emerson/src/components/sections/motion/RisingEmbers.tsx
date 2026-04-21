"use client";
import { useEffect, useRef } from "react";

/**
 * RisingEmbers — warm ember particles that drift upward.
 *
 * Sibling to FallingLeaves.tsx. Mirrors the same infrastructure
 * (ResizeObserver, DPI handling, visibility pause, reduced-motion guard,
 * mobile half-rate tick) but inverts Y velocity so particles rise from the
 * bottom, shrinks particle size, halves sway, and renders circular ember
 * glows in a single warm color family.
 *
 * Per CLAUDE.md Page Animation Rule: ambient effect only — never used as
 * a hero replacement. Respects prefers-reduced-motion.
 */

interface Ember {
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
  age: number;
}

const DESKTOP_BREAKPOINT = 768;

const EMBER_STOPS: ReadonlyArray<readonly [number, number, number]> = [
  [181, 83, 44],
];

interface RisingEmbersProps {
  density?: "low" | "medium";
  className?: string;
}

export function RisingEmbers({
  density = "low",
  className,
}: RisingEmbersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const stops = EMBER_STOPS;

    let animId = 0;
    let frame = 0;
    let paused = false;
    const embers: Ember[] = [];

    const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;
    const emberCount = () => {
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

    const spawn = (seedY = false): Ember => {
      const baseX = Math.random() * viewW();
      return {
        baseX,
        x: baseX,
        y: seedY
          ? Math.random() * viewH()
          : viewH() + 10 + Math.random() * 20,
        vy: -(0.25 + Math.random() * 0.35),
        swayAmp: 4 + Math.random() * 7,
        swayFreq: 0.002 + Math.random() * 0.003,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: 0,
        targetOpacity: 0.12 + Math.random() * 0.16,
        size: 1.8 + Math.random() * 1.2,
        age: Math.floor(Math.random() * 400),
      };
    };

    const init = () => {
      resize();
      embers.length = 0;
      for (let i = 0; i < emberCount(); i++) {
        const p = spawn(true);
        p.opacity = p.targetOpacity * Math.random();
        embers.push(p);
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
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.age += 1;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity += (p.targetOpacity - p.opacity) * 0.015;
        if (Math.random() < 0.003) {
          p.targetOpacity = 0.1 + Math.random() * 0.18;
        }
        const displayX =
          p.baseX + Math.sin(p.age * p.swayFreq + p.swayPhase) * p.swayAmp;
        if (p.y < -10) {
          embers[i] = spawn(false);
          continue;
        }
        const stop = stops[0];
        ctx.fillStyle = `rgb(${stop[0]}, ${stop[1]}, ${stop[2]})`;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.ellipse(
          displayX,
          p.y,
          p.size,
          p.size * 0.9,
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

export default RisingEmbers;
