# Stage 1I — Multi-Breakpoint Browser Audit

**Date:** 2026-04-17
**Dev server:** http://localhost:3001 (Next.js 16.2.4 Turbopack, `npm run dev`, stopped with TaskStop after audit)
**Tool:** Playwright MCP

---

## Viewports tested (per CLAUDE.md Visual QA Rule)

| # | Width × Height | Device profile | Result |
|---|---|---|---|
| 1 | 1440 × 900 | Desktop | PASS |
| 2 | 390 × 844 | iPhone 14/15 | PASS |
| 3 | 375 × 812 | iPhone SE (narrowest) | PASS |
| 4 | 428 × 926 | iPhone 14/15 Pro Max | PASS |
| 5 | 390 × 844 with nav drawer open | Mobile overlay test | PASS |

---

## Console messages

- **Total errors across all viewports:** 0
- **Total warnings across all viewports:** 0
- **Info messages:** 2 (Next.js dev overlay registration — expected, not user-visible)

Checked at: homepage, /neighborhoods/salem, /quiz.

---

## Critical checks (CLAUDE.md exit criteria)

| Check | Result |
|---|---|
| 0 console errors at every viewport | ✅ PASS |
| 0 console warnings at every viewport | ✅ PASS |
| No horizontal scroll at 375 | ✅ PASS (offenders list empty; 16px scrollWidth/clientWidth delta is Playwright desktop-chrome scrollbar artifact, not a real element overflow) |
| No H1 orphan lines at any mobile width | ✅ PASS (verified at 375 and 390 — H1 wraps cleanly, `every street.` fits on final line at both widths) |
| Hero fits above fold (eyebrow + H1 + subheadline + primary CTA) | ✅ PASS at 375, 390, 428. On 428 Pro Max, full stack fits including trust microcopy line |
| Mobile nav drawer opens | ✅ PASS |
| Drawer overlay fully opaque | ✅ PASS (solid forest-green `var(--primary)` — cream links readable) |
| Drawer closes cleanly via inner X | ✅ PASS (dialog removed from DOM, body scroll restored, hamburger re-visible) |

---

## Visual observations

### Homepage
- **Section rhythm** (verified via DOM snapshot — 9 regions present with correct IDs):
  Hero → pain-points → about-teaser → stats → services → testimonials-preview → quiz-cta → blog-preview → booking
- **Hero:** cream bg, iron-oxide JetBrains eyebrow "SOUTHERN NEW HAMPSHIRE", Cormorant shimmer H1 with iron-oxide sweep mid-animation, KarynCanvas silhouette on right panel drawing service-area outline in iron-oxide dots, ambient particle motes visible
- **Full-page screenshot revealed** (after forced scroll to trigger `useInView`): every section renders with correct bg tone, alternation L/D/L/D/L/D/L/D, content populated
- **fal.ai image quality confirmed:** blog preview shows autumn road, family photo, fountain-pen desk — distinct, editorial. About teaser shows editorial outdoor Karyn portrait (not studio headshot) — matches the client's "place-first, not face-first" directive.

### Neighborhood detail (/neighborhoods/salem)
- Iron-oxide eyebrow "SALEM, NH", Cormorant H1 "Salem"
- 4-chip stats grid: Median Home Price $565,000 / Mill Rate 19.85 / Commute 45 min · I-93 via Exit 2 / School District
- Primary CTA "BOOK A CONVERSATION ABOUT SALEM" pill
- Hero image visible below CTA (fal.ai Tuscan Village autumn)

### Quiz (/quiz)
- Iron-oxide eyebrow "FIND YOUR FIT", Cormorant shimmer H1 "Which Southern NH move is yours?"
- Intro copy "Six quick questions. Honest answers." ✅ matches actual 6 questions
- 4-bullet feature list with iron-oxide dots
- Primary CTA "START THE QUIZ"
- JetBrains footer "6 QUESTIONS · RESULT SHOWN IMMEDIATELY"

### Mobile nav drawer
- Fully opaque forest-green background (cream links clearly readable)
- Cormorant 1.75rem links stacked vertically
- Iron-oxide "⬥ Pricing" marker visually distinct from client-facing links
- Cream wordmark top-left, close X top-right
- Primary "BOOK A FREE CONSULTATION" pill pinned at bottom

---

## Issues found and resolved in-audit

1. **HomeQuizCTA copy mismatch** — section copy said "Eight questions, takes about five minutes" but the actual quiz has 6 questions (matching /quiz intro + footer). **Fixed** in `src/components/sections/HomeQuizCTA.tsx` line 60: changed to "Six questions, takes about ninety seconds" to align with the quiz itself.

## Issues flagged (not blocking — recorded for client-review pass)

1. **Hero + Pain Points share cream tone** — both use `var(--bg-base)`. The hero's canvas/particle layer visually distinguishes it in practice, but strict reading of Section Alternation Rule could flag this. Recommendation: leave as-is (hero's ambient motion + KarynCanvas makes the first tone-shift happen at About Teaser → forest green, which is a dramatic enough pivot that the eye doesn't notice the hero→pain-points flat transition).
2. **Aesthetic spot-check on 4 lake scenes** (Windham, Canobie Lake, Cobbett's Pond, Shadow Lake) noted by Stage 1G as highest collision risk. Visual confirmation deferred to client review — each was generated with distinct time-of-day + foreground element + palette.

---

## Verdict: PASS — READY FOR CLIENT DEMO

All exit criteria met. Zero console errors, zero console warnings, clean layout at every viewport, mobile nav fully functional. One content bug caught and fixed in-audit.
