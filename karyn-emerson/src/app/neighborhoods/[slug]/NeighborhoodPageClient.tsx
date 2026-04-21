"use client";

// =============================================================================
// NeighborhoodPageClient.tsx — per-neighborhood detail client component
// OWNED BY: frontend-developer agent (Stage 1E Wave B2)
// Spec: design-system.md §5 + §11; CLAUDE.md Section Alternation Rule + Page Animation Rule.
//
// SECTION RHYTHM MAP (per CLAUDE.md Section Alternation Rule — MANDATORY):
//   1. Hero                    — LIGHT (bg-base)       — orientation / primary CTA
//   2. The Story               — DARK  (--primary)     — editorial / empathy
//   3. Highlights grid         — LIGHT (bg-base)       — education / specificity
//   4. Sample listings         — DARK  (--primary)     — social proof / inventory preview
//   5. Schools + commute       — LIGHT (bg-elevated)   — education / data
//   6. Booking CTA             — DARK  (--primary)     — conversion (final CTA)
//
// Adjacency check: 1L → 2D → 3L → 4D → 5L → 6D. No two adjacent sections share a tone.
// Zero em dashes in user-visible copy. All data read from /data/neighborhoods.ts.
// =============================================================================

import Link from "next/link";
import Image from "next/image";
import type { Neighborhood } from "@/data/neighborhoods";
import BreathingOrb from "@/components/sections/BreathingOrb";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface Props {
  neighborhood: Neighborhood;
}

export default function NeighborhoodPageClient({ neighborhood: n }: Props) {
  const keyStats = [
    {
      label: "Median home price",
      value: currencyFormatter.format(n.medianHomePrice),
    },
    {
      label: "Mill rate (NH property tax)",
      value: n.milRate.toFixed(2),
    },
    {
      label: "Commute to Boston",
      value: `${n.commuteToBoston.minutes} min · ${n.commuteToBoston.via}`,
    },
    {
      label: "School district",
      value: n.schoolDistrict,
    },
  ];

  // Split description into short paragraphs for Section 2 (splits on period + space).
  // This lightly expands the one-sentence-per-paragraph editorial cadence without
  // inventing sentences that are not in the data source.
  const storyParagraphs = n.description
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .filter(Boolean)
    .reduce<string[]>((acc, sentence, idx) => {
      // Group 1–2 sentences per paragraph for a 3–4 paragraph editorial rhythm.
      const bucket = Math.floor(idx / 2);
      acc[bucket] = (acc[bucket] ? acc[bucket] + " " : "") + sentence;
      return acc;
    }, []);

  return (
    <article className="relative">
      {/* ==========================================================
          SECTION 1 — Hero (LIGHT) — orientation + key stats + CTA
          ========================================================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div>
            <span
              className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              {n.eyebrow}
            </span>
            <h1 className="font-display mt-4 text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)]">
              {n.displayName}
            </h1>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
              {n.tagline}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:max-w-xl">
              {keyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47,74,58,0.12)",
                  }}
                >
                  <dt className="text-[0.72rem] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    {stat.label}
                  </dt>
                  <dd
                    className="font-mono mt-1.5 text-[0.95rem] font-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/booking#calendar"
                className="font-body inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-[var(--bg-base)] shadow-[0_10px_30px_-12px_rgba(47,74,58,0.45)] transition-all hover:-translate-y-px"
                style={{ background: "var(--primary)" }}
              >
                Book a conversation about {n.displayName}
              </Link>
              <Link
                href="/neighborhoods"
                className="font-body inline-flex items-center text-sm font-medium text-[var(--primary)] underline-offset-[6px] hover:underline"
              >
                All neighborhoods
              </Link>
            </div>
          </div>

          <div
            className="relative aspect-[4/3] overflow-hidden rounded-lg border shadow-[0_18px_48px_-20px_rgba(26,31,28,0.2)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(47,74,58,0.08) 0%, rgba(181,83,44,0.08) 100%)",
              borderColor: "rgba(47,74,58,0.12)",
            }}
          >
            <Image
              src={n.heroImage}
              alt={`${n.displayName}, ${n.state} neighborhood`}
              fill
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center text-6xl opacity-30"
            >
              {n.fallbackEmoji}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          SECTION 2 — The Story (DARK, --primary) — editorial paragraphs
          ========================================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--primary)",
          color: "var(--text-on-dark-primary)",
        }}
      >
        {/* Radial gradient overlay — dark sections must never look flat (CLAUDE.md) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <span
            className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "rgba(246,241,231,0.75)" }}
          >
            Living in {n.displayName}
          </span>
          <h2 className="font-display mt-3 text-[clamp(1.75rem,3.25vw,2.5rem)] font-semibold leading-tight">
            A neighbor's read on {n.displayName}.
          </h2>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.75]" style={{ color: "var(--text-on-dark-secondary)" }}>
            {storyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {/* [DEMO COPY — pending client review] */}
            <p>
              The best way to really feel out a town is a fifteen-minute call.
              Tell me what you are trying to do. I will tell you honestly whether{" "}
              {n.displayName} is the right fit or whether one of the other six
              towns in the service area gets you closer to the life you are
              trying to build.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================
          SECTION 3 — Highlights grid (LIGHT) — specificity
          ========================================================== */}
      <section className="relative" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mb-10">
            <span
              className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              What makes it itself
            </span>
            <h2 className="font-display mt-3 text-[clamp(1.75rem,3.25vw,2.5rem)] font-semibold leading-tight text-[var(--text-primary)]">
              What makes {n.displayName} itself.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {n.highlights.map((h, i) => {
              // Split the leading emoji + body. Highlights are formatted as
              // "EMOJI Label — body" but we use an en-dash (—) by convention only
              // on data files where it is invisible to users. Still, strip on first
              // hyphen for display. Use the string as-is if no dash.
              const match = h.match(/^(\p{Extended_Pictographic}+)\s+(.*)$/u);
              const emoji = match ? match[1] : "•";
              const rest = match ? match[2] : h;
              // Split "Label — body" into label + detail without using em dash in output
              const labelSplit = rest.split(/\s[—–-]\s/);
              const label = labelSplit[0];
              const detail = labelSplit.slice(1).join(". ");
              return (
                <li
                  key={i}
                  className="rounded-lg border p-6"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47,74,58,0.10)",
                  }}
                >
                  <div className="text-2xl" aria-hidden="true">
                    {emoji}
                  </div>
                  <p className="font-display mt-3 text-[1.15rem] font-semibold leading-snug text-[var(--text-primary)]">
                    {label}
                  </p>
                  {detail && (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                      {detail}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ==========================================================
          SECTION 4 — Sample listings (DARK, --primary)
          ========================================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--primary)",
          color: "var(--text-on-dark-primary)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(246,241,231,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span
                className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: "rgba(246,241,231,0.75)" }}
              >
                Recent homes
              </span>
              <h2 className="font-display mt-3 text-[clamp(1.75rem,3.25vw,2.5rem)] font-semibold leading-tight">
                Recent homes in {n.displayName}.
              </h2>
            </div>
            <span
              className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] rounded-full border px-3 py-1"
              style={{
                color: "var(--accent)",
                borderColor: "rgba(181,83,44,0.5)",
                background: "rgba(181,83,44,0.08)",
              }}
            >
              Recently moved · ask me for the live list
            </span>
          </div>

          {n.sampleListings && n.sampleListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {n.sampleListings.map((l, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-lg border"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div
                    className="aspect-[4/3] w-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(246,241,231,0.08) 0%, rgba(181,83,44,0.14) 100%)",
                    }}
                    aria-hidden="true"
                  >
                    <div className="flex h-full items-center justify-center text-5xl opacity-30">
                      {n.fallbackEmoji}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-[1.1rem] font-semibold">
                      {l.address}
                    </p>
                    <p
                      className="font-mono mt-2 text-[0.85rem]"
                      style={{ color: "var(--text-on-dark-secondary)" }}
                    >
                      {l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft
                    </p>
                    <p
                      className="font-mono mt-3 text-[1rem] font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {currencyFormatter.format(l.price)}
                    </p>
                    <span
                      className="font-mono mt-3 text-[0.65rem] font-medium uppercase tracking-[0.22em]"
                      style={{ color: "var(--text-on-dark-muted)" }}
                    >
                      Recently in the market {/* [DEMO COPY — representative sample from this area] */}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-on-dark-secondary)" }}>
              Live inventory is loading. Ask me what is coming up off-market.
            </p>
          )}

          <p
            className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            There is no search widget here because I am the search. Ask me
            what is coming up off-market. A lot of {n.displayName}&rsquo;s
            best homes never hit Zillow.
          </p>
        </div>
      </section>

      {/* ==========================================================
          SECTION 5 — Schools + commute detail (LIGHT, elevated surface)
          ========================================================== */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Schools */}
            <div>
              <span
                className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                Schools
              </span>
              <h2 className="font-display mt-3 text-[clamp(1.5rem,2.75vw,2rem)] font-semibold leading-tight text-[var(--text-primary)]">
                {n.schoolDistrict}
              </h2>
              <p className="mt-5 text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                Feeder lines and boundary-line questions matter more than the
                district name. If you are thinking about {n.displayName} for the
                schools, the first call is about which side of town you land on
                inside the district. I will walk you through it.
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--text-muted)]">
                {/* [DEMO COPY — district website link pending client confirmation] */}
                District website and official boundary maps: link pending client
                confirmation.
              </p>
            </div>

            {/* Commute */}
            <div>
              <span
                className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                Commute
              </span>
              <h2 className="font-display mt-3 text-[clamp(1.5rem,2.75vw,2rem)] font-semibold leading-tight text-[var(--text-primary)]">
                {n.commuteToBoston.minutes} minutes to Boston{" "}
                <span className="font-body text-[0.95rem] font-normal text-[var(--text-muted)]">
                  ({n.commuteToBoston.via})
                </span>
              </h2>
              <ul className="mt-5 space-y-3 text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                <li>
                  <strong className="font-mono text-[0.8rem] font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Boston
                  </strong>
                  <br />
                  {n.commuteToBoston.minutes} min via {n.commuteToBoston.via}.
                </li>
                <li>
                  <strong className="font-mono text-[0.8rem] font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Manchester
                  </strong>
                  <br />
                  Roughly 25 to 35 minutes via I-93 north. Manchester-Boston
                  Regional Airport is typically 20 to 30 minutes.
                </li>
                <li>
                  <strong className="font-mono text-[0.8rem] font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Portsmouth / Seacoast
                  </strong>
                  <br />
                  Typically 45 to 55 minutes via Route 101 east from I-93.
                </li>
                <li>
                  <strong className="font-mono text-[0.8rem] font-semibold uppercase tracking-wider text-[var(--primary)]">
                    Transit
                  </strong>
                  <br />
                  Park-and-ride commuter bus options out of Salem and Londonderry
                  to South Station. Schedule details confirmed on request.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          SECTION 6 — Booking CTA (DARK, --primary) — final conversion
          ========================================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--primary)",
          color: "var(--text-on-dark-primary)",
        }}
      >
        {/* Breathing orb — ambient motion per CLAUDE.md Page Animation Rule */}
        <BreathingOrb tone="forest" />

        <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-28 text-center">
          <span
            className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "rgba(246,241,231,0.75)" }}
          >
            Zero pressure. Fifteen minutes.
          </span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
            Want to know if {n.displayName} fits your life?
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            Pick a fifteen-minute slot. Tell me what you are trying to do. I
            will tell you whether {n.displayName} is the right answer, or point
            you toward the town that is.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking#calendar"
              className="font-body inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all hover:-translate-y-px"
              style={{
                background: "var(--bg-base)",
                color: "var(--primary)",
                boxShadow: "0 10px 30px -12px rgba(0,0,0,0.4)",
              }}
            >
              Book a 15-minute call
            </Link>
            <Link
              href="/quiz"
              className="font-body inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all hover:-translate-y-px"
              style={{
                borderColor: "rgba(246,241,231,0.5)",
                color: "var(--text-on-dark-primary)",
              }}
            >
              Take the market-timing quiz
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
