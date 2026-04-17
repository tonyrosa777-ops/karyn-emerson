import type { Metadata } from "next";
import Link from "next/link";
import { nhTownTaxData } from "@/data/taxRates";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import TaxCalcClient from "@/components/sections/TaxCalcClient";
import TaxCalcTable from "@/components/sections/TaxCalcTable";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, realEstateAgentSchema } from "@/lib/schema";

// =============================================================================
// /tax-calculator — NH property tax by town (SEO flagship calculator).
// Closes market-intelligence.md §5 gap #4 and §6 long-tail #2.
// Every number formatted with JetBrains Mono via .font-mono.
// =============================================================================

export const metadata: Metadata = {
  title:
    "NH Property Tax Calculator by Town | Salem, Windham, Derry, Londonderry",
  description:
    "What you will actually pay in NH property tax. Mill rates and sample bills for Salem, Windham, Derry, Londonderry, Pelham, Atkinson, Hampstead.",
  alternates: { canonical: "/tax-calculator" },
  openGraph: {
    title: "NH Property Tax Calculator by Town | Karyn Emerson",
    description:
      "Interactive NH property tax calculator for Southern New Hampshire, with mill rates and exemptions.",
    type: "website",
    url: "/tax-calculator",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "NH Property Tax Calculator by Town · Karyn Emerson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NH Property Tax Calculator by Town | Karyn Emerson",
    description:
      "Mill rates and sample bills for Salem, Windham, Derry, and four more Southern NH towns.",
    images: ["/og/default-og.jpg"],
  },
};

export default function TaxCalculatorPage() {
  const schema = realEstateAgentSchema({
    path: "/tax-calculator",
    description:
      "Karyn Emerson explains NH property tax by town. Mill rates, exemptions, and sample bills for Southern New Hampshire.",
  });
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "NH Property Tax Calculator", href: "/tax-calculator" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, schema]} />

      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer H1 + ambient particles) */}
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
              PROPERTY TAX · SOUTHERN NEW HAMPSHIRE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              What you will actually pay in property tax, by town.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Eight Southern NH towns, three sample home values, and the mill
              rate behind each bill. Type in your number, pick a town, and see
              the real dollars. No account, no callback queue.
            </p>
          </FadeUp>

          {/* AEO — Answer block styled for LLM citation. The Salem, Windham,
              Derry figures mirror nhTownTaxData above to stay self-consistent. */}
          <FadeUp delay={0.3}>
            <div
              itemScope
              itemType="https://schema.org/Question"
              className="mt-10 max-w-3xl rounded-lg border p-6 md:p-7"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(181,83,44,0.22)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--accent)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                TL;DR · THE 30-SECOND ANSWER
              </p>
              <h2
                itemProp="name"
                className="font-display mt-2 text-xl font-semibold leading-snug text-[var(--text-primary)] md:text-2xl"
              >
                What is the property tax rate in Salem NH versus Windham and Derry?
              </h2>
              <div
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="mt-3"
              >
                <p
                  itemProp="text"
                  className="text-base leading-relaxed text-[var(--text-secondary)]"
                >
                  In Salem NH, the 2024 certified property tax rate is about $17.85
                  per $1,000 of assessed value. On a $500,000 home that is roughly
                  $8,925 per year. Windham sits higher at about $19.42 per $1,000
                  (roughly $9,710 on a $500K home), and Derry is the highest of the
                  three at about $26.18 per $1,000 (roughly $13,090 on a $500K home).
                  Full table for all eight Southern NH towns is below.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — CALCULATOR (DARK, forest green) */}
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
              INTERACTIVE CALCULATOR
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Plug in a home value. Pick a town. See the bill.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Optional: enter your current Massachusetts home value on the right
              to compare against a typical MA property tax bill.
            </p>
          </FadeUp>
          <div className="mt-10">
            <TaxCalcClient />
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPARISON TABLE (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              FULL COMPARISON
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              Annual property tax, all eight towns.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Sample bills at three common price points across the Karyn
              Emerson service area. Rows alternate for readability. Numbers set
              in JetBrains Mono for quick column scanning.
            </p>
          </FadeUp>
          <div className="mt-10">
            <TaxCalcTable />
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            [DEMO COPY - confirm 2025 NH muni data]. Mill rates shown are the
            most recent certified figures from the NH Department of Revenue
            Administration. Assessments reflect each town's current equalization
            ratio.
          </p>
        </div>
      </section>

      {/* SECTION 4 — EXEMPTIONS SIDEBAR (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              EXEMPTIONS & CREDITS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Seniors and veterans, what to ask for.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Every NH town offers an elderly exemption (amount varies by age
              bracket, with income and asset caps) and a veteran tax credit.
              Below are the typical figures. Each town's assessing office is
              the final word. Apply in the year you turn 65, not after.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nhTownTaxData.map((t, i) => (
              <FadeUp key={t.slug} delay={0.05 + i * 0.04}>
                <div
                  className="flex h-full flex-col rounded-lg border p-5"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {t.displayName}
                  </p>
                  <p
                    className="mt-3 text-xs uppercase tracking-wider"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Senior exemption
                  </p>
                  <p
                    className="font-mono text-lg font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {t.seniorExemption.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  {t.seniorExemption.ageCutoff ? (
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-on-dark-secondary)" }}
                    >
                      Age{" "}
                      <span className="font-mono">
                        {t.seniorExemption.ageCutoff}
                      </span>
                      +
                    </p>
                  ) : null}
                  <p
                    className="mt-4 text-xs uppercase tracking-wider"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Veteran credit
                  </p>
                  <p
                    className="font-mono text-lg font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {t.veteranExemption.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p
                    className="mt-3 text-xs leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {t.note}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p
            className="mt-6 text-xs"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            [DEMO COPY - confirm 2025 NH muni data]. Exemption amounts and age
            tiers vary by town and are adjusted by warrant vote. Always confirm
            current figures with the town assessing office.
          </p>
        </div>
      </section>

      {/* SECTION 5 — METHODOLOGY NOTE (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              METHODOLOGY
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              How these numbers are calculated.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
              <p>
                Annual property tax is computed as home value divided by 1,000,
                multiplied by the town mill rate. For a{" "}
                <span className="font-mono">$500,000</span> home in a town with
                a <span className="font-mono">20.00</span> mill rate, the
                estimated annual bill is{" "}
                <span className="font-mono">$10,000</span>. Monthly escrow is
                that number divided by twelve.
              </p>
              <p>
                Mill rates update annually after the NH Department of Revenue
                Administration certifies the equalization ratio for each town.
                Data on this page is current as of [DEMO COPY - confirm] 2024
                certified rates. Ask me for a live pull before you offer on a
                home.
              </p>
              <p>
                This calculator is a planning tool, not a commitment. Final
                property tax depends on your final assessed value, any
                exemptions you qualify for, and the next town meeting warrant.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 6 — CTA (DARK, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <BreathingOrb tone="forest" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              ONE MORE STEP
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Before you offer, let us run the real numbers.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              I will pull the current assessment, check your eligible
              exemptions, and walk you through the full annual cost of
              ownership. Fifteen minutes, zero pressure.
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
