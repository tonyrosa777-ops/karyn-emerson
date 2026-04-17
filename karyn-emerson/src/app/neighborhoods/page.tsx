// =============================================================================
// /neighborhoods — index of Southern NH neighborhood guides
// OWNED BY: frontend-developer agent (Stage 1E Wave B2)
// Spec: design-system.md §5 (guide cards), §11 (service-area row), §6 (photography),
//       market-intelligence.md §5 gap #2, §9 "do" #3. CLAUDE.md Page Animation Rule
//       (ambient only, never full hero stack on interior pages).
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { neighborhoods, getTowns, getSubNeighborhoods } from "@/data/neighborhoods";
import AmbientParticles from "@/components/sections/AmbientParticles";

export const metadata: Metadata = {
  title: "Southern NH Neighborhood Guides | Karyn Emerson",
  description:
    "Town-by-town guides to Salem, Windham, Derry, Londonderry, Pelham, Atkinson, and Hampstead, plus sub-neighborhoods like Tuscan Village, Cobbett's Pond, and Canobie Lake. Written for sellers and for MA-to-NH buyers deciding which town fits.",
  alternates: { canonical: "/neighborhoods" },
  openGraph: {
    title: "Southern NH Neighborhood Guides | Karyn Emerson",
    description:
      "Seven Southern New Hampshire towns and the sub-neighborhoods inside them. Mill rates, school districts, commute math, and the honest character of each place.",
    type: "website",
    url: "/neighborhoods",
  },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function NeighborhoodCard({
  n,
}: {
  n: (typeof neighborhoods)[number];
}) {
  return (
    <Link
      href={`/neighborhoods/${n.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-[var(--bg-elevated)] transition-shadow duration-300 hover:shadow-[0_18px_48px_-16px_rgba(26,31,28,0.18)]"
      style={{ borderColor: "rgba(47,74,58,0.12)" }}
    >
      {/* Hero image — bleeds to card top per design-system.md §5 */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(47,74,58,0.08) 0%, rgba(181,83,44,0.08) 100%)",
        }}
      >
        <Image
          src={n.heroImage}
          alt={`${n.displayName} neighborhood, Southern NH`}
          fill
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Fallback emoji layered beneath image in case of missing asset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center text-6xl opacity-30"
        >
          {n.fallbackEmoji}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <span
          className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em]"
          style={{ color: "var(--accent)" }}
        >
          {n.eyebrow}
        </span>
        <h3 className="font-display mt-2 text-[1.6rem] font-semibold leading-tight text-[var(--text-primary)]">
          {n.displayName}
        </h3>

        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.78rem] text-[var(--text-secondary)]">
          <div>
            <dt className="sr-only">Median price</dt>
            <dd>
              <span style={{ color: "var(--primary)" }}>Median </span>
              {currencyFormatter.format(n.medianHomePrice)}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Commute</dt>
            <dd>
              <span style={{ color: "var(--primary)" }}>Boston </span>
              {n.commuteToBoston.minutes} min
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
          {n.tagline}
        </p>

        <span
          className="font-mono mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          Read the guide
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function NeighborhoodsIndexPage() {
  const towns = getTowns();
  const subs = getSubNeighborhoods();

  return (
    <div className="relative">
      {/* Section 1 — Hero header (LIGHT) with ambient particles */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <AmbientParticles density="low" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <span
            className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Southern New Hampshire · Town by town
          </span>
          <h1 className="font-display hero-shimmer mt-4 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            Southern New Hampshire, town by town.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--text-secondary)]">
            Seven towns, and the neighborhoods inside them. I grew up here, I sell
            here, and I have watched every one of these streets change over the
            last twenty years. Pick a town and read it like a letter from a
            neighbor, not a brochure.
          </p>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--text-secondary)]">
            If you are coming up from Methuen, Andover, or Lawrence and still
            deciding which town fits, start with the{" "}
            <Link
              href="/relocate"
              className="underline decoration-[var(--accent)] underline-offset-[6px] hover:text-[var(--primary)]"
            >
              MA to NH relocation hub
            </Link>
            {" "}
            and then come back here.
          </p>
        </div>
      </section>

      {/* Section 2 — Towns grid (LIGHT, cream base) */}
      <section className="relative" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span
                className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                The Seven Towns
              </span>
              <h2 className="font-display mt-2 text-[clamp(1.75rem,3.25vw,2.5rem)] font-semibold leading-tight text-[var(--text-primary)]">
                Karyn's full service area.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {towns.map((n) => (
              <NeighborhoodCard key={n.slug} n={n} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Sub-neighborhoods grid (LIGHT, elevated surface for gentle divider) */}
      <section
        className="relative"
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid rgba(47,74,58,0.08)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mb-10">
            <span
              className="font-mono text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              Sub-neighborhood guides
            </span>
            <h2 className="font-display mt-2 text-[clamp(1.75rem,3.25vw,2.5rem)] font-semibold leading-tight text-[var(--text-primary)]">
              The pockets inside the towns.
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[var(--text-secondary)]">
              Tuscan Village, Cobbett's Pond, Canobie Lake, Woodmont Commons, and
              a few more. These guides go one layer deeper than the town pages
              because the town-level story is not specific enough when you are
              buying waterfront or downsizing into new construction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {subs.map((n) => (
              <NeighborhoodCard key={n.slug} n={n} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
