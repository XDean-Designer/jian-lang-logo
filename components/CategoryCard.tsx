import Link from "next/link";
import type { LogoCategory } from "@/lib/types";

type Props = {
  category: LogoCategory;
};

export function CategoryCard({ category }: Props) {
  const preview = category.variants[0]?.preview;

  return (
    <Link
      href={`/logos/${category.slug}/`}
      className="glass-panel glass-panel-hover focus-ring group flex flex-col overflow-hidden"
    >
      <div className="flex h-48 items-center justify-center bg-white/30 p-6">
        {preview && (
          <img
            src={preview}
            alt={category.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="border-t border-[var(--border-subtle)] p-5">
        <p className="mb-1 text-xs font-medium text-brand">{category.subtitle}</p>
        <h3 className="mb-2 text-lg font-bold">{category.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{category.description[0]}</p>
        <p className="mt-3 text-xs link-accent">
          {category.variants.length} 个资源 · 点击查看
        </p>
      </div>
    </Link>
  );
}
