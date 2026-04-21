import { NextResponse } from "next/server";
import { getSyncProducts } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

export async function GET() {
  try {
    const storeId = seededProducts.storeId as number;
    if (!process.env.PRINTFUL_API_KEY || !storeId) {
      // Demo mode — no Printful credentials. Serve seeded catalog directly.
      return NextResponse.json(seededProducts.products);
    }
    const products = await getSyncProducts(storeId);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Printful products fetch error:", err);
    // Fall back to seeded product data so shop still renders
    return NextResponse.json(seededProducts.products);
  }
}
