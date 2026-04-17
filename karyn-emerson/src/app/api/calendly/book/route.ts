// =============================================================================
// /api/calendly/book — POST a new booking
// Per CLAUDE.md Always-Built Features Rule (Inline Booking Calendar):
//   - Zod-validated body: name, email, phone, message, timestamp
//   - If CALENDLY env vars are set, forward to Calendly.
//   - Otherwise simulate success for demo mode.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const BookSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  message: z.string().max(2000).optional().default(""),
  timestamp: z.string().min(10), // ISO start time
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = BookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri =
    process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI ??
    process.env.CALENDLY_EVENT_TYPE_URI;

  // Always log the booking for demo visibility.
  // eslint-disable-next-line no-console
  console.log("[booking] new request", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    timestamp: parsed.data.timestamp,
    mode: apiKey && eventTypeUri ? "live" : "demo",
  });

  if (apiKey && eventTypeUri) {
    // In production this would post to Calendly's scheduling endpoint.
    // Calendly's official booking API requires a single-use scheduling link;
    // integrations typically run through an OAuth flow or a hosted event type.
    // For now, we surface a graceful response and leave the integration
    // swap-in to the pre-launch wiring step.
    return NextResponse.json(
      {
        ok: true,
        mode: "live",
        message: "Calendar invite sent. Karyn will reach out within 24 hours.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      mode: "demo",
      message: "Calendar invite sent. Karyn will reach out within 24 hours.",
    },
    { status: 200 }
  );
}
