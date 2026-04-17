// =============================================================================
// site.ts — single source of truth for all copy + content on karynemerson.com
// OWNED BY: content-writer agent (Stage 1D). DO NOT hard-code strings in components.
//
// Populated during Stage 1D from:
//   - c:/Projects/Karyn-Emerson/initial-business-data.md
//   - c:/Projects/Karyn-Emerson/market-intelligence.md
//   - c:/Projects/Karyn-Emerson/design-system.md (tone of voice §7, personality axes §8)
//
// Current state: Phase 0 scaffold placeholders only. Every string below is
// marked [DEMO COPY — pending client review] per CLAUDE.md Act-as-Business-Owner Rule.
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
  tagline: string;        // H1 — wears .hero-shimmer
  subheadline: string;    // emotional hook copy below H1
  trustMicro: string;     // ★ rating / years / transaction count one-liner
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
  tagline: "The neighborhood, and the person who knows every street.", // [DEMO COPY — pending client review]
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
    { label: "Listings", href: "/listings" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Take the Quiz", href: "/quiz" },
    { label: "⬥ Pricing", href: "/pricing", accent: true }, // Optimus sales tool — deleted pre-launch
  ],

  hero: {
    eyebrow: "SOUTHERN NEW HAMPSHIRE",
    tagline: "The neighborhood, and the person who knows every street.", // [DEMO COPY]
    subheadline:
      "Buying or selling a home in Salem, Windham, Derry, or anywhere in Southern NH? I grew up on these streets. Let's have a real conversation about what the market is actually doing for you.", // [DEMO COPY]
    ctaPrimary: "Book a Free Consultation",
    ctaSecondary: "Take the Quiz",
    trustMicro: "★ 5.0 on Zillow · Southern NH local · Jill & Co. Realty Group", // [DEMO COPY — pending client review]
  },

  painPoints: [],      // filled by content-writer in Stage 1D
  services: [],        // filled by content-writer in Stage 1D
  stats: [],           // filled by content-writer in Stage 1D
  testimonials: [],    // 36 total — written by content-writer in Stage 1D

  social: [
    { platform: "facebook", href: "https://facebook.com", label: "Facebook" }, // [DEMO COPY — confirm real URL]
  ],

  contact: {
    phone: "",             // [MISSING — confirm with client]
    email: "",             // [MISSING — confirm with client]
    officeAddress: "Jill & Co. Realty Group, Salem, NH", // [DEMO COPY — confirm exact street address]
  },
};
