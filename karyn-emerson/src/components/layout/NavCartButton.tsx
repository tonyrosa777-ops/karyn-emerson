"use client";

import { useCart } from "@/lib/cart";

export default function NavCartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      aria-label={`Open cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
      onClick={openCart}
      className="relative inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors"
      style={{ color: "var(--primary)" }}
    >
      <span style={{ fontSize: "1.25rem" }} aria-hidden="true">
        🛍️
      </span>
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-mono font-semibold"
          style={{
            background: "var(--accent)",
            color: "var(--bg-base)",
            fontSize: "10px",
            padding: "0 5px",
            lineHeight: 1,
            border: "2px solid var(--bg-elevated)",
          }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
