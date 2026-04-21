"use client";

import type { CSSProperties } from "react";

interface TownMarqueeProps {
  towns?: string[];
  separator?: string;
  duration?: number;
  className?: string;
  tone?: "muted" | "accent";
}

const DEFAULT_TOWNS = [
  "Salem",
  "Windham",
  "Derry",
  "Londonderry",
  "Pelham",
  "Atkinson",
  "Hampstead",
];

const srOnlyStyle: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  margin: "-1px",
};

export const TownMarquee = ({
  towns = DEFAULT_TOWNS,
  separator = "·",
  duration = 60,
  className = "",
  tone = "muted",
}: TownMarqueeProps) => {
  const toneColor =
    tone === "accent" ? "var(--accent)" : "rgba(47, 74, 58, 0.28)";

  const trackStyle: CSSProperties = {
    display: "inline-flex",
    gap: "3rem",
    whiteSpace: "nowrap",
    animation: `marquee-drift ${duration}s linear infinite`,
    willChange: "transform",
  };

  const itemStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "3rem",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: toneColor,
  };

  const renderCopy = (keyPrefix: string) => (
    <span style={itemStyle} className="font-mono">
      {towns.map((town, idx) => (
        <span
          key={`${keyPrefix}-${town}-${idx}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}
        >
          <span>{town}</span>
          <span aria-hidden="true">{separator}</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden w-full ${className}`.trim()}
    >
      <style jsx>{`
        @keyframes marquee-drift {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div style={trackStyle}>
        {renderCopy("a")}
        {renderCopy("b")}
      </div>
      <ul style={srOnlyStyle}>
        {towns.map((town) => (
          <li key={`sr-${town}`}>{town}</li>
        ))}
      </ul>
    </div>
  );
};

export default TownMarquee;
