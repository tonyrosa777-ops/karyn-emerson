"use client";
import { useEffect, useRef } from "react";

/* =============================================================================
   KarynCanvas — Layer 2 of the 3-layer hero (the BRAND CANVAS).
   Southern NH real estate · place-first · editorial warmth.

   BRAINSTORM (10 concepts tied to Karyn's niche — Southern NH, place-first,
   editorial NH aesthetic, Intimate 1.5/10 · Quiet 3/10 · Traditional 4.5/10):

     1. Stone-Wall Settling — motes drift in and stack along a dry-stone wall
        silhouette at the bottom of the canvas. (NH clapboard-and-stone icon.)
     2. Cul-de-Sac Map Reveal — hand-drawn loop lines stroke on, town labels
        appear as particles converge into them.
     3. Autumn Leaf Drift + Stone Wall Accumulation — leaves drift diagonally
        and pile along an implied stone wall. October NH energy.
     4. Clapboard Porch Sun-Slats — parallel slats of warm sunlight with slow
        dust motes floating between them.
     5. Birch Bark + Horizon Reveal — bark texture emerging particle-by-particle
        with a White-Mountains horizon line.
     6. Handwritten Address Cursive Write-On — "Salem, NH" writes on in cursive
        as motes converge along the bezier strokes.
     7. Compass Rose with Slow North-Spin — stone compass rose, rotating N needle.
     8. Neighborhood Constellation — house dots connected by thin lines, slowly
        completing a street-grid constellation.
     9. Mullioned Window Reveal — window grid fades in, warm morning light behind,
        motes in the panes.
    10. Leaf-to-Map Outline — autumn leaves drift and settle into the outline of
        Karyn's Southern NH service area (place-first literalized).

   SCORING — niche (N) / impact (I) / feasibility (F) / uniqueness (U), 1–5:

     #1   N4 I3 F5 U4 = 16
     #2   N5 I4 F3 U5 = 17
     #3   N5 I4 F4 U4 = 17
     #4   N4 I3 F4 U5 = 16
     #5   N3 I3 F3 U4 = 13
     #6   N4 I4 F2 U5 = 15
     #7   N3 I3 F5 U3 = 14
     #8   N4 I4 F4 U4 = 16
     #9   N4 I3 F3 U4 = 14
    #10   N5 I5 F3 U5 = 18   ← WINNER

   WINNER: #10 — Autumn leaves drift diagonally across the canvas and slowly
   converge into the outline silhouette of Karyn's Southern-NH service area
   (Salem · Windham · Derry · Londonderry · Pelham · Atkinson · Hampstead),
   traced in warm iron-oxide. The outline lingers. Ambient idle breathe after.

   WHY IT WINS: The place IS the hero. A literal map of her territory emerging
   from drifting NH-autumn leaves is the strongest possible "this is your
   neighbor in Southern NH" statement in the first 2 seconds — directly serves
   the §1 brand identity statement ("sells the place, not the face"). No prior
   Optimus build has done a leaf-to-geographic-outline morph. Feasible in a
   single canvas with rAF: a pre-sampled point array along a smooth bezier
   outline acts as the "target" positions; leaves (particles) ease toward their
   assigned target over a 6-second STREAM, then COOL to iron-oxide dots that
   trace the outline. Idle breathe oscillates the outline alpha.

   BUILD CONSTRAINTS:
   - Palette: iron-oxide --accent #B5532C + forest --primary #2F4A3A only.
     Background is cream --bg-base — particles are DARKER than bg.
   - SLOW motion: leaves 8–12s to traverse; outline lingers 3s before idle.
     NO overshoot, NO spring bounce, NO geometric snap. Traditional + Quiet.
   - Respects prefers-reduced-motion (static outline only, no motion).
   - Single <canvas> component with requestAnimationFrame + cleanup.
   ============================================================================= */

// --- Outline: a soft editorial silhouette of Karyn's Southern NH service area.
// Not a literal GIS boundary — an editorial simplification (per
// design-system.md §6 processing: "compositions favor negative space…
// editorial, not Instagram"). The shape reads as "Southern NH-ish" — a
// horizontal band with the Merrimack river notch on the west edge and the
// MA border as the flat bottom. This is an illustrative mark, not a GPS map.
//
// Points are normalised 0..1 space; the draw step scales to canvas size.
const OUTLINE_POINTS: Array<[number, number]> = [
  // Start at the MA-border southwest corner
  [0.12, 0.80],
  [0.18, 0.78],
  [0.24, 0.76], // Pelham area
  [0.30, 0.77], // Salem
  [0.37, 0.76],
  [0.44, 0.78], // Atkinson
  [0.52, 0.80], // Hampstead
  [0.60, 0.79],
  [0.68, 0.80], // (MA border continues east)
  [0.76, 0.78],
  [0.82, 0.74],
  // Up the east edge
  [0.84, 0.66],
  [0.83, 0.58],
  [0.80, 0.50],
  [0.78, 0.42],
  [0.75, 0.36], // Derry top-east
  // Across the top (north edge)
  [0.68, 0.30],
  [0.60, 0.26], // Derry
  [0.52, 0.24],
  [0.44, 0.25], // Londonderry
  [0.36, 0.28],
  [0.30, 0.30],
  [0.24, 0.33], // Windham
  [0.18, 0.38], // Merrimack notch
  // Down the west edge back to start
  [0.15, 0.46],
  [0.13, 0.54],
  [0.11, 0.62],
  [0.10, 0.70],
  [0.12, 0.80], // close
];

// How many particles target the outline — enough to trace it clearly,
// not so many it reads as noise.
const OUTLINE_TARGETS_DESKTOP = 140;
const OUTLINE_TARGETS_MOBILE = 80;

// Phase durations (frames at ~60fps)
const PHASE_STREAM_FRAMES = 480;    // 8s — leaves stream in toward targets
const PHASE_SETTLE_FRAMES = 90;     // 1.5s — targets firm up to iron-oxide
const PHASE_LINGER_FRAMES = 180;    // 3s — outline holds, ambient breathe kicks in
// after PHASE_LINGER → stays in IDLE (breathe) indefinitely

type Phase = "stream" | "settle" | "linger" | "idle";

interface Leaf {
  // Spawn position (random at edge)
  sx: number;
  sy: number;
  // Target position (along outline, normalised 0..1 -> scaled at draw)
  tx01: number;
  ty01: number;
  // Current position
  x: number;
  y: number;
  // Individual stream delay so they don't all arrive together
  delay: number;
  // Stream duration (frames)
  duration: number;
  // Rotation for leaf shape
  rot: number;
  rotSpeed: number;
  // Leaf size
  size: number;
  // Tint variation
  warmth: number; // 0..1 → blend between oxide (red-ish) and umber (brown-ish)
  // Jitter seed for breathe phase
  phase: number;
}

// Helper: resample the outline to N evenly-spaced points so leaves are
// distributed along the whole perimeter, not clustered at vertices.
function resampleOutline(points: Array<[number, number]>, n: number) {
  const segLen: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const d = Math.hypot(dx, dy);
    segLen.push(d);
    total += d;
  }
  const step = total / n;
  const out: Array<[number, number]> = [];
  let acc = 0;
  let segIdx = 0;
  for (let k = 0; k < n; k++) {
    const target = k * step;
    while (segIdx < segLen.length - 1 && acc + segLen[segIdx] < target) {
      acc += segLen[segIdx];
      segIdx++;
    }
    const localT = (target - acc) / (segLen[segIdx] || 1);
    const p0 = points[segIdx];
    const p1 = points[segIdx + 1] ?? points[segIdx];
    out.push([p0[0] + (p1[0] - p0[0]) * localT, p0[1] + (p1[1] - p0[1]) * localT]);
  }
  return out;
}

// Easing: easeOutQuint — per design-system.md §8 "slow settle, no back-bounce"
function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

export function KarynCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId = 0;
    let frame = 0;
    let paused = false;
    let phase: Phase = "stream";
    let phaseFrame = 0;

    let leaves: Leaf[] = [];
    let targetCount = OUTLINE_TARGETS_DESKTOP;
    let outline: Array<[number, number]> = resampleOutline(
      OUTLINE_POINTS,
      targetCount,
    );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const viewW = () => canvas.offsetWidth || 800;
    const viewH = () => canvas.offsetHeight || 600;

    const isMobile = () => window.innerWidth < 768;

    const initLeaves = () => {
      targetCount = isMobile() ? OUTLINE_TARGETS_MOBILE : OUTLINE_TARGETS_DESKTOP;
      outline = resampleOutline(OUTLINE_POINTS, targetCount);
      leaves = [];
      for (let i = 0; i < targetCount; i++) {
        const [tx01, ty01] = outline[i];
        // Spawn from a random edge — top/left biased so the motion reads
        // as "leaves drifting in on an autumn wind from the northwest."
        const edge = Math.random();
        let sx: number;
        let sy: number;
        if (edge < 0.5) {
          // Top edge
          sx = Math.random() * viewW();
          sy = -20 - Math.random() * 80;
        } else if (edge < 0.8) {
          // Left edge
          sx = -20 - Math.random() * 80;
          sy = Math.random() * viewH();
        } else {
          // Right edge (sparse — wind direction is mainly NW→SE)
          sx = viewW() + 20 + Math.random() * 80;
          sy = Math.random() * viewH() * 0.6;
        }
        leaves.push({
          sx,
          sy,
          tx01,
          ty01,
          x: sx,
          y: sy,
          delay: Math.floor(Math.random() * 180), // 0–3s stagger
          duration: 260 + Math.floor(Math.random() * 140), // 4.3–6.7s travel
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.03,
          size: 2.2 + Math.random() * 1.8,
          warmth: Math.random(),
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Draw a small leaf-like mark: two-lobe ellipse with a short stem.
    // At this scale (2–4px), it reads as a leaf-ish mote without being
    // cartoonish. Rotation gives per-leaf variety.
    const drawLeaf = (l: Leaf, alpha: number) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      const r =
        l.warmth < 0.55
          ? `rgba(181, 83, 44, ${alpha})` // iron-oxide
          : `rgba(120, 75, 50, ${alpha})`; // umber
      ctx.fillStyle = r;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw a solid iron-oxide dot at the outline target (settled form).
    const drawSettled = (l: Leaf, alpha: number, tx: number, ty: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgba(181, 83, 44, 1)";
      ctx.beginPath();
      ctx.arc(tx, ty, l.size * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Reduced motion: render the outline once as a static iron-oxide dotted
    // arc over the cream background. No animation, no particle motion.
    const renderStatic = () => {
      resize();
      ctx.clearRect(0, 0, viewW(), viewH());
      ctx.fillStyle = "rgba(181, 83, 44, 0.58)";
      for (const [nx, ny] of outline) {
        const tx = nx * viewW();
        const ty = ny * viewH();
        ctx.beginPath();
        ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (paused) {
        animId = requestAnimationFrame(tick);
        return;
      }
      frame++;
      phaseFrame++;

      ctx.clearRect(0, 0, viewW(), viewH());

      // Phase transitions — slow, settled.
      if (phase === "stream" && phaseFrame >= PHASE_STREAM_FRAMES) {
        phase = "settle";
        phaseFrame = 0;
      } else if (phase === "settle" && phaseFrame >= PHASE_SETTLE_FRAMES) {
        phase = "linger";
        phaseFrame = 0;
      } else if (phase === "linger" && phaseFrame >= PHASE_LINGER_FRAMES) {
        phase = "idle";
        phaseFrame = 0;
      }

      // Ambient breathe amplitude (grows in as we approach idle)
      const breatheAmp =
        phase === "idle" ? 1 : phase === "linger" ? phaseFrame / PHASE_LINGER_FRAMES : 0;
      const breathe = Math.sin(frame * 0.012) * 0.12 * breatheAmp; // ±12% alpha shift

      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        const tx = l.tx01 * viewW();
        const ty = l.ty01 * viewH();

        if (phase === "stream") {
          // Each leaf has its own delay + duration
          const local = phaseFrame - l.delay;
          if (local <= 0) {
            // Not yet spawned — draw nothing
            continue;
          }
          const t = Math.min(1, local / l.duration);
          const e = easeOutQuint(t);
          l.x = l.sx + (tx - l.sx) * e;
          l.y = l.sy + (ty - l.sy) * e;
          l.rot += l.rotSpeed;
          const alpha = 0.18 + 0.42 * e; // fade in as it approaches target
          drawLeaf(l, alpha);
          continue;
        }

        if (phase === "settle") {
          // Crossfade: leaf silhouette fades out, settled oxide dot fades in
          const t = phaseFrame / PHASE_SETTLE_FRAMES;
          l.x = tx;
          l.y = ty;
          drawLeaf(l, 0.55 * (1 - t));
          drawSettled(l, 0.55 + 0.35 * t, tx, ty);
          continue;
        }

        // linger + idle: solid outline with breathe modulation.
        // Per-leaf phase offset keeps it from pulsing as one uniform mass.
        const localBreathe = Math.sin(frame * 0.012 + l.phase) * 0.08 * breatheAmp;
        const baseAlpha = 0.78 + breathe + localBreathe;
        drawSettled(l, Math.max(0.45, Math.min(1, baseAlpha)), tx, ty);
      }

      // Subtle connecting line between adjacent settled points — only once
      // outline is present (settle/linger/idle). Very thin, very low alpha,
      // reads as a drawn pencil-stroke editorial map line.
      if (phase !== "stream") {
        let lineAlpha = 0.35;
        if (phase === "settle") lineAlpha = 0.35 * (phaseFrame / PHASE_SETTLE_FRAMES);
        lineAlpha += breathe * 0.5;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(0.55, lineAlpha));
        ctx.strokeStyle = "rgba(181, 83, 44, 1)";
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        for (let i = 0; i < outline.length; i++) {
          const [nx, ny] = outline[i];
          const px = nx * viewW();
          const py = ny * viewH();
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      // Don't reset phase — just recalc sizes. Outline normalised coords
      // automatically rescale. Only re-init leaves on density breakpoint change.
      const needed = isMobile() ? OUTLINE_TARGETS_MOBILE : OUTLINE_TARGETS_DESKTOP;
      if (needed !== targetCount) {
        initLeaves();
        phase = "stream";
        phaseFrame = 0;
      }
    });
    ro.observe(canvas);

    if (reduced) {
      // Static outline only. No rAF loop.
      resize();
      initLeaves();
      renderStatic();
      return () => {
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    resize();
    initLeaves();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default KarynCanvas;
