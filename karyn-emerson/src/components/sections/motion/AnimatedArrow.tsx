"use client";

import type { CSSProperties } from "react";

interface AnimatedArrowProps {
  className?: string;
  size?: "xs" | "sm" | "md";
  color?: string;
}

const SIZE_MAP: Record<NonNullable<AnimatedArrowProps["size"]>, string> = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
};

export const AnimatedArrow = ({
  className = "",
  size = "sm",
  color = "currentColor",
}: AnimatedArrowProps) => {
  const style: CSSProperties = {
    display: "inline-block",
    fontSize: SIZE_MAP[size],
    color,
    animation: "arrow-nudge 2.5s ease-in-out infinite",
    willChange: "transform",
    lineHeight: 1,
  };

  return (
    <>
      <style jsx>{`
        @keyframes arrow-nudge {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
      `}</style>
      <span aria-hidden="true" style={style} className={className}>
        {"→"}
      </span>
    </>
  );
};

export default AnimatedArrow;
