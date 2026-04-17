# progress.md — Karyn Emerson Real Estate Website Build

**Project:** karynemerson.com — new website build
**Client:** Karyn Emerson Real Estate | Salem, NH
**Business Type:** Licensed real estate agent (buyer + seller representation)
**Brokerage:** Jill & Co. Realty Group
**Launch Target:** TBD — ASAP after client purchase
**Last Updated:** 2026-04-16
**Current Phase:** Phase 0 — Initialization (in progress)

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | 🔄 In Progress |
| 1 | Research + Design System | ⬜ Not Started |
| 2 | Scaffold | ⬜ Not Started |
| 3 | Design System + Hero | ⬜ Not Started |
| 4 | Homepage Sections | ⬜ Not Started |
| 5 | Core Pages | ⬜ Not Started |
| 6 | Niche-Specific Pages | ⬜ Not Started |
| 7 | Blog | ⬜ Not Started |
| 8 | Shop | ⬜ Not Started |
| 9 | Booking | ⬜ Not Started |
| 10 | SEO + AEO | ⬜ Not Started |
| 11 | Infrastructure | ⬜ Not Started |
| 12 | Assets | ⬜ Not Started |
| 13 | Pre-Launch Audit (file-level, pre-launch-auditor agent) | ⬜ Not Started |
| 14 | Multi-Breakpoint Browser Audit (orchestrator runs Playwright) | ⬜ Not Started |
| 15 | Client Revision Pass | ⬜ Not Started |
| 16 | Close | ⬜ Not Started |

---

## Phase 0 — Initialization Progress

| Task | Status | Notes |
|------|--------|-------|
| Pre-build intake (`initial-business-data.md`) | ✅ Complete | Discovery call transcript mapped; 8/8 sections present; open fields flagged for client follow-up |
| Pre-build research (`market-intelligence.md`) | ✅ Complete | 9/9 sections filled; 6 competitors analyzed; NH commission data captured |
| Task 0A — Fill CLAUDE.md variables | ✅ Complete | 10/10 variables filled; meta-reference on line 99 intentionally preserved |
| Task 0B — Create progress.md | ✅ Complete | This file |
| Task 0C — Save `.claude/commands/prime.md` | ✅ Complete | Variable sweep completed via Python; 31 total replacements, zero unfilled placeholders |
| Task 0D — Create design-system.md | ✅ Complete | 11/11 sections filled; all 9 color tokens have specific hex values; Cormorant Garamond + Inter + JetBrains Mono fonts; Sections Matrix fully resolved |
| Task 0E — Scaffold Next.js project | ✅ Complete | Next.js 16.2.4 App Router + TS + Tailwind 4 in `karyn-emerson/` subfolder; production build passes; design tokens in globals.css; 8 animation wrappers; next/font Google fonts wired; .env.local + vercel.json created |
| Task 0F — Phase 0 Debrief | 🔄 In Progress | |
| Task 0G — Scaffold commit | ⬜ Pending user approval | Message ready: `chore(init): scaffold per website-build-template.md with design tokens` |

---

## Site Architecture (APP_FLOW equivalent — per skill alias table)

**Route map (preliminary — finalized in Stage 1B after design-synthesizer):**

```
/                         Homepage — editorial, place-first, Southern NH hero
/about                    Karyn's story (no face-forward branding per client directive)
/services                 Service index
  /services/buying        Buyer representation
  /services/selling       Seller representation
  /services/relocating    MA → NH relocation 🔧 CUSTOM
/listings                 IDX-embedded active listings 🔧 CUSTOM (Zillow/Jill & Co. feed)
/buy                      Buyer-focused IDX search + guides
/neighborhoods            Neighborhood guide index 🔧 CUSTOM
  /neighborhoods/salem
  /neighborhoods/windham
  /neighborhoods/derry
  /neighborhoods/londonderry
  /neighborhoods/pelham
  /neighborhoods/atkinson
  /neighborhoods/hampstead
  /neighborhoods/tuscan-village
  /neighborhoods/canobie-lake
  /neighborhoods/cobbetts-pond
  /neighborhoods/woodmont-commons
/relocate                 MA → NH Relocation Hub 🔧 CUSTOM (calculator, tax math, commute, DMV)
/tax-calculator           NH property tax by town 🔧 CUSTOM
/commission               Commission transparency + post-NAR explainer 🔧 CUSTOM
/quiz                     Buyer/seller + market-timing lead-capture quiz 🔧 CUSTOM
/booking                  Inline Calendly booking page
/blog                     Editorial blog (9–10 articles minimum)
  /blog/[slug]
/testimonials             36 testimonials, paginated 9/page × 4 pages
/faq
/contact
/pricing                  Optimus sales tool (deleted pre-launch)
```

**Always-built features (per CLAUDE.md Always-Built Features Rule):**
- Pricing page (sales tool — deleted pre-launch)
- Interactive Quiz (8 questions max; buyer/seller + market-timing archetypes)
- Inline Booking Calendar (custom BookingCalendar.tsx, Calendly API under the hood)
- Testimonials page (36 testimonials, 9/page × 4 pages)
- Blog (9–10 articles minimum)
- Shop (scaffold always; decision gate post-scaffold — **likely removed** for this client)

**Client-specific custom builds flagged (beyond base template):**
1. Zillow IDX listings embed (`/listings` + `/buy`) — iHomeFinder vs. Showcase IDX TBD with Jill & Co.
2. MA → NH Relocation Hub (calculator, tax math, commute calculator, DMV/inspection checklist, school comparison)
3. NH Property Tax Calculator (Salem / Windham / Derry / Londonderry / Pelham / Hampstead / Atkinson / Plaistow mill rates + sample $500K/$750K/$1M bills)
4. Neighborhood guide template (8–12 neighborhoods, each with price band, school zone, commute, real photography)
5. Multi-step qualifier quiz (buyer/seller + market-timing, 4 archetype scoring)
6. Commission-transparency page (post-NAR settlement explainer + listing-side and buyer-side ranges)

---

## Open Questions / Blockers (carried forward)

From intake — non-blocking for scaffold, required before launch:
- [ ] Tagline / elevator pitch
- [ ] Years in operation (exact) and license number + designations (ABR, SRS, etc.)
- [ ] Commission structure — exact ranges to publish
- [ ] Calendly event type URI (using demo fallback during build)
- [ ] **IDX platform decision** — iHomeFinder vs. Showcase IDX (confirm with Jill & Co. before `/listings` stage)
- [ ] Logo availability — likely uses Jill & Co. branding only; confirm standalone mark
- [ ] Photography availability — original Southern NH landscape imagery needed (client is face-averse)
- [ ] Transaction volume / avg sale price / days on market (for stats bar + trust signals)
- [ ] Instagram + LinkedIn handles
- [ ] Budget confirmation — recommending Pro tier ($3,000)

From market research:
- ⚠️ Reddit access blocked during research; audience voice substituted from Niche + ConsumerAffairs (noted in `market-intelligence.md` caveat)
- ⚠️ Direct HTML fetches of jillandco.com, verani.com, soldbylsg.com, cbdinsmore.com returned 403s; visual inferences built from subpages and platform fingerprinting

---

## Strategic Insights (top 3 — from market-intelligence.md)

1. **Place-first, not face-first.** Every Southern NH competitor (Sevajian, Jill & Co., Verani, CB Dinsmore, Lamacchia) runs headshot-grids over blue-and-white IDX-search heroes. A warm editorial palette with original Southern NH landscape photography is an unoccupied aesthetic wedge — and it aligns perfectly with the client's explicit "no face-forward branding" directive. `market-intelligence.md` §8 + §9.
2. **MA → NH relocation + hyperlocal neighborhoods is the unclaimed narrative.** No agent in the category owns it. Sevajian is MA-HQ'd, Verani has generic town pages, CB Dinsmore is stale. This is the single highest-leverage SEO and audience-capture wedge. `market-intelligence.md` §5 gaps #1–2, §6 long-tail.
3. **Commission transparency is Sevajian's single strongest lever — and the only one we must match or beat.** Four of five competitors hide pricing entirely. Sevajian publishes 2–6%. A dedicated "How I'm paid" page with listing-side/buyer-side ranges + NAR-compliance explainer + iBuyer comparison ($45K Opendoor equity loss on a $500K home) is a trust + SEO double-play. `market-intelligence.md` §4 + §5 gap #3.

---

## Top 3 Client Priorities (from initial-business-data.md)

1. **Generate inbound leads independently of Zillow and Jill & Co.'s platform.** Her own traffic on her own domain — not brokerage-dependent.
2. **Beat Lisa Sevajian's saturation.** Sevajian sends 1–2 emails/week, ranks on regional terms, and is the explicit benchmark named by the client.
3. **Capture prospects before they sign with someone else.** Market pain: buyers/sellers routinely sign with a first-contact agent before finding the right fit.

---

## Session Log

### Session 1 — 2026-04-16
**Completed:**
- Pre-build orchestrator (`/new-client`) Phases 0–4
- CLAUDE.md variables filled (10/10)
- `.claude/commands/prime.md` saved and verified
- progress.md created (this file)

**Discovered:**
- Client's domain is NOT yet purchased — using `karynemerson.com` as a single sweepable placeholder token per client directive
- Launch target is "ASAP after purchase" — no fixed calendar date
- 6 competitors analyzed; Sevajian is the benchmark (client mispronounced as "Spagnian")
- Every Southern NH competitor runs headshot-grid + blue-white IDX template — place-first editorial is an unoccupied wedge

**Decisions Made:**
- Domain convention: `karynemerson.com` everywhere as a placeholder; one find-and-replace swaps the final purchased domain
- Schema type: `RealEstateAgent` (extends LocalBusiness)
- Hero aesthetic: place-first (Southern NH landscape photography), not face-forward — aligns with client directive and category gap

**Next Session Starts At:** Task 3 — spawn design-synthesizer agent to produce `design-system.md`

**Blockers:** None blocking Task 3. IDX platform decision (iHomeFinder vs. Showcase IDX) must be resolved before `/listings` is built in Stage 1E.
