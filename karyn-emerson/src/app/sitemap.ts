// =============================================================================
// sitemap.ts — Next.js 15+ App Router sitemap
// Spec: CLAUDE.md Page Wiring Rule + SEO Rule
// Includes: current nav routes + planned routes + service area neighborhoods
//           + legal stubs. /listings priority lowered to 0.5 (IDX pending).
// =============================================================================

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

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
    { path: "/listings", priority: 0.5 }, // IDX pending — de-prioritized
    { path: "/blog", priority: 0.7 },
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

  const coreEntries: MetadataRoute.Sitemap = coreRoutes.map(
    ({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: path === "/blog" || path === "/listings" ? "weekly" : "monthly",
      priority,
    })
  );

  // Per-town neighborhood pages — one per service-area town.
  const neighborhoodEntries: MetadataRoute.Sitemap =
    siteConfig.location.serviceArea.map((town) => ({
      url: `${BASE_URL}/neighborhoods/${slugifyTown(town)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...coreEntries, ...neighborhoodEntries];
}
