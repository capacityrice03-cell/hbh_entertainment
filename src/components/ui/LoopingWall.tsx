"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Item = { src: string; views: number };

/**
 * 兩排、可左右滑動的無限循環短影音牆。
 * 做法：把整組圖片重複 3 份，一開始停在中間那份的正中央；
 * 滑到接近兩端時，悄悄往回跳「一份的寬度」，畫面一模一樣，看起來就是頭尾相接的閉環。
 */
export default function LoopingWall({ items }: { items: readonly Item[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const setWidth = useRef(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    // 一份的寬度 = 第二份第一張的位置 − 第一份第一張的位置
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[items.length] as HTMLElement | undefined;
      if (first && second) setWidth.current = second.offsetLeft - first.offsetLeft;
    };
    const center = () => {
      measure();
      el.scrollLeft = setWidth.current + (setWidth.current - el.clientWidth) / 2;
    };
    // 滑鼠拖曳用的狀態
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    // 以畫面中心點的位置判斷（單位：一份寬度）。
    // 停下來時（scrollend）只要偏離中間那份就拉回；滑動途中只有快到盡頭才跳，避免打斷滑動動畫。
    const wrapWithin = (low: number, high: number) => {
      const w = setWidth.current;
      if (!w) return;
      const c = (el.scrollLeft + el.clientWidth / 2) / w;
      let shift = 0;
      if (c < low) shift = w;
      else if (c > high) shift = -w;
      if (!shift) return;
      el.scrollLeft += shift;
      // 拖曳中跨過循環點時，拖曳起點也要跟著換算
      if (dragging) startScroll += shift;
    };
    const wrap = () => wrapWithin(0.4, 2.6);
    const settle = () => {
      if (!dragging) wrapWithin(1, 2);
    };

    center();
    el.addEventListener("scroll", wrap, { passive: true });
    el.addEventListener("scrollend", settle);
    const ro = new ResizeObserver(() => {
      // 視窗大小改變時，維持在同樣的相對位置
      const old = setWidth.current;
      const ratio = old ? el.scrollLeft / old : 1;
      measure();
      if (old) el.scrollLeft = ratio * setWidth.current;
      else center();
    });
    ro.observe(el);

    // 電腦版用滑鼠按住拖曳
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScroll - dx;
      wrap();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      settle();
    };
    const stopClick = (e: MouseEvent) => {
      if (moved) e.preventDefault();
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", stopClick, true);
    const noDrag = (e: DragEvent) => e.preventDefault();
    el.addEventListener("dragstart", noDrag);

    return () => {
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("scrollend", settle);
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", stopClick, true);
      el.removeEventListener("dragstart", noDrag);
    };
  }, [items.length]);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const copies = [0, 1, 2];

  return (
    <div className="relative">
      <ul
        ref={scroller}
        className="grid cursor-grab auto-cols-[28vw] grid-flow-col grid-rows-2 gap-1 overflow-x-auto rounded-2xl select-none [scrollbar-width:none] sm:auto-cols-[150px] lg:auto-cols-[165px] [&::-webkit-scrollbar]:hidden"
      >
        {copies.flatMap((c) =>
          items.map((v, i) => (
            <li key={`${c}-${v.src}`} className="relative aspect-[9/14]" aria-hidden={c !== 1 || undefined}>
              <Image
                src={v.src}
                alt={c === 1 ? `短影音作品 ${i + 1}，${v.views} 萬次播放` : ""}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 165px, (min-width: 640px) 150px, 28vw"
                className="pointer-events-none object-cover"
              />
            </li>
          )),
        )}
      </ul>

      {/* 左右箭頭（平板以上顯示） */}
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => step(dir)}
          aria-label={dir === -1 ? "往左看更多" : "往右看更多"}
          className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg transition-colors hover:bg-white sm:flex ${
            dir === -1 ? "left-2" : "right-2"
          }`}
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <path d={dir === -1 ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}
