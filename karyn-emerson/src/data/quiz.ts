// =============================================================================
// quiz.ts — market-timing quiz data layer
// Per CLAUDE.md Always-Built Features Rule (Interactive Quiz) + design-system.md
// §11 "Quiz / Lead capture" (4 archetypes: Downsizing Linda / Relocating Buyer /
// First-Time NH Buyer / Local Move-Up). Pure data + scoring. Zero UI imports.
//
// Archetypes are grounded in market-intelligence.md §2 (Linda + Mike & Jess
// primary personas, plus the two secondary segments implied by design-system.md
// §11). Every answer is tagged with exactly one QuizType; the scorer returns
// the archetype with the highest count.
//
// Question count is 6 (within the 5-8 range specified by the spec — the
// minimum needed to cleanly type the 4 archetypes across triggers, location,
// timing, stage of life). 8 is the ceiling per CLAUDE.md, not the floor.
// =============================================================================

export type QuizType =
  | "downsizing-linda"
  | "relocating-buyer"
  | "first-time-nh-buyer"
  | "local-move-up";

export interface QuizAnswer {
  label: string;
  emoji: string;
  type: QuizType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizResult {
  type: QuizType;
  name: string;
  tagline: string;
  body: string[];
  recommendedProgram: {
    name: string;
    href: string;
    reason: string;
  };
  secondaryLink?: {
    name: string;
    href: string;
  };
}

// ---------------------------------------------------------------------------
// Questions (8 — at the ceiling per CLAUDE.md. Extra two sharpen the archetype
// with a financing cue (Q7) and an emotional anchor cue (Q8).)
// ---------------------------------------------------------------------------

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where do you live right now?",
    answers: [
      {
        emoji: "🏡",
        label: "In the Southern NH house we have owned for 20 or more years",
        type: "downsizing-linda",
      },
      {
        emoji: "🧭",
        label: "In Massachusetts, and we are ready to cross the border",
        type: "relocating-buyer",
      },
      {
        emoji: "🔑",
        label: "Renting or in a starter condo, planning our first purchase",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🌿",
        label: "In a Southern NH home we have outgrown and want to trade up",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 2,
    question: "What is actually triggering the move?",
    answers: [
      {
        emoji: "👵",
        label: "Empty nest, stairs getting harder, grandkids not far away",
        type: "downsizing-linda",
      },
      {
        emoji: "💸",
        label: "MA taxes, the commute math, finally buying instead of renting",
        type: "relocating-buyer",
      },
      {
        emoji: "🍼",
        label: "Starting a family, done with the lease cycle, ready for a yard",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "📐",
        label: "Need more bedrooms, a real office, or a better school feeder line",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 3,
    question: "What is your timeline?",
    answers: [
      {
        emoji: "🍂",
        label: "Sometime in the next year, once we figure out where we are landing",
        type: "downsizing-linda",
      },
      {
        emoji: "🗓️",
        label: "Within 3 to 6 months if the right house comes up",
        type: "relocating-buyer",
      },
      {
        emoji: "⏱️",
        label: "As soon as we can get pre-approved and find the right place",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🔄",
        label: "We want to sell and buy in the same season, coordinated",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 4,
    question: "What is the biggest unknown on your list?",
    answers: [
      {
        emoji: "🪴",
        label: "Selling first or buying first, and how to avoid moving twice",
        type: "downsizing-linda",
      },
      {
        emoji: "🛂",
        label: "Which NH town actually fits us, and what the tax picture looks like",
        type: "relocating-buyer",
      },
      {
        emoji: "📄",
        label: "Inspections, P&S, septic, well, all of it. What the whole process even looks like",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🏫",
        label: "Which school feeder we would land in at each price point",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 5,
    question: "What does a good outcome look like to you?",
    answers: [
      {
        emoji: "☕",
        label: "Selling for a fair price, landing somewhere single-level, closer to family",
        type: "downsizing-linda",
      },
      {
        emoji: "🚗",
        label: "A commute we can live with and a tax bill that finally stops growing",
        type: "relocating-buyer",
      },
      {
        emoji: "🌳",
        label: "Our first house. A yard, a garage, a place that is ours",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🏠",
        label: "The next house, without losing the neighborhood and the people in it",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 6,
    question: "Which sentence sounds the most like you right now?",
    answers: [
      {
        emoji: "💬",
        label: "The house is rattling around empty and it is time to make a plan.",
        type: "downsizing-linda",
      },
      {
        emoji: "💬",
        label: "We are tired of getting outbid in MA. Tell us what NH actually costs.",
        type: "relocating-buyer",
      },
      {
        emoji: "💬",
        label: "We have never done this before. Walk us through the whole thing.",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "💬",
        label: "We love it here. We just need the right next house on the right street.",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 7,
    question: "How are you paying for the move?",
    answers: [
      {
        emoji: "🏦",
        label: "Selling this house is the down payment. We want to be close to mortgage-free.",
        type: "downsizing-linda",
      },
      {
        emoji: "📋",
        label: "Conventional mortgage, roughly 20% down, already pre-approved in MA.",
        type: "relocating-buyer",
      },
      {
        emoji: "💼",
        label: "First mortgage. Still stacking the down payment and getting pre-approved.",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🔁",
        label: "Rolling the equity from our current house straight into the next one.",
        type: "local-move-up",
      },
    ],
  },
  {
    id: 8,
    question: "What does the next chapter feel like to you?",
    answers: [
      {
        emoji: "🕯️",
        label: "Lighter. Less to maintain. More time with the people who matter.",
        type: "downsizing-linda",
      },
      {
        emoji: "🍁",
        label: "A fresh start on the NH side of the border we have been eyeing for years.",
        type: "relocating-buyer",
      },
      {
        emoji: "🗝️",
        label: "Ours. The first place that is actually ours.",
        type: "first-time-nh-buyer",
      },
      {
        emoji: "🏡",
        label: "The same life, upgraded. Same town, same people, more room to breathe.",
        type: "local-move-up",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Results — keyed by QuizType
// ---------------------------------------------------------------------------

export const QUIZ_RESULTS: Record<QuizType, QuizResult> = {
  "downsizing-linda": {
    type: "downsizing-linda",
    name: "The Downsizer",
    tagline: "The house has done its job. Now it is your turn.",
    body: [
      "You have raised a family in this house. Maybe it is the Salem colonial you bought in the mid-nineties, maybe it is the Windham ranch your parents built, maybe it is the Pelham place on the cul-de-sac your grandkids know by heart. It is not just square footage. It is forty years of Thanksgivings.",
      "Your fear is not about selling. It is about timing, pressure, and landing somewhere that feels right. Sell first and you might not have a place to go. Buy first and you are stretched thin. Lowball the listing and you leave money on the table your retirement needs.",
      "We do it the other way. We walk your house together, we price it honestly with real Southern NH comps, and we coordinate the timing so you pack once, not twice. Single-level options at Tuscan Village, the Fairways, Kings Court, or a ranch closer to the grandkids, all on the table.",
    ],
    recommendedProgram: {
      name: "Selling Your Southern NH Home",
      href: "/services/selling",
      reason:
        "Built for sellers who have lived in their house for decades and want an agent who understands that selling and transitioning are two different things.",
    },
    secondaryLink: {
      name: "Explore the Neighborhood Guides",
      href: "/neighborhoods",
    },
  },

  "relocating-buyer": {
    type: "relocating-buyer",
    name: "The MA to NH Relocator",
    tagline: "The border is 10 minutes away. The tax math is a lot further.",
    body: [
      "You have been watching Zillow for eighteen months. You have been outbid on three houses in Andover, Methuen, or Haverhill. The MA property tax bill lands every quarter and you do the math, quietly, on your phone. You know the commute still works from Salem or Windham. You are ready to stop watching and start looking.",
      "What you need is not another listing feed. You need the actual answer to four questions: which NH town fits your family, what the commute looks like from each one, what the tax picture is on a $600K home Andover vs. Salem vs. Windham, and who is going to answer your texts when you are up at 10 PM looking at a listing that just dropped.",
      "I grew up here. I will walk you through all of it on a 15 minute call. The tax calculator will show you the number. The neighborhood guides will show you the streets. The conversation will tell you which town is yours.",
    ],
    recommendedProgram: {
      name: "MA to NH Relocation Hub",
      href: "/relocate",
      reason:
        "Tax arbitrage math, commute times by NH town, DMV and inspection checklist, and the school comparison MA vs NH. Built for buyers coming up I-93.",
    },
    secondaryLink: {
      name: "Run the NH Property Tax Calculator",
      href: "/tax-calculator",
    },
  },

  "first-time-nh-buyer": {
    type: "first-time-nh-buyer",
    name: "The First-Time NH Buyer",
    tagline: "Your first house. Your first P&S. Your first well and septic.",
    body: [
      "You have never done this before. You have been reading Reddit threads, bookmarking Zillow, and half-understanding what a purchase and sale agreement even is. Words like escrow, contingency, septic inspection, and radon mitigation show up and you have been nodding along without fully knowing.",
      "That is the normal starting point, not a problem. The job of the right agent is to explain every number on the closing disclosure before you sign it. To tell you what a septic inspection actually costs, which inspectors are worth it, and whether the price you are about to offer is $10K too much.",
      "I answer texts at 11 PM. I walk you through the P&S line by line. I will not push you into a house for the commission. If you need to pass on the first three you see, we pass on the first three. The right house shows up. We find it together.",
    ],
    recommendedProgram: {
      name: "Buying Your First NH Home",
      href: "/services/buying",
      reason:
        "A walkthrough of the entire NH buying process from pre-approval to closing. Designed for first-time buyers who want to understand every step before they sign.",
    },
    secondaryLink: {
      name: "See How Commissions Actually Work",
      href: "/commission",
    },
  },

  "local-move-up": {
    type: "local-move-up",
    name: "The Local Move-Up",
    tagline: "You love the town. You just need the next house.",
    body: [
      "Salem, Windham, Derry, Londonderry. You are already here. You know which grocery store you like, which pediatrician you trust, which side of Cobbett's Pond holds its value. You are not moving towns. You are moving houses, and the difference matters.",
      "What you need is a coordinated sell-and-buy. Listing your current place at the right number, without panicking on timing. Finding the next house on the right feeder line for the kids, with the bedrooms and the garage and the yard you actually need. Not overpaying because you are emotionally attached to being done.",
      "We plan it together. A sell-first vs. buy-first decision based on your real finances, a 30-day listing agreement with mutual release, and a tight eye on the next house from the day the current one hits the market. One season, two closings, one coordinated move.",
    ],
    recommendedProgram: {
      name: "Buying Your Next Home",
      href: "/services/buying",
      reason:
        "Built for current Southern NH homeowners moving up, with coordinated sell-and-buy timing and school feeder line mapping at every price point.",
    },
    secondaryLink: {
      name: "Neighborhood Guides and Feeder Lines",
      href: "/neighborhoods",
    },
  },
};

// ---------------------------------------------------------------------------
// Scoring — pure, deterministic, testable
// ---------------------------------------------------------------------------

export function scoreQuiz(answers: QuizType[]): QuizType {
  const scores: Record<QuizType, number> = {
    "downsizing-linda": 0,
    "relocating-buyer": 0,
    "first-time-nh-buyer": 0,
    "local-move-up": 0,
  };
  for (const type of answers) {
    scores[type]++;
  }
  return (Object.entries(scores) as [QuizType, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
}
