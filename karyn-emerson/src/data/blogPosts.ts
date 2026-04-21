// =============================================================================
// blogPosts.ts — Karyn Emerson blog entries (9 full SEO/AEO articles)
// OWNED BY: Stage 1F Wave 4 integration agent
//
// Source material:
//   - c:/Projects/Karyn-Emerson/.planning/blog-drafts/*.md (Wave 3 long-form drafts)
//   - c:/Projects/Karyn-Emerson/market-intelligence.md §6 (content gaps + long-tail queries)
//   - c:/Projects/Karyn-Emerson/design-system.md §11 (Blog: Yes always, 9–10 articles)
//   - c:/Projects/Karyn-Emerson/CLAUDE.md (Content Standards: ZERO em dashes)
//
// Voice: Karyn. Place-first, warm editorial. ZERO em dashes in body copy.
// Commas, periods, ellipses only. Short sentences.
//
// Structure: each post carries a TL;DR, scroll-anchored H2 sections, optional
// H3 subsections, and an FAQ set (5+ Q/A pairs per article). The content is
// production-ready and indexed by articleSchema + faqPageSchema on render.
// =============================================================================

export type BlogCategory =
  | "Relocation"
  | "Taxes"
  | "Commission"
  | "Selling"
  | "Buying"
  | "Neighborhoods";

export interface BlogSection {
  heading: string;
  id: string;
  paras: string[];
  subsections?: { heading: string; paras: string[] }[];
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  readingTime: string;
  heroImage: string; // absolute path under /public (3:2 — 1600x1067)
  cardImage: string; // absolute path under /public (3:2 crop — 600x400)
  tldr: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-hero.jpg",
    cardImage: "/images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-card.jpg",
    tldr:
      "Moving from Massachusetts to Southern NH saves most families between $4,000 and $12,000 a year, mostly from skipping MA's 5% income tax and paying zero sales tax. The tradeoff is higher property tax (Salem runs around $17 per $1,000, Windham and Derry vary), a DMV sprint in the first 60 days, and the commuter tax trap that catches anyone still working in Massachusetts. Most buyers still come out ahead, but the right town depends on your commute, your kids' school situation, and what you want the next ten years to look like.",
    sections: [
      {
        heading: "The tax math, honestly",
        id: "the-tax-math-honestly",
        paras: [
          "Every week I get a call that starts the same way. A couple in Methuen, Lawrence, Andover, or Woburn is tired of Massachusetts taxes, the commute is already an hour, and they have heard that crossing the border into Salem or Windham is the move. They want to know if it is actually true.",
          "The short answer is yes, for most people, and the long answer is where the money actually lives. Massachusetts charges a 5% state income tax on every dollar you earn. It also charges 6.25% sales tax on most of what you buy. New Hampshire charges neither. On a household pulling $180,000 a year, that is roughly $9,000 in income tax alone that stops being deducted from your paychecks the day you change your domicile. Add sales tax savings on a car, appliances, furniture, or a new roof, and the annual number climbs.",
          "Property tax goes the other way. New Hampshire funds its towns almost entirely through property tax, so the mill rates look frightening on paper. Salem's 2025 mill rate sits around $17.06 per thousand of assessed value. On a $600,000 home, that is roughly $10,236 a year. Your MA neighbor paying $12 per thousand on the same $600,000 home was at $7,200. So yes, the property tax is higher. The swing depends on what your MA income tax was on the other side of the ledger. I keep a running worksheet on [NH property tax by town](/blog/nh-property-tax-by-town-salem-windham-derry) that walks through Salem, Windham, Derry, Pelham, Atkinson, and Hampstead with sample bills at $500K, $750K, and $1M so you can see your actual number before you make the call.",
        ],
      },
      {
        heading: "The commuter tax trap nobody warns you about",
        id: "the-commuter-tax-trap",
        paras: [
          "Here is the piece that catches people. If you move to New Hampshire but keep your job in Massachusetts, Massachusetts still taxes your income. That 5% does not evaporate the moment you cross the border. It follows your W-2 because the income was earned in MA.",
          "What you save is the portion of your household income earned in NH, earned remotely from a NH address, or earned by a spouse who works in-state. Plus the 6.25% sales tax. Plus, eventually, if you change employers or negotiate a fully remote role, the income tax too. For a dual-income couple where one commutes to Boston and one works remotely from home, the math still works beautifully. For a couple where both commute into the city five days a week, the savings shrink to mostly the sales tax and a more livable house for the price. I wrote a longer piece on [the commuter tax trap](/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax) because it is the single biggest misunderstanding I see on relocation calls.",
          "None of this is a reason not to move. It is a reason to run your specific numbers before you do.",
        ],
      },
      {
        heading: "The commute, by the clock",
        id: "the-commute-by-the-clock",
        paras: [
          "I-93 south from Salem to downtown Boston is about 33 miles. Off-peak on a Sunday, that is a 40-minute drive. Weekday rush hour into the city is a different story. Most of my buyers tell me their realistic door-to-door is 55 to 75 minutes in the morning, a touch faster heading home if they leave by 4:30. Windham adds 5 to 10 minutes on top of Salem. Derry adds another 10 from Windham. Atkinson and Hampstead are in Derry's range. Pelham is roughly Windham.",
          "The Exit 2 Park and Ride in Salem runs Boston Express buses to South Station and Logan, and a lot of my clients swear by it. You skip the traffic, you work on your laptop, you pay a monthly commuter cost instead of a parking garage. For buyers who are two or three days a week in the office, that changes the calculation. If you are five days in, test drive the commute before you sign anything. Not in August on a Tuesday morning when everyone is on vacation. Do it on a Monday in November.",
        ],
      },
      {
        heading: "The DMV, the inspection sticker, and the 60-day clock",
        id: "dmv-inspection-60-day-clock",
        paras: [
          "Once you close, a clock starts. New Hampshire gives you 60 days from the date you establish residency to register your vehicles. Miss it and you are technically driving illegally, and your insurance carrier will want a word.",
          "The short list of what you need, in the order you actually do it. One, get a NH driver's license at any DMV location. Bring your MA license, proof of residency (closing statement or utility bill works), your Social Security card or W-2, and your birth certificate or passport. Two, get your car safety-inspected at any NH-certified garage. This is separate from the emissions check MA did. NH inspects brakes, lights, tires, suspension, glass, wipers, and the frame. Budget $40 to $60 per car. Three, take the inspection pass, your title, your out-of-state registration, and proof of insurance to your town clerk's office for the town portion of the registration. Fourth, go back to the state DMV for the state portion and your NH plates.",
          "Yes, it is two stops for the registration. Yes, it is annoying. No, you cannot do it online the first time. Budget a half day. Bring coffee.",
          "One more thing. Within the first year, file for the Homestead exemption paperwork with your town assessor if you own the property as your primary residence. It is a one-time filing that protects a portion of your home's equity from certain creditors. It is free. Most people never get told about it.",
        ],
      },
      {
        heading: "Picking the town that actually fits you",
        id: "picking-the-right-town",
        paras: [
          "This is the part generic relocation guides skip. Let me be honest about the towns I [cover every day](/neighborhoods).",
          "**Salem** is the most urban-feeling of the Southern NH border towns. Tuscan Village is new construction, walkable, full of restaurants and the Market Basket flagship. Canobie Lake side is older, more established, lake-access for some neighborhoods. Salem has the best retail footprint and the shortest I-93 commute, which is why it commands a premium. Schools are solid but not elite.",
          "**Windham** is the quieter sibling. Higher price per square foot, higher mill rate, but Windham High ranks consistently near the top of NH public schools and that is the reason most families pay the premium. Cobbett's Pond and Canobie-adjacent neighborhoods trade up fast. If Andover was your MA baseline, Windham is the closest match on feel and schools.",
          "**Derry** gives you the most house for the money in the region. Pinkerton Academy, the private-ish public high school, is a quirky local tradition and a genuine draw for families who like the independence it offers. Downtown Derry is in the middle of a slow, real revitalization. If Woburn or Haverhill was your MA comp, Derry is the honest upgrade.",
          "**Pelham, Atkinson, and Hampstead** are the rural-feel options. Bigger lots, more trees, longer driveways, longer commute. If Lexington or Winchester was your MA reference and you were there for the lot size and the quiet more than the school district specifically, look at Hampstead and Atkinson seriously. Pelham shares the Windham school district, which matters.",
        ],
      },
      {
        heading: "Timing the move",
        id: "timing-the-move",
        paras: [
          "Two timing questions come up on every relocation call. When in the year, and sell MA first or buy NH first.",
          "On the calendar, families with school-age kids want to be moved and registered before the last week of August. That means under contract by late May, closing by late July. Inventory in Southern NH tends to peak in April and May and thin out by August. If you are flexible on timing, shoulder season (October through December) is a quieter market with more negotiating room.",
          "On the sell-first or buy-first question, there is no universal answer. If your MA house is clearly going to sell fast and you have a stable landing situation (family to stay with, a short-term rental, an employer relocation package), selling first and being a clean cash buyer in NH is the strongest position. If inventory in the NH town you want is tight and you cannot afford to miss the right house, buying first with a contingency or a bridge loan makes sense. I walk every relocation client through both paths in the first call. It is the most important decision in the whole move, and it is the one least-discussed online.",
        ],
      },
      {
        heading: "What to do the first week you arrive",
        id: "first-week-checklist",
        paras: [
          "A short list. Get your driver's license before you do anything else so every other form goes smoothly. Register to vote while you are at the DMV (NH does same-day registration at the polls, but do it early). Transfer your utilities (Eversource is the main electric, Liberty Utilities handles most gas). Sign up for trash service if your town does not include it (Salem includes, Windham and Derry vary by neighborhood). Update your car insurance to NH, which often drops your rate. Update your health insurance address. File a change of address with the USPS. Find your closest urgent care and your closest transfer station. Introduce yourself to two neighbors. I am serious about the last one. This is still a place where people wave.",
          "If you want this walked through for your specific numbers, a specific house, a specific commute, and a specific timeline, my calendar is at [/booking](/booking). Fifteen minutes is usually enough to get clarity on whether the move makes sense for you this year or next.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I still pay Massachusetts income tax if I move to NH and keep commuting to my MA job?",
        a: "Yes. Massachusetts taxes income earned within its borders regardless of where you live. If you work in-person or remotely from a NH address, that portion of your income is NH-sourced and not taxed by MA. If you commute into a MA office, those earnings remain taxable in MA until you change your work situation. The move still saves you sales tax and usually changes the break-even math, but do not assume the 5% disappears automatically.",
      },
      {
        q: "How much do most families actually save moving from MA to NH?",
        a: "On a $180K household income with one spouse fully remote and the other commuting two to three days a week, most of my clients save $4,000 to $9,000 a year after the higher property tax is factored in. Fully remote couples save more, often $10,000 to $14,000. Two full-time MA commuters save closer to $2,000 to $4,000, mostly from sales tax and lower car insurance. Your number depends on income split, home price, and work location.",
      },
      {
        q: "Is NH property tax really that much higher than MA?",
        a: "Per thousand, yes. Salem around $17, Windham higher, Derry lower, Atkinson and Hampstead in between. MA towns typically run $10 to $14 per thousand. On a $600K home, you are likely paying $3,000 to $5,000 more a year in property tax. The offset is zero state income tax and zero sales tax, which almost always puts you ahead if you are not commuting full-time into Massachusetts.",
      },
      {
        q: "Which Southern NH town is most like Andover, Lexington, or Winchester?",
        a: "Windham is the closest match on school quality and feel, and is where most of my Andover-to-NH clients land. If you were in those MA towns for lot size and quiet more than the schools specifically, Hampstead and Atkinson are the honest upgrade with more land for less money. Salem is a match if you want walkability and retail over acreage.",
      },
      {
        q: "How long do I have to register my car in NH after moving?",
        a: "60 days from the date you establish residency. You need a NH driver's license first, then a NH safety inspection at any certified garage, then a two-stop registration (town clerk for the town portion, DMV for the state portion and plates). Budget a half day and one car at a time.",
      },
      {
        q: "Can I keep my doctors and dentists in Massachusetts?",
        a: "Most NH residents do. The Boston medical system is world-class and a 45-to-75-minute drive from most of Southern NH, which is not materially different from the commute someone in Worcester makes to Boston. Verify your insurance still covers out-of-state providers as in-network (most do, some plans distinguish between emergency and routine). If you want a NH primary care doctor for convenience, Parkland Medical in Derry and Elliot Hospital in Manchester are the two big regional systems.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/nh-property-tax-by-town-salem-windham-derry-hero.jpg",
    cardImage: "/images/blog/nh-property-tax-by-town-salem-windham-derry-card.jpg",
    tldr:
      "Salem's 2025 mill rate was $17.06 per $1,000 of assessed value, Windham's was $19.83, and Derry's was $24.74. On a $750,000 home, that works out to roughly $12,795 a year in Salem, $14,872 in Windham, and $18,555 in Derry. NH has no income tax and no sales tax, so property tax is how every town pays for schools, roads, fire, and the library, and the rate is reset every fall.",
    sections: [
      {
        heading: "How NH property tax actually works",
        id: "how-nh-property-tax-works",
        paras: [
          "NH property tax math is simple, and that is the good news. The bad news is that the numbers are bigger than most MA relocators expect.",
          "The formula is the same in every town: mill rate times assessed value, divided by 1,000, equals your annual bill. A $500,000 assessment at a $20.00 mill rate is $10,000 a year. That is the whole bill, not just the school portion, because NH towns roll four separate lines into one rate: town operations, the local school, the state-education line, and the county. You see all four on your tax card, but you pay one number.",
          "Bills are issued twice a year. The first bill in June or July is an estimate based on the prior year's rate. The second bill in November or December is the \"settled\" bill, where the town adjusts for the new rate the NH Department of Revenue Administration sets every fall. If the rate went up, you pay more in December. If it went down, you pay less. The rate is never locked for more than a year.",
          "One more thing the calculator on Zillow does not tell you. Your assessed value is not your purchase price. Towns in NH assess on their own schedule, and most of them run somewhere between 80 and 100 percent of current market value. The gap between what you paid and what the town thinks the house is worth is called the equalization ratio, and it matters more than the mill rate alone. More on that below.",
        ],
      },
      {
        heading: "Why the rate swings so much town to town",
        id: "why-the-rate-swings",
        paras: [
          "You drive ten minutes from Salem to Derry and the rate climbs almost eight dollars per thousand. That is not a mistake. That is the NH funding model working exactly as designed.",
          "NH has no income tax and no sales tax. That is the headline every relocator loves, and it is real. But the state still has to pay for public schools, and it has decided that most of that cost falls on the towns, through property tax. If a town has a big commercial base, like Salem with Tuscan Village and the Rockingham Park corridor, the commercial properties carry a large share of the bill and the residential rate comes in lower. If a town is mostly residential, like Derry, the homeowners carry the school budget almost alone and the rate climbs.",
          "School spending per student matters too. Derry runs its own elementary and middle schools and sends high schoolers to Pinkerton Academy, which is a private academy with a public-tuition contract. That tuition line is significant. Windham runs its own K-12 system and has built new schools in the last fifteen years, which shows up in the debt-service line on the tax rate. Salem has a larger tax base to spread those costs across, so the same dollar of school spending costs a Salem homeowner less.",
          "None of this is a criticism of any town. It is just the math, and it is why \"NH is a low-tax state\" deserves an asterisk the size of a front door.",
        ],
      },
      {
        heading: "Side by side, the three towns buyers compare most",
        id: "side-by-side-comparison",
        paras: [
          "Here is the 2025 picture for the three towns buyers compare most often, with annual tax bills at three common price points. These are based on 2025 rates published by the NH Department of Revenue Administration. Rates are set annually, so 2026 numbers will shift when the fall rate-setting cycle finishes.",
          "Salem at a $17.06 rate: $8,530 on a $500K home, $12,795 on a $750K, $17,060 on a $1M. Windham at $19.83: $9,915 on a $500K, $14,872 on a $750K, $19,830 on a $1M. Derry at $24.74: $12,370 on a $500K, $18,555 on a $750K, $24,740 on a $1M.",
          "Read across one row. A buyer choosing between a $750,000 colonial in Windham and the same house in Derry is looking at a $3,683 annual difference. Over ten years, that is $36,830 before any rate increases. That is a finished basement, a new roof, or two full years of college tuition. It is not a rounding error.",
          "Read down one column. On the $1M line, the spread between Salem and Derry is $7,680 a year. Most buyers I walk through this do not know the gap is that wide until I put it on paper.",
          "One caveat. These bills assume the town's assessed value matches the price you paid, which is rarely exactly true. Use the equalization section below to adjust.",
        ],
      },
      {
        heading: "Assessed value vs. what you paid",
        id: "assessed-vs-purchase-price",
        paras: [
          "The sticker price is not what you are taxed on. The town's assessed value is.",
          "Every NH town publishes an equalization ratio. It is the number the Department of Revenue Administration calculates to describe how close the town's assessments are to current market value. A ratio of 100 percent means the town is assessing at full market. A ratio of 80 percent means the town is assessing at 80 cents on the dollar, and your tax bill is lower than the sticker-price math would suggest.",
          "Here is how it plays in practice. You buy a $750,000 colonial in Windham. The town's most recent assessed value on that property, from the last full revaluation, is $620,000. Your tax bill next June is calculated on the $620,000 figure, not the $750,000 you paid. At Windham's $19.83 rate, that is $12,295 a year, not $14,872.",
          "That gap closes over time. NH law requires a town to do a full revaluation at least every five years, and most Southern NH towns are on a four or five year cycle. When the next revaluation hits, the assessor usually brings the number much closer to recent-sale prices, and your bill adjusts upward. Buyers who budget on the purchase-price math are usually over-budgeting in year one and right on the number by year three or four.",
          "The town assessor's office posts every property's current assessed value online. Look it up before you write an offer. It is the single best ten-minute due-diligence step most buyers skip.",
        ],
      },
      {
        heading: "Elderly, veteran, and other exemptions",
        id: "exemptions",
        paras: [
          "NH gives real exemptions for seniors, veterans, and a handful of other categories. They reduce your assessed value directly, so the dollar savings scale with the mill rate. The bigger your town's rate, the more the exemption is worth.",
          "**Elderly exemption.** Every town sets its own amount and income limits. In Salem, a qualifying homeowner age 65 to 74 can get $98,000 off assessed value, 75 to 79 gets $145,000 off, and 80-plus gets $195,000 off. Income and asset limits apply, and they are not trivial. Windham and Derry run similar tier structures with different dollar amounts. On a Derry home, a $195,000 exemption at the $24.74 rate saves $4,824 a year. That is the kind of number that changes a downsizing decision.",
          "**Veteran credit.** NH offers a standard veteran credit of $500 off the tax bill itself, not the assessed value. Towns can vote to raise it. A 100 percent service-connected disabled veteran gets a much larger credit, typically $2,000 to $4,000 depending on the town. Gold Star spouses qualify for the disabled-veteran tier in most towns.",
          "**Other categories.** Blind exemption, deaf or hearing-impaired exemption, and solar/wind/wood-heating exemptions exist in most towns. The dollar values are smaller than the elderly or veteran credits but they stack.",
          "You apply at the town's assessing office by April 15 for the current tax year. The application is simple, the paperwork requirements are not, and the return on the hour it takes to fill out is often thousands of dollars a year. If you are buying into a town and you qualify, file the day you close.",
          "For downsizers weighing Salem against Derry for a single-level condo or a smaller home, run the exemption math both ways before you decide. The lower sticker price in Derry sometimes wins back more through the elderly exemption than the higher mill rate takes away. Sometimes it does not. The only way to know is the actual math on the actual house.",
        ],
      },
      {
        heading: "What buyers get wrong",
        id: "what-buyers-get-wrong",
        paras: [
          "The most common mistake I see on the buyer side is assuming the purchase price and the assessed value are the same number. They almost never are, and that mistake usually runs in the buyer's favor for the first year or two of ownership. Use the town's current assessed value to budget year one, then assume a revaluation jump within three or four years.",
          "The second mistake is comparing NH to MA on the rate alone. NH's mill rates look enormous next to MA's. Most MA towns run between $10 and $15 per thousand. But MA also has a state income tax of 5 percent, a sales tax of 6.25 percent, and an \"income surtax\" on high earners. A MA-to-NH relocator who does the full tax picture, not just the property line, almost always comes out ahead in NH. For the full math on that, the [moving from Massachusetts to Southern NH honest guide](/blog/moving-from-massachusetts-to-southern-nh-honest-guide) breaks it down on a real household budget.",
          "The third mistake is thinking the NH tax advantage holds when you still work in MA. It does not. The [commuter tax trap](/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax) explains why MA will still tax your wages if you cross the border for work, and what to do about it.",
        ],
      },
      {
        heading: "When to appeal an assessment",
        id: "when-to-appeal",
        paras: [
          "If the town's assessment looks high compared to recent sales of similar homes on your street, you can appeal. You have until March 1 of the tax year to file an abatement request. The process is not mysterious, but it does reward homeowners who bring evidence.",
          "The evidence that wins an appeal is a pile of recent comparable sales, usually three to five, that sold for less than your assessment implies your home is worth. The town's assessor is looking at the same MLS data, but they are looking at it through a mass-appraisal model, not a property-by-property review. If your home has a feature the model cannot see, a wet basement, a failing septic, a weird lot shape, an aging roof, that is your opening.",
          "You can pull comps yourself from the town's assessing office or ask an agent who knows the street. I do abatement-comp pulls for past clients on request. If the numbers support an appeal, you file. If they do not, I tell you so, and you save the filing fee.",
          "A successful appeal saves you money every year going forward, not just this year. On a Derry home where the assessment drops by $50,000, that is $1,237 a year back in your pocket, every year, until the next revaluation. Worth an afternoon.",
          "If you want to compare specific towns side by side with current listings, the [neighborhoods page](/neighborhoods) has the price bands and tax math worked out for each one.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much property tax will I pay in Salem NH on a $600K home?",
        a: "At the 2025 Salem mill rate of $17.06, a $600,000 assessed value comes out to $10,236 a year. If the town has you assessed below $600K, which is common in the first year or two after a sale, your actual bill will be lower. The assessor's office posts every property's current value online.",
      },
      {
        q: "Why is Derry's tax rate higher than Windham's?",
        a: "Derry has a smaller commercial base and a larger school-tuition line, mostly because Derry sends high schoolers to Pinkerton Academy under a public-tuition contract. Windham has a newer K-12 system but a larger residential-only tax base spread across a stronger housing market, and a substantial slice of Windham's value is in higher-priced homes that carry the rate for everyone.",
      },
      {
        q: "Can I get an exemption if I'm over 65?",
        a: "Yes, in every Southern NH town, subject to income and asset limits that vary by town. In Salem, the exemption is $98,000 off assessed value at 65, rising to $195,000 at 80 and over. On a Derry home at the $24.74 rate, a $195,000 exemption saves roughly $4,824 a year. You apply at the town's assessing office. Worth a phone call the week you close.",
      },
      {
        q: "Are NH property taxes really higher than MA?",
        a: "The mill rates look higher, yes. But NH has no state income tax and no sales tax, and MA has both plus a surtax on high earners. For most MA-to-NH relocators, the total tax picture comes out better in NH, often by several thousand dollars a year. The exception is a household that keeps working in MA after moving, because MA still taxes those wages.",
      },
      {
        q: "Do NH towns reassess every year?",
        a: "No. State law requires a full revaluation at least every five years. Most Southern NH towns run on a four or five year cycle. The mill rate itself is reset every fall by the Department of Revenue Administration, so your bill can move year to year even without a revaluation, but your assessed value usually holds between cycles.",
      },
      {
        q: "What is a mill rate?",
        a: "A mill rate is the tax per $1,000 of assessed value. A $20 mill rate means you pay $20 for every $1,000 the town says your home is worth. A $500,000 home at a $20 rate is $10,000 a year. NH mill rates combine four separate pieces, town, local school, state education, and county, into one published number.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/two-to-three-percent-commission-explained-post-august-2024-hero.jpg",
    cardImage: "/images/blog/two-to-three-percent-commission-explained-post-august-2024-card.jpg",
    tldr:
      "On August 17, 2024, the NAR settlement changed how buyer-agent commissions are paid. Sellers are no longer required to advertise a buyer-agent fee in the MLS, and buyers must sign a written Buyer-Broker Agreement before an agent shows them a single home. In Southern NH, listing-side commissions typically run 2 to 3 percent and buyer-side commissions typically run 2.5 to 3 percent, but every number is negotiable and nothing is set by law.",
    sections: [
      {
        heading: "What actually changed on August 17, 2024",
        id: "what-changed-august-2024",
        paras: [
          "August 17, 2024 is the day commissions changed. Before that date, the listing agent usually advertised a buyer-agent commission inside the MLS, and the buyer's side was paid out of the seller's proceeds at closing. Most buyers never saw a number. Most buyers thought the service was free. It never was, it was just buried.",
          "After the NAR settlement, two things are true that were not true before. First, offers of buyer-agent compensation can no longer appear in the MLS. Second, a buyer must sign a written Buyer-Broker Agreement with their agent before that agent tours a single home with them. Those are the two structural changes. Everything else in the news about the settlement is downstream of those two rules.",
          "What this means in practice on a Salem or Windham transaction: the buyer-side fee is now negotiated directly between the buyer, their agent, and the seller, outside the MLS. It can still be paid by the seller. It can also be paid by the buyer. It can be split. None of that is new legally, all of it is new in how visibly it happens.",
        ],
      },
      {
        heading: "The old model versus the new model",
        id: "old-model-vs-new-model",
        paras: [
          "Here is the side-by-side, plainly.",
          "Old model. The seller signed a listing agreement with the listing agent at, say, 5 percent. The listing agent then posted the home in the MLS and advertised a buyer-agent commission, usually 2.5 to 3 percent, inside the listing. Any buyer's agent who brought a buyer to that house got paid out of the seller's side at closing. The buyer signed nothing about compensation. The fee was cooked into the seller's proceeds.",
          "New model. The seller signs a listing agreement with the listing agent at a negotiated rate, for example 2.5 percent listing-side. Whether the seller also offers to pay the buyer's side is a separate conversation, written into the listing agreement or negotiated at offer stage. The buyer signs a Buyer-Broker Agreement with their agent that spells out what the buyer's agent will be paid, who pays it, and whether the buyer is on the hook for any shortfall. When the buyer makes an offer, that offer can ask the seller to pay the buyer's-agent fee as part of the terms, the same way an offer asks for closing-cost credits or a home-warranty.",
          "The big shift is not the dollars. The big shift is that the conversation is now happening out in the open, with everybody signing what they expect.",
        ],
      },
      {
        heading: "What commission ranges actually look like in Southern NH",
        id: "southern-nh-commission-ranges",
        paras: [
          "The statewide average total commission in New Hampshire is about 5.57 percent according to Clever's 2025 survey, split roughly 2.90 percent listing-side and 2.67 percent buyer-side. FastExpert puts NH a bit lower at 4.7 percent total. National data from Redfin published in August 2025 shows buyer-side commissions actually ticked up slightly after the settlement, from 2.38 percent to 2.43 percent, and homes under $500,000 averaged 2.49 to 2.52 percent on the buyer side.",
          "Here is what I quote in my market. Listing-side on a standard Salem, Windham, Derry, Londonderry, or Pelham transaction: 2 to 3 percent. Buyer-side: 2.5 to 3 percent. On a $500,000 home, a 2.5 percent listing fee is $12,500, a 3 percent listing fee is $15,000. A 2.5 percent buyer-side fee is $12,500. These are the numbers you will actually see in writing.",
          "The floor below those ranges is the flat-fee MLS world, roughly $99 to $499, and discount brokers like Redfin at 1 percent listing-side. The ceiling is the traditional 6 percent total that full-service national brands still sometimes quote. Most of the market lives in the middle, and that is where my ranges land.",
          "Every number I just gave you is a starting point for a conversation, not a price tag. Which brings me to the next section.",
        ],
      },
      {
        heading: "Why every commission is negotiable, and not set by law",
        id: "commissions-are-negotiable",
        paras: [
          "There is no law in New Hampshire, or anywhere in the United States, that sets a commission rate. There never was. The phrase \"the standard commission is six percent\" was industry shorthand, not a statute. That shorthand is part of what the NAR settlement was meant to kill.",
          "Any agent who quotes you a fixed commission and tells you it is non-negotiable is either uninformed or not being straight with you. I have had this conversation with every seller since the settlement. The rate is a number we agree on together before we sign. Sometimes it lands at 2.5 percent because the home is straightforward, priced well, and the market is moving. Sometimes it lands at 3 percent because the property needs more work, more photography, more staging strategy, more patience. Sometimes a buyer and I agree on 2.5 percent in the Buyer-Broker Agreement with a ceiling, so if the seller offers 3 percent, nothing extra comes out of the buyer's pocket.",
          "If an agent hands you a listing agreement with a pre-filled commission number and does not walk you through why that number, walk away. You are allowed to ask. You are allowed to counter. It is your house.",
        ],
      },
      {
        heading: "What my listing-side fee actually covers",
        id: "what-listing-fee-covers",
        paras: [
          "When we agree on a listing-side fee, here is exactly what you are buying, in writing, before we go to market.",
          "Professional photography of the home. I pay for this, not you. This is not an iPhone walk-through, these are real photos by a photographer who shoots homes for a living. Drone if the property warrants it.",
          "A staging consult. I walk the house with you, room by room, and tell you what to move, what to remove, what to pack, and what to keep. On a Linda-style downsize from a 30-year family home, this is sometimes the longest and most useful conversation we have. No separate invoice for it.",
          "A written seller strategy document before the first showing. This is a short PDF that spells out the pricing logic, the comparable properties I used, the days-on-market targets, the showing strategy, and the contingency plan if the market shifts. You sign off on it before I put a sign in the yard.",
          "A 30-day listing agreement with a mutual-release clause. Not 90 days. Not 180. Thirty. If something is not working, either of us can walk at the 30-day mark, no drama, no cancellation fee. If it is working, we renew. This is unusual in the category and it is on purpose. I do not want a seller stuck with me, and I do not want to be stuck with a listing I cannot move.",
          "MLS entry, IDX syndication, Zillow and Realtor.com and Homes.com distribution, open-house coordination, showing scheduling, offer review, negotiation, inspection management, appraisal follow-up, and closing coordination, all included. All of the usual transactional work.",
          "A negotiated contribution toward buyer-agent compensation, if we decide to offer one. That number is negotiated separately and spelled out in the listing agreement.",
        ],
      },
      {
        heading: "What happens when the seller and the buyer's agent can't agree on compensation",
        id: "when-compensation-not-agreed",
        paras: [
          "This is the scenario everyone in the industry worried about when the settlement came down, and a year in, it is mostly a non-event. Here is how it actually plays out.",
          "A buyer and their agent sign a Buyer-Broker Agreement that says the buyer's agent will be paid, for example, 2.5 percent. The buyer finds a home they love on [/buy](/buy). The listing agent's seller has agreed to offer up to 2 percent on the buyer side. There is a 0.5 percent gap.",
          "Three things can happen. One, the buyer asks the seller to cover the full 2.5 percent in the offer, and the seller either accepts, counters, or rejects that term like any other offer term. Two, the buyer agrees to cover the 0.5 percent gap at closing out of their own funds. Three, the buyer's agent agrees to accept the 2 percent the seller is offering and waives the 0.5 percent with the buyer's written consent, amending the Buyer-Broker Agreement.",
          "All three are legal. All three happen in this market. The right answer depends on the buyer's cash position, the competitiveness of the offer, and how much the agent is willing to flex. What matters is that nobody is blindsided. Everyone signs what they agree to, in writing, before the deal closes.",
        ],
      },
      {
        heading: "The Buyer-Broker Agreement, explained",
        id: "buyer-broker-agreement-explained",
        paras: [
          "This one is the biggest change for buyers. Before August 17, 2024, most buyers in Southern NH toured homes with an agent for weeks or months without ever signing anything. The agent was working for free until a deal closed, and the buyer could, in theory, walk to another agent at any moment. That was the industry norm and it was a mess.",
          "Now, before I can take a buyer to see a single home, I need a signed Buyer-Broker Agreement in place. The agreement spells out four things. It names me as the buyer's agent. It sets the compensation rate the buyer and I have agreed to. It names the time period the agreement covers. It clarifies what happens if the buyer ends up writing an offer on a home where the seller's offered compensation is less than our agreed rate.",
          "The agreement can be short. It can be for a single showing, a single property, a week, a month, or longer. The commission rate can be anything we negotiate. The buyer is allowed to work with other agents if we do not have an exclusive agreement, and even an exclusive can be structured narrowly. None of this should feel like being trapped. If your agent hands you a 12-month exclusive Buyer-Broker at 3 percent on your first showing, that is not standard, that is a sales move. Ask to start with something shorter and narrower, see how it goes, and extend from there.",
        ],
      },
      {
        heading: "What to watch out for when you are shopping for an agent",
        id: "watch-out-for",
        paras: [
          "Two patterns to flag, after a year of watching agents in this market adjust to the new rules.",
          "Agents who quote you a fixed commission and refuse to negotiate. Nothing in real estate is fixed. If the first answer you get to \"can we talk about the rate\" is a hard no with no explanation, the agent is either new, or following a broker policy they will not put in writing, or hoping you do not ask twice. Any of those is a problem.",
          "Agents who will not put the fee in writing before you sign the listing agreement or the Buyer-Broker Agreement. The fee, the services delivered for it, the length of the agreement, the mutual-release terms, and the buyer-agent compensation policy should all be written down before you sign anything. If an agent wants you to sign first and work out the \"details\" later, that is a sign to pause. You can read more about who I am and how I work on [/about](/about), and when you are ready to talk, the calendar is at [/booking](/booking).",
        ],
      },
    ],
    faqs: [
      {
        q: "Who pays the buyer's agent commission after the NAR settlement?",
        a: "It depends on the deal. The seller can still offer to pay the buyer's-agent fee, negotiated in the listing agreement and often written into the purchase contract at offer stage. The buyer can also agree to pay their own agent directly out of pocket or out of closing funds. Most deals in Southern NH right now still have the seller covering most or all of the buyer-side fee, but it is negotiated every time now instead of assumed.",
      },
      {
        q: "Is 2 percent too low for a listing agent in Southern NH?",
        a: "Not automatically. A 2 percent listing-side fee is reasonable on a well-priced, well-presented property in a moving market, particularly if the seller also offers a competitive buyer-side fee. Where 2 percent becomes thin is when the house needs a lot of pre-market work, when the seller needs a lot of hand-holding, or when the market is slow and the agent will be on the listing for 90-plus days. The right question is not \"is 2 percent too low,\" it is \"what am I getting for 2 percent, in writing.\"",
      },
      {
        q: "Do I have to sign a Buyer-Broker Agreement?",
        a: "If you want an agent to show you a home, yes. The agreement is now required before any tour, by the terms of the NAR settlement. But the agreement can be narrow. It can cover a single showing, a single property, or a short window. You are not required to sign a 12-month exclusive on day one. Ask for something smaller and extend it when the relationship is working.",
      },
      {
        q: "Can I negotiate the commission?",
        a: "Yes, on both sides. No law sets the rate. Every commission is negotiable between you and the agent. Any agent who tells you otherwise is wrong.",
      },
      {
        q: "What does Karyn's 2-to-3 percent listing fee actually cover?",
        a: "Professional photography, a full staging consult, a written seller strategy document before we go to market, MLS and portal syndication, showing coordination, negotiation, inspection and appraisal management, and closing coordination. The listing agreement is 30 days with mutual release, not 90 or 180. If I am contributing to buyer-agent compensation on your behalf, that number is negotiated separately and spelled out in writing. See [/sell](/sell) for the full process breakdown.",
      },
      {
        q: "Will the seller still offer buyer-agent commission on my behalf?",
        a: "Often, yes. Post-settlement, most sellers in Southern NH still agree to contribute to the buyer-agent fee, because it widens the buyer pool and keeps offers competitive. The difference now is that the number is negotiated openly, written into the listing agreement, and sometimes renegotiated again at offer stage. It is no longer advertised in the MLS. Your listing agent should walk you through the tradeoff before you sign.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-hero.jpg",
    cardImage: "/images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-card.jpg",
    tldr:
      "Downsizing from the house you raised your family in is not a transaction, it is a transition. The right agent treats it that way, starting with timing and landing spot before list price, and walks you through the pieces most sellers are not warned about: staging a lived-in home, pricing past the emotional attachment, the NH-specific paperwork, the federal capital gains rules, and what to do with forty years of accumulated life.",
    sections: [
      {
        heading: "Why downsizing is a transition, not a transaction",
        id: "transition-not-transaction",
        paras: [
          "Most of my downsizer clients have been in the same house for 30, 40, 45 years. The conversation does not start with a listing price. It starts with a walk through the house, a kitchen-table chat, and an honest assessment of what the move looks like. Where are you going. When. What is the grandkids' school schedule. Is your husband retired yet or is that three months away.",
          "A lot of agents skip this part. They show up with a CMA, a flyer, a sign for the lawn, and a suggested listing date two weeks out. That approach works fine for a thirty-something couple moving across town because their job shifted. It does not work for the Salem colonial you bought in 1984 and raised three kids in.",
          "The Southern NH downsizer has too many moving pieces to be treated like an inventory item. Selling the house is maybe the fourth most important decision in the sequence. Where you land, when you move, what you take with you, what you tell the adult kids about the stuff in the attic: those decisions come first. The listing is the consequence of the other choices, not the leading edge.",
        ],
      },
      {
        heading: "Start with the conversation, not the comps",
        id: "start-with-the-conversation",
        paras: [
          "Before I look at a single comparable sale in Salem or Windham or Derry, I want to know what next year looks like for you. Four questions frame almost every downsizer conversation I have had.",
          "One. Where do you think you are going. Tuscan Village in Salem, a townhouse near the first grandchild in Portsmouth, a single-level condo in Derry, a 55-plus community off Route 111. Maybe out of state to be with a daughter in North Carolina. You do not need a signed purchase-and-sale to answer this. You need a direction.",
          "Two. What is the timing driven by. A retirement date. A wedding. A new grandbaby due in October. Your husband's knee surgery. The answer changes the listing window.",
          "Three. What does the adult-kid calendar look like. If your son in Boston is clearing the basement the second weekend of June and your daughter is coming up from Connecticut in August to help with the attic, the listing date has to respect that. The kids are the unpaid labor force of the downsizing economy. Lose them and the move stalls.",
          "Four. What is your floor. Not your list price, your floor. The number that, if an offer came in at or above it, you would sign today. Most downsizers have a floor that is way below what the house will actually fetch, because they bought it thirty years ago and the equity does not feel real yet. Getting to a real floor early protects you from underselling.",
        ],
      },
      {
        heading: "Staging a lived-in family home",
        id: "staging-a-lived-in-family-home",
        paras: [
          "Staging a downsizer home is not the same as staging a flip. You are not trying to make it look like nobody lives there. You are trying to make it look like the buyer could live there.",
          "The rule I give almost every client: remove everything personal, keep everything comfortable. The framed vacation photos, the kids' artwork on the fridge, the religious items on the shelf, the \"World's Best Grandma\" mugs: those come down and go into a labeled bin. The good reading chair, the wool throw, the framed Norman Rockwell print in the hallway: those stay.",
          "Repaint is almost always worth it. Forty years of life leaves scuffs, a darker shadow where every picture hung, and in most Southern NH houses, at least one room painted a color that made sense in 1996. Two coats of a warm white through the main living areas runs maybe $1,800 to $2,500 with a local painter and returns three to five times that in list price and days-on-market.",
          "Declutter first, then repaint, then stage the soft furniture. Counter surfaces should hold one or two deliberate items, not eight. The guest bedroom that is currently a storage room has to become a bedroom again. If you cannot get there alone, bring in a one-day organizer. I have a short list of people in Salem and Derry who do this well.",
          "The thing I never let a downsizer do: gut-renovate the kitchen to chase the listing. You will not recoup it in the sale window and you will add six months to the timeline. Clean, paint, hardware swap, new cabinet pulls, maybe a new faucet. Stop there.",
        ],
      },
      {
        heading: "Pricing past the emotional attachment",
        id: "pricing-past-the-attachment",
        paras: [
          "This is the hardest conversation I have with downsizers, and I have it every time.",
          "The house is worth what the market will pay for it. The market does not know you raised three children in it. The market does not know your husband built the deck the summer of 2002. The market does not care that you planted the maple out front the week you moved in.",
          "The emotional value is real. It is just not on the list price.",
          "When I price a forty-year family home, I look at the last six months of comps in your specific pocket of Salem or Windham or Derry, the current active listings sitting on the market, the school zone, the lot, the updates, and what the house across the cul-de-sac sold for in February. Then I give you a range. The top of the range is what the house could get in a smooth market with a motivated buyer. The bottom is what it gets if we list it in November and the first serious offer comes in three weeks later.",
          "The wrong move is to list at the emotional number, sit for sixty days, and then chase the market down with two price reductions. The right move is to list at a number that creates showings in the first ten days. The first two weeks on the market are the only two weeks anyone cares. After that, every buyer assumes something is wrong with the house.",
        ],
      },
      {
        heading: "Timing the sale with the next place",
        id: "timing-sale-with-next-place",
        paras: [
          "Almost every downsizer asks the same question: do I sell first or buy first. There is no universal answer, but there are three patterns I see work in Southern NH.",
          "Sell first, rent for 60 to 120 days. You list the house, close on it, take the equity, and move into a short-term rental while you find the next place. This is the cleanest path financially. No bridge loan, no two mortgages, no contingency pressure on the buyer. The downside is you move twice. A lot of my 62-year-old clients hear that and say no thank you.",
          "Sale-contingent purchase. You find the next place, put in an offer contingent on selling your current home, and close them back to back. This works when the next place is buyer-tolerant (think the Tuscan Village condo market or a newer build with a developer who understands the demographic). It does not work on a competitive listing where a cleaner offer will beat yours every time.",
          "Bridge loan or HELOC. You tap the equity in your current home to make a non-contingent offer on the next one, then pay off the bridge when the sale closes. The math works if rates are reasonable and you have the income to carry both payments for two or three months. It falls apart if the current house lingers.",
          "Which one fits you depends on how competitive your next market is, how much carrying-cost risk you can stomach, and whether you are willing to move twice. We figure that out before we list, not after.",
        ],
      },
      {
        heading: "The NH paperwork and the capital gains piece",
        id: "nh-paperwork-and-capital-gains",
        paras: [
          "NH has its own quirks at closing. Two that matter most for downsizers.",
          "The NH Real Estate Transfer Tax is 1.5% of the sale price, split between buyer and seller at 0.75% each. On a $625,000 sale, that is about $4,700 out of your proceeds. Most sellers forget this until the closing disclosure lands. Build it into your net-proceeds math on day one.",
          "Title quirks on older homes are common. A forty-year-old Salem or Derry home may have an old mortgage release that never got recorded, an easement for a neighbor's driveway that predates the current fence, or a homestead designation that needs to be released properly at closing. None of this is dramatic. It just needs a good title attorney catching it three weeks before closing, not three days. I use the same two local attorneys for almost every transaction, and they know what to look for on the older deeds.",
          "The federal capital-gains exclusion is $500,000 for a married couple filing jointly, on a home you lived in for at least two of the last five years. On a house you bought in 1984 for $85,000 and are selling in 2026 for $625,000, that exclusion covers the entire gain. You owe nothing. That is not a loophole, that is how the code is written, and most downsizers still pay for a CPA consult just to hear it confirmed. For a single filer (widowed, divorced) the exclusion is $250,000, which can leave a taxable gain on a long-owned Southern NH home. If that is you, the CPA call is not optional, it is essential.",
          "If you are moving to a smaller NH town to cut the property tax bill, I wrote a companion piece on [mill rates across Salem, Windham, and Derry](/blog/nh-property-tax-by-town-salem-windham-derry) that covers the math.",
        ],
      },
      {
        heading: "What to do with forty years of stuff",
        id: "forty-years-of-stuff",
        paras: [
          "This is the part nobody warns you about, and it is the part that stalls more downsizer moves than pricing or timing.",
          "Start early. Six months before the target listing date is not too early. Three months is cutting it close. Two months and you are moving boxes into a storage unit you will still be paying for eighteen months from now.",
          "Walk the adult kids through the house first. Anything they want, they take or they claim by a specific date. A box labeled \"Michael\" sitting in the basement for four months is not a claim, it is a stalling tactic. Set the date, hold the line.",
          "For everything else, the Southern NH downsizer has four realistic exits.",
          "Estate sale or tag sale. For houses with genuinely good furniture, antiques, or collectibles, a professional estate sale company will run a two-day event and take 25 to 35 percent. Worth it if the house has real pieces. Not worth it for builder-grade furniture.",
          "Donation. Goodwill on Route 28 in Salem takes furniture, housewares, clothing, and most household goods. Rockingham Community Action in Derry and Raymond runs a furniture program for families in transition and will often pick up larger pieces. The Salvation Army in Haverhill crosses the border for pickups in Southern NH. Get the donation receipts; they matter at tax time.",
          "Consignment. For specific categories (clothing, designer handbags, mid-century furniture), a consignment shop in Andover or Nashua can move pieces that would not sell at an estate sale and would be wasted at donation.",
          "Haul-away. Whatever is left at the end is junk haul. A 20-yard dumpster in the driveway for a weekend runs $400 to $600 in Salem or Derry and is the single most cathartic purchase a downsizer makes.",
          "Start with one room. The one you care about least. Build momentum from there.",
        ],
      },
      {
        heading: "The day of close, and after",
        id: "day-of-close-and-after",
        paras: [
          "The morning of closing, most downsizers cry. Not all of them. Most.",
          "This is normal. It does not mean you made the wrong decision. It means you lived somewhere for a long time, and leaving a place that held your life for forty years is a real thing. I have had clients sign the papers and ask if they can do one last walkthrough of the empty house alone. I always say yes. I wait in the car.",
          "After the signing, the equity hits your account usually within 24 to 48 hours. The next two weeks are a blur of utility transfers, forwarding addresses, DMV updates, and unpacking at the new place. Build a buffer into the schedule. Do not plan a trip three days after closing. Do not host Thanksgiving the first week in the new place.",
          "Six months from now, you will walk into your new kitchen in the morning with your coffee, and it will feel like home. The house you left is still there. The neighborhood is still there. The maple you planted is still in the front yard. You just live somewhere else now.",
          "If you are starting to think about this move and want a no-pressure conversation about what the timing might look like, [here is how I work with sellers](/services), and you can [grab a spot on the calendar](/booking) whenever you are ready.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to pay capital gains tax if I sell the house I have owned for 40 years?",
        a: "If you are married and filing jointly, the federal exclusion is $500,000 on gain from the sale of a primary residence you lived in at least two of the last five years. For most Southern NH downsizers, that exclusion covers the entire gain and you owe nothing. If you are single or widowed, the exclusion is $250,000, which may leave a taxable portion on a long-owned home. Either way, run the numbers with a CPA before listing. The consult is usually $200 to $400 and worth every dollar.",
      },
      {
        q: "Should I downsize before or after my spouse retires?",
        a: "Most of my clients move within 12 months of retirement, often slightly before. Selling while both spouses are still working gives you better lending options if you need a bridge loan, and the move is easier to manage when you are not also adjusting to the first six months of retired life. That said, if one spouse wants to retire in the new place, not the old one, waiting makes sense.",
      },
      {
        q: "What should I do with furniture that will not fit in a condo?",
        a: "Walk the adult kids through first and let them claim what they want by a firm date. For good antiques and furniture, a professional estate sale company can run a two-day event. For everything else, Goodwill on Route 28 in Salem, Rockingham Community Action in Derry, and the Salvation Army in Haverhill all take furniture donations. Get the receipts for your tax return. Whatever is left goes in a weekend dumpster.",
      },
      {
        q: "Is it better to sell in spring or fall in NH?",
        a: "Spring is the stronger seller's market in Southern NH. March through June is when inventory is thin and buyers are most active, especially MA-to-NH relocators who want to close before the school year. Fall (September and October) is the second-best window, and it suits downsizers who need the summer to prep the house and say goodbye to it. Avoid mid-November through January if you have the flexibility; holidays kill showings and the post-holiday listings compete with a surge of new inventory.",
      },
      {
        q: "Can I stay in my house for 60 days after closing?",
        a: "Yes, through a post-occupancy agreement (sometimes called a use-and-occupancy or rent-back). The buyer effectively rents the house back to you for a set period, usually 30 to 60 days, at a daily rate close to their mortgage cost. It is common on downsizer transactions and removes the pressure to have the next place lined up perfectly with the closing date. Build it into the offer before the contract is signed, not after.",
      },
      {
        q: "What happens if I cannot decide where to move next?",
        a: "Nothing bad. You do not have to list yet. The worst downsizer move is signing a listing agreement before you have any sense of where you are going. We can spend a few months touring neighborhoods, visiting 55-plus communities, looking at condos in Tuscan Village, walking through townhouses near the grandkids, and narrowing the landing spot before we talk about your house. The house is not going anywhere. The decision about where you want to spend the next chapter is the one that matters first.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-hero.jpg",
    cardImage: "/images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-card.jpg",
    tldr:
      "If this is your first house and it is in Southern NH, there are five things your Massachusetts friends never had to worry about: a septic system inspection, a private well test, the NH purchase and sales agreement, the annual NH vehicle safety inspection sticker, and town-level zoning. Here is the exact checklist, in order, with what each one costs and when to do it.",
    sections: [
      {
        heading: "Septic systems, the one that blows up deals",
        id: "septic-systems",
        paras: [
          "Septic is the big one. A significant share of the housing stock in Salem's north side, Windham's rural streets, Pelham, Atkinson, and Hampstead is on private septic, not town sewer. If you grew up in Methuen or Andover and always had town sewer, this is new territory.",
          "Here is what happens during the due-diligence window on the P&S. You or your inspector pulls the septic cover, a septic company pumps the tank down, and the inspector confirms the leach field drains the way it should. Expect to pay $400 to $600 for the inspection itself. Budget another $300 to $500 for a pump-out now if the last one was more than three years ago. Tanks should be pumped every three years. A seller who hasn't pumped in seven years is telling you something about how the house has been maintained.",
          "You may hear MA friends talk about \"Title V.\" That's the Massachusetts statute governing septic inspections at sale. NH does not have a Title V equivalent. NH septic rules are set by the Department of Environmental Services, and the inspection at sale is contractual, not statutory. That means the protection you get is whatever your P&S says you get. This is why the inspection contingency language matters, which is covered below.",
          "Signs a system is at end of life: effluent pooling or green grass patches over the leach field, slow drains throughout the house, sewage odor near the tank, pumping needed more than once a year. A full system replacement in Southern NH runs $20,000 to $40,000 depending on soil conditions and whether you need a pump up to a raised field. That is a real number to walk away on if the inspection turns up a failed field.",
        ],
      },
      {
        heading: "Well water, test everything, especially arsenic and radon",
        id: "well-water",
        paras: [
          "If the house is on private well, you are the water utility. NH bedrock carries naturally occurring arsenic and radon in water. Both are common, both are manageable, and both are invisible on a walk-through. Test before you close.",
          "A full water panel in NH runs $300 to $500 and should cover bacteria, nitrates, nitrites, lead, manganese, iron, chloride, uranium, arsenic, and radon in water. Do not accept a bacteria-only test. Your lender may only require bacteria and nitrates, but that is a floor, not a ceiling.",
          "Ask for a flow rate test while the well team is there. A flow test measures how many gallons per minute the well can produce under sustained draw. Anything under 3 gallons per minute with a family of four is going to be a daily frustration. A good test catches this before you are standing in a dry shower.",
          "Common issues and their fixes: arsenic gets a point-of-entry reverse osmosis or adsorption media system, roughly $2,500 to $5,000 installed. Radon in water gets an aeration system, roughly $4,000 to $6,000. Iron staining your sinks orange is cosmetic but annoying; a water softener or iron filter handles it for $1,500 to $3,000. Bacteria is usually a simple UV treatment plus a chlorine shock, $1,000 to $2,000. None of this is scary once you know the menu.",
          "If sellers balk at a real panel, that is the signal. Fold the test into the P&S inspection contingency so you have a clean exit if something comes back hot.",
        ],
      },
      {
        heading: "The NH purchase and sales agreement, different from the MA form",
        id: "the-nh-ps",
        paras: [
          "The NH P&S is not the MA offer-to-purchase plus P&S two-step. In NH, there is typically one document, the Purchase and Sale Agreement, which is the binding contract. A few things to know before you sign.",
          "The standard inspection contingency is usually 10 business days from acceptance, though negotiable up or down. Inside that window you inspect, you test the well, you inspect the septic, you check the radon in air, and you raise any issues in writing. If you and the seller cannot agree on remedy, you get your deposit back through a mutual release. Mutual release is the NH mechanism for unwinding a deal clean, both sides signed, deposit returned. You want this language in your P&S.",
          "The financing contingency is its own clause and has its own deadline, typically 25 to 35 days from acceptance. If your loan falls through inside that window, deposit back. Outside that window, it gets complicated fast.",
          "The title contingency, the deed, the homeowner's insurance binder, and the walk-through within 48 hours of closing are all standard inclusions but worth reading before you sign. Your buyer's agent should walk you through every paragraph. If they hand you a P&S and say \"it's standard, sign it,\" get a different agent. I read every line with every first-time buyer I represent, whether they want me to or not.",
          "One more thing: since August 2024, you will sign a Buyer-Broker Agreement before I can show you a single house. This is new post-NAR-settlement law. It spells out what I get paid and by whom. It is short, it is plain English, and it is covered in [my buyer representation page](/services).",
        ],
      },
      {
        heading: "The annual NH vehicle safety inspection sticker",
        id: "nh-vehicle-inspection",
        paras: [
          "This is the thing every MA transplant gets wrong in their first year. It is NOT an emissions test. It is an annual pass-or-fail safety inspection where a garage checks your brakes, tires, lights, windshield, wipers, horn, exhaust, suspension, steering, and the chassis for rust. $40 to $80 at most shops. The yellow sticker on the driver's side windshield has the month printed on it, and if yours is expired, a NH trooper will notice on I-93 in the first week.",
          "Timing: once you register the car in NH at the DMV, you have 10 days to get the inspection done. Put it on the calendar the same week you close. Most local garages do it while you wait; Salem, Windham, and Derry all have shops that turn it around in 30 minutes.",
          "What to watch for on an older car: frame rust is the most common fail. If you drove the same car through a Massachusetts winter for ten years with no rust-proofing, the undercarriage is going to get scrutinized. A fail is not the end of the world. You get a rejection sticker, you fix the issue, you come back within 60 days.",
          "There is no emissions test at all for gas vehicles model year 1995 or earlier. For newer vehicles, the inspection includes an OBD-II scan, which is functionally an emissions check but it is bundled into the safety inspection. You are not paying separately for it.",
        ],
      },
      {
        heading: "Town-level zoning, the surprise nobody warns you about",
        id: "town-zoning",
        paras: [
          "This is the biggest one, and it is invisible on Zillow. Every town in Southern NH has its own zoning ordinance, its own setback rules, its own ADU rules, its own deck and shed rules, its own fence rules. What you can add to a Windham house is not what you can add to a Salem house, and neither matches Pelham.",
          "Before you write the offer, call the town planning office. Ask them three questions: What zone is the property in? What are the setbacks from property lines for any new structure? Are detached ADUs allowed as of right, by special exception, or not at all? Ten minutes on the phone will save you a six-month fight with the planning board.",
          "Real examples I have seen on first-time buyer deals in the last two years. A family bought in Windham thinking they would add a detached garage; the lot was nonconforming on the side-yard setback, and the zoning board said no. A couple bought in Atkinson thinking they would add an in-law apartment for an aging parent; the town required a 2-acre lot for a detached ADU and they had 1.4 acres. A buyer in Salem bought on a lot the MLS called \"level and usable\" that turned out to be 40% conservation easement, so the backyard shed they wanted to put up was in a no-build zone.",
          "Fence rules. Deck rules. Shed rules over 120 square feet requiring a permit versus under 120 square feet not requiring one. Pool setbacks. Even driveway paving can be regulated in some rural towns. The phrase you want in your head before you make an offer: \"what can I actually do with this property.\" The answer comes from the town, not from Zillow.",
          "If you have specific plans, write them into the inspection contingency. \"This offer is contingent on buyer confirming with the town of Windham that a 20x20 detached garage can be permitted on the property within the existing setbacks.\" Not every seller will accept it, but every first-time buyer should try.",
        ],
      },
      {
        heading: "What to do before you even look at a house",
        id: "before-you-look",
        paras: [
          "Pre-approval first, always. Not a pre-qualification, a real pre-approval with a verified income and asset review. Local NH lenders often out-compete the big national banks on Southern NH deals because they know the septic, well, and condo-warrantability rules and can close on time. I have a short list of three I recommend.",
          "Run the all-in monthly number before you fall in love. Southern NH property taxes are the gotcha. A $600,000 house in Windham at a $19 per thousand equalized rate is roughly $11,400 a year in property tax, or $950 a month on top of principal, interest, and insurance. Your MA friends at the same purchase price are paying less in property tax and more in state income tax. For a full breakdown of how this math works, read [my honest guide to moving from MA to Southern NH](/blog/moving-from-massachusetts-to-southern-nh-honest-guide).",
          "Line up a home inspector who actually works Southern NH regularly. The inspector needs to know septic, well, New England granite ledge, frost line, ice dam patterns, and the quirks of 1970s split-levels with Masonite siding. A Boston inspector driving up for the day is not your best choice.",
          "Sign the Buyer-Broker Agreement with your agent. Under post-NAR-settlement rules this is required before touring. Read it. Ask about the term, the geographic scope, and the termination clause. A good agent will explain all three without being asked.",
          "Decide your towns before you tour. Salem, Windham, Derry, Londonderry, Pelham, Atkinson, and Hampstead all feel different, tax different, and commute different. Narrow to two or three. The [neighborhoods page](/neighborhoods) has the real commute, tax, and school data by town.",
          "Know your numbers. Know your towns. Know your contingencies. Then call me.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a septic inspection when buying a house in Salem NH?",
        a: "Yes, if the property is on private septic and not town sewer. Salem has both; the north side and outer streets are largely on septic. The inspection runs $400 to $600 and happens during the P&S due-diligence window. NH does not have a Title V statute like Massachusetts, so your contractual inspection contingency is your protection. Never skip it, even if the seller offers a credit.",
      },
      {
        q: "How much does a well test cost in NH and what should it include?",
        a: "A full panel runs $300 to $500 and should test for bacteria, nitrates, nitrites, lead, manganese, iron, chloride, uranium, arsenic, and radon in water. Arsenic and radon are common in NH bedrock and invisible without testing. A bacteria-only test is not enough, even if your lender accepts it. Fold the full panel into your inspection contingency.",
      },
      {
        q: "What is different about a NH purchase and sales agreement compared to a Massachusetts P&S?",
        a: "In NH there is usually one binding document, the Purchase and Sale Agreement, rather than the MA two-step of offer-to-purchase plus P&S. Key NH-specific clauses include the inspection contingency (typically 10 business days), the financing contingency (25 to 35 days), and the mutual release mechanism for returning deposits cleanly if the deal falls apart. Every clause is negotiable.",
      },
      {
        q: "How long is the inspection period on a NH P&S?",
        a: "Typically 10 business days from acceptance, though fully negotiable. In tight markets I have seen it shortened to 7 days or even 5; in slower markets 14 is not unusual. During that window you run the home inspection, the septic inspection, the well test, the radon-in-air test, and any specialty inspections like oil tank or chimney. Plan the calendar the day you sign.",
      },
      {
        q: "When do I need to get the NH vehicle safety inspection done after I move?",
        a: "Within 10 days of registering the vehicle at the NH DMV. It is an annual safety inspection, not an emissions test, costs $40 to $80 at most garages, and takes about 30 minutes. The yellow windshield sticker shows the month it expires. Do not drive for more than two weeks on an expired or out-of-state inspection once you are an NH resident.",
      },
      {
        q: "Can I add a deck or detached garage to any house I buy in Windham NH?",
        a: "No, and this is the single biggest surprise for first-time buyers. Every town in Southern NH has its own zoning ordinance with setback rules, ADU rules, and structure-size limits. Nonconforming lots, conservation easements, and wetland buffers can all block what looks like an obvious addition. Call the town planning office before you make the offer, not after. A ten-minute phone call prevents a six-month zoning board fight.",
      },
      {
        q: "What should I do before I even start looking at houses in Southern NH?",
        a: "Four things, in order. Get a real pre-approval from a lender who closes Southern NH deals. Calculate your all-in monthly including NH property tax, which is higher than MA on the same purchase price. Sign the Buyer-Broker Agreement with an agent who represents Southern NH daily. Decide which two or three towns fit your life. Then [book a 15-minute consultation](/booking) and we will build a tour plan from there.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-hero.jpg",
    cardImage: "/images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-card.jpg",
    tldr:
      "Salem is not one town. It is at least four neighborhoods stitched together, and each one has a different price band, different feel, and different buyer. Here is the local's map, drawn street by street.",
    sections: [
      {
        heading: "There is no such thing as \"Salem, NH\", there are four Salems",
        id: "four-salems",
        paras: [
          "If you type \"homes for sale in Salem NH\" into Zillow, the pins scatter across 25 square miles and the algorithm treats all of it as one market. It is not. North Salem behaves like a rural town. Downtown Salem behaves like a small city center. Tuscan Village behaves like a planned suburb. The Canobie Lake side behaves like a lake community that happens to have a zip code. The median price you see on Zillow for \"Salem NH\" is a meaningless average of four submarkets that do not share buyers, do not share housing stock, and do not share character.",
          "Out-of-town buyers almost always lose six to twelve weeks trying to figure this out on their own. They will look at a listing on Lowell Road and another one in Tuscan Village and think they are comparing apples. They are not. The local's job, if you are relocating from Massachusetts or shopping Salem for the first time, is to tell you which of the four Salems you are actually looking at. This is that conversation, written down.",
          "A quick note on method: the price bands below are feel-of-the-market ranges for spring 2026, not a CMA. The ranges help you read listings. For a real number on a real house, [book a 15-minute call](/booking) and we will pull comps together.",
        ],
      },
      {
        heading: "North Salem: older colonials, stone walls, the quietest Salem",
        id: "north-salem",
        paras: [
          "North Salem starts where the commercial strip ends. You take Route 28 north past the mall exit, past the Market Basket, and once you get to the intersection at Lowell Road you are in a different Salem. Older colonials on half-acre lots, a few farmhouses, the stone-wall-and-tree-line streets that look nothing like the Tuscan Village side. Brady Avenue, Pond Street, Ermer Road. That is the neighborhood you drive into when the buyer says they want a quieter Salem but does not want to leave the town line.",
          "The housing stock is mostly 1970s and 1980s colonials with a scatter of older capes and a handful of farmhouses that predate most of the rest of the town. Lot sizes open up here. Half-acre is common, three-quarters and full acres show up on the side streets. The streets have less traffic than anywhere else in Salem, and a few of them still feel rural enough that you will see a horse trailer parked in a driveway.",
          "Price band: this is typically the most accessible of the four Salems for a detached home in reasonable condition. Mid-range colonials here often come in slightly under the Salem median, because the commercial tax base and the walkable amenities are concentrated down by Route 97 and Tuscan, not up here. If you are buying for land and quiet over walkability, North Salem is usually the answer. If you are buying to walk to coffee, it is the wrong answer.",
          "Who it fits: buyers who want Salem taxes and schools without the Salem traffic. Families with kids who want the lot. Downsizers who already live in Salem and want to stay in the same school district for the grandkids without being on top of the mall.",
        ],
      },
      {
        heading: "Downtown Salem and the Main Street corridor: the widest spread in town",
        id: "downtown-salem",
        paras: [
          "Main Street, Route 97, the stretch from the Salem Common down toward the Methuen line. This is the oldest slice of Salem and the most varied. The housing stock runs the whole length from genuine pre-1900 colonials with the original fireplaces still in the wall to 1950s capes to 1980s multi-families. You will find a $425,000 starter that needs a kitchen and a $950,000 restored Victorian on the same half-mile of road.",
          "The last five years have been kind to downtown. LaBelle Winery brought real dinner traffic. Copper Door is steady on weekends. A handful of the older retail bays have turned over to coffee, breweries, and small independents. It is not Portsmouth, nobody is pretending it is Portsmouth, but the corridor has more reasons to walk it now than it did in 2019. That is a real shift for resale value on the houses close to it.",
          "Price band: the widest spread in Salem. Entry-level if the house needs work. High five hundreds to high six hundreds for a clean, move-in-ready renovation. The genuinely old character homes, fully restored, clear seven figures when the right one hits. This is the Salem section where the listing photos mislead most often. A $500,000 house on Main Street might be a gut job or might be a dream, and you cannot tell from the MLS thumbnails.",
          "Who it fits: buyers who want walkability and do not mind traffic noise on the weekends. MA relocators who are used to a downtown and want that feel. Anyone who wants character, original woodwork, and a front porch that looks like a front porch should look.",
        ],
      },
      {
        heading: "Tuscan Village: the Salem that does not feel like Salem",
        id: "tuscan-village",
        paras: [
          "The confusing part of Tuscan Village for out-of-town buyers is that it is technically Salem but does not feel like the rest of Salem. The townhomes are new-construction, HOA-governed, and built around the Market. Salem's older neighborhoods do not have an HOA and never will. If you grew up in a town with HOAs or are moving from a planned MA community like Westford's villages, Tuscan will feel like home faster than the rest of Salem will.",
          "Tuscan is grocery-anchored. The Tuscan Market is the flagship, and it is the center of gravity for the whole development. Around it sit the townhomes, the condo buildings, the restaurants, a spa, a couple of boutiques, the summer concert lawn. Everything is walkable from everything. The sidewalks are real sidewalks. The landscaping is maintained by the HOA. None of that is a knock. It is just not what the rest of Salem looks like.",
          "Price band: premium for new construction. Townhomes run materially higher than comparable square-footage older product on the Main Street side or in North Salem. You are paying for the newness, the HOA maintenance, the walkable amenities, and the fact that inventory here moves fast. Condos in the buildings sell at a different band again. HOA fees are real and vary by building, so read the condo docs.",
          "Who it fits: downsizers who want no lawn and no roof to think about. MA buyers relocating from a planned community who want the HOA safety net. Professionals who want to walk to dinner and do not want to deal with the older housing stock's quirks. Not for you if you want a yard, a driveway you can park three cars in, or a house with a history older than your mortgage.",
        ],
      },
      {
        heading: "The Canobie Lake side: summer character folded into year-round living",
        id: "canobie-lake",
        paras: [
          "Canobie Lake is the part of Salem that still reads as a New England lake community. Christian Avenue, Lakeshore Road, the Pond Street stretch that feeds the lake side. Older cottages that have been winterized over the decades. A few genuinely waterfront houses with docks. A much bigger pool of water-view homes one or two streets back that see the lake without touching it.",
          "This is where the language matters. Waterfront and water view are two different price tiers. Waterfront means the property line touches the water and you have a dock or a right to build one. That is the premium-plus category, and there are not many of them. Water view is everything from a clear look down the hill to a seasonal glimpse through the trees when the leaves drop. The water-view homes run a meaningful premium over a comparable inland Salem house, but nothing like the waterfront premium. Out-of-town buyers frequently mix these up and set their budget wrong in both directions.",
          "The character of the neighborhood shifts with the seasons in a way the rest of Salem does not. Summer is busier, boats, families at Canobie Lake Park across the way, traffic up and down Route 111. The off-season is genuinely quiet. Some of the streets have more year-round residents now than they did twenty years ago, because the winterized cottages keep getting bought and upgraded into real houses. This is not a summer-only neighborhood anymore, but it carries the memory of one.",
          "Price band: waterfront is premium-plus, sometimes well into seven figures for a properly sited house with a dock. Water view is a real but smaller premium. Inland on the lake side, a block or two back, you are often at or slightly above the Salem median. If the listing says \"Canobie Lake area\" and you cannot see water from the photos, you are paying for proximity, not view.",
          "Who it fits: buyers who want the lake as a lifestyle, not as a weekend. Families who want their kids to swim in summer and have a real neighborhood in winter. Empty-nesters who want the water view as the reward for thirty years of colonial living.",
        ],
      },
      {
        heading: "Salem schools: the piece nobody explains clearly",
        id: "salem-schools",
        paras: [
          "The Salem school district is its own elementary-through-high-school system. Barron Elementary, Lancaster, Fisk, and Haigh feed up. Woodbury is the middle school. Salem High is the high school. It is a full in-town system, which is one of the things that separates Salem from Derry, where the high school is Pinkerton Academy, an independent school that most Derry students attend on a town-tuition basis.",
          "The practical difference: in Salem, you are in the same district from kindergarten through twelfth grade and the buildings are physically inside the town. In Derry, the path is public K through 8 and then Pinkerton. Both systems have their advocates. Parents coming from Massachusetts frequently do not realize that Pinkerton is an independent school until they are already under contract on a Derry house. In Salem there is no such surprise. Your kid goes to Salem High.",
          "Feeder patterns inside Salem matter for a few elementary choices, and they shift occasionally. Barron tends to draw from the downtown and northern parts of town. Lancaster pulls from the southern side toward Methuen. If the elementary school is a deciding factor for you, do not assume the listing's neighborhood tells you the zone. The district lines are specific and they are worth pulling before you write an offer. [I can send you the current feeder map](/booking) on a call.",
          "For buyers comparing Salem to Windham or Londonderry, the public-school picture is the biggest single structural difference. More on that in [the Windham, Derry, or Londonderry buyer's guide](/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town).",
        ],
      },
      {
        heading: "Commute realities: I-93, Route 28, and what the GPS does not tell you",
        id: "commute-realities",
        paras: [
          "Salem's commute math is built around I-93. Exit 2 is the local ramp, off Pelham Road. Most Salem commuters use it going south toward Boston or north toward Manchester. Exit 3 is Windham's, and on heavy-traffic mornings some Salem drivers from the northern neighborhoods skip over to it.",
          "Going south to Boston, the Salem-to-downtown-Boston run is roughly 45 to 55 minutes on a clean morning, 60 to 75 on a bad one, and regularly longer than that when weather or an accident stacks up I-93 south of Methuen. The Exit 2 park-and-ride has Boston Express Bus service that a lot of Salem commuters swear by, and if you are moving from a Massachusetts town where the T was your default, the bus is worth trying before you commit to driving every day.",
          "Going north, Route 28 is how you get around locally. If you are running errands, going to the mall, heading to Market Basket, or driving your kids to sports at Canobie Lake Park, you are on 28. It is not a commuter road, it is a local road, and traffic patterns on it are completely different from I-93. From North Salem, Route 111 connects you east to Windham and west to Derry without touching the highway, which is how locals skip the commercial stretch when they need to.",
          "For MA buyers coming from Methuen, Andover, or Haverhill, the honest answer on the commute is that Salem is further from Boston than you are used to, and the winter mornings are longer. It is a real trade, and the tax savings have to justify the extra thirty to forty minutes of windshield time per day. For buyers coming from further south in Massachusetts, Salem is usually a win even after the commute adds up.",
        ],
      },
      {
        heading: "How to choose which Salem fits you",
        id: "how-to-choose",
        paras: [
          "The short version: pick the Salem that matches how you actually live, not the one with the best photography.",
          "If you want a yard, quiet streets, and do not need walkability, you are looking at North Salem. If you want a downtown feel, character housing, and restaurants in walking distance, you are looking at the Main Street corridor. If you want no maintenance, new construction, and HOA-managed everything, you are looking at Tuscan Village. If the lake is your reason for buying a house at all, you are looking at the Canobie side and you need to know whether you are actually paying for waterfront or for a view.",
          "The price bands overlap enough that a lot of buyers can afford more than one of these, and that is usually where the decision actually gets made. Not on the Zillow filter. On a Saturday driving through all four and feeling which one sounds right when you roll the windows down.",
          "If you want that Saturday with a local who will tell you the truth about each one, [book a 15-minute call](/booking) and we will map your search to the Salem that actually fits. No pressure, no Zillow lead routing, just a real conversation about your list. If you are still deciding between Salem and the towns just north, start with [the Windham, Derry, or Londonderry buyer's guide](/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town). And if you want the full map, the [neighborhoods overview](/neighborhoods) has each of these broken down alongside Windham, Derry, Londonderry, and Pelham.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between Tuscan Village and downtown Salem?",
        a: "Tuscan Village is a new-construction, HOA-governed development anchored by the Tuscan Market. Housing is townhomes and condos, everything is walkable from everything, and the lawns are maintained for you. Downtown Salem is the older Main Street corridor with a mix of pre-1900 character homes, mid-century capes, and multi-families, no HOA, and a wider price spread. Tuscan feels like a planned community. Downtown feels like a small New England main street. Different housing stock, different buyers, and often different budgets.",
      },
      {
        q: "Is Canobie Lake only a summer neighborhood?",
        a: "Not anymore. Thirty years ago much of the Canobie Lake side was seasonal cottages. Most of those have since been winterized and converted to year-round homes, and a lot of the streets are now genuinely year-round neighborhoods with year-round residents. Summer is still busier because of the lake and Canobie Lake Park across the way, and some waterfront properties still change character with the seasons, but you can absolutely buy year-round on the Canobie side.",
      },
      {
        q: "How are Salem's public schools?",
        a: "Salem has a full in-town K through 12 district. Elementary schools include Barron, Lancaster, Fisk, and Haigh, with Woodbury as the middle school and Salem High as the high school. That is structurally different from neighboring Derry, where high schoolers attend Pinkerton Academy, an independent school. Families moving from Massachusetts often do not realize that difference until late in the search, so it is worth knowing up front. I can send you the current Salem feeder map and the latest performance data on a call.",
      },
      {
        q: "Can I find older character homes in Salem NH?",
        a: "Yes, and the most reliable places to look are the Main Street corridor and parts of North Salem. Main Street has pre-1900 colonials and Victorians, some fully restored and some in need of work. North Salem has older colonials and farmhouses on larger lots. Tuscan Village is all new construction and will not have older character homes at all. The Canobie Lake side has some winterized cottages with real character, but they are a different building type than a true colonial.",
      },
      {
        q: "Is North Salem more expensive than downtown Salem?",
        a: "Usually the opposite. North Salem tends to come in slightly under the Salem median for a comparable detached colonial in reasonable condition, because the walkable amenities and the commercial tax base are concentrated closer to Route 97 and Tuscan Village. The Main Street corridor has a wider spread, including some of the most expensive restored character homes in Salem and also some of the most affordable entry-level properties. You are usually paying for walkability and character downtown, and paying for quiet and lot size up in North Salem.",
      },
      {
        q: "What is the commute from Salem to Boston really like?",
        a: "A clean morning from Salem to downtown Boston on I-93 is about 45 to 55 minutes, and a bad one is 60 to 75, with regular backups south of Methuen. Exit 2 is the Salem ramp and it has a park-and-ride with Boston Express Bus service that a lot of commuters prefer to driving. Going north to Manchester is closer to 25 to 30 minutes. Buyers coming from inside 495 will find the Salem commute longer than what they are used to. Buyers coming from further south in Massachusetts usually find the tax savings more than justify the extra drive time.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-hero.jpg",
    cardImage: "/images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-card.jpg",
    tldr:
      "If you live in New Hampshire but earn your paycheck in Massachusetts, Massachusetts still taxes that income at a 5 percent flat rate, plus a 4 percent Millionaires Surtax on any portion above $1M. The only way to stop paying MA income tax is to change where the income is sourced, not where you sleep. There are exactly three legal paths to do that, and one buyer profile that actually saves the most by moving.",
    sections: [
      {
        heading: "The pitch, and the part nobody finishes saying",
        id: "the-pitch",
        paras: [
          "The pitch for moving to New Hampshire usually starts with no income tax. That line is technically true and practically misleading if you are still commuting to Boston or still on a Massachusetts W-2. Massachusetts sources income to where it is earned, not where the worker sleeps. If your W-2 says Cambridge and your new address says Salem, MA still treats that paycheck as Massachusetts income.",
          "I hear a version of this every week. A couple in Methuen or Andover gets excited about Salem or Windham, runs the numbers in their head, assumes the 5 percent MA income tax disappears the moment the moving truck crosses I-93, and then sits across from their CPA in March wondering why the refund never showed up. It is the single most expensive misunderstanding in the MA-to-NH relocation playbook, and it is the reason I lead this conversation with math, not excitement.",
          "New Hampshire is still a good move for a lot of Boston-commuting families. It is just not a good move because of income tax. It is a good move despite the income tax, and only if the rest of the numbers work.",
        ],
      },
      {
        heading: "How Massachusetts actually sources your income",
        id: "how-ma-sources-income",
        paras: [
          "The rule is simple and strict. Massachusetts taxes **MA-source income** regardless of where the earner lives. Source is determined by where the work is performed, not where the worker resides. A W-2 job at a Cambridge biotech, a Boston law firm, a Waltham tech company, or a Worcester hospital generates Massachusetts-source income on every dollar earned while the work happens in the Commonwealth.",
          "Residency changes your filing status (nonresident instead of resident), but it does not change the underlying source rule. As a NH resident commuting to MA, you file a Massachusetts Form 1-NR/PY (nonresident or part-year resident return) and pay MA income tax on every dollar of MA-source wages. Your new NH address does not reduce that liability. It just changes the form.",
          "The one place residency does help: any income that is **not** MA-sourced. Interest, dividends, capital gains on non-MA assets, and wages from work physically performed in New Hampshire all escape Massachusetts once you are a NH resident. But if your paycheck says Cambridge, the paycheck stays Massachusetts.",
        ],
      },
      {
        heading: "The real math on a $140K MA salary",
        id: "the-real-math",
        paras: [
          "Concrete numbers, because abstractions don't cost anything and taxes do.",
          "On a $140K MA-sourced salary, Massachusetts flat income tax is $7,000 at 5 percent. On a $200K salary it is $10,000. On a $350K salary it is $17,500. On the portion of any income over $1M (rare but worth noting for some of my seller-side relocating clients and for dual-income tech households in a big equity year), the **Millionaires Surtax** adds another 4 percent on top, so the effective rate on that top slice is 9 percent. The surtax has been in effect since January 2023 and it applies to the portion above $1M, not to the whole number.",
          "Crossing into NH does not touch any of those numbers unless the income itself becomes NH-sourced. The commute does not change the source. The mortgage address does not change the source. Only where the work is performed changes the source.",
        ],
      },
      {
        heading: "The all-in picture: MA resident vs. NH commuter",
        id: "ma-resident-vs-nh-commuter",
        paras: [
          "Here is where the conversation usually turns. A lot of clients assume that even if MA keeps the income tax, the total tax picture still favors NH because of property tax and sales tax. Sometimes that is true. Often it is less true than they expect.",
          "Run a real example. A dual-income household earning $140K combined, buying a $650K home, choosing between staying in Methuen MA or moving to Salem NH.",
          "**Methuen MA option:** MA income tax at 5 percent on $140K is $7,000. MA property tax at roughly $13.44 per $1,000 (Methuen 2025 rate) on $650K is about $8,736. MA sales tax on roughly $30K of annual taxable purchases at 6.25 percent is about $1,875. All-in visible state and local tax: about $17,611.",
          "**Salem NH option (commuting to MA):** MA income tax at 5 percent on $140K (still MA-sourced) is $7,000. NH property tax at roughly $19.50 per $1,000 (Salem 2025 rate) on $650K is about $12,675. NH sales tax: $0. All-in visible state and local tax: about $19,675.",
          "In this specific scenario the MA-commuting NH buyer pays **more** in total, not less. The higher NH property tax more than offsets the sales tax savings, and the MA income tax does not go away. The picture flips in NH's favor at lower home prices, in lower-tax NH towns (Windham and Londonderry run materially cheaper per $1,000 than Salem), at higher household spend levels where the 6.25 percent MA sales tax bites harder, or when the income stops being MA-sourced. This is the actual conversation, not the pitch. For the property-tax half of the equation by town, see [the full NH property-tax-by-town breakdown](/blog/nh-property-tax-by-town-salem-windham-derry).",
        ],
      },
      {
        heading: "The three legal paths to stop paying MA income tax",
        id: "three-legal-paths",
        paras: [
          "There are exactly three. Everything else is wishful thinking.",
          "**Path one: Your employer re-sources your W-2 to New Hampshire.** If your work is genuinely being performed from your NH home (fully remote, no regular in-office days), your employer can issue your W-2 with New Hampshire as the work state rather than Massachusetts. The paycheck is then NH-sourced and MA has no claim. This requires your employer's payroll and HR to formally register with NH, change your W-2 state code, and treat you as a NH employee for wage reporting. Some employers do this easily. Some refuse because the administrative overhead of multi-state payroll registration isn't worth it for one employee. Ask before you assume.",
          "**Path two: You change jobs to a New Hampshire-based employer.** A NH-based employer paying you for NH-performed work is entirely NH-sourced. Manchester, Nashua, Portsmouth, and Bedford all have real job markets in tech, healthcare, finance, and biotech. The trade is usually a pay cut compared to Boston-market wages, so the math has to be run carefully: a 10 percent pay reduction to escape a 5 percent tax bill is a losing trade on the income side alone (though it may win on commute time and quality of life).",
          "**Path three: You become self-employed or a consultant with New Hampshire as your business home.** An LLC or sole proprietorship based in NH, serving clients wherever they are, generates NH-sourced business income. This is the most flexible path and the most common one for the couples I work with who have the career latitude to restructure. There are caveats: if your consulting work involves traveling into MA to perform services on-site, the MA-sourced portion still owes MA tax. But for remote consulting, agency work, and online businesses, this path cleanly severs the Massachusetts hook.",
          "All three paths share the same principle: change where the income is earned, not just where you sleep. Until one of those three things happens, the MA income tax follows you across the border.",
        ],
      },
      {
        heading: "Which buyer profile actually saves the most by moving",
        id: "which-buyer-profile-wins",
        paras: [
          "The MA-to-NH move pays off the hardest for one specific profile: **the buyer whose income is already not tied to Massachusetts.** That includes retirees drawing Social Security, pension income, and IRA distributions (none of which are MA-sourced wages, all of which escape MA income tax entirely when the retiree becomes a NH resident). It includes fully-remote employees of an out-of-state, non-MA employer (a New York bank, a California tech company, a Texas healthcare firm) because the income was never MA-sourced to begin with, so moving to NH just adds the NH-side benefits without triggering the MA trap. It includes NH-based employees already who are renting in MA for proximity reasons and ready to own on the side of the border where their work is. And it includes self-employed consultants, agency owners, and online business operators who can legitimately base their operations in NH.",
          "For these profiles, the pitch actually works. No income tax, no sales tax, and the NH property tax is the only meaningful state-tax expense they carry. The cost-benefit on a home purchase looks genuinely favorable, and the all-in math usually beats the MA equivalent at every home price above about $500K.",
        ],
      },
      {
        heading: "What about Boston-based remote workers?",
        id: "boston-based-remote-workers",
        paras: [
          "This is the messy middle. A lot of my buyer clients are MA residents today working for a Boston-area employer that went \"fully remote\" in 2020 and stayed that way. The question is: if you move to NH and keep working remotely for a Cambridge or Boston company, is the income MA-sourced or NH-sourced?",
          "Short answer: it depends on what the employer writes on your W-2 and how Massachusetts interprets the arrangement.",
          "MA's pandemic-era telecommuting rule (the one that let MA tax remote workers who had previously commuted in) expired in September 2021. Since then, if your work is genuinely performed at your NH home for a MA employer, and the employer updates your W-2 state code to NH, the income is NH-sourced and MA has no claim. But if your employer keeps your W-2 coded as MA, you file as a MA nonresident and owe MA income tax on those wages until the employer fixes it.",
          "The operational reality: **the employer's W-2 coding is the deciding factor for most employees**, not the employee's work-from-home reality. Before you count on this escape hatch, get it in writing from HR that your state of work on the W-2 will change when you move. If they say no, you are staying MA-sourced.",
        ],
      },
      {
        heading: "The NH advantages that still hold",
        id: "nh-advantages-that-hold",
        paras: [
          "I want to be clear: even with the income-tax trap, New Hampshire still offers real tax advantages that Massachusetts cannot match. The question is just whether they win for your specific situation.",
          "No state sales tax. On $30K of annual taxable spending, that is about $1,875 a year back in the household budget versus MA's 6.25 percent. No state tax on interest and dividends. NH's old I&D tax was eliminated effective January 2025. Investment and retirement income is fully tax-free at the NH state level. No estate or inheritance tax in NH. MA has one of the most aggressive state estate taxes in the country, starting at $2M. NH has none. For families approaching that threshold, the estate-tax savings alone can dwarf every other line item on this page. Elderly and veteran property-tax exemptions. Most Southern NH towns offer meaningful exemptions that reduce the property-tax bill materially for qualifying residents. Salem, Windham, Derry, and Londonderry all participate. Lower cost-of-living on many non-tax items. Gas, auto insurance, and registration fees all run below MA equivalents. The gap is real, though it isn't as dramatic as the income-tax pitch suggests.",
          "Add it up honestly and NH usually wins on the non-income-tax side of the ledger. It is the income-tax side that the pitch oversells, and that is the part I make sure every client understands before they sign anything. For the full MA-to-NH relocation picture, including commute math, DMV steps, and school comparisons, read [the honest guide to moving from Massachusetts to Southern NH](/blog/moving-from-massachusetts-to-southern-nh-honest-guide).",
          "If you want to run your actual numbers with someone who will tell you straight whether the move wins for your household or costs you money, [grab a free 15-minute call on my calendar](/booking). I will walk through the math with you, and if the move does not pencil out, I will be the first person to tell you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I still pay MA income tax if I move to NH but commute to Boston?",
        a: "Yes. Massachusetts taxes income based on where the work is performed, not where the worker lives. If your W-2 shows a MA work state, you file a MA nonresident return (Form 1-NR/PY) and pay the 5 percent flat tax on every dollar of MA-sourced wages. Moving to NH changes your filing status, not your liability on that income.",
      },
      {
        q: "Can I save on taxes by moving to NH if I work in Cambridge?",
        a: "Only partially. You lose no income tax on MA-source wages (the Cambridge paycheck still owes MA 5 percent), but you gain no MA sales tax, no NH income tax on non-MA-sourced income (like investment income or a side business), and no MA estate tax. Whether that package beats staying in MA depends on your home price, your spending level, and your non-wage income. Run the numbers both ways before assuming NH wins.",
      },
      {
        q: "What is the Millionaires Surtax and does it apply to me?",
        a: "The Millionaires Surtax is a 4 percent additional Massachusetts tax on income above $1M, in effect since January 2023. It stacks on top of the regular 5 percent flat rate, so the effective rate on the portion above $1M is 9 percent. It applies to MA-sourced income for both residents and nonresidents. Most households will never hit the threshold, but a big equity-vesting year, a business sale, or a large bonus can trigger it unexpectedly for a single tax year.",
      },
      {
        q: "Do NH residents pay Massachusetts income tax on rental property located in MA?",
        a: "Yes. Rental income from MA-located real estate is MA-sourced regardless of where the landlord lives. A NH resident owning a two-family in Lowell or a condo in Boston files a MA nonresident return and pays MA income tax on the net rental income. The same rule applies to capital gains on the sale of MA property.",
      },
      {
        q: "Can my employer switch me to a NH-based W-2?",
        a: "Sometimes, and it is worth asking formally. If your work is genuinely performed from your NH home, your employer can update your W-2 state code to NH, register with NH for payroll purposes, and treat you as a NH employee. Some employers do this routinely. Others refuse because of the administrative overhead of adding a new state to payroll. Get the answer in writing from HR before you count on it in your relocation math.",
      },
      {
        q: "Is it worth moving to NH if I still work in MA?",
        a: "It can be, but not for the income-tax reason most people assume. The move pencils out when the combined effect of no sales tax, no NH income tax on non-wage income, no estate tax, better quality of life, and the specific NH property-tax rate in your target town beats the Massachusetts alternative. For some households on some home prices in some towns, it wins clearly. For others, it is close to a wash or a small loss. I walk through the actual numbers with every relocating client before we tour a single house.",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-hero.jpg",
    cardImage: "/images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-card.jpg",
    tldr:
      "Opendoor typically pays 70 to 80 percent of fair market value, adds a service fee of roughly 5 percent on top of that reduced offer, then deducts thousands more after the inspection. On a $500,000 Southern NH colonial, the seller nets around $370,000 with Opendoor versus roughly $475,000 listing traditionally, which is the $45,000 gap Real Estate Witch documents as the national average. For most Salem, Windham, Derry, and Londonderry sellers with 30 days of flexibility, the math says list.",
    sections: [
      {
        heading: "What Opendoor actually is",
        id: "what-opendoor-is",
        paras: [
          "Opendoor is an iBuyer, which is the industry term for a company that buys your house directly with its own cash, holds it briefly, does light cosmetic work, and then relists it or sells it wholesale to an investor. Offerpad runs the same model. So do a handful of smaller cash-buyer operations that show up in Southern NH search results under names like \"We Buy Houses\" and \"NH Home Buyers.\" The pitch is identical across all of them. You request an offer online, a price comes back in a day or two, you pick your closing date, and you skip showings, inspections, and the wait. It is a real service with a real use case. Some sellers should take it.",
          "The business model is not complicated. Opendoor needs to pay less than the house is worth on the open market, because their margin is the spread between what they pay you and what they sell it for after light repairs, minus their holding and transaction costs. That margin has to cover their risk. If the market softens between when they buy your house and when they relist it, they eat the loss. So they price the offer conservatively, add fees that protect their margin, and bake in a repair deduction they surface only after the inspection. None of this is hidden. It is just quiet until the final numbers land on the page.",
        ],
      },
      {
        heading: "The three-part fee structure",
        id: "the-three-part-fee-structure",
        paras: [
          "There are three separate costs stacked inside an Opendoor offer, and most sellers I talk to are only tracking the first one. The offer itself, the service fee, and the repair deductions. They compound.",
          "The first is the offer price. Real Estate Witch's 2024 research on iBuyer pricing puts Opendoor's typical offer at 70 to 80 percent of fair market value. That is not a fringe number. That is the average across thousands of offers. On a $500,000 Southern NH colonial, that puts the initial offer somewhere between $350,000 and $400,000 before anything else happens.",
          "The second is the service fee. Opendoor charges roughly 5 percent on the gross offer, sometimes higher depending on the market and the condition of the home. That fee is their substitute for a listing commission, and it comes out of the offer price, not on top of it. On a $400,000 gross offer, 5 percent is $20,000.",
          "The third is the repair deduction. After Opendoor sends an inspector through the house, they come back with a list of items they say they have to fix before relisting. Old roof, aging HVAC, a septic system that is overdue for service, window seals, deck boards. The cost of those repairs gets deducted from the offer. The seller has no ability to do the repairs themselves to avoid the deduction. The number Opendoor quotes is the number, and it typically lands somewhere between $5,000 and $15,000 on an average-condition home. Sometimes much more.",
          "Three cuts. They stack. That is how you end up $45,000 off the traditional listing outcome without ever feeling like you were in a negotiation.",
        ],
      },
      {
        heading: "The $45,000 math on a $500K Southern NH colonial",
        id: "the-45000-math",
        paras: [
          "Here is the Salem colonial I ran numbers on last month. Four-bedroom, built in 1993, on a quiet cul-de-sac off Lawrence Road. The seller is a widow in her early sixties, downsizing to a single-level near her daughter in Londonderry. Three recent comps within a half-mile closed between $495,000 and $512,000. Fair market value: $500,000. That is the anchor.",
          "Opendoor's instant offer came in at $398,000. That is right on the 80 percent line Real Estate Witch reports. Clean round number, fast offer, nothing shady about it. It is just what the model produces.",
          "The service fee on that offer was 5.5 percent, or $21,890. That came off the top of the $398,000 gross, not added to it.",
          "The post-inspection repair deduction was $6,800. The seller's septic needed a pump-out and a D-box inspection, three second-floor windows had failed seals, and the deck required a railing repair to meet Opendoor's resale standard. None of those items would have killed a traditional sale. In fact, most of them would have been handled in a pre-listing walk-through for a fraction of the deducted amount.",
          "The net after those three cuts was $369,310. That is what would have landed in her account at closing, before standard NH closing costs.",
          "Now run the same house on a traditional listing. Fair market value is $500,000. On a standard Southern NH listing at a 2.5 to 3 percent listing-side commission, the fee is $12,500 to $15,000. Add the NH state transfer tax, which runs $7.50 per $1,000 of sale price, so $3,750 on $500,000. Add title insurance and a closing attorney, call it another $1,800 combined. Total traditional closing costs to the seller: roughly $18,000 to $20,500.",
          "Net at closing with a traditional listing: about $479,500 to $482,000.",
          "Net with Opendoor: $369,310.",
          "Spread on this exact house: around $110,000. Above the national average, because this is a tidy home in a good Salem neighborhood where the market strongly favors a traditional sale. The Real Estate Witch $45,000 average figure captures homes across a much wider condition and market spectrum. In Salem, Windham, Derry, or Londonderry, on a typical three-to-four-bedroom colonial in livable shape, the number is often bigger than $45,000. You can read more about how the listing-side commission actually works in [my post on the 2 to 3 percent commission range post-August 2024](/blog/two-to-three-percent-commission-explained-post-august-2024).",
        ],
      },
      {
        heading: "The trade the seller is actually making",
        id: "the-trade",
        paras: [
          "Here is the thing that rarely gets said clearly. The Opendoor offer is not bad. It is a specific trade. The seller is giving up roughly $45,000 to $110,000 in equity, on average, in exchange for four things that are genuinely valuable to certain people.",
          "Speed. The offer comes in days, not weeks. Closing can happen in two weeks if the seller wants that.",
          "Certainty. There is no buyer financing contingency, no inspection re-negotiation where the buyer tries to reopen the deal, no appraisal gap if the lender comes in low. The price is the price and it closes.",
          "Zero showings. No staging, no cleaning the house every Saturday morning, no strangers walking through the kitchen.",
          "No repair negotiation. The repair deduction is the repair deduction. The seller does not write checks to contractors, does not chase estimates, does not find out two days before closing that a buyer wants $8,000 off for a water stain in the basement.",
          "If those four things are worth $45,000 to a seller, Opendoor is the right call. For an estate executor with three siblings and a hard probate deadline, it might be. For a job relocation with a 30-day window and no flexibility, it might be. The problem is not that sellers choose Opendoor. The problem is that most sellers I meet do not know the number they are trading away is that big.",
        ],
      },
      {
        heading: "When Opendoor is the right call",
        id: "when-opendoor-is-right",
        paras: [
          "I will say this plainly, because the honest version of this post matters more than the sales version. Opendoor is the right call in a handful of specific situations.",
          "Estate sales under time pressure. When the executor is in another state, the siblings are fighting, and the goal is to convert the house to cash and close the probate file, Opendoor's certainty and speed are worth the haircut.",
          "Job relocations with zero buffer. A corporate move with a 30-day report date and no temporary housing budget is a real constraint. The seller who has to be in Atlanta in four weeks cannot afford a deal that falls apart on day 28.",
          "Major deferred maintenance the seller cannot finance. If the roof is shot, the septic has failed, the kitchen is from 1978, and the seller does not have $40,000 to put into the house before listing, Opendoor will absorb that condition in their offer. A traditional buyer often will not.",
          "Houses traditional buyers will reject outright. Severe foundation issues, active mold, a failed inspection that prices the house out of FHA and conventional financing. Cash buyers exist for a reason.",
          "If you are in one of those four situations, I will tell you that on the phone. I am not going to list a house I cannot sell at a fair price. I would rather send you to Opendoor than take a listing that sits for 90 days and gets stale.",
        ],
      },
      {
        heading: "When Opendoor is the wrong call",
        id: "when-opendoor-is-wrong",
        paras: [
          "And now the other side, because it is the larger side. Opendoor is the wrong call for most sellers in Southern NH, and the reasons are specific.",
          "Turnkey homes in Salem, Windham, Derry, and Londonderry. These markets currently run tight inventory, strong buyer demand, and regular multiple-offer scenarios on well-presented listings. A $500,000 colonial with a maintained roof, working systems, and reasonable staging does not need an iBuyer. It needs a weekend of open houses.",
          "Any seller with 30 or more days of flexibility. If you can wait a month, the traditional listing will out-earn the iBuyer offer by five figures in nearly every case. The speed advantage of Opendoor is only worth $45,000 if you truly cannot wait.",
          "Any market condition that favors the seller. When inventory is low, days on market are short, and buyer competition is real, the market itself is doing the work Opendoor charges you for. You do not need to pay a company to absorb risk that the market is already absorbing.",
          "Sellers who want to negotiate. Opendoor will entertain a counter, but their pricing model is algorithmic and their flexibility is narrow. In a traditional listing you have real leverage, especially in the first 14 days on market. In an Opendoor deal, you are mostly taking their number or walking away.",
          "This is where the conversation with [a local listing agent](/services) matters. A good agent can tell you in the first phone call whether your house is a traditional listing candidate or an iBuyer candidate. Most houses in Karyn's service area are the former.",
        ],
      },
      {
        heading: "The hybrid option",
        id: "the-hybrid-option",
        paras: [
          "There is a third path some sellers take, and it is underrated. List traditionally and request an Opendoor offer in parallel. Some sellers set a 14-day window. If the listing does not produce a strong offer in those 14 days, they accept the Opendoor number as the floor and move on. If the listing produces a stronger offer in that window, they take it and the Opendoor offer becomes a data point.",
          "This works well for sellers who need certainty as a backup but would prefer the higher net of a traditional sale. The Opendoor offer typically has an expiration window of five to seven days, so the timing has to be managed, but it is doable. I have walked a few clients through this exact play. Sometimes the listing beats the Opendoor number by $80,000 in the first week. Sometimes the listing produces nothing and the Opendoor offer ends up being the right call. Either way, the seller has the information to make the decision instead of guessing.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does Opendoor actually pay for a $500,000 home?",
        a: "On average, the gross offer lands at 70 to 80 percent of fair market value, so $350,000 to $400,000. Then Opendoor deducts a service fee of roughly 5 percent, plus repair deductions that typically run $5,000 to $15,000 after the inspection. Net to the seller on a $500,000 Southern NH home is usually between $330,000 and $375,000.",
      },
      {
        q: "Is Offerpad different from Opendoor?",
        a: "The model is nearly identical. Cash offer at 70 to 80 percent of fair market value, service fee around 5 percent, post-inspection repair deductions. In practice Offerpad's offers tend to run slightly lower and their fee structure is less transparent. Real Estate Witch has Offerpad net-to-seller numbers coming in worse than Opendoor on average. If you are comparing, get offers from both, not just one.",
      },
      {
        q: "Can I negotiate with Opendoor?",
        a: "You can submit a counter, and they will consider it, but their pricing is algorithmic and their willingness to move is narrow. The bigger lever is the repair deduction, where sometimes you can push back with contractor estimates if you believe the number is inflated. On the service fee and the base offer, there is very little room.",
      },
      {
        q: "How fast does Opendoor actually close?",
        a: "From offer acceptance to close is typically 14 to 30 days. The inspection happens first, usually within a week, then you accept the final adjusted offer, then you pick your close date from a range they provide. So it is fast, but not \"next week\" fast. If a seller has an actual 30-day constraint, Opendoor can meet it. If they have 60 days, a traditional listing can usually beat the Opendoor net.",
      },
      {
        q: "Does Opendoor charge a commission?",
        a: "Not a commission in the traditional sense, but they charge a service fee of roughly 5 percent on the gross offer, which functions the same way. It comes out of the seller's proceeds just like a listing commission would. On a $400,000 gross offer that is $20,000, which is comparable to or higher than what a traditional listing-side commission would be on a $500,000 sale in Southern NH.",
      },
      {
        q: "Is it better to list with an agent or sell to Opendoor in Salem, NH?",
        a: "For most sellers in Salem and the surrounding Southern NH towns, listing with an agent nets $45,000 to $100,000 more than an Opendoor offer on a comparable home. The exceptions are estate sales under time pressure, job relocations with zero flexibility, and homes with serious deferred maintenance the seller cannot finance. If you are outside those situations, the math favors listing. I am happy to run the specific numbers on your home, no pressure. [The 15-minute consultation is here](/booking).",
      },
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
    updatedAt: "2026-04-20",
    readingTime: "7 min read",
    heroImage: "/images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-hero.jpg",
    cardImage: "/images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-card.jpg",
    tldr:
      "Windham is the premium of the three, with a single-family median around $725K, the highest-rated school district in Southern NH, and Cobbett's Pond as the lifestyle anchor. Derry is the mid-range with the widest price spread (entry-level still possible around $400K, higher end pushing $750K), Pinkerton Academy as the unusual public/private high school, and a downtown that has been quietly reviving around Hood Park. Londonderry sits in between on price, runs its own separate school district, and trades walkable downtown energy for apple orchards and a quieter weekend rhythm.",
    sections: [
      {
        heading: "Why these three towns get cross-shopped",
        id: "why-cross-shopped",
        paras: [
          "Almost every buyer moving into Southern NH ends up comparing these three towns. They sit next to each other on I-93, they share Route 102 as the local spine, and on a Zillow search they look close enough to treat as interchangeable. They are not.",
          "Windham, Derry, and Londonderry each have a different price band, a different school system, a different weekend life, and a different kind of buyer they fit best. Picking between them is usually less about square footage and more about what you want your Saturday to look like five years from now.",
          "I show homes across all three every week. Below is the honest comparison. No town is \"the best.\" There is a best fit for your budget, your kids, and your commute, and that is what this guide is for.",
        ],
      },
      {
        heading: "Windham, the premium",
        id: "windham-the-premium",
        paras: [
          "Windham is the premium and it will show up in every price search you run. Single-family median sits around $725K in 2025 data, with new construction on the north side pushing well past $1M. Older ranches near the town center still come in below that, but they move fast, often under a week, and often with multiple offers.",
          "The school district is the draw that keeps Windham's inventory thin. Windham High scores consistently at the top of Southern NH public schools, and the feeder pattern through Golden Brook Elementary is a line families will move for. Per-pupil spending runs above the state average, class sizes stay reasonable, and the athletic and arts programs punch above the enrollment numbers.",
          "Cobbett's Pond is the lifestyle piece. The town beach is a resident-only perk, and it matters more than people expect when they tour the area in April. In July it is swimming and kayaking. In January it is skating. There are good streets on all sides of the pond: Canobie Road runs the west shore, London Bridge Road curves along the north end, and North Lowell Road holds some of the prettier older homes near the meetinghouse. If you want a sense of the town, drive those three at dusk on a Tuesday.",
          "The tradeoff is honest. You pay more, inventory is thin, and the seasonal turnover is slower than the other two towns. You will sometimes wait three or four months for the right listing on the side of the pond you want. If Windham fits the budget and the school draw matters, that wait is usually worth it. If you need to move in 60 days, Windham may push you into a compromise you will regret.",
        ],
      },
      {
        heading: "Derry, the middle ground",
        id: "derry-the-middle-ground",
        paras: [
          "Derry is the widest price spread of the three. Starter homes still exist under $400K, particularly on the West Derry side and in the older neighborhoods off Crystal Avenue. The higher end runs up to $750K on the nicer pockets of East Derry and near the Rockingham County line. A Derry buyer on a $500K budget has real options. A Windham buyer on that budget is mostly looking at 40-year-old ranches that need work.",
          "Pinkerton Academy is the thing every buyer asks about and nobody outside Southern NH understands. Derry K-8 is Derry public schools. High school is Pinkerton, which is technically a private academy but serves as the public high school for Derry, Auburn, Chester, Candia, and Hampstead via tuition contracts. About 3,000 students total. Some families love the scale, it means AP options, sports depth, and arts programs a small-town high school cannot match. Others find it too big and transfer to the Derry Public Charter or cross-district options. Both reactions are common. Budget a conversation about it.",
          "Downtown Derry has been quietly reviving over the last five years. Hood Park sits right at the heart of it, with walkable access to coffee, restaurants that stay open past 8 PM, and the rail trail that runs all the way through town. East Derry, up the hill, feels older New England, stone walls and colonial porches and the original meetinghouse. West Derry, down along Broadway and the commercial corridor, is more working, more practical, more affordable. Each side feels like a different town. Tour both before you commit.",
          "The tradeoff is mostly the Pinkerton conversation and the wider condition variation. Derry has more inventory, which means more room to negotiate, but it also means more homes that need meaningful work. A good inspection and a good agent who knows the local builders matter more here than in Windham.",
        ],
      },
      {
        heading: "Londonderry, the third way",
        id: "londonderry-the-third-way",
        paras: [
          "Londonderry sits between the other two on price and runs its own school district, separate from both. Median single-family prices land roughly in the mid-$500Ks to low-$600Ks depending on the pocket. Londonderry High has its own strong reputation, feeding from Moose Hill and the other elementary schools, and it does not share the scale-concerns or the private/public complication that Pinkerton carries.",
          "The eastern side of Londonderry is apple country. Mack's Apples has been there for generations, the orchards roll through the back roads, and in late September the town smells like cider and wood smoke. That is the Londonderry you move to if you want that New England picture without Windham's price ceiling.",
          "The western side, closer to Manchester and Route 28, is more suburban and less scenic, but gets you closer to the airport and the Manchester commute. Woodmont Commons is the newer mixed-use development on that side, and it has changed the character of that corner of town noticeably over the last few years.",
          "The tradeoff: Londonderry does not have Derry's downtown energy. The restaurants close earlier, the walkable commercial strip is smaller, and the weekends are quieter. Some buyers love that. Others find it isolating after a year. Know which one you are before you commit.",
        ],
      },
      {
        heading: "Schools, head to head",
        id: "schools-head-to-head",
        paras: [
          "On pure academic ranking, the order is Windham, Londonderry, Derry. That is the consistent pattern across standardized test results, teacher-to-student ratios, and per-pupil spending data over the last several years.",
          "Windham High runs roughly 12:1 student-to-teacher, with per-pupil spending above $19K and consistent top-tier results on NH state assessments. Londonderry High sits solidly in the upper tier, closer to 13:1 ratios, strong extracurriculars, and a well-regarded athletic program. Pinkerton, serving Derry, is harder to benchmark because of its scale and its unusual structure, but academically it competes with Londonderry on AP pass rates and college placement while offering program depth neither of the other two can match.",
          "If your kids thrive in a smaller, tighter environment, Windham or Londonderry read better. If your kids want the scale, the sports depth, or the specialty programs (Pinkerton has a working farm and technical programs most NH high schools do not touch), Derry-to-Pinkerton can be the right answer. Visit before you commit. Tour all three if you can. Schools are the decision that ages the worst when you get it wrong.",
        ],
      },
      {
        heading: "Commute realities",
        id: "commute-realities",
        paras: [
          "All three towns sit on I-93, but not at the same exit, and not at the same distance from Boston.",
          "Windham is Exit 3. Derry is Exit 4. Londonderry is Exit 5. Commute to Boston (North Station area) in typical morning traffic: Windham 45 to 55 minutes, Derry 50 to 60, Londonderry 50 to 65 depending on which side of town you live on and whether you are coming out of an eastern neighborhood or a western one. The spread widens significantly on snow days and on Fridays after 3 PM.",
          "To Manchester-Boston Regional Airport, all three towns are in the 15 to 25 minute window. Londonderry is closest, Derry is middle, Windham is furthest. If you fly weekly for work, that 10-minute delta matters more than it sounds.",
          "Route 102 runs through all three as the town-to-town local spine and will be the road you use more than you expect. Windham to Derry via Route 102 is about 15 minutes off-peak. Derry to Londonderry is about 10. For in-town errands, doctors' offices, and kids' sports practices, the three towns function almost as one extended neighborhood along that corridor. The choice is really about which end you sleep on.",
        ],
      },
      {
        heading: "How to choose",
        id: "how-to-choose",
        paras: [
          "A simple decision tree, based on the patterns I see with buyers every month.",
          "Pick Windham if: budget is comfortable over $700K for a single-family, the school district is the top-three reason you are moving, you want Cobbett's Pond as part of your weekend life, and you can wait three-plus months for the right listing. Windham rewards patience.",
          "Pick Derry if: your budget starts at $400K to $500K and needs to stretch, you have checked out Pinkerton in person and feel good about it (or your kids are still years away from high school and you can make that call later), and you want a real downtown with actual restaurants and a walkable rail trail. Derry rewards buyers who know what they want and move fast when it shows up.",
          "Pick Londonderry if: your budget is middle-ish ($500K to $650K), you want strong schools without Windham's price ceiling and without Pinkerton's scale, you prefer apple orchards to downtowns, and quieter weekends sound like a feature not a bug. Londonderry rewards the buyers who want the New England picture without the Windham premium.",
          "If you are still genuinely torn between two, tour a listing in each on the same Saturday. That is the honest test. If you want to talk through your specific budget and school situation, there is a [15-minute consultation slot on the calendar](/booking). Pick one. The rest of the decision gets easier once we map your numbers to real streets.",
          "For buyers moving up from Massachusetts, there is also the tax and registration piece to factor in. That is covered in the [honest MA to NH relocation guide](/blog/moving-from-massachusetts-to-southern-nh-honest-guide). And if Salem is on your shortlist alongside these three, the [Salem NH neighborhood guide](/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know) walks the same terrain for that town. You can also browse all of the [Southern NH neighborhoods](/neighborhoods) on one page.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which is the best school district: Windham, Derry, or Londonderry?",
        a: "On standardized test results, teacher ratios, and per-pupil spending, the ranking is Windham first, Londonderry second, Derry (via Pinkerton Academy) third. That said, Pinkerton offers program depth and AP breadth that the other two cannot match due to its size. The \"best\" district depends on whether your kids thrive in a smaller, tighter environment (Windham or Londonderry) or in a larger school with more program options (Pinkerton). Tour all three before you commit. Schools are the hardest decision to reverse later.",
      },
      {
        q: "What's the difference between Pinkerton Academy and a regular public high school?",
        a: "Pinkerton is technically a private academy, but it serves as the public high school for Derry, Auburn, Chester, Candia, and Hampstead through tuition contracts with each town. Families in those towns pay nothing extra, Derry residents do not pay tuition, and it functions as the default public high school for roughly 3,000 students. The practical difference is scale. Pinkerton offers more AP classes, more sports, more arts programs, and more specialty tracks (including a working farm and technical programs) than most NH high schools. Some families love the options. Others find the size overwhelming and transfer. Visit before your 8th grader heads in.",
      },
      {
        q: "How much do homes in Windham cost vs Derry?",
        a: "The single-family median in Windham runs around $725K in recent data, and new construction on the north side frequently clears $1M. Derry is roughly $450K to $550K median depending on the pocket, with entry-level still possible around $400K and the higher end reaching $750K for larger East Derry homes. For the same dollar amount, a Derry home will typically be larger, newer, or in better condition than its Windham equivalent. You are paying the Windham premium for the school district, the Cobbett's Pond access, and the town's slower seasonal turnover.",
      },
      {
        q: "Is Londonderry safer than Derry?",
        a: "Both towns are statistically safe by national and New England standards. Crime rates in both Londonderry and Derry sit well below Massachusetts suburban averages. Londonderry has a smaller commercial footprint and a quieter downtown, which correlates with lower incident counts, but that is a function of town density more than a meaningful safety gap for residential buyers. Neither town is a safety concern for families, and both run professional police and fire services. The real difference between them is lifestyle, not safety.",
      },
      {
        q: "How long is the commute from Windham to Boston?",
        a: "Windham sits at I-93 Exit 3, and in typical morning traffic the commute to North Station runs 45 to 55 minutes. Evening reverse commutes tend to be closer to 55. Fridays and snow days add 15 to 30 minutes easily. If you are commuting to Boston daily, factor in the Salem Park and Ride just south on I-93 as a realistic option, or the C&J bus service, which can make the trip less grinding than driving solo.",
      },
      {
        q: "Can I still get a starter home in any of these three towns?",
        a: "In Derry, yes, starter homes in the $375K to $450K range still come on the market, particularly in West Derry, around the Broadway corridor, and in the older neighborhoods off Crystal Avenue. In Londonderry, it is harder, but occasionally a smaller ranch or cape on the older side of town will list in the $425K to $475K range. In Windham, realistically no. The lowest entry point in Windham is usually $500K to $550K for a smaller older home that needs updating, and those move fast. If a true starter budget is the goal, Derry is where the math still works.",
      },
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
