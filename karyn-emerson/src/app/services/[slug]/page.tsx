import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import { serviceDetails } from "@/data/serviceDetails";
import { FadeUp } from "@/components/animations/FadeUp";
import { AmbientParticles } from "@/components/sections/AmbientParticles";
import { BreathingOrb } from "@/components/sections/BreathingOrb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) {
    return { title: "Service not found" };
  }
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      type: "website",
      url: `https://karynemerson.com/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!detail || !service) {
    notFound();
  }

  // Filter testimonials: selling page shows selling + downsizing,
  // buying shows buying, relocating shows relocating. Take 3-4.
  const matchingServiceTypes: string[] =
    slug === "selling"
      ? ["selling", "downsizing"]
      : slug === "buying"
      ? ["buying"]
      : ["relocating"];
  const serviceTestimonials = siteConfig.testimonials
    .filter((t) => matchingServiceTypes.includes(t.serviceType))
    .slice(0, 4);

  return (
    <>
      {/* SECTION 1 — HERO HEADER (LIGHT, shimmer) */}
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
              <Link href="/services" className="hover:underline">
                SERVICES
              </Link>{" "}
              / {service!.title.toUpperCase()}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-display mt-5 font-semibold">
              <span className="mr-3" aria-hidden="true">
                {service!.emoji}
              </span>
              {service!.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              {detail!.longIntro}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      {/* SECTION 2 — WHAT YOU GET (DARK) */}
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
              WHAT YOU GET
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Concrete deliverables, in writing.
            </h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {detail!.whatYouGet.map((item, i) => (
              <FadeUp key={item.title} delay={0.1 + i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div className="text-3xl" aria-hidden="true">
                    {item.emoji}
                  </div>
                  <h3
                    className="mt-4 font-display text-h4 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHO IT'S FOR (LIGHT) */}
      <section
        className="relative"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              WHO THIS IS FOR
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              If any of these sound like you, we should talk.
            </h2>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detail!.whoItsFor.map((item, i) => (
              <FadeUp key={item.title} delay={0.1 + i * 0.08}>
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
                  <h3 className="mt-4 font-display text-h4 font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS (DARK) */}
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
              HOW IT WORKS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 max-w-2xl font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              Step by step, no surprises.
            </h2>
          </FadeUp>
          <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detail!.processSteps.map((step, i) => (
              <FadeUp key={step.title} delay={0.1 + i * 0.08}>
                <li
                  className="flex h-full flex-col rounded-lg border p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs uppercase tracking-[0.22em]"
                      style={{ color: "var(--accent)" }}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl" aria-hidden="true">
                      {step.emoji}
                    </span>
                  </div>
                  <h3
                    className="mt-3 font-display text-h4 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {step.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 5 — TESTIMONIALS SLICE (LIGHT) */}
      {serviceTestimonials.length > 0 && (
        <section className="relative" style={{ background: "var(--bg-base)" }}>
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24 lg:px-8">
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                IN THEIR OWN WORDS
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
                Real clients, real outcomes.
              </h2>
            </FadeUp>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {serviceTestimonials.map((t, i) => (
                <FadeUp key={`${t.name}-${i}`} delay={0.1 + i * 0.08}>
                  <figure
                    className="flex h-full flex-col rounded-lg border p-8"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "rgba(47, 74, 58, 0.1)",
                    }}
                  >
                    <div
                      className="font-mono text-xs uppercase tracking-[0.22em]"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    >
                      {"★".repeat(t.rating)}
                    </div>
                    <blockquote className="mt-4 flex-1 font-display text-h4 italic leading-relaxed text-[var(--text-primary)]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
                      {t.name}
                      <span className="block font-body text-xs font-normal text-[var(--text-muted)]">
                        {t.location}
                      </span>
                    </figcaption>
                  </figure>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.3}>
              <div className="mt-10 text-center">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[var(--primary)] hover:gap-3"
                >
                  See all 36 testimonials
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* SECTION 6 — FAQ TEASER (DARK) */}
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
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-on-dark-muted)]">
              QUICK QUESTIONS
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-h2 mt-3 font-semibold"
              style={{ color: "var(--text-on-dark-primary)" }}
            >
              The ones I get asked every week.
            </h2>
          </FadeUp>
          <div className="mt-10 space-y-4">
            {detail!.faqTeaser.map((f, i) => (
              <FadeUp key={f.q} delay={0.1 + i * 0.08}>
                <details
                  className="group rounded-lg border p-6"
                  style={{
                    background: "var(--card-on-dark-bg)",
                    borderColor: "var(--card-on-dark-border)",
                  }}
                >
                  <summary
                    className="cursor-pointer list-none font-display text-h4 font-semibold"
                    style={{ color: "var(--text-on-dark-primary)" }}
                  >
                    {f.q}
                  </summary>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-on-dark-secondary)" }}
                  >
                    {f.a}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold hover:gap-3"
                style={{ color: "var(--accent)" }}
              >
                See the full FAQ
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA (LIGHT, breathing orb) */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        <BreathingOrb tone="warm" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-24 lg:px-8">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              NEXT STEP
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 mt-3 font-semibold text-[var(--text-primary)]">
              Pick a 15-minute slot, no pressure.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              If I can answer your {slug} question in 15 minutes, I will. If we
              need another call, we book it.
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
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Send a Message
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
