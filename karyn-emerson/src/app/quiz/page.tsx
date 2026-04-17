// =============================================================================
// /quiz — server wrapper for the market-timing quiz
// Per CLAUDE.md Always-Built Features Rule (Interactive Quiz) + design-system.md
// §11. Metadata lives here; interactive state machine in ./QuizClient.tsx.
// =============================================================================

import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Which Southern NH Move Is Yours? | Karyn Emerson Real Estate",
  description:
    "Six quick questions, one result, a 15 minute call on the calendar. Downsizing, relocating from MA, first home in NH, or moving up locally.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Which Southern NH Move Is Yours?",
    description:
      "Six questions. Your archetype. A real next step with Karyn.",
    type: "website",
    url: "/quiz",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "Which Southern NH Move Is Yours? — Karyn Emerson Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Which Southern NH Move Is Yours?",
    description:
      "Six questions. Your archetype. A real next step with Karyn.",
    images: ["/og/default-og.jpg"],
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
