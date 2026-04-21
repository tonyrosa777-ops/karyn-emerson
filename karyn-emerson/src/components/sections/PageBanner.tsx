"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AuroraGradient } from "@/components/sections/motion/AuroraGradient";
import { CrossDissolve } from "@/components/sections/motion/CrossDissolve";
import { FallingLeaves } from "@/components/sections/motion/FallingLeaves";
import { LetterMaskReveal } from "@/components/sections/motion/LetterMaskReveal";
import { InkBloom } from "@/components/sections/motion/InkBloom";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type H1Motion = "letter-mask" | "ink-bloom" | "shimmer" | "none";

export type BannerMode =
  | "single"
  | "mosaic3"
  | "mosaic4"
  | "mosaic7"
  | "crossDissolve"
  | "aurora";

export type BannerHeight = "sm" | "md" | "lg";

export interface BannerImage {
  src: string;
  alt: string;
}

export interface BannerCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface PageBannerProps {
  mode: BannerMode;
  images?: BannerImage[];
  eyebrow?: string;
  title: ReactNode;
  titleMotion?: H1Motion;
  titleAccentWord?: string;
  subhead?: ReactNode;
  ambient?: "leaves" | "none";
  auroraTone?: "warm" | "editorial" | "sage";
  height?: BannerHeight;
  parallax?: boolean;
  ctas?: BannerCta[];
  className?: string;
  textSide?: "left" | "center";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEIGHT_MAP: Record<BannerHeight, string> = {
  sm: "clamp(220px, 32vw, 320px)",
  md: "clamp(320px, 42vw, 480px)",
  lg: "clamp(400px, 52vw, 620px)",
};

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Parallax wrapper — isolates useScroll so it only runs when needed
// ---------------------------------------------------------------------------

interface ParallaxWrapProps {
  children: ReactNode;
  scrollY: MotionValue<number>;
}

const ParallaxWrap = ({ children, scrollY }: ParallaxWrapProps) => {
  const y = useTransform(scrollY, [0, 1], ["0%", "-12%"]);
  return (
    <motion.div className="absolute inset-0 z-0" style={{ y }}>
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Image layers
// ---------------------------------------------------------------------------

interface SingleImageLayerProps {
  image: BannerImage;
}

const SingleImageLayer = ({ image }: SingleImageLayerProps) => (
  <div className="absolute inset-0">
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>
);

interface MosaicProps {
  images: BannerImage[];
}

const Mosaic3 = ({ images }: MosaicProps) => (
  <div className="absolute inset-0 grid grid-cols-1 gap-[2px] md:grid-cols-[3fr_2fr] md:grid-rows-[11fr_9fr]">
    <div className="relative md:row-span-2">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        priority
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover"
      />
    </div>
    {images[1] && (
      <div className="relative hidden md:block">
        <Image
          src={images[1].src}
          alt={images[1].alt}
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>
    )}
    {images[2] && (
      <div className="relative hidden md:block">
        <Image
          src={images[2].src}
          alt={images[2].alt}
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>
    )}
  </div>
);

const Mosaic4 = ({ images }: MosaicProps) => (
  <div className="absolute inset-0 grid grid-cols-1 gap-[2px] md:grid-cols-2 md:grid-rows-[3fr_2fr]">
    <div className="relative">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
    {images[1] && (
      <div className="relative hidden md:block">
        <Image
          src={images[1].src}
          alt={images[1].alt}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    )}
    {images[2] && (
      <div className="relative hidden md:block">
        <Image
          src={images[2].src}
          alt={images[2].alt}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    )}
    {images[3] && (
      <div className="relative hidden md:block">
        <Image
          src={images[3].src}
          alt={images[3].alt}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    )}
  </div>
);

const MOSAIC7_AREAS: ReadonlyArray<"a" | "b" | "c" | "d" | "e" | "f" | "g"> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
];

const Mosaic7 = ({ images }: MosaicProps) => {
  // Grid template:
  //   a a b c
  //   a a d d
  //   e f f g
  // Index 0 (a) is the hero tile; renders on mobile full-bleed.
  return (
    <div
      className="absolute inset-0 grid grid-cols-1 gap-[2px] md:grid-cols-4 md:grid-rows-3"
      style={{
        gridTemplateAreas: `"a a b c" "a a d d" "e f f g"`,
      }}
    >
      {MOSAIC7_AREAS.map((area, i) => {
        const img = images[i];
        if (!img) return null;
        const isHero = area === "a";
        const wrapperClass = isHero
          ? "relative"
          : "relative hidden md:block";
        const sizes = isHero
          ? "(min-width: 768px) 50vw, 100vw"
          : "25vw";
        return (
          <div
            key={area}
            className={wrapperClass}
            style={{ gridArea: area }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={isHero}
              sizes={sizes}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// CTA row
// ---------------------------------------------------------------------------

const ctaBaseClass =
  "inline-flex items-center justify-center rounded-full px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-200";

const ctaVariantStyle = (variant: "primary" | "secondary"): CSSProperties =>
  variant === "primary"
    ? {
        background: "var(--bg-base)",
        color: "var(--primary)",
        border: "2px solid var(--bg-base)",
      }
    : {
        background: "transparent",
        color: "var(--bg-base)",
        border: "2px solid var(--bg-base)",
      };

interface CtaRowProps {
  ctas: BannerCta[];
  reduceMotion: boolean;
  textSide?: "left" | "center";
}

const CtaRow = ({ ctas, reduceMotion, textSide = "left" }: CtaRowProps) => (
  <div
    className={`mt-8 flex flex-wrap gap-3 ${
      textSide === "center" ? "justify-center" : ""
    }`}
  >
    {ctas.map((cta, i) => {
      const content = (
        <Link
          key={cta.href}
          href={cta.href}
          className={ctaBaseClass}
          style={ctaVariantStyle(cta.variant)}
        >
          {cta.label}
        </Link>
      );
      if (reduceMotion) return content;
      return (
        <motion.div
          key={cta.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.36 + i * 0.06,
            duration: 0.5,
            ease: EASE_OUT_EXPO,
          }}
        >
          {content}
        </motion.div>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// H1 rendering
// ---------------------------------------------------------------------------

interface BannerHeadingProps {
  title: ReactNode;
  titleMotion: H1Motion;
  titleAccentWord?: string;
  mode: BannerMode;
  textSide: "left" | "center";
}

const BannerHeading = ({
  title,
  titleMotion,
  titleAccentWord,
  mode,
  textSide,
}: BannerHeadingProps) => {
  const isAurora = mode === "aurora";
  const baseColor = isAurora
    ? "var(--text-primary)"
    : "var(--text-on-dark-primary)";
  const shimmerClass = isAurora ? "hero-shimmer" : "hero-shimmer-sage";
  const alignClass = textSide === "center" ? "text-center" : "text-left";
  const commonClass = `font-display text-display font-semibold mt-4 ${alignClass}`;

  if (titleMotion === "letter-mask") {
    return (
      <LetterMaskReveal
        as="h1"
        className={commonClass}
        stagger={80}
        duration={420}
      >
        {/* Color is applied via style on a wrapping span so the color flows
            through the split spans without requiring a className-only path. */}
        <span style={{ color: baseColor }}>{title}</span>
      </LetterMaskReveal>
    );
  }

  if (titleMotion === "ink-bloom") {
    // InkBloom requires string children. If the caller passed a ReactNode that
    // is not a string, fall back to a plain h1 so we don't crash at runtime.
    if (typeof title === "string") {
      return (
        <div style={{ color: baseColor }}>
          <InkBloom
            as="h1"
            className={commonClass}
            stagger={18}
            duration={900}
            accentWord={titleAccentWord}
          >
            {title}
          </InkBloom>
        </div>
      );
    }
    return (
      <h1 className={commonClass} style={{ color: baseColor }}>
        {title}
      </h1>
    );
  }

  if (titleMotion === "shimmer") {
    return (
      <h1 className={`${commonClass} ${shimmerClass}`}>{title}</h1>
    );
  }

  // "none"
  return (
    <h1 className={commonClass} style={{ color: baseColor }}>
      {title}
    </h1>
  );
};

// ---------------------------------------------------------------------------
// PageBanner
// ---------------------------------------------------------------------------

export const PageBanner = ({
  mode,
  images,
  eyebrow,
  title,
  titleMotion = "letter-mask",
  titleAccentWord,
  subhead,
  ambient = "none",
  auroraTone = "warm",
  height = "md",
  parallax = true,
  ctas,
  className,
  textSide = "center",
}: PageBannerProps) => {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const shouldParallax = parallax && !reduceMotion && mode !== "aurora";

  // Photo-mode guard: every non-aurora mode needs images.
  const safeImages: BannerImage[] = images ?? [];
  const hasImages = safeImages.length > 0;

  const renderImageLayer = (): ReactNode => {
    if (mode === "aurora") {
      return <AuroraGradient tone={auroraTone} intensity="medium" />;
    }
    if (!hasImages) return null;

    if (mode === "single") {
      return <SingleImageLayer image={safeImages[0]} />;
    }
    if (mode === "crossDissolve") {
      return (
        <CrossDissolve images={safeImages} sizes="100vw" priority />
      );
    }
    if (mode === "mosaic3") {
      return <Mosaic3 images={safeImages} />;
    }
    if (mode === "mosaic4") {
      return <Mosaic4 images={safeImages} />;
    }
    if (mode === "mosaic7") {
      return <Mosaic7 images={safeImages} />;
    }
    return null;
  };

  const imageLayer = renderImageLayer();

  const sectionStyle: CSSProperties = {
    height: HEIGHT_MAP[height],
    background: mode === "aurora" ? "var(--bg-base)" : "transparent",
  };

  const textColumnAlign =
    textSide === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl";

  const eyebrowColor = "var(--accent)";
  const subheadColor =
    mode === "aurora"
      ? "var(--text-primary)"
      : "var(--text-on-dark-secondary)";

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={sectionStyle}
    >
      {/* Layer 0: image(s) or aurora. Wrapped in parallax on photo modes. */}
      {shouldParallax && imageLayer ? (
        <ParallaxWrap scrollY={scrollYProgress}>{imageLayer}</ParallaxWrap>
      ) : (
        <div className="absolute inset-0 z-0">{imageLayer}</div>
      )}

      {/* Layer 1: gradient overlay for photo legibility. Not used over aurora. */}
      {mode !== "aurora" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
      )}

      {/* Layer 1b: local text-backing for center mode — tighter dark band behind the text column. */}
      {mode !== "aurora" && textSide === "center" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(18,24,20,0.55) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Layer 2: ambient (optional FallingLeaves). */}
      {ambient === "leaves" && (
        <div aria-hidden="true" className="absolute inset-0 z-[2]">
          <FallingLeaves density="low" tone="autumn" />
        </div>
      )}

      {/* Layer 10: text column. */}
      <div
        className={`relative z-10 mx-auto flex h-full max-w-6xl px-6 lg:px-8 ${
          textSide === "center"
            ? "items-center pb-0 md:pb-0"
            : "items-end pb-12 md:pb-16"
        }`}
      >
        <div className={textColumnAlign}>
          {eyebrow && (
            <p
              className="font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: eyebrowColor }}
            >
              {eyebrow}
            </p>
          )}
          <BannerHeading
            title={title}
            titleMotion={titleMotion}
            titleAccentWord={titleAccentWord}
            mode={mode}
            textSide={textSide}
          />
          {subhead && (
            <p
              className="mt-5 font-body text-lg leading-relaxed"
              style={{ color: subheadColor }}
            >
              {subhead}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <CtaRow ctas={ctas} reduceMotion={reduceMotion} textSide={textSide} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
