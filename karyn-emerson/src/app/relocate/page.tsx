import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageBanner } from "@/components/sections/PageBanner";
import RelocateTaxCalcClient from "@/components/sections/RelocateTaxCalcClient";
import { AuroraGradient } from "@/components/sections/motion/AuroraGradient";
import { TownMarquee } from "@/components/sections/motion/TownMarquee";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, realEstateAgentSchema } from "@/lib/schema";

// =============================================================================
// /relocate — MA to NH Relocation Hub (flagship SEO pillar).
// Closes market-intelligence.md §5 gap #1, §6 long-tail #1, §9 "do" #2.
// Sections: PageBanner / 30-second answer / MA vs NH comparison /
// tax-arbitrage calculator / commute grid / schools / DMV checklist /
// recommended towns cheatsheet / town marquee / CTA.
// Alternating light and dark tones; no two adjacent sections share tone.
// =============================================================================

export const metadata: Metadata = {
  title:
    "Moving from Massachusetts to Southern NH | MA to NH Relocation Guide",
  description:
    "Tax math, commute times by town, DMV checklist, and which Southern NH town fits. Karyn Emerson Real Estate, Jill & Co., Salem NH.",
  alternates: { canonical: "/relocate" },
  openGraph: {
    title:
      "Moving from Massachusetts to Southern NH | Karyn Emerson Real Estate",
    description:
      "The working MA to NH relocation guide, with the real numbers and a 15 minute call at the end.",
    type: "website",
    url: "/relocate",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "MA to NH Relocation · Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Moving from Massachusetts to Southern NH | Karyn Emerson Real Estate",
    description:
      "The working MA to NH relocation guide, with the real numbers and a 15 minute call at the end.",
    images: ["/og/default-og.jpg"],
  },
};

// MA vs NH side-by-side comparison rows.
// [DEMO COPY - figures rounded for editorial clarity].
const TAX_COMPARISON: Array<{ label: string; ma: string; nh: string }> = [
  { label: "State Income Tax", ma: "5%", nh: "0%" },
  { label: "State Sales Tax", ma: "6.25%", nh: "0%" },
  { label: "Capital Gains (State)", ma: "9%*", nh: "0%" },
  { label: "Estate Tax Floor", ma: "$2M", nh: "None" },
];

// Commute grid — 6 Southern NH towns x 3 destinations (Boston, Manchester, Portsmouth).
// [DEMO COPY - estimates]. Drive times are off-peak, single-car; transit notes
// reference the I-93 exit, MBTA Haverhill/Lawrence line, and Boston Express Bus.
const commuteRows: Array<{
  town: string;
  exit: string;
  boston: string;
  manchester: string;
  portsmouth: string;
  transit: string;
}> = [
  {
    town: "Salem",
    exit: "Exit 2",
    boston: "45 min",
    manchester: "25 min",
    portsmouth: "35 min",
    transit: "Exit 2 Park & Ride, Boston Express Bus",
  },
  {
    town: "Windham",
    exit: "Exit 3",
    boston: "50 min",
    manchester: "22 min",
    portsmouth: "40 min",
    transit: "Exit 3 Park & Ride, Boston Express Bus",
  },
  {
    town: "Derry",
    exit: "Exit 4",
    boston: "55 min",
    manchester: "18 min",
    portsmouth: "40 min",
    transit: "I-93 to I-495, MBTA Lawrence station ~20 min",
  },
  {
    town: "Londonderry",
    exit: "Exit 4 / 5",
    boston: "50 min",
    manchester: "12 min",
    portsmouth: "45 min",
    transit: "Exit 4 Park & Ride, Boston Express Bus",
  },
  {
    town: "Pelham",
    exit: "I-93 via Exit 2",
    boston: "50 min",
    manchester: "28 min",
    portsmouth: "45 min",
    transit: "Drive to Salem Exit 2 Park & Ride",
  },
  {
    town: "Atkinson",
    exit: "I-495 or Exit 3",
    boston: "50 min",
    manchester: "30 min",
    portsmouth: "35 min",
    transit: "MBTA Haverhill line ~15 min drive",
  },
];

// School comparison — [DEMO COPY - pending data pull].
const schoolRows: Array<{
  district: string;
  high: string;
  niche: string;
  note: string;
}> = [
  {
    district: "Windham SAU 95",
    high: "Windham HS",
    niche: "A",
    note: "Consistently in the top 10 NH public high schools by Niche rating. Small cohort, strong AP participation.",
  },
  {
    district: "Londonderry SAU 12",
    high: "Londonderry HS",
    niche: "A",
    note: "Large campus, strong STEM and athletics. Woodmont Commons families feed here.",
  },
  {
    district: "Salem SAU 57",
    high: "Salem HS",
    niche: "B+",
    note: "Comprehensive public high, growing vocational and performing arts programs.",
  },
];

// Recommended towns cheatsheet. Links go to /neighborhoods/[slug] which will
// be owned by Wave B2. If that route does not yet render content, the links
// are still valid in sitemap.ts (see: per-town neighborhood entries).
const townCheatsheet: Array<{
  profile: string;
  recommendation: string;
  slug: string;
  body: string;
}> = [
  {
    profile: "Top schools, premium budget",
    recommendation: "Windham",
    slug: "windham",
    body: "The highest median price in the service area, but also the strongest school ratings and a lake-country feel. If budget and schools are the top two, start here.",
  },
  {
    profile: "Shortest Boston commute",
    recommendation: "Salem",
    slug: "salem",
    body: "Exit 2, Park and Ride, and the Boston Express Bus. 45 minutes off-peak to downtown. Tuscan Village adds a single-level and townhouse inventory for downsizers.",
  },
  {
    profile: "Most house for the money",
    recommendation: "Derry",
    slug: "derry",
    body: "Higher mill rate, lower price per square foot. Pinkerton Academy is the public high. Hood Park and downtown Derry have new lifestyle inventory worth watching.",
  },
  {
    profile: "Best Manchester commute",
    recommendation: "Londonderry",
    slug: "londonderry",
    body: "Twelve minutes to Manchester, under an hour to Boston, and strong public schools. Woodmont Commons is the new-construction story.",
  },
  {
    profile: "Quiet, border town, strong resale",
    recommendation: "Pelham",
    slug: "pelham",
    body: "Route 38 corridor, a quieter feel than Salem, and consistent resale on ranches and single-level homes.",
  },
  {
    profile: "Lake life within an hour of Boston",
    recommendation: "Hampstead",
    slug: "hampstead",
    body: "Big Island Pond, Island Pond, and Wash Pond. Lake-adjacent inventory with a Timberlane Regional school feed.",
  },
];

export default function RelocatePage() {
  const schema = realEstateAgentSchema({
    path: "/relocate",
    description:
      "Karyn Emerson walks Massachusetts buyers through the tax math, commute math, DMV checklist, and town choice for a Southern NH move.",
  });
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "MA to NH Relocation", href: "/relocate" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, schema]} />

      {/* SECTION 1 — PAGE BANNER (single photo + shimmer H1 + MA → NH eyebrow) */}
      <PageBanner
        mode="single"
        images={[
          {
            src: "/images/about/about-landscape-1.jpg",
            alt: "Southern NH landscape — the destination side of the border",
          },
        ]}
        eyebrow="MA → NH · RELOCATION HUB"
        title={<>Moving to Southern NH.</>}
        titleMotion="shimmer"
        subhead="Tax arbitrage math, DMV checklist, commute by town, and school comparison. The honest version of what relocating actually involves."
        height="md"
        parallax
        ambient="embers"
      />

      {/* SECTION 1.5 — 30-SECOND TL;DR ANSWER (LIGHT) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 pt-20 md:pb-20 md:pt-24 lg:px-8">
          {/* AEO — LLM citation block. Concrete math, answer-first. */}
          <FadeUp>
            <div
              itemScope
              itemType="https://schema.org/Question"
              className="rounded-lg border p-6 md:p-7"
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
                Is it worth moving from Massachusetts to New Hampshire for the taxes?
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
                  Moving from Massachusetts to New Hampshire typically saves a
                  $200,000 household around $10,000 per year on state income tax
                  (MA charges a flat 5 percent, NH charges zero on wages), minus
                  roughly $3,000 to $5,000 per year in higher NH property tax on
                  a comparable Southern NH home, netting about $5,000 to $7,000
                  in year one. Salem, Windham, and Derry are the three most
                  popular MA to NH destinations. The honest math, plus the commuter
                  tax trap that catches Boston commuters, is below.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — MA vs NH SIDE-BY-SIDE COMPARISON (LIGHT) */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p
            className="font-mono text-xs uppercase tracking-[0.22em] text-center"
            style={{ color: "var(--accent)" }}
          >
            The math, laid out
          </p>
          <h2
            className="mt-3 font-display text-h2 font-semibold text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Massachusetts versus New Hampshire.
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-6 md:gap-12">
            {/* MA column */}
            <div className="text-center md:text-left">
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-muted)" }}
              >
                Massachusetts
              </p>
              {TAX_COMPARISON.map((row) => (
                <div key={`ma-${row.label}`} className="mt-10">
                  <p
                    className="font-body text-sm uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {row.label}
                  </p>
                  <p
                    className="mt-2 font-display font-semibold"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                      color: "var(--text-primary)",
                    }}
                  >
                    {row.ma}
                  </p>
                </div>
              ))}
            </div>

            {/* NH column — highlighted */}
            <div
              className="text-center md:text-right relative p-6 rounded-lg"
              style={{ background: "rgba(181,83,44,0.04)" }}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                New Hampshire
              </p>
              {TAX_COMPARISON.map((row) => (
                <div key={`nh-${row.label}`} className="mt-10">
                  <p
                    className="font-body text-sm uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {row.label}
                  </p>
                  <p
                    className="mt-2 font-display font-semibold"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                      color: "var(--primary)",
                    }}
                  >
                    {row.nh}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p
            className="mt-10 text-center text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            * MA charges an additional 4% surtax on taxable income above $1M
            (the "millionaire tax"), bringing the effective top rate to 9% on
            long-term capital gains. [DEMO COPY - figures rounded for editorial clarity].
          </p>
        </div>
      </section>

      {/* SECTION 3 — 30-SECOND ANSWER NARRATIVE (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <AuroraGradient tone="sage" intensity="subtle" />
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
              THE 30-SECOND ANSWER
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Why families move up I-93 every spring.
            </h2>
          </FadeUp>
          <div
            className="mt-6 space-y-5 text-base leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            <p>
              Massachusetts charges a flat{" "}
              <span className="font-mono">5%</span> state income tax on wages
              and a <span className="font-mono">6.25%</span> sales tax on most
              goods. New Hampshire charges neither. A typical dual-income
              household making{" "}
              <span className="font-mono">$180,000</span> to{" "}
              <span className="font-mono">$220,000</span> keeps roughly{" "}
              <span className="font-mono">$9,000</span> to{" "}
              <span className="font-mono">$11,000</span> more per year just by
              crossing the state line, before property tax even enters the
              conversation. [DEMO COPY - estimates].
            </p>
            <p>
              The catch: if you still work in MA, MA income tax still applies
              to the wages you earn there. That is the commuter-tax trap. And
              NH property taxes run higher per dollar of home value than MA
              averages in many towns, so the net savings depend on town
              selection. The calculator below runs the math for you. Play with
              it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TAX-ARBITRAGE CALCULATOR (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              TAX ARBITRAGE CALCULATOR
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              Run your own MA to NH numbers.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Two inputs, immediate math. Pick a target NH town to see how the
              property tax delta plays against the income and sales tax savings.
            </p>
          </FadeUp>
          <div className="mt-10">
            <RelocateTaxCalcClient />
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMMUTE TIME GRID (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <AuroraGradient tone="sage" intensity="subtle" />
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
              COMMUTE, BY TOWN
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Six towns, three destinations, honest minutes.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Off-peak driving times. Transit column notes the I-93 exit, the
              Park and Ride, and the MBTA Haverhill and Lawrence lines where
              they are realistic options. [DEMO COPY - estimates].
            </p>
          </FadeUp>

          <div
            className="mt-10 overflow-x-auto rounded-lg border"
            style={{
              background: "var(--card-on-dark-bg)",
              borderColor: "var(--card-on-dark-border)",
            }}
          >
            <table className="w-full text-left">
              <caption className="sr-only">
                Commute times from Southern NH towns to Boston, Manchester, and
                Portsmouth.
              </caption>
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--card-on-dark-border)" }}
                >
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Town
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Exit
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Boston
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Manchester
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Portsmouth
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Transit option
                  </th>
                </tr>
              </thead>
              <tbody>
                {commuteRows.map((row, idx) => (
                  <tr
                    key={row.town}
                    style={{
                      background:
                        idx % 2 === 0
                          ? "rgba(246,241,231,0.02)"
                          : "rgba(246,241,231,0.06)",
                    }}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-display text-base font-semibold"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {row.town}
                    </th>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {row.exit}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {row.boston}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {row.manchester}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {row.portsmouth}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--text-on-dark-secondary)" }}
                    >
                      {row.transit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SCHOOL COMPARISON (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              SCHOOLS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              Windham, Londonderry, Salem at a glance.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              High-level comparison of the three school districts MA relocators
              ask about most. Niche ratings are a starting point, not a
              conclusion. Ask me which feeder pattern fits your street. [DEMO
              COPY - pending data pull].
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {schoolRows.map((row, i) => (
              <FadeUp key={row.district} delay={0.05 + i * 0.05}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(47, 74, 58, 0.1)",
                  }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                    {row.district}
                  </p>
                  <h3 className="mt-2 font-display text-h3 font-semibold text-[var(--text-primary)]">
                    {row.high}
                  </h3>
                  <p className="font-mono mt-2 text-sm text-[var(--text-muted)]">
                    Niche grade{" "}
                    <span className="font-semibold text-[var(--primary)]">
                      {row.niche}
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {row.note}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — DMV / REGISTRATION / INSPECTION CHECKLIST (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <AuroraGradient tone="sage" intensity="subtle" />
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
              AFTER YOU CLOSE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              DMV, registration, inspection, taxes.
            </h2>
          </FadeUp>
          <ol
            className="mt-8 space-y-4"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            {[
              {
                k: "Establish NH residency.",
                v: "Your new deed and utility bills do most of the work here. The date you close is usually the date residency begins.",
              },
              {
                k: "Get your NH driver's license within 60 days.",
                v: "Visit a NH DMV office with proof of residency, your MA license, and a second form of ID. Walk-in and appointment options at Concord, Manchester, Derry, and Salem locations.",
              },
              {
                k: "Register vehicles within 60 days of establishing residency.",
                v: "Two-step in NH: town clerk first for the municipal portion, then DMV for plates and title. Bring your title or lienholder information, proof of residency, and odometer reading.",
              },
              {
                k: "Pass the NH annual state inspection.",
                v: "Every NH-registered vehicle needs an annual safety inspection. Most local shops do it in 30 minutes. Inspection sticker shows the expiration month.",
              },
              {
                k: "Surrender your MA plates and cancel MA registration.",
                v: "File the cancellation with the MA RMV so you are not billed for the next MA excise tax cycle. Keep the receipt.",
              },
              {
                k: "Update voter registration.",
                v: "NH registers voters through the town clerk. Bring proof of residency. Same-day voter registration is available in NH.",
              },
              {
                k: "Watch the commuter-tax trap.",
                v: "If you still work in MA, MA income tax still applies to those wages. NH does not credit it back. Plan your withholdings accordingly. (Source: milestonefinancialplanning.com, referenced in market-intelligence.md §6.)",
              },
              {
                k: "Set up property tax escrow.",
                v: "NH property tax is billed twice a year, typically July and December. Your lender's escrow should smooth this into monthly. Always confirm the first year is estimated, and watch for a balloon bill in the second year.",
              },
              {
                k: "Update your homeowners insurance.",
                v: "NH underwriting differs from MA on flood, wind, and well coverage. Send the new policy to your lender before closing.",
              },
              {
                k: "File your final MA resident return next April.",
                v: "The year you move, MA treats you as a part-year resident. NH has no state return to file. Your tax preparer handles the switch; bring both addresses and the move date.",
              },
            ].map((step, idx) => (
              <FadeUp key={step.k} delay={0.05 + idx * 0.03}>
                <li className="flex gap-4">
                  <span
                    className="font-mono text-sm font-semibold"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className="font-display text-h4 font-semibold"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {step.k}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{step.v}</p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 8 — RECOMMENDED TOWNS CHEATSHEET (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              WHERE TO LOOK
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              Start with the profile, not the ZIP code.
            </h2>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {townCheatsheet.map((t, i) => (
              <FadeUp key={t.slug} delay={0.05 + i * 0.05}>
                <Link
                  href={`/neighborhoods/${t.slug}`}
                  className="group flex h-full flex-col rounded-lg border p-6 transition hover:-translate-y-[2px]"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47, 74, 58, 0.08)",
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    {t.profile}
                  </p>
                  <h3 className="mt-3 font-display text-h3 font-semibold text-[var(--text-primary)]">
                    If you want this, look at {t.recommendation}.
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {t.body}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold transition group-hover:gap-3"
                    style={{ color: "var(--primary)" }}
                  >
                    See the neighborhood guide
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — TOWN MARQUEE (LIGHT, thin band) */}
      <section
        className="relative py-8"
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid rgba(47,74,58,0.08)",
          borderBottom: "1px solid rgba(47,74,58,0.08)",
        }}
      >
        <TownMarquee duration={60} tone="muted" />
      </section>

      {/* SECTION 10 — CTA (DARK, forest green, aurora depth) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <AuroraGradient tone="sage" intensity="subtle" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              START WITH A 15-MINUTE CALL
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Tell me your MA ZIP and your ideal NH commute.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              I will run your actual numbers against two or three Southern NH
              towns and tell you which one I would move my own family to, if it
              were my family.
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
