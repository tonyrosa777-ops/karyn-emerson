import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, BLOG_CATEGORIES } from "@/data/blogPosts";
import type { BlogCategory, BlogPost } from "@/data/blogPosts";
import { PageBanner } from "@/components/sections/PageBanner";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/data/site";

// =============================================================================
// /blog — Blog index
// Mosaic-4 banner + letter-mask H1 + featured-article hero (magazine spread)
// + elevated filter strip + image-zoom cards on hover.
// =============================================================================

export const metadata: Metadata = {
  title: "Notes from Southern NH | Karyn Emerson Real Estate",
  description:
    "Real writing on Southern NH real estate. MA to NH relocation math, NH property tax by town, post-August-2024 commission rules, and honest neighborhood guides.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Notes from Southern NH | Karyn Emerson Real Estate",
    description:
      "MA to NH relocation, NH property tax by town, commission transparency, and Southern NH neighborhood guides.",
    type: "website",
    url: "/blog",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Notes from Southern NH · Karyn Emerson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes from Southern NH | Karyn Emerson Real Estate",
    description:
      "MA to NH relocation, NH property tax by town, and honest neighborhood guides.",
    images: ["/og/default-og.jpg"],
  },
};

const PER_PAGE = 9;

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

function parsePage(raw: string | undefined, total: number): number {
  const n = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, total);
}

function parseCategory(raw: string | undefined): BlogCategory | "all" {
  if (!raw) return "all";
  if ((BLOG_CATEGORIES as string[]).includes(raw)) return raw as BlogCategory;
  return "all";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-lg border transition hover:-translate-y-[2px]"
      style={{
        background: "var(--bg-elevated)",
        borderColor: "rgba(47, 74, 58, 0.08)",
        boxShadow: "0 2px 8px -4px rgba(26,31,28,0.06)",
      }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase"
              style={{
                background: "rgba(181,83,44,0.10)",
                color: "var(--accent)",
                letterSpacing: "0.14em",
              }}
            >
              {post.category}
            </span>
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
            >
              {post.readingTime}
            </span>
          </div>
          <h3
            className="font-display text-h4 mt-4 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h3>
          <p
            className="mt-3 flex-1 font-body text-[15px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
          <p
            className="mt-5 font-mono text-[11px] uppercase"
            style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}
          >
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { page: pageRaw, category: categoryRaw } = await searchParams;
  const category = parseCategory(categoryRaw);
  const all = blogPosts;
  const filtered = category === "all" ? all : all.filter((p) => p.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = parsePage(pageRaw, totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);
  const gridItems =
    category === "all" && page === 1 ? pageItems.slice(1) : pageItems;

  const buildHref = (cat: BlogCategory | "all") =>
    cat === "all" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Notes from Southern NH",
    description:
      "Real writing on Southern NH real estate by Karyn Emerson.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
      url: absoluteUrl("/"),
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={[breadcrumb, blogSchema]} />

      {/* Mosaic-4 photo banner + letter-mask H1 */}
      <PageBanner
        mode="mosaic4"
        images={[
          {
            src: "/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-hero.jpg",
            alt: "MA to NH relocation, autumn Southern NH landscape",
          },
          {
            src: "/images/blog/nh-property-tax-by-town-salem-windham-derry-hero.jpg",
            alt: "Southern NH neighborhood aerial in autumn",
          },
          {
            src: "/images/blog/two-to-three-percent-commission-explained-post-august-2024-hero.jpg",
            alt: "Editorial commission transparency desk scene",
          },
          {
            src: "/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-hero.jpg",
            alt: "Canobie Lake area in autumn",
          },
        ]}
        eyebrow="NOTES · KARYN EMERSON"
        title={<>Notes from Southern NH.</>}
        titleMotion="letter-mask"
        subhead="Nine honest articles on Southern NH real estate. MA-to-NH relocation math, NH property tax by town, post-August-2024 commission rules, neighborhood deep dives, and a straight answer on Opendoor's $45,000 equity gap."
        height="md"
        parallax
        ambient="leaves"
      />

      {/* Featured article hero — magazine spread (only on default listing, page 1) */}
      {category === "all" && page === 1 && blogPosts.length > 0 && (
        <section
          className="relative overflow-hidden py-16 md:py-20"
          style={{ background: "var(--bg-base)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <AmbientParticles density="low" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
            <Link
              href={`/blog/${blogPosts[0].slug}`}
              className="group grid grid-cols-1 gap-10 md:grid-cols-2 items-center"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={blogPosts[0].heroImage}
                  alt={blogPosts[0].title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  Featured · {blogPosts[0].category}
                </p>
                <h2
                  className="mt-4 font-display font-semibold"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                  }}
                >
                  {blogPosts[0].title}
                </h2>
                <p
                  className="mt-5 font-body text-lg leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {blogPosts[0].excerpt}
                </p>
                <span
                  className="mt-6 inline-flex items-center font-mono text-[12px] uppercase tracking-[0.14em] transition group-hover:translate-x-1"
                  style={{ color: "var(--primary)" }}
                >
                  Read the full article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filter chips — elevated strip */}
      <section
        className="relative py-6"
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid rgba(181,83,44,0.15)",
          borderBottom: "1px solid rgba(47,74,58,0.08)",
        }}
      >
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {(["all", ...BLOG_CATEGORIES] as Array<BlogCategory | "all">).map((cat) => {
              const isActive = cat === category;
              const label = cat === "all" ? "All" : cat;
              return (
                <Link
                  key={cat}
                  href={buildHref(cat)}
                  className="rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase transition"
                  style={{
                    background: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--bg-base)" : "var(--text-primary)",
                    borderColor: isActive
                      ? "var(--primary)"
                      : "rgba(47,74,58,0.18)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section
        className="relative py-16 md:py-20"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          {gridItems.length === 0 ? (
            <p className="font-body text-base" style={{ color: "var(--text-secondary)" }}>
              No posts in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridItems.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 ? (
            <nav
              aria-label="Blog pagination"
              className="mt-12 flex items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = p === page;
                const href =
                  category === "all"
                    ? `/blog?page=${p}`
                    : `/blog?category=${encodeURIComponent(category)}&page=${p}`;
                return (
                  <Link
                    key={p}
                    href={href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm"
                    style={{
                      background: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "var(--bg-base)" : "var(--text-primary)",
                      borderColor: isActive ? "var(--primary)" : "rgba(47,74,58,0.18)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {p}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
      </section>
    </main>
  );
}
