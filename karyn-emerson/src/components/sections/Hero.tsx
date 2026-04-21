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
      className="relative isolate flex min-h-[85vh] flex-col overflow-hidden lg:min-h-screen"
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

      {/* Layer 2 — Desktop left-column scrim. Darker, tighter fade, still leaves the right 30% of the lake visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(12,16,14,0.90) 0%, rgba(12,16,14,0.72) 35%, rgba(12,16,14,0.30) 65%, rgba(12,16,14,0) 90%)",
        }}
      />
      {/* Layer 2 — Mobile: significantly deeper full-frame scrim so every H1 + subhead + CTA frame is legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,16,14,0.70) 0%, rgba(12,16,14,0.80) 50%, rgba(12,16,14,0.90) 100%)",
        }}
      />

      {/* Layer 3 — Content column. Pure flex column: centered content block + pinned bottom strip. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-8 pt-16 lg:px-8 lg:pb-10 lg:pt-10">
        {/* Centered content block — flex-1 fills available height, items-center vertically centers */}
        <div className="flex flex-1 items-center">
          <div className="relative max-w-[600px] lg:w-[58%]">
          {/* Local radial text-backing — darker pocket behind the text stack. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(12,16,14,0.55) 0%, rgba(12,16,14,0.30) 55%, transparent 85%)",
            }}
          />
          {/* Eyebrow */}
          <motion.p
            {...mp({ y: 20 }, 0.2, 0.6)}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 sm:text-[11px] sm:tracking-[0.22em] md:tracking-[0.28em]"
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
        </div>

        {/* Bottom strip — compliance + trust row. Natural flex flow, pinned to hero bottom. */}
        <motion.div
          {...mp({ y: 10 }, 0.85, 0.6)}
          className="mt-8 flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:justify-between lg:mt-0"
        >
          <p
            className="font-body text-[12px] text-white/75"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            {siteConfig.hero.complianceShort}
          </p>
          <p
            className="font-body text-[13px] text-white/85 sm:text-[14px]"
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
