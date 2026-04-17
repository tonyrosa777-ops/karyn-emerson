"use client";

// =============================================================================
// BookingCalendar — custom-branded date picker (NOT a Calendly iframe)
// Per CLAUDE.md Always-Built Features Rule (Inline Booking Calendar):
//   - Custom UI native to the site. Under the hood calls /api/calendly/slots
//     and /api/calendly/book (which fall back to seeded demo data when
//     CALENDLY_API_KEY is missing).
//   - Four-phase UX: month grid -> date select -> time slot picker -> confirm
//     form -> confirmation state.
//   - Cream bg, forest-green selected states, JetBrains Mono for numbers and
//     times, Cormorant for the header, Inter for labels.
// Validation: react-hook-form + zod.
// =============================================================================

import { useState, useMemo, useEffect, useCallback, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";

type Step = "calendar" | "time" | "form" | "confirm";

interface Slot {
  iso: string;
  label: string;
  available: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDowOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function formatDateYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatHuman(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const slide = {
  enter: { x: 36, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -36, opacity: 0 },
};
const slideTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

// ---------------------------------------------------------------------------
// Form values (validation runs in two places: RHF rules here + Zod on the
// server in /api/calendly/book per CLAUDE.md form-validation rule)
// ---------------------------------------------------------------------------

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface BookingCalendarProps {
  /** Optional title — falls back to "Book a time with Karyn". */
  title?: string;
  /** Optional subtitle line. */
  subtitle?: string;
}

export function BookingCalendar({
  title = "Book a time with Karyn",
  subtitle = "Free 15 minute call. Pick a slot that works for you. No pressure, no obligation.",
}: BookingCalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState<Step>("calendar");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  // Build calendar grid
  const grid = useMemo(() => {
    const first = firstDowOfMonth(viewYear, viewMonth);
    const total = daysInMonth(viewYear, viewMonth);
    const cells: Array<Date | null> = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= total; d++) {
      cells.push(new Date(viewYear, viewMonth, d));
    }
    return cells;
  }, [viewYear, viewMonth]);

  // Load slots when a date is selected
  const loadSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setSlots([]);
    try {
      const res = await fetch(`/api/calendly/slots?date=${formatDateYMD(date)}`);
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && step === "time") {
      loadSlots(selectedDate);
    }
  }, [selectedDate, step, loadSlots]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function onPickDate(date: Date) {
    if (date < today) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep("time");
  }
  function onPickSlot(slot: Slot) {
    if (!slot.available) return;
    setSelectedSlot(slot);
    setStep("form");
  }

  const onSubmit = handleSubmit(async (values) => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/calendly/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          message: values.message ?? "",
          timestamp: selectedSlot.iso,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data?.error ?? "Something went wrong. Please try again.");
      } else {
        setStep("confirm");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  function reset_() {
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
    setStep("calendar");
    reset();
    setSubmitError(null);
  }

  const monthHasPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-[var(--bg-card)] shadow-[0_20px_48px_-24px_rgba(26,31,28,0.18)]"
      style={{ borderColor: "rgba(47,74,58,0.14)" }}
    >
      {/* Header */}
      <div
        className="flex flex-col gap-1 px-6 py-5 md:px-8"
        style={{
          borderBottom: "1px solid rgba(47,74,58,0.10)",
          background:
            "linear-gradient(180deg, rgba(47,74,58,0.04) 0%, rgba(47,74,58,0) 100%)",
        }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          15 minute call · free · zero pressure
        </p>
        <h3
          className="font-display text-2xl font-semibold md:text-[1.65rem]"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_minmax(280px,320px)]">
        {/* ── Calendar column ── */}
        <div className="p-6 md:p-7">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!monthHasPrev}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition disabled:opacity-30"
              style={{ background: "var(--bg-elevated)", color: "var(--primary)" }}
              aria-label="Previous month"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M9 2L4 7l5 5" />
              </svg>
            </button>
            <span
              className="font-display text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition"
              style={{ background: "var(--bg-elevated)", color: "var(--primary)" }}
              aria-label="Next month"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M5 2l5 5-5 5" />
              </svg>
            </button>
          </div>

          {/* Day-of-week */}
          <div className="mb-2 grid grid-cols-7">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="pb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {grid.map((cell, i) => {
              if (!cell) return <div key={`empty-${i}`} />;
              const isPast = cell < today;
              const isToday = cell.toDateString() === today.toDateString();
              const isSelected =
                selectedDate?.toDateString() === cell.toDateString();
              return (
                <button
                  key={cell.toISOString()}
                  type="button"
                  disabled={isPast}
                  onClick={() => onPickDate(cell)}
                  className="group relative flex aspect-square items-center justify-center rounded-lg font-mono text-sm transition"
                  style={{
                    background: isSelected
                      ? "var(--primary)"
                      : isToday
                      ? "var(--bg-elevated)"
                      : "transparent",
                    color: isSelected
                      ? "var(--bg-base)"
                      : isPast
                      ? "rgba(26,31,28,0.28)"
                      : "var(--text-primary)",
                    fontWeight: isSelected || isToday ? 600 : 400,
                    cursor: isPast ? "default" : "pointer",
                    outline:
                      isToday && !isSelected
                        ? "1.5px solid var(--primary-muted)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPast && !isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--bg-elevated)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected && !isToday) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    } else if (!isSelected && isToday) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--bg-elevated)";
                    }
                  }}
                >
                  {cell.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="hidden md:block"
          style={{ background: "rgba(47,74,58,0.08)" }}
        />

        {/* ── Detail column ── */}
        <div
          className="flex flex-col border-t p-6 md:border-t-0 md:p-7"
          style={{ borderColor: "rgba(47,74,58,0.08)" }}
        >
          <AnimatePresence mode="wait">
            {step === "calendar" && (
              <motion.div
                key="calendar-prompt"
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--primary)",
                  }}
                  aria-hidden="true"
                >
                  🗓️
                </div>
                <p
                  className="font-display text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Pick a date
                </p>
                <p
                  className="max-w-xs text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Choose a day on the calendar and we will show you open times
                  that same morning.
                </p>
              </motion.div>
            )}

            {step === "time" && selectedDate && (
              <motion.div
                key="time"
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <button
                  type="button"
                  onClick={() => setStep("calendar")}
                  className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] opacity-70 transition hover:opacity-100"
                  style={{ color: "var(--text-primary)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M8 2L3 6l5 4" />
                  </svg>
                  Back
                </button>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--accent)" }}
                >
                  {formatHuman(selectedDate)}
                </p>
                <p
                  className="mb-4 font-display text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Choose a time
                </p>
                {loadingSlots ? (
                  <p
                    className="py-6 text-center text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Loading open times...
                  </p>
                ) : slots.length === 0 ? (
                  <p
                    className="py-6 text-center text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No open slots that day. Try another date.
                  </p>
                ) : (
                  <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
                    {slots.map((slot) => (
                      <button
                        key={slot.iso}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => onPickSlot(slot)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm transition"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid rgba(47,74,58,0.14)",
                          color: "var(--text-primary)",
                          opacity: slot.available ? 1 : 0.45,
                          cursor: slot.available ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => {
                          if (slot.available) {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "var(--bg-base)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                              "var(--primary)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "var(--bg-elevated)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor =
                            "rgba(47,74,58,0.14)";
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{slot.label}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={{
                            background: slot.available
                              ? "rgba(47,74,58,0.08)"
                              : "var(--bg-base)",
                            color: slot.available
                              ? "var(--primary)"
                              : "var(--text-muted)",
                          }}
                        >
                          {slot.available ? "Open" : "Taken"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === "form" && selectedDate && selectedSlot && (
              <motion.div
                key="form"
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <button
                  type="button"
                  onClick={() => setStep("time")}
                  className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] opacity-70 transition hover:opacity-100"
                  style={{ color: "var(--text-primary)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M8 2L3 6l5 4" />
                  </svg>
                  Back
                </button>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--accent)" }}
                >
                  {formatHuman(selectedDate)} · {selectedSlot.label}
                </p>
                <p
                  className="mb-4 font-display text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your details
                </p>

                <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
                  <Field
                    label="Name"
                    error={errors.name?.message}
                    {...register("name", { required: true, minLength: 2 })}
                  />
                  <Field
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone", { required: true, minLength: 7 })}
                  />
                  <TextAreaField
                    label="What would you like to talk about?"
                    rows={3}
                    {...register("message")}
                  />

                  {submitError && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--accent)" }}
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 rounded-full px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide transition disabled:opacity-60"
                    style={{
                      background: "var(--primary)",
                      color: "var(--bg-base)",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "var(--accent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--primary)";
                    }}
                  >
                    {submitting ? "Booking..." : "Confirm booking"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "confirm" && selectedDate && selectedSlot && (
              <motion.div
                key="confirm"
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                  style={{
                    background: "rgba(47,74,58,0.12)",
                    color: "var(--primary)",
                  }}
                  aria-hidden="true"
                >
                  ✅
                </div>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--primary)" }}
                >
                  You are on the calendar
                </p>
                <p
                  className="font-display text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {formatHuman(selectedDate)} · {selectedSlot.label}
                </p>
                <p
                  className="max-w-xs text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Calendar invite sent. Karyn will reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={reset_}
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] underline underline-offset-4"
                  style={{ color: "var(--primary)" }}
                >
                  Book another time
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;

// ---------------------------------------------------------------------------
// Field primitives (local to booking surface — match design-system.md §5)
// ---------------------------------------------------------------------------

interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, ...rest },
  ref
) {
  const id = `bc-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <input
        id={id}
        ref={ref}
        {...rest}
        className="rounded-md px-4 py-2.5 font-body text-sm outline-none transition focus:shadow-[0_0_0_3px_rgba(47,74,58,0.12)]"
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(47,74,58,0.18)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor =
            "var(--primary)";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor =
            "rgba(47,74,58,0.18)";
        }}
      />
      {error && (
        <span
          className="text-xs"
          style={{ color: "var(--accent)" }}
          role="alert"
        >
          {error}
        </span>
      )}
    </label>
  );
});

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({ label, ...rest }, ref) {
    const id = `bc-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return (
      <label htmlFor={id} className="flex flex-col gap-1.5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <textarea
          id={id}
          ref={ref}
          {...rest}
          className="resize-y rounded-md px-4 py-2.5 font-body text-sm outline-none transition focus:shadow-[0_0_0_3px_rgba(47,74,58,0.12)]"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(47,74,58,0.18)",
            color: "var(--text-primary)",
            minHeight: 96,
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLTextAreaElement).style.borderColor =
              "var(--primary)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLTextAreaElement).style.borderColor =
              "rgba(47,74,58,0.18)";
          }}
        />
      </label>
    );
  }
);
