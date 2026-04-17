"use client";

// =============================================================================
// HomePainPoints — Section 2 of homepage (LIGHT, empathy)
// Source: siteConfig.painPoints (4 entries). Per design-system.md §11 + CLAUDE.md
// Code Standards: every card has a meaningful emoji. No CTA inside this section —
// pain points frame, they do not convert.
// =============================================================================

import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function HomePainPoints() {
  return (
    <section
      id="pain-points"
      aria-labelledby="pain-points-heading"
      className="relative py-16 md:py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase"
            style={{
              color: "var(--accent)",
              letterSpacing: "0.22em",
            }}
          >
            Where most visitors start
          </p>
          <h2
            id="pain-points-heading"
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Four reasons people call me before they call anyone else.
          </h2>
          <p
            className="mt-5 max-w-2xl font-body text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            If any of these sound like the last twelve months of your life, you are already in
            the right place. Read them, pick the one that fits, and we will go from there.
          </p>
        </FadeUp>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {siteConfig.painPoints.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="flex h-full flex-col rounded-lg border p-6 transition hover:-translate-y-[2px] md:p-8"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.08)",
                boxShadow: "0 2px 8px -4px rgba(26,31,28,0.06)",
              }}
            >
              <span aria-hidden="true" className="text-3xl leading-none">
                {p.emoji}
              </span>
              <h3
                className="font-display text-h4 mt-4 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3 font-body text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.body}
              </p>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default HomePainPoints;
