"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Hero — cinematic video-backed conversion hero.
 *
 * Per CLAUDE.md Hero Architecture Rule (Direction A — Cinematic Video):
 *   Layer 1: 720p muted autoplay mp4 with poster (falls back to static <img>
 *            under prefers-reduced-motion).
 *   Layer 2: Gradient overlay for text legibility — strongest where text lives.
 *   Layer 3: Framer Motion staggered text column, constrained to ~600px on
 *            the left half of the viewport, vertically centered.
 *
 * Assets (compressed via ffmpeg during build):
 *   /video/hero-lake.mp4        — 720p CRF 30, faststart, no audio, 2.81 MB
 *   /video/hero-lake-poster.jpg — frame at t=0.5s, 246 KB
 *
 * Conversion architecture per CLAUDE.md:
 *   Primary CTA  → /booking (direct)
 *   Secondary    → /quiz    (qualifies then surfaces calendar on result)
 *
 * NH real estate law compliance: brokerage disclosure ("REALTOR® · Jill & Co.
 * Realty Group") rendered at the bottom of the hero, small but visible.
 */

const heroEase = [0.22, 1, 0.36, 1] as const;

const POSTER_SRC = "/video/hero-lake-poster.jpg";
const VIDEO_SRC = "/video/hero-lake.mp4";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is on, motion components render final state immediately.
  const mp = (initial: Record<string, number>, delay: number, duration = 0.8) =>
    prefersReducedMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, ...initial },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: heroEase },
        };

  return (
    <section
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden lg:min-h-screen"
      aria-label="Welcome"
    >
      {/* Layer 1 — Visual background. Video for motion-OK users, static poster for reduced-motion. */}
      {prefersReducedMotion ? (
        <img
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          aria-hidden="true"
        >
          {/* WebM source can be prepended here in a later pass for smaller files. */}
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Layer 2 — Gradient overlay for legibility. Stronger on the left/text side. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* Layer 3 — Content column. Vertically centered, left-aligned, ~600px wide. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-24 lg:h-screen lg:justify-center lg:px-8 lg:py-0">
        <div className="max-w-[600px] lg:w-[58%]">
          {/* Eyebrow */}
          <motion.p
            {...mp({ y: 20 }, 0.2, 0.6)}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/85"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          {/* H1 — display serif (Cormorant) */}
          <motion.h1
            {...mp({ y: 20 }, 0.2, 0.8)}
            className="font-display mt-5 font-semibold leading-[1.05] tracking-[-0.015em] text-white"
            style={{
              fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.45)",
            }}
          >
            {siteConfig.hero.tagline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...mp({ y: 20 }, 0.4, 0.7)}
            className="mt-6 max-w-xl text-[18px] leading-[1.5] text-white/90"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.4)" }}
          >
            {siteConfig.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...mp({ y: 16 }, 0.6, 0.6)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Link
              href={siteConfig.hero.ctaPrimaryHref}
              className="group inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.04em] text-white shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)] transition hover:-translate-y-[2px] hover:brightness-110"
            >
              {siteConfig.hero.ctaPrimary}
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={siteConfig.hero.ctaSecondaryHref}
              className="group inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.04em] text-white transition hover:-translate-y-[2px] hover:bg-white/10"
            >
              {siteConfig.hero.ctaSecondary}
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>

          {/* CTA micro-copy — quiz nudge directly under the buttons */}
          <motion.p
            {...mp({ y: 10 }, 0.7, 0.5)}
            className="mt-4 text-[13px] leading-[1.5] text-white/70"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {siteConfig.hero.ctaMicro}
          </motion.p>
        </div>

        {/* Bottom strip — compliance + trust row. Pinned to hero bottom on desktop. */}
        <motion.div
          {...mp({ y: 10 }, 0.85, 0.6)}
          className="mt-16 flex w-full flex-col gap-2 lg:absolute lg:inset-x-0 lg:bottom-6 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:px-8"
        >
          <p
            className="font-body text-[12px] text-white/70"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            {siteConfig.hero.complianceShort}
          </p>
          <p
            className="font-body text-[14px] text-white/85"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {siteConfig.hero.trustMicro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
