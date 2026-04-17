"use client";

// =============================================================================
// CommissionFaq.tsx — accordion FAQ for the /commission page.
// Uses native <details>/<summary> so we do not pull in a Radix dep. Styled
// to match the editorial light theme (cream card, forest green rule).
// =============================================================================

interface FaqItem {
  q: string;
  a: string;
}

interface CommissionFaqProps {
  items: FaqItem[];
}

export default function CommissionFaq({ items }: CommissionFaqProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group rounded-lg border p-5 transition"
          style={{
            background: "var(--bg-card)",
            borderColor: "rgba(47, 74, 58, 0.1)",
          }}
        >
          <summary
            className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-h4 font-semibold text-[var(--text-primary)]"
          >
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="font-mono text-xl leading-none text-[var(--accent)] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
