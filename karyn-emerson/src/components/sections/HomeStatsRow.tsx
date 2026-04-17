"use client";

// =============================================================================
// HomeStatsRow — Section 4 (LIGHT — per reordered rhythm in app/page.tsx)
// Reads siteConfig.stats (4 stats), uses CountUp component (requires client).
// Purpose: social proof via numbers (distinct from quote-form social proof in
// HomeTestimonialsPreview).
//
// Note: this position is LIGHT (per reordered rhythm to separate Stats from
// Testimonials and keep alternation clean). Cards use bg-elevated, borders subtle.
// =============================================================================

import { siteConfig } from "@/data/site";
import { CountUp } from "@/components/animations/CountUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { FadeUp } from "@/components/animations/FadeUp";
import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function HomeStatsRow() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative py-16 md:py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
          >
            By the numbers
          </p>
          <h2
            id="stats-heading"
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Thirty years on these streets. Real outcomes, not round-number boasts.
          </h2>
        </FadeUp>

        <StaggerContainer
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          staggerDelay={0.08}
        >
          {siteConfig.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="flex flex-col items-start rounded-lg border p-6 md:p-8"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.08)",
              }}
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {stat.emoji}
              </span>
              <div
                className="mt-4 font-display font-semibold leading-none"
                style={{
                  color: "var(--primary)",
                  fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                }}
              >
                <CountUp
                  end={stat.value}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                />
              </div>
              <p
                className="mt-3 font-mono text-xs uppercase leading-snug"
                style={{
                  color: "var(--text-muted)",
                  letterSpacing: "0.14em",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default HomeStatsRow;
