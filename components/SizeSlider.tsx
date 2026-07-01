"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PNG_SIZES } from "@/lib/types";

const STEP_COUNT = PNG_SIZES.length;
const SNAP_MS = 200;

function indexToPercent(index: number) {
  if (STEP_COUNT <= 1) return 0;
  return (index / (STEP_COUNT - 1)) * 100;
}

function percentToIndex(percent: number) {
  if (STEP_COUNT <= 1) return 0;
  const step = 100 / (STEP_COUNT - 1);
  return Math.min(STEP_COUNT - 1, Math.max(0, Math.round(percent / step)));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type Props = {
  value: number;
  onChange: (index: number) => void;
};

export function SizeSlider({ value, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const visualPercentRef = useRef(indexToPercent(value));
  const [visualPercent, setVisualPercent] = useState(() => indexToPercent(value));
  const [isDragging, setIsDragging] = useState(false);
  const [thumbBounce, setThumbBounce] = useState(false);

  visualPercentRef.current = visualPercent;

  useEffect(() => {
    if (!isDragging && animRef.current === null) {
      const next = indexToPercent(value);
      setVisualPercent(next);
      visualPercentRef.current = next;
    }
  }, [value, isDragging]);

  const cancelAnim = useCallback(() => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  const triggerBounce = useCallback(() => {
    setThumbBounce(false);
    requestAnimationFrame(() => setThumbBounce(true));
    window.setTimeout(() => setThumbBounce(false), 320);
  }, []);

  const getPercentFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, clientX - rect.left));
    return (x / rect.width) * 100;
  }, []);

  const animateToIndex = useCallback(
    (targetIndex: number, onComplete?: () => void) => {
      cancelAnim();
      const from = visualPercentRef.current;
      const to = indexToPercent(targetIndex);
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / SNAP_MS);
        const eased = easeOutCubic(t);
        const current = from + (to - from) * eased;
        setVisualPercent(current);
        visualPercentRef.current = current;

        if (t < 1) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          animRef.current = null;
          setVisualPercent(to);
          visualPercentRef.current = to;
          onComplete?.();
          triggerBounce();
        }
      };

      animRef.current = requestAnimationFrame(tick);
    },
    [cancelAnim, triggerBounce],
  );

  const snapToNearest = useCallback(
    (percent: number) => {
      const nearest = percentToIndex(percent);
      animateToIndex(nearest, () => {
        if (nearest !== value) onChange(nearest);
      });
    },
    [animateToIndex, onChange, value],
  );

  const snapToIndex = useCallback(
    (index: number) => {
      if (index === value && !isDragging) {
        animateToIndex(index);
        return;
      }
      animateToIndex(index, () => onChange(index));
    },
    [animateToIndex, isDragging, onChange, value],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      cancelAnim();
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      const percent = getPercentFromClientX(e.clientX);
      setVisualPercent(percent);
      visualPercentRef.current = percent;
    },
    [cancelAnim, getPercentFromClientX],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const percent = getPercentFromClientX(e.clientX);
      setVisualPercent(percent);
      visualPercentRef.current = percent;
    },
    [getPercentFromClientX, isDragging],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      snapToNearest(getPercentFromClientX(e.clientX));
    },
    [getPercentFromClientX, isDragging, snapToNearest],
  );

  useEffect(() => () => cancelAnim(), [cancelAnim]);

  return (
    <div className="space-y-4">
      <div className="px-1">
        <div
          ref={trackRef}
          className="relative flex h-8 cursor-pointer touch-none items-center select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={STEP_COUNT - 1}
          aria-valuenow={value}
          aria-label="选择 PNG 尺寸"
        >
          <div className="pointer-events-none absolute inset-x-0 h-1.5 rounded-full bg-black/[0.06]" />
          <div
            className="pointer-events-none absolute left-0 h-1.5 rounded-full bg-brand/40 transition-none"
            style={{ width: `${visualPercent}%` }}
          />
          {PNG_SIZES.map((size, i) => (
            <div
              key={size}
              className="pointer-events-none absolute top-1/2 h-2 w-0.5 bg-black/10"
              style={{
                left: `${indexToPercent(i)}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${visualPercent}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`origin-center h-[22px] w-[22px] rounded-full border-[3px] border-white bg-brand shadow-[0_2px_8px_rgba(243,47,65,0.4)] ${
                isDragging ? "scale-110" : ""
              } ${thumbBounce ? "slider-thumb-bounce" : ""}`}
            />
          </div>
        </div>
      </div>

      <div className="glass-inset flex p-1">
        {PNG_SIZES.map((size, i) => {
          const active = i === value;
          return (
            <button
              key={size}
              type="button"
              onClick={() => snapToIndex(i)}
              className={`focus-ring flex-1 rounded-[8px] py-2 text-center text-sm tabular-nums transition-all duration-200 ${
                active
                  ? "bg-white/90 font-semibold text-brand shadow-sm"
                  : "font-medium text-muted hover:text-[#333]"
              } ${active && thumbBounce ? "segment-land" : ""}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
