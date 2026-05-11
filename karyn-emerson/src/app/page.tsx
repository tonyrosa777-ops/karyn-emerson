// =============================================================================
// page.tsx — Karyn Emerson Real Estate homepage composition
// Spec: CLAUDE.md Section Alternation Rule + Section Content Deduplication Rule
//
//   # | Section                  | Tone         | Purpose
//   --|--------------------------|--------------|------------------------------
//   1 | Hero                     | hero (cream) | primary CTA + quiz CTA
//   2 | HomePainPoints           | LIGHT        | empathy
//   3 | HomeAboutTeaser          | DARK         | story (founder)
//   4 | HomeStatsRow             | LIGHT        | social proof — numbers
//   5 | HomeServicesPreview      | DARK         | education (3 services)
//   6 | HomeTestimonialsPreview  | LIGHT        | social proof — quotes
//   7 | HomeQuizCTA              | DARK         | conversion (mid-page nudge)
//   8 | HomeBlogPreview          | LIGHT        | content preview
//   9 | HomeBookingPreview       | DARK         | conversion (final — only one)
//
// Shop teaser intentionally absent — Karyn is on the Pro tier. Shop scaffold
// is kept in repo but gated by NEXT_PUBLIC_SHOP_ENABLED (default false).
// =============================================================================

import { Hero } from "@/components/sections/Hero";
import { HomePainPoints } from "@/components/sections/HomePainPoints";
import { HomeAboutTeaser } from "@/components/sections/HomeAboutTeaser";
import { HomeStatsRow } from "@/components/sections/HomeStatsRow";
import { HomeServicesPreview } from "@/components/sections/HomeServicesPreview";
import { HomeTestimonialsPreview } from "@/components/sections/HomeTestimonialsPreview";
import { HomeQuizCTA } from "@/components/sections/HomeQuizCTA";
import { HomeBlogPreview } from "@/components/sections/HomeBlogPreview";
import { HomeBookingPreview } from "@/components/sections/HomeBookingPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  realEstateAgentSchema,
  localBusinessSchema,
} from "@/lib/schema";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          realEstateAgentSchema({ path: "/" }),
          localBusinessSchema("/"),
        ]}
      />
      <Hero />
      <HomePainPoints />
      <HomeAboutTeaser />
      <HomeStatsRow />
      <HomeServicesPreview />
      <HomeTestimonialsPreview />
      <HomeQuizCTA />
      <HomeBlogPreview />
      <HomeBookingPreview />
    </main>
  );
}
