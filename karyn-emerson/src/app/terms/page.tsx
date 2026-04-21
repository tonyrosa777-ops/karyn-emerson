import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { siteConfig } from "@/data/site";

// =============================================================================
// /terms — Terms of use. Required for any website that publishes
// professional content and accepts inquiries. Plain-English, NH-appropriate.
// [DEMO COPY — pending client legal review]
// =============================================================================

export const metadata: Metadata = {
  title: `Terms of Use | ${siteConfig.businessName}`,
  description:
    "Terms of use for karynemerson.com, including how the site content, real estate guidance, and booking tools may be used.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const lastUpdated = "April 2026";

export default function TermsPage() {
  return (
    <main
      className="relative"
      style={{ background: "var(--bg-base)" }}
    >
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <FadeUp>
          <p
            className="eyebrow"
            style={{ color: "var(--accent-warm)" }}
          >
            Last updated {lastUpdated}
          </p>
          <h1
            className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            Terms of Use
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div
            className="prose mt-10 max-w-none font-body text-[1.0625rem] leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              Welcome to karynemerson.com. By using this site you agree to the
              terms below. They are written in plain English so you do not
              have to parse legalese.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Who runs this site
            </h2>
            <p>
              This site is operated by Karyn Emerson, a licensed New Hampshire
              real estate agent affiliated with {siteConfig.brokerage}. All
              representation, listings, and transactions are conducted through
              the brokerage.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              General information, not personalized advice
            </h2>
            <p>
              The articles, neighborhood guides, commission explainers, tax
              tools, and other content on this site are general information.
              They are accurate to the best of my knowledge at the time of
              writing, but real estate rules, tax rules, and market conditions
              change. Do not rely on a blog article or a calculator output as
              a substitute for a real conversation with a licensed
              professional about your specific situation.
            </p>
            <p>
              I am not a lawyer, a tax advisor, or a lender. Where those roles
              matter, I will point you to people who do that work
              professionally.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Fair housing and equal opportunity
            </h2>
            <p>
              I represent buyers and sellers in compliance with the federal
              Fair Housing Act and New Hampshire law. I do not refuse service,
              steer, or provide different levels of representation based on
              race, color, religion, sex, national origin, familial status,
              disability, sexual orientation, gender identity, age, marital
              status, or source of lawful income.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Use of the site
            </h2>
            <p>
              You may read, print, and share articles for personal use, and
              link to any page. You may not scrape the site at scale,
              reproduce content on another commercial site without
              permission, or use the site to send unsolicited messages.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Booking and quiz tools
            </h2>
            <p>
              The consultation calendar, contact form, and lead-capture quiz
              are provided to make it easy to reach me. Scheduling a
              consultation does not create a buyer or seller representation
              relationship. Representation begins only when both parties sign
              the appropriate brokerage agreement.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Links to third parties
            </h2>
            <p>
              Some pages link to external resources (government sites, tax
              calculators, school data, trusted service providers). Those
              sites are operated by third parties and are outside my control.
              I am not responsible for their content, accuracy, or privacy
              practices.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              No warranty
            </h2>
            <p>
              The site is provided as-is. I do my best to keep information
              accurate and current, but I do not guarantee the content is
              error-free, uninterrupted, or fit for any specific purpose. To
              the extent permitted by NH law, I disclaim liability for
              decisions made solely on the basis of site content.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Changes to these terms
            </h2>
            <p>
              These terms may be updated as the site evolves. The last
              revision date is at the top of this page.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Questions
            </h2>
            <p>
              Send anything you want clarified through the{" "}
              <Link
                href="/contact"
                style={{ color: "var(--accent-warm)" }}
                className="underline underline-offset-4"
              >
                contact page
              </Link>
              . I will respond.
            </p>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
