// =============================================================================
// SatinAmbient — CSS-only luxury cream-satin background with drifting brass
// ribbon flourishes. Replaces flat cream/elevated sections per Pattern #51
// ("never flat solid, ever") + Pattern #69 (cream-on-cream calibrated recipe).
//
// Usage: drop as the FIRST CHILD of a section that has `position: relative`
// and `overflow: hidden`. The component is absolute-inset-0 + pointer-events
// none + aria-hidden, so content above it is unaffected.
//
//   <section className="relative overflow-hidden ...">
//     <SatinAmbient intensity="default" ribbonAngle="left-lift" />
//     {/* content */}
//   </section>
//
// All motion is GPU-cheap (transform + opacity, CSS-only). prefers-reduced
// motion freezes animations to the at-rest state (gradient stays, never flat).
// =============================================================================

type Intensity = "soft" | "default" | "rich";
type RibbonAngle = "left-lift" | "right-lift";

export interface SatinAmbientProps {
  /** Brass-mix accent strength (soft=10/6, default=14/8, rich=18/10). */
  intensity?: Intensity;
  /** Flip ribbon orientation so adjacent satin sections don't read duplicated. */
  ribbonAngle?: RibbonAngle;
  /** Freeze animations while keeping gradient (text-heavy sections per Pattern #51). */
  static?: boolean;
}

export function SatinAmbient({
  intensity = "default",
  ribbonAngle = "left-lift",
  static: isStatic = false,
}: SatinAmbientProps) {
  return (
    <div
      className="satin-ambient pointer-events-none absolute inset-0"
      data-ribbon-angle={ribbonAngle}
      data-static={isStatic ? "true" : undefined}
      aria-hidden="true"
    >
      <div className={`satin-ambient-base intensity-${intensity}`} />
      <div className="satin-ribbon-a" />
      <div className="satin-ribbon-b" />
    </div>
  );
}

export default SatinAmbient;
