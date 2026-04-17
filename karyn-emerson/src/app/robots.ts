// =============================================================================
// robots.ts — Next.js 15+ App Router robots metadata route
// Spec: CLAUDE.md SEO Rule. Allow all, point at sitemap.
// =============================================================================

import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karynemerson.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
