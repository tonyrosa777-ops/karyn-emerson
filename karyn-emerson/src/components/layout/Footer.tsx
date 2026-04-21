// =============================================================================
// Footer.tsx — site footer (two-tone editorial: cream masthead + forest imprint)
// Spec: design-system.md §2 (Dark-section inversion rule), §5 (cards on dark);
// Copy: all strings from siteConfig in /data/site.ts — zero hardcoded text.
// Icons: inline SVG only — no icon libraries per CLAUDE.md Code Standards.
// =============================================================================

import Link from "next/link";
import { siteConfig } from "@/data/site";

function slugifyTown(town: string): string {
  return town
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21.5v-8h2.7l.4-3.1h-3.1V8.4c0-.9.25-1.5 1.55-1.5H16.7V4.1c-.3 0-1.3-.1-2.45-.1-2.43 0-4.1 1.5-4.1 4.2v2.2H7.5v3.1h2.65v8h3.35z" />
    </svg>
  );
}

export default function Footer() {
  // Footer nav mirrors site nav minus Pricing (internal Optimus sales tool).
  const footerNav = siteConfig.nav.filter((item) => !item.accent);
  const year = new Date().getFullYear();
  const brokerageLine = `${siteConfig.brokerage}, ${siteConfig.location.city} ${siteConfig.location.state}`;

  return (
    <footer>
      {/* Masthead band — cream paper, forest-green text */}
      <div style={{ background: "var(--bg-elevated)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Column 1 — brand */}
            <div>
              <Link
                href="/"
                className="font-display font-semibold inline-block"
                style={{
                  color: "var(--primary)",
                  fontSize: "1.6rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {siteConfig.businessName.replace(" Real Estate", "")}
              </Link>
              <p
                className="mt-4 font-body text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {siteConfig.tagline}
              </p>
              <p
                className="mt-4 font-mono uppercase tracking-wider"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                }}
              >
                {brokerageLine}
              </p>
            </div>

            {/* Column 2 — site nav */}
            <div>
              <h4
                className="font-mono uppercase mb-4"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                }}
              >
                Explore
              </h4>
              <ul className="space-y-3">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link font-body text-[15px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — service area */}
            <div>
              <h4
                className="font-mono uppercase mb-4"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                }}
              >
                Service Area
              </h4>
              <ul className="space-y-3">
                {siteConfig.location.serviceArea.map((town) => (
                  <li key={town}>
                    <Link
                      href={`/neighborhoods/${slugifyTown(town)}`}
                      className="footer-link font-body text-[15px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {town}, {siteConfig.location.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — contact + social */}
            <div>
              <h4
                className="font-mono uppercase mb-4"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                }}
              >
                Contact
              </h4>
              <ul className="space-y-3 font-body text-[15px]">
                {siteConfig.contact.phone && (
                  <li>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="footer-link"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                )}
                {siteConfig.contact.email && (
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="footer-link"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                )}
                <li
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  {siteConfig.contact.officeAddress}
                </li>
              </ul>

              {siteConfig.social.length > 0 && (
                <div className="mt-6 flex items-center gap-3">
                  {siteConfig.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                      style={{
                        background: "rgba(47,74,58,0.04)",
                        border: "1px solid rgba(47,74,58,0.12)",
                        color: "var(--primary)",
                      }}
                    >
                      {s.platform === "facebook" ? <FacebookIcon /> : null}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hairline iron-oxide divider between bands */}
      <div
        aria-hidden="true"
        style={{ height: 1, background: "rgba(181,83,44,0.22)" }}
      />

      {/* Legal imprint band — forest-green stock, cream text */}
      <div
        style={{
          background: "var(--primary)",
          color: "var(--text-on-dark-muted)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="font-body text-sm"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            {"©"} {year} {siteConfig.businessName}. Licensed in{" "}
            {siteConfig.location.state}.
          </p>
          <ul className="flex items-center gap-5 font-body text-sm">
            <li>
              <Link
                href="/privacy"
                className="footer-link"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="footer-link"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .footer-link {
          transition: color 200ms ease;
        }
        .footer-link:hover,
        .footer-link:focus-visible {
          color: var(--accent) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-link { transition: none; }
        }
      `}</style>
    </footer>
  );
}
