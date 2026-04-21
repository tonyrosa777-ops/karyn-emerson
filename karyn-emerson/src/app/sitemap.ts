// =============================================================================
// sitemap.ts — Next.js 15+ App Router sitemap
// Spec: CLAUDE.md Page Wiring Rule + SEO Rule
// Includes: current nav routes + planned routes + service area neighborhoods
//           + legal stubs.
// =============================================================================

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { neighborhoods } from "@/data/neighborhoods";
import { blogPosts } from "@/data/blogPosts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karynemerson.com";

function slugifyTown(town: string): string {
  return town
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Core routes (mirrors siteConfig.nav minus accent/internal) + planned routes.
  const coreRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/neighborhoods", priority: 0.9 },
    { path: "/relocate", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/shop", priority: 0.7 },
    { path: "/testimonials", priority: 0.7 },
    { path: "/quiz", priority: 0.8 },
    { path: "/booking", priority: 0.9 },
    { path: "/buy", priority: 0.7 },
    { path: "/tax-calculator", priority: 0.7 },
    { path: "/commission", priority: 0.7 },
    { path: "/pricing", priority: 0.3 }, // Optimus internal — deleted pre-launch
    { path: "/contact", priority: 0.6 },
    { path: "/faq", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const weeklyPaths = new Set(["/blog", "/shop"]);
  const coreEntries: MetadataRoute.Sitemap = coreRoutes.map(
    ({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: weeklyPaths.has(path) ? "weekly" : "monthly",
      priority,
    })
  );

  // Per-town neighborhood pages — one per service-area town.
  const townEntries: MetadataRoute.Sitemap =
    siteConfig.location.serviceArea.map((town) => ({
      url: `${BASE_URL}/neighborhoods/${slugifyTown(town)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Per-service detail pages — selling / buying / relocating.
  const serviceEntries: MetadataRoute.Sitemap = siteConfig.services.map(
    (s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  // Sub-neighborhood guides (Tuscan Village, Cobbett's Pond, Canobie Lake, etc.) —
  // flagship custom content pillar per design-system.md §11 + market-intelligence.md §5 gap #2.
  // Filters to sub-neighborhoods only; town slugs are already emitted above.
  const subNeighborhoodEntries: MetadataRoute.Sitemap = neighborhoods
    .filter((n) => n.category === "sub-neighborhood")
    .map((n) => ({
      url: `${BASE_URL}/neighborhoods/${n.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Per-post blog article pages (9 seed articles in Wave C).
  // Full long-form content ships in Stage 1F.
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...coreEntries,
    ...townEntries,
    ...subNeighborhoodEntries,
    ...serviceEntries,
    ...blogEntries,
  ];
}
