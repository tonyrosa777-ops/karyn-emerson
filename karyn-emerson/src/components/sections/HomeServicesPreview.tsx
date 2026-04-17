"use client";

// =============================================================================
// HomeServicesPreview — Section 5 (DARK per reordered rhythm, education)
// Reads siteConfig.services (3 entries). Each card links to /services/[slug].
// Emoji on each card per CLAUDE.md Code Standards.
// =============================================================================

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function HomeServicesPreview() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-16 md:py-24"
      style={{
        background: "var(--primary)",
        color: "var(--text-on-dark-primary)",
      }}
    >
      {/* Radial overlay — never flat dark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase"
            style={{
              color: "var(--text-on-dark-muted)",
              letterSpacing: "0.22em",
            }}
          >
            How I help
          </p>
          <h2
            id="services-heading"
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-on-dark-primary)" }}
          >
            Three situations, three very different conversations.
          </h2>
          <p
            className="mt-5 max-w-2xl font-body text-lg leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            Selling a home you have lived in for forty years is a different kind of call than a
            first-time buyer tour, which is a different call again from a Massachusetts family
            crossing the border. Here is what each one looks like with me.
          </p>
        </FadeUp>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          staggerDelay={0.1}
        >
          {siteConfig.services.map((svc) => (
            <motion.article
              key={svc.slug}
              variants={item}
              className="flex h-full flex-col rounded-lg border p-6 md:p-8"
              style={{
                background: "var(--card-on-dark-bg)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <span aria-hidden="true" className="text-3xl leading-none">
                {svc.emoji}
              </span>
              <h3
                className="font-display text-h4 mt-4 font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                {svc.title}
              </h3>
              <p
                className="mt-3 flex-1 font-body text-[15px] leading-relaxed"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                {svc.shortDescription}
              </p>
              <Link
                href={svc.href}
                className="mt-6 inline-flex items-center font-body text-sm font-semibold transition hover:opacity-80"
                style={{
                  color: "var(--accent)",
                  textUnderlineOffset: "6px",
                }}
              >
                Read more about {svc.title.toLowerCase()}
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </Link>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default HomeServicesPreview;
