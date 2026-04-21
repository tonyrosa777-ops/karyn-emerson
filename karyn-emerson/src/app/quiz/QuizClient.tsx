"use client";

// =============================================================================
// QuizClient — 2-phase state machine (no intro gate, opens directly on Q1).
//   phase = "question" | "results"
//   questionIndex drives which question renders
//   pendingAnswer glows selected answer for 400ms, dims others to 30%, advances
//   Back nav: slices answers array + re-highlights saved answer at that index
//   direction (1 | -1) drives AnimatePresence x-offset slide transitions
// Results render QUIZ_RESULTS[resultType] + <BookingCalendar /> inline.
// Dark-forest themed to sit inside the atmospheric /quiz page shell.
// NO email gate. NO /api/quiz route. Calendly's booking form collects name/email.
// =============================================================================

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  scoreQuiz,
  type QuizType,
} from "@/data/quiz";
import { BookingCalendar } from "@/components/booking/BookingCalendar";

type Phase = "question" | "results";

const TOTAL = QUIZ_QUESTIONS.length;
const ease = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Progress bar — amber fill on a cream-tinted track, tuned for dark background
// ---------------------------------------------------------------------------
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div
      className="h-[3px] w-full overflow-hidden rounded-full"
      style={{ background: "rgba(246,241,231,0.14)" }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: "var(--accent)" }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.45, ease }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuizClient
// ---------------------------------------------------------------------------
export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("question");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<QuizType | null>(null);
  const [direction, setDirection] = useState(1);
  const [resultType, setResultType] = useState<QuizType | null>(null);

  const existingAnswer: QuizType | null =
    phase === "question" && questionIndex < answers.length
      ? answers[questionIndex]
      : null;

  function handleSelectAnswer(type: QuizType) {
    if (pendingAnswer !== null) return;
    setPendingAnswer(type);
    setTimeout(() => {
      const newAnswers = [...answers.slice(0, questionIndex), type];
      setAnswers(newAnswers);
      setPendingAnswer(null);
      if (questionIndex < TOTAL - 1) {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      } else {
        setResultType(scoreQuiz(newAnswers));
        setPhase("results");
      }
    }, 400);
  }

  function handleBack() {
    if (phase !== "question" || questionIndex === 0) return;
    setDirection(-1);
    setQuestionIndex((i) => i - 1);
  }

  function handleRetake() {
    setPhase("question");
    setQuestionIndex(0);
    setAnswers([]);
    setPendingAnswer(null);
    setResultType(null);
    setDirection(1);
  }

  const result = resultType ? QUIZ_RESULTS[resultType] : null;
  const currentQuestion =
    phase === "question" ? QUIZ_QUESTIONS[questionIndex] : null;

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {/* ── Question ──────────────────────────────── */}
        {phase === "question" && currentQuestion && (
          <motion.div
            key={`q-${questionIndex}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 44 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -44 }}
            transition={{ duration: 0.38, ease }}
          >
            {/* Progress header */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--text-on-dark-muted)" }}
                >
                  Question {String(questionIndex + 1).padStart(2, "0")} of{" "}
                  {String(TOTAL).padStart(2, "0")}
                </p>
                <p
                  className="font-mono text-[11px] tracking-[0.1em]"
                  style={{ color: "var(--accent)" }}
                >
                  {String(questionIndex + 1).padStart(2, "0")}/
                  {String(TOTAL).padStart(2, "0")}
                </p>
              </div>
              <ProgressBar current={questionIndex} total={TOTAL} />
            </div>

            {/* Question */}
            <h2
              className="mb-9 text-center font-display text-3xl font-semibold leading-[1.2] md:text-4xl"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              {currentQuestion.question}
            </h2>

            {/* Options — 2-col grid on md+ */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {currentQuestion.answers.map((answer) => {
                const isPending = pendingAnswer === answer.type;
                const isExisting =
                  existingAnswer === answer.type && pendingAnswer === null;
                const selected = isPending || isExisting;
                const isDimmed = pendingAnswer !== null && !isPending;

                return (
                  <button
                    key={answer.type + answer.label}
                    type="button"
                    onClick={() => handleSelectAnswer(answer.type)}
                    disabled={pendingAnswer !== null}
                    className="group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-200"
                    style={{
                      background: selected
                        ? "rgba(181,83,44,0.18)"
                        : "rgba(246,241,231,0.05)",
                      border: `1.5px solid ${
                        selected ? "var(--accent)" : "rgba(246,241,231,0.14)"
                      }`,
                      boxShadow: isPending
                        ? "0 14px 38px -14px rgba(181,83,44,0.55)"
                        : "none",
                      opacity: isDimmed ? 0.3 : 1,
                      transform: isPending ? "translateY(-1px)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (pendingAnswer === null && !selected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "var(--accent)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(246,241,231,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pendingAnswer === null && !selected) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(246,241,231,0.14)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(246,241,231,0.05)";
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="select-none text-2xl leading-none"
                        aria-hidden="true"
                      >
                        {answer.emoji}
                      </span>
                      <p
                        className="font-body text-[0.95rem] leading-relaxed"
                        style={{ color: "var(--text-on-dark-primary)" }}
                      >
                        {answer.label}
                      </p>
                    </div>
                    {/* Bottom accent bar when selected */}
                    {selected && (
                      <span
                        className="absolute inset-x-0 bottom-0 h-[3px]"
                        style={{ background: "var(--accent)" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Back — only visible after Q1 */}
            {questionIndex > 0 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-on-dark-muted)" }}
                >
                  ← Back
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ── Results ──────────────────────────────── */}
        {phase === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Result header */}
            <div className="text-center">
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-base)",
                }}
                aria-hidden="true"
              >
                ✦
              </div>
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                Your result
              </p>
              <h2
                className="mt-4 font-display text-4xl font-semibold md:text-5xl"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                {result.name}
              </h2>
              <p
                className="mt-3 font-display text-lg italic md:text-xl"
                style={{ color: "var(--accent)" }}
              >
                {result.tagline}
              </p>
            </div>

            {/* Body paragraphs */}
            <div
              className="mx-auto mt-10 max-w-2xl space-y-5 border-t pt-8"
              style={{ borderColor: "rgba(246,241,231,0.14)" }}
            >
              {result.body.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-[1.75]"
                  style={{ color: "var(--text-on-dark-secondary)" }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Recommended program card */}
            <div
              className="mt-10 overflow-hidden rounded-2xl p-6 md:p-8"
              style={{
                background: "rgba(246,241,231,0.07)",
                border: "1.5px solid rgba(246,241,231,0.14)",
                boxShadow: "0 18px 48px -24px rgba(0,0,0,0.55)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                Recommended for you
              </p>
              <h3
                className="mt-2 font-display text-2xl font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                {result.recommendedProgram.name}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                {result.recommendedProgram.reason}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={result.recommendedProgram.href}
                  className="inline-flex items-center rounded-full px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition hover:-translate-y-[1px]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-base)",
                  }}
                >
                  Learn more
                </Link>
                {result.secondaryLink && (
                  <Link
                    href={result.secondaryLink.href}
                    className="inline-flex items-center rounded-full border-[1.5px] px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition"
                    style={{
                      borderColor: "rgba(246,241,231,0.4)",
                      color: "var(--text-on-dark-primary)",
                    }}
                  >
                    {result.secondaryLink.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Inline booking calendar — the whole point of the quiz.
                BookingCalendar is styled for light surfaces; wrap it in a
                cream-tinted card so its own typography stays readable. */}
            <div className="mt-12">
              <div className="mb-5 text-center">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  Book your 15 minute call
                </p>
                <h3
                  className="mt-2 font-display text-3xl font-semibold"
                  style={{ color: "var(--text-on-dark-primary)" }}
                >
                  While it is top of mind.
                </h3>
                <p
                  className="mx-auto mt-2 max-w-xl text-sm leading-relaxed"
                  style={{ color: "var(--text-on-dark-secondary)" }}
                >
                  Karyn will already know your result and come prepared. No
                  pressure, no obligation.
                </p>
              </div>
              <div
                className="overflow-hidden rounded-3xl p-2 md:p-4"
                style={{
                  background: "var(--bg-elevated)",
                  boxShadow: "0 32px 80px -32px rgba(0,0,0,0.55)",
                }}
              >
                <BookingCalendar
                  title="Book a time with Karyn"
                  subtitle="Free 15 minute call. Karyn will already know your quiz result before the call starts."
                />
              </div>
            </div>

            {/* Retake */}
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={handleRetake}
                className="font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                Retake the quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
