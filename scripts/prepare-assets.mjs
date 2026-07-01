import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "logo资源");
const ASSETS_DIR = path.join(ROOT, "public", "assets", "logos");
const PNG_SIZES = [256, 512, 1024, 2048];
const force = process.argv.includes("--force");

/** 浅色底源文件 */
const SOURCE_MAP = [
  { id: "horizontal-full", file: "Group 1597884601.png" },
  { id: "horizontal-common", file: "Frame 1321314291.png" },
  { id: "vertical-full", file: "Frame 1321314290.png" },
  { id: "vertical-common", file: "Group 1597884606.png" },
  { id: "shape-square", file: "Group 1597884606-1.png" },
  { id: "shape-rounded", file: "Group 1597884606-2.png" },
  { id: "shape-circle", file: "Group 1597884606-3.png" },
  { id: "solid-square", file: "Group 1597884617.png" },
  { id: "solid-rounded", file: "Group 48096727.png" },
  { id: "solid-circle", file: "Group 48096721.png" },
];

/** 深色底源文件（仅含文字组合 Logo） */
const DARK_SOURCE_MAP = [
  { id: "horizontal-full", file: "深1.png" },
  { id: "vertical-full", file: "深2.png" },
  { id: "horizontal-common", file: "深3.png" },
  { id: "vertical-common", file: "深4.png" },
];

async function generateVariants(id, sourcePath, theme = "light") {
  const dir =
    theme === "dark"
      ? path.join(ASSETS_DIR, id, "dark")
      : path.join(ASSETS_DIR, id);
  fs.mkdirSync(dir, { recursive: true });

  for (const file of fs.readdirSync(dir)) {
    if (theme === "light" && file === "dark") continue;
    const full = path.join(dir, file);
    if (fs.statSync(full).isFile()) fs.unlinkSync(full);
  }

  const sourceBuffer = fs.readFileSync(sourcePath);
  const meta = await sharp(sourceBuffer).metadata();
  const hasAlpha = meta.hasAlpha && !meta.isOpaque;

  const originalPath = path.join(dir, "original.png");
  fs.copyFileSync(sourcePath, originalPath);

  for (const size of PNG_SIZES) {
    const out = path.join(dir, `${size}px.png`);
    await sharp(sourceBuffer)
      .resize(size, size, {
        fit: "inside",
        kernel: sharp.kernel.lanczos3,
        ...(hasAlpha ? { background: { r: 0, g: 0, b: 0, alpha: 0 } } : {}),
      })
      .png({ compressionLevel: 9 })
      .toFile(out);
  }
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`源目录不存在: ${SOURCE_DIR}`);
  }

  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const marker = path.join(ASSETS_DIR, "horizontal-full", "256px.png");
  if (!force && fs.existsSync(marker)) {
    console.log("Assets already present, skipping. Use --force to regenerate.");
    return;
  }

  for (const entry of SOURCE_MAP) {
    const sourcePath = path.join(SOURCE_DIR, entry.file);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`缺少源文件: ${entry.file}`);
    }
    console.log(`Processing ${entry.id} ← ${entry.file}`);
    await generateVariants(entry.id, sourcePath, "light");
  }

  for (const entry of DARK_SOURCE_MAP) {
    const sourcePath = path.join(SOURCE_DIR, entry.file);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`缺少深色源文件: ${entry.file}`);
    }
    console.log(`Processing ${entry.id}/dark ← ${entry.file}`);
    await generateVariants(entry.id, sourcePath, "dark");
  }

  console.log(`Done. Light + dark PNG sizes: ${PNG_SIZES.join(", ")}px`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
