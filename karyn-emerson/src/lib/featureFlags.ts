// Feature flags — single source of truth for env-gated features.

export const SHOP_ENABLED =
  process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
