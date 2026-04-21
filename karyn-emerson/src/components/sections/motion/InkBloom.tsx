"use client";

import { Fragment, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface InkBloomProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  accentWord?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

interface AccentRange {
  start: number;
  end: number;
}

function findAccentRange(text: string, accentWord?: string): AccentRange | null {
  if (!accentWord) return null;
  const idx = text.indexOf(accentWord);
  if (idx === -1) return null;
  return { start: idx, end: idx + accentWord.length };
}

/**
 * Split text into alternating word and whitespace segments, each tagged with
 * its starting character index so accent-range matching stays accurate after
 * the split. Whitespace runs become line-break opportunities; word runs get
 * `white-space: nowrap` so per-letter inline-block spans never break mid-word.
 */
interface Segment {
  text: string;
  start: number;
  isSpace: boolean;
}

function segmentize(text: string): Segment[] {
  const segments: Segment[] = [];
  const re = /\S+|\s+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    segments.push({
      text: match[0],
      start: match.index,
      isSpace: /^\s+$/.test(match[0]),
    });
  }
  return segments;
}

export function InkBloom({
  children,
  as,
  className,
  delay = 0,
  stagger = 18,
  duration = 900,
  accentWord,
}: InkBloomProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as ?? "h1";

  const accentRange = useMemo(
    () => findAccentRange(children, accentWord),
    [children, accentWord],
  );

  if (reduceMotion) {
    if (!accentRange) {
      return <Tag className={className}>{children}</Tag>;
    }
    const before = children.slice(0, accentRange.start);
    const accent = children.slice(accentRange.start, accentRange.end);
    const after = children.slice(accentRange.end);
    return (
      <Tag className={className}>
        {before}
        <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
          {accent}
        </span>
        {after}
      </Tag>
    );
  }

  const segments = segmentize(children);

  return (
    <Tag className={className}>
      {segments.map((seg, segIndex) => {
        if (seg.isSpace) {
          // Render the whitespace run as plain text so the browser can wrap
          // between segments (line breaks only happen at space boundaries).
          return <Fragment key={segIndex}>{seg.text}</Fragment>;
        }

        // Word: wrap in an inline-block + nowrap span so the per-letter
        // spans inside cannot be broken mid-word.
        const chars = Array.from(seg.text);
        return (
          <span
            key={segIndex}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {chars.map((char, charIndex) => {
              const absoluteIndex = seg.start + charIndex;
              const isAccent =
                accentRange !== null &&
                absoluteIndex >= accentRange.start &&
                absoluteIndex < accentRange.end;

              const style: React.CSSProperties = {
                display: "inline-block",
                willChange: "letter-spacing, opacity",
                ...(isAccent
                  ? { color: "var(--accent)", fontStyle: "italic" }
                  : null),
              };

              return (
                <motion.span
                  key={charIndex}
                  style={style}
                  initial={{ letterSpacing: "0.08em", opacity: 0.4 }}
                  animate={{ letterSpacing: "0em", opacity: 1 }}
                  transition={{
                    duration: duration / 1000,
                    delay: (delay + absoluteIndex * stagger) / 1000,
                    ease: EASE,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

export default InkBloom;
