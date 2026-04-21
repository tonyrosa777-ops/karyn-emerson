"use client";

// =============================================================================
// HomeBookingPreview — Section 9 (PHOTOGRAPH-BACKED, FINAL conversion)
// Per CLAUDE.md Section Content Deduplication Rule: this is THE only final CTA
// at the bottom of the homepage — no separate "Ready to X?" block after.
// Per CLAUDE.md Section Alternation Rule: photograph close bookends the
// video-hero open (Footer below is forest-green; avoiding the flat green-on-
// green wall by letting this section carry editorial autumn imagery).
// 2-col: left text + 3-bullet list, right panel is a focused CTA card routing
// visitors to /booking (not an inline calendar — the dedicated /booking page
// owns the booking flow).
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { FallingLeaves } from "@/components/sections/motion/FallingLeaves";

const TALKING_POINTS = [
  {
    emoji: "🗺️",
    title: "Your town, your street",
    body: "Tell me where you are, where you are thinking of going, and I will come prepared with real comps and real neighborhood detail.",
  },
  {
    emoji: "🗓️",
    title: "Your timeline",
    body: "Next month, next year, or somewhere in between. Your timing drives the strategy. We work back from there.",
  },
  {
    emoji: "💬",
    title: "Your actual questions",
    body: "Property tax, commission math, the Opendoor thing your brother-in-law told you about. Bring the question, get a straight answer.",
  },
];

export function HomeBookingPreview() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="relative overflow-hidden py-20 md:py-28 min-h-[clamp(540px,55vw,720px)]"
      style={{
        color: "var(--text-on-dark-primary)",
      }}
    >
      {/* Layer 0 — full-bleed editorial photograph (Ken Burns via .hero-photo) */}
      <div aria-hidden="true" className="hero-photo absolute inset-0 z-0">
        <Image
          src="/images/about/about-landscape-1.jpg"
          alt="Southern NH autumn landscape at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Layer 1 — dark gradient overlay for text legibility on the left 65% */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--gradient-hero-overlay)" }}
      />

      {/* Layer 2 — ambient falling leaves (autumn, low density) */}
      <div aria-hidden="true" className="absolute inset-0 z-[2]">
        <FallingLeaves density="low" tone="autumn" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* LEFT — copy + talking points */}
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{
                color: "var(--text-on-dark-muted)",
                letterSpacing: "0.22em",
              }}
            >
              Pick a real time
            </p>
            <h2
              id="booking-heading"
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Let&rsquo;s have a conversation.
            </h2>
            <p
              className="mt-5 font-body text-lg leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Fifteen minutes on your schedule, about your situation. No form maze, no deferred
              callback, no &ldquo;we will be in touch within 24 hours.&rdquo; A real time on a
              real calendar, with a real person on the other end.
            </p>

            <ul className="mt-8 space-y-5">
              {TALKING_POINTS.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span aria-hidden="true" className="text-2xl leading-none shrink-0">
                    {item.emoji}
                  </span>
                  <div>
                    <p
                      className="font-display text-h4 font-semibold"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 font-body text-[15px] leading-relaxed"
                      style={{ color: "var(--text-on-dark-secondary)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* RIGHT — focused CTA card routing to /booking */}
          <FadeUp delay={0.12}>
            <div
              className="shimmer-border relative flex flex-col gap-6 overflow-hidden rounded-2xl border p-8 shadow-[0_24px_56px_-24px_rgba(0,0,0,0.45)] md:p-10"
              style={{
                background: "var(--bg-base)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              {/* Subtle warm radial to match the section's iron-oxide glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.08), transparent 70%)",
                }}
              />

              <div
                aria-hidden="true"
                className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{
                  background: "rgba(47,74,58,0.08)",
                  color: "var(--primary)",
                }}
              >
                🗓️
              </div>

              <div className="relative">
                <p
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "var(--accent)",
                    letterSpacing: "0.22em",
                  }}
                >
                  One minute to book
                </p>
                <h3
                  className="mt-3 font-display text-h3 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Pick your time on the next page.
                </h3>
                <p
                  className="mt-4 font-body text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Free 15-minute call, on your schedule. Zero pressure, no obligation. You pick
                  the slot, I send a confirmation with my direct number.
                </p>
              </div>

              <div className="relative mt-2 flex flex-col gap-3">
                <Link
                  href="/booking"
                  className="group inline-flex items-center justify-center rounded-full px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.04em] transition hover:-translate-y-[2px] hover:brightness-110"
                  style={{
                    background: "var(--primary)",
                    color: "var(--bg-base)",
                    boxShadow: "0 14px 40px -12px rgba(47,74,58,0.45)",
                  }}
                >
                  Book a free consultation
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/quiz"
                  className="group inline-flex items-center justify-center rounded-full font-mono text-[12px] uppercase tracking-[0.14em] transition hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  Not ready? Take the quiz first
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default HomeBookingPreview;
