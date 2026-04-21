// =============================================================================
// site.ts — single source of truth for all copy + content on karynemerson.com
// OWNED BY: content-writer agent (Stage 1D). DO NOT hard-code strings in components.
//
// Populated during Stage 1D from:
//   - c:/Projects/Karyn-Emerson/initial-business-data.md
//   - c:/Projects/Karyn-Emerson/market-intelligence.md
//   - c:/Projects/Karyn-Emerson/design-system.md (tone of voice §7, personality axes §8)
//
// Voice: place-first, not face-first. Linda (seller, 58-66) + Mike & Jess (buyers, 30-45).
// Every testimonial: ZERO em dashes. Commas, periods, ellipses only. CLAUDE.md non-negotiable.
// =============================================================================

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface CTAPair {
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface HeroCopy extends CTAPair {
  eyebrow: string;
  tagline: string;           // H1 — brand identity statement
  subheadline: string;       // emotional hook copy below H1
  trustMicro: string;        // star rating / years / transaction count one-liner
  ctaMicro: string;          // one-liner under the CTA button pair (quiz nudge)
  complianceShort: string;   // NH-required brokerage disclosure (REALTOR® + brokerage)
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
}

export interface Service {
  slug: string;
  emoji: string;
  title: string;
  shortDescription: string;
  href: string;
}

export interface PainPoint {
  emoji: string;
  title: string;
  body: string;
}

export interface Stat {
  emoji: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export interface Testimonial {
  name: string;
  location: string;
  serviceType: "buying" | "selling" | "relocating" | "downsizing";
  quote: string;
  rating: 5;
}

export interface SiteConfig {
  businessName: string;
  brokerage: string;
  schemaType: string;
  domain: string;            // placeholder — one find-and-replace sweeps to final URL
  tagline: string;
  location: {
    city: string;
    state: string;
    serviceArea: string[];
  };
  nav: Array<{ label: string; href: string; accent?: boolean }>;
  hero: HeroCopy;
  painPoints: PainPoint[];
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];   // 36 total — written in Stage 1D by content-writer
  social: SocialLink[];
  contact: {
    phone: string;
    email: string;
    officeAddress: string;
  };
}

export const siteConfig: SiteConfig = {
  businessName: "Karyn Emerson Real Estate",
  brokerage: "Jill & Co. Realty Group",
  schemaType: "RealEstateAgent",
  domain: "karynemerson.com",
  tagline: "The neighborhood, and the person who knows every street.",
  location: {
    city: "Salem",
    state: "NH",
    serviceArea: [
      "Salem",
      "Windham",
      "Derry",
      "Londonderry",
      "Pelham",
      "Atkinson",
      "Hampstead",
    ],
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Relocate", href: "/relocate" },
    { label: "Blog", href: "/blog" },
    { label: "Shop", href: "/shop" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Take the Quiz", href: "/quiz" },
    { label: "⬥ Pricing", href: "/pricing", accent: true }, // Optimus sales tool — deleted pre-launch
  ],

  hero: {
    eyebrow: "SALEM · WINDHAM · DERRY · LONDONDERRY",
    tagline: "Southern New Hampshire, from someone who actually lives here.",
    subheadline:
      "I'm Karyn Emerson — a Salem-based agent with Jill & Co. I don't list every property on Zillow and hope you pick me. We talk, I learn what you actually need, then I find the homes worth your time.",
    ctaPrimary: "Book a free consultation",
    ctaSecondary: "Take the quiz",
    ctaPrimaryHref: "/booking",
    ctaSecondaryHref: "/quiz",
    trustMicro: "⭐ 5.0 on Zillow · Best year yet in 2025 · Lifelong NH resident",
    ctaMicro: "The quiz is the first step to discovering your dream home.",
    complianceShort: "Karyn Emerson, REALTOR® · Jill & Co. Realty Group",
  },

  painPoints: [
    {
      emoji: "🏡",
      title: "You want an agent who actually knows your street.",
      body: "You have lived in Salem or Windham or Pelham for thirty years. You know which side of Cobbett's Pond holds its value, and you do not want to explain the Salem High feeder lines to a realtor who had to Google them. Your neighborhood deserves someone who has watched it change.",
    },
    {
      emoji: "🤝",
      title: "You are worried about being pushed into a lowball price.",
      body: "You have heard the stories. An agent walks in, quotes a number twenty grand below what the house is worth, and pressures you to sign by the end of the week. That is not how this goes with me. We price it right together, on your timing, and I show you the comps.",
    },
    {
      emoji: "📍",
      title: "You are coming up from MA and do not know which town is right.",
      body: "Is Derry the good one or the other one? Is Windham worth the premium over Londonderry? What does Salem actually feel like after you leave the mall? I grew up here. I will tell you honestly which town fits your family, your commute, and your budget, before you ever open Zillow.",
    },
    {
      emoji: "📱",
      title: "You are afraid of being ghosted after the listing goes up.",
      body: "You sign the paperwork, the sign goes in the yard, and suddenly your calls stop getting returned. I have heard that story too many times to let it be yours. I text back. Evenings, weekends, the stretch between the inspection and the close. That is the whole job.",
    },
  ],

  services: [
    {
      slug: "selling",
      emoji: "🪴",
      title: "Selling Your Home",
      shortDescription:
        "Downsizing after thirty years in the colonial, or ready to move closer to the grandkids? We start with a real walkthrough of your house, an honest price conversation, and a 30-day listing agreement with a mutual release. No pressure, no lowball, no surprises on closing day.",
      href: "/services/selling",
    },
    {
      slug: "buying",
      emoji: "🔑",
      title: "Buying Your Home",
      shortDescription:
        "First house in NH, trading up for the yard, or finally getting out of the rental market? I answer texts at 11pm. I walk you through the P&S, the septic, the well, the inspection. You will understand every number on the closing disclosure before you sign it.",
      href: "/services/buying",
    },
    {
      slug: "relocating",
      emoji: "🧭",
      title: "Relocating from Massachusetts",
      shortDescription:
        "Coming up from Methuen, Lawrence, Andover, or Woburn? I will walk you through the tax math, the commute times by town, the DMV and inspection checklist, and which Southern NH towns actually fit the life you are trying to build. Starts with a 15-minute call.",
      href: "/services/relocating",
    },
  ],

  stats: [
    {
      emoji: "📍",
      value: 30,
      suffix: "+",
      label: "Years in Southern NH", // [DEMO COPY — pending client review, confirm exact years]
    },
    {
      emoji: "⭐",
      value: 5.0,
      decimals: 1,
      label: "Average Zillow Rating", // [DEMO COPY — pending client review, confirm aggregate rating]
    },
    {
      emoji: "🏆",
      value: 2025,
      label: "Best Year Yet", // grounded in initial-business-data.md §1
    },
    {
      emoji: "🏡",
      value: 98,
      suffix: "%",
      label: "Sold At or Above Asking", // [DEMO COPY — pending client review, confirm percentage]
    },
  ],

  testimonials: [
    // Page 1 (1-9) — featured quotes appear here
    {
      name: "Patricia M.",
      location: "Salem, NH",
      serviceType: "selling",
      quote:
        "Karyn walked us through selling our home of 38 years with such patience. My husband and I were overwhelmed at first. She sat at our kitchen table, explained every step, and never once pressured us. We closed above asking and we are in our condo at Tuscan Village now.",
      rating: 5,
    },
    {
      name: "Mike D.",
      location: "Windham, NH",
      serviceType: "buying",
      quote:
        "Texted Karyn at 10:30pm about a listing. She had showing times back to me before I woke up. That is the level she operates at. Closed on the 3BR in April, under contract in eight days.",
      rating: 5,
    },
    {
      name: "Linda S.",
      location: "Pelham, NH",
      serviceType: "downsizing",
      quote:
        "We wanted someone local. Someone who knew Pelham, not a franchise agent who would send a generic email. Karyn grew up in this area and it showed in every conversation. She sold the house in two weeks and helped us find a ranch closer to our daughter.",
      rating: 5,
    },
    {
      name: "Jess R.",
      location: "Salem, NH (from Methuen, MA)",
      serviceType: "relocating",
      quote:
        "We were done with Massachusetts taxes. Karyn did the actual math for us. Showed us what we would pay in Salem versus Methuen on a $550K home, what the commute looked like from Exit 2, which school district fit our daughter. She did not oversell Windham just because it was more expensive.",
      rating: 5,
    },
    {
      name: "Joanne T.",
      location: "Derry, NH",
      serviceType: "selling",
      quote:
        "I had already signed with another agent before a neighbor told me about Karyn. I wish I had called her first. When my contract ended she came over, walked the property, and had a real market analysis for me the next day. No fluff. Just numbers and a plan.",
      rating: 5,
    },
    {
      name: "Brian K.",
      location: "Londonderry, NH (from Woburn, MA)",
      serviceType: "relocating",
      quote:
        "My wife and I had been getting outbid in Massachusetts for a year. Karyn found us a house in Londonderry that was not even on Zillow yet. We offered, got accepted, closed in 32 days. She knows people up here.",
      rating: 5,
    },
    {
      name: "Maureen F.",
      location: "Windham, NH",
      serviceType: "downsizing",
      quote:
        "Selling the house where we raised three kids was harder than we thought it would be. Karyn was kind about it. She did not rush us. When we were ready, she listed it on a Thursday and we had two offers by Sunday night.",
      rating: 5,
    },
    {
      name: "Dan P.",
      location: "Salem, NH",
      serviceType: "buying",
      quote:
        "First-time buyer here. I had no idea what a P&S was, what a septic inspection cost, any of it. Karyn broke it all down for me in normal English. No jargon, no talking down to me. Closed on my first house last October.",
      rating: 5,
    },
    {
      name: "Carol W.",
      location: "Hampstead, NH",
      serviceType: "selling",
      quote:
        "Karyn is the real deal. She sold my mother's house after my mom passed. She handled the whole thing with so much grace, worked with the estate attorney, kept us informed every step. We were not local and she made it feel like we were.",
      rating: 5,
    },
    // Page 2 (10-18)
    {
      name: "Tom and Sarah B.",
      location: "Atkinson, NH (from Andover, MA)",
      serviceType: "relocating",
      quote:
        "Moving the whole family up from Andover. Karyn met us at four different houses across three towns over one weekend. She was patient, honest about which ones had issues, and she never once pushed us toward the more expensive option.",
      rating: 5,
    },
    {
      name: "Richard H.",
      location: "Derry, NH",
      serviceType: "buying",
      quote:
        "Bought an investment duplex with Karyn's help. She knows the Derry rental market cold. Told me straight up which streets cashflow and which do not. Two years later the numbers have held exactly where she said they would.",
      rating: 5,
    },
    {
      name: "Ellen G.",
      location: "Salem, NH",
      serviceType: "downsizing",
      quote:
        "After my husband passed I was not ready to sell right away. Karyn checked in on me every few months, no pressure, just to see how I was doing. When I was finally ready, a year later, she was right there. That is not normal agent behavior. That is a neighbor.",
      rating: 5,
    },
    {
      name: "Kevin O.",
      location: "Windham, NH (from Haverhill, MA)",
      serviceType: "relocating",
      quote:
        "Bought our house in Windham, sight unseen, off a FaceTime walkthrough Karyn did for us. She was that trustworthy. Walked every room, pointed out the things we would not have seen ourselves, showed us the basement honestly. No surprises when we moved in.",
      rating: 5,
    },
    {
      name: "Nancy L.",
      location: "Pelham, NH",
      serviceType: "selling",
      quote:
        "We interviewed three agents. The other two quoted us high to win the listing. Karyn quoted us realistic, showed us the comps, and explained why. We went with her. Sold for her exact number in eleven days. No games.",
      rating: 5,
    },
    {
      name: "Andrew T.",
      location: "Londonderry, NH",
      serviceType: "buying",
      quote:
        "Karyn knew the Londonderry school feeder lines better than the school district website. We have two kids and that mattered. Ended up on the right side of Mammoth Road for us. Could not have figured that out ourselves.",
      rating: 5,
    },
    {
      name: "Susan R.",
      location: "Salem, NH",
      serviceType: "selling",
      quote:
        "Forty three years in the same colonial. Karyn understood what that meant. She never once called it a transaction. She called it a transition. That word alone told me I had the right person.",
      rating: 5,
    },
    {
      name: "Alex and Priya M.",
      location: "Salem, NH (from Lawrence, MA)",
      serviceType: "relocating",
      quote:
        "We were nervous about buying in a state we had never lived in. Karyn drove us around three towns on a Saturday afternoon, pointed out the good grocery stores, the parks, the pediatrician options. She cared about us landing well, not just closing.",
      rating: 5,
    },
    {
      name: "Barbara J.",
      location: "Hampstead, NH",
      serviceType: "downsizing",
      quote:
        "My knees were done with the stairs. Karyn listed the big house and found me a single level on the same side of town so I could keep my book club. Closed both transactions within six weeks of each other. She made it look easy.",
      rating: 5,
    },
    {
      name: "Jim F.",
      location: "Derry, NH",
      serviceType: "selling",
      quote:
        "Karyn answered every question I had, and I had a lot of them. Taxes, disclosures, the post-NAR settlement stuff I had read about. She was current on all of it. I never felt like I was calling at a bad time.",
      rating: 5,
    },
    // Page 3 (19-27)
    {
      name: "Jenna C.",
      location: "Windham, NH",
      serviceType: "buying",
      quote:
        "We looked at twelve houses. Karyn was in no rush. She said she would rather we find the right one than settle for a good one. Number thirteen was our house. We have been here two years and we love it.",
      rating: 5,
    },
    {
      name: "Robert and Joan K.",
      location: "Salem, NH",
      serviceType: "downsizing",
      quote:
        "The thing about Karyn is she listens. My wife and I wanted different things and she did not pretend we agreed. She helped us work through it together. We landed on a townhouse we both love.",
      rating: 5,
    },
    {
      name: "Emily D.",
      location: "Atkinson, NH",
      serviceType: "selling",
      quote:
        "Had my house on the market with another agent for four months. Nothing. Switched to Karyn. New photos, new pricing strategy, new staging advice. Under contract in eighteen days for more than the previous asking.",
      rating: 5,
    },
    {
      name: "Chris and Maya L.",
      location: "Londonderry, NH (from Woburn, MA)",
      serviceType: "relocating",
      quote:
        "Karyn walked us through the MA to NH stuff we had no idea about. Registering cars, inspection stickers, the whole thing. Even sent us her plumber and her oil company. That kind of help is not in the commission.",
      rating: 5,
    },
    {
      name: "Margaret N.",
      location: "Pelham, NH",
      serviceType: "selling",
      quote:
        "She knew my neighborhood. I mean really knew it. The Hildreth Road stretch, the part near Gage Hill, the difference between the two in resale value. I did not have to explain anything.",
      rating: 5,
    },
    {
      name: "Derek M.",
      location: "Salem, NH",
      serviceType: "buying",
      quote:
        "Karyn got me into a bidding war and got me out of it without overpaying. Walked me through three counter offer strategies. We landed $18,000 below the highest competing bid because she positioned the offer terms, not just the number.",
      rating: 5,
    },
    {
      name: "Helen V.",
      location: "Windham, NH",
      serviceType: "downsizing",
      quote:
        "My first grandchild was born in January. By April I wanted to be closer. Karyn sold the Windham house and found me a place fifteen minutes from my son, all inside of one season. I am holding the baby every Sunday now.",
      rating: 5,
    },
    {
      name: "Nick R.",
      location: "Salem, NH (from Methuen, MA)",
      serviceType: "relocating",
      quote:
        "I did the tax math myself before calling Karyn. Then she did it with me and caught two things I missed. Property tax exemption for veterans, and the commuter tax situation. Saved me real money the first year.",
      rating: 5,
    },
    {
      name: "Paula S.",
      location: "Derry, NH",
      serviceType: "selling",
      quote:
        "We sold the house my parents built in 1974. Karyn was so gentle with the history of it. She did not make us throw everything out for staging. She worked with what we had and the house showed beautifully.",
      rating: 5,
    },
    // Page 4 (28-36)
    {
      name: "Matt and Rachel P.",
      location: "Londonderry, NH",
      serviceType: "buying",
      quote:
        "Second house with Karyn. Sold our starter, bought the 4BR in Londonderry, all coordinated on the same closing day. She threaded the needle so we did not have to move twice. Cannot recommend her more.",
      rating: 5,
    },
    {
      name: "Dorothy A.",
      location: "Hampstead, NH",
      serviceType: "downsizing",
      quote:
        "I am 74. Karyn treated me like family. She drove me to see houses when I did not want to drive myself. She sat with me at the closing. She called me the day after to make sure I got the trash schedule right.",
      rating: 5,
    },
    {
      name: "Ryan B.",
      location: "Windham, NH",
      serviceType: "buying",
      quote:
        "Karyn breaks down confusing home buying jargon into simple normal terms. I never felt stupid asking a basic question. By the end I actually understood escrow, which I did not even know was a word in February.",
      rating: 5,
    },
    {
      name: "Cynthia E.",
      location: "Salem, NH",
      serviceType: "selling",
      quote:
        "I had three agents come through. Karyn was the only one who did not try to sell me on her. She asked about the house, about my timeline, about my husband's job situation. She listened. That is who I hired.",
      rating: 5,
    },
    {
      name: "Gabe and Lily T.",
      location: "Atkinson, NH (from Lawrence, MA)",
      serviceType: "relocating",
      quote:
        "First time homebuyers, relocating across a state line, never done any of this before. Karyn had a checklist, a timeline, and a plan from day one. The move happened exactly the way she said it would. Twelve weeks start to finish.",
      rating: 5,
    },
    {
      name: "Donna W.",
      location: "Pelham, NH",
      serviceType: "downsizing",
      quote:
        "We sold the 4BR and moved into a ranch closer to Derry. Karyn timed the two closings so we only packed once. She negotiated a 10-day rent back on the old house so we had a weekend to breathe. That kind of thinking is rare.",
      rating: 5,
    },
    {
      name: "Paul G.",
      location: "Derry, NH",
      serviceType: "selling",
      quote:
        "Karyn puts the customer first. That is what everyone who works with her ends up saying. It sounds like a line but it is literally true. She will lose a sale before she will push you into something wrong for you.",
      rating: 5,
    },
    {
      name: "Meghan O.",
      location: "Salem, NH",
      serviceType: "buying",
      quote:
        "She is incredibly knowledgeable about the Southern New Hampshire real estate market. I talked to two other agents and they just sounded like they were reading off Zillow. Karyn talked about streets I had never heard of and knew the story behind each one.",
      rating: 5,
    },
  ],

  social: [
    { platform: "facebook", href: "https://www.facebook.com/karynemersonrealestate", label: "Facebook" }, // [DEMO COPY — pending client confirmation of real URL]
  ],

  contact: {
    phone: "",             // [MISSING — confirm with client]
    email: "",             // [MISSING — confirm with client]
    officeAddress: "Jill & Co. Realty Group, Salem, NH", // [DEMO COPY — pending client review, confirm exact street address]
  },
};
