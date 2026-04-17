"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { HeroParticles } from "./HeroParticles";
import { KarynCanvas } from "./KarynCanvas";

/**
 * Hero — Layer 3 of the 3-layer hero (Framer Motion stagger text) + the
 * two-column shell that holds Layers 1 and 2.
 *
 * Layout: left panel text, right panel canvas (stacked to one column on mobile,
 * text first). Container `relative min-h-screen flex items-start pt-24 md:pt-40`
 * per CLAUDE.md Hero Architecture Rule + website-build-template.md §Section 1.
 *
 * Palette: LIGHT theme — background is cream (body default `--bg-base`).
 * Text is `var(--text-primary)` (near-black). NO dark-theme default leakage
 * (never `#f5f5f5` on cream — that's the dark-theme default and invisible here).
 *
 * Framer Motion stagger (design-system.md §8 motion ease: easeOutQuint):
 *   - H1 (siteConfig.tagline + .hero-shimmer): delay 0s
 *   - Subheadline:                             delay 0.15s
 *   - CTAs (both in parallel):                 delay 0.3s
 * All `once: true` — never re-trigger on scroll back.
 */

// Reusable motion variants with easeOutQuint (design-system.md §8).
const heroEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-start overflow-hidden pt-24 md:pt-40"
      aria-label="Welcome"
    >
      {/* Layer 1: HeroParticles — ambient iron-oxide motes on cream.
          Fills the whole hero section, sits behind everything. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroParticles />
      </div>

      <div className="container relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-20 md:pb-32 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        {/* LEFT PANEL — text stack (Framer Motion stagger) */}
        <div className="relative z-10 flex flex-col">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: heroEase }}
            className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          {/* H1 — siteConfig.tagline with .hero-shimmer (mandatory per CLAUDE.md) */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.02, ease: heroEase }}
            className="hero-shimmer font-display text-display mt-5 font-semibold"
          >
            {siteConfig.tagline}
          </motion.h1>

          {/* Subheadline (delay 0.15s) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: heroEase }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            {siteConfig.hero.subheadline}
          </motion.p>

          {/* CTAs (both delay 0.3s, in parallel) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: heroEase }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/booking"
              className="inline-flex items-center rounded-full bg-[var(--primary)] px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[var(--bg-base)] shadow-[0_10px_30px_-10px_rgba(47,74,58,0.4)] transition hover:-translate-y-[1px] hover:bg-[var(--accent)]"
            >
              {siteConfig.hero.ctaPrimary}
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center rounded-full border-[1.5px] border-[var(--primary)] px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[var(--primary)] transition hover:-translate-y-[1px] hover:bg-[var(--primary)] hover:text-[var(--bg-base)]"
            >
              {siteConfig.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust micro-copy (delay 0.45s — arrives after CTAs to avoid
              stealing attention from the primary action) */}
          {siteConfig.hero.trustMicro ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: heroEase }}
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              {siteConfig.hero.trustMicro}
            </motion.p>
          ) : null}
        </div>

        {/* RIGHT PANEL — KarynCanvas (brand canvas).
            Container is `position: relative` with explicit height per
            CLAUDE.md Hero Architecture gotcha. Canvas fills absolutely.
            pointer-events-none so it never intercepts CTA clicks.
            On mobile: text is first, canvas sits below. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: heroEase }}
          className="pointer-events-none relative order-last w-full lg:order-none"
          style={{ height: "clamp(340px, 50vw, 540px)" }}
          aria-hidden="true"
        >
          <KarynCanvas />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
