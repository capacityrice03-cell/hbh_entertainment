import type { Service } from "@/types";

// 三大服務類別（順序即網站顯示順序）
export const SERVICES: Service[] = [
  {
    id: "channel",
    title: "品牌影音營銷",
    items: ["客製化企劃內容", "FB、IG、Threads、TikTok 帳號 AI 自動化營運"],
  },
  {
    id: "event",
    title: "活動 / EFP 直播 / 媒體廣告",
    items: ["多機 / 多平台同步", "活動花絮與直播精華", "記者會籌辦", "新聞媒體投放"],
  },
  {
    id: "commercial",
    title: "商業拍攝",
    items: ["企業形象影片", "平面 / 動態－人像 × 商品", "KOL 業配－FB、IG、TikTok", "圖文影片業配 × 廣告轉單"],
  },
];

export const SERVICE_TITLE: Record<Service["id"], string> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.title]),
) as Record<Service["id"], string>;
