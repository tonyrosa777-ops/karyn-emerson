import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { SlideIn } from "@/components/animations/SlideIn";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, realEstateAgentSchema } from "@/lib/schema";

// [DEMO COPY — pending client review] for story paragraphs + beliefs
// Voice: Karyn, first-person, warm, no em dashes.

export const metadata: Metadata = {
  title: "About Karyn Emerson | Lifelong Southern NH Real Estate Agent",
  description:
    "Karyn Emerson, lifelong Southern NH real estate agent at Jill & Co. Realty Group, Salem. Boutique brokerage, place-first approach, 2025 her best year.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Karyn Emerson | Lifelong Southern NH Real Estate Agent",
    description:
      "A real conversation about timing, with zero pressure. Learn how Karyn works.",
    type: "profile",
    url: "/about",
    siteName: "Karyn Emerson Real Estate",
    images: [
      {
        url: "/og/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Karyn Emerson · Lifelong Southern NH Real Estate Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Karyn Emerson | Lifelong Southern NH Real Estate Agent",
    description:
      "A real conversation about timing, with zero pressure.",
    images: ["/og/default-og.jpg"],
  },
};

// Voice-of-Karyn story paragraphs — [DEMO COPY — pending client review]
const storyParagraphs = [
  "I grew up in Southern New Hampshire. I went to school here, raised my family here, and I have watched these towns change over three decades. Before real estate I spent years in the classroom, and a lot of what made me a good teacher, the listening, the patience, the habit of explaining things until they actually make sense, is what makes this work feel natural.",
  "I sell homes because every house has a story, and because the people selling or buying them are almost always in the middle of something bigger. A downsizing. A first grandchild. A job change. A commute they finally cannot do anymore. My job is to meet you where you are, get the numbers right, and not push.",
  "I work at Jill & Co. Realty Group in Salem, a genuine boutique brokerage. No franchise template. No call center handing you off. For years I held an exclusive Zillow Premier Agent partnership in this region. 2025 has been my best year yet, and I am building this site so the next person who needs me can find me without going through a platform.",
];

// Beliefs — 5 bullets with emoji, each a concrete promise.
// [DEMO COPY — pending client review]
const beliefs = [
  {
    emoji: "📍",
    title: "Your street matters as much as your house.",
    body: "I will not send you a generic CMA. I will walk the block, note the comps, and tell you what actually drives price on your cul-de-sac.",
  },
  {
    emoji: "💬",
    title: "I answer my phone.",
    body: "Evenings, weekends, the stretch between inspection and closing. Responsiveness is the whole job.",
  },
  {
    emoji: "🧾",
    title: "Transparency beats claims.",
    body: "Commission ranges, pricing strategy, offer math, and the post-NAR August 2024 rules. All of it, in plain English, before you sign a thing.",
  },
  {
    emoji: "🧭",
    title: "The timing is yours, not mine.",
    body: "If now is not the right month, we say so. Sometimes the best advice is to wait six months and prep the house. I tell you either way.",
  },
  {
    emoji: "🤝",
    title: "Boutique, by choice.",
    body: "No warehouse of agents. No handoff. You get me on the call, at the listing appointment, at closing, and the week after when the dishwasher breaks.",
  },
];

export default function AboutPage() {
  const schema = realEstateAgentSchema({ path: "/about" });
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About Karyn", href: "/about" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, schema]} />

      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer H1) */}
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
              ABOUT · SALEM, NH
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              The neighbor who happens to be the expert.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              A lifelong Southern NH agent at a genuine boutique brokerage.
              Place first, not face first. Honest numbers, on your timing.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — STORY (DARK, forest green) */}
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
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
          {/* Portrait — editorial, outdoor Southern NH. Not a studio headshot.
              Per CLAUDE.md: ONE portrait of Karyn on /about only. */}
          <SlideIn direction="left">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-[var(--card-on-dark-border)] bg-[var(--card-on-dark-bg)]">
              <Image
                src="/images/karyn-portrait.jpg"
                alt="Editorial portrait of Karyn Emerson outdoors in Southern New Hampshire, warm autumn light, stone wall and maples behind her, looking slightly off-camera"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </SlideIn>

          <div className="flex flex-col justify-center">
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
                HER STORY
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-display text-h2 mt-4 font-semibold"
                style={{ color: "var(--text-on-dark-primary)" }}
              >
                Teaching, then listening, then selling homes.
              </h2>
            </FadeUp>
            <div className="mt-6 space-y-5">
              {storyParagraphs.map((p, i) => (
                <FadeUp key={i} delay={0.15 + i * 0.08}>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {p}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TRUST STRIP (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              CREDENTIALS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              Local roots, current on the rules.
            </h2>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                emoji: "🏡",
                label: "Jill & Co. Realty Group",
                body: "Boutique brokerage, Salem, NH. No franchise template, no call center.",
              },
              {
                emoji: "📜",
                label: "Licensed in New Hampshire",
                body: "Active NH real estate license. Current on the post-NAR August 2024 buyer representation rules.",
              },
              {
                emoji: "⭐",
                label: "Zillow Premier Agent, historical",
                body: "Held an exclusive Zillow Premier Agent partnership in the Southern NH region for years.",
              },
              {
                emoji: "🌿",
                label: "Lifelong Southern NH",
                body: "Grew up here. Raised a family here. Watched these towns change for thirty-plus years.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "rgba(47, 74, 58, 0.1)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {item.emoji}
                  </div>
                  <p className="mt-3 font-display text-h4 font-semibold text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — BELIEFS (DARK, forest green) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(246,241,231,0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-28 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              WHAT YOU GET
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              What you get when you work with me.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <FadeUp key={b.title} delay={0.1 + i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {b.emoji}
                  </div>
                  <h3
                    className="mt-4 font-display text-h4 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {b.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — STATS (LIGHT) */}
      <section className="relative" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              BY THE NUMBERS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              Thirty years of Southern NH, one career.
            </h2>
          </FadeUp>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {siteConfig.stats.map((s, i) => (
              <FadeUp key={s.label} delay={0.1 + i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(47, 74, 58, 0.08)",
                  }}
                >
                  <div className="text-2xl" aria-hidden="true">
                    {s.emoji}
                  </div>
                  <p className="mt-3 font-display text-h2 font-semibold text-[var(--primary)]">
                    {s.prefix ?? ""}
                    {typeof s.decimals === "number"
                      ? s.value.toFixed(s.decimals)
                      : s.value}
                    {s.suffix ?? ""}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                    {s.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — BOOKING CTA (DARK, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--primary)" }}
      >
        <BreathingOrb tone="forest" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              START THE CONVERSATION
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              A 15-minute call, zero pressure.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)" }}
            >
              Pick a time that works for you. If I can answer your question in
              15 minutes, I will. If we need another call, we will book it.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  background: "var(--bg-base)",
                  color: "var(--primary)",
                  borderColor: "var(--bg-base)",
                }}
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--bg-base)",
                  color: "var(--bg-base)",
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
