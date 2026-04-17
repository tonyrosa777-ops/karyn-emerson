// =============================================================================
// neighborhoods.ts — Southern NH neighborhood guide data (7 towns + 6 sub-neighborhoods)
// OWNED BY: frontend-developer agent (Stage 1E Wave B2)
// Source material:
//   - c:/Projects/Karyn-Emerson/design-system.md §11 (Service area pages row)
//   - c:/Projects/Karyn-Emerson/market-intelligence.md §4 (NH median 2025 $496,656–$534,500;
//     Windham ~$732K), §5 gap #2, §6 content gaps (a)(d)(e), §9 "do" #3
//   - c:/Projects/Karyn-Emerson/karyn-emerson/src/data/site.ts (serviceArea — 7 towns)
//
// Voice: Karyn. Place-first, warm, editorial. ZERO em dashes. Short sentences.
// Specific landmarks: Canobie Lake Park, Tuscan Village, Pinkerton Academy, Cobbett's Pond,
// Rockingham Park, Windham High, Hood Park, Woodmont Commons.
//
// Financial data: NH median 2025 is $496,656–$534,500 (market-intelligence.md §4), Windham
// ~$732K (same source). Town-level medians and NH mill rates below are demo estimates
// anchored to public 2024–2025 NH municipal figures and flagged [DEMO COPY — confirm with
// client]. Real IDX data and confirmed figures replace these post-launch.
// =============================================================================

export interface NeighborhoodSampleListing {
  address: string;
  beds: number;
  baths: number;
  price: number;
  sqft: number;
}

export interface NeighborhoodCommute {
  minutes: number;
  via: string;
}

export interface Neighborhood {
  slug: string;
  city: string;
  state: string;
  displayName: string;
  category: "town" | "sub-neighborhood";
  parentTown?: string;
  eyebrow: string;
  tagline: string;
  description: string;
  population: number;
  medianHomePrice: number;
  milRate: number;
  schoolDistrict: string;
  commuteToBoston: NeighborhoodCommute;
  highlights: string[];
  sampleListings?: NeighborhoodSampleListing[];
  heroImage: string;
  fallbackEmoji: string;
}

// -----------------------------------------------------------------------------
// TOWNS — 7 entries matching siteConfig.location.serviceArea
// -----------------------------------------------------------------------------
const towns: Neighborhood[] = [
  {
    slug: "salem",
    city: "Salem",
    state: "NH",
    displayName: "Salem",
    category: "town",
    eyebrow: "SALEM, NH",
    tagline: "The anchor town of Southern NH, right off Exit 2.",
    description:
      "Salem is where Southern NH meets the Massachusetts line. Tuscan Village has changed the shape of the town in five short years, and the original North Salem and South Salem pockets still trade like the small-town New England they always were. If you are weighing Salem against Windham or Methuen, the tax math and the commute almost always tell you which way to go.", // [DEMO COPY — pending client review]
    population: 29900, // [DEMO COPY — confirm with client]
    medianHomePrice: 565000, // [DEMO COPY — confirm with client]
    milRate: 19.85, // [DEMO COPY — confirm with client]
    schoolDistrict: "Salem School District / Salem High School",
    commuteToBoston: { minutes: 45, via: "I-93 via Exit 2" },
    highlights: [
      "🛍️ Tuscan Village — new-build townhomes, shops, and a Market Basket that changed the center of town",
      "🎢 Canobie Lake Park — a working piece of Salem history since 1902",
      "🛒 Rockingham Park legacy — the old racetrack footprint now hosts the LaBelle Winery concert grounds and big-box retail",
      "🏫 Salem High feeder lines matter on resale — North vs South Salem reads differently to buyers",
      "🚗 Three I-93 exits (1, 2, 3) split the town into three distinct commuter markets",
    ],
    sampleListings: [
      { address: "12 Hemlock Drive", beds: 4, baths: 2.5, price: 629000, sqft: 2480 },
      { address: "88 Policy Street", beds: 3, baths: 2, price: 489000, sqft: 1840 },
      { address: "4 Tuscan Village Way, Unit 204", beds: 2, baths: 2, price: 575000, sqft: 1520 },
    ],
    heroImage: "/images/neighborhoods/salem-hero.jpg",
    fallbackEmoji: "🍂",
  },
  {
    slug: "windham",
    city: "Windham",
    state: "NH",
    displayName: "Windham",
    category: "town",
    eyebrow: "WINDHAM, NH",
    tagline: "The premium school-district corner of the region.",
    description:
      "Windham is the highest-priced town in this service area and it is not an accident. Windham High graduates consistently place at the top of the state, Cobbett's Pond is a working-week escape you can walk to, and the inventory tends to turn in weeks rather than months. If you are coming from Andover or Lexington, Windham will feel the most familiar.", // [DEMO COPY — pending client review]
    population: 14900, // [DEMO COPY — confirm with client]
    medianHomePrice: 732000, // market-intelligence.md §4
    milRate: 19.4, // [DEMO COPY — confirm with client]
    schoolDistrict: "Windham School District / Windham High School",
    commuteToBoston: { minutes: 55, via: "I-93 via Exit 3" },
    highlights: [
      "🌊 Cobbett's Pond — year-round pond community, seasonal rentals, strong resale",
      "🎓 Windham High — top-performing public high school in Southern NH",
      "🌲 Windham Town Forest — 400+ acres of trails, ten minutes from the town center",
      "🏡 Large-lot colonials on Range Road, Roulston Road, and Morrison Road hold their value",
      "🚗 Exit 3 commute is roughly 10 minutes longer than Salem but often worth the school trade",
    ],
    sampleListings: [
      { address: "22 Range Road", beds: 4, baths: 3, price: 849000, sqft: 3120 },
      { address: "7 Cobbetts Pond Road", beds: 3, baths: 2, price: 695000, sqft: 2200 },
      { address: "41 Morrison Road", beds: 5, baths: 3.5, price: 925000, sqft: 3680 },
    ],
    heroImage: "/images/neighborhoods/windham-hero.jpg",
    fallbackEmoji: "🌊",
  },
  {
    slug: "derry",
    city: "Derry",
    state: "NH",
    displayName: "Derry",
    category: "town",
    eyebrow: "DERRY, NH",
    tagline: "The value play, with Pinkerton Academy on the label.",
    description:
      "Derry is the town that gives you the most home per dollar in the service area. Pinkerton Academy is the anchor, a 3,000-student private-independent high school that most of the region sends its kids to on public-school tuition. Downtown Derry around Hood Park has quietly become walkable again. The housing stock is everything from 1840s capes on Hampstead Road to new builds near Beaver Lake.", // [DEMO COPY — pending client review]
    population: 34200, // [DEMO COPY — confirm with client]
    medianHomePrice: 485000, // [DEMO COPY — confirm with client]
    milRate: 26.15, // [DEMO COPY — confirm with client]
    schoolDistrict: "Derry Cooperative School District / Pinkerton Academy",
    commuteToBoston: { minutes: 55, via: "I-93 via Exit 4" },
    highlights: [
      "🎓 Pinkerton Academy — regional independent high school, anchors the whole district",
      "🏛️ Hood Park and downtown Derry — walkable main street, Derry Opera House, farmers market",
      "🌳 Beaver Lake and Ballard Pond — two small lake neighborhoods inside town limits",
      "📐 Best price-per-square-foot in the service area outside of Pelham",
      "🚗 Exit 4 commute adds 5 to 10 minutes over Salem but the savings on the house cover it",
    ],
    sampleListings: [
      { address: "14 Hampstead Road", beds: 3, baths: 2, price: 429000, sqft: 1780 },
      { address: "9 Beaver Lake Avenue", beds: 4, baths: 2.5, price: 539000, sqft: 2240 },
      { address: "31 Fordway Street", beds: 3, baths: 1.5, price: 389000, sqft: 1560 },
    ],
    heroImage: "/images/neighborhoods/derry-hero.jpg",
    fallbackEmoji: "🏛️",
  },
  {
    slug: "londonderry",
    city: "Londonderry",
    state: "NH",
    displayName: "Londonderry",
    category: "town",
    eyebrow: "LONDONDERRY, NH",
    tagline: "Apple orchards, an airport on one side, and Woodmont Commons on the other.",
    description:
      "Londonderry sits between Derry and the Manchester airport, which matters more than buyers from Massachusetts realize. The town has apple orchards on the east side (Mack's, Sunnycrest) and Woodmont Commons on the west, a large mixed-use development built on the old apple farms. Londonderry High feeder lines run clean, and the town center is a New England common with a white church and a general store.", // [DEMO COPY — pending client review]
    population: 26000, // [DEMO COPY — confirm with client]
    medianHomePrice: 595000, // [DEMO COPY — confirm with client]
    milRate: 19.35, // [DEMO COPY — confirm with client]
    schoolDistrict: "Londonderry School District / Londonderry High School",
    commuteToBoston: { minutes: 60, via: "I-93 via Exit 4 or Exit 5" },
    highlights: [
      "🍎 Mack's Apples and Sunnycrest Farm — working orchards with fall cider-donut lines out the door",
      "🏗️ Woodmont Commons — Southern NH's largest new mixed-use development, still building out",
      "✈️ 12 minutes to Manchester-Boston Regional Airport — real advantage for frequent flyers",
      "🏫 Londonderry High — strong athletics program, clean academic reputation",
      "🚗 Split commute: Exit 4 for Derry-side, Exit 5 for the orchard-and-airport side",
    ],
    sampleListings: [
      { address: "18 Mammoth Road", beds: 4, baths: 2.5, price: 615000, sqft: 2640 },
      { address: "3 Orchard View Drive", beds: 3, baths: 2.5, price: 549000, sqft: 2080 },
      { address: "42 Woodmont Commons Boulevard, Unit 6", beds: 2, baths: 2, price: 485000, sqft: 1440 },
    ],
    heroImage: "/images/neighborhoods/londonderry-hero.jpg",
    fallbackEmoji: "🍎",
  },
  {
    slug: "pelham",
    city: "Pelham",
    state: "NH",
    displayName: "Pelham",
    category: "town",
    eyebrow: "PELHAM, NH",
    tagline: "Rural feel, MA border, and a school district on the rise.",
    description:
      "Pelham reads rural, even though it sits right on the Massachusetts line. Larger lots, more trees, fewer neighborhoods with entrance signs. The Pelham school district has improved steadily over the last decade, and the new Pelham High building is the nicest public high school in Southern NH. Buyers who want acreage and a short drive into Lowell keep coming back to this town.", // [DEMO COPY — pending client review]
    population: 14600, // [DEMO COPY — confirm with client]
    medianHomePrice: 555000, // [DEMO COPY — confirm with client]
    milRate: 17.95, // [DEMO COPY — confirm with client]
    schoolDistrict: "Pelham School District / Pelham High School",
    commuteToBoston: { minutes: 55, via: "Route 38 to I-93 or I-495" },
    highlights: [
      "🌲 Large-lot zoning — 2 to 5 acre parcels are common on Hildreth Road and Gage Hill",
      "🏫 Pelham High — the newest public high school building in the region",
      "🛻 Rural character — horse properties, stone walls, active farms still in town",
      "📉 Lowest mill rate in the service area — meaningful over a 10-year hold",
      "🚗 Works for commuters to Lowell, Nashua, and into Massachusetts via Route 38",
    ],
    sampleListings: [
      { address: "72 Hildreth Road", beds: 4, baths: 3, price: 625000, sqft: 2880 },
      { address: "15 Gage Hill Road", beds: 3, baths: 2, price: 499000, sqft: 2020 },
      { address: "28 Bridge Street", beds: 4, baths: 2.5, price: 579000, sqft: 2440 },
    ],
    heroImage: "/images/neighborhoods/pelham-hero.jpg",
    fallbackEmoji: "🌲",
  },
  {
    slug: "atkinson",
    city: "Atkinson",
    state: "NH",
    displayName: "Atkinson",
    category: "town",
    eyebrow: "ATKINSON, NH",
    tagline: "Small, quiet, and the favorite hideout of long-time Southern NH buyers.",
    description:
      "Atkinson is the smallest town in the service area and the one buyers from out of state almost always miss on their first search. Rolling lots, a country club at the center of town, and feeder lines into the Timberlane Regional district. If you are coming from Andover and want Andover-quiet without Andover prices, Atkinson is usually the answer.", // [DEMO COPY — pending client review]
    population: 7100, // [DEMO COPY — confirm with client]
    medianHomePrice: 625000, // [DEMO COPY — confirm with client]
    milRate: 18.5, // [DEMO COPY — confirm with client]
    schoolDistrict: "Timberlane Regional School District",
    commuteToBoston: { minutes: 55, via: "Route 111 to I-93" },
    highlights: [
      "⛳ Atkinson Resort & Country Club — center of the town's social calendar",
      "🏫 Timberlane Regional feeder — shared with Plaistow, Danville, and Sandown",
      "🌳 Rolling rural lots with stone walls, often 1 to 3 acres",
      "🤫 Low inventory all year — the right house typically moves in under two weeks",
      "🚗 Short drive to either I-93 or Route 125 toward the Seacoast",
    ],
    sampleListings: [
      { address: "6 Country Club Drive", beds: 4, baths: 3, price: 745000, sqft: 3200 },
      { address: "19 Providence Hill Road", beds: 3, baths: 2.5, price: 589000, sqft: 2160 },
      { address: "44 Main Street", beds: 3, baths: 2, price: 525000, sqft: 1940 },
    ],
    heroImage: "/images/neighborhoods/atkinson-hero.jpg",
    fallbackEmoji: "⛳",
  },
  {
    slug: "hampstead",
    city: "Hampstead",
    state: "NH",
    displayName: "Hampstead",
    category: "town",
    eyebrow: "HAMPSTEAD, NH",
    tagline: "Lakes, wooded lots, and a main street that still feels like 1985.",
    description:
      "Hampstead is lake country. Big Island Pond, Sunset Lake, and Wash Pond put a lot of the town within walking distance of water. The main street runs past a town hall, a general store, and a couple of cafes, and that is most of the town's retail on purpose. Buyers who want to be 10 minutes from I-93 without feeling like it find their way to Hampstead eventually.", // [DEMO COPY — pending client review]
    population: 9100, // [DEMO COPY — confirm with client]
    medianHomePrice: 555000, // [DEMO COPY — confirm with client]
    milRate: 20.25, // [DEMO COPY — confirm with client]
    schoolDistrict: "Hampstead School District / Pinkerton Academy (regional HS tuition)",
    commuteToBoston: { minutes: 60, via: "Route 111 to I-93 Exit 3" },
    highlights: [
      "🌊 Big Island Pond, Sunset Lake, and Wash Pond — three lake communities inside town",
      "🎓 Pinkerton Academy feeder — Hampstead high schoolers tuition into Derry's Pinkerton",
      "🛣️ Route 121A and Route 111 — two-lane roads with real New England feel",
      "🏡 Older capes and contemporaries on large wooded lots — inventory is uneven",
      "🚗 10–12 minutes to I-93 at Exit 3 in Windham",
    ],
    sampleListings: [
      { address: "31 East Road", beds: 3, baths: 2, price: 499000, sqft: 1880 },
      { address: "8 Sunset Lake Drive", beds: 4, baths: 2.5, price: 649000, sqft: 2420 },
      { address: "52 Stage Road", beds: 3, baths: 1.5, price: 425000, sqft: 1640 },
    ],
    heroImage: "/images/neighborhoods/hampstead-hero.jpg",
    fallbackEmoji: "🌅",
  },
];

// -----------------------------------------------------------------------------
// SUB-NEIGHBORHOODS — 6 entries from design-system.md §11 list
// -----------------------------------------------------------------------------
const subNeighborhoods: Neighborhood[] = [
  {
    slug: "tuscan-village",
    city: "Salem",
    state: "NH",
    displayName: "Tuscan Village",
    category: "sub-neighborhood",
    parentTown: "salem",
    eyebrow: "TUSCAN VILLAGE · SALEM",
    tagline: "The new-build, walk-to-Market-Basket downsizer magnet.",
    description:
      "Tuscan Village is built on the former Rockingham Park racetrack site, and it has quietly become the single most important new-build community in Southern NH. Townhomes, apartments, a hotel, a Market Basket, and a walkable center with restaurants. The downsizer demographic has moved here in force. If you want one-level living with the elevator option and the yard replaced by a landscaped courtyard, this is it.", // [DEMO COPY — pending client review]
    population: 2400, // [DEMO COPY — confirm with client]
    medianHomePrice: 585000, // [DEMO COPY — confirm with client]
    milRate: 19.85, // inherits Salem
    schoolDistrict: "Salem School District / Salem High School",
    commuteToBoston: { minutes: 45, via: "I-93 via Exit 2" },
    highlights: [
      "🛒 Market Basket, Tuscan Market, and a dozen restaurants inside the development",
      "🛗 Elevator buildings with single-level units — rare in Southern NH",
      "🏨 Walkable to the TPC hotel, LaBelle Winery concerts, and the movie theater",
      "🔑 HOA handles the exterior — the downsizer's dream maintenance setup",
      "🚗 Two minutes to I-93 Exit 2 — the shortest commute in the service area",
    ],
    sampleListings: [
      { address: "4 Tuscan Village Way, Unit 304", beds: 2, baths: 2, price: 599000, sqft: 1580 },
      { address: "12 Tuscan Village Boulevard, Unit 112", beds: 3, baths: 2.5, price: 689000, sqft: 1920 },
      { address: "8 Tuscan Village Way, Unit 208", beds: 1, baths: 1, price: 439000, sqft: 980 },
    ],
    heroImage: "/images/neighborhoods/tuscan-village-hero.jpg",
    fallbackEmoji: "🛍️",
  },
  {
    slug: "canobie-lake",
    city: "Salem",
    state: "NH",
    displayName: "Canobie Lake",
    category: "sub-neighborhood",
    parentTown: "salem",
    eyebrow: "CANOBIE LAKE · SALEM",
    tagline: "Classic Salem lake homes, the park at one end, quiet coves at the other.",
    description:
      "Canobie Lake is more than the amusement park. The lake itself is lined with a mix of long-held year-round homes and the original 1920s summer camps that have been slowly winterized over four generations. The North Salem side reads quieter, the South Salem side is closer to the park and the town center. Inventory is thin and the right waterfront listing is usually spoken for before the sign goes in the yard.", // [DEMO COPY — pending client review]
    population: 1900, // [DEMO COPY — confirm with client]
    medianHomePrice: 685000, // [DEMO COPY — confirm with client]
    milRate: 19.85, // inherits Salem
    schoolDistrict: "Salem School District / Salem High School",
    commuteToBoston: { minutes: 45, via: "I-93 via Exit 2" },
    highlights: [
      "🎢 Canobie Lake Park — operating since 1902, the park anchors the south end of the lake",
      "🌊 Waterfront and water-access homes — two very different price bands",
      "⛵ Private boat associations on both the North Salem and South Salem sides",
      "🏡 Old camps converted to year-round — watch for septic and foundation age",
      "🔇 Off-season the lake is genuinely quiet, even with the park a mile away",
    ],
    sampleListings: [
      { address: "22 North Policy Street", beds: 3, baths: 2, price: 729000, sqft: 1980 },
      { address: "14 Shore Drive", beds: 4, baths: 2.5, price: 899000, sqft: 2440 },
      { address: "8 Lakeview Road", beds: 2, baths: 1, price: 519000, sqft: 1280 },
    ],
    heroImage: "/images/neighborhoods/canobie-lake-hero.jpg",
    fallbackEmoji: "🎡",
  },
  {
    slug: "cobbetts-pond",
    city: "Windham",
    state: "NH",
    displayName: "Cobbett's Pond",
    category: "sub-neighborhood",
    parentTown: "windham",
    eyebrow: "COBBETT'S POND · WINDHAM",
    tagline: "Windham's waterfront pocket, walking distance to the town center.",
    description:
      "Cobbett's Pond is the waterfront section of Windham, and the homes here trade differently than the rest of the town. Direct waterfront, water-view, and water-access are three separate price tiers, and any good listing tells you exactly which one you are buying. Cobbett's Pond Beach is private to association members. Most of the year-round homes were camps once, and it shows in the character.", // [DEMO COPY — pending client review]
    population: 1600, // [DEMO COPY — confirm with client]
    medianHomePrice: 895000, // [DEMO COPY — confirm with client]
    milRate: 19.4, // inherits Windham
    schoolDistrict: "Windham School District / Windham High School",
    commuteToBoston: { minutes: 55, via: "I-93 via Exit 3" },
    highlights: [
      "🌊 Direct waterfront, water-view, and water-access — three very different price tiers",
      "🏖️ Cobbett's Pond Beach — association-only, seasonal rafts and docks",
      "⛵ Small-boat lake — quiet, no wake on most of it, good for kayaks and sailing",
      "🏡 Many year-round conversions from original 1930s–1950s camps",
      "🚶 Walkable to Windham town center and the Bass Pro Shops plaza",
    ],
    sampleListings: [
      { address: "6 Cobbetts Pond Road", beds: 3, baths: 2, price: 825000, sqft: 2080 },
      { address: "18 Shore Drive", beds: 4, baths: 3, price: 1195000, sqft: 2880 },
      { address: "42 Lakeview Avenue", beds: 2, baths: 2, price: 699000, sqft: 1520 },
    ],
    heroImage: "/images/neighborhoods/cobbetts-pond-hero.jpg",
    fallbackEmoji: "🌊",
  },
  {
    slug: "woodmont-commons",
    city: "Londonderry",
    state: "NH",
    displayName: "Woodmont Commons",
    category: "sub-neighborhood",
    parentTown: "londonderry",
    eyebrow: "WOODMONT COMMONS · LONDONDERRY",
    tagline: "Southern NH's largest new-build mixed-use development.",
    description:
      "Woodmont Commons is the long-term build-out of the old Woodmont Orchards site on the Londonderry-Derry line. Townhomes, apartments, restaurants, a grocery store, and a growing town-center feel. The project is still phasing in, which means inventory is steady and the neighborhood is genuinely new. Works well for Mike and Jess types coming up from Massachusetts who want new construction without giving up walkability.", // [DEMO COPY — pending client review]
    population: 1800, // [DEMO COPY — confirm with client]
    medianHomePrice: 495000, // [DEMO COPY — confirm with client]
    milRate: 19.35, // inherits Londonderry
    schoolDistrict: "Londonderry School District / Londonderry High School",
    commuteToBoston: { minutes: 60, via: "I-93 via Exit 4" },
    highlights: [
      "🏗️ Active build-out — new inventory every construction season through ~2028",
      "🛒 Grocery, restaurants, and retail inside the development (walkable)",
      "🏡 Mix of townhomes, flats, and detached carriage homes",
      "🏫 Londonderry school district — strong and stable",
      "🚗 Direct access to I-93 Exit 4 without going through downtown Derry",
    ],
    sampleListings: [
      { address: "12 Woodmont Commons Boulevard, Unit 12", beds: 2, baths: 2.5, price: 499000, sqft: 1640 },
      { address: "4 Orchard Street, Unit 4B", beds: 3, baths: 2.5, price: 565000, sqft: 1880 },
      { address: "20 Commons Drive", beds: 2, baths: 2, price: 445000, sqft: 1420 },
    ],
    heroImage: "/images/neighborhoods/woodmont-commons-hero.jpg",
    fallbackEmoji: "🏗️",
  },
  {
    slug: "hood-park-downtown-derry",
    city: "Derry",
    state: "NH",
    displayName: "Hood Park & Downtown Derry",
    category: "sub-neighborhood",
    parentTown: "derry",
    eyebrow: "HOOD PARK · DERRY",
    tagline: "The walkable main-street revival of Greater Derry.",
    description:
      "Downtown Derry around Hood Park has quietly turned a corner in the last five years. The Derry Opera House runs a real season, Hood Park hosts summer concerts and a farmers market, and the main street has coffee shops and restaurants that actually stay open past 8pm. The housing stock is a mix of older multi-families, town-center singles, and small professional condos. Entry-level prices, real walkability.", // [DEMO COPY — pending client review]
    population: 4200, // [DEMO COPY — confirm with client]
    medianHomePrice: 395000, // [DEMO COPY — confirm with client]
    milRate: 26.15, // inherits Derry
    schoolDistrict: "Derry Cooperative School District / Pinkerton Academy",
    commuteToBoston: { minutes: 55, via: "I-93 via Exit 4" },
    highlights: [
      "🏛️ Derry Opera House — active programming through the year",
      "🎶 Hood Park concerts and farmers market — real town-center activity",
      "🚶 True walkable downtown — coffee, dinner, and the library all on foot",
      "💵 Entry-level pricing for a walkable New England town center",
      "🎓 Feeds Pinkerton Academy like the rest of Derry",
    ],
    sampleListings: [
      { address: "18 West Broadway", beds: 2, baths: 1, price: 325000, sqft: 1180 },
      { address: "44 East Broadway, Unit 3", beds: 2, baths: 1.5, price: 349000, sqft: 1240 },
      { address: "12 Crystal Avenue", beds: 3, baths: 1.5, price: 415000, sqft: 1560 },
    ],
    heroImage: "/images/neighborhoods/hood-park-downtown-derry-hero.jpg",
    fallbackEmoji: "🏛️",
  },
  {
    slug: "shadow-lake",
    city: "Salem",
    state: "NH",
    displayName: "Shadow Lake",
    category: "sub-neighborhood",
    parentTown: "salem",
    eyebrow: "SHADOW LAKE · SALEM",
    tagline: "The quieter lake neighborhood on the North Salem side.",
    description:
      "Shadow Lake sits on the North Salem side, quieter and more private than Canobie and without the amusement-park backdrop. A small spring-fed lake with a community beach, tree-lined streets, and year-round homes that rarely turn over. When a Shadow Lake house hits the market, it moves through the local network before it ever gets syndicated. Ask me what is coming up off-market.", // [DEMO COPY — pending client review]
    population: 1100, // [DEMO COPY — confirm with client]
    medianHomePrice: 595000, // [DEMO COPY — confirm with client]
    milRate: 19.85, // inherits Salem
    schoolDistrict: "Salem School District / Salem High School",
    commuteToBoston: { minutes: 45, via: "I-93 via Exit 2" },
    highlights: [
      "🌲 Private, spring-fed lake — smaller and quieter than Canobie",
      "🏖️ Community beach for the association",
      "🏡 Low turnover — the right house is often sold before the sign goes up",
      "🌳 Tree-lined streets, larger lots than most of Salem",
      "🚗 Still under 10 minutes to I-93 Exit 2",
    ],
    sampleListings: [
      { address: "9 Shadow Lake Road", beds: 3, baths: 2, price: 619000, sqft: 1980 },
      { address: "14 North Policy Street", beds: 4, baths: 2.5, price: 699000, sqft: 2320 },
      { address: "22 Lakeshore Drive", beds: 3, baths: 2, price: 559000, sqft: 1760 },
    ],
    heroImage: "/images/neighborhoods/shadow-lake-hero.jpg",
    fallbackEmoji: "🌲",
  },
];

export const neighborhoods: Neighborhood[] = [...towns, ...subNeighborhoods];

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getTowns(): Neighborhood[] {
  return neighborhoods.filter((n) => n.category === "town");
}

export function getSubNeighborhoods(): Neighborhood[] {
  return neighborhoods.filter((n) => n.category === "sub-neighborhood");
}
