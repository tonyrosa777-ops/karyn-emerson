// =============================================================================
// serviceDetails.ts — per-service long-form copy for /services/[slug].
// Keys must match siteConfig.services[].slug exactly.
// Voice: Karyn, first-person. ZERO em dashes. [DEMO COPY — pending client review].
// =============================================================================

export interface ProcessStep {
  emoji: string;
  title: string;
  body: string;
}

export interface ServiceDetail {
  slug: "selling" | "buying" | "relocating";
  longIntro: string;
  whatYouGet: { emoji: string; title: string; body: string }[];
  whoItsFor: { emoji: string; title: string; body: string }[];
  processSteps: ProcessStep[];
  faqTeaser: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  selling: {
    slug: "selling",
    longIntro:
      "Selling the house where you raised the kids is not a transaction. It is a transition. We start at your kitchen table with coffee, a real walk of the property, and an honest conversation about timing, price, and what the market is actually doing on your block this month.",
    whatYouGet: [
      {
        emoji: "📐",
        title: "A real comparative market analysis.",
        body: "Not a Zillow estimate. A document with the three closest comps on your street, adjusted for condition, and a price range I can defend line by line.",
      },
      {
        emoji: "📸",
        title: "Professional photography and a staging consult.",
        body: "Wide-angle interior and exterior shots. Drone on the right house. A walkthrough with you about what stays, what goes, and what to touch up before day one.",
      },
      {
        emoji: "📄",
        title: "A 30-day listing agreement with mutual release.",
        body: "If it is not working, either of us can walk. No six-month lock-in. Accountability is in the paperwork.",
      },
      {
        emoji: "💬",
        title: "Responsiveness through closing.",
        body: "Text replies evenings and weekends. Inspection day, appraisal day, the quiet week before close. You will not be chasing me.",
      },
    ],
    whoItsFor: [
      {
        emoji: "🪴",
        title: "Downsizers after thirty-plus years.",
        body: "The stairs are harder. The grandkids live closer now. Single-level living or a condo is the goal. We do this gently.",
      },
      {
        emoji: "🏡",
        title: "Local move-ups and move-downs.",
        body: "You have outgrown the starter, or the 4BR is too much. We coordinate both sides so you pack once.",
      },
      {
        emoji: "🧾",
        title: "Estate and family-property sellers.",
        body: "A parent has passed or is moving. I work with your estate attorney, I am patient with the timeline, and I treat the house with the history it deserves.",
      },
    ],
    processSteps: [
      {
        emoji: "☕",
        title: "Kitchen table conversation.",
        body: "Zero-pressure walkthrough, your timeline, your concerns. I listen before I pitch anything.",
      },
      {
        emoji: "📊",
        title: "Honest pricing meeting.",
        body: "Comps, condition adjustments, current absorption rate on your street. Three price scenarios, not one.",
      },
      {
        emoji: "📸",
        title: "Prep and photograph.",
        body: "Staging consult, photography, drone if the property calls for it, a written marketing plan.",
      },
      {
        emoji: "🎯",
        title: "Go to market.",
        body: "MLS, targeted outreach, open house strategy tuned to your town. First weekend is the whole game.",
      },
      {
        emoji: "🤝",
        title: "Negotiate and close.",
        body: "Offer review, inspection response, appraisal gap plan if needed, a clean close.",
      },
    ],
    faqTeaser: [
      {
        q: "What commission will I actually pay?",
        a: "Listing-side commissions in Southern NH typically run 2 to 3 percent, fully negotiable and not set by law. The full range and what it covers is on the FAQ page.",
      },
      {
        q: "How long is the listing agreement?",
        a: "30 days with mutual release. If it is not working, either of us can walk. No six-month lock-in.",
      },
    ],
    metaTitle: "Selling Your Home in Southern NH | Karyn Emerson",
    metaDescription:
      "Downsizing, estate sales, or a move-down in Salem, Windham, Derry, or Pelham. Honest pricing, 30-day listing agreement, responsive through close.",
  },

  buying: {
    slug: "buying",
    longIntro:
      "Buying a house in Southern NH is different from buying one in Massachusetts. The P&S works differently. Septic and well matter. The towns do not price alike. I walk you through every number on the closing disclosure before you sign anything, and I answer texts at 11pm because that is when the questions actually come.",
    whatYouGet: [
      {
        emoji: "🧭",
        title: "A buyer representation agreement that explains itself.",
        body: "Post-NAR August 2024, every buyer signs one. Mine is plain English, the compensation is spelled out, and we walk through it before you sign.",
      },
      {
        emoji: "🔍",
        title: "Off-market and pre-market visibility.",
        body: "I have been in these towns long enough to hear about houses before they hit Zillow. Sometimes that is the whole ballgame.",
      },
      {
        emoji: "🧾",
        title: "Inspection and P&S walkthrough.",
        body: "Septic, well, radon, lead paint if the house is pre-1978. I tell you what actually matters and what is cosmetic.",
      },
      {
        emoji: "🔑",
        title: "A clean close.",
        body: "Title, financing, appraisal, walkthrough. I coordinate with the lender and the closing attorney so the day you get the keys is boring in a good way.",
      },
    ],
    whoItsFor: [
      {
        emoji: "🏘️",
        title: "First-time NH buyers.",
        body: "You have never done this before. I explain P&S, earnest money, escrow, septic, and every line item without talking down to you.",
      },
      {
        emoji: "📈",
        title: "Move-up buyers with a home to sell.",
        body: "Two transactions, one calendar. We thread the needle so you pack once and do not carry two mortgages.",
      },
      {
        emoji: "💼",
        title: "Investment buyers in the Derry and Salem rental market.",
        body: "I know which streets cashflow and which do not. Honest numbers, not rose-colored projections.",
      },
    ],
    processSteps: [
      {
        emoji: "📞",
        title: "A 15-minute call.",
        body: "Your timeline, your budget, your must-haves. Lender recommendations if you do not have one yet.",
      },
      {
        emoji: "✍️",
        title: "Buyer representation agreement.",
        body: "Plain English, walked through together. Compensation is transparent, not buried.",
      },
      {
        emoji: "👟",
        title: "Tour the towns.",
        body: "Not just the houses, the neighborhoods. I drive you through the ones you have not considered yet.",
      },
      {
        emoji: "📝",
        title: "Offer and negotiate.",
        body: "I position the offer terms, not just the number. That is often what wins in a multi-offer situation.",
      },
      {
        emoji: "🔑",
        title: "Inspect, close, keys.",
        body: "I am at the inspection. I am at the closing. I call the day after to make sure the trash pickup is right.",
      },
    ],
    faqTeaser: [
      {
        q: "Do I need to sign a buyer agreement before we see houses?",
        a: "Yes, after the August 2024 NAR settlement, every buyer signs a representation agreement before touring. The FAQ page explains exactly what is in mine.",
      },
      {
        q: "What is a septic and well inspection going to cost?",
        a: "Septic inspection typically $400-$700, well water test $150-$300 depending on panels. I walk you through what each one checks for.",
      },
    ],
    metaTitle: "Buying a Home in Southern NH | Karyn Emerson",
    metaDescription:
      "First-time NH buyers, move-up buyers, and investment buyers in Salem, Windham, Derry, and Londonderry. Responsive agent, plain-English paperwork, clean close.",
  },

  relocating: {
    slug: "relocating",
    longIntro:
      "Moving up from Massachusetts is a whole project, not a house search. Tax math, commute math, DMV, inspection, school comparison, which town actually fits the life you are trying to build. I do the math with you before we ever drive to a showing, so the house you fall for is also the house that makes sense.",
    whatYouGet: [
      {
        emoji: "🧮",
        title: "The tax arbitrage math, in writing.",
        body: "MA income tax, MA property tax versus NH property tax on a matched home value. The commuter tax situation if you still work in Boston. Not a sales pitch, a spreadsheet.",
      },
      {
        emoji: "🚘",
        title: "Commute times by town, honestly.",
        body: "I-93 out of Salem at 7am is not the same as I-93 out of Windham at 7am. I will tell you what a real morning looks like.",
      },
      {
        emoji: "📋",
        title: "The MA to NH checklist.",
        body: "Car registration, inspection sticker, license, voter registration, utility swap. A real checklist, not a blog post.",
      },
      {
        emoji: "🏫",
        title: "School comparison, town by town.",
        body: "Salem High versus Pinkerton versus Windham. Feeder lines. Program strengths. What your daughter or son would actually walk into.",
      },
    ],
    whoItsFor: [
      {
        emoji: "🎯",
        title: "MA tax-fatigued move-up buyers.",
        body: "Mike and Jess, ages 30 to 45, dual income, done with Massachusetts. You know the direction. We pick the town together.",
      },
      {
        emoji: "👨‍👩‍👧",
        title: "Families with school-age kids.",
        body: "The school conversation drives everything. We start there and work outward to the houses that fit.",
      },
      {
        emoji: "🧳",
        title: "Out-of-state buyers, sight-unseen capable.",
        body: "FaceTime walkthroughs, honest basement pans, and a written property report so you know what you are signing for.",
      },
    ],
    processSteps: [
      {
        emoji: "🧮",
        title: "Tax and commute math.",
        body: "Before houses, numbers. I pull property tax data for three towns against your target price. You get a real financial picture.",
      },
      {
        emoji: "🗺️",
        title: "Town tour.",
        body: "Saturday afternoon driving three or four towns. Grocery stores, parks, commute feel. The stuff you cannot see on Zillow.",
      },
      {
        emoji: "🏡",
        title: "Targeted house search.",
        body: "Now the houses, only in the towns that fit. Zero time wasted on listings that would not have worked.",
      },
      {
        emoji: "📑",
        title: "Offer and contingencies.",
        body: "Home sale contingency if you still own in MA. Appraisal gap strategy. Clean offer terms.",
      },
      {
        emoji: "📦",
        title: "Landing well.",
        body: "Closing coordination across two states, DMV day, utility swap. I stay in touch after you move in.",
      },
    ],
    faqTeaser: [
      {
        q: "Will I save money on taxes moving from MA to NH?",
        a: "Usually yes, especially if you are a high earner. NH has no state income tax but higher property tax rates in some towns. The FAQ walks through the actual math.",
      },
      {
        q: "What about the MA commuter tax if I still work in Boston?",
        a: "MA taxes non-residents on income earned in MA. We factor that into the math on the relocation hub.",
      },
    ],
    metaTitle: "MA to NH Relocation | Karyn Emerson Real Estate",
    metaDescription:
      "Moving from Methuen, Lawrence, Andover, or Woburn to Southern NH. Tax math, commute math, school comparison, and a checklist that actually works.",
  },
};
