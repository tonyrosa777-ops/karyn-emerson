import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero placeholder — replaced in Stage 1D by animation-specialist + content-writer */}
      <section className="relative flex min-h-[80vh] items-start pt-24 md:pt-40">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            {siteConfig.location.city}, {siteConfig.location.state} &middot; Phase 0 Scaffold
          </p>
          <h1 className="hero-shimmer font-display text-display mt-4 font-semibold">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
            {siteConfig.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/booking"
              className="inline-flex items-center rounded-full bg-[var(--primary)] px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[var(--bg-base)] transition hover:bg-[var(--accent)]"
            >
              {siteConfig.hero.ctaPrimary}
            </a>
            <a
              href="/quiz"
              className="inline-flex items-center rounded-full border border-[var(--primary)] px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-[var(--bg-base)]"
            >
              {siteConfig.hero.ctaSecondary}
            </a>
          </div>
          <p className="mt-12 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Scaffold ready &mdash; content + animation agents run in Stage 1D
          </p>
        </div>
      </section>
    </main>
  );
}
