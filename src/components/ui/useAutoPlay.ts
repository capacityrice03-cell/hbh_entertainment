"use client";

import { useEffect, useRef } from "react";
import type { IconHandle } from "pulsoicon-react";

/**
 * 讓圖示每隔幾秒自己動一次（電腦和手機都會；電腦滑鼠移上去也會動）。
 * order：同一排第幾個，依序錯開一點時間，看起來像輪流動。
 * 系統設定「減少動態」時圖示本身不會動。
 */
export function useAutoPlay(order = 0, every = 1200) {
  const ref = useRef<IconHandle>(null);

  useEffect(() => {
    const play = () => {
      if (!document.hidden) ref.current?.startAnimation();
    };
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      play();
      interval = setInterval(play, every);
    }, 800 + order * 300);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [order, every]);

  return ref;
}
