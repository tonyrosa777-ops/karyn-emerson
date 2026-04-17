"use client";

// =============================================================================
// HomeAboutTeaser — Section 3 (DARK forest-green, story)
// Inverted text per design-system.md §2 dark-section rule. Two paragraphs +
// link to /about. No emphasized portrait in hero, small editorial portrait to
// the side is allowed here (placeholder for Stage 1G fal.ai photography).
// Radial-gradient overlay at top per CLAUDE.md Section Alternation Rule.
// =============================================================================

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { SlideIn } from "@/components/animations/SlideIn";

export function HomeAboutTeaser() {
  return (
    <section
      id="about-teaser"
      aria-labelledby="about-teaser-heading"
      className="relative py-16 md:py-24"
      style={{
        background: "var(--primary)",
        color: "var(--text-on-dark-primary)",
      }}
    >
      {/* Radial overlay — never flat dark (CLAUDE.md §Section Alternation) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* LEFT — copy */}
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{
                color: "var(--text-on-dark-muted)",
                letterSpacing: "0.22em",
              }}
            >
              About Karyn
            </p>
            <h2
              id="about-teaser-heading"
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              A lifetime in Southern NH, and a practice built around the conversation, not the
              transaction.
            </h2>
            <div
              className="mt-6 space-y-5 font-body text-lg leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              <p>
                I grew up in this area. I know which side of Cobbett&rsquo;s Pond holds its value
                through a down cycle, which Salem High feeder streets are quietly rezoning this
                year, and what it feels like to sit at a Windham kitchen table with a family that
                has lived there for forty years and is finally ready to talk about what comes
                next.
              </p>
              <p>
                My practice is built on that kind of conversation. No scripts, no form letters,
                no pressure. You call, we meet, we walk the house or the neighborhood, and we go
                from there. If the timing is next month, great. If the timing is next year, that
                is fine too. Either way, you deserve an agent who starts with your situation, not
                a listing appointment.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase transition hover:-translate-y-[1px]"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                  letterSpacing: "0.04em",
                }}
              >
                Read Karyn&rsquo;s Story
              </Link>
            </div>
          </FadeUp>

          {/* RIGHT — portrait placeholder (fal.ai fills in Stage 1G) */}
          <SlideIn direction="right" distance={40}>
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border"
              style={{
                borderColor: "var(--card-on-dark-border)",
                background: "var(--card-on-dark-bg)",
              }}
            >
              {/* Portrait placeholder — matches /images/neighborhoods SVG pattern.
                  Image swapped in Stage 1G fal.ai batch. [DEMO COPY — Stage 1G] */}
              <Image
                src="/images/karyn-portrait.jpg"
                alt="Karyn Emerson editorial portrait"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                // Graceful degradation: if file missing during demo, the alt text shows.
                unoptimized
              />
              {/* Soft iron-oxide wash to match editorial mood even before photo lands */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(47,74,58,0) 40%, rgba(47,74,58,0.35) 100%)",
                }}
              />
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

export default HomeAboutTeaser;
