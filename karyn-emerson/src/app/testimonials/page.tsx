import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/data/site";
import type { Testimonial } from "@/data/site";
import { PageBanner } from "@/components/sections/PageBanner";
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
        alt: "Client Testimonials · Karyn Emerson Real Estate",
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

// 9 per page is mandated by CLAUDE.md Testimonials Page rule.
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

// Masonry card — three padding/type-size variants cycled by index.
// Pure CSS hover lift (no client-side JS) keeps this a server component.
function MasonryCard({
  t,
  variant,
}: {
  t: Testimonial;
  variant: 0 | 1 | 2;
}) {
  const paddingClass =
    variant === 1 ? "p-8" : variant === 2 ? "p-5" : "p-6";
  const quoteSize =
    variant === 1
      ? "clamp(1.125rem, 1.6vw, 1.35rem)"
      : variant === 2
        ? "clamp(0.9375rem, 1.2vw, 1rem)"
        : "clamp(1rem, 1.4vw, 1.125rem)";

  return (
    <div
      className={`break-inside-avoid mb-6 rounded-lg border ${paddingClass} transition duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(47, 74, 58, 0.1)",
      }}
    >
      <div
        aria-label={`${t.rating} out of 5 stars`}
        className="font-mono text-xs uppercase tracking-[0.22em]"
        style={{ color: "var(--accent)" }}
      >
        {"★".repeat(t.rating)}
      </div>
      <blockquote
        className="mt-4 font-display italic font-medium"
        style={{
          fontSize: quoteSize,
          lineHeight: 1.5,
          color: "var(--text-primary)",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <p
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{ color: "var(--text-muted)" }}
      >
        {t.name} · {t.location} · {t.serviceType}
      </p>
    </div>
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

      {/* SECTION 1 — BANNER: cross-dissolve photo carousel + shimmer H1 */}
      <PageBanner
        mode="crossDissolve"
        images={[
          {
            src: "/images/about/about-landscape-1.jpg",
            alt: "Autumn Southern NH landscape",
          },
          {
            src: "/images/about/about-clapboard-detail.jpg",
            alt: "Clapboard colonial in autumn light",
          },
          {
            src: "/images/about/about-stone-wall.jpg",
            alt: "Dry stone wall at field edge",
          },
        ]}
        eyebrow="CLIENT STORIES"
        title={<>In their own words.</>}
        titleMotion="shimmer"
        subhead="Thirty-six real calls, thirty-six stories. Every one paged nine at a time so nothing gets lost in a wall of quotes."
        height="md"
        parallax
      />

      {/* SECTION 2 — FEATURED PULL-QUOTE: massive editorial spread */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="relative">
            {/* Giant open-quote mark in the margin */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-8 select-none font-display italic leading-none md:-left-12"
              style={{
                fontSize: "clamp(6rem, 14vw, 10rem)",
                color: "var(--accent)",
                opacity: 0.2,
              }}
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p
                className="font-display italic font-medium"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  lineHeight: 1.2,
                  color: "var(--text-primary)",
                }}
              >
                {featured.quote}
              </p>
              <footer
                className="mt-8 font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-muted)" }}
              >
                {featured.name} · {featured.location}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FILTER + MASONRY GRID */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p
              className="font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              FILTER BY SERVICE
            </p>
            <h2
              className="font-display text-h3 mt-3 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {filter === "all"
                ? `${filtered.length} stories across four categories`
                : `${filtered.length} ${filter} stories`}
            </h2>
          </div>

          <div className="mt-8">
            <Suspense fallback={null}>
              <TestimonialsFilterChips />
            </Suspense>
          </div>

          {pageItems.length === 0 ? (
            <p
              className="mt-16 text-center text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              No testimonials match that filter yet.
            </p>
          ) : (
            <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
              {pageItems.map((t, i) => (
                <MasonryCard
                  key={`${t.name}-${start + i}`}
                  t={t}
                  variant={(i % 3) as 0 | 1 | 2}
                />
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
                    borderColor: "rgba(47,74,58,0.2)",
                    color: "var(--text-primary)",
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
                        ? "var(--primary)"
                        : "var(--bg-card)",
                      color: active
                        ? "var(--bg-base)"
                        : "var(--text-primary)",
                      borderColor: active
                        ? "var(--primary)"
                        : "rgba(47,74,58,0.2)",
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
                    borderColor: "rgba(47,74,58,0.2)",
                    color: "var(--text-primary)",
                  }}
                >
                  Next →
                </Link>
              )}
            </nav>
          )}

          <p
            className="mt-6 text-center font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--text-muted)" }}
          >
            Page {page} of {totalPages} · {filtered.length} stories
          </p>
        </div>
      </section>

      {/* SECTION 4 — FINAL BOOKING CTA (DARK) */}
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
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <p
            className="font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            YOUR STORY COULD BE NEXT
          </p>
          <h2
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-on-dark-primary)" }}
          >
            A 15-minute call, no pressure.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            Every name on this page started with one conversation. Pick a
            time below, and we will find out whether now is actually the
            right moment for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition hover:translate-y-[-1px]"
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
        </div>
      </section>
    </>
  );
}
