// =============================================================================
// blogPosts.ts — Karyn Emerson blog seed entries (9 articles)
// OWNED BY: frontend-developer agent (Stage 1E Wave C)
//
// Source material:
//   - c:/Projects/Karyn-Emerson/market-intelligence.md §6 (content gaps + long-tail queries)
//   - c:/Projects/Karyn-Emerson/design-system.md §11 (Blog: Yes always, 9–10 articles)
//   - c:/Projects/Karyn-Emerson/CLAUDE.md (blog always built, Content Standards)
//
// Voice: Karyn. Place-first, warm editorial. ZERO em dashes in body copy.
// Commas, periods, ellipses only. Short sentences.
//
// All body copy is flagged [DEMO COPY — pending full Stage 1F article build].
// The scaffolding (slug, category, date, reading time, hero image path, schema data)
// is production-ready. Full long-form content is written in Stage 1F.
// =============================================================================

export type BlogCategory =
  | "Relocation"
  | "Taxes"
  | "Commission"
  | "Selling"
  | "Buying"
  | "Neighborhoods";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  publishedAt: string; // ISO 8601
  readingTime: string;
  heroImage: string; // absolute path under /public (3:2 — 1600x1067)
  cardImage: string; // absolute path under /public (3:2 crop — 600x400)
  body: string[]; // array of paragraphs
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Relocation",
  "Taxes",
  "Commission",
  "Selling",
  "Buying",
  "Neighborhoods",
];

export const blogPosts: BlogPost[] = [
  // 1. Relocation flagship — market-intelligence.md §6 long-tail #1
  {
    slug: "moving-from-massachusetts-to-southern-nh-honest-guide",
    title: "Moving from Massachusetts to Southern New Hampshire: The Honest Guide",
    excerpt:
      "The tax math, the commute reality, the DMV checklist, and which Southern NH town actually fits the life you are trying to build. No sales pitch, just the real numbers.",
    category: "Relocation",
    author: "Karyn Emerson",
    publishedAt: "2026-03-18",
    readingTime: "9 min read",
    heroImage: "/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-hero.jpg",
    cardImage: "/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "Every week I get a call that starts the same way. A couple in Methuen, Lawrence, Woburn, or Andover is tired of Massachusetts taxes, the commute is already an hour, and they have heard that crossing the border into Salem or Windham is the move. They want to know if it is actually true.",
      "The short answer is yes, usually. The longer answer has four parts: the tax math, the commute, the DMV and registration paperwork, and picking the right Southern NH town for the life you actually live. I walk every relocating client through all four, in this order, before we ever open Zillow.",
      "This guide is what I send to clients before our first call. It is the honest version, not the Chamber-of-Commerce version. Some things are better in NH. A couple of things are worse. The net is almost always in your favor, but the details matter.",
    ],
  },

  // 2. NH Property Tax by Town — market-intelligence.md §5 gap #4, §6 long-tail #2
  {
    slug: "nh-property-tax-by-town-salem-windham-derry",
    title: "NH Property Tax by Town: What You'll Actually Pay in Salem, Windham, and Derry",
    excerpt:
      "A side-by-side look at mill rates, exemptions, and the annual bill you should expect on a $500K, $750K, or $1M home in the three towns that buyers compare most often.",
    category: "Taxes",
    author: "Karyn Emerson",
    publishedAt: "2026-03-05",
    readingTime: "7 min read",
    heroImage: "/images/blog/nh-property-tax-by-town-salem-windham-derry-hero.jpg",
    cardImage: "/images/blog/nh-property-tax-by-town-salem-windham-derry-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "New Hampshire has no income tax, but the property tax is the trade. Every town sets its own mill rate, and the spread between Salem, Windham, and Derry is bigger than most buyers realize when they are cross-shopping.",
      "The rule of thumb people repeat is that NH property taxes are higher than MA, and that is often true on a per-thousand-dollar basis. The piece people leave out is that home values and assessment practices differ by town, and the elderly and veteran exemptions move the actual bill meaningfully.",
      "Here is the three-town comparison I walk through with every relocating client, for a home at $500K, $750K, and $1M. Numbers are current mill-rate estimates and assume no exemptions unless noted.",
    ],
  },

  // 3. Commission Transparency — market-intelligence.md §4, §5 gap #3, §9 "do" #1
  {
    slug: "two-to-three-percent-commission-explained-post-august-2024",
    title: "The 2-to-3% Commission Explained: How I'm Paid Post-August-2024",
    excerpt:
      "After the NAR settlement, commission rules changed for every buyer and seller in the country. Here is what actually shifted, what the range looks like on a Salem or Windham sale, and what the fee covers on my listings.",
    category: "Commission",
    author: "Karyn Emerson",
    publishedAt: "2026-02-22",
    readingTime: "8 min read",
    heroImage: "/images/blog/two-to-three-percent-commission-explained-post-august-2024-hero.jpg",
    cardImage: "/images/blog/two-to-three-percent-commission-explained-post-august-2024-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "August 17, 2024 was the day real-estate commissions changed for every buyer and seller in the country. The NAR settlement ended the practice of a seller automatically offering a buyer-agent commission through the MLS. Since then, every side of every deal is its own conversation.",
      "Listing-side commissions in Southern NH typically run 2 to 3 percent. Buyer-side commissions run 2.5 to 3 percent. Every number is fully negotiable and not set by law. Any agent who tells you their rate is fixed is either uninformed or not telling you the truth.",
      "On my listings, the listing-side fee covers professional photography, a staging consult, a 30-day agreement with mutual release, and a written seller-strategy document before we ever go to market. That is what you are paying for. Here is the full breakdown.",
    ],
  },

  // 4. Downsizing — initial-business-data.md Linda persona
  {
    slug: "downsizing-in-southern-nh-selling-family-home-after-40-years",
    title: "Downsizing in Southern NH: Selling the Family Home After 40 Years",
    excerpt:
      "The emotional piece nobody talks about, the practical piece every agent skips, and the timing decisions that actually matter when you are leaving the house you raised your family in.",
    category: "Selling",
    author: "Karyn Emerson",
    publishedAt: "2026-02-10",
    readingTime: "10 min read",
    heroImage: "/images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-hero.jpg",
    cardImage: "/images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "The house is too big. The stairs are harder than they used to be. The grandkids live twenty minutes up I-93 and you are tired of driving to them instead of the other way around. Downsizing is not a transaction. It is a transition, and the agent you pick should know the difference.",
      "Most of my downsizer clients have been in the same home for 30, 40, or 45 years. The conversation does not start with a listing price. It starts with a walk through the house, a kitchen-table chat, and a real assessment of what the move looks like. Where are you going next. What is the timing. What are the grandkids' school schedules this year.",
      "Once the plan is clear, the mechanics follow. Listing price, staging, photography, the right week to go to market, how to time the sale with the next move so you are not storing furniture for three months. That is the part I handle. The decision is yours and it should not be rushed.",
    ],
  },

  // 5. First-Time Buyer Checklist — buyer persona
  {
    slug: "first-time-homebuyer-checklist-southern-nh-septic-well-pns",
    title: "First-Time Homebuyer Checklist for Southern NH: Septic, Well, P&S",
    excerpt:
      "If this is your first house, and it is in NH, there are five things your MA friends never had to worry about. Septic inspections, well water, the P&S, the NH inspection sticker, and the town-level zoning surprise.",
    category: "Buying",
    author: "Karyn Emerson",
    publishedAt: "2026-01-28",
    readingTime: "8 min read",
    heroImage: "/images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-hero.jpg",
    cardImage: "/images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "First house, first offer, first P&S. I answer texts at 11pm for a reason. Buying a house in Southern NH has a few wrinkles that first-time buyers coming from MA or RI have never dealt with, and the five most important ones are all on this list.",
      "Septic systems are the big one. A significant share of Salem, Windham, Pelham, Atkinson, and Hampstead homes are on private septic, not town sewer. That means a septic inspection during due diligence, a pump-out schedule you need to understand, and a maintenance reality you should price into the total cost of ownership.",
      "Well water is the next one. Then the P&S language that is specific to NH contracts, then the annual NH safety inspection sticker that surprises every MA-transplant driver, then the town-level zoning quirk that will determine whether you can ever add a deck, an ADU, or a detached garage. All five are covered below.",
    ],
  },

  // 6. Salem neighborhood guide — content-gap #2
  {
    slug: "living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know",
    title: "Living in Salem NH: Tuscan Village, Canobie Lake, and the Streets You Don't Know Yet",
    excerpt:
      "Salem is not one place. It is at least four neighborhoods stitched together, and the difference between them is bigger than any out-of-town buyer realizes. Here is the local's map, drawn street by street.",
    category: "Neighborhoods",
    author: "Karyn Emerson",
    publishedAt: "2026-01-15",
    readingTime: "11 min read",
    heroImage: "/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-hero.jpg",
    cardImage: "/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "If you are moving to Salem from outside of Southern NH, you have probably pictured one Salem. The mall exit, Canobie Lake, the Market Basket, the commuter plazas along Route 28. That is the visitor's Salem. The local Salem is at least four different places, each with its own price band, its own streets, and its own feel.",
      "North Salem has the older colonials, the quiet side streets off Route 111, and the closest thing to rural character Salem still has. Downtown Salem is the walkable strip, the older housing stock, the coffee shops and restaurants that turned over in the last five years. Tuscan Village is the new build side, townhomes and condos and the grocery-anchored shopping. And the Canobie Lake side is the summer-lake character folded into a year-round community.",
      "Each of the four has a different median price, a different school-bus pickup, a different commute story, and a different resale pattern. This is the guide I wish every out-of-town buyer had before they started the drive up I-93. Street by street, with the real local's detail.",
    ],
  },

  // 7. MA Commuter Tax — market-intelligence.md §6 long-tail
  {
    slug: "commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax",
    title: "The Commuter-Tax Trap: Why Moving to NH Doesn't Erase MA Income Tax",
    excerpt:
      "The single biggest surprise for MA-to-NH movers who keep commuting to Boston. If you earn your income in Massachusetts, Massachusetts still wants a piece. Here is what that actually costs, and the three legal ways to change the math.",
    category: "Relocation",
    author: "Karyn Emerson",
    publishedAt: "2026-01-02",
    readingTime: "6 min read",
    heroImage: "/images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-hero.jpg",
    cardImage: "/images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "The pitch for moving to New Hampshire usually starts with no income tax. That line is technically true and practically misleading if you are still commuting to Boston or working for a Massachusetts employer. MA taxes the income earned inside its borders regardless of where you live. If your W-2 says Cambridge and your address says Salem, you are still a MA taxpayer for that income.",
      "The number matters. On a $140K salary earned in MA, Massachusetts income tax is roughly $6,720 at the 5% flat rate, plus the recent millionaires surtax on the top slice of higher earners. Crossing the border saves you the NH property-tax differential only, not the MA tax, if your job is still there.",
      "There are three legal ways to change the math: the employer moves you to a fully-remote W-2 based in NH, you switch to a NH-based employer, or you become self-employed or consulting from NH and the work is performed there. Each has tradeoffs. I will walk you through which one applies to your situation before we even list a house.",
    ],
  },

  // 8. iBuyer Defense — market-intelligence.md §5 gap #9
  {
    slug: "opendoor-vs-listing-with-agent-45000-math-on-500k-home",
    title: "Opendoor vs. Listing with an Agent: The $45,000 Math on a $500K Home",
    excerpt:
      "The Opendoor offer is fast, clean, and final. It is also, on the Real Estate Witch national average, about $45,000 below what the same home would sell for with an agent. Here is the breakdown on a typical Salem colonial.",
    category: "Selling",
    author: "Karyn Emerson",
    publishedAt: "2025-12-18",
    readingTime: "7 min read",
    heroImage: "/images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-hero.jpg",
    cardImage: "/images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "Opendoor is not evil. It is a real service, it closes fast, and for a specific seller in a specific situation it is the right call. For most Southern NH sellers on a typical $500K home, it costs roughly $45,000 in equity versus a traditional listing, and the sellers I talk to usually have no idea the number is that big.",
      "Real Estate Witch ran the national numbers in 2024. iBuyer offers average 70 to 80 percent of fair market value. Add the service fee, which typically runs 5 percent or higher on the gross offer. Subtract minor repair deductions that show up in the final contract. Net, the seller walks away with about $45,000 less on a $500K home than the same house would net with a conventional agent-led sale.",
      "There are sellers for whom that tradeoff is correct. An estate sale on a tight timeline, a job relocation with no buffer, a house that needs work the seller cannot finance. For everyone else, the math is not subtle. I will run it for your exact house, with your exact condition, before you ever sign an offer.",
    ],
  },

  // 9. Neighborhood comparison — market-intelligence.md §6 content gaps (d)(e)
  {
    slug: "windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town",
    title: "Windham, Derry, or Londonderry? A Buyer's Guide to Picking the Right Southern NH Town",
    excerpt:
      "Three towns, three price bands, three school-district realities, and three very different weekend lives. The honest comparison for buyers trying to decide between them.",
    category: "Neighborhoods",
    author: "Karyn Emerson",
    publishedAt: "2025-12-04",
    readingTime: "10 min read",
    heroImage: "/images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-hero.jpg",
    cardImage: "/images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-card.jpg",
    body: [
      // [DEMO COPY — pending full Stage 1F article build]
      "Three towns, ten miles apart, and the wrong one picked at the closing table is a mistake you feel every day for a decade. Windham, Derry, and Londonderry are the three Southern NH towns buyers cross-shop most often, and each one tells a very different story once you live there.",
      "Windham is the premium. The median home price sits meaningfully above the other two, the school district is a consistent draw, and Cobbett's Pond and the town forest define the weekend life. The tradeoff is price and the pace of new inventory, which runs thin for months at a time.",
      "Derry is the middle ground with a wider spread. Hood Park and the downtown revival have changed the conversation, Pinkerton Academy anchors the school story with its own complicated reputation, and you can still find entry-level houses that Windham stopped offering a decade ago. Londonderry is its own third thing, with a different school feeder system, the apple-orchard character on the eastern side, and a price point that sits between the other two. Here is how I help buyers sort through the three.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  slug: string,
  category: BlogCategory,
  limit = 3,
): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
