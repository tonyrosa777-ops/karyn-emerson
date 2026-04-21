import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { siteConfig } from "@/data/site";

// =============================================================================
// /privacy — Privacy policy. Required by law for any site that collects
// contact-form, quiz, or booking data. Plain-English, NH-appropriate, and
// written to match the editorial voice of the rest of the site.
// [DEMO COPY — pending client legal review]
// =============================================================================

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.businessName}`,
  description:
    "How Karyn Emerson Real Estate collects, uses, and protects your personal information. Plain-English privacy policy for Southern New Hampshire home buyers and sellers.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "April 2026";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div
            className="prose mt-10 max-w-none font-body text-[1.0625rem] leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              This page explains what information {siteConfig.businessName}{" "}
              collects when you use karynemerson.com, why it is collected, and
              how it is handled. If anything below is unclear, reach out
              through the{" "}
              <Link
                href="/contact"
                style={{ color: "var(--accent-warm)" }}
                className="underline underline-offset-4"
              >
                contact page
              </Link>
              {" "}and I will answer personally.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              What I collect
            </h2>
            <p>
              When you fill in the contact form, the lead-capture quiz, or the
              booking calendar, I collect the name, email, phone number, and
              free-text details you choose to share. When you schedule a
              consultation, the booking tool (Calendly) collects the same
              contact details plus the time slot you pick.
            </p>
            <p>
              Like most websites, analytics tools record standard technical
              information when you visit: page URLs, device type, browser,
              approximate city from your IP, and the pages you viewed. This is
              used in aggregate to understand what readers find useful.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              How I use it
            </h2>
            <p>
              Contact details are used to respond to your inquiry, schedule
              and prepare for consultations, and follow up on active
              transactions. I do not sell your information, I do not rent it,
              and I do not share it with third-party marketing lists.
            </p>
            <p>
              Information is shared only with the parties needed to serve you:
              my brokerage ({siteConfig.brokerage}), title companies, lenders
              you choose to work with, and inspectors you hire, and only with
              your knowledge during an active transaction.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Email and SMS
            </h2>
            <p>
              If you reach out, I will email or text you back. You can reply
              STOP at any time to unsubscribe from texts, or ask me to remove
              your email from my records by replying to any email. I do not
              send mass marketing blasts, so there is no newsletter to opt
              out of.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Cookies and analytics
            </h2>
            <p>
              karynemerson.com uses a small number of first-party cookies to
              remember your session and privacy choices. Aggregated analytics
              tell me which articles are read and which pages convert. No
              cross-site tracking, no advertising pixels from third parties
              that resell your profile.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              How long information is kept
            </h2>
            <p>
              Inquiry details are kept for as long as we are in active
              conversation plus a reasonable period afterward (typically up to
              three years) so I can reconnect if you come back to the market.
              Transaction records tied to a closed sale are retained as long
              as NH real estate and federal tax rules require.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Your rights
            </h2>
            <p>
              You can ask to see what I have on file, correct it, or delete
              it. Send a note through the contact page and I will respond
              within a reasonable window. If NH or federal law requires me to
              retain a record (for example closing paperwork on a completed
              sale), I will explain what stays and why.
            </p>

            <h2
              className="mt-10 font-display text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              Contact
            </h2>
            <p>
              Privacy questions go to the{" "}
              <Link
                href="/contact"
                style={{ color: "var(--accent-warm)" }}
                className="underline underline-offset-4"
              >
                contact page
              </Link>
              . I read everything myself.
            </p>

            <p
              className="mt-12 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              This policy may be updated as tools or laws change. The last
              revision date appears at the top of the page.
            </p>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
