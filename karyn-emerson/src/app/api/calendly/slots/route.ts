// =============================================================================
// /api/calendly/slots — GET available time slots for a given date
// Per CLAUDE.md Always-Built Features Rule (Inline Booking Calendar):
//   - If CALENDLY_API_KEY + NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI are set,
//     calls the real Calendly availability endpoint.
//   - Otherwise returns seeded deterministic slots so the demo is fully
//     interactive without credentials.
// Seeded mode uses hash(date) to produce 6-9 half-hour slots between 9:00
// and 17:30 on weekdays, fewer on weekends.
// =============================================================================

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Slot {
  iso: string;       // full ISO timestamp
  label: string;     // human-readable time e.g. "9:30 AM"
  available: boolean;
}

function hashDate(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = (h * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededSlots(dateStr: string): Slot[] {
  const [yStr, mStr, dStr] = dateStr.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  if (!y || !m || !d) return [];

  const date = new Date(Date.UTC(y, m - 1, d));
  const dow = date.getUTCDay(); // 0 = Sun ... 6 = Sat
  const h = hashDate(dateStr);

  // Half-hour slots between 9:00 and 17:30 local
  const allSlots: Array<{ hour: number; minute: number }> = [];
  for (let hr = 9; hr <= 17; hr++) {
    allSlots.push({ hour: hr, minute: 0 });
    if (hr !== 17) allSlots.push({ hour: hr, minute: 30 });
  }
  allSlots.push({ hour: 17, minute: 30 });

  // Deterministic subset based on hash.
  // Weekday: 6-9 slots. Weekend: 2-4 slots.
  const isWeekend = dow === 0 || dow === 6;
  const target = isWeekend ? 2 + (h % 3) : 6 + (h % 4);

  // Shuffle slots deterministically via hash and pick first N.
  const shuffled = [...allSlots].sort(
    (a, b) => ((h ^ (a.hour * 60 + a.minute)) % 97) - ((h ^ (b.hour * 60 + b.minute)) % 97)
  );
  const chosen = shuffled.slice(0, Math.min(target, allSlots.length));
  chosen.sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute));

  return chosen.map(({ hour, minute }) => {
    const slotDate = new Date(Date.UTC(y, m - 1, d, hour, minute));
    const labelHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    const mm = minute.toString().padStart(2, "0");
    return {
      iso: slotDate.toISOString(),
      label: `${labelHour}:${mm} ${ampm}`,
      available: true,
    };
  });
}

async function fetchCalendlySlots(
  apiKey: string,
  eventTypeUri: string,
  dateStr: string
): Promise<Slot[] | null> {
  try {
    const [yStr, mStr, dStr] = dateStr.split("-");
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (!y || !m || !d) return null;

    const start = new Date(Date.UTC(y, m - 1, d, 0, 0, 0)).toISOString();
    const end = new Date(Date.UTC(y, m - 1, d, 23, 59, 59)).toISOString();

    const url = new URL("https://api.calendly.com/event_type_available_times");
    url.searchParams.set("event_type", eventTypeUri);
    url.searchParams.set("start_time", start);
    url.searchParams.set("end_time", end);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    type CalendlyTime = { start_time: string; status?: string };
    const collection: CalendlyTime[] = data.collection ?? [];

    return collection.map((slot) => {
      const when = new Date(slot.start_time);
      const hour = when.getHours();
      const minute = when.getMinutes();
      const labelHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const mm = minute.toString().padStart(2, "0");
      return {
        iso: slot.start_time,
        label: `${labelHour}:${mm} ${ampm}`,
        available: slot.status !== "unavailable",
      };
    });
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Missing or invalid ?date=YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri =
    process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI ??
    process.env.CALENDLY_EVENT_TYPE_URI;

  if (apiKey && eventTypeUri) {
    const real = await fetchCalendlySlots(apiKey, eventTypeUri, date);
    if (real && real.length > 0) {
      return NextResponse.json({ date, slots: real, mode: "live" });
    }
  }

  const slots = seededSlots(date);
  return NextResponse.json({ date, slots, mode: "demo" });
}
