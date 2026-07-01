import Link from "next/link";
import { VideoGuidelines } from "@/components/VideoGuidelines";
import { VideoVariantCard } from "@/components/VideoVariantCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { videoCategory } from "@/lib/video-data";

export const metadata = {
  title: "品牌视频 · 剑琅联盟品牌资源站",
  description: videoCategory.description[0],
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 pb-10 pt-[88px]">
      <nav className="breadcrumb-glass mb-8">
        <Link href="/" className="link-accent focus-ring rounded hover:text-brand">
          资源库
        </Link>
        <span className="mx-1.5 text-muted/50">/</span>
        <span className="font-medium text-[#333]">{videoCategory.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <VideoGuidelines category={videoCategory} />

        <div className="space-y-6">
          <div className="section-header flex items-end justify-between">
            <div>
              <p className="section-label">Downloads</p>
              <h2 className="text-xl font-bold">下载资源</h2>
            </div>
            <span className="glass-pill text-sm text-muted">
              {videoCategory.variants.length} 个文件
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {videoCategory.variants.map((variant, i) => (
              <ScrollReveal key={variant.id} delay={i * 80}>
                <VideoVariantCard variant={variant} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
