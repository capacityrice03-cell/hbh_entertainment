"use client";

// 市場行情卡片的圖示：PulsoIcon 動態圖示。
// 每隔幾秒自己動一次；電腦版滑鼠移到那一列（data-icon-trigger）也會動。
// 授權（ISC）全文：public/licenses/pulsoicon-LICENSE.txt
import { Calendar, Star, Video } from "pulsoicon-react";
import { useAutoPlay } from "./useAutoPlay";

const ICONS = { camera: Video, calendar: Calendar, star: Star } as const;

export default function PriceIcon({ name, order = 0 }: { name: keyof typeof ICONS; order?: number }) {
  const ref = useAutoPlay(order);
  const Icon = ICONS[name];
  return <Icon ref={ref} className="h-7 w-7" strokeWidth={1.6} />;
}
