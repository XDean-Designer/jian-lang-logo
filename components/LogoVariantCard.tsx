"use client";

import { useMemo, useState } from "react";
import type { LogoVariant, PngVariant } from "@/lib/types";
import { PNG_SIZES } from "@/lib/types";
import { SizeSlider } from "@/components/SizeSlider";

type Props = {
  variant: LogoVariant;
};

type BgMode = "light" | "dark";

export function LogoVariantCard({ variant }: Props) {
  const hasDark = Boolean(variant.darkPng?.length);
  const [bg, setBg] = useState<BgMode>("light");
  const [sizeIndex, setSizeIndex] = useState(1);

  const currentSize = PNG_SIZES[sizeIndex];
  const activePngList = bg === "dark" && variant.darkPng ? variant.darkPng : variant.png;
  const currentPng = useMemo(
    () => activePngList.find((p) => p.size === currentSize) ?? activePngList[0],
    [activePngList, currentSize],
  );

  return (
    <div className="glass-panel overflow-hidden">
      <div
        className={`flex min-h-[220px] items-center justify-center p-8 ${
          bg === "light"
            ? "bg-[linear-gradient(45deg,rgba(0,0,0,0.03)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.03)_75%),linear-gradient(45deg,rgba(0,0,0,0.03)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.03)_75%)] bg-[length:12px_12px] bg-[position:0_0,6px_6px] bg-white/40"
            : "bg-[#1a1a1a]"
        }`}
      >
        <img
          src={currentPng.file}
          alt={variant.name}
          className="max-h-40 max-w-full object-contain"
        />
      </div>
      <div className="border-t border-[var(--border-subtle)] p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold">{variant.name}</h3>
            {variant.usage && (
              <p className="mt-1 text-sm link-accent">适用：{variant.usage}</p>
            )}
            {variant.description && (
              <p className="mt-1 text-sm text-muted">{variant.description}</p>
            )}
          </div>
          {hasDark && (
            <div className="glass-inset flex shrink-0 gap-0.5 p-1">
              <button
                type="button"
                onClick={() => setBg("light")}
                className={`focus-ring rounded-[8px] px-2.5 py-1 text-xs transition-colors duration-200 ${
                  bg === "light" ? "bg-white font-semibold text-brand shadow-sm" : "text-muted hover:text-[#333]"
                }`}
              >
                浅底
              </button>
              <button
                type="button"
                onClick={() => setBg("dark")}
                className={`focus-ring rounded-[8px] px-2.5 py-1 text-xs transition-colors duration-200 ${
                  bg === "dark" ? "bg-[#333] font-semibold text-white" : "text-muted hover:text-[#333]"
                }`}
              >
                深底
              </button>
            </div>
          )}
        </div>

        <SizeSection
          sizeIndex={sizeIndex}
          currentSize={currentSize}
          onSizeIndexChange={setSizeIndex}
        />

        <hr className="hairline my-5" />

        <DownloadSection
          variant={variant}
          bg={bg}
          currentSize={currentSize}
          currentPng={currentPng}
        />
      </div>
    </div>
  );
}

type SizeSectionProps = {
  sizeIndex: number;
  currentSize: number;
  onSizeIndexChange: (index: number) => void;
};

function SizeSection({ sizeIndex, currentSize, onSizeIndexChange }: SizeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">PNG 尺寸</p>
        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">当前尺寸</p>
          <p className="text-3xl font-light tabular-nums leading-none text-[#333]">
            {currentSize}
            <span className="ml-0.5 text-base font-normal text-muted">px</span>
          </p>
        </div>
      </div>

      <SizeSlider value={sizeIndex} onChange={onSizeIndexChange} />
    </div>
  );
}

type DownloadSectionProps = {
  variant: LogoVariant;
  bg: BgMode;
  currentSize: number;
  currentPng: PngVariant;
};

function DownloadSection({ variant, bg, currentSize, currentPng }: DownloadSectionProps) {
  const isDark = bg === "dark";
  const downloadName = isDark
    ? `${variant.id}-dark-${currentSize}px.png`
    : `${variant.id}-${currentSize}px.png`;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[#333]">
          {currentSize}px · {isDark ? "深色底 PNG" : "透明底 PNG"}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {isDark ? "适用于深色背景，等比缩放至最长边" : "等比缩放至最长边"}{" "}
          {currentSize}px
        </p>
      </div>
      <a
        href={currentPng.file}
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
        下载 PNG
      </a>
    </div>
  );
}
