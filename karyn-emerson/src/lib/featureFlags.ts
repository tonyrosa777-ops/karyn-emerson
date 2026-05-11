// Feature flags — single source of truth for env-gated features.
// Pattern mirrors NEXT_PUBLIC_SHOW_PRICING_TOOLS.

export const SHOP_ENABLED =
  process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
