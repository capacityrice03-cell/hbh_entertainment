"use client";

// 市場行情卡片的圖示：PulsoIcon 動態圖示，滑鼠移到那一列（data-icon-trigger）就會動
// 授權（ISC）全文：public/licenses/pulsoicon-LICENSE.txt
import { Calendar, Star, Video } from "pulsoicon-react";

const ICONS = { camera: Video, calendar: Calendar, star: Star } as const;

export default function PriceIcon({ name }: { name: keyof typeof ICONS }) {
  const Icon = ICONS[name];
  return <Icon className="h-7 w-7" strokeWidth={1.6} />;
}
