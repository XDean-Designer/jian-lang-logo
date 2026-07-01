import { assetPath } from "./types";

export type LogoGuideline = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  downloadName: string;
};

export const logoGuidelines: LogoGuideline[] = [
  {
    id: "horizontal-full",
    title: "横版中英组合",
    subtitle: "含英文标识",
    description: "图形 + 中文 + 英文横版组合及标准尺寸标注",
    image: assetPath("/assets/guidelines/horizontal-full.png"),
    downloadName: "剑琅联盟-横版中英组合规范.png",
  },
  {
    id: "vertical-full",
    title: "竖版中英组合",
    subtitle: "含英文标识",
    description: "图形在上、中英文在下的竖版组合规范",
    image: assetPath("/assets/guidelines/vertical-full.png"),
    downloadName: "剑琅联盟-竖版中英组合规范.png",
  },
  {
    id: "horizontal-common",
    title: "常用横版组合",
    subtitle: "常用标识",
    description: "图形 + 中文横版组合及比例标注",
    image: assetPath("/assets/guidelines/horizontal-common.png"),
    downloadName: "剑琅联盟-常用横版组合规范.png",
  },
  {
    id: "vertical-common",
    title: "常用竖版组合",
    subtitle: "常用标识",
    description: "图形 + 中文竖版组合及比例标注",
    image: assetPath("/assets/guidelines/vertical-common.png"),
    downloadName: "剑琅联盟-常用竖版组合规范.png",
  },
  {
    id: "shape-variants",
    title: "方形 / 圆形组合",
    subtitle: "形态变体",
    description: "方形圆角、方形、圆形标识的使用场景说明",
    image: assetPath("/assets/guidelines/shape-variants.png"),
    downloadName: "剑琅联盟-方形圆形组合规范.png",
  },
  {
    id: "solid-color",
    title: "纯色组合",
    subtitle: "纯色标识",
    description: "仅图形标识的纯色版本及应用场景",
    image: assetPath("/assets/guidelines/solid-color.png"),
    downloadName: "剑琅联盟-纯色组合规范.png",
  },
];
