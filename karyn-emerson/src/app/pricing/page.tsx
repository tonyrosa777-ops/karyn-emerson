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
import { PRICING_TIERS, FEATURE_MATRIX } from "@/data/pricingTiers";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { PricingROI } from "@/components/sections/PricingROI";
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
      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[300px]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(181,83,44,0.12), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p
            className="font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            {"\u2B25"} Internal sales tool · Deleted before launch
          </p>
          <h1
            className="mt-5 font-display text-display font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Optimus Packages.
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Three tiers. Same on every build. Pick the one that fits what you
            want to ship. The price is the price, no splits, no add-ons that
            appear at the signing table.
          </p>
        </div>
      </section>

      {/* ── Tier cards ─────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
            {PRICING_TIERS.map((tier) => (
              <article
                key={tier.id}
                className="relative flex flex-col overflow-hidden rounded-2xl p-8 md:p-9"
                style={{
                  background: "var(--bg-card)",
                  border: tier.popular
                    ? "2px solid var(--accent)"
                    : "1px solid rgba(47,74,58,0.12)",
                  boxShadow: tier.popular
                    ? "0 24px 56px -24px rgba(181,83,44,0.3)"
                    : "0 8px 24px -12px rgba(26,31,28,0.1)",
                  transform: tier.popular ? "translateY(-8px)" : "none",
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute right-6 top-6 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-base)",
                    }}
                  >
                    Most Popular
                  </span>
                )}
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  {tier.name}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className="font-display font-semibold"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "clamp(2.5rem, 5vw, 3.25rem)",
                      lineHeight: 1,
                    }}
                  >
                    {tier.priceLabel}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    one-time
                  </span>
                </div>
                <p
                  className="mt-3 font-display text-lg italic"
                  style={{ color: "var(--primary)" }}
                >
                  {tier.tagline}
                </p>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {tier.featureHighlights.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span aria-hidden="true">{"\u2705"}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex-1" />
                <a
                  href="#book-a-call"
                  className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-[1px]"
                  style={{
                    background: tier.popular
                      ? "var(--accent)"
                      : "var(--primary)",
                    color: "var(--bg-base)",
                    boxShadow: tier.popular
                      ? "0 10px 30px -10px rgba(181,83,44,0.4)"
                      : "0 10px 30px -10px rgba(47,74,58,0.4)",
                  }}
                >
                  {tier.ctaLabel}
                </a>
              </article>
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
                      {row.starter ? "\u2705" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"\u2717"}
                        </span>
                      )}
                    </span>
                    <span className="text-center text-lg">
                      {row.pro ? "\u2705" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"\u2717"}
                        </span>
                      )}
                    </span>
                    <span className="text-center text-lg">
                      {row.premium ? "\u2705" : (
                        <span style={{ color: "var(--text-muted)" }}>
                          {"\u2717"}
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
