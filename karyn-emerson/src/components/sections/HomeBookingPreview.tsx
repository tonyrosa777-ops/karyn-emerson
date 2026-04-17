"use client";

// =============================================================================
// HomeBookingPreview — Section 9 (DARK forest-green, FINAL conversion)
// Per CLAUDE.md Section Content Deduplication Rule: this is THE only final CTA
// at the bottom of the homepage — no separate "Ready to X?" block after.
// 2-col: left text + 3-bullet list, right panel embeds <BookingCalendar />.
// =============================================================================

import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { FadeUp } from "@/components/animations/FadeUp";

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
              Pick a 15-minute slot on the calendar, tell me a little about your situation, and
              we will talk. No form maze, no deferred callback, no &ldquo;we will be in touch
              within 24 hours.&rdquo; A real time on a real calendar, with a real person on the
              other end.
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

          {/* RIGHT — inline BookingCalendar */}
          <FadeUp delay={0.12}>
            <div
              className="rounded-lg border p-4 md:p-6"
              style={{
                background: "var(--bg-base)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <BookingCalendar />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default HomeBookingPreview;
