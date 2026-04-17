"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type FilterValue = "all" | "selling" | "buying" | "relocating" | "downsizing";

interface Chip {
  value: FilterValue;
  label: string;
  emoji: string;
}

const chips: Chip[] = [
  { value: "all", label: "All", emoji: "📚" },
  { value: "selling", label: "Selling", emoji: "🪴" },
  { value: "buying", label: "Buying", emoji: "🔑" },
  { value: "relocating", label: "Relocating", emoji: "🧭" },
  { value: "downsizing", label: "Downsizing", emoji: "🌿" },
];

export function TestimonialsFilterChips() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = (searchParams.get("filter") as FilterValue) || "all";

  // Build href with filter applied, reset page to 1 when filter changes
  const buildHref = (value: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("filter");
    else params.set("filter", value);
    params.delete("page"); // reset to page 1
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div
      role="radiogroup"
      aria-label="Filter testimonials by service"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {chips.map((c) => {
        const active = current === c.value;
        return (
          <Link
            key={c.value}
            href={buildHref(c.value)}
            role="radio"
            aria-checked={active}
            scroll={false}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:translate-y-[-1px]"
            style={{
              background: active ? "var(--primary)" : "var(--bg-elevated)",
              color: active ? "var(--bg-base)" : "var(--text-primary)",
              borderColor: active
                ? "var(--primary)"
                : "rgba(47, 74, 58, 0.18)",
            }}
          >
            <span aria-hidden="true">{c.emoji}</span>
            <span>{c.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
