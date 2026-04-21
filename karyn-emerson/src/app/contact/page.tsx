import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { PageBanner } from "@/components/sections/PageBanner";
import { AuroraGradient } from "@/components/sections/motion/AuroraGradient";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  localBusinessSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Karyn | Southern NH Real Estate",
  description:
    "Send a note or book a 15 minute call. Karyn Emerson, Jill & Co. Realty Group, Salem NH. Serving Salem, Windham, Derry, and all of Southern New Hampshire.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Karyn | Southern NH Real Estate",
    description:
      "Send a note or book a 15 minute call. Jill & Co. Realty Group, Salem NH.",
    type: "website",
    url: "/contact",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Karyn | Southern NH Real Estate",
    description:
      "Send a note or book a 15 minute call. Jill & Co. Realty Group, Salem NH.",
    images: ["/og/default-og.jpg"],
  },
};

// Google Maps embed — query-string-based, no API key required.
// Targets "Jill & Co. Realty Group Salem NH" until the client provides a
// confirmed street address. [DEMO COPY — pending client confirmation].
const MAP_QUERY = encodeURIComponent(
  "Jill & Co. Realty Group, Salem, NH",
);
const MAP_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

export default function ContactPage() {
  const { phone, email, officeAddress } = siteConfig.contact;

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);
  const local = localBusinessSchema("/contact");
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Karyn Emerson",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
      areaServed: siteConfig.location.serviceArea.map((t) => `${t}, NH`),
      telephone: phone || undefined,
      email: email || undefined,
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, local, contactPage]} />

      {/* SECTION 1 — PHOTO BANNER (single, ink-bloom H1) */}
      <PageBanner
        mode="single"
        images={[
          {
            src: "/images/about/about-stone-wall.jpg",
            alt: "Dry stone wall along a Southern NH field",
          },
        ]}
        eyebrow="GET IN TOUCH"
        title={`The best way to start is to talk.`}
        titleMotion="ink-bloom"
        titleAccentWord="talk"
        subhead="A quick call usually saves thirty emails. Pick the channel that works, and I will meet you there."
        height="sm"
        parallax
      />

      {/* SECTION 2 — SPLIT-SCREEN FORM (aurora backdrop, glass-morphism card) */}
      <section
        className="relative overflow-hidden py-20 md:py-24"
        style={{ background: "var(--bg-elevated)" }}
      >
        <AuroraGradient tone="editorial" intensity="subtle" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            {/* Form column — glass-morphism card */}
            <FadeUp>
              <div
                className="relative rounded-2xl p-8 md:p-10"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(47,74,58,0.12)",
                }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                  SEND A NOTE
                </p>
                <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
                  A few sentences is plenty.
                </h2>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </FadeUp>

            {/* Image column — atmospheric, bleeds to section edge on desktop */}
            <FadeUp delay={0.15}>
              <div className="relative hidden aspect-[3/4] overflow-hidden rounded-lg lg:block">
                <Image
                  src="/images/about/about-clapboard-detail.jpg"
                  alt="Clapboard colonial detail in autumn light"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CONTACT DETAILS + MAP (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:py-24 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-8">
          {/* Reach directly */}
          <FadeUp>
            <div
              className="rounded-lg border p-6 md:p-8"
              style={{
                background: "var(--card-on-dark-bg)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                REACH ME DIRECTLY
              </p>
              <ul className="mt-4 space-y-4">
                {phone && (
                  <li className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden="true">
                      📱
                    </span>
                    <div>
                      <p
                        className="font-mono text-xs uppercase tracking-wider"
                        style={{ color: "var(--text-on-dark-muted)" }}
                      >
                        Phone / Text
                      </p>
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="font-display text-h4 font-semibold hover:underline"
                        style={{ color: "var(--text-on-dark-primary)" }}
                      >
                        {phone}
                      </a>
                    </div>
                  </li>
                )}
                {email && (
                  <li className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden="true">
                      ✉️
                    </span>
                    <div>
                      <p
                        className="font-mono text-xs uppercase tracking-wider"
                        style={{ color: "var(--text-on-dark-muted)" }}
                      >
                        Email
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="font-display text-h4 font-semibold hover:underline"
                        style={{ color: "var(--text-on-dark-primary)" }}
                      >
                        {email}
                      </a>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    📍
                  </span>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--text-on-dark-muted)" }}
                    >
                      Office
                    </p>
                    <p
                      className="font-display text-h4 font-semibold"
                      style={{ color: "var(--text-on-dark-primary)" }}
                    >
                      {officeAddress}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    🕰️
                  </span>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--text-on-dark-muted)" }}
                    >
                      Hours
                    </p>
                    {/* [DEMO COPY — pending client review] */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-on-dark-secondary)" }}
                    >
                      Monday through Saturday, 8am to 8pm. Sunday by
                      appointment. Texts answered evenings and weekends.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Map embed */}
          <FadeUp delay={0.15}>
            <div
              className="h-full overflow-hidden rounded-lg border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--card-on-dark-border)",
              }}
            >
              <iframe
                title="Jill & Co. Realty Group office location in Salem, NH"
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 320 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
