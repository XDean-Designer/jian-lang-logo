"use client";

import { useEffect } from "react";
import type { LogoGuideline } from "@/lib/guideline-data";

type Props = {
  item: LogoGuideline | null;
  onClose: () => void;
};

export function GuidelineLightbox({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#1a1a1a]/72 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />

      <div className="relative z-[1] flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/20 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-4">
          <div>
            <p className="text-xs font-medium text-brand">{item.subtitle}</p>
            <h3 className="text-lg font-bold text-[#1a1a1a]">{item.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-btn)] text-muted hover:bg-black/5 hover:text-[#333]"
            aria-label="关闭预览"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#fafbfc] p-4 md:p-6">
          <img
            src={item.image}
            alt={item.title}
            className="mx-auto w-full max-w-full object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-5 py-4">
          <p className="text-sm text-muted">{item.description}</p>
          <a
            href={item.image}
            download={item.downloadName}
            className="btn-primary btn-primary-sm focus-ring shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2v8M8 10l3-3M8 10L5 7M3 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            下载 PNG
          </a>
        </div>
      </div>
    </div>
  );
}
