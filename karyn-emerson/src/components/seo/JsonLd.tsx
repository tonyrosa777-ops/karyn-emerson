// =============================================================================
// JsonLd.tsx — Schema.org JSON-LD injection helper
// OWNED BY: seo-aeo-specialist agent (Stage 1F)
// Spec: CLAUDE.md SEO Rule. Every page that carries schema renders one (or more)
// of these in its server component tree. Accepts a single object or an array
// and stringifies into a <script type="application/ld+json"> tag.
// =============================================================================

import React from "react";

type SchemaObject = Record<string, unknown>;

interface JsonLdProps {
  data: SchemaObject | SchemaObject[];
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default JsonLd;
