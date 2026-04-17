"use client";

// =============================================================================
// TaxCalcTable.tsx — 8-town comparison table for the NH property tax page.
// Highlights the user's selected town on the calculator; otherwise ships
// as a static table for SEO (the server page renders the HTML).
// =============================================================================

import { nhTownTaxData } from "@/data/taxRates";

function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function TaxCalcTable() {
  return (
    <div
      className="overflow-x-auto rounded-lg border"
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(47, 74, 58, 0.1)",
      }}
    >
      <table className="w-full text-left">
        <caption className="sr-only">
          Estimated annual NH property tax by town at three sample home values.
        </caption>
        <thead>
          <tr
            className="border-b"
            style={{ borderColor: "rgba(47, 74, 58, 0.1)" }}
          >
            <th
              scope="col"
              className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
            >
              Town
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
            >
              Mill rate
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
            >
              $500K home
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
            >
              $750K home
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
            >
              $1M home
            </th>
          </tr>
        </thead>
        <tbody>
          {nhTownTaxData.map((t, idx) => (
            <tr
              key={t.slug}
              style={{
                background:
                  idx % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)",
              }}
            >
              <th
                scope="row"
                className="px-4 py-3 font-display text-base font-semibold text-[var(--text-primary)]"
              >
                {t.displayName}, NH
              </th>
              <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                {t.millRate.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                {formatUSD(t.annualTax["500k"])}
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                {formatUSD(t.annualTax["750k"])}
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm text-[var(--text-primary)]">
                {formatUSD(t.annualTax["1m"])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
