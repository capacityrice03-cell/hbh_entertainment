"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import type { CaseImage } from "@/types";

/**
 * 拼貼照片牆：手機 2 欄、電腦 4 欄。
 * 每張照片用 tile 決定大小——"big" 佔 2×2、"tall"（直式照片）佔 1×2，沒填就是 1 格。
 * 格子比例都是 3:2，橫式照片幾乎不會被裁切。點任一張可全螢幕瀏覽。
 */
export default function PhotoWall({
  images,
  note,
}: {
  images: CaseImage[];
  /** 文字格（佔 2×1），放在最後，用來補滿拼貼空位 */
  note?: { kicker: string; text: string };
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {images.map((img, i) => {
          const size =
            img.tile === "big"
              ? "col-span-2 row-span-2 aspect-[3/2] md:aspect-auto"
              : img.tile === "tall"
                ? "row-span-2"
                : "aspect-[3/2]";
          return (
            <li key={img.src} className={`relative ${size}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group absolute inset-0 overflow-hidden rounded-xl bg-black/5"
                aria-label={`放大：${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.tile === "big" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 滑過時：漸層加說明文字 */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {img.caption && (
                  <span className="absolute right-3 bottom-2.5 left-3 translate-y-1 text-left text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </span>
                )}
              </button>
            </li>
          );
        })}
        {note && (
          <li className="col-span-2 flex aspect-[3/1] flex-col justify-center rounded-xl bg-brand-navy px-5 text-white md:px-7">
            <p className="text-xs tracking-wider text-brand-sky md:text-sm">{note.kicker}</p>
            <p className="mt-1 text-lg font-bold tracking-wide md:text-2xl">{note.text}</p>
          </li>
        )}
      </ul>

      <Lightbox photos={images} index={open} onChange={setOpen} />
    </>
  );
}
