import { NextRequest, NextResponse } from "next/server";
import { getSyncProductDetail } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

export const dynamic = "force-dynamic";

export interface VariantOption {
  id: number;     // sync_variant_id — used for Printful order creation
  name: string;   // full variant name from Printful
  size: string;
  color: string;
  price: number;
  image: string;  // mockup preview URL for this variant
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const syncProductId = Number(id);

  if (isNaN(syncProductId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  // Color names that Printful uses — used to distinguish color variants from size variants
  // when parsing 2-part variant names like "Insulated tumbler / Black"
  const KNOWN_COLORS = new Set([
    "Black", "White", "Navy", "Navy Blue", "Red", "Forest Green", "Military Green", "Bottle Green",
    "Storm", "Sport Grey", "Dark Heather", "Heather", "Maroon", "Ash", "Sand",
    "Royal", "Royal Blue", "Purple", "Orange", "Gold", "Yellow", "Pink", "Light Pink",
    "Charcoal", "Light Blue", "Vintage White", "Carolina Blue", "Heather Blue", "Olive",
    "Brown", "Chocolate", "Burgundy", "Mustard", "Cream", "Cranberry", "Dark Navy",
    "Slate", "Mint", "Coral", "Teal", "Indigo", "Green", "Blue", "Grey", "Gray",
    "Silver", "Rose Gold", "Rose", "Lavender", "Sky Blue", "Cobalt", "Aqua",
  ]);

  // Demo-mode guard: no Printful credentials → no variants to fetch.
  // The shop still works; the picker just shows "Loading…" → "No options yet".
  if (!process.env.PRINTFUL_API_KEY || !seededProducts.storeId) {
    return NextResponse.json({ variants: [] });
  }

  try {
    const detail = await getSyncProductDetail(seededProducts.storeId, syncProductId);

    const variants: VariantOption[] = detail.sync_variants
      .filter((v) => v.availability_status !== "discontinued" && v.synced)
      .map((v) => {
        // Printful sync variant name formats:
        //   "Product Name / Color / Size"  → 3 parts → color=Color, size=Size
        //   "Product Name / Color"         → 2 parts where last is a color name
        //   "Product Name / Size"          → 2 parts where last is a size (e.g. "11oz")
        const parts = v.name.split(" / ");
        let size = "";
        let color = "";

        if (parts.length >= 3) {
          const candidate2 = parts[parts.length - 2];
          const candidate1 = parts[parts.length - 1];
          if (KNOWN_COLORS.has(candidate1) && !KNOWN_COLORS.has(candidate2)) {
            color = candidate1;
            size = candidate2;
          } else {
            color = candidate2;
            size = candidate1;
          }
        } else if (parts.length === 2) {
          if (KNOWN_COLORS.has(parts[1])) {
            color = parts[1];
          } else {
            size = parts[1];
          }
        }

        const previewFile = v.files.find((f) => f.type === "preview");
        const image = previewFile?.preview_url || v.product.image || "";

        return {
          id: v.id,
          name: v.name,
          size,
          color,
          price: parseFloat(v.retail_price) || 0,
          image,
        };
      });

    return NextResponse.json({ variants });
  } catch (err) {
    console.error(`[printful/variants/${id}] Error:`, err);
    return NextResponse.json({ error: "Failed to fetch variants", variants: [] }, { status: 500 });
  }
}
