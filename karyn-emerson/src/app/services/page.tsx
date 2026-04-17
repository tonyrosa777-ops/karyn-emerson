import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";

export const metadata: Metadata = {
  title: "How I Work With You | Karyn Emerson Real Estate",
  description:
    "Selling, buying, or relocating in Southern New Hampshire. Three services, one person, zero handoff. Jill & Co. Realty Group, Salem NH.",
  openGraph: {
    title: "How I Work With You | Karyn Emerson Real Estate",
    description:
      "Selling, buying, or relocating in Southern NH. Three services, one person.",
    type: "website",
    url: "https://karynemerson.com/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer + ambient particles) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="absolute inset-0 z-0">
          <AmbientParticles density="low" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              SERVICES · SOUTHERN NEW HAMPSHIRE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              How I work with you.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Three services, one person, zero handoff. Whether you are
              downsizing after thirty years on the same street, buying your
              first house in NH, or packing the truck up from Methuen, the
              conversation starts the same way. On your timing, with the real
              numbers, and with no pressure.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — SERVICE CARDS (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(181,83,44,0.10), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              THREE WAYS WE WORK TOGETHER
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Pick the door that fits where you are today.
            </h2>
          </FadeUp>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((s, i) => (
              <FadeUp key={s.slug} delay={0.1 + i * 0.1}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-lg border p-8 transition hover:translate-y-[-2px]"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div className="text-4xl" aria-hidden="true">
                    {s.emoji}
                  </div>
                  <h3
                    className="mt-5 font-display text-h3 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {s.shortDescription}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold transition group-hover:gap-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — FINAL CTA (LIGHT, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              NOT SURE WHICH ONE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              A 15-minute call tells you more than a website.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              Pick a time below. If your situation does not fit neatly into one
              of these three services, we will talk through what does.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition hover:translate-y-[-1px]"
                style={{
                  background: "var(--primary)",
                  color: "var(--bg-base)",
                }}
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Take the Quiz
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
