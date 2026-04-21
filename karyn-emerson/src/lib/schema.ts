// =============================================================================
// schema.ts — Schema.org structured-data builders for Karyn Emerson Real Estate
// OWNED BY: seo-aeo-specialist agent (Stage 1F)
// Spec: CLAUDE.md SEO Rule, market-intelligence.md §6 (schema markup plan),
//       design-system.md §1 (brand identity), site.ts (single source of truth).
//
// Every builder returns a plain JSON-LD object ready to stringify into a
// <script type="application/ld+json"> tag (via the <JsonLd /> helper).
//
// A note on domain / URLs: all absolute URLs are rooted at SITE_URL.
// NEXT_PUBLIC_SITE_URL is honoured first so the find-and-replace sweep that
// swaps `karynemerson.com` to the real purchased domain only has to happen in
// a single env var + siteConfig.domain. Relative paths are resolved with the
// URL constructor to avoid double-slashes.
// =============================================================================

import { siteConfig } from "@/data/site";
import type { BlogPost } from "@/data/blogPosts";
import type { Neighborhood, NeighborhoodSampleListing } from "@/data/neighborhoods";

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.domain}`;

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  // Ensure leading slash, then compose with URL so double-slashes cannot appear.
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  try {
    return new URL(withSlash, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${withSlash}`;
  }
}

// -----------------------------------------------------------------------------
// Shared entity fragments
// -----------------------------------------------------------------------------

function organizationFragment() {
  return {
    "@type": "RealEstateOrganization" as const,
    name: siteConfig.brokerage,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: siteConfig.contact.officeAddress,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: "US",
    },
  };
}

function areaServedList() {
  return siteConfig.location.serviceArea.map((town) => ({
    "@type": "Place" as const,
    name: `${town}, ${siteConfig.location.state}`,
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: town,
      addressRegion: siteConfig.location.state,
      addressCountry: "US",
    },
  }));
}

function sameAsList(): string[] {
  return siteConfig.social
    .map((s) => s.href)
    .filter((href) => href && /^https?:\/\//i.test(href));
}

// -----------------------------------------------------------------------------
// realEstateAgentSchema — full Schema.org RealEstateAgent
// -----------------------------------------------------------------------------
// Drop onto any page that represents Karyn's practice at large (home, about,
// commission, buy, tax calc, relocate). The builder accepts an optional page
// `path` so each page can bind the schema to its own canonical URL.
// -----------------------------------------------------------------------------
export interface RealEstateAgentSchemaOptions {
  path?: string;
  description?: string;
}

export function realEstateAgentSchema(
  opts: RealEstateAgentSchemaOptions = {},
) {
  const { path = "/", description } = opts;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}#karyn-emerson`,
    name: siteConfig.businessName,
    url: absoluteUrl(path),
    image: absoluteUrl("/images/karyn-portrait.jpg"),
    description:
      description ??
      "Lifelong Southern NH real estate agent at Jill & Co. Realty Group, Salem. Boutique brokerage, place-first approach, buyer and seller representation.",
    jobTitle: "REALTOR\u00AE",
    telephone: siteConfig.contact.phone || undefined,
    email: siteConfig.contact.email || undefined,
    worksFor: organizationFragment(),
    areaServed: areaServedList(),
    knowsAbout: [
      "Southern New Hampshire real estate",
      "Property tax by NH town",
      "Massachusetts to New Hampshire relocation",
      "Post-August-2024 NAR commission rules",
      "Buyer representation",
      "Seller representation",
      "Downsizing in Southern NH",
      "Salem NH, Windham NH, Derry NH neighborhoods",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      recognizedBy: {
        "@type": "Organization",
        name: "New Hampshire Real Estate Commission",
      },
      // [DEMO COPY — pending client review: confirm actual NH license number]
      identifier: "NH-LICENSE-PENDING",
    },
    sameAs: sameAsList(),
  } as const;
}

// -----------------------------------------------------------------------------
// localBusinessSchema — LocalBusiness for the Jill & Co. Salem office
// -----------------------------------------------------------------------------
// Reinforces the entity for local SEO. Used on homepage + /contact.
// aggregateRating is computed from siteConfig.testimonials (36 rated 5/5).
// -----------------------------------------------------------------------------
export function localBusinessSchema(path = "/") {
  const reviews = siteConfig.testimonials;
  const avg =
    reviews.length === 0
      ? 5
      : reviews.reduce((sum, t) => sum + t.rating, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#jill-and-co-salem-office`,
    name: `${siteConfig.businessName} at ${siteConfig.brokerage}`,
    url: absoluteUrl(path),
    telephone: siteConfig.contact.phone || undefined,
    email: siteConfig.contact.email || undefined,
    image: absoluteUrl("/og/default-og.jpg"),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.officeAddress,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: "US",
    },
    // [DEMO COPY — pending client review: confirm exact geo for Salem, NH office]
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.7884,
      longitude: -71.201,
    },
    areaServed: areaServedList(),
    // [DEMO COPY — pending client review: confirm real weekly hours]
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "5",
    },
    sameAs: sameAsList(),
  } as const;
}

// -----------------------------------------------------------------------------
// breadcrumbSchema — BreadcrumbList
// -----------------------------------------------------------------------------
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  } as const;
}

// -----------------------------------------------------------------------------
// articleSchema — Article / BlogPosting for /blog/[slug]
// -----------------------------------------------------------------------------
export function articleSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.heroImage)],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og/default-og.jpg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    inLanguage: "en-US",
  } as const;
}

// -----------------------------------------------------------------------------
// faqSchema — FAQPage from an array of { q, a } items
// -----------------------------------------------------------------------------
export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as const;
}

// -----------------------------------------------------------------------------
// realEstateListingSchema — single sample listing
// -----------------------------------------------------------------------------
export interface RealEstateListingInput {
  listing: NeighborhoodSampleListing;
  town: string;
  state: string;
  slug?: string;
}

export function realEstateListingSchema({
  listing,
  town,
  state,
  slug,
}: RealEstateListingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.address,
    url: slug ? absoluteUrl(`/neighborhoods/${slug}`) : absoluteUrl("/neighborhoods"),
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: town,
      addressRegion: state,
      addressCountry: "US",
    },
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.sqft,
      unitCode: "FTK",
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  } as const;
}

// -----------------------------------------------------------------------------
// placeSchema — Place / City entity for a neighborhood or town
// -----------------------------------------------------------------------------
export function placeSchema(n: Neighborhood) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${n.displayName}, ${n.state}`,
    description: n.description,
    url: absoluteUrl(`/neighborhoods/${n.slug}`),
    image: absoluteUrl(n.heroImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: n.city,
      addressRegion: n.state,
      addressCountry: "US",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "New Hampshire",
    },
  } as const;
}

// -----------------------------------------------------------------------------
// serviceSchema — Service tied to the RealEstateAgent provider
// -----------------------------------------------------------------------------
export interface ServiceSchemaInput {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}

export function serviceSchema({
  name,
  description,
  slug,
  serviceType,
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(`/services/${slug}`),
    serviceType: serviceType ?? name,
    areaServed: areaServedList(),
    provider: {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}#karyn-emerson`,
      name: siteConfig.businessName,
      url: SITE_URL,
    },
  } as const;
}
