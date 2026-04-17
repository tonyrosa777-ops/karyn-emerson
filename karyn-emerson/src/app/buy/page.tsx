import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";

// =============================================================================
// /buy — buyer-focused page.
// Hero / "What buying in Southern NH actually looks like" (P&S, inspection,
// well, septic, appraisal) / common worries / IDX placeholder tile /
// filtered buying/relocating testimonials / CTA.
// RealEstateAgent schema included on this page per pageplan.
// =============================================================================

export const metadata: Metadata = {
  title:
    "Buying a Home in Southern New Hampshire | Karyn Emerson Real Estate",
  description:
    "What buying in Southern NH actually looks like. P&S, inspection, well, septic, appraisal, in plain English. Buyer representation with Karyn Emerson, Jill & Co. Realty Group.",
  openGraph: {
    title: "Buying a Home in Southern New Hampshire | Karyn Emerson Real Estate",
    description:
      "Plain-English buyer guide for Southern NH. Jill & Co. Realty Group, Salem NH.",
    type: "website",
    url: "https://karynemerson.com/buy",
  },
};

// The buyer flow, stepwise, written in the Karyn voice (plain English).
const buyerSteps: Array<{
  emoji: string;
  title: string;
  body: string;
}> = [
  {
    emoji: "📋",
    title: "Purchase and Sale Agreement (P&S)",
    body: "This is the main contract. It names the price, the deposit, the closing date, the contingencies, and the inclusions. In NH the P&S is usually written on a standard NHAR form. I walk you through every clause before you initial it.",
  },
  {
    emoji: "🔍",
    title: "Home inspection",
    body: "Ten business days is typical. A NH home inspector walks the roof, the systems, the foundation, and reports in writing. We go over the report together and decide which items to ask for, which to let go, and which to use to renegotiate price.",
  },
  {
    emoji: "💧",
    title: "Well test",
    body: "Most Southern NH homes outside town centers are on private wells. A standard well test checks bacteria, nitrates, arsenic, radon in water, and flow rate. We require this in the P&S. If the numbers come back wrong, we negotiate a treatment system or a credit.",
  },
  {
    emoji: "🌿",
    title: "Septic inspection",
    body: "If the home is on septic (common outside town sewer zones), you want a dye test or a Title 5-equivalent inspection. We flag tank age, leach field condition, and last pump-out. A failing septic is a $20,000 to $40,000 negotiation line item.",
  },
  {
    emoji: "📐",
    title: "Appraisal",
    body: "Your lender orders the appraisal once the inspection contingency is cleared. If the appraisal comes in low, we have three paths: ask the seller to lower the price, contest the appraisal with comps, or bring additional cash. I have done all three.",
  },
  {
    emoji: "🗝️",
    title: "Closing",
    body: "NH closings are done by a closing attorney or title company. We review the closing disclosure 72 hours before signing, I flag any math that looks off, and we close. Keys, deed, and a new mailbox. Plan an hour for the signing appointment.",
  },
];

// Common buyer worries and the honest answer, in Karyn's voice.
const buyerWorries: Array<{ emoji: string; title: string; body: string }> = [
  {
    emoji: "💸",
    title: "How much house can I actually afford?",
    body: "Mortgage calculators are optimistic. We back into affordability from monthly take-home, property tax escrow, insurance, and a realistic reserve. In Southern NH, plan on 28% of gross for principal, interest, tax, and insurance on a 30-year fixed.",
  },
  {
    emoji: "📶",
    title: "Will I overpay in a bidding war?",
    body: "Multi-offer situations happen in Windham and Londonderry especially. I show you the recent sold comps, the list-to-sale ratio, and the days on market for the street. You always know the ceiling before you write the offer.",
  },
  {
    emoji: "🛠️",
    title: "What if the inspection uncovers something bad?",
    body: "That is what the inspection contingency is for. We either renegotiate the price, ask for repairs, or walk away with the deposit intact. I have walked three deals in the last year over inspection findings. It is a feature of the process, not a failure.",
  },
  {
    emoji: "🧾",
    title: "What will my NH property tax bill look like?",
    body: "Every town's mill rate is different. I pull the current assessment and the certified rate before you go under contract. You see a full-year estimate, not a guess. The /tax-calculator page on this site has the math if you want a first pass.",
  },
  {
    emoji: "🕘",
    title: "Will you actually answer my texts?",
    body: "Yes. Evenings, weekends, the stretch between offer and close. The single loudest complaint in online agent reviews is post-signing silence. That is not how I work.",
  },
];

// Filtered testimonials: buyers + relocating buyers only.
const filteredTestimonials = siteConfig.testimonials
  .filter(
    (t) => t.serviceType === "buying" || t.serviceType === "relocating"
  )
  .slice(0, 6);

export default function BuyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.businessName,
    url: `https://${siteConfig.domain}/buy`,
    description:
      "Buyer representation in Southern New Hampshire. P&S, inspection, well, septic, and appraisal in plain English.",
    worksFor: {
      "@type": "RealEstateOrganization",
      name: siteConfig.brokerage,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.state,
      },
    },
    areaServed: siteConfig.location.serviceArea.map((town) => ({
      "@type": "City",
      name: `${town}, NH`,
    })),
    knowsAbout: [
      "First-time home buying in New Hampshire",
      "Purchase and Sale Agreement",
      "NH well and septic inspections",
      "Appraisal contingency",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* SECTION 1 — HERO (LIGHT, shimmer H1) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="absolute inset-0 z-0">
          <AmbientParticles density="low" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              BUYER REPRESENTATION · SOUTHERN NH
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              What buying in Southern NH actually looks like.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              The P&amp;S, the inspection, the well test, the septic, the
              appraisal, the closing. In plain English, in the order they
              happen, so you are not Googling acronyms at midnight.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — WHAT BUYING LOOKS LIKE (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              THE SIX STEPS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              From the first tour to the keys.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {buyerSteps.map((s, i) => (
              <FadeUp key={s.title} delay={0.05 + i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {s.emoji}
                  </div>
                  <h3
                    className="mt-4 font-display text-h4 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {s.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMMON BUYER WORRIES (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              COMMON WORRIES
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              The five questions every buyer actually has.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {buyerWorries.map((w, i) => (
              <FadeUp key={w.title} delay={0.05 + i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47, 74, 58, 0.08)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {w.emoji}
                  </div>
                  <h3 className="mt-4 font-display text-h4 font-semibold text-[var(--text-primary)]">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {w.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — IDX SEARCH PLACEHOLDER (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(246,241,231,0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 text-center md:py-20 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              [IDX placeholder - live search post-launch]
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Live Southern NH search is coming.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              The IDX platform for this site is pending final selection with
              Jill &amp; Co. (iHomeFinder vs. Showcase IDX). Until then, send
              me what you are looking for and I will set up a private search
              that beats any public portal.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                }}
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--bg-base)",
                  color: "var(--bg-base)",
                }}
              >
                What Is Moving Now
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 5 — BUYER TESTIMONIALS (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              BUYERS, IN THEIR OWN WORDS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              What Southern NH buyers are saying.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((t, i) => (
              <FadeUp key={`${t.name}-${i}`} delay={0.05 + i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(47, 74, 58, 0.1)",
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    {t.serviceType}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[var(--text-primary)]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-5 font-display text-sm font-semibold text-[var(--text-primary)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.location}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/testimonials"
                className="font-body text-sm font-semibold underline underline-offset-[6px]"
                style={{ color: "var(--primary)" }}
              >
                See all testimonials
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 6 — CTA (DARK, forest green, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <BreathingOrb tone="forest" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--text-on-dark-muted)" }}
            >
              START THE SEARCH
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Fifteen minutes on a call beats an hour on Zillow.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Tell me the town, the budget, and the must-haves. I will tell you
              whether what you want actually exists in Southern NH at that
              price, and what we do if it does not.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                }}
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--bg-base)",
                  color: "var(--bg-base)",
                }}
              >
                Take the Quiz
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
