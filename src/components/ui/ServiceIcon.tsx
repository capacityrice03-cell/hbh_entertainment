"use client";

// 服務項目圖示：保留原本的自訂圖案，用 PulsoIcon 的 createIcon 加上動作。
// 滑鼠移到所在的連結（卡片）上就會播放；系統設定「減少動態」時不動。
// 授權（ISC）全文：public/licenses/pulsoicon-LICENSE.txt
import { createIcon, type IconSpec } from "pulsoicon-react";
import type { ServiceId } from "@/types";

const specs: Record<ServiceId | "venue", IconSpec> = {
  // 品牌影音行銷：手機 + AI 星芒
  channel: {
    nodes: [
      ["rect", { x: "5", y: "2.5", width: "10", height: "19", rx: "2" }, { r: "press", a: 0.04, o: [10, 12] }],
      ["path", { d: "M9 18.5h2" }],
      ["path", { d: "M9 8.5v5l4-2.5z" }, { r: "slide", d: 0.05, x: 1, a: 1, o: [10.5, 11] }],
      ["path", { d: "M19 3.5v3M17.5 5h3" }, { r: "twinkle", d: 0.1, o: [19, 5] }],
      ["path", { d: "M19.5 10v2M18.5 11h2" }, { r: "twinkle", d: 0.2, o: [19.5, 11] }],
    ],
  },
  // 活動 / EFP 直播 / 媒體廣告：直播攝影機 + 訊號
  event: {
    nodes: [
      ["rect", { x: "2.5", y: "9", width: "12", height: "9", rx: "2" }, { r: "press", a: 0.04, o: [8.5, 13.5] }],
      ["path", { d: "M14.5 12.5l4-2.5v7l-4-2.5" }, { r: "slide", d: 0.05, x: 1, a: 1, o: [16.5, 13.5] }],
      ["circle", { cx: "6", cy: "12", r: "1", fill: "currentColor", stroke: "none" }, { r: "pop", d: 0.1, o: [6, 12] }],
      ["path", { d: "M15.5 6a3 3 0 0 1 2 2" }, { r: "draw", d: 0.1, o: [16.5, 7] }],
      ["path", { d: "M17 3.5a6 6 0 0 1 3.5 3.5" }, { r: "draw", d: 0.22, o: [18.75, 5.25] }],
    ],
  },
  // 節目製作：攝影機
  commercial: {
    nodes: [
      ["rect", { x: "3", y: "9", width: "13", height: "10", rx: "2" }, { r: "press", a: 0.04, o: [9.5, 14] }],
      ["path", { d: "M16 13l5-3v8l-5-3" }, { r: "slide", d: 0.05, x: 1, a: 1, o: [18.5, 14] }],
      ["circle", { cx: "7", cy: "5.5", r: "2.5" }, { r: "pop", d: 0.1, o: [7, 5.5] }],
      ["circle", { cx: "13", cy: "5.5", r: "2.5" }, { r: "pop", d: 0.2, o: [13, 5.5] }],
    ],
  },
  // 場域租借：地點圖釘
  venue: {
    nodes: [
      ["path", { d: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" }, { r: "bounce", y: -1, a: 2.5, o: [12, 12] }],
      ["circle", { cx: "12", cy: "10", r: "2.3" }, { r: "pop", d: 0.15, o: [12, 10] }],
    ],
  },
};

const icons = {
  channel: createIcon("ServiceChannel", "service-channel", specs.channel),
  event: createIcon("ServiceEvent", "service-event", specs.event),
  commercial: createIcon("ServiceCommercial", "service-commercial", specs.commercial),
  venue: createIcon("ServiceVenue", "service-venue", specs.venue),
};

export default function ServiceIcon({
  id,
  className = "h-8 w-8",
}: {
  id: ServiceId | "venue";
  className?: string;
}) {
  const Icon = icons[id];
  return <Icon className={className} strokeWidth={1.6} />;
}
