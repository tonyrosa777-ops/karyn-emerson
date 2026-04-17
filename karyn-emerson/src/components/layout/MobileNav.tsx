"use client";

// =============================================================================
// MobileNav.tsx — full-screen overlay nav for mobile breakpoints
// Spec: design-system.md §5 (Navigation — mobile); CLAUDE.md Hero Architecture +
// Visual QA Rule (overlay must be fully opaque — no see-through).
// =============================================================================

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { siteConfig } from "@/data/site";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll while open + ESC to close + focus trap
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button on open for keyboard users
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  const handleLinkClick = useCallback(() => onClose(), [onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[60] flex flex-col"
      style={{
        // Fully opaque forest-green — NO alpha reduction per brief
        background: "var(--primary)",
        color: "var(--text-on-dark-primary)",
      }}
    >
      {/* Top bar: brand + close */}
      <div className="flex items-center justify-between px-6 h-[96px] shrink-0">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="font-display font-semibold"
          style={{
            color: "var(--text-on-dark-primary)",
            fontSize: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          {siteConfig.businessName.replace(" Real Estate", "")}
        </Link>
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex items-center justify-center w-11 h-11 rounded-md"
          style={{ color: "var(--text-on-dark-primary)" }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="20" y2="20" />
            <line x1="20" y1="6" x2="6" y2="20" />
          </svg>
        </button>
      </div>

      {/* Links — centered, stacked */}
      <nav
        className="flex-1 flex flex-col items-center justify-center gap-5 px-6"
        aria-label="Mobile primary"
      >
        {siteConfig.nav.map((item) => {
          const isAccent = item.accent === true;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="font-display"
              style={{
                color: isAccent
                  ? "var(--accent)"
                  : "var(--text-on-dark-primary)",
                fontWeight: 400,
                fontSize: "1.75rem",
                lineHeight: 1.2,
                fontFamily: isAccent
                  ? "var(--font-jetbrains), ui-monospace, monospace"
                  : undefined,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Primary CTA pinned near bottom */}
      <div className="px-6 pb-10 pt-4 shrink-0 flex justify-center">
        <Link
          href="/booking"
          onClick={handleLinkClick}
          className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body font-semibold text-sm uppercase w-full max-w-sm"
          style={{
            background: "var(--bg-base)",
            color: "var(--primary)",
            letterSpacing: "0.04em",
          }}
        >
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}
