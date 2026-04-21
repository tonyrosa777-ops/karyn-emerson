"use client";

// =============================================================================
// QuizClient — 3-phase state machine per CLAUDE.md Always-Built Features Rule
//   phase = "intro" | "question" | "results"
//   questionIndex drives which question renders
//   pendingAnswer glows selected answer for 400ms, dims others to 30%, then advances
//   Back nav: slices answers array + re-highlights saved answer at that index
//   direction (1 | -1) drives AnimatePresence x-offset slide transitions
// Results render QUIZ_RESULTS[resultType] + <BookingCalendar /> inline.
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
import { FallingLeaves } from "@/components/sections/motion/FallingLeaves";
import { AuroraGradient } from "@/components/sections/motion/AuroraGradient";

type Phase = "intro" | "question" | "results";

const TOTAL = QUIZ_QUESTIONS.length;
const ease = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div
      className="h-[3px] w-full overflow-hidden rounded-full"
      style={{ background: "rgba(47,74,58,0.08)" }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: "var(--primary)" }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuizClient
// ---------------------------------------------------------------------------
export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
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
    if (phase !== "question") return;
    if (questionIndex > 0) {
      setDirection(-1);
      setQuestionIndex((i) => i - 1);
    } else {
      setPhase("intro");
    }
  }

  function handleRetake() {
    setPhase("intro");
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
    <div
      className="relative min-h-[calc(100vh-96px)] overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Ambient aurora backdrop per Page Animation Rule (/quiz gets ambient only) */}
      <AuroraGradient tone="editorial" intensity="subtle" />

      {/* Body-level ambient leaves over the whole stage (intro + question + results) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <FallingLeaves density="low" tone="autumn" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl flex-col px-6 py-16 md:py-24">
        <AnimatePresence mode="wait" initial={false}>
          {/* ── Intro ─────────────────────────────────── */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-1 flex-col justify-center"
            >
              {/* Intro eyebrow + kicker — banner H1 lives above in page.tsx */}
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                Before you start
              </p>
              <h2
                className="mt-4 font-display text-h2 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Six quick questions. One honest answer.
              </h2>
              <p
                className="mt-6 max-w-xl text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                You will get a result that maps to your actual situation, and a
                real next step for what to do about it.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Takes about 90 seconds",
                  "No email gate, no signup",
                  "Your result is on screen immediately",
                  "Book a 15 minute call right after, if you want to",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => setPhase("question")}
                  className="inline-flex items-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition hover:-translate-y-[1px]"
                  style={{
                    background: "var(--primary)",
                    color: "var(--bg-base)",
                    boxShadow: "0 10px 30px -10px rgba(47,74,58,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--primary)";
                  }}
                >
                  Start the quiz
                </button>
                <p
                  className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {TOTAL} questions · Result shown immediately
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Question ──────────────────────────────── */}
          {phase === "question" && currentQuestion && (
            <motion.div
              key={`q-${questionIndex}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.38, ease }}
              className="flex flex-1 flex-col justify-center"
            >
              <div className="mb-10">
                <div className="mb-3 flex items-center justify-between">
                  <p
                    className="font-mono text-xs tracking-[0.12em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Question {questionIndex + 1} of {TOTAL}
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    {String(questionIndex + 1).padStart(2, "0")}/
                    {String(TOTAL).padStart(2, "0")}
                  </p>
                </div>
                <ProgressBar current={questionIndex} total={TOTAL} />
              </div>

              <h2
                className="mb-8 font-display text-h2 font-semibold leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {currentQuestion.answers.map((answer) => {
                  const isPending = pendingAnswer === answer.type;
                  const isExisting =
                    existingAnswer === answer.type && pendingAnswer === null;
                  const isDimmed = pendingAnswer !== null && !isPending;
                  const firstLetter = answer.label.charAt(0);
                  const rest = answer.label.slice(1);

                  return (
                    <button
                      key={answer.type + answer.label}
                      type="button"
                      onClick={() => handleSelectAnswer(answer.type)}
                      disabled={pendingAnswer !== null}
                      className="group relative overflow-hidden rounded-xl p-5 text-left transition-all duration-200"
                      style={{
                        background: "var(--bg-card)",
                        border: `1.5px solid ${
                          isPending || isExisting
                            ? "var(--primary)"
                            : "rgba(47,74,58,0.14)"
                        }`,
                        boxShadow: isPending
                          ? "0 12px 30px -12px rgba(47,74,58,0.35)"
                          : "0 2px 8px -4px rgba(26,31,28,0.06)",
                        opacity: isDimmed ? 0.3 : 1,
                        transform: isPending ? "translateY(-1px)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (pendingAnswer === null && !isExisting) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor =
                            "var(--primary)";
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "0 8px 24px -8px rgba(26,31,28,0.12)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pendingAnswer === null && !isExisting) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor =
                            "rgba(47,74,58,0.14)";
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "0 2px 8px -4px rgba(26,31,28,0.06)";
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="select-none text-xl leading-none"
                          aria-hidden="true"
                        >
                          {answer.emoji}
                        </span>
                        <p
                          className="font-body text-[0.95rem] leading-relaxed"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {/* Cormorant drop-cap on first letter per §5 */}
                          <span
                            className="font-display text-[1.55rem] font-semibold leading-none"
                            style={{
                              color: "var(--primary)",
                              paddingRight: 2,
                            }}
                          >
                            {firstLetter}
                          </span>
                          {rest}
                        </p>
                      </div>
                      {/* Bottom accent bar when selected */}
                      {(isPending || isExisting) && (
                        <span
                          className="absolute inset-x-0 bottom-0 h-[3px]"
                          style={{ background: "var(--primary)" }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] transition"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  {"\u2190"} Back
                </button>
              </div>
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
              <p
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                Your result
              </p>
              <h2
                className="mt-4 font-display text-h1 font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {result.name}
              </h2>
              <p
                className="mt-3 font-display text-xl italic"
                style={{ color: "var(--primary)" }}
              >
                {result.tagline}
              </p>

              <div
                className="mt-8 space-y-5 border-t pt-8"
                style={{ borderColor: "rgba(47,74,58,0.12)" }}
              >
                {result.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[1.75]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Recommended program card */}
              <div
                className="emphasis-card mt-10 overflow-hidden rounded-2xl p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid rgba(47,74,58,0.12)",
                  boxShadow: "0 12px 36px -18px rgba(26,31,28,0.14)",
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
                  style={{ color: "var(--text-primary)" }}
                >
                  {result.recommendedProgram.name}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {result.recommendedProgram.reason}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={result.recommendedProgram.href}
                    className="inline-flex items-center rounded-full px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition"
                    style={{
                      background: "var(--primary)",
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
                        borderColor: "var(--primary)",
                        color: "var(--primary)",
                      }}
                    >
                      {result.secondaryLink.name}
                    </Link>
                  )}
                </div>
              </div>

              {/* Inline booking calendar — the whole point of the quiz */}
              <div className="mt-12">
                <div className="mb-5">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Book your 15 minute call
                  </p>
                  <h3
                    className="mt-2 font-display text-2xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    While it is top of mind.
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Karyn will already know your result and come prepared. No
                    pressure, no obligation.
                  </p>
                </div>
                <BookingCalendar
                  title="Book a time with Karyn"
                  subtitle="Free 15 minute call. Karyn will already know your quiz result before the call starts."
                />
              </div>

              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 transition"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  Retake the quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
