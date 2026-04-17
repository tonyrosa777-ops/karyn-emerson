"use client";

/**
 * BreathingOrb — pure-CSS ambient gradient used behind page headers and
 * final-CTA blocks (design-system.md §8 "breathing orb, 12s cycle"). Light
 * theme: cream + iron-oxide radial glow. Respects prefers-reduced-motion via
 * the global rule in globals.css.
 */

interface BreathingOrbProps {
  className?: string;
  tone?: "warm" | "forest";
}

export function BreathingOrb({ className, tone = "warm" }: BreathingOrbProps) {
  const gradient =
    tone === "forest"
      ? "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(246,241,231,0.18), rgba(246,241,231,0) 70%)"
      : "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(181,83,44,0.14), rgba(181,83,44,0) 70%)";

  return (
    <div
      aria-hidden="true"
      className={
        className ??
        "pointer-events-none absolute inset-0 overflow-hidden"
      }
    >
      <div
        className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: gradient,
          animation: "ke-breathe 12s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes ke-breathe {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default BreathingOrb;
