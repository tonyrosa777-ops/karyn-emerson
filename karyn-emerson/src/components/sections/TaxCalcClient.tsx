"use client";

// =============================================================================
// TaxCalcClient.tsx — interactive NH property tax calculator
// Owner: frontend-developer (Stage 1E Wave B3)
// Spec: pageplan §B — home-value input + town select + result card.
// Optional MA comparison uses the MA effective rate from taxRates.ts.
// =============================================================================

import { useMemo, useState } from "react";
import {
  MA_EFFECTIVE_PROPERTY_TAX_RATE,
  computeAnnualTax,
  nhTownTaxData,
} from "@/data/taxRates";

const MIN_HOME_VALUE = 200_000;
const MAX_HOME_VALUE = 2_000_000;
const DEFAULT_HOME_VALUE = 500_000;

function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function TaxCalcClient() {
  const [homeValue, setHomeValue] = useState<number>(DEFAULT_HOME_VALUE);
  const [townSlug, setTownSlug] = useState<string>(nhTownTaxData[0].slug);
  const [maComparisonValue, setMaComparisonValue] = useState<string>("");

  const selectedTown = useMemo(
    () => nhTownTaxData.find((t) => t.slug === townSlug) ?? nhTownTaxData[0],
    [townSlug]
  );

  const annualTax = useMemo(
    () => computeAnnualTax(homeValue, selectedTown.millRate),
    [homeValue, selectedTown]
  );

  const monthlyEscrow = useMemo(() => Math.round(annualTax / 12), [annualTax]);

  const maAnnualTax = useMemo(() => {
    const v = parseFloat(maComparisonValue.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(v) || v <= 0) return null;
    return Math.round(v * MA_EFFECTIVE_PROPERTY_TAX_RATE);
  }, [maComparisonValue]);

  const delta = useMemo(() => {
    if (maAnnualTax == null) return null;
    return maAnnualTax - annualTax;
  }, [maAnnualTax, annualTax]);

  return (
    <div
      className="rounded-lg border p-6 md:p-8"
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(47, 74, 58, 0.12)",
        boxShadow: "0 2px 8px -4px rgba(26,31,28,0.08)",
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* LEFT — inputs */}
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="home-value-number"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Home value
            </label>
            <div className="mt-2 flex items-center gap-3">
              <span className="font-mono text-base text-[var(--text-secondary)]">
                $
              </span>
              <input
                id="home-value-number"
                type="number"
                inputMode="numeric"
                min={MIN_HOME_VALUE}
                max={MAX_HOME_VALUE}
                step={10_000}
                value={homeValue}
                onChange={(e) => {
                  const raw = Number(e.target.value);
                  if (!Number.isFinite(raw)) return;
                  const clamped = Math.min(
                    MAX_HOME_VALUE,
                    Math.max(MIN_HOME_VALUE, Math.round(raw))
                  );
                  setHomeValue(clamped);
                }}
                className="font-mono w-full rounded-md border px-4 py-3 text-base"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "rgba(47, 74, 58, 0.18)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <input
              aria-label="Home value slider"
              type="range"
              min={MIN_HOME_VALUE}
              max={MAX_HOME_VALUE}
              step={10_000}
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              className="mt-4 w-full accent-[var(--primary)]"
            />
            <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>{formatUSD(MIN_HOME_VALUE)}</span>
              <span>{formatUSD(MAX_HOME_VALUE)}</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="town-select"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Town
            </label>
            <select
              id="town-select"
              value={townSlug}
              onChange={(e) => setTownSlug(e.target.value)}
              className="mt-2 w-full rounded-md border px-4 py-3 text-base"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.18)",
                color: "var(--text-primary)",
              }}
            >
              {nhTownTaxData.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.displayName}, NH
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="ma-compare"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Optional: current MA home value for comparison
            </label>
            <input
              id="ma-compare"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 550000"
              value={maComparisonValue}
              onChange={(e) => setMaComparisonValue(e.target.value)}
              className="font-mono mt-2 w-full rounded-md border px-4 py-3 text-base"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.18)",
                color: "var(--text-primary)",
              }}
            />
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Uses a MA effective property-tax rate of{" "}
              <span className="font-mono">
                {(MA_EFFECTIVE_PROPERTY_TAX_RATE * 100).toFixed(2)}%
              </span>{" "}
              for a rough comparison. [DEMO COPY - estimates]
            </p>
          </div>
        </div>

        {/* RIGHT — result card */}
        <div
          className="flex flex-col justify-between gap-6 rounded-lg border p-6"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "rgba(47, 74, 58, 0.1)",
          }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              Estimated annual property tax
            </p>
            <p className="font-mono mt-2 text-4xl font-semibold text-[var(--primary)] md:text-5xl">
              {formatUSD(annualTax)}
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {selectedTown.displayName}, NH at{" "}
              <span className="font-mono">
                {selectedTown.millRate.toFixed(2)}
              </span>{" "}
              mill rate on{" "}
              <span className="font-mono">{formatUSD(homeValue)}</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-md border p-4"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(47, 74, 58, 0.08)",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Monthly escrow
              </p>
              <p className="font-mono mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {formatUSD(monthlyEscrow)}
              </p>
            </div>
            <div
              className="rounded-md border p-4"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(47, 74, 58, 0.08)",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Mill rate ({selectedTown.millRateYear})
              </p>
              <p className="font-mono mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {selectedTown.millRate.toFixed(2)}
              </p>
            </div>
          </div>

          {/* MA comparison tile — only when user typed a value */}
          {maAnnualTax != null && delta != null ? (
            <div
              className="rounded-md border p-4"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(181, 83, 44, 0.25)",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                Versus your MA home
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Estimated MA annual property tax:{" "}
                <span className="font-mono font-semibold text-[var(--text-primary)]">
                  {formatUSD(maAnnualTax)}
                </span>
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {delta >= 0 ? (
                  <>
                    You would pay{" "}
                    <span className="font-mono font-semibold text-[var(--primary)]">
                      {formatUSD(Math.abs(delta))}
                    </span>{" "}
                    less per year in {selectedTown.displayName}.
                  </>
                ) : (
                  <>
                    You would pay{" "}
                    <span className="font-mono font-semibold text-[var(--accent)]">
                      {formatUSD(Math.abs(delta))}
                    </span>{" "}
                    more per year in {selectedTown.displayName}.
                  </>
                )}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
