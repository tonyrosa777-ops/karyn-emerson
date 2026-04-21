"use client";

// =============================================================================
// CartDrawer.tsx — slide-in shopping cart, Stripe checkout wiring
// Spec: CLAUDE.md Always-Built Features Rule (Shop). No em dashes in copy.
// Styling uses project design tokens — var(--primary), var(--accent),
// var(--bg-base), var(--text-on-dark-*) — no Tailwind gray shortcuts.
// =============================================================================

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70]"
            style={{ background: "rgba(18, 24, 20, 0.55)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] flex flex-col"
            style={{
              background: "var(--primary)",
              color: "var(--text-on-dark-primary)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--card-on-dark-border)" }}
            >
              <div>
                <h2
                  className="font-display font-semibold"
                  style={{
                    color: "var(--text-on-dark-primary)",
                    fontSize: "1.5rem",
                    lineHeight: 1.1,
                  }}
                >
                  Your Cart
                </h2>
                {count > 0 && (
                  <p
                    className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {count} item{count !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors"
                style={{ color: "var(--text-on-dark-secondary)" }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: "var(--card-on-dark-bg)",
                      border: "1px solid var(--card-on-dark-border)",
                    }}
                    aria-hidden="true"
                  >
                    <span style={{ fontSize: "1.5rem" }}>🛍️</span>
                  </div>
                  <p
                    className="text-sm max-w-xs"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    Your cart is empty. Browse the collection when you are ready.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-5 font-mono text-xs uppercase tracking-[0.22em] underline underline-offset-4"
                    style={{ color: "var(--accent)" }}
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg p-3"
                    style={{
                      background: "var(--card-on-dark-bg)",
                      border: "1px solid var(--card-on-dark-border)",
                    }}
                  >
                    {/* Image */}
                    <div
                      className="w-16 h-16 rounded-md overflow-hidden shrink-0 relative"
                      style={{ background: "var(--card-on-dark-bg)" }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            style={{ color: "var(--text-on-dark-muted)" }}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text-on-dark-primary)" }}
                      >
                        {item.name}
                      </p>
                      {item.category && (
                        <p
                          className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: "var(--text-on-dark-muted)" }}
                        >
                          {item.category}
                        </p>
                      )}
                      <p
                        className="mt-1 font-display font-semibold"
                        style={{ color: "var(--accent)", fontSize: "0.95rem" }}
                      >
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        style={{ color: "var(--text-on-dark-muted)" }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                      <div
                        className="flex items-center gap-2 rounded-full px-2 py-1"
                        style={{
                          background: "var(--card-on-dark-bg)",
                          border: "1px solid var(--card-on-dark-border)",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-4 h-4 flex items-center justify-center text-sm"
                          style={{ color: "var(--text-on-dark-secondary)" }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          className="text-xs w-4 text-center"
                          style={{ color: "var(--text-on-dark-primary)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-4 h-4 flex items-center justify-center text-sm"
                          style={{ color: "var(--text-on-dark-secondary)" }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t space-y-4"
                style={{ borderColor: "var(--card-on-dark-border)" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs uppercase tracking-[0.22em]"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-display font-semibold"
                    style={{
                      color: "var(--text-on-dark-primary)",
                      fontSize: "1.25rem",
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p
                  className="text-[11px] leading-relaxed text-center"
                  style={{ color: "var(--text-on-dark-muted)" }}
                >
                  Printful prints and ships direct from the fulfillment center closest to you. Most orders arrive in 5 to 8 business days.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-body font-semibold text-sm uppercase tracking-wide transition-all duration-200"
                  style={{
                    background: "var(--bg-base)",
                    color: "var(--primary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Checkout with Stripe
                </button>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs font-mono uppercase tracking-[0.22em]"
                  style={{ color: "var(--text-on-dark-muted)" }}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
