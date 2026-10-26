import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "commercial",
    title: "商業影像拍攝",
    items: ["企業形象影片", "活動紀錄", "平面 / 動態－人像 × 商品"],
  },
  {
    id: "channel",
    title: "頻道經營企劃",
    items: ["客製化企劃內容", "外景、棚內錄影剪輯", "社群經營"],
  },
  {
    id: "sponsored",
    title: "業配拍攝置入",
    items: ["KOL－FB、IG、TikTok", "圖文影片業配製作 × 廣告轉單"],
  },
  {
    id: "efp",
    title: "EFP 直播系統",
    items: ["多機作業", "多平台同步", "直播精華"],
  },
  {
    id: "event",
    title: "各類活動舉辦",
    items: ["記者會、開幕活動", "活動花絮記錄"],
  },
  {
    id: "media",
    title: "新聞媒體操作",
    items: ["提高市場曝光及關注", "話語權影響力"],
  },
];

export const SERVICE_TITLE: Record<Service["id"], string> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.title]),
) as Record<Service["id"], string>;
