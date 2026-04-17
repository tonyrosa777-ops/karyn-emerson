import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import CommissionFaq from "@/components/sections/CommissionFaq";

// =============================================================================
// /commission — Commission transparency page.
// Closes market-intelligence.md §4 and §5 gap #3 (four of five competitors hide
// commission; Sevajian's 2-6% disclosure is her strongest trust lever).
// Section order: hero / ranges / what is included / NAR explainer / iBuyer
// comparison / FAQ / CTA. Light and dark sections alternate.
// =============================================================================

export const metadata: Metadata = {
  title: "How I Am Paid | Commission Transparency | Karyn Emerson Real Estate",
  description:
    "Listing-side and buyer-side commission ranges, what they include, and what changed after the August 2024 NAR settlement. Plain English, no callback queue.",
  openGraph: {
    title: "How I Am Paid | Commission Transparency | Karyn Emerson Real Estate",
    description:
      "Transparent NH commission ranges, post-NAR rules, and an honest iBuyer comparison.",
    type: "website",
    url: "https://karynemerson.com/commission",
  },
};

// [DEMO COPY - Karyn to confirm her exact services list]
const whatIsIncluded = [
  {
    emoji: "📸",
    title: "Professional listing photography",
    body: "Wide-angle, natural-light photography of every main room, plus neighborhood and exterior shots. Not phone snaps, not stock.",
  },
  {
    emoji: "📐",
    title: "Home-valuation CMA",
    body: "A real comparative market analysis, prepared from live and recent solds on your cul-de-sac, not a Zillow zestimate print-out.",
  },
  {
    emoji: "🪑",
    title: "Staging consultation",
    body: "A walkthrough with staging notes room by room. Keep what works, move what does not, no forced redesign.",
  },
  {
    emoji: "📝",
    title: "30-day listing agreement, mutual release",
    body: "A short term, cancelable for any reason. You are never locked in to me longer than we are working.",
  },
  {
    emoji: "🔍",
    title: "Inspection prep and response",
    body: "A pre-listing inspection checklist and, after offers, help reading the buyer's inspection and writing a calm response.",
  },
  {
    emoji: "🤝",
    title: "Negotiation representation",
    body: "I write the counter language, I read the contract terms, I manage contingencies. You sign, I do the work in between.",
  },
  {
    emoji: "🗝️",
    title: "Closing coordination",
    body: "Title, lender, attorney, buyer agent, movers. I thread the schedule so you close on the date we agreed, not the date everyone else agreed.",
  },
];

// [DEMO COPY - confirm with current Redfin / Real Estate Witch data before launch]
// Data point sources documented in market-intelligence.md §4 + §5 gap #9.
const iBuyerRows: Array<{
  label: string;
  opendoor: string;
  karyn: string;
  winnerKaryn: boolean;
}> = [
  {
    label: "Offer / sale price (on a $500K home)",
    opendoor: "$455,000",
    karyn: "$500,000",
    winnerKaryn: true,
  },
  {
    label: "Service fees and repair credits",
    opendoor: "$22,000 (~5%) + repair deductions",
    karyn: "Listing-side commission inside the 2% to 3% range",
    winnerKaryn: true,
  },
  {
    label: "Estimated net proceeds (rough)",
    opendoor: "$410,000",
    karyn: "$455,000 to $475,000",
    winnerKaryn: true,
  },
  {
    label: "Time to close",
    opendoor: "14 to 30 days",
    karyn: "30 to 45 days (30-day listing, then close)",
    winnerKaryn: false,
  },
  {
    label: "Certainty",
    opendoor: "Locked cash offer, low contingency risk",
    karyn: "Market exposure with multi-offer potential",
    winnerKaryn: false,
  },
  {
    label: "Control over the sale",
    opendoor: "Take the offer or leave it",
    karyn: "Price, terms, timing are yours to shape",
    winnerKaryn: true,
  },
];

const faqItems = [
  {
    q: "Is 2% to 3% really negotiable?",
    a: "Yes. Commission is fully negotiable and is not set by law. The number you see quoted anywhere is a common range, not a rate card. We agree on the number together at the listing appointment, in writing, and you always have the full picture of what it buys.",
  },
  {
    q: "What about buyer agency after August 2024?",
    a: "The NAR settlement, effective August 17, 2024, made two changes that matter. Offers of buyer-agent compensation can no longer be advertised on the MLS, and a written buyer-broker agreement is required before I tour a home with you. We sign a short, plain-English agreement that lays out the rate and the term, and either of us can end it. It protects both of us.",
  },
  {
    q: "Do I pay for photography or staging upfront?",
    a: "No. Listing photography and the staging consultation come out of the commission at closing, not out of your pocket at the front end. If we agree to a listing and it does not sell, you do not owe me for the photos.",
  },
  {
    q: "What is the difference between listing-side and buyer-side?",
    a: "Listing-side is what the seller pays their agent, typically 2% to 3% in Southern NH. Buyer-side is what a buyer pays their agent, typically 2.5% to 3% under the new rules, and it is now negotiated directly with the buyer in that written agreement. On a sale, both sides are compensated; after August 2024, they are compensated separately, not bundled on the MLS.",
  },
  {
    q: "Will I net less if buyers have to bring their own commission?",
    a: "Year-one data says no, not in practice. Redfin reporting from August 2025 shows buyer-side commissions actually ticked up, from 2.38% to 2.43% nationally, and under $500K the average sat near 2.49% to 2.52%. What the new rules changed is transparency, not the underlying math. A well-priced, well-marketed listing still sells at market.",
  },
  {
    q: "Why not just list with Redfin for 1% or use a flat-fee MLS?",
    a: "If your only goal is the lowest possible listing fee, those are legitimate options and I will tell you honestly. What you give up is the negotiation, the representation, and in most cases the marketing that drives multi-offer situations. On a $500K home, a difference of one to two percent of the sale price often gets absorbed by a weaker outcome. That is a judgment call, and I am happy to talk through it with no hard sell.",
  },
];

export default function CommissionPage() {
  // RealEstateAgent schema with knowsAbout commission + NAR topics.
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.businessName,
    url: `https://${siteConfig.domain}/commission`,
    worksFor: {
      "@type": "RealEstateOrganization",
      name: siteConfig.brokerage,
    },
    areaServed: siteConfig.location.serviceArea.map((town) => ({
      "@type": "City",
      name: `${town}, NH`,
    })),
    knowsAbout: [
      "NH real estate commission ranges",
      "NAR August 2024 settlement",
      "Buyer-broker agreements",
      "iBuyer comparison",
    ],
  };

  // FAQPage schema so the accordion earns rich snippets.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer H1) */}
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
              COMMISSION · SOUTHERN NEW HAMPSHIRE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              How I am paid.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Most agent sites hide this page. I do not. Here is the range, what
              it buys, what changed after August 2024, and how it lines up
              against an Opendoor offer on the same home.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — THE PLAIN-ENGLISH ANSWER (DARK, forest green) */}
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
              THE RANGES
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Two ranges, in writing, every time.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="flex h-full flex-col rounded-lg border p-8"
              style={{
                background: "var(--card-on-dark-bg)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--accent)" }}
              >
                LISTING-SIDE (SELLERS)
              </p>
              <p
                className="font-mono mt-3 text-5xl font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                2% to 3%
              </p>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                The range I work inside on Southern NH listings. Where inside
                that range we land depends on the home, the market window, and
                what you want the marketing to do.
              </p>
            </div>
            <div
              className="flex h-full flex-col rounded-lg border p-8"
              style={{
                background: "var(--card-on-dark-bg)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--accent)" }}
              >
                BUYER-SIDE (BUYERS)
              </p>
              <p
                className="font-mono mt-3 text-5xl font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                2.5% to 3%
              </p>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                The range I work inside as a buyer's agent, now negotiated
                directly with you in a written buyer-broker agreement before
                the first tour.
              </p>
            </div>
          </div>

          {/* NAR "fully negotiable" pull-quote in JetBrains Mono. */}
          <FadeUp delay={0.2}>
            <blockquote
              className="font-mono mt-10 rounded-md border-l-4 px-6 py-4 text-sm leading-relaxed md:text-base"
              style={{
                borderColor: "var(--accent)",
                color: "var(--text-on-dark-primary)",
                background: "rgba(246,241,231,0.04)",
              }}
            >
              &ldquo;Commissions are fully negotiable and are not set by law.&rdquo;
              <br />
              <span
                className="block text-xs"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                Per NAR disclosure rules, effective August 17, 2024.
              </span>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3 — WHAT IS INCLUDED (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              WHAT IS INCLUDED
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              What you actually get inside that range.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Every listing includes all of the following. No upsell for
              photography, no line item for staging, no surprise fee at
              closing. [DEMO COPY - Karyn to confirm her exact services list].
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whatIsIncluded.map((item, i) => (
              <FadeUp key={item.title} delay={0.05 + i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47, 74, 58, 0.08)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {item.emoji}
                  </div>
                  <h3 className="mt-4 font-display text-h4 font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — NAR AUGUST 2024 EXPLAINER (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 md:py-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              POST-NAR, AUGUST 2024
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              What changed, in plain English.
            </h2>
          </FadeUp>
          <div
            className="mt-6 space-y-5 text-base leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            <p>
              On August 17, 2024, the NAR settlement went into effect and
              changed two things every NH buyer and seller should understand.
              First, offers of buyer-agent compensation can no longer be
              advertised on the MLS. Second, a written buyer-broker agreement
              is required before I can tour a home with a buyer. Both changes
              push the conversation about compensation out into the open,
              before the house visit, in writing.
            </p>
            <p>
              A lot of headlines predicted buyer commissions would fall off a
              cliff. Year-one data says otherwise. Redfin reporting published in
              August 2025 shows the buyer-side commission actually ticked up on
              average, from{" "}
              <span className="font-mono">2.38%</span> to{" "}
              <span className="font-mono">2.43%</span> nationally, and under{" "}
              <span className="font-mono">$500,000</span> the average landed
              near <span className="font-mono">2.49%</span> to{" "}
              <span className="font-mono">2.52%</span>. What changed is not the
              underlying math so much as the transparency.
            </p>
            <p>
              For a seller, the practical effect is that you and I decide
              together what, if anything, you are willing to offer toward a
              buyer's agent. That decision lives on your listing paperwork, not
              on the MLS. For a buyer, the practical effect is that the rate
              you pay is visible on paper before the first showing.
            </p>
            <p>
              The new rules favor the informed seller and the informed buyer.
              If you have a question about what this looks like on your
              specific transaction, ask me. Fifteen minutes on a call usually
              covers it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — IBUYER COMPARISON (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              IBUYER VS. LISTING WITH ME
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              Opendoor cash offer, or a 30-day listing.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              A side-by-side on a{" "}
              <span className="font-mono">$500,000</span> Southern NH home.
              Figures are representative; Real Estate Witch has tracked
              Opendoor offers averaging roughly{" "}
              <span className="font-mono">$45,000</span> below fair market
              value on a home that size, before fees. [DEMO COPY - estimates,
              confirm current figures].
            </p>
          </FadeUp>

          <div
            className="mt-10 overflow-x-auto rounded-lg border"
            style={{
              background: "var(--bg-card)",
              borderColor: "rgba(47, 74, 58, 0.1)",
            }}
          >
            <table className="w-full text-left">
              <caption className="sr-only">
                Opendoor vs. listing with Karyn Emerson on a $500,000 Southern
                NH home.
              </caption>
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "rgba(47, 74, 58, 0.1)" }}
                >
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
                  >
                    Line item
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
                  >
                    Opendoor (cash offer)
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
                  >
                    Listing with Karyn
                  </th>
                </tr>
              </thead>
              <tbody>
                {iBuyerRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    style={{
                      background:
                        idx % 2 === 0
                          ? "var(--bg-card)"
                          : "var(--bg-elevated)",
                    }}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-display text-sm font-semibold text-[var(--text-primary)]"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 font-mono text-sm text-[var(--text-primary)]">
                      {row.opendoor}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{
                        color: row.winnerKaryn
                          ? "var(--primary)"
                          : "var(--text-primary)",
                        fontWeight: row.winnerKaryn ? 600 : 400,
                      }}
                    >
                      {row.karyn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
              If your timeline absolutely demands cash in 14 days, I will tell
              you. There are real situations where an iBuyer is the right
              answer. For most sellers, a 30-day listing at market price nets
              more than any iBuyer offer, even after commission. On a{" "}
              <span className="font-mono">$500,000</span> home that delta is
              typically{" "}
              <span className="font-mono font-semibold text-[var(--primary)]">
                $40,000 to $50,000
              </span>
              .
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 6 — FAQ (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 md:py-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              FREQUENTLY ASKED
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              The six questions I hear most.
            </h2>
          </FadeUp>
          <div className="mt-8">
            <CommissionFaq items={faqItems} />
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA (LIGHT, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              START HERE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              Ask me your hardest question on a 15-minute call.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              If I can answer your commission question in fifteen minutes, I
              will. If it takes longer, we will book a second call. Either way
              you leave with the real numbers.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  background: "var(--primary)",
                  color: "var(--bg-base)",
                }}
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
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
