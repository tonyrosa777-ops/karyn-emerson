// =============================================================================
// /booking — dedicated booking page with inline BookingCalendar
// Per CLAUDE.md Always-Built Features Rule (Inline Booking Calendar) +
// Page Animation Rule (/booking gets a breathing orb, never flat).
// =============================================================================

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  realEstateAgentSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book a Call with Karyn Emerson | 15 Minute, No Pressure",
  description:
    "Book a free 15 minute call with Karyn Emerson. Southern NH real estate, zero pressure. Pick a slot and Karyn reaches out within 24 hours.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Call with Karyn Emerson",
    description:
      "Free 15 minute call. Pick a slot that works for you. Zero pressure, real answers.",
    type: "website",
    url: "/booking",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Book a Call with Karyn Emerson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call with Karyn Emerson",
    description:
      "Free 15 minute call. Zero pressure, real answers.",
    images: ["/og/default-og.svg"],
  },
};

const WHY_BOOK_COPY = [
  "This is a real conversation, not a sales pitch. Fifteen minutes, on your schedule, about where you are and what you are trying to figure out. If we are a fit, we keep talking. If we are not, I will tell you that too.",
  "You will not be on a phone tree. The number that calls you back is my cell. The email that lands in your inbox is from me. I work with a small number of clients a year on purpose.",
  "Bring your questions. Bring your doubts. Bring the list on your phone of houses you have been watching. We will go through it together, and you will walk away with a clearer picture of the next step, not another voicemail to return.",
];

const TALK_POINTS = [
  { emoji: "🎯", label: "Your goal for the next 6 to 12 months" },
  { emoji: "🗓️", label: "Your timeline and what is driving it" },
  { emoji: "📍", label: "Which Southern NH towns are on your list" },
  { emoji: "💰", label: "Your budget range, honestly" },
  { emoji: "🤔", label: "Any questions you have about the market right now" },
];

const FAQS = [
  {
    q: "How long is the call, really?",
    a: "Fifteen minutes, sometimes twenty. If we need longer and you want to keep going, we keep going. If fifteen is all you have, fifteen is enough to get the lay of the land.",
  },
  {
    q: "Is there any cost?",
    a: "No. Not for the call, not for a follow-up, not for a conversation before you are ready to list or buy. The commission is earned at closing, not at hello.",
  },
  {
    q: "What if I am not ready to sell or buy for a while?",
    a: "That is completely fine. Many of the best sellers I have worked with called me a year before they listed. Early conversations are useful. I will not push you to act before you are ready.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "Not really. If you are selling, know roughly what you paid and when, and any major updates you have done. If you are buying, know your rough budget and which towns are on your list. That is it.",
  },
  {
    q: "What happens right after I book?",
    a: "You get a calendar invite with the call details and my direct number. You can reschedule up to an hour before if life gets in the way.",
  },
];

// Filter testimonials that read like first-call praise (4 that emphasize first
// contact, responsiveness, zero-pressure). Not every testimonial fits — pick
// ones that map to the booking experience specifically.
function getFirstCallTestimonials() {
  const quotes = siteConfig.testimonials.filter((t) =>
    /karyn (answered|was|checked|drove|came|met|walked)/i.test(t.quote) ||
    /(no pressure|no games|no fluff|zero pressure|patient|kind about it)/i.test(
      t.quote
    )
  );
  return quotes.slice(0, 4);
}

export default function BookingPage() {
  const trust = getFirstCallTestimonials();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Book a Call", href: "/booking" },
  ]);
  const agent = realEstateAgentSchema({ path: "/booking" });
  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Book a 15-minute call with Karyn Emerson",
    url: absoluteUrl("/booking"),
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
      areaServed: siteConfig.location.serviceArea.map((t) => `${t}, NH`),
      telephone: siteConfig.contact.phone || undefined,
      email: siteConfig.contact.email || undefined,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, agent, contactPoint]} />
      {/* ── Hero header ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p
            className="font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            15 minutes · free · no pressure
          </p>
          <h1
            className="hero-shimmer mt-5 font-display text-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s have a conversation.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Not a pitch, not a pressure sit. Fifteen minutes about your
            timing, your town, and your actual situation. If you are a year
            out, we have the conversation a year out. That is the whole job.
          </p>
        </div>
      </section>

      {/* ── Two-column: why-book + calendar ──────────────── */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[5fr_6fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              What to expect
            </p>
            <h2
              className="mt-3 font-display text-h2 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              A real call, not a funnel.
            </h2>
            <div className="mt-6 space-y-5">
              {WHY_BOOK_COPY.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* ── What we'll talk about ──────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            On the call
          </p>
          <h2
            className="mt-3 font-display text-h2 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            What we will talk about.
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {TALK_POINTS.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-4 rounded-xl p-5"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(47,74,58,0.08)",
                }}
              >
                <span
                  className="text-2xl leading-none"
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <p
                  className="font-body text-[0.95rem] leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────── */}
      {trust.length > 0 && (
        <section
          className="relative py-20 md:py-24"
          style={{ background: "var(--primary)" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(246,241,231,0.6)" }}
            >
              What the first call feels like
            </p>
            <h2
              className="mt-3 font-display text-h2 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              From people who booked one.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {trust.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-xl p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    border: "1px solid var(--card-on-dark-border)",
                  }}
                >
                  <blockquote
                    className="font-display text-lg italic leading-relaxed"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption
                    className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "rgba(246,241,231,0.62)" }}
                  >
                    {t.name} · {t.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Quick questions
          </p>
          <h2
            className="mt-3 font-display text-h2 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Before you book.
          </h2>
          <dl className="mt-10 divide-y" style={{ borderColor: "rgba(47,74,58,0.12)" }}>
            {FAQS.map((f) => (
              <div key={f.q} className="py-6" style={{ borderTopColor: "rgba(47,74,58,0.12)" }}>
                <dt
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {f.q}
                </dt>
                <dd
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
