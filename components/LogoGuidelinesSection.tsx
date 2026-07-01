"use client";

import { useState } from "react";
import { logoGuidelines, type LogoGuideline } from "@/lib/guideline-data";
import { GuidelineLightbox } from "@/components/GuidelineLightbox";
import { ScrollReveal } from "@/components/ScrollReveal";

function GuidelineCard({
  item,
  onOpen,
}: {
  item: LogoGuideline;
  onOpen: (item: LogoGuideline) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="glass-panel glass-panel-hover focus-ring group flex w-full flex-col overflow-hidden text-left"
    >
      <div className="flex h-48 items-center justify-center bg-white/50 p-4">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="border-t border-[var(--border-subtle)] p-5">
        <p className="mb-1 text-xs font-medium text-brand">{item.subtitle}</p>
        <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{item.description}</p>
        <p className="mt-3 text-xs link-accent">点击查看 · 可下载</p>
      </div>
    </button>
  );
}

export function LogoGuidelinesSection() {
  const [active, setActive] = useState<LogoGuideline | null>(null);

  return (
    <>
      <section id="guideline-grid" className="mx-auto max-w-7xl scroll-mt-24 px-8 py-10">
        <div className="section-header mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-[1.75rem]">
              Logo 设计说明
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              品牌标识组合方式、应用尺寸与使用场景规范
            </p>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-muted">
            {logoGuidelines.length} 张规范图
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {logoGuidelines.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 60}>
              <GuidelineCard item={item} onOpen={setActive} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <GuidelineLightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
