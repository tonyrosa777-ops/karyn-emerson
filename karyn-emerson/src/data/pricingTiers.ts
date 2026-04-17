// =============================================================================
// pricingTiers.ts — Optimus internal sales tier data
// Per CLAUDE.md Always-Built Features Rule (Pricing Page):
//   - FIXED structure, same on every build (never customized per client)
//   - Starter $1,500 / Pro $3,000 (MOST POPULAR) / Premium $5,500 (no badge)
//   - Client-facing feature names — exact labels (NOT "blog architecture")
//   - NO deposit / upfront / split language
//   - NO Google services anywhere — the word "Google" must not appear
//   - Feature categories: Foundation / Conversion / Content & SEO / Commerce / Support
// =============================================================================

export type TierId = "starter" | "pro" | "premium";

export interface PricingTier {
  id: TierId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  description: string;
  popular: boolean;
  featureHighlights: string[];
  ctaLabel: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 1500,
    priceLabel: "$1,500",
    tagline: "Core pages, animated hero, FAQ.",
    description:
      "The foundation. Every core page, the three-layer animated hero, FAQ, and a complete design system. Built to rank, built to last.",
    popular: false,
    featureHighlights: [
      "Home, About, Services, Contact",
      "Three-layer canvas animated hero",
      "FAQ page with schema markup",
      "Mobile-first responsive design",
      "On-page SEO and metadata",
      "Deployed to your domain",
    ],
    ctaLabel: "Book a Call About Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: 3000,
    priceLabel: "$3,000",
    tagline: "Everything in Starter, plus the conversion stack.",
    description:
      "The package that actually closes. Everything in Starter, plus the Professional Blog, Lead-Capture Quiz, Automated Booking Calendar, Photo Gallery, and Testimonials Showcase. This is the one.",
    popular: true,
    featureHighlights: [
      "Everything in Starter",
      "Professional Blog (9 to 10 articles)",
      "Lead-Capture Quiz (typed archetype funnel)",
      "Automated Booking Calendar (native-branded)",
      "Photo Gallery with lightbox",
      "Testimonials Showcase (36 reviews)",
    ],
    ctaLabel: "Book a Call About Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: 5500,
    priceLabel: "$5,500",
    tagline: "Everything in Pro, plus your Branded Merch Shop.",
    description:
      "The full build. Everything in Pro, plus a fully scaffolded Branded Merch Shop with product pages, cart, and checkout. For brands that want to sell more than a service.",
    popular: false,
    featureHighlights: [
      "Everything in Pro",
      "Branded Merch Shop",
      "Product catalog and variants",
      "Cart, checkout, and order flow",
      "Print-on-demand fulfillment",
      "Shop nav and homepage teaser",
    ],
    ctaLabel: "Book a Call About Premium",
  },
];

// ---------------------------------------------------------------------------
// Comparison matrix — 5 categories per CLAUDE.md
// (Foundation / Conversion / Content & SEO / Commerce / Support)
// ---------------------------------------------------------------------------

export interface FeatureRow {
  label: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}

export interface FeatureCategory {
  name: string;
  emoji: string;
  rows: FeatureRow[];
}

export const FEATURE_MATRIX: FeatureCategory[] = [
  {
    name: "Foundation",
    emoji: "🪨",
    rows: [
      { label: "Core pages (Home, About, Services, Contact)", starter: true, pro: true, premium: true },
      { label: "Three-layer canvas animated hero", starter: true, pro: true, premium: true },
      { label: "FAQ page with schema markup", starter: true, pro: true, premium: true },
      { label: "Mobile-first responsive design", starter: true, pro: true, premium: true },
      { label: "Custom design system and brand tokens", starter: true, pro: true, premium: true },
      { label: "Deployment to your domain", starter: true, pro: true, premium: true },
    ],
  },
  {
    name: "Conversion",
    emoji: "🎯",
    rows: [
      { label: "Contact form with server validation", starter: true, pro: true, premium: true },
      { label: "Lead-Capture Quiz", starter: false, pro: true, premium: true },
      { label: "Automated Booking Calendar", starter: false, pro: true, premium: true },
      { label: "Testimonials Showcase (36 reviews)", starter: false, pro: true, premium: true },
      { label: "Photo Gallery with lightbox", starter: false, pro: true, premium: true },
    ],
  },
  {
    name: "Content and SEO",
    emoji: "📰",
    rows: [
      { label: "On-page SEO and metadata", starter: true, pro: true, premium: true },
      { label: "Sitemap and robots.txt", starter: true, pro: true, premium: true },
      { label: "Schema markup (Organization, FAQ)", starter: true, pro: true, premium: true },
      { label: "Professional Blog (9 to 10 articles)", starter: false, pro: true, premium: true },
      { label: "Article schema and Open Graph tags", starter: false, pro: true, premium: true },
    ],
  },
  {
    name: "Commerce",
    emoji: "🛒",
    rows: [
      { label: "Branded Merch Shop", starter: false, pro: false, premium: true },
      { label: "Product catalog and variants", starter: false, pro: false, premium: true },
      { label: "Cart and checkout flow", starter: false, pro: false, premium: true },
      { label: "Print-on-demand fulfillment", starter: false, pro: false, premium: true },
    ],
  },
  {
    name: "Support",
    emoji: "🤝",
    rows: [
      { label: "One revision round after handoff", starter: true, pro: true, premium: true },
      { label: "30 days of post-launch support", starter: true, pro: true, premium: true },
      { label: "Priority post-launch response", starter: false, pro: true, premium: true },
      { label: "Quarterly strategy check-ins (12 months)", starter: false, pro: false, premium: true },
    ],
  },
];
