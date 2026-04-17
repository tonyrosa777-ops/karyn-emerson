import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";

// =============================================================================
// /listings — IDX integration placeholder.
// The real platform selection (iHomeFinder vs. Showcase IDX) is pending
// confirmation with Jill & Co. Until then, this page ships as a clear
// placeholder with 3-4 sample listing cards and a top banner.
// Sample listings are [DEMO COPY - pending IDX feed]. If Wave B2 lands a
// neighborhoods.ts with sampleListings later, import from there and remove
// the inline fallback below.
// =============================================================================

export const metadata: Metadata = {
  title:
    "Featured Southern NH Listings | Karyn Emerson Real Estate",
  description:
    "Live IDX search is coming. In the meantime, here is what is moving across Salem, Windham, Derry, and Londonderry.",
  alternates: { canonical: "/listings" },
  openGraph: {
    title: "Featured Southern NH Listings | Karyn Emerson Real Estate",
    description:
      "IDX platform pending. Sample of what is moving in Southern NH.",
    type: "website",
    url: "/listings",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Featured Southern NH Listings — Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Southern NH Listings | Karyn Emerson Real Estate",
    description:
      "IDX platform pending. Sample of what is moving in Southern NH.",
    images: ["/og/default-og.svg"],
  },
};

// Inline fallback sample listings. [DEMO COPY - pending IDX feed].
const sampleListings: Array<{
  slug: string;
  town: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  status: "active" | "under-contract" | "coming-soon";
}> = [
  {
    slug: "windham-cape-48-birch",
    town: "Windham",
    address: "48 Birch Road, Windham NH",
    price: 789_000,
    beds: 4,
    baths: 3,
    sqft: 2_640,
    description:
      "Cape on a quiet cul-de-sac near the Windham HS feeder. Wide-plank floors, renovated kitchen, stone patio and fire pit, full walk-out basement.",
    status: "active",
  },
  {
    slug: "salem-ranch-12-cobbetts",
    town: "Salem",
    address: "12 Cobbetts Pond Road, Salem NH",
    price: 615_000,
    beds: 3,
    baths: 2,
    sqft: 1_780,
    description:
      "Single-level ranch steps from Cobbett's Pond. Updated mechanicals, detached two-car garage, four-season sunroom overlooking the lake path.",
    status: "active",
  },
  {
    slug: "derry-colonial-212-hampstead",
    town: "Derry",
    address: "212 Hampstead Road, Derry NH",
    price: 499_000,
    beds: 4,
    baths: 2.5,
    sqft: 2_210,
    description:
      "Classic Derry colonial with Pinkerton Academy frontage. Original built-ins, formal dining, three-car driveway, mature perennial gardens.",
    status: "under-contract",
  },
  {
    slug: "londonderry-newer-33-woodmont",
    town: "Londonderry",
    address: "33 Woodmont Way, Londonderry NH",
    price: 725_000,
    beds: 4,
    baths: 3,
    sqft: 2_980,
    description:
      "Newer construction in the Woodmont Commons district. Open plan, primary on first floor, smart-home prewired, walk to the trail network.",
    status: "coming-soon",
  },
];

function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatSqft(n: number): string {
  return n.toLocaleString("en-US");
}

function statusLabel(s: "active" | "under-contract" | "coming-soon"): string {
  if (s === "active") return "Active";
  if (s === "under-contract") return "Under Contract";
  return "Coming Soon";
}

export default function ListingsPage() {
  return (
    <>
      {/* IDX platform banner - always visible at the top of the page. */}
      <div
        className="w-full px-6 py-3 text-center"
        style={{
          background: "var(--accent)",
          color: "var(--bg-base)",
        }}
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
          IDX platform TBD pending Jill &amp; Co. confirmation. iHomeFinder vs.
          Showcase IDX.
        </p>
      </div>

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
              FEATURED LISTINGS · SOUTHERN NH
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              What is moving in Southern NH right now.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Live IDX search is coming once the platform selection finalizes.
              In the meantime, here is a read on what is active, what just went
              under contract, and what is coming soon across the service area.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — PLACEHOLDER TILE (DARK, forest green) */}
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
              Live search via IDX is coming post-launch.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Until the IDX feed is wired in, I run private searches by hand
              against the MLS the day a property hits. Send me the town, the
              budget, and the must-haves, and you will see relevant listings
              before Zillow publishes them.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3 — SAMPLE LISTINGS (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              A READ ON THE MARKET
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 max-w-2xl font-semibold text-[var(--text-primary)]">
              Four homes, four Southern NH towns.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              These four properties are representative of what is moving right
              now across the service area. [DEMO COPY - pending IDX feed].
              Ask me for the live list.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
            {sampleListings.map((listing, i) => (
              <FadeUp key={listing.slug} delay={0.05 + i * 0.05}>
                <article
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(47, 74, 58, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      {listing.town}, NH
                    </p>
                    <span
                      className="font-mono rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                      style={{
                        borderColor:
                          listing.status === "active"
                            ? "rgba(47, 74, 58, 0.25)"
                            : "rgba(181, 83, 44, 0.35)",
                        color:
                          listing.status === "active"
                            ? "var(--primary)"
                            : "var(--accent)",
                      }}
                    >
                      {statusLabel(listing.status)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-h3 font-semibold text-[var(--text-primary)]">
                    {listing.address}
                  </h3>
                  <p className="font-mono mt-2 text-xl font-semibold text-[var(--primary)]">
                    {formatUSD(listing.price)}
                  </p>
                  <p className="font-mono mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    <span>{listing.beds} bed</span>
                    <span className="px-2">·</span>
                    <span>{listing.baths} bath</span>
                    <span className="px-2">·</span>
                    <span>{formatSqft(listing.sqft)} sqft</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {listing.description}
                  </p>
                  <div className="mt-6 flex gap-3">
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center rounded-full px-5 py-2 font-body text-xs font-semibold uppercase tracking-wide transition"
                      style={{
                        background: "var(--primary)",
                        color: "var(--bg-base)",
                      }}
                    >
                      Ask About This Home
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA (DARK, forest green, breathing orb) */}
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
              WANT THE FULL LIST
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              I will set up a private search for you.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Book a fifteen-minute call. Tell me {siteConfig.location.serviceArea[0]}, Windham, Derry, or
              anywhere in the service area, the budget, and the must-haves. I
              will wire up a live alert the same afternoon.
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
                href="/buy"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--bg-base)",
                  color: "var(--bg-base)",
                }}
              >
                What Buying Looks Like
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
