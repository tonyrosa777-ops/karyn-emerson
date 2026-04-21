// =============================================================================
// /pricing — Optimus INTERNAL SALES TOOL — DELETED BEFORE LAUNCH
// Per CLAUDE.md Always-Built Features Rule (Pricing Page):
//   - FIXED Starter / Pro / Premium structure, same on every build
//   - Pro gets "Most Popular" badge in iron-oxide
//   - Every tier CTA leads to the inline BookingCalendar at the foot of the page
//   - ROI Calculator: 2 sliders + package selector + computed outputs
//   - Full comparison chart: 5 feature categories per CLAUDE.md
//   - NO "deposit" / "upfront" / payment-split language — the price is the price
//   - NO Google services anywhere (not in feature lists, not in headers)
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import { PRICING_TIERS, FEATURE_MATRIX } from "@/data/pricingTiers";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { PricingROI } from "@/components/sections/PricingROI";
import { PageBanner } from "@/components/sections/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Optimus Packages | Internal Sales Tool",
  description:
    "Optimus Starter, Pro, and Premium packages. Internal sales tool. Deleted before launch.",
  alternates: { canonical: "/pricing" },
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function PricingPage() {
  // OfferCatalog schema — internal sales tool, noindexed, but structured data
  // still helps the demo when the page is read by LLMs during evaluation.
  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Optimus Business Solutions Packages",
    url: absoluteUrl("/pricing"),
    itemListElement: PRICING_TIERS.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.description,
      price: tier.price,
      priceCurrency: "USD",
      category: "Website build package",
      itemOffered: {
        "@type": "Service",
        name: `${tier.name} website package`,
        description: tier.tagline,
      },
    })),
  };

  return (
    <>
      <JsonLd data={offerCatalog} />
      {/* ── Aurora banner ─────────────────────────────── */}
      <PageBanner
        mode="aurora"
        auroraTone="warm"
        eyebrow="OPTIMUS · 3 TIERS · TRANSPARENT"
        title={<>One site. One month. Sold.</>}
        titleMotion="shimmer"
        subhead="Three fixed tiers, one clear scope each. No retainers, no per-page surprises. The price is the price, and the site ships in a month."
        height="md"
        textSide="center"
        ambient="leaves"
      />

      {/* ── Tier cards — editorial spread ────────────── */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-8">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex h-full flex-col rounded-2xl p-8 md:p-10 ${
                  tier.popular ? "emphasis-card" : ""
                }`}
                style={{
                  background: tier.popular ? "var(--bg-card)" : "transparent",
                  border: tier.popular
                    ? "1.5px solid rgba(47,74,58,0.08)"
                    : "none",
                  boxShadow: tier.popular
                    ? "0 24px 56px -28px rgba(26,31,28,0.18)"
                    : "none",
                  transform: tier.popular ? "scale(1.02)" : "none",
                }}
              >
                {/* Inner content wrapper */}
                <div className="relative z-[2] flex h-full flex-col">
                  {tier.popular && (
                    <p
                      className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: "var(--accent)" }}
                    >
                      MOST POPULAR
                    </p>
                  )}
                  <p
                    className="font-mono text-xs uppercase tracking-[0.22em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {tier.tagline}
                  </p>
                  <h2
                    className="mt-3 font-display font-semibold"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      lineHeight: 1.1,
                      color: "var(--text-primary)",
                    }}
                  >
                    {tier.name}
                  </h2>
                  <p
                    className="mt-6 font-display font-semibold"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      lineHeight: 1,
                      color: "var(--primary)",
                    }}
                  >
                    {tier.priceLabel}
                  </p>
                  <p
                    className="mt-5 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tier.description}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3">
                    {tier.featureHighlights.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <span aria-hidden="true" className="mt-0.5">
                          {"✅"}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#book-a-call"
                    className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-[1px]"
                    style={{
                      background: tier.popular
                        ? "var(--primary)"
                        : "transparent",
                      color: tier.popular
                        ? "var(--bg-base)"
                        : "var(--primary)",
                      border: tier.popular
                        ? "none"
                        : "2px solid var(--primary)",
                    }}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ──────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              Run the numbers
            </p>
            <h2
              className="mt-3 font-display text-h1 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              What does this pay back?
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              One closed transaction covers the cost of any tier. Move the
              sliders and see the math.
            </p>
          </div>
          <PricingROI />
        </div>
      </section>

      {/* ── Comparison chart ────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              Full comparison
            </p>
            <h2
              className="mt-3 font-display text-h1 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Everything, side by side.
            </h2>
          </div>

          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(47,74,58,0.12)",
            }}
          >
            {/* Header row */}
            <div
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 px-4 py-4 md:gap-6 md:px-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(47,74,58,0.06) 0%, rgba(47,74,58,0) 100%)",
                borderBottom: "1px solid rgba(47,74,58,0.1)",
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                Feature
              </span>
              {PRICING_TIERS.map((t) => (
                <span
                  key={t.id}
                  className="text-center"
                >
                  <span
                    className="block font-display text-base font-semibold md:text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="block font-mono text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.priceLabel}
                  </span>
                </span>
              ))}
            </div>

            {FEATURE_MATRIX.map((cat) => (
              <div key={cat.name}>
                <div
                  className="flex items-center gap-2 px-4 py-4 md:px-8"
                  style={{
                    background: "var(--bg-elevated)",
                    borderTop: "1px solid rgba(47,74,58,0.08)",
                    borderBottom: "1px solid rgba(47,74,58,0.08)",
                  }}
                >
                  <span aria-hidden="true" className="text-base">
                    {cat.emoji}
                  </span>
                  <span
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--primary)" }}
                  >
                    {cat.name}
                  </span>
                </div>
                {cat.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-2 px-4 py-3.5 text-sm md:gap-6 md:px-8"
                    style={{
                      borderBottom: "1px solid rgba(47,74,58,0.06)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="font-body">{row.label}</span>
                    <span className="text-center text-lg">
                      {row.starter ? "✅" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"✗"}
                        </span>
                      )}
                    </span>
                    <span className="text-center text-lg">
                      {row.pro ? "✅" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"✗"}
                        </span>
                      )}
                    </span>
                    <span className="text-center text-lg">
                      {row.premium ? "✅" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"✗"}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline booking ─────────────────────────────── */}
      <section
        id="book-a-call"
        className="py-20 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              Next step
            </p>
            <h2
              className="mt-3 font-display text-h1 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Pick a slot, talk it through.
            </h2>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Fifteen minutes, free, no pressure. Walk through which tier fits
              and what you are actually trying to build.
            </p>
          </div>
          <BookingCalendar
            title="Book a package discovery call"
            subtitle="Fifteen minutes to match you to a tier. No pressure, no obligation."
          />
        </div>
      </section>
    </>
  );
}
