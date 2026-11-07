"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 一列可以左右滑的卡片（Threads 那排的圖卡用）。
 * 手機用手指滑；電腦多了左右箭頭，每按一下移一張。
 * children 放 <li>，每個 li 自己決定寬度。
 */
export default function ScrollStrip({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: smooth ? "smooth" : "auto" });
  };

  const btn =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-brand-navy shadow-md ring-1 ring-black/10 transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:flex";

  return (
    <div className="relative">
      <ul
        ref={ref}
        onScroll={update}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:gap-4 md:px-0"
      >
        {children}
      </ul>
      <button type="button" aria-label="上一張" onClick={() => move(-1)} disabled={atStart} className={`${btn} -left-3`}>
        ‹
      </button>
      <button type="button" aria-label="下一張" onClick={() => move(1)} disabled={atEnd} className={`${btn} -right-3`}>
        ›
      </button>
    </div>
  );
}
