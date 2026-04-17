"use client";

// =============================================================================
// PricingROI — ROI calculator for the /pricing page
// Per CLAUDE.md Always-Built Features Rule (Pricing Page):
//   - 2 sliders: average-job value + clients-per-month
//   - Package selector: Starter / Pro / Premium
//   - Outputs: monthly revenue, break-even timeline (months), 12-month ROI per tier
//   - Real-estate default: avg commission per side ~$15,000
// =============================================================================

import { useMemo, useState } from "react";
import { PRICING_TIERS, type TierId } from "@/data/pricingTiers";

const DEFAULT_JOB_VALUE = 15000;
const DEFAULT_CLIENTS_PER_MONTH = 2;
const JOB_MIN = 2000;
const JOB_MAX = 50000;
const JOB_STEP = 500;
const CLIENTS_MIN = 1;
const CLIENTS_MAX = 20;
const CLIENTS_STEP = 1;

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function PricingROI() {
  const [jobValue, setJobValue] = useState(DEFAULT_JOB_VALUE);
  const [clientsPerMonth, setClientsPerMonth] = useState(
    DEFAULT_CLIENTS_PER_MONTH
  );
  const [tierId, setTierId] = useState<TierId>("pro");

  const tier = PRICING_TIERS.find((t) => t.id === tierId)!;

  const { monthlyRevenue, breakEvenMonths, twelveMonthRoi, annualRevenue } =
    useMemo(() => {
      const monthly = jobValue * clientsPerMonth;
      const annual = monthly * 12;
      const breakEven = monthly > 0 ? tier.price / monthly : Infinity;
      const roi = ((annual - tier.price) / tier.price) * 100;
      return {
        monthlyRevenue: monthly,
        breakEvenMonths: breakEven,
        twelveMonthRoi: roi,
        annualRevenue: annual,
      };
    }, [jobValue, clientsPerMonth, tier.price]);

  const breakEvenLabel =
    breakEvenMonths === Infinity
      ? "--"
      : breakEvenMonths < 1
      ? "Under 1 month"
      : breakEvenMonths < 2
      ? `${Math.ceil(breakEvenMonths * 30)} days`
      : `${breakEvenMonths.toFixed(1)} months`;

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(47,74,58,0.12)",
        boxShadow: "0 20px 48px -24px rgba(26,31,28,0.16)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr]">
        {/* Inputs */}
        <div className="p-8 md:p-10">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            ROI Calculator
          </p>
          <h3
            className="mt-2 font-display text-h3 font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Run the real-estate math.
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Average commission per transaction side in Southern NH runs around
            $15,000. Move the sliders to match your business.
          </p>

          <div className="mt-8 space-y-8">
            <SliderRow
              label="Average commission per side"
              min={JOB_MIN}
              max={JOB_MAX}
              step={JOB_STEP}
              value={jobValue}
              onChange={setJobValue}
              displayValue={formatCurrency(jobValue)}
            />
            <SliderRow
              label="Clients closed per month"
              min={CLIENTS_MIN}
              max={CLIENTS_MAX}
              step={CLIENTS_STEP}
              value={clientsPerMonth}
              onChange={setClientsPerMonth}
              displayValue={`${clientsPerMonth} ${
                clientsPerMonth === 1 ? "client" : "clients"
              }`}
            />

            <div>
              <p
                className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                Package
              </p>
              <div className="grid grid-cols-3 gap-2">
                {PRICING_TIERS.map((t) => {
                  const active = t.id === tierId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTierId(t.id)}
                      className="rounded-lg px-3 py-3 text-center font-body text-sm font-semibold transition"
                      style={{
                        background: active
                          ? "var(--primary)"
                          : "var(--bg-elevated)",
                        color: active
                          ? "var(--bg-base)"
                          : "var(--text-primary)",
                        border: `1.5px solid ${
                          active ? "var(--primary)" : "rgba(47,74,58,0.12)"
                        }`,
                      }}
                    >
                      {t.name}
                      <span
                        className="ml-1 font-mono text-[11px] font-normal opacity-70"
                        aria-hidden="true"
                      >
                        {t.priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div
          className="flex flex-col justify-center p-8 md:p-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(47,74,58,0.04) 0%, rgba(47,74,58,0) 100%)",
            borderLeft: "1px solid rgba(47,74,58,0.08)",
          }}
        >
          <OutputRow
            label="Monthly revenue"
            value={formatCurrency(monthlyRevenue)}
            hint="Commission per side × clients per month"
          />
          <OutputRow
            label="Break-even on the site"
            value={breakEvenLabel}
            hint={`One-time cost: ${tier.priceLabel}`}
          />
          <OutputRow
            label="12 month ROI"
            value={`${Math.round(twelveMonthRoi).toLocaleString()}%`}
            hint={`Projected annual revenue: ${formatCurrency(annualRevenue)}`}
            emphasis
          />
          <p
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "var(--text-muted)" }}
          >
            The site earns back the first paid transaction and everything
            after that is pure upside.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slider row
// ---------------------------------------------------------------------------

interface SliderRowProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  displayValue: string;
}

function SliderRow({
  label,
  min,
  max,
  step,
  value,
  onChange,
  displayValue,
}: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          className="font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </label>
        <span
          className="font-display text-lg font-semibold"
          style={{ color: "var(--primary)" }}
        >
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          height: 6,
          borderRadius: 999,
          background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, rgba(47,74,58,0.14) ${pct}%, rgba(47,74,58,0.14) 100%)`,
          outline: "none",
        }}
        aria-label={label}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: var(--primary);
          border: 3px solid var(--bg-card);
          box-shadow: 0 2px 8px rgba(47, 74, 58, 0.35);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: var(--primary);
          border: 3px solid var(--bg-card);
          box-shadow: 0 2px 8px rgba(47, 74, 58, 0.35);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Output row
// ---------------------------------------------------------------------------

interface OutputRowProps {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
}

function OutputRow({ label, value, hint, emphasis }: OutputRowProps) {
  return (
    <div
      className="py-4"
      style={{
        borderBottom: emphasis ? "none" : "1px solid rgba(47,74,58,0.08)",
      }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <p
        className="mt-1 font-display font-semibold"
        style={{
          color: emphasis ? "var(--accent)" : "var(--text-primary)",
          fontSize: emphasis ? "clamp(1.85rem, 3.5vw, 2.4rem)" : "clamp(1.4rem, 2.5vw, 1.85rem)",
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      {hint && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
