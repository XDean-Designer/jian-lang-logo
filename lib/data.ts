import type { LogoCategory } from "./types";
import { PNG_SIZES, assetPath } from "./types";

const DARK_VARIANT_IDS = new Set([
  "horizontal-full",
  "vertical-full",
  "horizontal-common",
  "vertical-common",
]);

function pngVariants(id: string, theme: "light" | "dark" = "light") {
  const base =
    theme === "dark" ? `/assets/logos/${id}/dark` : `/assets/logos/${id}`;
  return PNG_SIZES.map((size) => ({
    size,
    file: assetPath(`${base}/${size}px.png`),
  }));
}

function variant(id: string, name: string, opts?: Partial<LogoCategory["variants"][0]>) {
  const hasDark = DARK_VARIANT_IDS.has(id);
  return {
    id,
    name,
    preview: assetPath(`/assets/logos/${id}/512px.png`),
    previewDark: hasDark
      ? assetPath(`/assets/logos/${id}/dark/512px.png`)
      : undefined,
    png: pngVariants(id, "light"),
    darkPng: hasDark ? pngVariants(id, "dark") : undefined,
    ...opts,
  };
}

export const categories: LogoCategory[] = [
  {
    slug: "horizontal-full",
    title: "横版中英组合",
    subtitle: "含英文标识",
    description: [
      "图形 + 中文 + 英文的标准横版组合",
      "适用于官网页眉、对外宣传物料、合作方展示等场景",
    ],
    components: ["图形", "中文", "英文"],
    guidelines: [
      "方形圆角标识高度为基准单位 a，标识总宽 14a",
      "图形与文字间距 1a，图形尺寸 5a × 5a",
      "中文在上、英文在下，英文两侧装饰线间距 0.5a",
    ],
    dimensions: ["图形：5a × 5a", "组合总宽：14a", "英文区高度：1a"],
    variants: [variant("horizontal-full", "横版中英组合 Logo")],
  },
  {
    slug: "vertical-full",
    title: "竖版中英组合",
    subtitle: "含英文标识",
    description: [
      "图形在上、中英文在下的竖版组合",
      "适用于竖版海报、移动端开屏、窄版物料等场景",
    ],
    components: ["图形", "中文", "英文"],
    guidelines: [
      "图形标识居中置于上方",
      "中文与英文垂直排列于图形下方",
      "保持图形与文字之间的规范间距",
    ],
    variants: [variant("vertical-full", "竖版中英组合 Logo")],
  },
  {
    slug: "horizontal-common",
    title: "常用横版组合",
    subtitle: "常用标识",
    description: [
      "图形 + 中文的横版组合，不含英文",
      "适用于日常对内物料、APP 内展示等场景",
    ],
    components: ["图形", "中文"],
    guidelines: [
      "方形圆角标识与中文横向排列",
      "遵循品牌标识标准比例",
    ],
    dimensions: ["图形：5a × 5a", "组合遵循品牌标识标准"],
    variants: [variant("horizontal-common", "常用横版 Logo")],
  },
  {
    slug: "vertical-common",
    title: "常用竖版组合",
    subtitle: "常用标识",
    description: [
      "图形在上、中文在下的竖版组合",
      "适用于头像旁标识、竖版卡片等场景",
    ],
    components: ["图形", "中文"],
    guidelines: [
      "图形标识居中置于上方",
      "中文排列于图形下方",
    ],
    variants: [variant("vertical-common", "常用竖版 Logo")],
  },
  {
    slug: "shape-variants",
    title: "方形 / 圆角 / 圆形",
    subtitle: "形态变体",
    description: [
      "仅图形标识的三种形态变体",
      "根据使用场景选择合适的形态",
    ],
    components: ["图形"],
    guidelines: [
      "方形标识：特定情况下使用，例如分享图",
      "方形圆角标识：常规使用",
      "圆形标识：特定情况下使用，例如头像",
    ],
    variants: [
      variant("shape-square", "方形标识", {
        description: "特定情况下使用，例如分享图",
        usage: "分享图",
      }),
      variant("shape-rounded", "方形圆角标识", {
        description: "常规使用",
        usage: "常规用",
      }),
      variant("shape-circle", "圆形标识", {
        description: "特定情况下使用，例如头像",
        usage: "头像",
      }),
    ],
  },
  {
    slug: "solid-color",
    title: "纯色组合",
    subtitle: "纯色标识",
    description: [
      "仅图形标识的纯色版本",
      "适用于单色印刷、特殊背景等场景",
    ],
    components: ["图形"],
    guidelines: [
      "纯色标识仅包含图形部分",
      "使用时须保持品牌色或规范指定的反白色",
    ],
    variants: [
      variant("solid-square", "纯色方形标识", { usage: "分享图" }),
      variant("solid-rounded", "纯色方形圆角标识", { usage: "常规用" }),
      variant("solid-circle", "纯色圆形标识", { usage: "头像" }),
    ],
  },
];

export function getCategory(slug: string): LogoCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export { DARK_VARIANT_IDS };
