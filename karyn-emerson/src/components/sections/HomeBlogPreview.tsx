"use client";

// =============================================================================
// HomeBlogPreview — Section 8 (LIGHT, content preview)
// Reads first 3 blog posts from /data/blogPosts.ts. Each card shows category
// pill + title + excerpt + reading time + placeholder hero image. Links to
// /blog/[slug]. "Read the full blog" link to /blog index.
// =============================================================================

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogPosts";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const PREVIEW_COUNT = 3;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HomeBlogPreview() {
  const posts = blogPosts.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="blog-preview"
      aria-labelledby="blog-preview-heading"
      className="relative py-16 md:py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="max-w-3xl">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--accent)", letterSpacing: "0.22em" }}
          >
            Notes from Southern NH
          </p>
          <h2
            id="blog-preview-heading"
            className="font-display text-h2 mt-3 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Real writing on the stuff buyers and sellers actually wonder about.
          </h2>
          <p
            className="mt-5 max-w-2xl font-body text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Relocation math, post-August-2024 commission rules, neighborhood deep dives. Written
            for the person staring at the Zillow search bar at 11pm, not for the Google crawler.
          </p>
        </FadeUp>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          staggerDelay={0.1}
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={item}
              className="flex h-full flex-col overflow-hidden rounded-lg border transition hover:-translate-y-[2px]"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.08)",
                boxShadow: "0 2px 8px -4px rgba(26,31,28,0.06)",
              }}
            >
              <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
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
                      style={{
                        color: "var(--text-muted)",
                        letterSpacing: "0.14em",
                      }}
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
                    style={{
                      color: "var(--text-muted)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </StaggerContainer>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center font-body text-sm font-semibold transition hover:opacity-80"
            style={{
              color: "var(--primary)",
              textUnderlineOffset: "6px",
              textDecorationLine: "underline",
            }}
          >
            Read the full blog
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeBlogPreview;
