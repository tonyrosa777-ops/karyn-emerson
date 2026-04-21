// =============================================================================
// /neighborhoods — index of Southern NH neighborhood guides
// OWNED BY: frontend-developer agent (Stage 1E Wave B2)
// Spec: design-system.md §5 (guide cards), §11 (service-area row), §6 (photography),
//       market-intelligence.md §5 gap #2, §9 "do" #3. CLAUDE.md Page Animation Rule
//       (ambient only, never full hero stack on interior pages).
// Treatment: PageBanner mosaic-7 (showpiece) + letter-mask H1 + magazine-spread
//            asymmetric town grid + TownMarquee ticker.
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { neighborhoods, getTowns, getSubNeighborhoods } from "@/data/neighborhoods";
import { PageBanner } from "@/components/sections/PageBanner";
import { TownMarquee } from "@/components/sections/motion/TownMarquee";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  placeSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Southern NH Neighborhood Guides | Karyn Emerson",
  description:
    "Town by town guides to Salem, Windham, Derry, Londonderry, Pelham, Atkinson, Hampstead, plus Tuscan Village, Cobbett's Pond, and Canobie Lake.",
  alternates: { canonical: "/neighborhoods" },
  openGraph: {
    title: "Southern NH Neighborhood Guides | Karyn Emerson",
    description:
      "Seven Southern New Hampshire towns and the sub-neighborhoods inside them. Mill rates, school districts, commute math, and the honest character of each place.",
    type: "website",
    url: "/neighborhoods",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Southern NH Neighborhood Guides · Karyn Emerson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Southern NH Neighborhood Guides | Karyn Emerson",
    description:
      "Seven Southern NH towns and the sub-neighborhoods inside them.",
    images: ["/og/default-og.jpg"],
  },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// -----------------------------------------------------------------------------
// Sub-neighborhood card (preserved — uniform treatment for secondary grid)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Magazine-spread town card — asymmetric feature/standard treatment
// -----------------------------------------------------------------------------
function TownSpreadCard({
  n,
  isFeature,
  isFirst,
}: {
  n: (typeof neighborhoods)[number];
  isFeature: boolean;
  isFirst: boolean;
}) {
  const colSpan = isFeature ? "lg:col-span-3" : "lg:col-span-2";
  const aspect = isFeature ? "aspect-[3/2]" : "aspect-[4/3]";
  const titleSize = isFeature ? "1.75rem" : "1.35rem";

  return (
    <Link
      href={`/neighborhoods/${n.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-lg ${colSpan} ${
        isFirst ? "emphasis-card" : ""
      }`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid rgba(47,74,58,0.08)",
      }}
    >
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={n.heroImage}
          alt={`${n.displayName}, ${n.state}`}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        {/* Fallback emoji layered beneath image in case of missing asset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center text-6xl opacity-30"
        >
          {n.fallbackEmoji}
        </div>

        {/* Slide-up overlay on hover — mill rate + median price */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-4 transition duration-500 group-hover:translate-y-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,31,28,0.92), rgba(26,31,28,0.72) 60%, transparent)",
          }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            Mill rate · Median price
          </p>
          <p
            className="font-body mt-1 text-sm"
            style={{ color: "var(--text-on-dark-primary)" }}
          >
            {n.milRate.toFixed(2)} · {currencyFormatter.format(n.medianHomePrice)}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--accent)" }}
        >
          {n.eyebrow}
        </p>
        <h3
          className="font-display mt-2 font-semibold leading-tight"
          style={{ fontSize: titleSize, color: "var(--text-primary)" }}
        >
          {n.displayName}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {n.tagline}
        </p>
        <span
          className="font-mono mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          Read the guide
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Southern NH neighborhood guides",
    url: absoluteUrl("/neighborhoods"),
    numberOfItems: neighborhoods.length,
    itemListElement: neighborhoods.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${n.displayName}, ${n.state}`,
      url: absoluteUrl(`/neighborhoods/${n.slug}`),
      item: placeSchema(n),
    })),
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Neighborhoods", href: "/neighborhoods" },
  ]);

  return (
    <div className="relative">
      <JsonLd data={[breadcrumb, itemListSchema]} />

      {/* Section 1 — Mosaic-7 photo banner (THE showpiece) */}
      <PageBanner
        mode="mosaic7"
        images={[
          {
            src: "/images/neighborhoods/salem-hero.jpg",
            alt: "Salem, NH — autumn foliage over historic town center",
          },
          {
            src: "/images/neighborhoods/windham-hero.jpg",
            alt: "Windham, NH — lake country",
          },
          {
            src: "/images/neighborhoods/derry-hero.jpg",
            alt: "Derry, NH — classic New England main street",
          },
          {
            src: "/images/neighborhoods/londonderry-hero.jpg",
            alt: "Londonderry, NH — rolling farmland",
          },
          {
            src: "/images/neighborhoods/pelham-hero.jpg",
            alt: "Pelham, NH — quiet country lane",
          },
          {
            src: "/images/neighborhoods/atkinson-hero.jpg",
            alt: "Atkinson, NH — autumn treeline",
          },
          {
            src: "/images/neighborhoods/hampstead-hero.jpg",
            alt: "Hampstead, NH — waterfront",
          },
        ]}
        eyebrow="SOUTHERN NH · 7 TOWNS"
        title={<>Pick your neighborhood.</>}
        titleMotion="letter-mask"
        subhead="Seven towns, each with its own character, mill rate, and price band. Plus sub-neighborhood deep-dives for the places buyers compare most often."
        height="lg"
        parallax
        textSide="left"
      />

      {/* Section 2 — Magazine-spread town grid (LIGHT, cream base) */}
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
                Karyn&apos;s full service area.
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--text-secondary)]">
                I grew up here, I sell here, and I have watched every one of
                these streets change over the last twenty years. Pick a town and
                read it like a letter from a neighbor, not a brochure.
              </p>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                Coming up from Methuen, Andover, or Lawrence and still deciding?
                Start with the{" "}
                <Link
                  href="/relocate"
                  className="underline decoration-[var(--accent)] underline-offset-[6px] hover:text-[var(--primary)]"
                >
                  MA to NH relocation hub
                </Link>
                {" "}
                and come back here.
              </p>
            </div>
          </div>

          {/* Asymmetric magazine-spread grid: every 3rd card is a feature (col-span-3), rest are standard (col-span-2). 6-column track on lg. */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {towns.map((n, i) => (
              <TownSpreadCard
                key={n.slug}
                n={n}
                isFeature={i % 3 === 0}
                isFirst={i === 0}
              />
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
              Tuscan Village, Cobbett&apos;s Pond, Canobie Lake, Woodmont
              Commons, and a few more. These guides go one layer deeper than the
              town pages because the town-level story is not specific enough
              when you are buying waterfront or downsizing into new construction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {subs.map((n) => (
              <NeighborhoodCard key={n.slug} n={n} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — TownMarquee ticker (LIGHT elevated — divider band before footer) */}
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
    </div>
  );
}
