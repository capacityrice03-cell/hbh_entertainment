"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Photo = { src: string; alt: string; width: number; height: number };

/**
 * 場地相簿：第一張大圖，其餘兩張一排（電腦版）；張數是單數時，最後一張橫跨整排。
 * 點任何一張會全螢幕放大，可用左右箭頭、鍵盤或手機左右滑切換。
 */
export default function VenueGallery({ photos }: { photos: readonly Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [main, ...rest] = photos;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  // 放大時：鍵盤操作、鎖住背景捲動
  useEffect(() => {
    if (open === null) return;
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
  }, [open, close, step]);

  // 手機左右滑
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group block w-full overflow-hidden rounded-2xl bg-black/5"
        aria-label={`放大：${main.alt}`}
      >
        <Image
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          sizes="(min-width: 1200px) 1152px, 100vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      {rest.length > 0 && (
        <ul className="mt-4 grid gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
          {rest.map((p, i) => {
            const wide = rest.length % 2 === 1 && i === rest.length - 1;
            return (
              <li key={p.src} className={wide ? "md:col-span-2" : undefined}>
                <button
                  type="button"
                  onClick={() => setOpen(i + 1)}
                  className={`group block aspect-[3/2] w-full overflow-hidden rounded-2xl bg-black/5 ${wide ? "md:aspect-[21/9]" : ""}`}
                  aria-label={`放大：${p.alt}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes={wide ? "(min-width: 1200px) 1152px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
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
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="object-contain" />
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
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white/90">
            {open + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
