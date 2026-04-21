"use client";

import { FallingLeaves } from "./FallingLeaves";

// Site-wide crimson leaf ambient. Mounted once in app/layout.tsx.
// position: fixed so it tracks the viewport across scroll;
// contain: strict scopes layout/paint so it doesn't reflow siblings.
export function BodyFallingLeaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
      style={{ contain: "strict" }}
    >
      <FallingLeaves tone="crimson" density="medium" />
    </div>
  );
}

export default BodyFallingLeaves;
