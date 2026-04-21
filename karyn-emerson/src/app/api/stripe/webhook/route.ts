import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getSyncProductDetail, createOrder } from "@/lib/printful";
import seededProducts from "@/lib/printful-seeded-products.json";

export const dynamic = "force-dynamic";

// Build a lookup: printful_id (number) → slug for logging
const SEEDED_ID_MAP: Record<number, string> = {};
seededProducts.products.forEach((p) => {
  SEEDED_ID_MAP[p.printful_id] = p.slug;
});

interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  printful_variant_id?: number;
}

/**
 * Send order alert email to Karyn via Resend.
 * Non-fatal — if RESEND_API_KEY is absent, the order still processes normally.
 */
async function sendOrderAlertToKaryn(
  session: Stripe.Checkout.Session,
  cart: CartItem[]
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[webhook] RESEND_API_KEY not set — skipping order alert");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const total = ((session.amount_total ?? 0) / 100).toFixed(2);
  const customer = session.customer_details;
  const itemLines = cart
    .map((i) => `  - ${i.name} x${i.quantity} ... $${i.price.toFixed(2)}`)
    .join("\n");

  const body = `New shop order on karynemerson.com

Customer: ${customer?.name ?? "Unknown"} <${customer?.email ?? "no email"}>
Total: $${total}

Items:
${itemLines}

Stripe Session: ${session.id}
View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}
`;

  try {
    await resend.emails.send({
      from: "orders@karynemerson.com",
      to: "karyn@karynemerson.com",
      subject: `New Shop Order, $${total}`,
      text: body,
    });
    console.log("[webhook] Order alert sent to Karyn");
  } catch (err) {
    console.error("[webhook] Failed to send order alert to Karyn:", err);
  }
}

/**
 * Resolve the sync_variant_id for a Printful POD product.
 * Fetches the product detail and returns the first available sync variant.
 */
async function resolveSyncVariantId(syncProductId: number): Promise<number | null> {
  try {
    const detail = await getSyncProductDetail(
      seededProducts.storeId,
      syncProductId
    );
    const available = detail.sync_variants.find(
      (v) => v.availability_status !== "discontinued"
    );
    if (!available) {
      console.error(`[webhook] No available variants for sync product ${syncProductId}`);
      return null;
    }
    return available.id;
  } catch (err) {
    console.error(`[webhook] Failed to fetch sync product ${syncProductId}:`, err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || webhookSecret.includes("REPLACE_WITH")) {
    console.warn("[webhook] Stripe webhook secret not configured — skipping verification");
    return NextResponse.json({ received: true });
  }

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[webhook] Stripe signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log("[webhook] Event received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("[webhook] checkout.session.completed — session ID:", session.id);

    // ── Parse cart metadata ──────────────────────────────────────────────────
    let cart: CartItem[] = [];
    try {
      cart = JSON.parse(session.metadata?.cart ?? "[]");
      console.log("[webhook] Cart parsed:", JSON.stringify(cart));
    } catch {
      console.error("[webhook] Failed to parse cart metadata for session:", session.id);
      return NextResponse.json({ received: true });
    }

    // ── Shipping address ─────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny = session as any;
    const shipping =
      sessionAny.collected_information?.shipping_details ??
      sessionAny.shipping_details;

    // ── Every cart item is POD — all go through Printful ────────────────────
    const podItems = cart;

    // ── Create Printful order ────────────────────────────────────────────────
    if (podItems.length > 0) {
      if (!shipping?.address) {
        console.error(
          "[webhook] No shipping address in session — cannot create Printful order:",
          session.id
        );
        return NextResponse.json({ received: true });
      }

      // Resolve sync_variant_id for each POD item
      const resolvedItems: Array<{ sync_variant_id: number; quantity: number; name: string }> = [];

      for (const item of podItems) {
        const syncProductId = Number(item.id);

        if (item.printful_variant_id) {
          console.log(
            `[webhook] Using pre-set variant ID ${item.printful_variant_id} for "${item.name}"`
          );
          resolvedItems.push({
            sync_variant_id: item.printful_variant_id,
            quantity: item.quantity,
            name: item.name,
          });
          continue;
        }

        if (isNaN(syncProductId) || !SEEDED_ID_MAP[syncProductId]) {
          console.error(
            `[webhook] Variant not found for product ID "${item.id}" ("${item.name}") — skipping`
          );
          continue;
        }

        console.log(
          `[webhook] Resolving variant for sync product ${syncProductId} ("${item.name}")...`
        );
        const variantId = await resolveSyncVariantId(syncProductId);

        if (!variantId) {
          console.error(
            `[webhook] Could not resolve variant for "${item.name}" (sync product ${syncProductId}) — skipping`
          );
          continue;
        }

        console.log(`[webhook] Variant matched: ${variantId} for "${item.name}"`);
        resolvedItems.push({
          sync_variant_id: variantId,
          quantity: item.quantity,
          name: item.name,
        });
      }

      if (resolvedItems.length === 0) {
        console.warn(
          "[webhook] No resolvable Printful variants — no POD order created for session:",
          session.id
        );
      } else {
        const orderPayload = {
          recipient: {
            name: shipping.name ?? session.customer_details?.name ?? "Customer",
            address1: shipping.address.line1 ?? "",
            address2: shipping.address.line2 ?? undefined,
            city: shipping.address.city ?? "",
            state_code: shipping.address.state ?? "",
            country_code: shipping.address.country ?? "US",
            zip: shipping.address.postal_code ?? "",
            email: session.customer_details?.email ?? undefined,
          },
          items: resolvedItems.map((i) => ({
            sync_variant_id: i.sync_variant_id,
            quantity: i.quantity,
          })),
          confirm: true, // auto-confirm so Printful sends to production immediately
          retail_costs: {
            currency: "USD",
            subtotal: ((session.amount_subtotal ?? 0) / 100).toFixed(2),
            shipping: ((session.shipping_cost?.amount_total ?? 0) / 100).toFixed(2),
          },
        };

        console.log("[webhook] Printful order payload:", JSON.stringify(orderPayload));

        try {
          const order = await createOrder(seededProducts.storeId, orderPayload);
          console.log(
            `[webhook] Printful order created successfully — order ID: ${order.id}, Stripe session: ${session.id}`
          );
        } catch (err) {
          console.error(
            "[webhook] Failed to create Printful order for session",
            session.id,
            ",",
            err
          );
        }
      }
    }

    // ── Alert Karyn of the new order ────────────────────────────────────────
    await sendOrderAlertToKaryn(session, cart);
  }

  return NextResponse.json({ received: true });
}
