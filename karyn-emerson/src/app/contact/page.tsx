import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
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
        url: "/og/default-og.svg",
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
    images: ["/og/default-og.svg"],
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
      {/* SECTION 1 — HERO HEADER (LIGHT, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              GET IN TOUCH · SALEM, NH
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              Start the conversation.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Write a few sentences about where you are, and I will write back.
              If you would rather pick a 15-minute slot directly, the calendar
              is just a click away.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — FORM + INFO (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-8">
          {/* Left column — form card (on cream, lifted off dark section) */}
          <FadeUp>
            <div>
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                SEND A NOTE
              </p>
              <h2
                className="font-display text-h2 mt-3 font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                A few sentences is plenty.
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </FadeUp>

          {/* Right column — contact info + map */}
          <FadeUp delay={0.15}>
            <div className="flex h-full flex-col gap-6">
              <div
                className="rounded-lg border p-6"
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

              {/* Map embed */}
              <div
                className="overflow-hidden rounded-lg border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--card-on-dark-border)",
                }}
              >
                <iframe
                  title="Jill & Co. Realty Group office location in Salem, NH"
                  src={MAP_SRC}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
