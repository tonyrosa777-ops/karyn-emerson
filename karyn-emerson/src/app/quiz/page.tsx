// =============================================================================
// /quiz — dark-forest atmospheric quiz experience.
// Own layout (no PageBanner): full-bleed deep-sage background + radial amber
// glow + crimson FallingLeaves + RisingEmbers + soft background photograph.
// The wizard opens directly on Q1 — no intro gate — and runs centered on top.
// =============================================================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuizClient from "./QuizClient";
import { FallingLeaves } from "@/components/sections/motion/FallingLeaves";
import { RisingEmbers } from "@/components/sections/motion/RisingEmbers";

export const metadata: Metadata = {
  title: "Which Southern NH Move Is Yours? | Karyn Emerson Real Estate",
  description:
    "Eight quick questions, one result, a 15 minute call on the calendar. Downsizing, relocating from MA, first home in NH, or moving up locally.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Which Southern NH Move Is Yours?",
    description:
      "Eight questions. Your archetype. A real next step with Karyn.",
    type: "website",
    url: "/quiz",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Which Southern NH Move Is Yours? · Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Which Southern NH Move Is Yours?",
    description:
      "Eight questions. Your archetype. A real next step with Karyn.",
    images: ["/og/default-og.jpg"],
  },
};

export default function QuizPage() {
  return (
    <main
      className="relative min-h-[calc(100vh-96px)] -mt-[96px] pt-[96px] overflow-hidden"
      style={{ background: "var(--primary)" }}
    >
      {/* Layer 1 — soft editorial background photograph */}
      <Image
        src="/images/about/about-stone-wall.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ opacity: 0.14 }}
        aria-hidden="true"
      />

      {/* Layer 2 — radial amber glow at the top, fades out to forest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(181,83,44,0.28), transparent 65%)",
        }}
      />

      {/* Layer 3 — bottom-edge vignette for grounding */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(26,31,28,0.55), transparent)",
        }}
      />

      {/* Layer 4 — rising embers (warmth, subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <RisingEmbers density="low" />
      </div>

      {/* Layer 5 — crimson leaf storm, dominant foreground particle layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <FallingLeaves density="high" tone="crimson" />
      </div>

      {/* Content — centered, above atmosphere */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-10 pb-20 md:pt-16">
        {/* Minimal top bar — mark + back to home */}
        <header className="mb-10 flex w-full items-center justify-between">
          <Link
            href="/"
            className="font-display text-base font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--text-on-dark-primary)" }}
          >
            Karyn Emerson
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
            style={{ color: "var(--text-on-dark-muted)" }}
          >
            <span aria-hidden="true">←</span>
            Back to home
          </Link>
        </header>

        {/* Heading block */}
        <div className="mb-12 w-full text-center">
          <p
            className="mb-4 font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            Find your fit
          </p>
          <h1
            className="font-display text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-6xl"
            style={{ color: "var(--text-on-dark-primary)" }}
          >
            Which Southern NH move is yours?
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-on-dark-secondary)" }}
          >
            Eight quick questions. One honest answer. No email required — your
            result is on screen immediately.
          </p>
        </div>

        {/* Wizard — opens directly on Q1, no intro gate */}
        <QuizClient />
      </div>
    </main>
  );
}
