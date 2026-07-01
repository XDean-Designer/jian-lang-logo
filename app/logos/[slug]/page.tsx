import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getAllCategorySlugs, getCategory } from "@/lib/data";
import { BrandGuidelines } from "@/components/BrandGuidelines";
import { LogoVariantCard } from "@/components/LogoVariantCard";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.title} · 剑琅联盟品牌资源站`,
    description: category.description[0],
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const index = categories.findIndex((c) => c.slug === slug);

  return (
    <div className="mx-auto max-w-7xl px-8 pb-10 pt-[88px]">
      <nav className="breadcrumb-glass mb-8">
        <Link href="/" className="link-accent focus-ring rounded hover:text-brand">
          资源库
        </Link>
        <span className="mx-1.5 text-muted/50">/</span>
        <span className="font-medium text-[#333]">{category.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <BrandGuidelines category={category} />
        <div className="space-y-6">
          <div className="section-header flex items-end justify-between">
            <div>
              <p className="section-label">Downloads</p>
              <h2 className="text-xl font-bold">下载资源</h2>
            </div>
            <span className="glass-pill text-sm text-muted">{category.variants.length} 个文件</span>
          </div>
          {category.variants.map((variant, i) => (
            <ScrollReveal key={variant.id} delay={i * 80}>
              <LogoVariantCard variant={variant} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {(index > 0 || index < categories.length - 1) && (
        <div className="relative mt-12 flex justify-between border-t border-transparent pt-8">
          <div className="hairline absolute inset-x-0 top-0" />
          {index > 0 ? (
            <Link
              href={`/logos/${categories[index - 1].slug}/`}
              className="link-accent focus-ring rounded text-sm hover:text-brand"
            >
              ← {categories[index - 1].title}
            </Link>
          ) : (
            <span />
          )}
          {index < categories.length - 1 && (
            <Link
              href={`/logos/${categories[index + 1].slug}/`}
              className="link-accent focus-ring rounded text-sm hover:text-brand"
            >
              {categories[index + 1].title} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
