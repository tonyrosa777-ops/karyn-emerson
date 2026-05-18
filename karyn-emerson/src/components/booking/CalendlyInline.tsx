"use client";

// =============================================================================
// CalendlyInline — official Calendly inline-embed widget, brand-themed.
// Loads https://assets.calendly.com/assets/external/widget.js once per page and
// renders an in-page scheduling surface (no domain redirect, no popup).
//
// URL is sourced from NEXT_PUBLIC_CALENDLY_URL. We append brand color params so
// the Calendly chrome matches the site palette (cream bg, forest primary, ember
// accent). Hide the landing-page header + GDPR banner for a tighter inline feel.
// =============================================================================

import Script from "next/script";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

// Brand tokens (hex without #, per Calendly URL-param contract):
//   primary     = #2f4a3a forest green
//   accent      = #b5532c ember (button color)
//   bg-base     = #f6f1e7 cream
//   text-primary= #1a1f1c near-black
const BRAND_PARAMS =
  "hide_landing_page_details=1&hide_gdpr_banner=1" +
  "&primary_color=b5532c" +
  "&text_color=1a1f1c" +
  "&background_color=f6f1e7";

export interface CalendlyInlineProps {
  /** Optional eyebrow above the widget. */
  eyebrow?: string;
  /** Optional title rendered above the widget. */
  title?: string;
  /** Optional subtitle line under the title. */
  subtitle?: string;
  /** Pixel height of the embed surface. Defaults to 720. */
  height?: number;
  /** Visual surface for the wrapping card. */
  surface?: "card" | "bare";
}

function buildUrl(): string {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!base) return "";
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}${BRAND_PARAMS}`;
}

export function CalendlyInline({
  eyebrow = "15 minute call · free · zero pressure",
  title = "Book a time with Karyn",
  subtitle = "Pick a slot that works for you. Karyn reaches out within 24 hours.",
  height = 720,
  surface = "card",
}: CalendlyInlineProps) {
  const url = buildUrl();

  const wrapperStyle =
    surface === "card"
      ? {
          background: "var(--bg-card)",
          border: "1px solid rgba(47,74,58,0.14)",
          boxShadow: "0 20px 48px -24px rgba(26,31,28,0.18)",
        }
      : undefined;

  return (
    <div
      className="@container overflow-hidden rounded-2xl"
      style={wrapperStyle}
    >
      {/* Header */}
      <div
        className="flex flex-col gap-1 px-6 py-5 md:px-8"
        style={{
          borderBottom: "1px solid rgba(47,74,58,0.10)",
          background:
            "linear-gradient(180deg, rgba(47,74,58,0.04) 0%, rgba(47,74,58,0) 100%)",
        }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          {eyebrow}
        </p>
        <h3
          className="font-display text-2xl font-semibold md:text-[1.65rem]"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Embed surface */}
      {url ? (
        <>
          <div
            className="calendly-inline-widget"
            data-url={url}
            style={{ minWidth: "320px", height: `${height}px` }}
          />
          <Script
            src={CALENDLY_SCRIPT}
            strategy="afterInteractive"
          />
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
            Calendar unavailable
          </p>
          <p className="max-w-sm text-sm leading-relaxed">
            The booking calendar is temporarily offline. Please email Karyn directly to schedule a call.
          </p>
        </div>
      )}
    </div>
  );
}

export default CalendlyInline;
