"use client";

// =============================================================================
// RelocateTaxCalcClient.tsx — MA to NH tax arbitrage calculator.
// Two inputs (household income, home value), four outputs:
//  - MA income tax you currently pay
//  - NH sales tax saved (approx)
//  - Property tax delta vs. your chosen NH town
//  - Net annual delta (positive = NH saves you money)
// Every number marked [DEMO COPY - estimates].
// =============================================================================

import { useMemo, useState } from "react";
import {
  MA_EFFECTIVE_PROPERTY_TAX_RATE,
  MA_INCOME_TAX_RATE,
  MA_SALES_TAX_RATE,
  TAXABLE_SPEND_AS_SHARE_OF_INCOME,
  computeAnnualTax,
  nhTownTaxData,
} from "@/data/taxRates";
import { CountUp } from "@/components/sections/motion/CountUp";

const DEFAULT_INCOME = 180_000;
const DEFAULT_HOME_VALUE = 550_000;
const MIN_INCOME = 50_000;
const MAX_INCOME = 750_000;
const MIN_HOME_VALUE = 200_000;
const MAX_HOME_VALUE = 2_000_000;

function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function RelocateTaxCalcClient() {
  const [income, setIncome] = useState<number>(DEFAULT_INCOME);
  const [homeValue, setHomeValue] = useState<number>(DEFAULT_HOME_VALUE);
  const [townSlug, setTownSlug] = useState<string>(nhTownTaxData[0].slug);

  const town = useMemo(
    () => nhTownTaxData.find((t) => t.slug === townSlug) ?? nhTownTaxData[0],
    [townSlug]
  );

  const { maIncomeTax, salesTaxSaved, maPropertyTax, nhPropertyTax, propertyDelta, netAnnualDelta } = useMemo(() => {
    const maIncome = Math.round(income * MA_INCOME_TAX_RATE);
    const saved = Math.round(
      income * TAXABLE_SPEND_AS_SHARE_OF_INCOME * MA_SALES_TAX_RATE
    );
    const maProp = Math.round(homeValue * MA_EFFECTIVE_PROPERTY_TAX_RATE);
    const nhProp = computeAnnualTax(homeValue, town.millRate);
    const pDelta = maProp - nhProp; // positive = NH saves you money on property
    const net = maIncome + saved + pDelta; // combined annual savings
    return {
      maIncomeTax: maIncome,
      salesTaxSaved: saved,
      maPropertyTax: maProp,
      nhPropertyTax: nhProp,
      propertyDelta: pDelta,
      netAnnualDelta: net,
    };
  }, [income, homeValue, town]);

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
              htmlFor="relo-income"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Household income
            </label>
            <input
              id="relo-income"
              type="number"
              inputMode="numeric"
              min={MIN_INCOME}
              max={MAX_INCOME}
              step={5_000}
              value={income}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isFinite(v)) return;
                setIncome(Math.min(MAX_INCOME, Math.max(MIN_INCOME, Math.round(v))));
              }}
              className="font-mono mt-2 w-full rounded-md border px-4 py-3 text-base"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.18)",
                color: "var(--text-primary)",
              }}
            />
            <input
              aria-label="Household income slider"
              type="range"
              min={MIN_INCOME}
              max={MAX_INCOME}
              step={5_000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="relo-home"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Home value
            </label>
            <input
              id="relo-home"
              type="number"
              inputMode="numeric"
              min={MIN_HOME_VALUE}
              max={MAX_HOME_VALUE}
              step={10_000}
              value={homeValue}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isFinite(v)) return;
                setHomeValue(
                  Math.min(MAX_HOME_VALUE, Math.max(MIN_HOME_VALUE, Math.round(v)))
                );
              }}
              className="font-mono mt-2 w-full rounded-md border px-4 py-3 text-base"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "rgba(47, 74, 58, 0.18)",
                color: "var(--text-primary)",
              }}
            />
            <input
              aria-label="Home value slider"
              type="range"
              min={MIN_HOME_VALUE}
              max={MAX_HOME_VALUE}
              step={10_000}
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="relo-town"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]"
            >
              Target NH town
            </label>
            <select
              id="relo-town"
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

          <p className="text-xs text-[var(--text-muted)]">
            [DEMO COPY - estimates]. Assumes MA income tax at{" "}
            <span className="font-mono">
              {(MA_INCOME_TAX_RATE * 100).toFixed(0)}%
            </span>{" "}
            flat and taxable spending of{" "}
            <span className="font-mono">
              {(TAXABLE_SPEND_AS_SHARE_OF_INCOME * 100).toFixed(0)}%
            </span>{" "}
            of household income at MA sales tax{" "}
            <span className="font-mono">
              {(MA_SALES_TAX_RATE * 100).toFixed(2)}%
            </span>
            . If you commute to a MA job, the MA income tax still applies.
          </p>
        </div>

        {/* RIGHT — outputs */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-lg border p-6"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "rgba(47, 74, 58, 0.1)",
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
              Net annual delta (rough)
            </p>
            <p className="font-mono mt-2 text-4xl font-semibold text-[var(--primary)] md:text-5xl">
              <CountUp
                key={`net-${netAnnualDelta}`}
                value={netAnnualDelta}
                prefix="$"
                duration={900}
              />
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Combined MA income tax, sales tax savings, and property tax delta
              versus {town.displayName}, NH.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-md border p-4"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(47, 74, 58, 0.08)",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                MA income tax
              </p>
              <p className="font-mono mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {formatUSD(maIncomeTax)}
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
                Sales tax saved
              </p>
              <p className="font-mono mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {formatUSD(salesTaxSaved)}
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
                MA property tax
              </p>
              <p className="font-mono mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {formatUSD(maPropertyTax)}
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
                NH property tax ({town.displayName})
              </p>
              <p className="font-mono mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {formatUSD(nhPropertyTax)}
              </p>
            </div>
          </div>

          <div
            className="rounded-md border p-4"
            style={{
              background: "var(--bg-card)",
              borderColor: "rgba(181, 83, 44, 0.25)",
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
              Property tax delta
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {propertyDelta >= 0 ? (
                <>
                  Your NH property tax is{" "}
                  <span className="font-mono font-semibold text-[var(--primary)]">
                    {formatUSD(Math.abs(propertyDelta))}
                  </span>{" "}
                  less per year than a comparable MA home.
                </>
              ) : (
                <>
                  Your NH property tax is{" "}
                  <span className="font-mono font-semibold text-[var(--accent)]">
                    {formatUSD(Math.abs(propertyDelta))}
                  </span>{" "}
                  more per year than a comparable MA home. Offset by no income
                  and no sales tax.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
