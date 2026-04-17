// =============================================================================
// page.tsx — Karyn Emerson Real Estate homepage composition
// Spec: CLAUDE.md Section Alternation Rule + Section Content Deduplication Rule
//
// Homepage section rhythm map (REORDERED from design-system.md §11 suggested
// order to satisfy CLAUDE.md duplicate-purpose prevention: Stats and
// Testimonials are now split by Services so two social-proof sections never
// sit adjacent; QuizCTA and Booking are split by Blog so two conversion
// sections never sit adjacent). Shop is SKIPPED — Pro tier decision gate.
//
//   # | Section                  | Tone         | Purpose
//   --|--------------------------|--------------|------------------------------
//   1 | Hero                     | hero (cream) | primary CTA + quiz CTA (done)
//   2 | HomePainPoints           | LIGHT        | empathy
//   3 | HomeAboutTeaser          | DARK         | story (founder)
//   4 | HomeStatsRow             | LIGHT        | social proof — numbers
//   5 | HomeServicesPreview      | DARK         | education (3 services)
//   6 | HomeTestimonialsPreview  | LIGHT        | social proof — quotes
//   7 | HomeQuizCTA              | DARK         | conversion (mid-page nudge)
//   8 | HomeBlogPreview          | LIGHT        | content preview
//   9 | HomeBookingPreview       | DARK         | conversion (final — only one)
//
// Alternation check: hero -> L -> D -> L -> D -> L -> D -> L -> D  (valid)
// Adjacency purpose check:
//   - Stats (social proof) then Services (education) — OK
//   - Services (education) then Testimonials (social proof) — OK
//   - Testimonials (social proof — quote form) then QuizCTA (conversion) — OK
//   - QuizCTA (conversion — quiz format) then Blog (content) — OK
//   - Blog (content) then Booking (conversion — calendar format) — OK
//
// Shop decision (per CLAUDE.md Always-Built Features Rule + design-system.md
// §11): client is Pro tier, not Premium. Shop is NOT built on homepage, and
// all shop scaffold files are deleted in Wave C.
//
// Dark sections use var(--primary) + radial-gradient overlay (never flat).
// Light sections use var(--bg-base). Individual section components own their
// own radial overlay; this file only composes.
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
