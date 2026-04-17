// =============================================================================
// faqs.ts — FAQ entries for /faq. Grouped by category.
// Voice: Karyn, first-person, plain English. ZERO em dashes.
// [DEMO COPY — pending client review] on every factual/legal answer.
// =============================================================================

export interface Faq {
  category: FaqCategory;
  question: string;
  answer: string;
}

export type FaqCategory =
  | "Working with me"
  | "Buying in Southern NH"
  | "Selling in Southern NH"
  | "MA to NH relocation"
  | "Commissions and closing";

export const faqCategoryEmoji: Record<FaqCategory, string> = {
  "Working with me": "🤝",
  "Buying in Southern NH": "🔑",
  "Selling in Southern NH": "🪴",
  "MA to NH relocation": "🧭",
  "Commissions and closing": "🧾",
};

// 16 entries grounded in real Southern NH category gaps:
// NH septic/well, buyer P&S, post-NAR August 2024 commission rules,
// property taxes by town, MA commuter tax.
export const faqs: Faq[] = [
  // ----- Working with me -----
  {
    category: "Working with me",
    question: "How do you actually work with your clients?",
    answer:
      "One on one. No team of assistants handing you off. I show up to the listing appointment, the inspection, the closing, and I call the day after to make sure the trash pickup is right. That is the whole model. [DEMO COPY pending client review]",
  },
  {
    category: "Working with me",
    question: "How quickly will I hear back from you?",
    answer:
      "Business hours within an hour, evenings and weekends usually under two hours. If I am in a closing I will text you back before I drive home. Responsiveness is the whole job. [DEMO COPY pending client review]",
  },
  {
    category: "Working with me",
    question: "Do you work outside Southern New Hampshire?",
    answer:
      "I focus on Salem, Windham, Derry, Londonderry, Pelham, Atkinson, and Hampstead. I will cross a town line for the right client, but I will tell you honestly when a different agent is closer to your situation. [DEMO COPY pending client review]",
  },

  // ----- Buying in Southern NH -----
  {
    category: "Buying in Southern NH",
    question: "What is a Purchase and Sale agreement in NH?",
    answer:
      "In New Hampshire the P&S is the binding contract that follows your accepted offer. It sets the closing date, inspection period, mortgage contingency, and deposit terms. We walk through mine line by line before you sign. [DEMO COPY pending client review]",
  },
  {
    category: "Buying in Southern NH",
    question: "Do I need septic and well inspections?",
    answer:
      "Yes, on any home with a septic system or private well, which is most of Southern NH outside of Salem center and a few Derry neighborhoods. Septic inspection runs roughly $400 to $700. A full well water panel is typically $150 to $300. I coordinate both. [DEMO COPY pending client review]",
  },
  {
    category: "Buying in Southern NH",
    question: "What about radon and lead paint?",
    answer:
      "Radon is common in New Hampshire granite bedrock and should be part of every inspection. If levels are high, mitigation systems run $1,200 to $2,500 typically and are negotiable with the seller. Lead paint applies to homes built before 1978. [DEMO COPY pending client review]",
  },
  {
    category: "Buying in Southern NH",
    question: "How much earnest money do I need?",
    answer:
      "Typically 1 to 2 percent of the purchase price in Southern NH, held by the seller's attorney or listing brokerage. Fully refundable during the inspection period if we walk. We negotiate the exact amount with each offer. [DEMO COPY pending client review]",
  },

  // ----- Selling in Southern NH -----
  {
    category: "Selling in Southern NH",
    question: "How long is your listing agreement?",
    answer:
      "30 days with a mutual release clause. If it is not working for either of us, we walk. No six-month lock-in. Accountability is in the paperwork from day one. [DEMO COPY pending client review]",
  },
  {
    category: "Selling in Southern NH",
    question: "What do you do for marketing?",
    answer:
      "Professional photography on every listing, drone where the property calls for it, a staging consult, MLS entry, targeted email outreach to buyer agents, open house strategy tuned to your town. First weekend on market is the whole game. [DEMO COPY pending client review]",
  },
  {
    category: "Selling in Southern NH",
    question: "Will I need to make repairs before listing?",
    answer:
      "Usually some, rarely major. I walk through the house with you and give you a short list, the things a buyer is going to ding you on in inspection. We fix the cheap ones, we disclose the rest, we price it honestly. [DEMO COPY pending client review]",
  },
  {
    category: "Selling in Southern NH",
    question: "What about Opendoor or an iBuyer offer?",
    answer:
      "You can always take a cash offer, but on a typical $500,000 Southern NH home the math pencils out to roughly $45,000 less in your pocket at closing after iBuyer fees and adjustments, before the move. We talk through the tradeoff honestly. [DEMO COPY pending client review]",
  },

  // ----- MA to NH relocation -----
  {
    category: "MA to NH relocation",
    question: "Will I actually save money moving from Massachusetts to NH?",
    answer:
      "Usually yes, especially if you are a high earner. NH has no state income tax and no sales tax. Property taxes are higher per dollar of assessed value than much of MA but still typically lower in total on comparable homes. We do the math together in the tax calculator. [DEMO COPY pending client review]",
  },
  {
    category: "MA to NH relocation",
    question: "If I still work in Boston, do I pay MA income tax?",
    answer:
      "Yes. Massachusetts taxes non-residents on income earned in MA, the so-called commuter tax. It is a real factor. We build that into the math before you assume a NH move saves what it appears to save on paper. [DEMO COPY pending client review]",
  },
  {
    category: "MA to NH relocation",
    question: "How different are property taxes town by town?",
    answer:
      "Very. Southern NH mill rates vary from roughly $17 to $29 per thousand depending on town, and that is before exemptions for veterans, elderly, and blind. On a $600,000 home that is the difference between $10,200 and $17,400 a year. The calculator on the relocation hub runs this for you. [DEMO COPY pending client review]",
  },

  // ----- Commissions and closing -----
  {
    category: "Commissions and closing",
    question: "What does the August 2024 NAR settlement mean for me?",
    answer:
      "Two changes. Listing agreements no longer advertise buyer agent compensation on the MLS, and every buyer now signs a written representation agreement before touring. It sounds bigger than it is in practice. We walk through the buyer agreement before you sign. [DEMO COPY pending client review]",
  },
  {
    category: "Commissions and closing",
    question: "What commission will I actually pay?",
    answer:
      "Listing-side commissions in Southern NH typically run 2 to 3 percent, fully negotiable and not set by law. Buyer-side compensation is now separately negotiated between buyer and their agent. I show you the full structure in writing before we list or before we tour. [DEMO COPY pending client review]",
  },
  {
    category: "Commissions and closing",
    question: "What closing costs should I expect?",
    answer:
      "Sellers in NH typically pay the real estate transfer tax at roughly $15 per $1,000 of sale price split between parties per local custom, plus attorney and recording fees. Buyers pay their share of the transfer tax, lender fees, title insurance, and prepaids. I send a full estimate before we go under contract. [DEMO COPY pending client review]",
  },
];
