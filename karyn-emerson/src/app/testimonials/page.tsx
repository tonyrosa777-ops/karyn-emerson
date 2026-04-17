import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/data/site";
import type { Testimonial } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { TestimonialsFilterChips } from "@/components/sections/TestimonialsFilterChips";

export const metadata: Metadata = {
  title: "Client Testimonials | Karyn Emerson Real Estate",
  description:
    "Thirty six unfiltered testimonials from Southern NH sellers, buyers, downsizers, and Massachusetts relocators. Salem, Windham, Derry, Londonderry and more.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials | Karyn Emerson Real Estate",
    description:
      "Thirty six unfiltered testimonials from Southern NH sellers and buyers.",
    type: "website",
    url: "/testimonials",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Client Testimonials — Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials | Karyn Emerson Real Estate",
    description:
      "Thirty six unfiltered testimonials from Southern NH sellers and buyers.",
    images: ["/og/default-og.jpg"],
  },
};

// 9 per page is mandated by CLAUDE.md Testimonials Page rule (3-col x 3-row grid).
const PER_PAGE = 9;

type FilterValue = "all" | "selling" | "buying" | "relocating" | "downsizing";

interface PageProps {
  searchParams: Promise<{ page?: string; filter?: string }>;
}

function parsePage(raw: string | undefined, total: number): number {
  const n = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, total);
}

function parseFilter(raw: string | undefined): FilterValue {
  if (
    raw === "selling" ||
    raw === "buying" ||
    raw === "relocating" ||
    raw === "downsizing"
  ) {
    return raw;
  }
  return "all";
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      className="font-mono text-xs uppercase tracking-[0.22em]"
      style={{ color: "var(--accent)" }}
    >
      {"★".repeat(rating)}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className="flex h-full flex-col rounded-lg border p-6 transition hover:translate-y-[-2px] md:p-8"
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(47, 74, 58, 0.1)",
      }}
    >
      <StarRow rating={t.rating} />
      <blockquote className="mt-4 flex-1 font-body text-base leading-relaxed text-[var(--text-primary)]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5">
        <p className="font-display text-h4 font-semibold text-[var(--text-primary)]">
          {t.name}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
          {t.location} · {t.serviceType}
        </p>
      </figcaption>
    </figure>
  );
}

export default async function TestimonialsPage({ searchParams }: PageProps) {
  const { page: pageRaw, filter: filterRaw } = await searchParams;
  const filter = parseFilter(filterRaw);
  const all = siteConfig.testimonials;

  const filtered: Testimonial[] =
    filter === "all" ? all : all.filter((t) => t.serviceType === filter);

  // Defensive: handle 0-length and non-36 cases per spec
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = parsePage(pageRaw, totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  // Featured quote always from the full 36 list (first testimonial).
  const featured = all[0];

  // Build pagination hrefs preserving filter.
  const buildPageHref = (p: number) => {
    const params = new URLSearchParams();
    if (filter !== "all") params.set("filter", filter);
    if (p > 1) params.set("page", String(p));
    const q = params.toString();
    return q ? `/testimonials?${q}` : "/testimonials";
  };

  // Schema.org Review markup for SEO (aggregate 5-star from 36 reviews).
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.businessName,
    url: `https://${siteConfig.domain}/testimonials`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: all.length,
      bestRating: "5",
      worstRating: "5",
    },
    review: all.slice(0, 10).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* SECTION 1 — HERO: FEATURED QUOTE (LIGHT, shimmer + ambient) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="absolute inset-0 z-0">
          <AmbientParticles density="low" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              THIRTY-SIX UNFILTERED STORIES
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              In their own words.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <figure className="mt-10">
              <StarRow rating={featured.rating} />
              {/* Drop-cap on first letter — design-system.md §5 */}
              <blockquote className="mt-4 font-display text-h2 font-medium leading-relaxed text-[var(--text-primary)]">
                <span
                  className="float-left mr-3 mt-1 font-display font-semibold leading-none"
                  style={{
                    fontSize: "3.5rem",
                    color: "var(--accent)",
                  }}
                  aria-hidden="true"
                >
                  {featured.quote.charAt(0)}
                </span>
                {featured.quote.slice(1)}
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                {featured.name} · {featured.location}
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — FILTER + GRID (DARK) */}
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
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-20 lg:px-8">
          <FadeUp>
            <div className="text-center">
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                FILTER BY SERVICE
              </p>
              <h2
                className="font-display text-h3 mt-3 font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                {filter === "all"
                  ? `${filtered.length} stories across four categories`
                  : `${filtered.length} ${filter} stories`}
              </h2>
            </div>
          </FadeUp>

          <div className="mt-8">
            <Suspense fallback={null}>
              <TestimonialsFilterChips />
            </Suspense>
          </div>

          {pageItems.length === 0 ? (
            <FadeUp>
              <p
                className="mt-16 text-center text-base"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                No testimonials match that filter yet.
              </p>
            </FadeUp>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((t, i) => (
                <FadeUp
                  key={`${t.name}-${start + i}`}
                  delay={0.05 + (i % 3) * 0.05}
                >
                  <TestimonialCard t={t} />
                </FadeUp>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Testimonials pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {page > 1 && (
                <Link
                  href={buildPageHref(page - 1)}
                  scroll={false}
                  className="rounded-full border px-4 py-2 font-body text-sm font-medium transition"
                  style={{
                    borderColor: "var(--card-on-dark-border)",
                    color: "var(--text-on-dark-primary)",
                  }}
                >
                  ← Previous
                </Link>
              )}
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const active = p === page;
                return (
                  <Link
                    key={p}
                    href={buildPageHref(p)}
                    scroll={false}
                    aria-current={active ? "page" : undefined}
                    className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border px-3 font-body text-sm font-semibold transition"
                    style={{
                      background: active
                        ? "var(--bg-base)"
                        : "var(--card-on-dark-bg)",
                      color: active
                        ? "var(--primary)"
                        : "var(--text-on-dark-primary)",
                      borderColor: active
                        ? "var(--bg-base)"
                        : "var(--card-on-dark-border)",
                    }}
                  >
                    {p}
                  </Link>
                );
              })}
              {page < totalPages && (
                <Link
                  href={buildPageHref(page + 1)}
                  scroll={false}
                  className="rounded-full border px-4 py-2 font-body text-sm font-medium transition"
                  style={{
                    borderColor: "var(--card-on-dark-border)",
                    color: "var(--text-on-dark-primary)",
                  }}
                >
                  Next →
                </Link>
              )}
            </nav>
          )}

          <FadeUp>
            <p
              className="mt-6 text-center font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--text-on-dark-muted)" }}
            >
              Page {page} of {totalPages} · {filtered.length} stories
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3 — FINAL BOOKING CTA (LIGHT, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              YOUR STORY COULD BE NEXT
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              A 15-minute call, no pressure.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              Every name on this page started with one conversation. Pick a
              time below, and we will find out whether now is actually the
              right moment for you.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition hover:translate-y-[-1px]"
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
