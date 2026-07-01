"use client";

import type { VideoVariant } from "@/lib/types";

type Props = {
  variant: VideoVariant;
};

export function VideoVariantCard({ variant }: Props) {
  const downloadName = `${variant.id}.mp4`;

  return (
    <div className="glass-panel overflow-hidden">
      <div className="bg-[#1a1a1a]/5 p-4">
        <video
          src={variant.file}
          controls
          preload="metadata"
          playsInline
          className="aspect-video w-full rounded-[var(--radius-btn)] bg-black object-contain"
        >
          您的浏览器不支持视频播放
        </video>
      </div>
      <div className="border-t border-[var(--border-subtle)] p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold">{variant.name}</h3>
            {variant.description && (
              <p className="mt-1 text-sm text-muted">{variant.description}</p>
            )}
          </div>
          <span className="glass-pill shrink-0 text-xs text-muted">MP4</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted">原始 MP4 · 可直接下载使用</p>
          <a
            href={variant.file}
            download={downloadName}
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
            下载 MP4
          </a>
        </div>
      </div>
    </div>
  );
}
