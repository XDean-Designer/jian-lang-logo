import type { VideoCategory } from "./types";
import { assetPath } from "./types";

/** 首页「品牌视频」区块开关，改为 true 即可恢复显示 */
export const SHOW_VIDEO_SECTION = false;

export const videoCategory: VideoCategory = {
  slug: "brand-videos",
  title: "品牌视频",
  subtitle: "Brand Video",
  description: [
    "品牌宣传与产品展示视频素材",
    "适用于活动页面、社媒发布、线下屏幕等场景",
  ],
  guidelines: [
    "请勿裁剪、拉伸或更改视频比例",
    "不可添加非品牌授权的水印或贴片",
    "建议在整洁背景或品牌规范场景中播放",
  ],
  variants: [
    {
      id: "splash-animation",
      name: "开屏动画",
      description: "App 开屏品牌动画",
      file: assetPath("/assets/videos/splash-animation.mp4"),
    },
    {
      id: "pk-animation",
      name: "PK动画",
      description: "品牌 PK 宣传动画",
      file: assetPath("/assets/videos/pk-animation.mp4"),
    },
  ],
};
