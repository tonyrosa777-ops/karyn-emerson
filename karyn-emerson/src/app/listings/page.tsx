import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { PageBanner } from "@/components/sections/PageBanner";
import { AuroraGradient } from "@/components/sections/motion/AuroraGradient";

// =============================================================================
// /listings — "The shortlist method" page.
// Strategic decision (see .planning/idx-decision.md): karynemerson.com does
// NOT offer consumer IDX. Rationale: every self-serve search widget would
// either route leads to the Jill & Co. Chime pool or cost $50-100/mo for an
// independent vendor. Frame 1 play: position hand-curated shortlists as
// superior to searching yourself. Premium positioning, 100% lead ownership,
// every inquiry goes to Karyn's Calendly. Zero IDX infrastructure.
// =============================================================================

export const metadata: Metadata = {
  title:
    "Southern NH Home Search, Done Differently | Karyn Emerson Real Estate",
  description:
    "No search widget. I hand-pull shortlists from the MLS for your exact criteria, including off-market and coming-soon homes Zillow does not publish. Send me the town, the budget, the must-haves.",
  alternates: { canonical: "/listings" },
  openGraph: {
    title: "Southern NH Home Search, Done Differently | Karyn Emerson Real Estate",
    description:
      "Hand-pulled shortlists beat 1,500-result scroll. Off-market and coming-soon homes Zillow does not publish.",
    type: "website",
    url: "/listings",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Southern NH Home Search, Done Differently · Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Southern NH Home Search, Done Differently | Karyn Emerson Real Estate",
    description:
      "Hand-pulled shortlists beat 1,500-result scroll. Off-market and coming-soon included.",
    images: ["/og/default-og.jpg"],
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
  image: string;
  imageAlt: string;
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
    image: "/images/neighborhoods/windham-hero.jpg",
    imageAlt: "Windham, NH residential street in autumn light",
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
    image: "/images/neighborhoods/cobbetts-pond-hero.jpg",
    imageAlt: "Cobbett's Pond, Salem NH — lake and shoreline path",
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
    image: "/images/neighborhoods/derry-hero.jpg",
    imageAlt: "Derry, NH classic New England colonial neighborhood",
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
    image: "/images/neighborhoods/woodmont-commons-hero.jpg",
    imageAlt: "Woodmont Commons, Londonderry NH — newer construction district",
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
      {/* SECTION 1 — HERO BANNER (mosaic3 + ink-bloom H1) */}
      <PageBanner
        mode="mosaic3"
        images={[
          {
            src: "/images/neighborhoods/canobie-lake-hero.jpg",
            alt: "Canobie Lake, Salem NH — autumn reflection",
          },
          {
            src: "/images/neighborhoods/shadow-lake-hero.jpg",
            alt: "Shadow Lake, Hampstead NH — morning light",
          },
          {
            src: "/images/neighborhoods/tuscan-village-hero.jpg",
            alt: "Tuscan Village, Salem NH — modern colonial",
          },
        ]}
        eyebrow="THE SHORTLIST METHOD"
        title={`A handful of right fits.`}
        titleMotion="ink-bloom"
        titleAccentWord="right"
        subhead="Not a scraped MLS portal. A curated shortlist of Southern NH homes chosen for buyers Karyn is already working with, plus a few open-door showings each month."
        height="md"
        parallax
      />

      {/* SECTION 2 — HOW IT WORKS (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p
              className="text-center font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              How it actually works
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="mt-3 text-center font-display text-h2 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Faster than searching yourself. And it is free.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                emoji: "✍️",
                title: "You send the criteria",
                body:
                  "Town or towns, budget range, bedrooms, must-haves, absolute no-gos. A text, an email, or a 15-minute call. Whatever is easier.",
              },
              {
                step: "02",
                emoji: "🔍",
                title: "I pull the shortlist",
                body:
                  "MLS the day a property hits, coming-soons, pocket listings, and the off-market homes agents are quietly shopping around. You get 5 to 10 homes that actually fit. Not 1,500.",
              },
              {
                step: "03",
                emoji: "🗝️",
                title: "We tour the real ones",
                body:
                  "You pick two or three you want to see in person. I schedule the showings, I drive, I read the room. No pressure. No lowball push. Just the honest read on each house.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-lg border p-6"
                style={{
                  background: "var(--card-on-dark-bg)",
                  borderColor: "var(--card-on-dark-border)",
                }}
              >
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  Step {s.step}
                </p>
                <div className="mt-3 text-3xl">{s.emoji}</div>
                <h3
                  className="mt-3 font-display text-h4 font-semibold"
                  style={{ color: "var(--text-on-dark-primary)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-on-dark-secondary)" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center rounded-full bg-[var(--accent)] px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[var(--bg-base)] shadow-[0_10px_30px_-10px_rgba(181,83,44,0.5)] transition hover:-translate-y-[1px] hover:bg-[var(--bg-base)] hover:text-[var(--primary)]"
              >
                Book a 15-minute call
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3 — MAGAZINE-SPREAD LISTINGS (LIGHT, sage aurora) */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <AuroraGradient tone="sage" intensity="subtle" />
        <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl md:mb-20">
            <FadeUp>
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                A READ ON THE MARKET
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 font-display text-h2 font-semibold text-[var(--text-primary)]">
                Four homes, four Southern NH towns.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                A small sample of what is moving in the service area right now.
                Nothing you will find on Zillow the same way. Ask me for the
                current shortlist for your town and budget, and we will build
                one together that actually fits.
                {/* [DEMO COPY — pending client review on the exact four homes to feature] */}
              </p>
            </FadeUp>
          </div>

          <div className="space-y-20 md:space-y-28">
            {sampleListings.map((listing, i) => {
              const isImageLeft = i % 2 === 0;
              return (
                <FadeUp key={listing.slug} delay={0.05}>
                  <article className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                    <div
                      className={`relative aspect-[3/2] overflow-hidden rounded-lg ${
                        isImageLeft ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <Image
                        src={listing.image}
                        alt={listing.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`${
                        isImageLeft ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <p
                        className="font-mono text-[11px] uppercase tracking-[0.22em]"
                        style={{ color: "var(--accent)" }}
                      >
                        {statusLabel(listing.status)} · {listing.town}, NH
                      </p>
                      <h3
                        className="mt-3 font-display font-semibold"
                        style={{
                          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                          lineHeight: 1.15,
                          color: "var(--text-primary)",
                        }}
                      >
                        {listing.address}
                      </h3>
                      <p
                        className="mt-3 font-mono font-semibold"
                        style={{
                          fontSize: "1.15rem",
                          color: "var(--primary)",
                        }}
                      >
                        {formatUSD(listing.price)}
                      </p>
                      <p
                        className="mt-2 font-mono text-xs uppercase tracking-[0.14em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span>{listing.beds} bed</span>
                        <span className="px-2">·</span>
                        <span>{listing.baths} bath</span>
                        <span className="px-2">·</span>
                        <span>{formatSqft(listing.sqft)} sqft</span>
                      </p>
                      <p
                        className="mt-4 font-display italic"
                        style={{
                          fontSize: "1.05rem",
                          lineHeight: 1.55,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {listing.description}
                      </p>
                      <Link
                        href="/booking"
                        className="mt-6 inline-flex items-center font-mono text-[12px] uppercase tracking-[0.14em]"
                        style={{ color: "var(--primary)" }}
                      >
                        Ask about this home →
                      </Link>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
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
