import { categories } from "@/lib/data";
import { videoCategory } from "@/lib/video-data";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroBanner } from "@/components/HeroBanner";
import { LogoGuidelinesSection } from "@/components/LogoGuidelinesSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoVariantCard } from "@/components/VideoVariantCard";

export default function HomePage() {
  const totalLogoVariants = categories.reduce((sum, c) => sum + c.variants.length, 0);

  return (
    <div>
      <HeroBanner categoryCount={categories.length} variantCount={totalLogoVariants} />

      <section id="logo-grid" className="mx-auto max-w-7xl scroll-mt-24 px-8 py-10">
        <div className="section-header mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-[1.75rem]">
              品牌 Logo
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              选择分类查看规范说明并下载资源
            </p>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-muted">
            {categories.length} 个分类 · {totalLogoVariants} 个资源
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, i) => (
            <ScrollReveal key={category.slug} delay={i * 60}>
              <CategoryCard category={category} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <LogoGuidelinesSection />

      <section id="video-grid" className="mx-auto max-w-7xl scroll-mt-24 px-8 pb-10 pt-2">
        <div className="section-header mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-[1.75rem]">
              品牌视频
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              品牌宣传与展示视频，支持在线预览与下载
            </p>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-muted">
            {videoCategory.variants.length} 个资源
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {videoCategory.variants.map((variant, i) => (
            <ScrollReveal key={variant.id} delay={i * 60}>
              <VideoVariantCard variant={variant} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
