"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Hero — post-audit rewrite (design-audit Phase 1-3).
 *
 * Replaces the former 2-column canvas hero with a full-bleed editorial
 * photograph. The stone-wall + autumn-maple image is the canonical New
 * England visual cue; it executes the place-first strategy from
 * design-system.md §6 in 0.3 seconds, honors the client's "no face-forward"
 * directive (no portrait of Karyn in the hero), and gives visceral impact
 * the canvas version could not.
 *
 * Architecture:
 *   - Full-bleed <Image priority fill object-cover> behind content
 *   - Gradient overlay for text legibility (darker on text side, clear on right)
 *   - Paper-grain texture lives on body::before and reads through at low opacity
 *   - Text stack is constrained to max-w-2xl, left-aligned, sits in the lower
 *     third of the hero on desktop and covers the full width on mobile
 *   - Ken Burns slow scale animates the photograph (prefers-reduced-motion safe)
 *   - Word-by-word stagger on the H1 via motion variants (custom inline —
 *     RevealText component doesn't support mid-string accent span highlighting)
 *
 * Per CLAUDE.md Hero Architecture Rule: H1 is siteConfig.tagline. The
 * mandatory "shimmer" treatment now resolves to a static iron-oxide accent
 * on the last two words via <span class="hero-accent">.
 */

const heroEase = [0.22, 1, 0.36, 1] as const;

// Split tagline into two parts so the last 2 words render in iron-oxide italic.
// If tagline changes, accent wraps the final 2 space-separated words.
function splitTaglineForAccent(tagline: string): { lead: string; accent: string } {
  const words = tagline.trim().split(/\s+/);
  if (words.length <= 2) return { lead: "", accent: tagline };
  const accentWordCount = 2;
  const lead = words.slice(0, -accentWordCount).join(" ");
  const accent = words.slice(-accentWordCount).join(" ");
  return { lead, accent };
}

export function Hero() {
  const { lead, accent } = splitTaglineForAccent(siteConfig.tagline);
  const leadWords = lead.split(/\s+/).filter(Boolean);
  const accentWords = accent.split(/\s+/).filter(Boolean);

  return (
    <section
      className="relative isolate flex min-h-[92vh] items-end overflow-hidden"
      aria-label="Welcome"
    >
      {/* Photograph — full-bleed, Ken Burns animated, priority-loaded */}
      <div className="hero-photo absolute inset-0 -z-10">
        <Image
          src="/images/about/about-stone-wall.jpg"
          alt="Crumbling fieldstone wall lined with sugar maples in peak autumn along a Southern New Hampshire road"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </div>

      {/* Gradient overlay for legibility — stronger on left at desktop,
          stronger at bottom on mobile */}
      <div
        className="absolute inset-0 -z-[5] hidden lg:block"
        style={{ background: "var(--gradient-hero-overlay)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-[5] lg:hidden"
        style={{ background: "var(--gradient-hero-overlay-mobile)" }}
        aria-hidden="true"
      />

      {/* Content stack — bottom-left on desktop, full-width bottom on mobile */}
      <div className="container relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28 lg:px-8 lg:pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: heroEase }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          {/* H1 — word-by-word stagger with static iron-oxide italic on last two words */}
          <h1
            className="font-display mt-4 font-semibold leading-[1.02] tracking-[-0.018em] text-[var(--bg-base)]"
            style={{
              fontSize: "clamp(2.5rem, 4.8vw, 4.5rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            {leadWords.map((word, i) => (
              <motion.span
                key={`lead-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: heroEase }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {word}
                {i < leadWords.length - 1 ? " " : " "}
              </motion.span>
            ))}
            {accentWords.map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + (leadWords.length + i) * 0.06,
                  ease: heroEase,
                }}
                className="hero-accent"
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {word}
                {i < accentWords.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: heroEase }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--bg-base)]/90"
            style={{ textShadow: "0 1px 14px rgba(0,0,0,0.4)" }}
          >
            {siteConfig.hero.subheadline}
          </motion.p>

          {/* Trust micro-copy — promoted above CTAs per audit Phase 1 */}
          {siteConfig.hero.trustMicro ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: heroEase }}
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bg-base)]/70"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {siteConfig.hero.trustMicro}
            </motion.p>
          ) : null}

          {/* CTAs — hero-cta size variant, primary drives to booking, secondary to quiz */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: heroEase }}
            className="mt-5 flex flex-wrap gap-4"
          >
            <Link
              href={siteConfig.hero.ctaPrimaryHref ?? "/booking"}
              className="hero-cta inline-flex items-center rounded-full bg-[var(--accent)] font-body font-semibold uppercase text-[var(--bg-base)] shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)] transition hover:-translate-y-[1px] hover:bg-[var(--primary)]"
            >
              {siteConfig.hero.ctaPrimary}
            </Link>
            <Link
              href={siteConfig.hero.ctaSecondaryHref ?? "/quiz"}
              className="hero-cta inline-flex items-center rounded-full border-[1.5px] border-[var(--bg-base)]/80 font-body font-semibold uppercase text-[var(--bg-base)] backdrop-blur-sm transition hover:-translate-y-[1px] hover:bg-[var(--bg-base)] hover:text-[var(--primary)]"
            >
              {siteConfig.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — thin vertical line bottom-center, gentle pulse */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--bg-base)]/60">
          Scroll
        </span>
        <span
          className="scroll-hint-line block h-12 w-px bg-[var(--bg-base)]/50"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default Hero;
