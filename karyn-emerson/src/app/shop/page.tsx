import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import ShopContent from "@/components/shop/ShopContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop | Karyn Emerson Real Estate",
  description:
    "Southern NH merch, printed on demand. I Love Salem hoodies, Canobie Lake tumblers, Three Towns enamel mugs, Live Free pennants. Printed by Printful, shipped direct.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | Karyn Emerson Real Estate",
    description:
      "Local-pride goods for Southern New Hampshire. Hoodies, mugs, totes, pennants. Printed on demand.",
    type: "website",
    url: "/shop",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Shop · Karyn Emerson Real Estate · Southern New Hampshire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Karyn Emerson Real Estate",
    description:
      "Southern NH merch, printed on demand. Hoodies, mugs, totes, pennants.",
    images: ["/og/default-og.jpg"],
  },
};

export default function ShopPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <PageBanner
        mode="single"
        images={[
          {
            src: "/images/neighborhoods/tuscan-village-hero.jpg",
            alt: "Tuscan Village at dusk, Salem, NH — warm editorial light",
          },
        ]}
        eyebrow="SHOP · SOUTHERN NH"
        title="Local pride, printed on demand."
        titleMotion="letter-mask"
        subhead="The merch I would actually wear. Hoodies, mugs, totes, and a few things for your hallway. Southern NH at heart."
        ambient="leaves"
        height="md"
        parallax
      />

      <ShopContent />
    </>
  );
}
