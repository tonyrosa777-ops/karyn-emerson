// =============================================================================
// /neighborhoods/[slug] — per-neighborhood detail page (SERVER component)
// OWNED BY: frontend-developer agent (Stage 1E Wave B2)
// Spec: market-intelligence.md §5 gap #2, §6 content gaps (a)(d)(e), §9 "do" #3;
//       design-system.md §5 + §11; CLAUDE.md Page Wiring Rule + Page Animation Rule.
//
// Next.js 15+ / 16 App Router: `params` is a Promise and must be awaited.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoods, getNeighborhoodBySlug } from "@/data/neighborhoods";
import NeighborhoodPageClient from "./NeighborhoodPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  placeSchema,
  realEstateAgentSchema,
  realEstateListingSchema,
} from "@/lib/schema";

interface NeighborhoodRouteParams {
  slug: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export async function generateStaticParams(): Promise<NeighborhoodRouteParams[]> {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<NeighborhoodRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) {
    return {
      title: "Neighborhood not found | Karyn Emerson",
      description:
        "This neighborhood guide is not available. See the full list of Southern NH towns and sub-neighborhoods Karyn Emerson covers.",
    };
  }

  const title = `${n.displayName}, ${n.state} · Neighborhood Guide | Karyn Emerson`;
  const description = `${n.displayName}, ${n.state}: median home price around ${currencyFormatter.format(
    n.medianHomePrice
  )}, roughly ${n.commuteToBoston.minutes} minutes to Boston ${n.commuteToBoston.via}. Schools, mill rate, highlights, and recent homes, written by Karyn Emerson.`;

  return {
    title,
    description,
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/neighborhoods/${n.slug}`,
      siteName: "Karyn Emerson Real Estate",
      images: [{ url: n.heroImage, width: 1600, height: 900, alt: `${n.displayName}, ${n.state}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [n.heroImage],
    },
  };
}

export default async function NeighborhoodDetailPage({
  params,
}: {
  params: Promise<NeighborhoodRouteParams>;
}) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) {
    notFound();
  }

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    {
      name: neighborhood.displayName,
      href: `/neighborhoods/${neighborhood.slug}`,
    },
  ]);

  const schemas: Record<string, unknown>[] = [
    breadcrumb,
    placeSchema(neighborhood),
    realEstateAgentSchema({
      path: `/neighborhoods/${neighborhood.slug}`,
      description: `Karyn Emerson sells homes in ${neighborhood.displayName}, ${neighborhood.state} and across Southern NH. Jill & Co. Realty Group, Salem.`,
    }),
  ];

  for (const listing of neighborhood.sampleListings ?? []) {
    schemas.push(
      realEstateListingSchema({
        listing,
        town: neighborhood.city,
        state: neighborhood.state,
        slug: neighborhood.slug,
      }),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <NeighborhoodPageClient neighborhood={neighborhood} />
    </>
  );
}
