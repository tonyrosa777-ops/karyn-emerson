"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Mirror of server schema in /api/contact/route.ts.
const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name.").max(120),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().max(40).optional().or(z.literal("")),
  intent: z.enum(["Selling", "Buying", "Relocating", "Just exploring"]),
  message: z.string().min(1, "Please write a short message."),
});

type ContactFormData = z.infer<typeof contactSchema>;

type Status = "idle" | "submitting" | "success" | "error";

const intents: Array<ContactFormData["intent"]> = [
  "Selling",
  "Buying",
  "Relocating",
  "Just exploring",
];

const intentEmoji: Record<ContactFormData["intent"], string> = {
  Selling: "🪴",
  Buying: "🔑",
  Relocating: "🧭",
  "Just exploring": "☕",
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      intent: "Selling",
      message: "",
    },
    mode: "onBlur",
  });

  const selectedIntent = watch("intent");

  const onSubmit = handleSubmit(async (data) => {
    // Client-side validation through Zod as a belt-and-suspenders check.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setServerError("Please review the fields above.");
      return;
    }
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus("error");
        setServerError(
          "Something went wrong on our end. Please try again or call directly.",
        );
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "Network error. Please try again or call directly.",
      );
    }
  });

  if (status === "success") {
    return (
      <div
        className="rounded-lg border p-8 text-center"
        style={{
          background: "var(--bg-card)",
          borderColor: "rgba(47, 74, 58, 0.14)",
        }}
        role="status"
        aria-live="polite"
      >
        <div className="text-4xl" aria-hidden="true">
          🌿
        </div>
        <h3 className="mt-4 font-display text-h3 font-semibold text-[var(--text-primary)]">
          Your note is with me.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
          I read every message myself. You will hear back from me within a
          business day, often faster. If it is urgent, feel free to text.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-full border-2 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition"
          style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-lg border p-6 md:p-8"
      style={{
        background: "var(--bg-card)",
        borderColor: "rgba(47, 74, 58, 0.14)",
      }}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className="mt-2 w-full rounded-md border px-4 py-3 font-body text-base outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            style={{
              borderColor: "rgba(47, 74, 58, 0.18)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
            }}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-[var(--accent)]">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="mt-2 w-full rounded-md border px-4 py-3 font-body text-base outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            style={{
              borderColor: "rgba(47, 74, 58, 0.18)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
            }}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[var(--accent)]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="contact-phone"
            className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="mt-2 w-full rounded-md border px-4 py-3 font-body text-base outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            style={{
              borderColor: "rgba(47, 74, 58, 0.18)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="md:col-span-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            What brings you here
          </span>
          <div
            role="radiogroup"
            aria-label="What brings you here"
            className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4"
          >
            {intents.map((option) => {
              const active = selectedIntent === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setValue("intent", option)}
                  className="flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition"
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "var(--bg-elevated)",
                    color: active
                      ? "var(--bg-base)"
                      : "var(--text-primary)",
                    borderColor: active
                      ? "var(--primary)"
                      : "rgba(47, 74, 58, 0.18)",
                  }}
                >
                  <span aria-hidden="true">{intentEmoji[option]}</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          <input type="hidden" {...register("intent")} />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="contact-message"
            className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]"
          >
            Your message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            {...register("message")}
            className="mt-2 min-h-[140px] w-full resize-y rounded-md border px-4 py-3 font-body text-base outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            style={{
              borderColor: "rgba(47, 74, 58, 0.18)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
            }}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-[var(--accent)]">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p
          className="mt-4 rounded-md px-4 py-3 text-sm"
          style={{
            background: "rgba(181, 83, 44, 0.1)",
            color: "var(--accent)",
          }}
          role="alert"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        style={{
          background: "var(--primary)",
          color: "var(--bg-base)",
        }}
      >
        {status === "submitting" ? "Sending..." : "Send the message"}
      </button>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        I read every message myself. No auto-responders, no call center.
      </p>
    </form>
  );
}
