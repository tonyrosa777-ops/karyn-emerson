"use client";

// =============================================================================
// ShopContent.tsx — Karyn Emerson POD merch grid with category filter,
// variant picker (colors + sizes), and seeded fallback for demo mode.
// Spec: CLAUDE.md Always-Built Features Rule (Shop). No em dashes.
// Design tokens only — var(--primary), var(--accent), var(--bg-base), etc.
// =============================================================================

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { useCart } from "@/lib/cart";
import seededProducts from "@/lib/printful-seeded-products.json";

const CATEGORIES = ["All", "Apparel", "Drinkware", "Bags", "Home & Stationery"];

// Maps Printful color names → CSS colors for swatches
const COLOR_MAP: Record<string, string> = {
  Black: "#1c1c1c",
  White: "#f5f5f5",
  Navy: "#1a2744",
  "Navy Blue": "#1a2744",
  Red: "#c0392b",
  "Forest Green": "#2d6a4f",
  "Military Green": "#4a5c3e",
  "Bottle Green": "#1e3d2f",
  Storm: "#6b7c8d",
  "Sport Grey": "#a8adb0",
  "Dark Heather": "#4a4e54",
  Heather: "#9ca3a8",
  Maroon: "#7b1a2e",
  Ash: "#b8bab9",
  Sand: "#d4b896",
  Royal: "#2c5fa8",
  "Royal Blue": "#2c5fa8",
  Purple: "#6a2a8c",
  Orange: "#e07b2a",
  Gold: "#c9a227",
  Yellow: "#e8c523",
  Pink: "#e8a0b4",
  "Light Pink": "#f2c4ce",
  Charcoal: "#3d4349",
  "Light Blue": "#7eb8d4",
  "Vintage White": "#f0ece0",
  "Carolina Blue": "#5b93c7",
  "Heather Blue": "#7a9ab5",
  Olive: "#6b7c3e",
  Brown: "#6b4c3b",
  Chocolate: "#5c3d2e",
  Burgundy: "#722f37",
  Mustard: "#c9a227",
  Cream: "#f5f0e8",
  Cranberry: "#9e2a2b",
  "Dark Navy": "#0d1a33",
  Slate: "#708090",
  Mint: "#98d8c8",
  Coral: "#e8785a",
  Teal: "#2a7a7a",
  Indigo: "#3d52a0",
  Green: "#3a7d44",
  Blue: "#2c5fa8",
  Grey: "#9ca3a8",
  Gray: "#9ca3a8",
  Silver: "#c0c0c0",
  Rose: "#e8a0b4",
  "Rose Gold": "#b76e79",
  Lavender: "#b57bee",
  "Sky Blue": "#87ceeb",
  Cobalt: "#0047ab",
  Aqua: "#00bcd4",
};

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url?: string;
  variants?: number;
  sync_product?: { name: string; thumbnail_url?: string };
}

interface NormalizedProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface VariantOption {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
}

type PickerStatus = "idle" | "loading" | "ready" | "error";

interface VariantPickerState {
  status: PickerStatus;
  variants: VariantOption[];
  selectedSize: string;
  selectedColor: string;
  expanded: boolean;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden h-full flex flex-col animate-pulse"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(47, 74, 58, 0.08)",
      }}
    >
      <div className="aspect-square" style={{ background: "var(--bg-elevated)" }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-2 rounded w-1/3" style={{ background: "var(--bg-elevated)" }} />
        <div className="h-4 rounded w-3/4" style={{ background: "var(--bg-elevated)" }} />
        <div className="h-3 rounded w-full" style={{ background: "var(--bg-elevated)" }} />
        <div className="flex justify-between items-center mt-2">
          <div className="h-5 rounded w-12" style={{ background: "var(--bg-elevated)" }} />
          <div className="h-8 rounded-full w-24" style={{ background: "var(--bg-elevated)" }} />
        </div>
      </div>
    </div>
  );
}

function SuccessBanner() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-0 left-0 right-0 z-[90] text-center py-3 px-6 font-body font-semibold"
          style={{
            background: "var(--accent)",
            color: "var(--bg-base)",
          }}
        >
          Your order is confirmed. Thank you for supporting Southern NH.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Color swatch circle
function ColorSwatch({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const normalizeKey = (k: string) =>
    k.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  const hex = COLOR_MAP[color] ?? COLOR_MAP[normalizeKey(color)] ?? "#999";
  const isLight = hex === "#f5f5f5" || hex === "#f0ece0" || hex === "#f5f0e8" || hex === "#e8c523";
  return (
    <button
      onClick={onClick}
      title={color}
      className="relative flex-shrink-0 transition-transform hover:scale-110 focus:outline-none"
      style={{ width: 28, height: 28 }}
    >
      <span
        className="block rounded-full border"
        style={{
          width: 28,
          height: 28,
          background: hex,
          borderColor: isLight ? "rgba(47, 74, 58, 0.3)" : "transparent",
          boxShadow: selected
            ? `0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent)`
            : "inset 0 1px 2px rgba(18, 24, 20, 0.15)",
        }}
      />
    </button>
  );
}

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | string | null>(null);
  const [pickerStates, setPickerStates] = useState<Record<number, VariantPickerState>>({});
  const { addItem } = useCart();

  useEffect(() => {
    const previewMap: Record<number, string> = {};
    seededProducts.products.forEach((p) => {
      if (p.preview_image_url) previewMap[p.printful_id] = p.preview_image_url;
    });

    fetch("/api/printful/products")
      .then((r) => r.json())
      .then((data: PrintfulProduct[]) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error("empty");

        // Detect seeded fallback vs real Printful sync: seeded objects carry
        // a top-level "printful_id" field while sync products carry "id" and
        // usually a nested "sync_product" key.
        type SeededProduct = {
          printful_id: number;
          slug: string;
          name: string;
          price: number;
          category: string;
          preview_image_url?: string;
        };
        const first = data[0] as unknown as Record<string, unknown>;
        const isSeeded =
          typeof first?.printful_id === "number" && first?.sync_product === undefined;

        if (isSeeded) {
          const seededData = data as unknown as SeededProduct[];
          setProducts(
            seededData.map((p) => ({
              id: p.printful_id,
              slug: p.slug,
              name: p.name,
              price: p.price,
              category: p.category,
              image: p.preview_image_url,
            }))
          );
          return;
        }

        const normalized: NormalizedProduct[] = data.map((p) => {
          const raw = p.sync_product ?? p;
          const name = raw.name ?? p.name ?? "Product";
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          let category = "Home & Stationery";
          const lower = name.toLowerCase();
          if (/hoodie|\btee\b|tank|long sleeve|jogger|sweatshirt|zip hoodie|raglan|crewneck/.test(lower)) category = "Apparel";
          else if (/mug|tumbler|water bottle|enamel|can cooler/.test(lower)) category = "Drinkware";
          else if (/tote|drawstring|crossbody|duffle|backpack|laptop sleeve/.test(lower)) category = "Bags";
          else if (/pillow|blanket|poster|notebook|canvas|journal|candle|pennant|banner|apron|doormat|print/.test(lower)) category = "Home & Stationery";

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const productId: number = p.id ?? (p as any).printful_id;
          const pfThumb = raw.thumbnail_url || p.thumbnail_url;
          const image = pfThumb && pfThumb.length > 10 ? pfThumb : previewMap[productId];

          return { id: productId, slug, name, price: 0, category, image };
        });
        setProducts(normalized);
      })
      .catch(() => {
        // Hard fallback — network failure or API threw.
        const seeded = seededProducts as {
          products: Array<{ slug: string; name: string; price: number; category: string; preview_image_url?: string; printful_id: number }>;
        };
        setProducts(
          seeded.products.map((p) => ({
            id: p.printful_id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.preview_image_url,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const seededPrices: Record<number, number> = {};
  seededProducts.products.forEach((p) => {
    seededPrices[p.printful_id] = p.price;
  });

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // ── Variant picker helpers ───────────────────────────────────────────────────

  function getPicker(productId: number): VariantPickerState {
    return (
      pickerStates[productId] ?? {
        status: "idle",
        variants: [],
        selectedSize: "",
        selectedColor: "",
        expanded: false,
      }
    );
  }

  function setPicker(productId: number, patch: Partial<VariantPickerState>) {
    setPickerStates((prev) => ({
      ...prev,
      [productId]: { ...getPicker(productId), ...patch },
    }));
  }

  async function openVariantPicker(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    if (picker.expanded) {
      setPicker(product.id, { expanded: false });
      return;
    }
    if (picker.status === "ready") {
      setPicker(product.id, { expanded: true });
      return;
    }
    setPicker(product.id, { status: "loading", expanded: true });
    try {
      const res = await fetch(`/api/printful/variants/${product.id}`);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const variants: VariantOption[] = data.variants ?? [];

      // Demo mode: Printful returned no variants (no API key). Add a synthetic
      // "one size fits all" variant so Add-to-Cart still works end-to-end.
      if (variants.length === 0) {
        const demoVariant: VariantOption = {
          id: product.id,
          name: product.name,
          size: "",
          color: "",
          price: seededPrices[product.id] ?? product.price ?? 0,
          image: product.image ?? "",
        };
        setPicker(product.id, {
          status: "ready",
          variants: [demoVariant],
          selectedSize: "",
          selectedColor: "",
          expanded: true,
        });
        return;
      }

      if (variants.length === 1) {
        setPicker(product.id, {
          status: "ready",
          variants,
          selectedSize: variants[0].size,
          selectedColor: variants[0].color,
          expanded: true,
        });
      } else {
        setPicker(product.id, { status: "ready", variants, expanded: true });
      }
    } catch {
      setPicker(product.id, { status: "error" });
    }
  }

  function handleAddPODItem(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    const variant = getSelectedVariant(product.id);
    if (!variant) return;

    const variantLabel =
      picker.selectedColor && picker.selectedSize
        ? `${picker.selectedColor} / ${picker.selectedSize}`
        : picker.selectedColor || picker.selectedSize;

    const displayName = variantLabel
      ? `${product.name}, ${variantLabel}`
      : product.name;

    addItem({
      id: variant.id,
      name: displayName,
      price: variant.price,
      quantity: 1,
      image: variant.image || product.image,
      printful_variant_id: variant.id,
      size: variant.size,
      color: variant.color,
      category: product.category,
    });

    setAddedId(variant.id);
    setTimeout(() => setAddedId(null), 1500);
    setPicker(product.id, { expanded: false });
  }

  function getSelectedVariant(productId: number): VariantOption | undefined {
    const picker = getPicker(productId);
    if (picker.status !== "ready" || picker.variants.length === 0) return undefined;
    return picker.variants.find(
      (v) =>
        (!picker.selectedSize || v.size === picker.selectedSize) &&
        (!picker.selectedColor || v.color === picker.selectedColor)
    );
  }

  function getUniqueSizes(productId: number): string[] {
    const picker = getPicker(productId);
    const relevant = picker.selectedColor
      ? picker.variants.filter((v) => v.color === picker.selectedColor)
      : picker.variants;
    return [...new Set(relevant.map((v) => v.size))].filter(Boolean);
  }

  function getUniqueColors(productId: number): string[] {
    const picker = getPicker(productId);
    return [...new Set(picker.variants.map((v) => v.color))].filter(Boolean);
  }

  function isSizeAvailable(productId: number, size: string): boolean {
    const picker = getPicker(productId);
    if (!picker.selectedColor) return true;
    return picker.variants.some((v) => v.color === picker.selectedColor && v.size === size);
  }

  function getDisplayImage(product: NormalizedProduct): string | undefined {
    const picker = getPicker(product.id);
    if (picker.status === "ready" && picker.selectedColor) {
      const variant = picker.variants.find((v) => v.color === picker.selectedColor);
      if (variant?.image) return variant.image;
    }
    return product.image;
  }

  function getDisplayPrice(product: NormalizedProduct): number {
    const variant = getSelectedVariant(product.id);
    if (variant && variant.price > 0) return variant.price;
    const picker = getPicker(product.id);
    if (picker.status === "ready" && picker.variants.length > 0 && picker.variants[0].price > 0) {
      return picker.variants[0].price;
    }
    return seededPrices[product.id] ?? product.price;
  }

  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL", "4XL", "5XL", "6XL"];
  function sortSizes(sizes: string[]): string[] {
    return [...sizes].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }

  return (
    <>
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>

      {/* Intro strip */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-14 text-center lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              Local goods, printed on demand
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              A few things I wear, gift, and carry.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Hoodies, mugs, totes, and a few things for your hallway. Printed by Printful, shipped direct to you. No inventory, no overhead, no compromise on quality.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Filter chips — sticky below top nav */}
      <section
        className="sticky z-30 border-b"
        style={{
          top: "96px",
          background: "var(--bg-elevated)",
          borderColor: "rgba(47, 74, 58, 0.08)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="whitespace-nowrap rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                  style={
                    isActive
                      ? {
                          background: "var(--primary)",
                          color: "var(--bg-base)",
                          border: "1px solid var(--primary)",
                        }
                      : {
                          background: "var(--bg-card)",
                          color: "var(--text-secondary)",
                          border: "1px solid rgba(47, 74, 58, 0.15)",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section
        className="relative"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <SkeletonCard />
                  </div>
                ))
              : filteredProducts.map((product, i) => {
                  const picker = getPicker(product.id);
                  const displayImage = getDisplayImage(product);
                  const displayPrice = getDisplayPrice(product);
                  const selectedVariant = getSelectedVariant(product.id);
                  const uniqueColors = getUniqueColors(product.id);
                  const uniqueSizes = sortSizes(getUniqueSizes(product.id));
                  const hasColors = uniqueColors.length > 0;
                  const hasSizes = uniqueSizes.length > 0;
                  const isAdded = addedId === selectedVariant?.id;

                  const canAdd = picker.status === "ready" && selectedVariant !== undefined;

                  return (
                    <FadeUp key={product.id} delay={i * 0.04}>
                      <motion.div
                        layout
                        className="emphasis-card rounded-xl overflow-hidden flex flex-col h-full"
                        style={{
                          background: "var(--bg-card)",
                        }}
                      >
                        {/* Image */}
                        <div
                          className="aspect-square relative overflow-hidden flex-shrink-0"
                          style={{ background: "var(--bg-elevated)" }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={displayImage ?? "placeholder"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0"
                            >
                              {displayImage ? (
                                <Image
                                  src={displayImage}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover object-center"
                                  loading="lazy"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-12 h-12"
                                    style={{ color: "rgba(47, 74, 58, 0.3)" }}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                  >
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="m21 15-5-5L5 21" />
                                  </svg>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1"
                            style={{ color: "var(--accent)" }}
                          >
                            {product.category}
                          </span>
                          <h3
                            className="font-display font-semibold text-[var(--text-primary)]"
                            style={{ fontSize: "1.125rem", lineHeight: 1.25 }}
                          >
                            {product.name}
                          </h3>

                          {/* Variant picker — expands inline */}
                          <AnimatePresence>
                            {picker.expanded && picker.status === "ready" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <div className="pt-3 pb-2 space-y-3">
                                  {hasColors && (
                                    <div>
                                      <p
                                        className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                                        style={{ color: "var(--text-muted)" }}
                                      >
                                        Color{picker.selectedColor ? `, ${picker.selectedColor}` : ""}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {uniqueColors.map((color) => (
                                          <ColorSwatch
                                            key={color}
                                            color={color}
                                            selected={picker.selectedColor === color}
                                            onClick={() =>
                                              setPicker(product.id, {
                                                selectedColor: color,
                                                selectedSize: "",
                                              })
                                            }
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {hasSizes && (
                                    <div>
                                      <p
                                        className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                                        style={{ color: "var(--text-muted)" }}
                                      >
                                        Size
                                      </p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {uniqueSizes.map((size) => {
                                          const available = isSizeAvailable(product.id, size);
                                          const selected = picker.selectedSize === size;
                                          return (
                                            <button
                                              key={size}
                                              disabled={!available}
                                              onClick={() => setPicker(product.id, { selectedSize: size })}
                                              className="px-3 py-1 text-[11px] rounded font-mono uppercase tracking-wider transition-all"
                                              style={
                                                selected
                                                  ? {
                                                      background: "var(--primary)",
                                                      color: "var(--bg-base)",
                                                      border: "1px solid var(--primary)",
                                                    }
                                                  : available
                                                  ? {
                                                      background: "transparent",
                                                      color: "var(--text-secondary)",
                                                      border: "1px solid rgba(47, 74, 58, 0.25)",
                                                    }
                                                  : {
                                                      background: "transparent",
                                                      color: "var(--text-muted)",
                                                      border: "1px solid rgba(47, 74, 58, 0.08)",
                                                      textDecoration: "line-through",
                                                      cursor: "not-allowed",
                                                    }
                                              }
                                            >
                                              {size}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {!canAdd && (
                                    <p
                                      className="text-[11px] italic"
                                      style={{ color: "var(--text-muted)" }}
                                    >
                                      {!picker.selectedColor && hasColors && !picker.selectedSize && hasSizes
                                        ? "Select a color and size."
                                        : !picker.selectedColor && hasColors
                                        ? "Select a color."
                                        : !picker.selectedSize && hasSizes
                                        ? "Select a size."
                                        : ""}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {picker.expanded && picker.status === "loading" && (
                            <div className="pt-3 flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full animate-spin"
                                style={{
                                  border: "2px solid rgba(181, 83, 44, 0.25)",
                                  borderTopColor: "var(--accent)",
                                }}
                              />
                              <p
                                className="text-[11px]"
                                style={{ color: "var(--text-muted)" }}
                              >
                                Loading options...
                              </p>
                            </div>
                          )}

                          {picker.expanded && picker.status === "error" && (
                            <p
                              className="text-[11px] pt-3"
                              style={{ color: "var(--accent)" }}
                            >
                              Could not load options. Try again.
                            </p>
                          )}

                          {/* Price + button row */}
                          <div className="flex items-center justify-between mt-auto pt-4">
                            <motion.span
                              key={displayPrice}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="font-display font-semibold"
                              style={{
                                color: "var(--primary)",
                                fontSize: "1.35rem",
                              }}
                            >
                              {displayPrice ? `$${displayPrice.toFixed(2)}` : "—"}
                            </motion.span>

                            {canAdd ? (
                              <button
                                onClick={() => handleAddPODItem(product)}
                                className="rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] transition-colors"
                                style={
                                  isAdded
                                    ? {
                                        background: "var(--accent)",
                                        color: "var(--bg-base)",
                                        border: "1px solid var(--accent)",
                                      }
                                    : {
                                        background: "var(--primary)",
                                        color: "var(--bg-base)",
                                        border: "1px solid var(--primary)",
                                      }
                                }
                              >
                                {isAdded ? "Added" : "Add to Cart"}
                              </button>
                            ) : picker.expanded ? (
                              <span
                                className="rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.18em]"
                                style={{
                                  border: "1px solid rgba(47, 74, 58, 0.15)",
                                  color: "var(--text-muted)",
                                  cursor: "not-allowed",
                                }}
                              >
                                Add to Cart
                              </span>
                            ) : (
                              <button
                                onClick={() => openVariantPicker(product)}
                                className="rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] transition-colors"
                                style={{
                                  background: "transparent",
                                  color: "var(--primary)",
                                  border: "1px solid var(--primary)",
                                }}
                              >
                                Select & Add
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </FadeUp>
                  );
                })}
          </div>

          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p
                className="font-display italic"
                style={{ color: "var(--text-secondary)", fontSize: "1.25rem" }}
              >
                No items in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Closing note — dark band */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
          <p
            className="font-display italic"
            style={{
              color: "var(--text-on-dark-primary)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
              lineHeight: 1.5,
            }}
          >
            Every piece prints to order. No landfill overstock, no dusty closet. Wear your town with pride.
          </p>
          <p
            className="mt-6 font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            Karyn Emerson · Salem, NH
          </p>
        </div>
      </section>
    </>
  );
}
