"use client";

// =============================================================================
// Navbar.tsx — fixed-top site navigation (LIGHT theme)
// Spec: design-system.md §5 (Navigation); CLAUDE.md Always-Built Features Rule
// Copy: all strings from siteConfig in /data/site.ts — zero hardcoded text.
// =============================================================================

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click + ESC
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [openDropdown]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{
          height: "96px",
          background: "var(--bg-elevated)",
          borderBottom: scrolled
            ? "1px solid rgba(47,74,58,0.08)"
            : "1px solid transparent",
          transition: "border-color 200ms ease",
        }}
      >
        <nav
          className="h-full max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between"
          aria-label="Primary"
        >
          {/* Logo wordmark — flush left */}
          <Link
            href="/"
            className="font-display font-semibold tracking-tight leading-none"
            style={{
              color: "var(--primary)",
              fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)",
            }}
          >
            {siteConfig.businessName.replace(" Real Estate", "")}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {siteConfig.nav.map((item) => {
              const isAccent = item.accent === true;
              const isQuiz = item.href === "/quiz";
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;

              if (hasChildren) {
                const isOpen = openDropdown === item.label;
                return (
                  <li
                    key={item.label}
                    ref={isOpen ? dropdownRef : undefined}
                    className="relative"
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : item.label)
                      }
                      className="nav-link font-body font-medium text-[15px] inline-flex items-center gap-1 transition-colors duration-200"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200"
                        style={{
                          display: "inline-block",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          fontSize: "0.7rem",
                          lineHeight: 1,
                        }}
                      >
                        ▾
                      </span>
                    </button>
                    {isOpen && (
                      <ul
                        role="menu"
                        className="absolute right-0 mt-3 min-w-[220px] rounded-lg border py-2 shadow-lg"
                        style={{
                          background: "var(--bg-elevated)",
                          borderColor: "rgba(47,74,58,0.10)",
                          boxShadow: "0 20px 40px -20px rgba(18,24,20,0.25)",
                        }}
                      >
                        {item.children!.map((child) => {
                          const childAccent = child.accent === true;
                          return (
                            <li key={child.href} role="none">
                              <Link
                                role="menuitem"
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-4 py-2.5 font-body text-[15px] transition-colors"
                                style={{
                                  color: childAccent
                                    ? "var(--accent)"
                                    : "var(--text-primary)",
                                  fontFamily: childAccent
                                    ? "var(--font-jetbrains), ui-monospace, monospace"
                                    : undefined,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(181,83,44,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                }}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href ?? item.label}>
                  <Link
                    href={item.href ?? "#"}
                    className={`nav-link font-body font-medium text-[15px] transition-colors duration-200 ${
                      isQuiz ? "nav-link-quiz" : ""
                    } ${isAccent ? "nav-link-accent" : ""}`}
                    style={{
                      color: isAccent ? "var(--accent)" : "var(--text-primary)",
                      fontFamily: isAccent
                        ? "var(--font-jetbrains), ui-monospace, monospace"
                        : undefined,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side CTA + cart + hamburger */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Cart button — always visible, shows count badge in ember accent */}
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

            <Link
              href="/booking#calendar"
              className="hidden lg:inline-flex items-center rounded-full px-6 py-2.5 font-body font-semibold text-sm tracking-wide uppercase transition-all duration-200"
              style={{
                background: "var(--primary)",
                color: "var(--bg-base)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px -10px rgba(47,74,58,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Book a consultation
            </Link>

            {/* Hamburger — visible below lg */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md"
              style={{ color: "var(--primary)" }}
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
                <line x1="4" y1="8" x2="22" y2="8" />
                <line x1="4" y1="14" x2="22" y2="14" />
                <line x1="4" y1="20" x2="22" y2="20" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hover underline styling — scoped */}
        <style>{`
          .nav-link {
            position: relative;
            padding-bottom: 2px;
          }
          .nav-link::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -2px;
            height: 1.5px;
            background: var(--accent);
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 200ms ease;
          }
          .nav-link:hover::after,
          .nav-link:focus-visible::after {
            transform: scaleX(1);
          }
          @media (prefers-reduced-motion: reduce) {
            .nav-link::after { transition: none; }
          }
        `}</style>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
