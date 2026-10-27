"use client";

import { useEffect, useRef } from "react";

/**
 * 滾動視差：依外層元素在畫面中的位置，讓內容以不同速度上下移動。
 * - speed > 0：比頁面捲動慢（背景常用）；speed < 0：比頁面捲動快。
 * - minWidth：螢幕寬度小於此值時不啟用（避免手機上太晃）。
 * - 使用者在系統設定「減少動態效果」時自動停用。
 */
export default function Parallax({
  speed = 0.2,
  minWidth = 0,
  className,
  children,
}: {
  speed?: number;
  minWidth?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const anchor = el?.parentElement;
    if (!el || !anchor) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduceMotion.matches || window.innerWidth < minWidth) {
        el.style.transform = "";
        return;
      }
      // 用外層元素量位置，避免自己的位移影響計算
      const rect = anchor.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduceMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduceMotion.removeEventListener("change", schedule);
    };
  }, [speed, minWidth]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
