"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * 全站平滑慣性滾動（Lenis）。
 * - 使用者在系統設定「減少動態效果」時不啟用，維持瀏覽器原本的滾動。
 * - 站內錨點連結（#services 等）也改由 Lenis 平滑捲動，並扣掉固定頁首的高度。
 * - 燈箱打開時（body 被設成 overflow: hidden）暫停，避免背景頁面跟著捲動。
 */
let current: Lenis | null = null;

/**
 * 程式要自己捲到某個位置時用這個（例如簡報頁換頁）。
 * Lenis 啟用時一定要交給它捲，直接呼叫 window.scrollTo 會被它拉回原位；沒啟用時才用瀏覽器原生捲動。
 */
export function scrollToY(top: number) {
  if (current) current.scrollTo(top, { duration: 0.6 });
  else window.scrollTo({ top, behavior: "auto" });
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // 固定頁首高度約 5rem（和 globals.css 的 scroll-padding-top 一致）
      anchors: { offset: -80 },
    });
    current = lenis;

    const body = document.body;
    const syncLock = () => (body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(syncLock);
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      current = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
