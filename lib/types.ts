export const PNG_SIZES = [256, 512, 1024, 2048] as const;
export type PngSize = (typeof PNG_SIZES)[number];

export type PngVariant = {
  size: PngSize;
  file: string;
};

export type LogoVariant = {
  id: string;
  name: string;
  description?: string;
  usage?: string;
  preview: string;
  previewDark?: string;
  png: PngVariant[];
  darkPng?: PngVariant[];
};

export type LogoCategory = {
  slug: string;
  title: string;
  subtitle: string;
  description: string[];
  components: string[];
  guidelines: string[];
  dimensions?: string[];
  variants: LogoVariant[];
};

export const BRAND = {
  name: "剑琅联盟",
  siteTitle: "剑琅联盟 · 品牌资源站",
  color: "#F32F41",
  colorRgb: "243, 47, 65",
  usageRules: [
    "Logo 不可拉伸变形，须等比缩放",
    "不可更改品牌色或添加渐变、阴影等效果",
    "不可在杂乱背景上使用，须保证足够留白",
    "图形标识与文字组合须按规范比例使用，不可随意拆分重组",
  ],
} as const;

export function assetPath(relative: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${relative}`;
}
