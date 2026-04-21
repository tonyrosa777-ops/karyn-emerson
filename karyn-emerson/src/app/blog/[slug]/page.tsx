import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/data/blogPosts";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { FallingLeaves } from "@/components/sections/motion/FallingLeaves";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";

// =============================================================================
// /blog/[slug] — Blog article page (server component)
// Per CLAUDE.md Page Animation Rule: ambient effects only + shimmer H1.
// SEO: BlogPosting + BreadcrumbList + FAQPage JSON-LD. Full TL;DR card, H2
// scroll-anchored sections, H3 subsections, and an inline FAQ list.
// generateStaticParams feeds every known slug.
// =============================================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found | Karyn Emerson Real Estate" };
  }
  return {
    title: `${post.title} | Karyn Emerson Real Estate`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: "Karyn Emerson Real Estate",
      type: "article",
      images: [
        {
          url: post.heroImage,
          width: 1600,
          height: 900,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// -----------------------------------------------------------------------------
// renderParaWithLinks — render markdown inline links [label](href) and bold
// **text** inside a paragraph. Internal links (/-prefixed) → next/link Link.
// External (http/https) → raw <a target=_blank>. No other markdown parsed.
// -----------------------------------------------------------------------------
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

function renderBold(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  BOLD_RE.lastIndex = 0;
  while ((m = BOLD_RE.exec(text)) !== null) {
    if (m.index > lastIndex) {
      out.push(text.slice(lastIndex, m.index));
    }
    out.push(
      <strong key={`${keyPrefix}-b-${i++}`} style={{ fontWeight: 600 }}>
        {m[1]}
      </strong>,
    );
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }
  return out.length > 0 ? out : [text];
}

function renderParaWithLinks(para: string, keyPrefix = "p"): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let linkCounter = 0;
  LINK_RE.lastIndex = 0;

  while ((m = LINK_RE.exec(para)) !== null) {
    if (m.index > lastIndex) {
      const before = para.slice(lastIndex, m.index);
      nodes.push(
        <React.Fragment key={`${keyPrefix}-t-${linkCounter}`}>
          {renderBold(before, `${keyPrefix}-t-${linkCounter}`)}
        </React.Fragment>,
      );
    }
    const [, label, href] = m;
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      nodes.push(
        <Link
          key={`${keyPrefix}-l-${linkCounter}`}
          href={href}
          className="underline underline-offset-2 decoration-1 hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${linkCounter}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-1 hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </a>,
      );
    }
    lastIndex = m.index + m[0].length;
    linkCounter++;
  }

  if (lastIndex < para.length) {
    const rest = para.slice(lastIndex);
    nodes.push(
      <React.Fragment key={`${keyPrefix}-t-tail`}>
        {renderBold(rest, `${keyPrefix}-t-tail`)}
      </React.Fragment>,
    );
  }

  return nodes.length > 0 ? nodes : renderBold(para, keyPrefix);
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);

  const article = articleSchema(post);
  const faqPage = faqPageSchema(post);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={[breadcrumb, article, faqPage]} />

      {/* Article header — ambient only, shimmer H1 */}
      <section
        className="relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-24"
        style={{ background: "var(--bg-base)" }}
        aria-label="Article header"
      >
        <BreathingOrb />
        <AmbientParticles density="low" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <FallingLeaves density="low" tone="autumn" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
            >
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              {" "}&middot;{" "}{post.category}
            </p>
            <h1 className="hero-shimmer font-display text-h1 mt-3 font-semibold">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase"
              style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
            >
              <span>By {post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TL;DR card — the short answer above the hero image */}
      <section
        className="relative pb-10 md:pb-14"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <div
              className="rounded-lg border p-6 md:p-8"
              style={{
                background: "rgba(181,83,44,0.04)",
                borderColor: "rgba(181,83,44,0.25)",
              }}
            >
              <p
                className="font-mono text-xs uppercase"
                style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
              >
                The short answer
              </p>
              <p
                className="mt-3 font-body text-lg leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {post.tldr}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Hero image */}
      <section className="relative" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <FadeUp>
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border"
              style={{ borderColor: "rgba(47,74,58,0.08)" }}
            >
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Body — scroll-anchored H2 sections + optional H3 subsections */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <div className="prose-article">
              {post.sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="mt-12 first:mt-0 scroll-mt-32"
                >
                  <h2
                    className="font-display text-h3 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.heading}
                  </h2>
                  {s.paras.map((p, i) => (
                    <p
                      key={i}
                      className="mt-5 font-body text-lg leading-relaxed"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {renderParaWithLinks(p, `${s.id}-${i}`)}
                    </p>
                  ))}
                  {s.subsections?.map((sub, idx) => (
                    <div key={idx} className="mt-8">
                      <h3
                        className="font-display text-h4 font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {sub.heading}
                      </h3>
                      {sub.paras.map((p, i) => (
                        <p
                          key={i}
                          className="mt-4 font-body text-lg leading-relaxed"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {renderParaWithLinks(p, `${s.id}-sub-${idx}-${i}`)}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ — inline dl with <details>/<summary> accordion */}
      <section
        className="relative py-16 md:py-20"
        style={{ background: "var(--bg-elevated)" }}
        aria-label="Common questions"
      >
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
            >
              Common questions
            </p>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Quick answers
            </h2>
            <dl className="mt-10 space-y-4">
              {post.faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-lg border p-5"
                  style={{
                    background: "var(--bg-base)",
                    borderColor: "rgba(47,74,58,0.10)",
                  }}
                >
                  <summary
                    className="cursor-pointer list-none font-display text-lg font-semibold flex items-start justify-between gap-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-open:rotate-45 mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      +
                    </span>
                  </summary>
                  <dd
                    className="mt-4 font-body text-base leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {renderParaWithLinks(f.a, `faq-${i}`)}
                  </dd>
                </details>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* CTA — "Book a conversation about [topic]" */}
      <section
        className="relative py-16 md:py-20"
        style={{
          background: "var(--primary)",
          color: "var(--text-on-dark-primary)",
        }}
      >
        {/* Radial overlay — never flat dark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeUp>
            <p
              className="font-mono text-xs uppercase"
              style={{
                color: "var(--text-on-dark-muted)",
                letterSpacing: "0.22em",
              }}
            >
              Keep going
            </p>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Want to talk about {post.category.toLowerCase()} on your specific situation?
            </h2>
            <p
              className="mt-5 font-body text-lg leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Book a 15-minute call. Bring the question this article raised, and I will answer
              it with your numbers, your town, and your timeline.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase transition hover:-translate-y-[1px]"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                  letterSpacing: "0.04em",
                }}
              >
                Book a Free Consultation
                <span aria-hidden="true" className="ml-2">
                  &rarr;
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 ? (
        <section
          className="relative py-16 md:py-20"
          style={{ background: "var(--bg-base)" }}
        >
          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <FadeUp>
              <p
                className="font-mono text-xs uppercase"
                style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
              >
                Keep reading
              </p>
              <h2
                className="font-display text-h2 mt-3 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                More from {post.category}
              </h2>
            </FadeUp>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="flex h-full flex-col overflow-hidden rounded-lg border transition hover:-translate-y-[2px]"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47, 74, 58, 0.08)",
                  }}
                >
                  <Link href={`/blog/${r.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={r.heroImage}
                        alt={r.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span
                        className="inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase"
                        style={{
                          background: "rgba(181,83,44,0.10)",
                          color: "var(--accent)",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {r.category}
                      </span>
                      <h3
                        className="font-display text-h4 mt-4 font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {r.title}
                      </h3>
                      <p
                        className="mt-3 flex-1 font-body text-[15px] leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Booking calendar at the bottom for direct conversion */}
      <section
        className="relative py-16 md:py-20"
        style={{ background: "var(--bg-elevated)" }}
        aria-label="Book a conversation"
      >
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <BookingCalendar />
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
