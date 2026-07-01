import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "图片资源", "jimeng-2026-07-01-8435.png");
const OUT_DIR = path.join(ROOT, "public", "assets", "banner");
const OUT_FILE = path.join(OUT_DIR, "hero-main.png");

/** 与 --page-bg-mid / --hero-fade-end 一致 */
const TARGET = { r: 250, g: 251, b: 252 };
const FADE_RATIO = 0.4;
const OUTPUT_WIDTH = 2400;

function buildFadeOverlay(width, fadeHeight) {
  const buffer = Buffer.alloc(width * fadeHeight * 4);
  const solidTail = Math.round(fadeHeight * 0.12);
  for (let y = 0; y < fadeHeight; y++) {
    const t = (y + 1) / fadeHeight;
    let a;
    if (y >= fadeHeight - solidTail) {
      a = 1;
    } else {
      const alpha = t * t * (3 - 2 * t);
      a = Math.pow(alpha, 1.1);
    }
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      buffer[i] = TARGET.r;
      buffer[i + 1] = TARGET.g;
      buffer[i + 2] = TARGET.b;
      buffer[i + 3] = Math.round(Math.min(255, a * 255));
    }
  }
  return buffer;
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`源图不存在: ${SOURCE}`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const resizedBuffer = await sharp(SOURCE)
    .resize(OUTPUT_WIDTH, null, { withoutEnlargement: false, fit: "inside" })
    .toBuffer();

  const { width, height } = await sharp(resizedBuffer).metadata();
  const fadeHeight = Math.round(height * FADE_RATIO);

  const overlayPng = await sharp(buildFadeOverlay(width, fadeHeight), {
    raw: { width, height: fadeHeight, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp(resizedBuffer)
    .composite([{ input: overlayPng, top: height - fadeHeight, left: 0, blend: "over" }])
    .png({ compressionLevel: 9 })
    .toFile(OUT_FILE);

  const bottom = await sharp(OUT_FILE)
    .extract({ left: Math.floor(width / 2), top: height - 1, width: 1, height: 1 })
    .raw()
    .toBuffer();

  console.log(`Banner: ${width}x${height}, fade ${fadeHeight}px (${FADE_RATIO * 100}%)`);
  console.log(`Output: ${OUT_FILE}`);
  console.log(`Bottom pixel: rgb(${bottom[0]}, ${bottom[1]}, ${bottom[2]}) → target #fafbfc`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
