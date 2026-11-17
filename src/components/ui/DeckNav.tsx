"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToY } from "@/components/providers/SmoothScrollProvider";

/**
 * 簡報頁的換頁控制：頁面上每個 [data-slide] 區塊算一頁。
 * - 鍵盤 → / PageDown / 空白鍵：下一頁；← / PageUp：上一頁；Home / End：第一頁、最後一頁；F：全螢幕。
 *   （簡報筆送出的也是這幾個鍵。↑ ↓ 維持一般捲動，內容比螢幕高時還是看得到。）
 * - 右下角顯示頁碼與上一頁、下一頁、全螢幕按鈕；最上方是進度條。
 */
export default function DeckNav() {
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);

  const slides = () => Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));

  /** 目前在第幾頁：畫面中線落在哪一頁 */
  const currentIndex = useCallback(() => {
    const mid = window.scrollY + window.innerHeight / 2;
    let current = 0;
    slides().forEach((el, i) => {
      if (el.getBoundingClientRect().top + window.scrollY <= mid) current = i;
    });
    return current;
  }, []);

  // 剛按過換頁、畫面還在捲的時候，記住要去的那一頁，連按兩下才會真的前進兩頁
  const pending = useRef({ index: 0, at: 0 });

  const go = useCallback(
    (step: number | "first" | "last") => {
      const list = slides();
      const base = Date.now() - pending.current.at < 800 ? pending.current.index : currentIndex();
      const wanted = step === "first" ? 0 : step === "last" ? list.length - 1 : base + step;
      const target = Math.max(0, Math.min(list.length - 1, wanted));
      const el = list[target];
      if (!el) return;
      pending.current = { index: target, at: Date.now() };
      scrollToY(el.getBoundingClientRect().top + window.scrollY);
    },
    [currentIndex],
  );

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const update = () => {
      setTotal(slides().length);
      setIndex(currentIndex());
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      // 焦點在按鈕或連結上時，空白鍵留給它們自己用
      const onControl = tag === "BUTTON" || tag === "A" || tag === "INPUT" || tag === "TEXTAREA";
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(1);
          break;
        case " ":
          if (onControl) return;
          e.preventDefault();
          go(e.shiftKey ? -1 : 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          go("first");
          break;
        case "End":
          e.preventDefault();
          go("last");
          break;
        case "f":
        case "F":
          if (onControl) return;
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", onKey);
    };
  }, [currentIndex, go, toggleFullscreen]);

  if (!total) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const button =
    "flex h-9 w-9 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-sky/30 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-black/5 print:hidden" aria-hidden="true">
        <div
          className="h-full bg-brand-yellow transition-[width] duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <nav
        aria-label="簡報換頁"
        className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-black/10 backdrop-blur print:hidden"
      >
        <button type="button" className={button} onClick={() => go(-1)} disabled={index === 0} aria-label="上一頁">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12.5 4.5 7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="min-w-16 text-center text-sm font-semibold tracking-wider text-brand-navy tabular-nums">
          {pad(index + 1)} <span className="text-muted">/ {pad(total)}</span>
        </span>
        <button
          type="button"
          className={button}
          onClick={() => go(1)}
          disabled={index === total - 1}
          aria-label="下一頁"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className={`${button} hidden md:flex`} onClick={toggleFullscreen} aria-label="全螢幕（F）">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 8V4h4M16 8V4h-4M4 12v4h4M16 12v4h-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </>
  );
}
