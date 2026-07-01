import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "视频资源");
const OUT_DIR = path.join(ROOT, "public", "assets", "videos");

const VIDEOS = [
  { id: "pk-animation", source: "PK动画.mp4" },
  { id: "splash-animation", source: "开屏动画.mp4" },
];

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const video of VIDEOS) {
    const src = path.join(SOURCE_DIR, video.source);
    const dest = path.join(OUT_DIR, `${video.id}.mp4`);

    if (!fs.existsSync(src)) {
      throw new Error(`源视频不存在: ${src}`);
    }

    fs.copyFileSync(src, dest);
    const sizeMb = (fs.statSync(dest).size / (1024 * 1024)).toFixed(1);
    console.log(`Video: ${video.source} → ${video.id}.mp4 (${sizeMb} MB)`);
  }

  console.log(`Output: ${OUT_DIR}`);
}

main();
