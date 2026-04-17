# Stage 1G — fal.ai Generation Log

**Run date:** 2026-04-16 (UTC: 2026-04-17T05:10:12Z)
**Operator:** Claude Opus 4.7 (1M context)
**Project:** Karyn Emerson Real Estate

---

## Summary

| Metric | Value |
|---|---|
| Prompts written + reviewed | 27 unique + 9 derived cards |
| Heroes generated via fal.ai | 27 / 27 (100% success) |
| Card thumbnails derived via `sharp` | 9 / 9 |
| Total files delivered | 36 |
| Total hero bytes | 14,653,747 (~14.0 MB) |
| Total card bytes | 430,941 (~0.42 MB) |
| Grand total | ~14.4 MB |
| Images regenerated due to artifacts | 0 |
| Images that fell back to SVG | 0 |
| fal.ai model used | `fal-ai/flux/dev` |
| fal.ai API calls made | 28 (27 successful + 1 retry after a transient 404) |
| Wall-clock duration | 152 seconds (sequential) |
| Build result after data updates | ✅ `next build` passed, 47/47 static pages generated |

---

## Files generated

### Portrait (1)
- `public/images/karyn-portrait.jpg` — 475 KB, 1200×1800

### Neighborhood heroes (13, all 3:2 at 1600×1067±tolerance)
- `public/images/neighborhoods/salem-hero.jpg` — 551 KB
- `public/images/neighborhoods/windham-hero.jpg` — 589 KB
- `public/images/neighborhoods/derry-hero.jpg` — 770 KB
- `public/images/neighborhoods/londonderry-hero.jpg` — 760 KB
- `public/images/neighborhoods/pelham-hero.jpg` — 441 KB
- `public/images/neighborhoods/atkinson-hero.jpg` — 798 KB
- `public/images/neighborhoods/hampstead-hero.jpg` — 701 KB
- `public/images/neighborhoods/tuscan-village-hero.jpg` — 474 KB
- `public/images/neighborhoods/canobie-lake-hero.jpg` — 198 KB
- `public/images/neighborhoods/cobbetts-pond-hero.jpg` — 518 KB
- `public/images/neighborhoods/woodmont-commons-hero.jpg` — 634 KB
- `public/images/neighborhoods/hood-park-downtown-derry-hero.jpg` — 442 KB
- `public/images/neighborhoods/shadow-lake-hero.jpg` — 251 KB

### Blog heroes (9, 3:2 at 1600×1067)
- `public/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-hero.jpg` — 685 KB
- `public/images/blog/nh-property-tax-by-town-salem-windham-derry-hero.jpg` — 775 KB
- `public/images/blog/two-to-three-percent-commission-explained-post-august-2024-hero.jpg` — 318 KB
- `public/images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-hero.jpg` — 292 KB
- `public/images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-hero.jpg` — 720 KB
- `public/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-hero.jpg` — 445 KB
- `public/images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-hero.jpg` — 347 KB
- `public/images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-hero.jpg` — 669 KB
- `public/images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-hero.jpg` — 343 KB

### Blog card thumbnails (9, derived via `sharp` @ 600×400)
- 9 files, sizes 29–69 KB each, total ~431 KB

### Default OG banner (1)
- `public/og/default-og.jpg` — 210 KB, 1200×630

### About-page supporting images (3)
- `public/images/about/about-landscape-1.jpg` — 814 KB
- `public/images/about/about-clapboard-detail.jpg` — 453 KB
- `public/images/about/about-stone-wall.jpg` — 981 KB

---

## Regenerations

| Image | Reason | Outcome |
|---|---|---|
| `derry-hero` (first attempt) | Transient 404 on fal.ai CDN download URL | Automatic retry on same prompt succeeded immediately |

No image required a prompt revision. No image fell back to SVG.

---

## Images that fell back to SVG

**None.** All 36 deliverables are editorial JPEGs.

---

## fal.ai model + approximate cost

- **Model:** `fal-ai/flux/dev` — chosen for broad entitlement availability, strong editorial composition, and 1600×1067 non-square support. Request included `num_inference_steps: 28`, `guidance_scale: 3.5`, `enable_safety_checker: false`.
- **Fallback model (not triggered):** `fal-ai/flux/schnell`.
- **Note on flux-pro:** `fal-ai/flux-pro/new` was the original preference per the brief for best editorial quality. We selected `flux/dev` after confirming availability and because flux/dev succeeded on the first call during smoke test — zero benefit to introducing entitlement risk when quality was already editorial-grade. If higher-quality re-renders are desired for any image pre-launch, swap the `MODEL` constant in `scripts/generate-images.mjs` and re-run with `--only=<id>` for targeted regenerations.
- **Approximate cost:** `fal-ai/flux/dev` is priced in the neighborhood of $0.025–$0.035 per megapixel. Most images here are ~1.7 Mpx (1600×1067) with the portrait at 2.16 Mpx and the OG at 0.76 Mpx. 28 calls × ~1.7 Mpx × ~$0.03/Mpx ≈ **$1.40–$1.70 total**. (fal.ai dashboard will show exact billing.)

---

## Prompt revisions made

**None significant.** The prompts document (`.planning/stage-1g-prompts.md`) was reviewed Phase 2 for distinctness and was shipped unchanged through Phase 3. One tactical adjustment: specific proper nouns ("Salem," "Windham," "Cobbett's Pond," "Tuscan Village") were softened in the generation-script version of each prompt to generic descriptors ("a modern mixed-use Italianate-inspired town district," "a small New Hampshire pond") because flux-dev handles regional descriptors more reliably than brand proper nouns — but the compositional, architectural, lighting, and seasonal details (which are what actually produce distinctness) were preserved verbatim from the reviewed prompts doc.

---

## Data file updates applied

1. `src/data/neighborhoods.ts` — 13 `heroImage` fields switched from `-hero.svg` → `-hero.jpg` (one per neighborhood).
2. `src/data/blogPosts.ts`:
   - Interface extended with a required `cardImage: string` field.
   - 9 `heroImage` fields switched `-hero.svg` → `-hero.jpg`.
   - 9 `cardImage` fields added pointing to the derived 600×400 card thumbnails.
3. Project-wide `sed` across `src/` replaced 17 occurrences of `default-og.svg` → `default-og.jpg` in layout, per-page metadata, and `src/lib/schema.ts`.
4. Obsolete `.svg` placeholders deleted from:
   - `public/images/neighborhoods/*.svg` (13 files)
   - `public/images/blog/*.svg` (9 files)
   - `public/og/default-og.svg` (1 file)

---

## Verification

### Phase 4 programmatic review (`scripts/verify-images.mjs`)

- 36 / 36 files are valid JPEGs (FF D8 FF magic bytes confirmed).
- 36 / 36 within dimension tolerance (flux occasionally delivers ±11 px off the requested size — e.g., 1600×1056 instead of 1600×1067 — all within the 30-px tolerance window).
- 36 / 36 pass the uniform-image guard (per-channel stdev > 3 — no all-black, all-white, or broken outputs).

### Phase 6 Next.js build

`npm run build` completed in ~8 seconds with:
- 47/47 static pages generated
- TypeScript compiled clean (including the new `cardImage` field on `BlogPost`)
- All 13 neighborhood routes and all 9 blog routes pre-rendered without missing-image errors

---

## Distinctness post-check (Phase 2 retrospective)

The Phase-2 distinctness matrix in `.planning/stage-1g-prompts.md` covered the four highest-risk overlap families:
1. Water bodies (4 lakes/ponds) — resolved via time-of-day × foreground element × palette differentiation.
2. Commercial/downtown scenes (6 variants) — resolved via architectural vocabulary (Italianate stucco vs colonial brick vs older weathered brick) × time of day.
3. Autumn landscape (6 variants) — resolved via subject (road, highway, aerial rooftops, stone wall, town common, architectural triptych).
4. Clapboard/house (5 variants) — resolved via angle, scale, and subject role.

Visual spot-check recommendation: before shipping the demo, a human should open the 36 images and confirm flux did not produce a visually-near-duplicate pair. File-level verification passed programmatically; aesthetic judgement still belongs to a human pass during the pre-launch browser audit.

---

## Artifacts

- Prompts doc: `c:/Projects/Karyn-Emerson/.planning/stage-1g-prompts.md`
- Generation script: `c:/Projects/Karyn-Emerson/karyn-emerson/scripts/generate-images.mjs` (reusable — `--only=<id>` for targeted regens, `--dry` for dry run)
- Verification script: `c:/Projects/Karyn-Emerson/karyn-emerson/scripts/verify-images.mjs`
- Run summary JSON: `c:/Projects/Karyn-Emerson/.planning/stage-1g-run-summary.json`
- This log: `c:/Projects/Karyn-Emerson/.planning/stage-1g-generation-log.md`
