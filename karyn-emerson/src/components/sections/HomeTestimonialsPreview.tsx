"use client";

// =============================================================================
// HomeTestimonialsPreview — Section 6 (LIGHT, social proof — quote form)
// Picks 3 testimonials mixing personas (seller, buyer, relocator/downsizer).
// Featured quote gets a Cormorant drop-cap on the first letter.
// Links to /testimonials for the full 36-quote grid.
// =============================================================================

import Link from "next/link";
import { siteConfig } from "@/data/site";
import type { Testimonial } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Pick 3 featured: one seller, one relocator, one buyer — mixed persona coverage.
// Uses the first testimonial of each service type already ordered in site.ts.
function pickFeatured(): Testimonial[] {
  const all = siteConfig.testimonials;
  const seller = all.find((t) => t.serviceType === "selling");
  const relocator = all.find((t) => t.serviceType === "relocating");
  const buyer = all.find((t) => t.serviceType === "buying");
  return [seller, relocator, buyer].filter((t): t is Testimonial => Boolean(t));
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} out of 5 stars`}
      className="font-mono text-xs uppercase"
      style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
    >
      {"★".repeat(rating)}
    </div>
  );
}

export function HomeTestimonialsPreview() {
  const featured = pickFeatured();
  const [lead, ...rest] = featured;
  const total = siteConfig.testimonials.length;

  return (
    <section
      id="testimonials-preview"
      aria-labelledby="testimonials-preview-heading"
      className="relative py-16 md:py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
          >
            In their own words
          </p>
          <h2
            id="testimonials-preview-heading"
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Real notes from sellers, buyers, and families crossing the border.
          </h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          {/* Featured lead quote — drop cap on first letter */}
          {lead ? (
            <FadeUp>
              <figure
                className="flex h-full flex-col rounded-lg border p-8 md:p-10"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(47, 74, 58, 0.1)",
                  boxShadow: "0 2px 8px -4px rgba(26,31,28,0.06)",
                }}
              >
                <StarRow rating={lead.rating} />
                <blockquote
                  className="mt-6 flex-1 font-body text-xl leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    aria-hidden="true"
                    className="float-left mr-3 mt-[-0.1em] font-display font-semibold"
                    style={{
                      color: "var(--primary)",
                      fontSize: "3.5rem",
                      lineHeight: "0.85",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {lead.quote.charAt(0)}
                  </span>
                  {lead.quote.slice(1)}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(47,74,58,0.1)" }}>
                  <p
                    className="font-display text-h4 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {lead.name}
                  </p>
                  <p
                    className="font-mono text-xs uppercase"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
                  >
                    {lead.location} &middot; {lead.serviceType}
                  </p>
                </figcaption>
              </figure>
            </FadeUp>
          ) : null}

          {/* Supporting pair */}
          <StaggerContainer
            className="flex flex-col gap-6"
            staggerDelay={0.1}
          >
            {rest.map((t) => (
              <motion.figure
                key={t.name}
                variants={item}
                className="flex flex-col rounded-lg border p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(47, 74, 58, 0.1)",
                  boxShadow: "0 2px 8px -4px rgba(26,31,28,0.06)",
                }}
              >
                <StarRow rating={t.rating} />
                <blockquote
                  className="mt-4 font-body text-base leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <p
                    className="font-display text-h4 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-mono text-xs uppercase"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
                  >
                    {t.location} &middot; {t.serviceType}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-10 flex justify-start">
          <Link
            href="/testimonials"
            className="inline-flex items-center font-body text-sm font-semibold transition hover:opacity-80"
            style={{
              color: "var(--primary)",
              textUnderlineOffset: "6px",
              textDecorationLine: "underline",
            }}
          >
            See all {total} testimonials
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonialsPreview;
