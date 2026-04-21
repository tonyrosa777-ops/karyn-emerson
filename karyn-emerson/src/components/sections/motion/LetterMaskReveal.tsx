"use client";

import { Children, Fragment, isValidElement, ReactNode, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface LetterMaskRevealProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  linesHint?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Split a ReactNode's children into line groups based on <br/> positions.
 * Each returned array represents one line's content.
 */
function splitChildrenByBr(children: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [[]];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") {
      lines.push([]);
      return;
    }
    lines[lines.length - 1].push(child);
  });
  // Drop trailing empty line if the source ended with <br/>
  if (lines.length > 1 && lines[lines.length - 1].length === 0) {
    lines.pop();
  }
  return lines;
}

export function LetterMaskReveal({
  children,
  as,
  className,
  delay = 0,
  stagger = 80,
  duration = 420,
}: LetterMaskRevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as ?? "h1";

  const lines = useMemo(() => splitChildrenByBr(children), [children]);

  return (
    <Tag className={className}>
      {lines.map((lineChildren, lineIndex) => (
        <span
          key={lineIndex}
          style={{ display: "block", overflow: "hidden" }}
        >
          <motion.span
            style={{ display: "block", willChange: "transform, opacity" }}
            initial={
              reduceMotion ? false : { y: "100%", opacity: 0 }
            }
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: duration / 1000,
              delay: (delay + lineIndex * stagger) / 1000,
              ease: EASE,
            }}
          >
            {lineChildren.map((node, i) => (
              <Fragment key={i}>{node}</Fragment>
            ))}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default LetterMaskReveal;
