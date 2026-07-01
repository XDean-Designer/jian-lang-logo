"use client";

import { useState } from "react";
import type { LogoCategory } from "@/lib/types";
import { BRAND } from "@/lib/types";

type Props = {
  category: LogoCategory;
};

export function BrandGuidelines({ category }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyColor() {
    await navigator.clipboard.writeText(BRAND.color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <aside className="sticky top-[88px] space-y-6 self-start">
      <div>
        <p className="section-label">{category.subtitle}</p>
        <h1 className="text-3xl font-black leading-tight">{category.title}</h1>
      </div>

      <div className="space-y-2 text-sm text-muted">
        {category.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-bold">标识组成</p>
        <ol className="list-inside list-decimal space-y-1 text-sm text-muted">
          {category.components.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ol>
      </div>

      <div className="glass-panel p-4">
        <p className="mb-2 text-sm font-bold">品牌色值</p>
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block h-8 w-8 rounded-[var(--radius-btn)] bg-brand shadow-sm" />
          <div>
            <p className="font-bold">{BRAND.color}</p>
            <p className="text-xs text-muted">R:243 G:47 B:65</p>
          </div>
        </div>
        <button
          type="button"
          onClick={copyColor}
          className="focus-ring link-accent rounded text-sm hover:underline"
        >
          {copied ? "已复制" : "复制色值"}
        </button>
      </div>

      {category.guidelines.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold">规范说明</p>
          <ul className="space-y-2 text-sm text-muted">
            {category.guidelines.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-brand/50">—</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {category.dimensions && category.dimensions.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold">尺寸标注</p>
          <ul className="space-y-1 text-sm link-accent">
            {category.dimensions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="glass-panel glass-panel-tint p-4 text-sm text-muted">
        <p className="mb-1 font-bold text-[#333]">下载说明</p>
        <p>拖动滑块选择 256 / 512 / 1024 / 2048 px，点击下载透明底 PNG 文件。</p>
      </div>
    </aside>
  );
}
