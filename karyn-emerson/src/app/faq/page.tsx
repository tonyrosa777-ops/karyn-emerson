import type { Metadata } from "next";
import Link from "next/link";
import { faqs, faqCategoryEmoji, type FaqCategory } from "@/data/faqs";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema as buildFaqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Karyn Emerson Real Estate",
  description:
    "Answers on working with Karyn, buying and selling in Southern NH, Massachusetts to New Hampshire relocation, and the August 2024 NAR commission rules.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Karyn Emerson Real Estate",
    description:
      "Plain English answers on buying, selling, and relocating in Southern NH.",
    type: "website",
    url: "/faq",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Frequently Asked Questions — Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Karyn Emerson Real Estate",
    description:
      "Plain English answers on buying, selling, and relocating in Southern NH.",
    images: ["/og/default-og.svg"],
  },
};

// Preserve category order as written in data file.
const categoryOrder: FaqCategory[] = [
  "Working with me",
  "Buying in Southern NH",
  "Selling in Southern NH",
  "MA to NH relocation",
  "Commissions and closing",
];

export default function FaqPage() {
  const grouped: Record<FaqCategory, typeof faqs> = {
    "Working with me": [],
    "Buying in Southern NH": [],
    "Selling in Southern NH": [],
    "MA to NH relocation": [],
    "Commissions and closing": [],
  };
  for (const f of faqs) grouped[f.category].push(f);

  // Schema.org FAQPage markup — aids SEO + AEO per design-system.md §11.
  const schema = buildFaqSchema(
    faqs.map((f) => ({ q: f.question, a: f.answer })),
  );
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, schema]} />

      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer + ambient) */}
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
              FREQUENTLY ASKED
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              The real questions, answered.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              No filler, no fluff. The questions I get asked every week about
              buying, selling, and moving up to Southern NH. If yours is not
              here, the contact form is one section down.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — FAQ GROUPS (alternating dark/light by group) */}
      {categoryOrder.map((category, idx) => {
        const items = grouped[category];
        if (!items.length) return null;
        const isDark = idx % 2 === 0;
        return (
          <section
            key={category}
            className="relative overflow-hidden"
            style={{
              background: isDark ? "var(--primary)" : "var(--bg-elevated)",
            }}
          >
            {isDark && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    idx % 4 === 0
                      ? "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)"
                      : "radial-gradient(ellipse at 50% 0%, rgba(246,241,231,0.08), transparent 70%)",
                }}
              />
            )}
            <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 md:py-20 lg:px-8">
              <FadeUp>
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {faqCategoryEmoji[category]}
                  </span>
                  <h2
                    className="font-display text-h2 font-semibold"
                    style={{
                      color: isDark
                        ? "var(--text-on-dark-primary)"
                        : "var(--text-primary)",
                    }}
                  >
                    {category}
                  </h2>
                </div>
              </FadeUp>
              <div className="mt-8 space-y-3">
                {items.map((f, i) => (
                  <FadeUp key={f.question} delay={0.05 + i * 0.05}>
                    <details
                      className="group rounded-lg border p-5 transition"
                      style={{
                        background: isDark
                          ? "var(--card-on-dark-bg)"
                          : "var(--bg-card)",
                        borderColor: isDark
                          ? "var(--card-on-dark-border)"
                          : "rgba(47, 74, 58, 0.1)",
                      }}
                    >
                      <summary
                        className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-h4 font-semibold"
                        style={{
                          color: isDark
                            ? "var(--text-on-dark-primary)"
                            : "var(--text-primary)",
                        }}
                      >
                        <span>{f.question}</span>
                        <span
                          aria-hidden="true"
                          className="mt-1 flex-shrink-0 font-body text-xl transition group-open:rotate-45"
                          style={{ color: "var(--accent)" }}
                        >
                          +
                        </span>
                      </summary>
                      <p
                        className="mt-4 text-sm leading-relaxed"
                        style={{
                          color: isDark
                            ? "var(--text-on-dark-secondary)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {f.answer}
                      </p>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* FINAL CTA (matches alternation: last group is index 4 = light, so CTA goes dark) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <BreathingOrb tone="forest" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              STILL HAVE A QUESTION
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Send it over, I will write back.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Every question you ask makes the next version of this FAQ better
              for the next buyer or seller.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                }}
              >
                Ask Your Question
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--bg-base)",
                  color: "var(--bg-base)",
                }}
              >
                Book a 15-Minute Call
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
