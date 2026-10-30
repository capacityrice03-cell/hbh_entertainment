"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";

type Photo = { src: string; alt: string; width: number; height: number };

/**
 * 場地相簿：第一張大圖，其餘兩張一排（電腦版）；張數是單數時，最後一張橫跨整排。
 * 點任何一張會全螢幕放大，可用左右箭頭、鍵盤或手機左右滑切換。
 */
export default function VenueGallery({ photos }: { photos: readonly Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [main, ...rest] = photos;

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

      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </>
  );
}
