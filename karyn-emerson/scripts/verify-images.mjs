// Verify all generated images — dimensions, magic bytes, min size.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const EXPECTED = [
  { p: "images/karyn-portrait.jpg", w: 1200, h: 1800, tol: 60 },
  { p: "og/default-og.jpg", w: 1200, h: 630, tol: 40 },
];

// Add neighborhoods (3:2 -> 1600x1067)
const neighborhoods = [
  "salem", "windham", "derry", "londonderry", "pelham", "atkinson", "hampstead",
  "tuscan-village", "canobie-lake", "cobbetts-pond", "woodmont-commons",
  "hood-park-downtown-derry", "shadow-lake",
];
neighborhoods.forEach((n) =>
  EXPECTED.push({ p: `images/neighborhoods/${n}-hero.jpg`, w: 1600, h: 1067, tol: 30 })
);

// Blog heroes
const blogs = [
  "moving-from-massachusetts-to-southern-nh-honest-guide",
  "nh-property-tax-by-town-salem-windham-derry",
  "two-to-three-percent-commission-explained-post-august-2024",
  "downsizing-in-southern-nh-selling-family-home-after-40-years",
  "first-time-homebuyer-checklist-southern-nh-septic-well-pns",
  "living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know",
  "commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax",
  "opendoor-vs-listing-with-agent-45000-math-on-500k-home",
  "windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town",
];
blogs.forEach((s) => {
  EXPECTED.push({ p: `images/blog/${s}-hero.jpg`, w: 1600, h: 1067, tol: 30 });
  EXPECTED.push({ p: `images/blog/${s}-card.jpg`, w: 600, h: 400, tol: 5 });
});

// About
EXPECTED.push({ p: "images/about/about-landscape-1.jpg", w: 1600, h: 1067, tol: 30 });
EXPECTED.push({ p: "images/about/about-clapboard-detail.jpg", w: 1600, h: 1067, tol: 30 });
EXPECTED.push({ p: "images/about/about-stone-wall.jpg", w: 1600, h: 1067, tol: 30 });

const results = { ok: [], warn: [], fail: [] };

for (const item of EXPECTED) {
  const abs = path.join(PUBLIC_DIR, item.p);
  try {
    const buf = await fs.readFile(abs);
    // JPEG magic bytes: FF D8 FF
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    if (!isJpeg) {
      results.fail.push({ p: item.p, why: "not a JPEG" });
      continue;
    }
    const meta = await sharp(buf).metadata();
    const dw = Math.abs(meta.width - item.w);
    const dh = Math.abs(meta.height - item.h);
    if (dw > item.tol || dh > item.tol) {
      results.warn.push({ p: item.p, got: `${meta.width}x${meta.height}`, want: `${item.w}x${item.h}` });
    } else {
      results.ok.push({ p: item.p, size: `${meta.width}x${meta.height}`, bytes: buf.length });
    }
    // Cheap all-black / all-white detector: look at stats
    const stats = await sharp(buf).stats();
    const channels = stats.channels.slice(0, 3);
    const allStd = channels.reduce((a, b) => a + (b.stdev || 0), 0) / 3;
    if (allStd < 3) {
      results.fail.push({ p: item.p, why: `suspiciously uniform image (stdev=${allStd.toFixed(2)})` });
    }
  } catch (e) {
    results.fail.push({ p: item.p, why: e.message });
  }
}

console.log(`\nOK: ${results.ok.length} / ${EXPECTED.length}`);
if (results.warn.length) {
  console.log(`\nWARN (dimension off):`);
  results.warn.forEach((w) => console.log(`  ${w.p}: got ${w.got}, want ${w.want}`));
}
if (results.fail.length) {
  console.log(`\nFAIL:`);
  results.fail.forEach((f) => console.log(`  ${f.p}: ${f.why}`));
  process.exit(1);
}
