// =============================================================================
// taxRates.ts — NH municipal property tax data for the tax calculator
// OWNED BY: frontend-developer agent (Stage 1E Wave B3)
// Source context: market-intelligence.md §5 gap #4, §6 long-tail #2, §9 "do" #3
//
// Every value below is marked [DEMO COPY - confirm 2025 NH muni data] because
// mill rates update annually and must be confirmed against the NH Department of
// Revenue Administration before the site goes live. CLAUDE.md Placeholder rule:
// we fill plausible values so the demo is complete, and we flag them clearly.
//
// Mill rate convention in NH: dollars per $1,000 of assessed value. A 22.50
// mill rate on a $500,000 assessed home is $500 * 22.50 = $11,250 per year.
// Annual tax = (homeValue / 1000) * millRate.
// =============================================================================

export interface TaxExemption {
  /** Dollar amount of assessed value exempted (reduction from assessment). */
  amount: number;
  /** Minimum age at which the senior exemption applies, if relevant. */
  ageCutoff?: number;
  /** Human-readable note about eligibility (income caps, residency, etc.). */
  note?: string;
}

export interface NhTownTax {
  /** URL slug used by /neighborhoods/[slug] and selectors. */
  slug: string;
  /** Display name (proper case) for labels. */
  displayName: string;
  /** County the town sits in (Hillsborough or Rockingham). */
  county: string;
  /** 2024 or 2025 certified mill rate, dollars per $1,000 of assessed value. */
  millRate: number;
  /** Year the mill rate above was certified. */
  millRateYear: number;
  /**
   * Three sample assessed home values used in the comparison table.
   * Values are kept in a stable order: 500k, 750k, 1m.
   */
  sampleHomeValues: [500000, 750000, 1000000];
  /** Annual property tax dollars at each sample value (precomputed). */
  annualTax: {
    "500k": number;
    "750k": number;
    "1m": number;
  };
  /** Senior (elderly) exemption, if the town offers one. */
  seniorExemption: TaxExemption;
  /** Veteran credit, applied directly against tax (not assessment). */
  veteranExemption: TaxExemption;
  /** Short descriptor used in the methodology sidebar. */
  note: string;
}

/**
 * Helper: compute annual tax from mill rate (dollars per $1K assessed value).
 * Used at module init so the table renders without a runtime calculation.
 */
function taxOn(homeValue: number, millRate: number): number {
  return Math.round((homeValue / 1000) * millRate);
}

/**
 * 8 Southern NH towns in Karyn's service area.
 *
 * [DEMO COPY - confirm 2025 NH muni data]
 * Mill rates, exemption amounts, and age cutoffs below are plausible
 * placeholders drawn from historical NH DRA data. Before launch we confirm
 * each figure against the current NH Department of Revenue Administration
 * equalization report and the relevant town assessor's office.
 */
export const nhTownTaxData: NhTownTax[] = [
  {
    slug: "salem",
    displayName: "Salem",
    county: "Rockingham",
    millRate: 17.85, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 17.85),
      "750k": taxOn(750000, 17.85),
      "1m": taxOn(1000000, 17.85),
    },
    seniorExemption: {
      amount: 125000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption against assessment, tiered by age with income and asset limits. Confirm with Salem assessing office.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran tax credit applied against annual tax bill.",
    },
    note: "Highest commercial base in the service area. Tuscan Village and Canobie Lake sit here.",
  },
  {
    slug: "windham",
    displayName: "Windham",
    county: "Rockingham",
    millRate: 19.42, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 19.42),
      "750k": taxOn(750000, 19.42),
      "1m": taxOn(1000000, 19.42),
    },
    seniorExemption: {
      amount: 165000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption tiered by age bracket. Income and asset caps apply. Confirm with Windham assessor.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit; Windham offers optional additional credits for disabled veterans.",
    },
    note: "Highest median sale price in service area (~$732K). Windham HS district is a draw.",
  },
  {
    slug: "derry",
    displayName: "Derry",
    county: "Rockingham",
    millRate: 26.18, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 26.18),
      "750k": taxOn(750000, 26.18),
      "1m": taxOn(1000000, 26.18),
    },
    seniorExemption: {
      amount: 95000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption against assessed value. Income limits apply.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "Highest mill rate in the service area. Pinkerton Academy, Hood Park, and downtown Derry sit here.",
  },
  {
    slug: "londonderry",
    displayName: "Londonderry",
    county: "Rockingham",
    millRate: 18.62, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 18.62),
      "750k": taxOn(750000, 18.62),
      "1m": taxOn(1000000, 18.62),
    },
    seniorExemption: {
      amount: 120000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption tiered. Income and asset caps apply.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "Woodmont Commons development has lifted the base. Strong schools, Exit 4 commuter access.",
  },
  {
    slug: "pelham",
    displayName: "Pelham",
    county: "Hillsborough",
    millRate: 20.74, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 20.74),
      "750k": taxOn(750000, 20.74),
      "1m": taxOn(1000000, 20.74),
    },
    seniorExemption: {
      amount: 100000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption against assessment.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "Border town with MA. Route 38 corridor, quieter than Salem, strong resale on ranches.",
  },
  {
    slug: "atkinson",
    displayName: "Atkinson",
    county: "Rockingham",
    millRate: 16.95, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 16.95),
      "750k": taxOn(750000, 16.95),
      "1m": taxOn(1000000, 16.95),
    },
    seniorExemption: {
      amount: 115000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption, tiered by age.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "One of the lower mill rates in the service area. Timberlane Regional schools.",
  },
  {
    slug: "hampstead",
    displayName: "Hampstead",
    county: "Rockingham",
    millRate: 18.10, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 18.10),
      "750k": taxOn(750000, 18.10),
      "1m": taxOn(1000000, 18.10),
    },
    seniorExemption: {
      amount: 110000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption against assessment.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "Big Island Pond, Island Pond, and Wash Pond. Lake-adjacent inventory is a feature.",
  },
  {
    slug: "plaistow",
    displayName: "Plaistow",
    county: "Rockingham",
    millRate: 22.05, // [DEMO COPY - confirm 2025 NH muni data]
    millRateYear: 2024,
    sampleHomeValues: [500000, 750000, 1000000],
    annualTax: {
      "500k": taxOn(500000, 22.05),
      "750k": taxOn(750000, 22.05),
      "1m": taxOn(1000000, 22.05),
    },
    seniorExemption: {
      amount: 90000, // [DEMO COPY - confirm 2025 NH muni data]
      ageCutoff: 65,
      note: "Elderly exemption tiered.",
    },
    veteranExemption: {
      amount: 500, // [DEMO COPY - confirm 2025 NH muni data]
      note: "Standard veteran credit.",
    },
    note: "Route 125 corridor, Timberlane schools, easy access to I-495 and 95.",
  },
];

/**
 * Utility for looking up a single town. Safer than array.find in components.
 */
export function getTownBySlug(slug: string): NhTownTax | undefined {
  return nhTownTaxData.find((t) => t.slug === slug);
}

/**
 * Compute tax for an arbitrary home value against a town's mill rate.
 * Used by the interactive calculator.
 */
export function computeAnnualTax(homeValue: number, millRate: number): number {
  return Math.round((homeValue / 1000) * millRate);
}

/**
 * Convenience for the tax-arbitrage calculator on /relocate.
 * Returns average MA property-tax rate used as a benchmark (percentage of value
 * per year, expressed as decimal: 0.0142 = 1.42% effective). This is the Boston
 * metro average effective rate on single-family homes.
 *
 * [DEMO COPY - estimates] — confirm against most recent Tax Foundation or
 * MA Department of Revenue data before launch.
 */
export const MA_EFFECTIVE_PROPERTY_TAX_RATE = 0.0142;

/**
 * NH has no income tax on wages (as of 2026 the interest/dividends tax is
 * fully phased out). MA has a flat 5% income tax on wages plus a 4% millionaire
 * surtax above $1M. We use 5% as the effective MA income tax for relocation
 * savings math, because the target audience (Mike & Jess, $160-220K HHI)
 * sits below the surtax threshold.
 *
 * [DEMO COPY - estimates]
 */
export const MA_INCOME_TAX_RATE = 0.05;
export const NH_INCOME_TAX_RATE = 0.0;

/**
 * MA sales tax is 6.25%. NH has no sales tax. For a typical household,
 * taxable purchases are roughly 12-18% of gross household income (the
 * BLS Consumer Expenditure Survey puts retail + dining + household goods
 * near that band for middle-to-upper-middle income bands).
 *
 * [DEMO COPY - estimates]
 */
export const MA_SALES_TAX_RATE = 0.0625;
export const TAXABLE_SPEND_AS_SHARE_OF_INCOME = 0.15;
