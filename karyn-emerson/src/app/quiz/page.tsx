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
    "Six quick questions to figure out which Southern NH move fits you. Downsizing, relocating from MA, first home in NH, or moving up locally. Your result comes with a 15 minute call on the calendar below, no email gate.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Which Southern NH Move Is Yours?",
    description:
      "Six questions. Your archetype. A real next step with Karyn.",
    type: "website",
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
