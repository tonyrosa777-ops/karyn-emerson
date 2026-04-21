"use client"

import type { CSSProperties } from "react"

interface AuroraGradientProps {
  tone?: "warm" | "editorial" | "sage"
  intensity?: "subtle" | "medium"
  className?: string
}

type RadialStop = {
  color: string
  opacity: number
}

type TonePalette = {
  r1: RadialStop
  r2: RadialStop
  r3: RadialStop
}

const TONE_PALETTES_MEDIUM: Record<NonNullable<AuroraGradientProps["tone"]>, TonePalette> = {
  warm: {
    r1: { color: "181, 83, 44", opacity: 0.1 },
    r2: { color: "246, 241, 231", opacity: 0.08 },
    r3: { color: "181, 83, 44", opacity: 0.06 },
  },
  editorial: {
    r1: { color: "246, 241, 231", opacity: 0.1 },
    r2: { color: "181, 83, 44", opacity: 0.05 },
    r3: { color: "246, 241, 231", opacity: 0.08 },
  },
  sage: {
    r1: { color: "47, 74, 58", opacity: 0.1 },
    r2: { color: "246, 241, 231", opacity: 0.06 },
    r3: { color: "47, 74, 58", opacity: 0.06 },
  },
}

const TONE_PALETTES_SUBTLE: Record<NonNullable<AuroraGradientProps["tone"]>, TonePalette> = {
  warm: {
    r1: { color: "181, 83, 44", opacity: 0.06 },
    r2: { color: "246, 241, 231", opacity: 0.04 },
    r3: { color: "181, 83, 44", opacity: 0.03 },
  },
  editorial: {
    r1: { color: "246, 241, 231", opacity: 0.06 },
    r2: { color: "181, 83, 44", opacity: 0.03 },
    r3: { color: "246, 241, 231", opacity: 0.05 },
  },
  sage: {
    r1: { color: "47, 74, 58", opacity: 0.06 },
    r2: { color: "246, 241, 231", opacity: 0.04 },
    r3: { color: "47, 74, 58", opacity: 0.03 },
  },
}

const buildRadial = (stop: RadialStop) =>
  `radial-gradient(ellipse 60vw 60vh at 50% 50%, rgba(${stop.color}, ${stop.opacity}) 0%, rgba(${stop.color}, 0) 70%)`

export const AuroraGradient = ({
  tone = "warm",
  intensity = "medium",
  className = "",
}: AuroraGradientProps) => {
  const palette = intensity === "subtle" ? TONE_PALETTES_SUBTLE[tone] : TONE_PALETTES_MEDIUM[tone]

  const layer1Style: CSSProperties = {
    position: "absolute",
    top: "-20%",
    left: "-10%",
    width: "60vw",
    height: "60vh",
    background: buildRadial(palette.r1),
    animation: "aurora-drift-1 18s ease-in-out infinite",
    willChange: "transform",
  }

  const layer2Style: CSSProperties = {
    position: "absolute",
    top: "10%",
    right: "-15%",
    width: "60vw",
    height: "60vh",
    background: buildRadial(palette.r2),
    animation: "aurora-drift-2 22s ease-in-out infinite",
    willChange: "transform",
  }

  const layer3Style: CSSProperties = {
    position: "absolute",
    bottom: "-20%",
    left: "15%",
    width: "60vw",
    height: "60vh",
    background: buildRadial(palette.r3),
    animation: "aurora-drift-3 26s ease-in-out infinite",
    willChange: "transform",
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div style={layer1Style} />
      <div style={layer2Style} />
      <div style={layer3Style} />
      <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate(-15%, -15%); }
          25%  { transform: translate(10%, -5%); }
          50%  { transform: translate(15%, 15%); }
          75%  { transform: translate(-5%, 10%); }
          100% { transform: translate(-15%, -15%); }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(15%, -10%); }
          25%  { transform: translate(-10%, 5%); }
          50%  { transform: translate(-15%, 15%); }
          75%  { transform: translate(5%, -15%); }
          100% { transform: translate(15%, -10%); }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate(-10%, 15%); }
          25%  { transform: translate(15%, 10%); }
          50%  { transform: translate(10%, -15%); }
          75%  { transform: translate(-15%, -5%); }
          100% { transform: translate(-10%, 15%); }
        }
      `}</style>
    </div>
  )
}

export default AuroraGradient
