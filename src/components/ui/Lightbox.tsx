"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Photo = { src: string; alt: string };

/**
 * 全螢幕看大圖：可用左右箭頭、鍵盤或手機左右滑切換，按 Esc 或點背景關閉。
 * index 為 null 時不顯示。
 */
export default function Lightbox({
  photos,
  index,
  onChange,
}: {
  photos: readonly Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (d: number) => {
      if (index !== null) onChange((index + d + photos.length) % photos.length);
    },
    [index, onChange, photos.length],
  );

  // 放大時：鍵盤操作、鎖住背景捲動
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, step]);

  // 手機左右滑
  const [touchX, setTouchX] = useState<number | null>(null);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-8"
      onClick={close}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
      </div>

      <button
        type="button"
        onClick={close}
        className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
        aria-label="關閉"
      >
        ×
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 md:left-6"
            aria-label="上一張"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 md:right-6"
            aria-label="下一張"
          >
            ›
          </button>
        </>
      )}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm whitespace-nowrap text-white/90">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
