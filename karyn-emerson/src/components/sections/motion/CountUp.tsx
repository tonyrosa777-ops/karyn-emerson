"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CountUp — number tween on scroll-into-view.
 *
 * Uses IntersectionObserver + requestAnimationFrame to ease-out-cubic tween
 * from 0 to `value` over `duration` ms. Holds the final value. Under
 * prefers-reduced-motion, renders the final value instantly with no motion.
 */

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  as?: "span" | "p" | "div";
  triggerOnce?: boolean;
  /**
   * When true, format with locale-aware thousands separators
   * (e.g. "$12,345"). Defaults to true.
   */
  locale?: boolean;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className,
  as = "span",
  triggerOnce = true,
  locale = true,
}: CountUpProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState<number>(reduceMotion ? value : 0);
  const hasRunRef = useRef<boolean>(false);

  useEffect(() => {
    if (reduceMotion) {
      setCurrent(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let startTs = 0;
    let startValue = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const t = Math.min(1, Math.max(0, elapsed / duration));
      const eased = easeOutCubic(t);
      const next = startValue + (value - startValue) * eased;
      setCurrent(next);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (triggerOnce && hasRunRef.current) return;
          hasRunRef.current = true;
          cancelAnimationFrame(rafId);
          startTs = 0;
          startValue = 0;
          rafId = requestAnimationFrame(step);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [value, duration, reduceMotion, triggerOnce]);

  const formattedNumber = locale
    ? current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : current.toFixed(decimals);
  const display = `${prefix}${formattedNumber}${suffix}`;

  if (as === "p") {
    return (
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={className}
      >
        {display}
      </p>
    );
  }
  if (as === "div") {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
      >
        {display}
      </div>
    );
  }
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {display}
    </span>
  );
}

export default CountUp;
