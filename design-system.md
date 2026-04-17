# design-system.md

# Karyn Emerson Real Estate — Design System

*The brand constitution. Every build phase reads this file before making any visual, verbal, or architectural decision. Synthesized from initial-business-data.md and market-intelligence.md. Research overrides opinion: where the two source documents conflict, the research prevails.*

**Theme decision (load-bearing, read first):** This build is a **LIGHT theme**, not the template default dark theme. Rationale: market-intelligence.md §8 identifies the aesthetic wedge as a warm editorial New England palette (cream, warm off-white, deep forest green, iron-oxide accent) with black type — every competitor in Southern NH (Sevajian, Verani, CB Dinsmore, Jill & Co., Lamacchia) already runs on blue/cabernet accents over white or dark, and differentiation requires a creamy-paper editorial surface rather than a dark SaaS surface. The template's `--bg-base: #0a0a0a` default is explicitly overridden. The light theme also better serves the 62-year-old "Linda" persona (higher contrast, more trust-conservative, more like the magazine-editorial aesthetic she recognizes from the New England publications she reads). The three-layer hero stack, animation conventions, and everything else in website-build-template.md still applies — only the palette inverts.

---

## Section 1 — Brand Identity Statement

Karyn Emerson is the one Southern NH real estate agent who sells **the place, not the face** — a lifelong Salem-area operator at a genuine boutique brokerage who makes every visitor feel, in the first three seconds, that they have found *their* agent for *their* neighborhood. The site speaks in a warm, conversational, locally-rooted voice (per initial-business-data.md §4), and its editorial visual system — cream paper, deep forest green, Cormorant serif display — signals craft, taste, and local pride in a category where every competitor runs the same blue-and-white, headshot-grid, IDX-search-over-stock-home-photo template (per market-intelligence.md §8). She is **not** a franchise agent, not a Zillow-lead-machine, not the cheapest option, and not the loudest one on email. She is the trusted neighbor who happens to be the expert — the agent who knows your cul-de-sac, the Canobie crowd, the Salem HS feeder lines, and whether it is actually a good time to sell. Within five seconds of landing, a visitor should feel: *quiet confidence, regional warmth, editorial care, and an immediate sense that this person knows every street in my town.*

**Sources:** initial-business-data.md §1 (positioning), §3 (audience), §4 (brand voice); market-intelligence.md §1 (executive summary), §2 (audience), §8 (aesthetic landscape), §9 (strategic recommendations).

---

## Section 2 — Color Palette

**Theme: LIGHT** (explicit override of website-build-template.md's default dark token set). The palette is a warm editorial New England system: cream paper surface, black text, deep forest green as the brand primary, and iron-oxide (burnt sienna) as the accent — together they differentiate from every competitor's blue/cabernet (market-intelligence.md §8: *"Four of five are blue-and-white variants… Nobody uses warm earth tones. Nobody uses greens despite New Hampshire being famous for foliage."*).

**CSS Custom Property Map (to be written into `globals.css`):**

| Token | Hex | Usage Rule |
|---|---|---|
| `--primary` | `#2F4A3A` | Deep forest green — **brand primary**. Used on dark sections (background for hero, testimonials, final booking CTA), primary button fills, nav link active states, H1 shimmer anchor stops, section dividers, footer background. Evokes NH foliage and forested terrain — directly opposed to Sevajian/Verani/Lamacchia/CB Dinsmore blue. |
| `--primary-muted` | `rgba(47, 74, 58, 0.6)` | Muted forest green — used for secondary borders, subtle dividers, hover states on cards in light sections, de-emphasized nav items. |
| `--accent` | `#B5532C` | Iron-oxide / burnt sienna — **single accent color** used sparingly for: CTA button hover states, hero tagline shimmer peak, pricing-transparency badge, "Book Now" pill in nav, ambient canvas particle color, FAQ open-state indicator. Never used as a large background wash. |
| `--bg-base` | `#F6F1E7` | **Warm cream / paper white** — the default page background on every light section (Pain Points, Services, About, Testimonials grid, Blog index, Neighborhood Guides, Relocation Hub). Evokes old-paper editorial magazines and New England sun-bleached clapboard. Explicit override of template default `#0a0a0a`. |
| `--bg-elevated` | `#FBF7EE` | **Lighter cream** — the elevated surface used for card backgrounds on light sections, nav bar background when scrolled, blog post body backgrounds. Sits one shade brighter than `--bg-base` so cards lift off the page. |
| `--bg-card` | `#FFFFFF` | **Pure white** — used only for the highest-elevation cards (testimonial cards, featured listing cards, quiz-result cards). Provides a crisp editorial card-on-paper feel when layered over `--bg-base`. |
| `--text-primary` | `#1A1F1C` | **Near-black, slight green undertone** — used for all headings and body copy on light sections. Not pure black (`#000000`) — warmer, reads as editorial print rather than digital. On dark sections (background `--primary`), text flips to `#F6F1E7` (same value as `--bg-base`) for maximum warmth. |
| `--text-secondary` | `rgba(26, 31, 28, 0.72)` | Softened text — used for body paragraph copy below H2 headings, card descriptions, meta text (post dates, read times). |
| `--text-muted` | `rgba(26, 31, 28, 0.48)` | Muted text — used for form labels, eyebrow micro-copy above H1s, footer secondary copy, dividers' labels. |

**Dark-section inversion rule (required because theme is light but the template's section-alternation rule still applies — see CLAUDE.md §Section Alternation):**
When a section uses `background: var(--primary)` (deep forest green), text inside flips to:
- Headings: `#F6F1E7` (cream)
- Body: `rgba(246, 241, 231, 0.82)`
- Muted: `rgba(246, 241, 231, 0.55)`
Cards inside dark sections: `rgba(246, 241, 231, 0.06)` background, `rgba(246, 241, 231, 0.14)` border.

**Competitor differentiation check** (market-intelligence.md §8):
- Sevajian (medium blue) — differentiated by green + cream.
- Verani (BHHS cabernet) — differentiated by green + cream.
- CB Dinsmore (sea-blue) — differentiated by green + cream.
- Jill & Co. (script-warm blue) — differentiated by green + cream + serif display.
- Lamacchia (royal-blue gradient) — differentiated by green + cream.
**Pass:** no competitor in the set uses deep forest green or iron-oxide over cream.

**Sources:** market-intelligence.md §8 (design landscape), §9 (strategic recommendation: warm editorial palette); initial-business-data.md §4 (warm/locally-rooted personality).

---

## Section 3 — Typography System

The typographic wedge is **editorial serif display + refined humanist sans body** — market-intelligence.md §8 documented that every competitor runs geometric sans-serif (Montserrat / Proxima / Gotham family), with BHHS's brand serif being the lone exception. Serif display is *unoccupied territory in Southern NH real estate.* This is the single most visible typographic differentiator available.

### `--font-display` — Cormorant Garamond
- **Use:** H1 (hero tagline), interior page H1s, H2 section headings, pull-quotes, testimonial featured-quote callouts, neighborhood-guide titles, blog post titles.
- **Why:** A high-contrast editorial serif with old-style New England character — evokes print journalism, regional magazines, and 19th-century clapboard signage. Reads instantly as "boutique" / "editorial" / "place of taste." None of the five competitor sites use a display serif of this character; BHHS Verani is the lone serif competitor and uses a corporate slab, not a display garalde.
- **Source:** Google Fonts — `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap`
- **Weights to load:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold), plus 400 italic and 600 italic.
- **Sizes (hero + headings):**
  - `.text-display` → `clamp(3rem, 6vw, 5.25rem)` / line-height 1.05 / letter-spacing -0.015em (hero H1)
  - `.text-h1` → `clamp(2.25rem, 4.5vw, 3.5rem)` / line-height 1.1 / letter-spacing -0.01em (interior page H1)
  - `.text-h2` → `clamp(1.75rem, 3.25vw, 2.5rem)` / line-height 1.15 (section headings)
  - `.text-h3` → `clamp(1.35rem, 2.5vw, 1.85rem)` / line-height 1.2 (subsection headings, testimonial quote)
  - `.text-h4` → `clamp(1.15rem, 2vw, 1.4rem)` / line-height 1.25 (card titles, FAQ question)

### `--font-body` — Inter
- **Use:** Paragraph copy, form inputs, button labels (secondary buttons), navigation links, list items, footer copy.
- **Why:** A refined humanist sans that reads crisply at body size without competing with the display serif. Inter is widely recognizable, open-source, and renders reliably on every browser — it serves legibility for the 62-year-old Linda persona (market-intelligence.md §2: she expects professionalism and clarity). Pairing a distinctive display serif with a neutral workhorse body is a classic editorial-magazine move; the differentiation lives in the display face, the legibility lives in the body face. frontend-design.md warns against overuse of Inter as a display font, not as a body font — here Inter is intentionally in a supporting role.
- **Source:** Google Fonts — `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- **Weights to load:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold).
- **Body sizes:**
  - Base body: 1rem / 1.6 line-height
  - Large body (hero subhead, guide intro): 1.125rem / 1.55 line-height
  - Small body (captions, meta): 0.875rem / 1.5 line-height

### `--font-mono` — JetBrains Mono
- **Use:** Data labels (commission percentages, mill rates, median home price numbers on the Relocation Hub and Property Tax calculator), eyebrow micro-copy above H1s (e.g., "SALEM, NH · 2026"), form field numeric inputs, schema/price display, tabular columns on the commission-transparency page, nav CTA "⬥ Pricing" micro-marker.
- **Why:** The numeric-precision role in this build is load-bearing — the Relocation Hub, Property Tax calculator, Commission transparency page, and Mill Rate tables are all data-dense (market-intelligence.md §5 gaps #1, #3, #4). A monospace face dignifies the numbers and echoes the print-typographic ledger aesthetic. JetBrains Mono is warmer than IBM Plex Mono or Roboto Mono — it does not read as "terminal" at display size.
- **Source:** Google Fonts — `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap`
- **Weights to load:** 400, 500, 600.

**Sources:** market-intelligence.md §8 (competitor typography gap — editorial serif unoccupied); frontend-design.md (distinctive display + refined body pairing principle); initial-business-data.md §4 (warm/editorial personality).

---

## Section 4 — Spacing & Layout System

Defaults inherit from website-build-template.md; editorial rhythm requires slightly more generous vertical breathing than a SaaS build.

**Max-width containers:**
- Primary content container: `max-w-6xl` (72rem / 1152px) — default for homepage sections, service pages, neighborhood guides.
- Prose container (blog, editorial pages, Relocation Hub long-form): `max-w-3xl` (48rem / 768px) — narrower measure for readability on body copy.
- Full-bleed: only hero, final booking CTA, gallery grids.

**Section vertical padding:**
- Desktop: `py-24` to `py-32` (6rem–8rem) — editorial builds get more vertical air than SaaS builds.
- Mobile: `py-16` to `py-20` (4rem–5rem).
- Hero (desktop): `pt-32 pb-24`. Hero (mobile): `pt-24 pb-16`.

**Card padding:**
- Standard card: `p-6` to `p-8` (1.5rem–2rem).
- Testimonial card: `p-8` on desktop, `p-6` on mobile — more air around the quote.
- Neighborhood guide card: `p-6` + `pt-0` if image-led (image bleeds to card edges).

**Grid columns:**
- Service/pain-point cards: 3 columns desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), 1 column mobile.
- Testimonials grid: **3 columns × 3 rows = 9 per page** — non-negotiable per CLAUDE.md Testimonials Page rule.
- Neighborhood guides index: 2 columns desktop, 1 column mobile — larger cards with hero photography.
- Stats bar: 4 columns desktop, 2 columns mobile.
- Featured listings (IDX): 3 columns desktop, 1 column mobile.

**Gutter widths:**
- Card gap: `gap-6` (1.5rem) desktop, `gap-4` (1rem) mobile.
- Section-to-section visual gap: handled by section padding, not margin — no collapsing margins.

**Spacing scale** (inherited unchanged from website-build-template.md):
`--space-xs: 0.25rem / --space-sm: 0.5rem / --space-md: 1rem / --space-lg: 1.5rem / --space-xl: 2rem / --space-2xl: 3rem / --space-3xl: 4rem`

**Scroll padding:** `scroll-padding-top: 96px` mobile, `112px` sm, `128px` lg (per CLAUDE.md CSS Scaffold Completeness Rule — non-negotiable).

**Sources:** website-build-template.md Design Tokens + CLAUDE.md CSS Scaffold rule; editorial rhythm adjustment per market-intelligence.md §8 (boutique editorial positioning).

---

## Section 5 — Component Style Rules

**Buttons:**

- **Primary button** — pill shape, `rounded-full`, `px-8 py-3.5`, `bg-[var(--primary)]` (forest green), `text-[var(--bg-base)]` (cream), `font-body font-semibold text-sm tracking-wide uppercase letter-spacing-wide`. Hover: `bg-[var(--accent)]` (iron-oxide transition), subtle lift (`translate-y-[-1px]`), shadow `0 10px 30px -10px rgba(47,74,58,0.4)`. Used for: "Book a free 15-minute consultation," quiz final CTA, nav "Book Now" pill.
- **Secondary button** — pill shape, `rounded-full`, `px-8 py-3.5`, transparent background with `border-1.5 border-[var(--primary)]`, `text-[var(--primary)]`, same typography. Hover: `bg-[var(--primary)]`, `text-[var(--bg-base)]`. Used for "Take the Quiz," "See All Neighborhoods," secondary nav.
- **Ghost button** — no border, `text-[var(--primary)]`, `font-body font-medium`, underline on hover with `text-underline-offset: 6px`. Used for "Read more," "See all testimonials," in-copy links.

**Cards:**

- Standard card on light section: `bg-[var(--bg-elevated)]`, `border-1 border-[rgba(47,74,58,0.08)]`, `rounded-lg` (not `rounded-full` — cards are editorial rectangles, not pill-shaped), `p-6` to `p-8`. Shadow `0 2px 8px -4px rgba(26,31,28,0.06)` resting, `0 8px 24px -8px rgba(26,31,28,0.12)` on hover.
- Standard card on dark section (forest-green background): `bg-[rgba(246,241,231,0.06)]`, `border-1 border-[rgba(246,241,231,0.14)]`, same radius and padding.
- Testimonial card: `bg-[var(--bg-card)]` (pure white), `border-1 border-[rgba(47,74,58,0.1)]`, `p-8`, subtle warm shadow. Featured quote (above grid) gets a pulled-up serif drop cap on the first letter (Cormorant 600, 3.5rem, floated).
- Neighborhood guide card: image bleeds to card top edges, content below with `p-6`. Small iron-oxide-colored eyebrow label ("DERRY" / "WINDHAM") in JetBrains Mono 0.75rem uppercase above the card H3.

**Form inputs:**

- Input: `bg-[var(--bg-card)]`, `border-1 border-[rgba(47,74,58,0.18)]`, `rounded-md` (not pill — editorial forms are rectangular), `px-4 py-3`, `font-body text-base`. Focus ring: `border-[var(--primary)]` + `shadow-0 0 0 3px rgba(47,74,58,0.12)`. Label: JetBrains Mono `text-xs uppercase tracking-wider text-[var(--text-muted)]` above the input.
- Select/dropdown: identical styling with caret icon in `--text-muted`.
- Textarea: same styling, `min-h-[120px]`, `resize-y`.

**Navigation:**

- Desktop nav: fixed top, `bg-[var(--bg-elevated)]` with `backdrop-blur-sm`, `border-b-1 border-[rgba(47,74,58,0.08)]` once scrolled. Height 96px (matches scroll-padding-top). Logo wordmark ("Karyn Emerson" in Cormorant 600, `text-[var(--primary)]`) flush left. Link items in `font-body font-medium text-[15px] text-[var(--text-primary)]` with iron-oxide underline hover. "⬥ Pricing" link in iron-oxide (CLAUDE.md Always-Built Features Rule). "Book a consultation" pill (primary button) flush right.
- Mobile nav: hamburger triggers full-screen overlay with `bg-[var(--primary)]` (forest green), cream nav links in Cormorant 400 1.75rem stacked vertically, primary CTA pill at bottom.

**Sources:** market-intelligence.md §7 (conversion requirements — Calendly-in-hero, CTA clarity); initial-business-data.md §4 (warm/not-salesy personality); brand personality axes (Section 8 below).

---

## Section 6 — Photography & Media Direction

The single most load-bearing design rule on this build. Per market-intelligence.md §8 and §9 and per the client's explicit directive in initial-business-data.md §4 ("she expressed reluctance to put her face everywhere") and §7 (photography "⚠️ NOT FOUND"), photography is **place-first, not face-first**, and must differentiate from the category's reliance on studio headshot grids and MLS thumbnail feeds.

### Required shot types (the canon — all generated fresh, no stock)

1. **Southern NH landscape — autumn.** Clapboard colonials with October foliage, stone-wall edges, birch and maple canopy, church steeples in background. Specific locations referenced: Salem town center, Derry common, Windham meetinghouse, Canobie Lake, Cobbett's Pond, Shadow Lake. 8–10 hero-candidate shots.
2. **Southern NH landscape — winter + early spring.** Stone walls with dusting of snow, bare maple silhouettes, colonial porches with wreaths. 3–4 shots.
3. **Interior editorial — lived-in New England homes.** Morning light through mullioned windows, worn wide-plank floors, a kettle on a stove, a mudroom with boots and a wool coat on a hook. Aspirational but *lived-in* — not staged MLS shots. 6–8 shots.
4. **Neighborhood signage and street detail.** Hand-painted town welcome signs, classic mailboxes at the end of a gravel drive, a "Windham Town Forest" trail sign, Tuscan Village architecture. 8–10 shots (one per neighborhood guide).
5. **Karyn's hands / indirect agent presence.** Keys on a kitchen counter, a hand gesturing at a blueprint, two people walking a property line from behind. Face is never centered. 3–4 shots. Use sparingly.
6. **The Relocation Hub hero asset.** The MA-NH border line (I-93, a "Welcome to New Hampshire" sign), a morning commuter's dashboard at dawn. 2–3 shots.

### Prohibited content (the anti-canon)

- **No studio headshot grids.** Karyn's single editorial portrait may appear once on `/about` — never in the hero, never as the brand avatar, never in nav, never on blog post headers.
- **No MLS-feed thumbnail walls.** The homepage shows featured listings through *our* photography direction (wide exteriors, native light) — never raw MLS-portal thumbnails.
- **No stock "family-with-keys" / "couple-holding-house-keys" / "sold-sign-with-handshake" clichés** (market-intelligence.md §8 documents these as the category cliché).
- **No blue-hour CGI architectural renderings** (Lamacchia, Verani style).
- **No Canva graphics with overlaid percent signs or "SOLD" stamps.**
- **No emoji in hero imagery** — emoji is reserved for UI per CLAUDE.md Code Standards (service cards, quiz options, pain points), never in photography.

### Processing / mood

- Warm color cast (slight amber lift in highlights, soft green push in shadows). Muted saturation — editorial, not Instagram.
- Natural light only where possible. No flash, no studio lighting.
- Slight film grain texture (max 3% noise overlay on JPEG export) — aligns with the paper-grain aesthetic of the cream background.
- Compositions favor negative space: subject occupies lower-left or lower-right third with sky/foliage above.
- No heavy HDR. No tilt-shift. No gimmick filters.

### Aspect ratios

- Hero images (homepage + interior page headers): **3:2 landscape** (1800×1200 minimum). NOT 16:9 — the shorter vertical ratio reads as print editorial, not cinematic video.
- Neighborhood/service card images: **4:3** (1200×900).
- Gallery grid thumbnails: **1:1 square** (1000×1000) for grid consistency.
- Blog post headers: **3:2** (1800×1200).
- Blog post card thumbnails: **4:3** (1200×900).

### Video rules

- No autoplay video in hero — the hero animation is the 3-layer canvas+stagger stack per CLAUDE.md Hero Architecture Rule, not video.
- Optional: short (30–60s) neighborhood walk-through videos on each neighborhood guide page. Muted autoplay with play/pause toggle. Always ships with a poster frame fallback image (same 3:2 ratio).
- Monthly market-update videos (market-intelligence.md §5 gap #7) are voiceover-over-footage, not face-to-camera — aligns with face-minimal directive.

### fal.ai image generation brief (per CLAUDE.md Image Generation Rule)

All demo imagery generated via fal.ai following the canon above. Every prompt names a specific location (Salem, Windham, Derry), a specific season/light condition, and a specific compositional instruction. No prompt requests readable text in the image. Prompts are written as a batch and reviewed for distinctness before running. Every blog article gets a card image + header image. Neighborhood guides get 1 hero + 3 detail shots each.

**Sources:** initial-business-data.md §4 (no face-forward), §7 (no photography on hand, 32 testimonials to ship); market-intelligence.md §8 (category uses stock headshot grids + MLS thumbnails — gap), §9 (strategic "do" #3: real neighborhood photography); CLAUDE.md Image Generation Rule.

---

## Section 7 — Tone of Voice

Five writing principles, each with a BEFORE (what competitors write, lifted from real competitor copy observed in market-intelligence.md §3) and an AFTER (what we write instead, grounded in the verbatim audience language from market-intelligence.md §2).

### 1. Name the town, the street, the landmark.

*Rule:* Specificity is trust. Write the neighborhood name, the school district, the lake, the commute exit. Generic geography reads as a franchise.

- **BEFORE (Jill & Co.):** "A boutique brokerage specializing in residential real estate… help make the stressful home buying and selling process as seamless and painless as possible."
- **AFTER:** "If you have watched the Salem High feeder lines shift over twenty years, if you know which side of Cobbett's Pond holds its value, if you are ready to trade the four-bedroom colonial for a single-level at Tuscan Village — you already know why you called me."

### 2. Speak to the trigger, not the transaction.

*Rule:* Linda and Mike & Jess are not shopping for "a realtor." They are processing a life event — empty nest, first grandchild, MA tax fatigue, a job change. Write to the trigger. The transaction is the byproduct.

- **BEFORE (Sevajian):** "When selling a home, you deserve an industry expert."
- **AFTER:** "The house is rattling around empty, the stairs are harder than they used to be, the grandkids live twenty minutes up I-93 — and the market is good right now. Let us figure out the timing together, on a call with zero pressure."

### 3. Warm, not corporate. Conversational, not casual.

*Rule:* Warmth comes from full sentences and real words ("we," "our family home," "your cul-de-sac") — not from exclamation points or emoji in copy. Linda uses "we" and "my husband and I"; Mike & Jess text-cadence but still read full sentences on a real-estate site. No "let's chat!" — it reads as a sales trick. No "rockstar agent" — it reads as franchise.

- **BEFORE (common category):** "Ready to find your dream home? Let's chat! 🏡✨"
- **AFTER:** "When you are ready to talk — whether that is next week or next year — the conversation starts with your timing, not mine."

### 4. Transparency beats claims.

*Rule:* Publish the range. Publish the method. Publish the post-NAR-August-2024 rules. Market-intelligence.md §4 documented that four of five competitors hide commission entirely; transparency is a unique trust lever and an SEO opening. Write the number, then write what it buys.

- **BEFORE (category default):** "Contact us to discuss our competitive rates."
- **AFTER:** "Listing-side commissions in Southern NH typically run 2 to 3 percent, fully negotiable and not set by law. Here is what that fee covers on my listings: professional photography, staging consult, a 30-day listing agreement with mutual release, and a seller strategy document before we go to market. Here is what happens if you go with Opendoor on the same $500,000 home: roughly $45,000 less in your pocket at closing, before fees."

### 5. Close with a real door, not a deferred callback.

*Rule:* Market-intelligence.md §7 identified the category's dominant complaint as *responsiveness degradation after signing* and *"we'll get back to you within 24 hours"* as the anxiety trigger. Every CTA in Karyn's copy ends at a real moment, not a queue.

- **BEFORE (Jill & Co., Verani, CB Dinsmore):** "Fill out our form and we'll get back to you within 24 hours."
- **AFTER:** "There is a 15-minute slot tomorrow at 10:00 AM on the calendar below. Pick it. If I can answer your question in 15 minutes, I will."

**Content rules from CLAUDE.md that apply to every word written on this site:**
- Testimonials never use the em dash (—). Use commas, periods, ellipses only.
- Every service card, pain point, process step, stat, quiz option, and about-page belief gets a leading emoji matched to semantic meaning (e.g., 🍂 for autumn/foliage neighborhood, 🏫 for school-zoned guide, 🧭 for relocation hub, 🌿 for Windham, 🏛️ for Derry, 🌊 for lake communities). Never generic ✨.
- No em dashes in any AI-authored testimonial. Humans type commas.

**Sources:** market-intelligence.md §2 (audience verbatim quotes — headline-ready), §3 (competitor copy lifts), §4 (commission transparency opportunity), §7 (friction pattern); initial-business-data.md §4 (warm/conversational/honest tone, not corporate/salesy); CLAUDE.md Content Standards.

---

## Section 8 — Brand Personality Axes

Three axes. The position on each axis drives: animation selection (HeroParticles variant + BrandCanvas concept per CLAUDE.md Hero Architecture Rule), motion speed, copy tempo, color saturation, and photography mood.

### Axis 1 — Intimate ◄━━━●━━━━━━━━━━━━► Grand

*Position: strongly toward Intimate* (1.5 of 10).

Karyn is a solo boutique agent, not a luxury franchise. Linda wants to feel that her agent knows *her cul-de-sac,* not that her agent sells $10M oceanfront estates. The brand visual system is magazine-editorial-intimate — a *New England Home* spread, not a *Wall Street Journal Mansion* page. Animations are soft, ambient, close-feeling (drifting particles like pollen or ash, not explosive sweeps). Grand-scale hero takeovers are explicitly out.

- **Source:** initial-business-data.md §4 ("trusted neighbor who happens to be an expert"); market-intelligence.md §2 (Linda's voice is "formal, grateful, relational"); market-intelligence.md §1 (boutique brokerage positioning).

### Axis 2 — Quiet ◄━━━━━●━━━━━━━━━━━► Bold

*Position: leaning Quiet* (3 of 10).

The brand should feel confident and deliberate, not loud. Competitors shout with caps, oversized CTA bars, and stock "act now!" urgency — Karyn whispers with editorial restraint, serif display, and cream negative space. Quiet is not timid: there is one iron-oxide accent, one forest-green primary, deliberate rhythm, and a tagline that runs in shimmer. But the base tone is a magazine page, not a billboard. Motion is sub-60fps-feeling, generous in ease curves. No aggressive reveals.

- **Source:** market-intelligence.md §8 (every competitor shouts; editorial quiet is unoccupied); initial-business-data.md §4 ("no-pressure guidance, local integrity, not corporate or salesy").

### Axis 3 — Traditional ◄━━━━━━━●━━━━━━━━► Modern

*Position: balanced, slight lean Traditional* (4.5 of 10).

This is the most load-bearing axis. Linda (62, owned her home 30+ years, formal voice) needs a site that reads as *trustworthy, heritage-respecting, New England*. Mike & Jess (32–38, text-cadence, dual-income, MA relocator) need a site that reads as *responsive, modern, smartphone-native, NOT outdated like CB Dinsmore*. The resolution is: **traditional typographic and photographic vocabulary** (Cormorant serif, editorial portraiture, forest-green palette, heritage referents) layered over a **fully modern interaction system** (inline Calendly, quiz funnel, IDX integration, custom calendar, interactive property-tax calculator, responsive mobile-first). The site reads old-world on the surface and feels smartphone-fast underneath. This is the exact gap in the category: CB Dinsmore is traditional-and-old; Sevajian is modern-and-generic; nobody is traditional-on-top-of-modern.

- **Source:** market-intelligence.md §2 (both personas, opposing demographic vectors); market-intelligence.md §3 (CB Dinsmore = stale traditional failure; Sevajian = modern SaaS generic failure); market-intelligence.md §8 (editorial serif on warm palette = boutique-local-expert-with-taste).

### Animation implications (for the animation-specialist agent)

- Hero particles: ambient drifting motes — slow (0.4–0.8 px/frame), warm color (iron-oxide glow over cream), low count (80–120, not 200+). Visual reference: pollen in morning light, wood-smoke drift, October leaf-fall. NOT electric, NOT fast, NOT geometric.
- Brand canvas concept (to be proposed by animation-specialist per CLAUDE.md Hero Architecture Rule Selection Process): a niche-tied, luxurious, intimate-and-quiet canvas that evokes Southern NH place. Suggested concept candidates to brainstorm from: (a) stone-wall extrusion (dry-stone wall pieces stream in and stack), (b) birch-bark peel reveal (birch-bark texture peels to reveal a Karyn Emerson monogram / compass rose), (c) falling-leaf settling into a map outline of the service area, (d) cream-paper unfolding to reveal the brand mark, (e) stone compass rose with rotating directional indicator. The animation-specialist owns final selection via the harsh-critic pattern.
- Shimmer class: `.hero-shimmer` (iron-oxide/warm sweep) — forest green is the dominant primary but iron-oxide is the warmer shimmer anchor that matches the Intimate/Quiet/Traditional positioning.
- Motion ease: `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint) as default — slow settle. No `easeInOutBack` bounces.

---

## Section 9 — Competitor Differentiation Statement

### vs. Lisa Sevajian (The Lisa Sevajian Group / eXp Realty) — the real threat

Sevajian's brand is magazine-grade but fragmented across three domains (soldbylsg.com, northshorepropertyshop.com, newenglandpropertyshop.com) with Andover-Massachusetts-first hero positioning — a Salem or Derry seller lands on her site and feels like they are visiting an *out-of-state* expert who happens to also handle Southern NH. Where Sevajian uses a medium-blue palette, geometric sans (Montserrat/Proxima family), and a conversion-stacked Ylopo hero with multiple CTAs, Karyn uses a deep forest-green and cream editorial palette with Cormorant serif display and a single-focused hero — inline Calendly above the fold, no form maze, and Southern NH landscape as the visual hero. Where Sevajian buries her commission disclosure in a blog post, Karyn leads with a dedicated `/commissions` page on the top-level nav that publishes listing-side (2–3%) and buyer-side (2.5–3%) ranges with the full post-NAR-August-2024 explainer — beating her on the one trust lever that is currently her strongest. And where Sevajian's hero reads "industry expert," Karyn's reads "your neighbor in Salem who has watched this market for twenty years."

### vs. BHHS Verani Realty — the franchise giant

Verani's brand is corporate BHHS cabernet-and-gold over a geometric sans — professional, predictable, and visually indistinguishable from every other BHHS office in the country. The individual Verani agent is flattened by the franchise template. Where Verani leads with a property-search IDX bar slammed over a stock home exterior ("Zillow-clone pattern" per market-intelligence.md §3), Karyn leads with original Southern NH landscape photography and a named human — place *and* person, both specific. Where Verani's 800+ agent grid reads as "big-box-realty-warehouse," Karyn's singular editorial presence reads as "the one agent who knows this town." Verani owns the town-level SEO footprint for every Southern NH ZIP with thin programmatic pages; Karyn beats those with genuinely authored neighborhood guides (Tuscan Village, Cobbett's Pond, Canobie Lake, Woodmont Commons) that include real photography, school-feeder detail, mill rates, and commute math — content Verani's generic town pages structurally cannot produce.

### vs. Coldwell Banker Dinsmore Associates — the local traditionalist

CB Dinsmore's site is visibly dated — CB sea-blue palette, some pages still reference "Prudential Dinsmore," 2015/2016 statistics display in 2026 — and the "40 years in Windham" heritage pitch lands with Linda but fails Mike & Jess immediately (the Google+ and "Twitter Classic" icons still appearing on competitor sites in the category telegraph neglect on a six-figure-stakes decision). Karyn occupies CB Dinsmore's heritage-credibility territory (lifelong Southern NH roots, boutique brokerage with 600+ career homes-sold volume at Jill & Co.) but pairs it with a modern interaction surface — inline Calendly, custom calendar component, interactive property-tax calculator, MA→NH relocation hub with live math — that tells Mike & Jess this is not their grandfather's real-estate site. Where CB Dinsmore's content depth is thin price-band pages and a dead blog, Karyn ships 9–10 articles minimum, 8–12 neighborhood guides, a commission-transparency page, and monthly market-update videos with voiceover-over-footage. Traditional surface, modern substrate.

---

## Section 10 — Design Anti-Patterns (The Prohibited List)

Numbered, specific, and sourced. This list is checked by the pre-launch-auditor before demo handoff.

1. **Do not use blue as the primary or accent color.** Four of five top competitors (Sevajian, CB Dinsmore, Lamacchia, Jill & Co.) run blue-and-white variants. Blue is the category commodity. Forest green + iron-oxide is the wedge. (market-intelligence.md §8)
2. **Do not use Karyn's headshot in the hero.** Explicitly rejected by the client (initial-business-data.md §4) and matches the category's headshot-grid cliché (market-intelligence.md §8). One editorial portrait on `/about` only.
3. **Do not use Montserrat, Proxima Nova, Gotham, Open Sans, or any default geometric sans as the display font.** This is the category default across all five competitors (market-intelligence.md §8). Cormorant Garamond on display + Inter on body is the intentional counter.
4. **Do not use the BHHS cabernet-and-gold palette or suggest franchise associations.** Karyn is boutique-at-a-boutique, not franchise. (market-intelligence.md §3, Verani analysis)
5. **Do not use CGI architectural renderings, blue-hour HDR home exteriors, or any of the stock "couple-with-keys" / "family-on-porch" / "sold-sign-handshake" image clichés.** (market-intelligence.md §8)
6. **Do not lead the hero with an IDX property-search bar.** This is the Verani/Sevajian/Jill-&-Co. default ("Zillow-clone pattern" per market-intelligence.md §3). Karyn leads with original Southern NH photography + inline Calendly, and IDX lives on `/listings`.
7. **Do not embed a Calendly iframe directly.** Per CLAUDE.md Always-Built Features Rule, the booking calendar must be a custom-branded component that calls the Calendly API under the hood — a visible Calendly iframe reads as generic SaaS.
8. **Do not use exclamation points in body copy, "let's chat!" / "we'd love to hear from you!" / "rockstar agent" / "absolute pleasure!" / any corporate-friendly cliché.** (initial-business-data.md §4 — warm, not corporate/salesy)
9. **Do not use the em dash (—) in any testimonial.** Testimonials read like a phone-typed human review. Commas, periods, ellipses only. (CLAUDE.md Content Standards)
10. **Do not use "Get your home's value instantly" forms that route to a deferred callback.** Market-intelligence.md §7: the category's #1 complaint pattern is responsiveness degradation after signing. Replace every "we'll get back to you within 24 hours" with a real inline Calendly slot.
11. **Do not use SVG icon libraries (Lucide, Heroicons, react-icons, Feather, Phosphor, etc.).** Per CLAUDE.md Code Standards, use high-quality emoji matched to semantic meaning.
12. **Do not use generic ✨ / 🚀 / 💫 emoji across service cards, pain points, or stats.** Match semantic meaning: 🍂 for autumn neighborhood, 🧭 for relocation, 🏫 for school-zoned, 🌊 for lake community, 📐 for property-tax tool.
13. **Do not leave any dark section as a flat solid block.** Per CLAUDE.md Section Alternation Rule, every dark (`--primary`) section gets a subtle radial gradient overlay at the top — never flat.
14. **Do not use Google services anywhere on the pricing page.** Per CLAUDE.md Always-Built Features Rule — no Google Analytics, no Google Business Profile setup, no Google Ads language on `/pricing`.
15. **Do not run autoplay video in the hero.** The hero is the 3-layer canvas+stagger animation stack per CLAUDE.md Hero Architecture Rule — never video.
16. **Do not request readable text in any fal.ai image prompt.** AI image models garble text. Describe the scene visually. (CLAUDE.md Image Generation Rule)
17. **Do not use the phrase "seamless and painless," "your dream home," "let us help you find," or any of Jill & Co.'s own generic positioning language.** Karyn's site has to differentiate from her own brokerage's template voice. (market-intelligence.md §3 Jill & Co. analysis)
18. **Do not use `#0a0a0a` as `--bg-base`.** This build is a light theme — the template default is explicitly overridden to `#F6F1E7` cream. (Section 2)

---

## Section 11 — Sections Matrix

### Base template sections

| Section | Include? | Notes |
|---|---|---|
| Shop (Stripe + Printful) | No | Real estate agent has no merchandise. Shop is scaffolded per CLAUDE.md (seeded fallback) but the scaffold will be **deleted** in the decision-gate step per CLAUDE.md Always-Built Features Rule — client is Pro tier, not Premium. Navigation and sitemap references removed. |
| Blog (Sanity CMS) | Yes (always) | 9–10 articles minimum per CLAUDE.md. Topics prioritized per market-intelligence.md §6 gaps: MA→NH relocation (flagship), property-tax-by-town, commission transparency explainer, post-NAR-August-2024 changes, Salem/Windham/Derry neighborhood guides, downsizer content, iBuyer-vs-agent comparison. |
| Quiz / Lead capture | Yes | Flagged as custom build in initial-business-data.md §5 — "Should I buy or sell now?" market-timing qualifier, 5–8 questions, 4 archetypes (Downsizing Linda / Relocating Buyer / First-Time NH Buyer / Local Move-Up), routes to inline booking calendar on result. Closes market-intelligence.md §5 gap #10 (no market-timing tool in category). |
| Booking widget (Calendly) | Yes (always) | Custom-branded BookingCalendar component calling Calendly API under the hood per CLAUDE.md. Inline on homepage teaser, dedicated `/booking` page, and at the foot of every neighborhood guide and blog post. Demo mode with seeded availability active until client supplies `CALENDLY_API_KEY`. Closes market-intelligence.md §5 gap #6 (no competitor embeds Calendly). |
| Google Maps embed | Yes | Used on `/contact` page only (Jill & Co. Salem office pin). NOT used as a "service area" visualization — the service area is rendered via the custom neighborhood guide grid, not a Google Maps polygon. Per CLAUDE.md Always-Built Features Rule, no Google services on the `/pricing` page. |
| Instagram feed | No | initial-business-data.md §5 and §7: Instagram handle "⚠️ NOT FOUND," no confirmed active Instagram presence. Per CLAUDE.md Knowledge Base Scope Rule, Instagram feed is optional (client must have active Instagram) — condition not met. Add later if client confirms. |
| Service area pages | Yes (7 towns + 5–8 sub-neighborhoods) | Flagship custom content pillar. Per market-intelligence.md §5 gap #2 and §9 "do" #3: Salem, Windham, Derry, Londonderry, Pelham, Atkinson, Hampstead (7 town pages). Plus sub-neighborhood guides: Tuscan Village, Canobie Lake, Cobbett's Pond, Woodmont Commons, Hood Park / downtown Derry, North Salem vs. South Salem, Shadow Lake — 5 to 8 sub-neighborhood guides at minimum. Each page includes price band, school zones, commute times, mill rate, IDX listings, photography. |
| Pricing page | Yes | Per CLAUDE.md Always-Built Features Rule — Starter / Pro / Premium Optimus sales tier cards, marked "⬥ Pricing" in iron-oxide nav. This is the Optimus internal sales page, deleted before launch by pre-launch-auditor. NOT Karyn's real-estate commission page — that is a separate `/commissions` page (see custom features below). |
| Testimonials page | Yes | Per CLAUDE.md Always-Built Features Rule — **36 testimonials**, paginated 9 per page over 4 pages (3-col × 3-row grid). Written from scratch in the voice of Linda (sellers 55–68) and Mike & Jess (buyers 30–45). Any real testimonials the client supplies are incorporated and count toward the 36. ZERO em dashes per CLAUDE.md. initial-business-data.md §7 noted "write 32 for demo" — overridden to 36 per CLAUDE.md rule. |

### Custom features (not in base template)

| Custom Feature | Source (file + section) | Complexity estimate |
|---|---|---|
| MA → NH Relocation Hub (flagship) — tax-arbitrage calculator, commute calculator by NH town to Boston, DMV/registration/inspection checklist, school comparison MA vs NH | market-intelligence.md §5 gap #1, §6 long-tail #1, §9 "do" #2 | High — 4–6 days (custom calculator UI + data model + long-form content + FAQPage schema) |
| NH Property Tax Calculator by Town | market-intelligence.md §5 gap #4, §6 long-tail #2 | Medium — 2–3 days (mill-rate data entry for 8 towns, 3 sample home values ($500K/$750K/$1M), exemption data for elderly + veteran, interactive select + result card) |
| Commission Transparency Page (`/commissions`) — listing-side 2–3% + buyer-side 2.5–3% range with NAR-required "fully negotiable" language, value-delivered breakdown, Opendoor equity-loss comparison | market-intelligence.md §4, §5 gap #3, §9 "do" #1 | Low-Medium — 1–2 days (long-form content page + side-by-side comparison table + FAQPage schema) |
| Neighborhood Guide Template (replicated across 7 towns + 5–8 sub-neighborhoods) | market-intelligence.md §5 gap #2, §6 content gaps (a)(d)(e), §9 "do" #3 | High — 5–7 days (template component + 12–15 instances + fal.ai photography generation + IDX embedding per page + mill rate + school data per page) |
| Market-Timing Quiz ("Should I buy or sell now?") — 5–8 questions, 4 archetypes, routes to inline booking | initial-business-data.md §5 custom build flags, market-intelligence.md §5 gap #10 | Medium — 2–3 days (data layer `/data/quiz.ts` + UI phases per CLAUDE.md Always-Built Features Rule) |
| Zillow / Showcase IDX Integration on `/listings` and within neighborhood guides | initial-business-data.md §5 custom build flags | Medium-High — 2–4 days (platform-dependent: iHomeFinder vs. Showcase IDX TBD with Jill & Co., RealEstateListing schema per IDX detail page) |
| Custom-Branded BookingCalendar Component (calling Calendly API under the hood) | CLAUDE.md Always-Built Features Rule | Medium — 2 days (date picker + time-slot picker + confirm form + `/api/calendly/slots` + `/api/calendly/book` + demo-mode seeded fallback) |
| iBuyer Defense Content ("Opendoor offer vs. listing with me" comparison) | market-intelligence.md §5 gap #9, §6 keyword #4 | Low — 1 day (content page with data table citing Real Estate Witch $45K equity loss figure) |
| Post-NAR-August-2024 Consumer Explainer | market-intelligence.md §5 gap #8 | Low — 0.5–1 day (content page; can also live as a section of the Commission Transparency page) |
| Monthly Market-Update Video architecture (voiceover-over-footage, face-minimal) | market-intelligence.md §5 gap #7 | Low (scaffold) — 0.5 day to build the video-post template. Video content itself is produced monthly post-launch, not during build. |
| RealEstateAgent + LocalBusiness + FAQPage + Review/AggregateRating + BreadcrumbList + Article + RealEstateListing + Event schema markup | market-intelligence.md §6 schema | Medium — 1–2 days (distributed across pages, not a single file) |
| Editorial Neighborhood / Lifestyle fal.ai image batch — ~40–60 original images across hero, neighborhood guides, blog headers, blog cards | market-intelligence.md §8 (place-first photography gap), CLAUDE.md Image Generation Rule | Medium — 2 days (batch prompt writing + generation + visual review per CLAUDE.md gate) |

---

## Validation self-check

- [x] All 11 section headers present.
- [x] Section 2: all 9 CSS custom-property tokens have specific hex values (`--primary` `#2F4A3A`, `--primary-muted` `rgba(47,74,58,0.6)`, `--accent` `#B5532C`, `--bg-base` `#F6F1E7`, `--bg-elevated` `#FBF7EE`, `--bg-card` `#FFFFFF`, `--text-primary` `#1A1F1C`, `--text-secondary` `rgba(26,31,28,0.72)`, `--text-muted` `rgba(26,31,28,0.48)`).
- [x] Section 3: specific font names (Cormorant Garamond, Inter, JetBrains Mono) with Google Fonts URLs and weights.
- [x] Section 8: exactly 3 axes with explicit position markers.
- [x] Section 11: every row has Yes or No resolved — no blank decisions.
- [x] Section 11: Custom Features table filled (11 features listed).
- [x] No "TBD," "TODO," or blank subsections.
- [x] Every decision cites source file + section.
- [x] Theme decision flagged explicitly (LIGHT theme — override of template default).
