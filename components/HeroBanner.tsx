"use client";

import { assetPath, BRAND } from "@/lib/types";

type Props = {
  categoryCount: number;
  variantCount: number;
};

export function HeroBanner({ categoryCount, variantCount }: Props) {
  const scrollToGrid = () => {
    document.getElementById("logo-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const bannerUrl = assetPath("/assets/banner/hero-main.png");

  return (
    <section className="hero-banner relative h-[360px] overflow-hidden md:h-[480px] lg:h-[520px]">
      <div className="hero-banner-bg absolute inset-0 overflow-hidden">
        <div className="hero-banner-zoom">
          <div
            className="hero-banner-image"
            role="img"
            aria-label="剑琅联盟品牌视觉"
            style={{ backgroundImage: `url(${bannerUrl})` }}
          />
        </div>
      </div>

      <div className="hero-banner-text-shield pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      <div className="hero-banner-edge-fade" aria-hidden="true" />

      <div className="relative z-[2] mx-auto flex h-full max-w-7xl flex-col justify-center px-8 pb-10 pt-24 md:pb-12 md:pt-28">
        <p className="hero-fade-up mb-3 text-xs font-semibold tracking-[0.25em] text-brand uppercase">
          Brand Assets
        </p>
        <h1 className="hero-fade-up hero-delay-1 mb-4 max-w-xl text-3xl font-black leading-tight text-[#1a1a1a] md:text-4xl lg:text-[2.75rem]">
          {BRAND.name} · 品牌资源站
        </h1>
        <p className="hero-fade-up hero-delay-2 mb-8 max-w-lg text-base leading-relaxed text-[#666] md:text-lg">
          提供日常所需的 Logo 与视觉资源下载。首版上线品牌 Logo 全系列，含横版/竖版组合、形态变体与纯色版本。
        </p>

        <div className="hero-fade-up hero-delay-3 mb-8 flex flex-wrap items-center gap-3">
          <span className="glass-pill text-sm font-medium text-brand">
            {categoryCount} 个分类
          </span>
          <span className="glass-pill text-sm font-medium text-[#333]">
            {variantCount} 个资源
          </span>
          <span className="glass-pill text-sm text-muted">PNG 多尺寸下载</span>
        </div>

        <button
          type="button"
          onClick={scrollToGrid}
          className="btn-primary focus-ring hero-fade-up hero-delay-4 w-fit"
        >
          浏览资源
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 3v7m0 0l-3-3m3 3l3-3M3 13h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
