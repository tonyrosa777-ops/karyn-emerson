// =============================================================================
// scripts/generate-images.mjs — Stage 1G fal.ai batch image generation
// Run: node scripts/generate-images.mjs [--dry] [--only=<slug>]
// =============================================================================

import { fal } from "@fal-ai/client";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// --- Load .env.local manually (no dotenv dependency) ---
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

// --- Config ---
const MODEL = "fal-ai/flux/dev"; // flux/dev is broadly available; flux-pro/new requires entitlement
const FALLBACK_MODEL = "fal-ai/flux/schnell";
const NEG = "studio headshot, stock-photo aesthetic, neon, cyan, electric blue, futuristic, sci-fi, readable text, signs with legible words, logos, watermarks, deformed faces, extra limbs, duplicate elements, CGI rendering, HDR, tilt-shift, Instagram-oversaturated look, couple with keys cliche, sold sign handshake, MLS thumbnail";

// --- Image manifest (27 calls) ---
const MANIFEST = [
  // Portrait
  {
    id: "karyn-portrait",
    target: "images/karyn-portrait.jpg",
    size: { width: 1200, height: 1800 },
    prompt: "An editorial mid-distance environmental portrait of a warm, confident woman in her late 40s to early 50s with shoulder-length auburn-to-chestnut hair, standing at partial three-quarter profile on the wide wooden porch of a cream-colored clapboard colonial home in Southern New Hampshire in mid-October. She wears a soft cream cable-knit cardigan over an olive button-down and dark jeans, one hand resting on a worn painted porch railing, her gaze turned away from the camera toward a stone wall and sugar-maple canopy in peak autumn foliage behind her. Warm low-angle afternoon sun rakes across weathered clapboard, lighting her face softly from the side; foreground includes a woven basket of russet apples on the porch floor. Composition places her in the lower-left third with the maple canopy and colonial rooflines filling the upper two-thirds. Muted saturation, slight film grain, magazine-editorial feel reminiscent of a New England Home profile.",
  },

  // Neighborhood town heroes (7)
  {
    id: "salem-hero",
    target: "images/neighborhoods/salem-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Wide editorial view of a modern mixed-use Italianate-inspired town district at golden hour on an October evening. Italianate facades in warm stucco and cream clapboard line a wide landscaped promenade with mature maples in peak autumn color, their leaves scattered across a brick-paved walkway. Warm ambient lamplight begins to glow in restaurant windows while the sky above fades from amber to dusky rose. Foreground has an empty wrought-iron bench beside a low stone planter. Low perspective, asymmetric composition placing architecture in the right two-thirds. No visible text or signs.",
  },
  {
    id: "windham-hero",
    target: "images/neighborhoods/windham-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A still, mirror-calm view of a small New Hampshire pond at late-afternoon in peak October, sugar maples and white birches lining the far shore blazing rust-red, orange, and forest green, their colors reflected with slight ripple on deep-water surface. A single unpainted cedar dock extends from a mossy granite outcrop in the lower right third, no boat, no people. Warm amber light on treetops, cool forest shadow on water. Composition is wide horizontal, subject occupying lower-right, sky and treeline filling upper two-thirds.",
  },
  {
    id: "derry-hero",
    target: "images/neighborhoods/derry-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Editorial landscape of a small New England town common park on a quiet October morning. An ornate white-painted Victorian bandstand with a hipped copper-patina roof sits in the middle distance, framed by peak-autumn maples in burnt orange and gold. A low, dry-stacked fieldstone wall curves across the foreground, and brick-facade nineteenth-century storefronts with tall windows line the far side of the park. Soft morning mist lifts from the grass, warm sunlight grazes the bandstand's roofline. No people, no legible text. Negative space in the sky above the steeples.",
  },
  {
    id: "londonderry-hero",
    target: "images/neighborhoods/londonderry-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Warm late-afternoon October light falling across a white clapboard colonial farmhouse with black shutters and a weathered-red barn, sitting at the edge of a working apple orchard in New Hampshire. Rows of mature apple trees stretch into the middle distance, their leaves yellow-gold, a few russet apples still hanging on lower branches. Handwoven bushel baskets sit at the base of the nearest tree. A split-rail cedar fence leads the eye from the lower left into the orchard. Rolling foothills in soft haze beyond. Editorial, negative space in the upper sky.",
  },
  {
    id: "pelham-hero",
    target: "images/neighborhoods/pelham-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "An unpaved country road winding through deep Southern New Hampshire woods at peak October, lined on both sides by slender white birch trunks standing in contrast against the blazing red and orange of sugar maples. Dappled late-afternoon sunlight scatters across fallen leaves in the road. A granite stone wall runs along the right shoulder. Perspective is low and centered on the receding road vanishing into a curve. No vehicles, no people, no signs. Deeply saturated foliage, muted overall tone, cinematic depth.",
  },
  {
    id: "atkinson-hero",
    target: "images/neighborhoods/atkinson-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A classic nineteenth-century New England meetinghouse, white clapboard with green shutters and a tall slender white spire rising above a stand of mature sugar maples in full red-orange peak foliage. Shot from slightly below, at mid-morning, warm sun catching the weathervane. Foreground is a low granite curb and a stone wall with moss. Negative space in sky upper two-thirds, dominant foliage mid, architecture anchors lower third slightly right of center. Editorial, print-ready, no text on the building.",
  },
  {
    id: "hampstead-hero",
    target: "images/neighborhoods/hampstead-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A wooden roadside farm stand in rural New Hampshire in golden October light, weathered-grey barnboard walls with an open front, piled with hundreds of orange pumpkins in graduated sizes, rough wooden crates of russet apples, and glass jugs of unfiltered amber cider arranged on a plank-top table. Bales of hay frame the entrance. Tall sugar maples in peak autumn red rise behind the stand. Composition places the stand in the lower-right third, sky and foliage filling the upper half. Warm amber cast, soft grain, editorial.",
  },

  // Sub-neighborhood heroes (6)
  {
    id: "tuscan-village-hero",
    target: "images/neighborhoods/tuscan-village-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A narrow evening-hour perspective down a brick-paved pedestrian corridor inside a modern Italianate-inspired mixed-use village district. Italianate facades with cornice mouldings, arched windows, and warm stucco in cream and pale ochre rise on both sides. Wrought-iron gooseneck lamps glow amber at regular intervals, reflecting on the brick pavers wet from an early-evening rain. The sky above is indigo-dusk with one faint rose band on the horizon. A single small wrought-iron cafe table and two chairs in the immediate foreground left. No people, no readable menus or signs. Rich atmosphere, moody but warm.",
  },
  {
    id: "canobie-lake-hero",
    target: "images/neighborhoods/canobie-lake-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Early morning on a small New England lake. A thick, low mist hovers just above the glassy water surface, partially veiling the far shoreline where tall dark pine silhouettes emerge against a peach-and-pale-blue dawn sky. The water is almost perfectly still, mirroring the blurred silhouettes with a soft glow. Foreground is a mossy granite boulder at the water's edge, a few fallen red maple leaves drifting on the surface. No boats, no docks, no people. Quiet, contemplative, minimal. Muted tones with warm sunrise highlights only on distant treetops.",
  },
  {
    id: "cobbetts-pond-hero",
    target: "images/neighborhoods/cobbetts-pond-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Midday on a small New Hampshire pond at peak October. A small weathered wooden rowboat sits tied to the end of a narrow cedar dock that extends from the lower-right foreground into still dark-green water. The far shore is dominated by a single towering sugar maple in blazing rust-red, its reflection tracing a clean vertical column on the water. The rest of the shoreline has yellow birches and dark pines. Warm sunlight on the far foliage, cooler tones on the water. Composition leads the eye from the dock diagonally toward the maple. No people. Editorial calm.",
  },
  {
    id: "woodmont-commons-hero",
    target: "images/neighborhoods/woodmont-commons-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A wide editorial view of a colonial-revival mixed-use main street in New England at early evening. Brick-clad three-story buildings with white trim, black shutters, dormer windows, and copper-patina awnings line both sides of a brick-paved pedestrian walkway. Mature ornamental pear trees along the curb are in their late-October yellow. Warm cafe and shop window light spills onto the bricks, a single empty wooden bench sits in the middle distance. Sky is a fading lavender-blue. Composition wide, symmetrical with a slight leftward pull. No legible signage, no people.",
  },
  {
    id: "hood-park-downtown-derry-hero",
    target: "images/neighborhoods/hood-park-downtown-derry-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A ground-level morning view across a small New England downtown park. A weathered grey granite memorial bench sits in the lower-right foreground, its surface dappled with fallen sugar-maple leaves in scarlet and gold. A gravel path curves leftward past a cast-iron Victorian lamppost, leading into a grove of peak-autumn maples whose canopy forms a rich red ceiling. Soft haze in the deep background, a hint of a red-brick storefront facade glimpsed through the trunks. Warm amber sunlight on the path, deep cool shadow under the trees. No visible inscriptions or text on the bench. Editorial, quiet.",
  },
  {
    id: "shadow-lake-hero",
    target: "images/neighborhoods/shadow-lake-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Pre-dawn light on a quiet New England lake. A rough-hewn wooden dock extends low across perfectly still, steel-blue water toward a small cedar-shingled cabin half-hidden in dense white fog on the opposite shore. The surrounding trees are tall dark pines and a few birches, their upper branches catching the first cool pink glimmer of morning. A single canvas-backed Adirondack chair sits at the far end of the dock. The overall palette is cool, silvered blues, slate greys, with a faint warm band of dawn sky at the horizon. Quiet, still, minimal.",
  },

  // Blog heroes (9)
  {
    id: "blog-ma-to-nh",
    target: "images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "An editorial wide landscape from a low roadside vantage alongside a tree-lined northbound interstate highway in New England on a clear October morning. The highway curves gently to the right, ascending slightly, flanked on both sides by tall sugar maples and white birches in peak autumn foliage: scarlet, burnt orange, gold, and green mixed. A lone pickup truck is barely visible in the far distance moving north. Warm low sun casts long shadows across the empty passing lane. Sky is crisp blue with soft cirrus. No visible signs with readable text. Composition places highway curve through center-right, foliage fills both flanks and upper half. Editorial, cinematic, muted warmth.",
  },
  {
    id: "blog-property-tax",
    target: "images/blog/nh-property-tax-by-town-salem-windham-derry-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A slightly elevated drone perspective looking down at a small New England residential grid at peak October. Neat rows of modest colonial rooflines, some in cedar shingle, some in asphalt grey, a few in weathered red, are interspersed with mature sugar maples in blazing red-orange and yellow birches. A few driveways show a parked sedan or minivan. Stone walls and picket fences define property lines. Warm afternoon sun at a low angle casts long rooftop shadows. Flat-plane editorial composition, muted and warm colors, no readable signage. Aerial documentary feel, not real estate marketing.",
  },
  {
    id: "blog-commission",
    target: "images/blog/two-to-three-percent-commission-explained-post-august-2024-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A tight editorial still life, natural window light from the left on a warm walnut wooden desk. A cream-colored multi-page printed document sits at a slight angle, a tortoiseshell fountain pen resting across it. A small unglazed ceramic coffee cup in the upper right, a small stack of unmarked folded papers behind it. The paper has visible blocks of dense body copy but absolutely no readable letters or numbers, abstract text texture only. A pair of tortoiseshell reading glasses in the lower-right corner. Composition is overhead three-quarter. Warm cream tones, forest-green inkwell small accent. Print magazine feel.",
  },
  {
    id: "blog-downsizing",
    target: "images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A warm editorial interior vignette. A weathered oak fireplace mantel holds a simple wood-framed impressionistic monochrome photograph, alongside a small ceramic vase with a sprig of dried bittersweet, a brass candlestick, and a worn leather-bound book. Through the window above the mantel, bright peak-autumn sugar maples glow red and gold outside. Soft afternoon light enters from the right, warming the wood grain of the mantel and the wallpapered background in a muted cream-and-forest-leaf pattern. Composition is centered-low, with the window foliage and negative light filling the upper half. Intimate, quiet, nostalgic. No readable text.",
  },
  {
    id: "blog-first-time-buyer",
    target: "images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A rustic editorial landscape of a traditional New England field stone well in the middle distance: a cylindrical dry-stacked fieldstone wellhead about three feet tall with a conical cedar-shingle roof cap and a simple rope, set in a mown grass yard. A longer dry-stacked stone wall extends from the well rightward along a property line. A sugar maple in peak red foliage rises directly behind the well. Warm mid-afternoon October sunlight, faint mist in the background tree-line. Composition places the well in the lower-left third, the wall leading to the right, sky open above. No people, no readable signs, no house in frame.",
  },
  {
    id: "blog-salem-streets",
    target: "images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A quiet secondary street in an older New England town center on an October evening at blue hour. Rough cobblestone paving wet from a recent rain reflects warm amber light spilling from a small corner cafe window on the left. Overhead, two brick-facade buildings lean slightly with age, ivy climbs one side. Ornate black lamppost in the mid-ground glowing warmly. The street vanishes into an indigo-blue evening sky. A solitary overturned empty cafe chair and bistro table outside. No readable text on the cafe facade or menu boards. Atmospheric, moody, editorial, painterly.",
  },
  {
    id: "blog-commuter-tax",
    target: "images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "Early morning on a quiet outdoor commuter rail platform in a New England border town, mid-October, thick low autumn mist hanging over the tracks and the parking lot beyond. The platform is an empty concrete strip with one painted yellow safety line, a single overhead lantern-style light still glows. A silhouette of a lone commuter in a wool coat and carrying a leather shoulder bag stands near a green metal bench, back to the camera, gazing down the track. A few maple trees beyond the platform have scattered red leaves. Cool silvery-blue-grey palette with one warm pocket of lantern glow. No readable signs.",
  },
  {
    id: "blog-opendoor",
    target: "images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "An overcast late-October afternoon view of a modest, slightly care-worn 1970s ranch-style house set back on an overgrown front lawn in suburban New England. Paint on the clapboards is sun-faded, a gutter sags at one corner. A cluster of small weathered wooden yard signs tilts at irregular angles along the roadside ditch, their surfaces peeling, their wording indistinct and blurred beyond any readable text, shape and color only. A fine cold autumn drizzle softens the whole scene, the few remaining maple leaves are wet and stuck to the porch steps. Palette is desaturated grey-brown with one small pumpkin on the porch as a warm accent. No legible text anywhere.",
  },
  {
    id: "blog-three-towns",
    target: "images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-hero.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "An editorial morning landscape arranged as a layered composition, with three distinct colonial-style homes receding into soft autumn-haze depth, staggered across a gentle rolling field. The nearest left-foreground home is a traditional white clapboard colonial with black shutters and a stone wall, the middle-distance home is a warmer cream Federal with a central chimney, the furthest is a brick-end colonial just emerging from morning mist beyond a line of peak-autumn maples. Low amber sunrise light rakes from camera-right, casting long shadows. The composition suggests three distinct New England towns without any labels. Sky fills the upper two-thirds. Quiet, editorial.",
  },

  // OG
  {
    id: "default-og",
    target: "og/default-og.jpg",
    size: { width: 1200, height: 630 },
    prompt: "A wide cinematic banner landscape of Southern New England in peak October. The right half of the frame is a warm editorial scene: a classic dry-stacked fieldstone wall in the lower-right foreground, sugar maples in scarlet and burnt-orange foliage rising mid-frame, a silhouette of a small white colonial rooftop and spire against a soft amber-to-rose horizon. The left half is intentionally quieter and softer, a gentle cream-and-forest-green blurred background of more distant foliage and pale sky, leaving clear negative space for future text overlay. Do not include any text or letters in the image itself. Low horizon, golden hour, editorial and print-calm.",
  },

  // About (3)
  {
    id: "about-landscape-1",
    target: "images/about/about-landscape-1.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A wide mid-afternoon editorial view across a classic New England town common in mid-October. Centered in the mid-distance is a white Greek-Revival town hall with a clock tower, flanked by a white Congregational church spire to the left and a grove of peak-red sugar maples to the right. A curved gravel path cuts across a freshly cut lawn, edged by a granite curb and scattered fallen leaves. A simple empty park bench sits lower-left. Warm sunlight grazes the church spire and clock face, soft shadows pool under the maples. No legible text on signage. Architecture and foliage balanced across the mid-band, sky open above.",
  },
  {
    id: "about-clapboard-detail",
    target: "images/about/about-clapboard-detail.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A tight macro-style editorial detail of the corner of a nineteenth-century New England clapboard house. Weathered cream-white paint on horizontal pine clapboard siding shows fine age patina and brushwork, meeting a hand-planed window casing in the right third. A paneled louvered shutter in deep forest-green hangs just slightly ajar. Warm mid-afternoon raking light from the left creates strong shadow under each clapboard lip. A single stem of climbing ivy enters the lower-right corner with two red leaves. No people, no readable markings. The palette is strictly cream, weathered wood grain, forest-green, and iron-oxide rust spots. Printmaker composition.",
  },
  {
    id: "about-stone-wall",
    target: "images/about/about-stone-wall.jpg",
    size: { width: 1600, height: 1067 },
    prompt: "A low editorial landscape view of a meandering, crumbling New England fieldstone wall running from the lower-left corner diagonally into the middle distance, its moss-blanketed granite stones rough, irregular, and dry-stacked. Tall sugar maples in absolute peak scarlet and orange rise behind and above the wall, their leaves just beginning to drift down. A carpet of fallen leaves in russet and gold covers the ground at the wall's base. Warm backlight filters through the canopy. Composition uses wall as a leading diagonal, foliage fills the upper two-thirds, negative sky only visible at the top edge. No paths, no houses, no people, no markers.",
  },
];

// Map blog hero slugs -> card thumbnail output
const CARD_DERIVATIONS = [
  ["blog-ma-to-nh", "images/blog/moving-from-massachusetts-to-southern-nh-honest-guide-card.jpg"],
  ["blog-property-tax", "images/blog/nh-property-tax-by-town-salem-windham-derry-card.jpg"],
  ["blog-commission", "images/blog/two-to-three-percent-commission-explained-post-august-2024-card.jpg"],
  ["blog-downsizing", "images/blog/downsizing-in-southern-nh-selling-family-home-after-40-years-card.jpg"],
  ["blog-first-time-buyer", "images/blog/first-time-homebuyer-checklist-southern-nh-septic-well-pns-card.jpg"],
  ["blog-salem-streets", "images/blog/living-in-salem-nh-tuscan-village-canobie-lake-streets-you-dont-know-card.jpg"],
  ["blog-commuter-tax", "images/blog/commuter-tax-trap-why-moving-to-nh-doesnt-erase-ma-income-tax-card.jpg"],
  ["blog-opendoor", "images/blog/opendoor-vs-listing-with-agent-45000-math-on-500k-home-card.jpg"],
  ["blog-three-towns", "images/blog/windham-derry-or-londonderry-buyers-guide-picking-right-southern-nh-town-card.jpg"],
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
  const model = useFallback ? FALLBACK_MODEL : MODEL;
  const imageSize = { width: item.size.width, height: item.size.height };
  const input = {
    prompt: item.prompt,
    image_size: imageSize,
    num_images: 1,
    // flux/dev supports: image_size, num_inference_steps, guidance_scale, enable_safety_checker
    num_inference_steps: 28,
    guidance_scale: 3.5,
    enable_safety_checker: false,
  };
  console.log(`[gen] ${item.id} -> ${model}  (${imageSize.width}x${imageSize.height})`);
  const result = await fal.subscribe(model, { input, logs: false });
  const imageUrl = result?.data?.images?.[0]?.url;
  if (!imageUrl) throw new Error(`No image URL in response for ${item.id}: ${JSON.stringify(result).slice(0, 500)}`);
  const abs = path.join(PUBLIC_DIR, item.target);
  await downloadToFile(imageUrl, abs);
  const stat = await fs.stat(abs);
  if (stat.size < 10_000) throw new Error(`File too small (${stat.size}B) for ${item.id}`);
  return { path: abs, size: stat.size };
}

async function generateWithRetry(item) {
  try {
    return await generateOne(item);
  } catch (err1) {
    console.warn(`[retry1] ${item.id}: ${err1.message}`);
    try {
      // tiny prompt variation
      const variant = { ...item, prompt: item.prompt + " Warm muted palette, editorial, no text." };
      return await generateOne(variant);
    } catch (err2) {
      console.warn(`[retry2-fallback-model] ${item.id}: ${err2.message}`);
      try {
        return await generateOne(item, { useFallback: true });
      } catch (err3) {
        console.error(`[FAIL] ${item.id}: ${err3.message}`);
        return { failed: true, error: err3.message };
      }
    }
  }
}

async function deriveCards(successMap) {
  const cardResults = [];
  for (const [heroId, cardPath] of CARD_DERIVATIONS) {
    const hero = successMap[heroId];
    if (!hero) {
      cardResults.push({ id: heroId + "-card", skipped: true, reason: "hero missing" });
      continue;
    }
    const outAbs = path.join(PUBLIC_DIR, cardPath);
    await ensureDir(outAbs);
    try {
      await sharp(hero.path)
        .resize(600, 400, { fit: "cover", position: "attention" })
        .jpeg({ quality: 82 })
        .toFile(outAbs);
      const stat = await fs.stat(outAbs);
      cardResults.push({ id: heroId + "-card", path: outAbs, size: stat.size });
      console.log(`[card] ${cardPath} (${stat.size}B)`);
    } catch (err) {
      cardResults.push({ id: heroId + "-card", failed: true, error: err.message });
    }
  }
  return cardResults;
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.split("=")[1] : null;
  const dry = process.argv.includes("--dry");

  const items = only ? MANIFEST.filter((m) => m.id === only) : MANIFEST;
  console.log(`[start] ${items.length} items${dry ? " (dry run)" : ""}`);

  if (dry) {
    items.forEach((i) => console.log(`  - ${i.id} -> public/${i.target}`));
    return;
  }

  const startedAt = Date.now();
  const successMap = {};
  const failed = [];

  // Run sequentially to be gentle on rate limits (fal queue handles concurrency server-side anyway)
  for (const item of items) {
    const res = await generateWithRetry(item);
    if (res.failed) failed.push({ id: item.id, error: res.error });
    else successMap[item.id] = res;
  }

  console.log(`\n[heroes done] success=${Object.keys(successMap).length} failed=${failed.length}`);

  // Derive card thumbnails (if any blog heroes succeeded)
  console.log(`\n[cards] deriving card thumbnails via sharp...`);
  const cardResults = await deriveCards(successMap);
  const cardsOk = cardResults.filter((c) => c.path).length;

  // Total size report
  const heroBytes = Object.values(successMap).reduce((a, b) => a + (b.size || 0), 0);
  const cardBytes = cardResults.reduce((a, b) => a + (b.size || 0), 0);
  const totalMs = Date.now() - startedAt;

  // Write summary
  const summary = {
    ranAt: new Date().toISOString(),
    model: MODEL,
    fallbackModel: FALLBACK_MODEL,
    heroes: {
      requested: items.length,
      succeeded: Object.keys(successMap).length,
      failed: failed.length,
      totalBytes: heroBytes,
    },
    cards: {
      derived: cardsOk,
      failed: cardResults.filter((c) => c.failed).length,
      totalBytes: cardBytes,
    },
    failedItems: failed,
    durationSeconds: Math.round(totalMs / 1000),
  };

  await fs.writeFile(
    path.join(ROOT, "..", ".planning", "stage-1g-run-summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log("\n[summary]", JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error("[fatal]", e);
  process.exit(2);
});
