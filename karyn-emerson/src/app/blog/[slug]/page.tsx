import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

// =============================================================================
// /blog/[slug] — Blog article page (server component)
// Per CLAUDE.md Page Animation Rule: ambient effects only + shimmer H1.
// SEO: Article / BlogPosting schema.org JSON-LD, OG metadata per post.
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

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);

  const article = articleSchema(post);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={[breadcrumb, article]} />

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

      {/* Body */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <div className="prose-article">
              {post.body.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-lg leading-relaxed"
                  style={{
                    color: "var(--text-primary)",
                    marginTop: i === 0 ? 0 : "1.5rem",
                  }}
                >
                  {para}
                </p>
              ))}
              <p
                className="mt-8 font-mono text-xs uppercase"
                style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
              >
                [DEMO COPY &middot; Full article pending Stage 1F]
              </p>
            </div>
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
