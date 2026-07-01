import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "图片资源");
const OUT_DIR = path.join(ROOT, "public", "assets", "guidelines");

const GUIDELINES = [
  { id: "horizontal-full", source: "剑琅联盟Logo标识及应用尺寸1.png" },
  { id: "vertical-full", source: "剑琅联盟Logo标识及应用尺寸2.png" },
  { id: "horizontal-common", source: "剑琅联盟Logo标识及应用尺寸3.png" },
  { id: "vertical-common", source: "剑琅联盟Logo标识及应用尺寸4.png" },
  { id: "shape-variants", source: "剑琅联盟Logo标识及应用尺寸5.png" },
  { id: "solid-color", source: "剑琅联盟Logo标识及应用尺寸6.png" },
];

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const item of GUIDELINES) {
    const src = path.join(SOURCE_DIR, item.source);
    const dest = path.join(OUT_DIR, `${item.id}.png`);

    if (!fs.existsSync(src)) {
      throw new Error(`源图不存在: ${src}`);
    }

    fs.copyFileSync(src, dest);
    console.log(`Guideline: ${item.source} → ${item.id}.png`);
  }

  console.log(`Output: ${OUT_DIR}`);
}

main();
