"use client";

// =============================================================================
// HomeQuizCTA — Section 7 (DARK, conversion — mid-page nudge)
// Per CLAUDE.md Section Content Deduplication Rule: the quiz is the mid-page
// conversion (distinct format from the final booking CTA at the bottom).
// 2-col: left text + pill CTA to /quiz, right panel is a sample archetype
// preview card.
// =============================================================================

import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { SlideIn } from "@/components/animations/SlideIn";

export function HomeQuizCTA() {
  return (
    <section
      id="quiz-cta"
      aria-labelledby="quiz-cta-heading"
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
            "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* LEFT — copy + pill CTA */}
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{
                color: "var(--text-on-dark-muted)",
                letterSpacing: "0.22em",
              }}
            >
              Five minutes, zero pressure
            </p>
            <h2
              id="quiz-cta-heading"
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Not sure if now is the right time?
            </h2>
            <p
              className="mt-5 max-w-xl font-body text-lg leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Take the quick quiz. Six questions, takes about ninety seconds, and you will come
              away with a clear read on your situation, your timing, and the single next step
              worth taking. No email gate. No follow-up spam. Just a useful answer.
            </p>

            <div className="mt-8">
              <Link
                href="/quiz"
                className="inline-flex items-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase transition hover:-translate-y-[1px]"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                  letterSpacing: "0.04em",
                }}
              >
                Take the Quiz
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </Link>
            </div>
          </FadeUp>

          {/* RIGHT — sample archetype preview card */}
          <SlideIn direction="right" distance={40}>
            <div
              className="relative rounded-lg border p-8"
              style={{
                background: "var(--card-on-dark-bg)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <p
                className="font-mono text-xs uppercase"
                style={{
                  color: "var(--accent)",
                  letterSpacing: "0.22em",
                }}
              >
                Sample result
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span aria-hidden="true" className="text-3xl leading-none">
                  🧭
                </span>
                <h3
                  className="font-display text-h3 font-semibold"
                  style={{ color: "var(--text-on-dark-primary)" }}
                >
                  The MA Relocator
                </h3>
              </div>

              <p
                className="mt-5 font-body text-[15px] leading-relaxed"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                You are crossing the border from Methuen, Lawrence, Andover, or Woburn. The tax
                math matters, the commute matters, and you need an agent who can compare Salem,
                Windham, and Derry honestly before you pick a town.
              </p>

              <div
                className="mt-6 flex items-center gap-4 pt-6 border-t"
                style={{ borderColor: "var(--card-on-dark-border)" }}
              >
                <span
                  className="font-mono text-xs uppercase"
                  style={{
                    color: "var(--text-on-dark-muted)",
                    letterSpacing: "0.14em",
                  }}
                >
                  Recommended next step
                </span>
              </div>
              <p
                className="mt-2 font-body text-[15px]"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                Book a 15-minute relocation call so we can run the tax math on your exact situation.
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

export default HomeQuizCTA;
