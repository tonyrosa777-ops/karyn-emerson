// =============================================================================
// scripts/generate-shop-images.mjs — fal.ai batch generation for 16 shop
// product mockups. Every product shows the unified "I ♥ NH" graphic.
//
// Run: node scripts/generate-shop-images.mjs [--dry] [--only=<slug>]
//
// Text-rendering note: CLAUDE.md normally forbids text in prompts because
// most models garble it. The unified shop design is only 3 characters + a
// heart symbol, which modern text-capable models handle reliably when asked
// explicitly. We use flux-pro/v1.1 as primary (strongest text of the flux
// family) and fall back to flux/dev if the account isn't entitled.
// =============================================================================

import { fal } from "@fal-ai/client";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// Load .env.local manually (mirrors generate-images.mjs pattern)
const envPath = path.join(ROOT, ".env.local");
try {
  const envRaw = await fs.readFile(envPath, "utf8");
  envRaw.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  });
} catch (e) {
  console.warn("[env] .env.local not found:", e.message);
}

if (!process.env.FAL_KEY) {
  console.error("[fatal] FAL_KEY not set. Aborting.");
  process.exit(1);
}

fal.config({ credentials: process.env.FAL_KEY });

const PRIMARY = "fal-ai/flux-pro/v1.1";
const FALLBACK = "fal-ai/flux/dev";

const SHARED_SUFFIX =
  ' The text "I ♥ NH" must render clearly and legibly. The heart is a filled bold red heart symbol. No other text, no tags, no brand marks, no logos, no watermarks, no signatures anywhere in the image. Product-catalog e-commerce quality, editorial soft studio light.';

// All 16 prompts sourced from .planning/shop-image-prompts.md
// Slug = final filename (public/images/shop/<slug>.jpg)
const MANIFEST = [
  // --- Apparel (5) ---
  {
    slug: "i-heart-nh-hoodie-stone",
    prompt:
      'Editorial flat-lay product photo of a single stone-gray unisex pullover hoodie centered on a clean white seamless background, arms folded neatly inward, hood lying flat at top. The large chest design reads "I ♥ NH" in a bold white sans-serif lockup with a filled bold red heart between "I" and "NH". Even studio-soft lighting, faint natural shadow under garment edges. Slight authentic fabric texture visible. Square framing, product filling about 80% of the frame.',
  },
  {
    slug: "i-heart-nh-hoodie-black",
    prompt:
      'Editorial flat-lay product photo of a single black unisex pullover hoodie centered on a warm light-beige linen surface, arms folded neatly inward, drawstrings lying symmetrical. The large chest design reads "I ♥ NH" in a bold cream-white sans-serif lockup with a filled bold red heart between "I" and "NH". Soft window light from the upper left, subtle natural shadow. Square framing, product filling about 80% of the frame.',
  },
  {
    slug: "i-heart-nh-tee-heather",
    prompt:
      'Editorial flat-lay product photo of a single heather-gray unisex crew-neck t-shirt centered on a clean white seamless background, sleeves folded inward into a clean rectangle shape. The chest design reads "I ♥ NH" in a bold black sans-serif lockup with a filled bold red heart between "I" and "NH". Even diffuse studio light. Fine fabric heather texture visible. Square framing.',
  },
  {
    slug: "i-heart-nh-long-sleeve-white",
    prompt:
      'Editorial flat-lay of a single off-white long-sleeve unisex tee centered on a light oak wood plank surface, sleeves folded symmetrically along the torso. The chest design reads "I ♥ NH" in a bold forest-green sans-serif lockup with a filled bold red heart between "I" and "NH". Warm afternoon light falling at a shallow angle, soft natural shadows. Square framing.',
  },
  {
    slug: "i-heart-nh-crewneck-forest",
    prompt:
      'Editorial flat-lay of a single forest-green unisex crewneck sweatshirt centered on a cream linen surface, sleeves folded inward and overlapping at the front placket, ribbed cuffs visible. The chest design reads "I ♥ NH" in a bold cream-white sans-serif lockup with a filled bold red heart between "I" and "NH". Soft overcast daylight, even tone, subtle authentic fabric texture. Square framing.',
  },

  // --- Drinkware (4) ---
  {
    slug: "i-heart-nh-mug-white",
    prompt:
      'Editorial product photo of a single 11oz classic white ceramic coffee mug, handle pointing to the right, positioned on a warm oak wood tabletop with a blurred soft-cream linen background. The mug\'s visible front side shows "I ♥ NH" printed in a bold black sans-serif lockup with a filled bold red heart between "I" and "NH". Soft morning window light from the upper left, gentle highlight along the upper rim of the mug, subtle shadow to the right. Square framing, mug filling about 60% of the frame.',
  },
  {
    slug: "i-heart-nh-mug-black",
    prompt:
      'Editorial product photo of a single matte black 11oz classic ceramic coffee mug, handle pointing to the right, positioned on a cream linen cloth with a soft-focus background of a natural stone countertop. The mug\'s visible front side shows "I ♥ NH" printed in a bold cream-white sans-serif lockup with a filled bold red heart between "I" and "NH". Warm side-light from the upper left, subtle highlight along the glazed ceramic surface. Square framing.',
  },
  {
    slug: "i-heart-nh-tumbler-steel",
    prompt:
      'Editorial product photo of a single 20oz brushed-stainless-steel double-walled tumbler with a clear push-sip lid, standing upright on a pale-gray concrete surface with a blurred soft-cream backdrop. The front of the tumbler shows "I ♥ NH" printed in a bold charcoal sans-serif lockup with a filled bold red heart between "I" and "NH". Cool daylight from above, clean specular reflections on the brushed steel surface. Square framing.',
  },
  {
    slug: "i-heart-nh-enamel-mug",
    prompt:
      'Editorial product photo of a single white enamel camping mug with a navy blue rim, standing upright on a weathered picnic-table surface of pale oak wood, soft-focus sunlit forest background suggested only as warm amber bokeh. The mug\'s front shows "I ♥ NH" printed in a bold navy-blue sans-serif lockup with a filled bold red heart between "I" and "NH". Warm golden-hour side light, crisp edges. Square framing.',
  },

  // --- Bags (3) ---
  {
    slug: "i-heart-nh-tote-natural",
    prompt:
      'Editorial product photo of a single natural-ecru canvas tote bag hanging from a single hook against a pale-cream plaster wall, the bag\'s flat front fully visible, cotton straps draping naturally. The front shows "I ♥ NH" printed in a bold charcoal sans-serif lockup with a filled bold red heart between "I" and "NH". Soft overhead daylight, subtle natural canvas texture, clean faint shadow behind the bag. Square framing.',
  },
  {
    slug: "i-heart-nh-tote-beige",
    prompt:
      'Editorial product photo of a single sand-beige canvas tote bag laid flat on a pale oak wood surface, straps arranged symmetrically at the top, the front face fully visible. The front shows "I ♥ NH" printed in a bold forest-green sans-serif lockup with a filled bold red heart between "I" and "NH". Warm morning light from the left, soft natural shadow. Square framing.',
  },
  {
    slug: "i-heart-nh-drawstring-bag",
    prompt:
      'Editorial product photo of a single black polyester cinch-top drawstring sport bag standing upright on a pale-gray concrete surface against a blurred neutral background, drawstrings hanging evenly on both sides. The front shows "I ♥ NH" printed in a bold cream-white sans-serif lockup with a filled bold red heart between "I" and "NH". Cool daylight from above, subtle fabric sheen. Square framing.',
  },

  // --- Home & Stationery (4) ---
  {
    slug: "i-heart-nh-doormat",
    prompt:
      'Editorial product photo of a single natural coir-fiber rectangular doormat laid flat on a clean pale-oak entryway floor, rendered in overhead flat-lay perspective from directly above. The mat design shows "I ♥ NH" burned or stamped into the coir in a bold dark-brown sans-serif lockup with a filled bold red heart between "I" and "NH". Soft afternoon window light, authentic fiber texture visible, subtle natural shadow along one edge. Square framing, mat filling about 85% of the frame.',
  },
  {
    slug: "i-heart-nh-notebook",
    prompt:
      'Editorial product photo of a single A5 kraft-cardboard-cover notebook lying flat on a cream linen surface, a vintage fountain pen resting diagonally beside it. The notebook cover shows "I ♥ NH" letterpress-impressed in a bold dark-charcoal sans-serif lockup with a filled bold red heart between "I" and "NH". Soft side-light, subtle texture of the recycled kraft cover, faint debossed shadow in the lettering. Square framing.',
  },
  {
    slug: "i-heart-nh-pennant",
    prompt:
      'Editorial product photo of a single cream-wool triangular felt pennant flag pinned to a pale-oak wood wall, pointed tip facing right, the body of the pennant fully in frame. The pennant shows "I ♥ NH" appliquéd in a bold forest-green sans-serif lockup with a filled bold red heart between "I" and "NH". Warm side light, subtle wool felt texture, soft natural shadow along the wall. Square framing.',
  },
  {
    slug: "i-heart-nh-framed-print",
    prompt:
      'Editorial product photo of a single wide-matted framed typography art print in a simple natural-oak wood frame hung on a pale-cream plaster wall. The print shows "I ♥ NH" letterpress-printed large and centered in a bold classic serif lockup with a filled bold red heart between "I" and "NH" on warm cream textured paper, generous white-paper margins inside a deep white mat. Soft daylight from the left, subtle natural shadow from the frame. Square framing.',
  },
];

// --- Helpers ---
async function ensureDir(p) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function downloadToFile(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const arrayBuf = await res.arrayBuffer();
  await ensureDir(filepath);
  await fs.writeFile(filepath, Buffer.from(arrayBuf));
  return filepath;
}

async function generateOne(item, { useFallback = false } = {}) {
  const model = useFallback ? FALLBACK : PRIMARY;
  const prompt = item.prompt + SHARED_SUFFIX;
  const input = {
    prompt,
    image_size: { width: 1024, height: 1024 },
    num_images: 1,
    enable_safety_checker: false,
    output_format: "jpeg",
  };
  if (model === FALLBACK) {
    input.num_inference_steps = 28;
    input.guidance_scale = 3.5;
  }
  console.log(`[gen] ${item.slug} -> ${model} (1024x1024)`);
  const result = await fal.subscribe(model, { input, logs: false });
  const imageUrl = result?.data?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error(
      `No image URL for ${item.slug}: ${JSON.stringify(result).slice(0, 400)}`
    );
  }
  const abs = path.join(PUBLIC_DIR, "images", "shop", `${item.slug}.jpg`);
  await downloadToFile(imageUrl, abs);
  const stat = await fs.stat(abs);
  if (stat.size < 10_000) {
    throw new Error(`File too small (${stat.size}B) for ${item.slug}`);
  }
  return { slug: item.slug, path: abs, size: stat.size, model };
}

async function generateWithRetry(item) {
  try {
    return await generateOne(item);
  } catch (err1) {
    console.warn(`[retry-fallback-model] ${item.slug}: ${err1.message}`);
    try {
      return await generateOne(item, { useFallback: true });
    } catch (err2) {
      console.error(`[FAIL] ${item.slug}: ${err2.message}`);
      return { slug: item.slug, failed: true, error: err2.message };
    }
  }
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.split("=")[1] : null;
  const dry = process.argv.includes("--dry");

  const items = only ? MANIFEST.filter((m) => m.slug === only) : MANIFEST;
  console.log(`[start] ${items.length} items${dry ? " (dry run)" : ""}`);
  if (dry) {
    items.forEach((i) =>
      console.log(`  - ${i.slug}\n    ${i.prompt.slice(0, 120)}...`)
    );
    return;
  }

  const results = [];
  for (const item of items) {
    const r = await generateWithRetry(item);
    results.push(r);
  }

  const ok = results.filter((r) => !r.failed);
  const failed = results.filter((r) => r.failed);
  console.log(`\n[done] ${ok.length} ok, ${failed.length} failed`);
  ok.forEach((r) => console.log(`  ok  ${r.slug} (${r.size}B via ${r.model})`));
  failed.forEach((r) => console.log(`  FAIL ${r.slug} — ${r.error}`));

  // Write run summary
  const summaryPath = path.join(
    ROOT,
    "..",
    ".planning",
    "shop-image-run-summary.json"
  );
  await ensureDir(summaryPath);
  await fs.writeFile(
    summaryPath,
    JSON.stringify(
      { timestamp: new Date().toISOString(), results },
      null,
      2
    )
  );
  console.log(`[summary] ${summaryPath}`);

  if (failed.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
