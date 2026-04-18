# IDX Decision — karynemerson.com will NOT offer consumer IDX search

**Date:** 2026-04-17
**Decision by:** Anthony (client-facing strategy)
**Impact:** permanent (not a "phase 1 deferred, phase 2 added" split)

---

## What we ruled out and why

**Option A — Link out to search.jillandco.com (rejected):**
Firecrawl mapping of search.jillandco.com confirms Jill & Co. runs on Chime/Lofty.
No agent-scoped search URLs are exposed. Traffic routed there lands in the
pooled Chime instance where leads distribute to any of Jill & Co.'s ~30 agents.
This directly undermines Karyn's stated #1 goal in initial-business-data.md §6:
"Generate inbound leads independently of Zillow and Jill & Co.'s platform."

**Option B — Iframe search.jillandco.com inside a branded shell (rejected):**
Same attribution problem as Option A. Cosmetic fix, strategic hole.

**Option C — Karyn's own iHomeFinder / Showcase IDX (rejected for now):**
$50-100/mo ongoing, 2-3 week broker-signoff wait, and adds a self-serve search
widget that the target audience does not actually want:
  - Linda (62, empty-nester seller) wants hand-holding, not a portal to scroll
  - Mike & Jess (30-45, MA→NH buyers) are fatigued by Zillow and want a
    trusted human filter on the chaos
Also: a search widget makes karynemerson.com look like every other Southern NH
agent site in a category where every competitor has IDX. That is anti-
differentiation.

**Option D — Karyn's own Chime/Lofty seat at search.karynemerson.com
(rejected):**
$500+/mo and pulls her into the same site-builder platform we are trying to
differentiate from.

## What we chose — Frame 1: "The Shortlist Method"

karynemerson.com positions hand-curated shortlists as superior to self-serve
search. This matches:

1. **The client's stated goal** — 100% lead ownership, not pool attribution
2. **The target audience** — both personas want a trusted filter, not a portal
3. **The existing site architecture** — we already built the conversion
   infrastructure (neighborhood guides, quiz, booking calendar, commission
   transparency, tax calculator, MA→NH relocation hub). No missing piece.
4. **The competitive landscape** — every Southern NH competitor has IDX.
   Karyn's differentiator is NOT having one. "I am the search" is premium
   positioning, not a defect.
5. **The category leaders outside Southern NH** — Compass top producers,
   Sotheby's elite agents, elite solo brokers do not run consumer IDX on
   their personal sites. They sell the relationship.

## Pages touched

- `/listings` — rebuilt as "The Shortlist Method" page. Hero + 3-step how-it-
  works + sample recent homes + booking CTA. No search widget. No "IDX coming
  soon." No pool exposure.
- `/buy` — IDX placeholder section replaced with "Skip the portal. Get the
  shortlist." Same positioning as /listings. Primary CTA to booking.
- `/neighborhoods/[slug]` — sample-listings section reframed from "live feed
  soon" to "recently in the market" trust signal. Footer copy updated to
  "there is no search widget here because I am the search."

## Lead flywheel — the compensating strategy

Without IDX, Karyn's lead channels all flow through owned surfaces:

1. **Quiz → BookingCalendar** — types visitor into archetype, drops them on
   her calendar
2. **Neighborhood guides** — SEO-rank for "homes for sale [town] NH",
   convert via inline booking CTA at the foot of every guide
3. **Tax calculator + Relocation hub + Commission page** — SEO moat for MA→NH
   and tax-transparency long-tail, convert via booking CTA
4. **Blog** — 9 articles ranking for category gaps, convert via booking CTA
5. **Testimonials** — all 36 featured with AggregateRating schema
6. **Booking calendar** — Karyn's Calendly, Karyn's inbox, Karyn's leads

## Complementary client-side actions

Karyn should do in parallel to own more of her lead funnel:

1. Set up her own Google Business Profile pointing at karynemerson.com
   (not jillandco.com) — local pack traffic lands direct with her
2. Create her own Instagram (noted NOT FOUND in intake) with bio link to
   karynemerson.com
3. Direct review URLs — Zillow + Google review CTAs point to HER profile,
   not the brokerage's
4. Put karynemerson.com on her email signature, business card, Zillow
   "Website" field, Facebook bio — migrate her own referral traffic to her
   owned domain

## Reversal criteria

If in 3 months analytics show meaningful bounce on `/listings` or `/buy`
(sessions where the only thing a visitor wanted was a search), revisit
Option C (her own iHomeFinder). Decision based on data, not speculation.

The placeholder is gone. The strategy is committed. The pages ship.
