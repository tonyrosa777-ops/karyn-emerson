import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Contact form schema — matches the client-side Zod schema in the contact page.
const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  intent: z.enum(["Selling", "Buying", "Relocating", "Just exploring"]),
  message: z.string().min(1).max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { name, email, phone, intent, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress =
    process.env.CONTACT_TO_EMAIL ?? "karyn@karynemerson.com"; // [DEMO COPY — pending client]
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ?? "website@karynemerson.com";

  // Demo mode: no RESEND_API_KEY. Never fail the form in demo.
  if (!apiKey) {
    console.log("[contact demo-mode]", { name, email, phone, intent, message });
    return NextResponse.json(
      { ok: true, demo: true },
      { status: 200 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `[Website] ${intent} inquiry from ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone || "(not provided)"}`,
        `Intent:  ${intent}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact resend error]", error);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact server error]", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
