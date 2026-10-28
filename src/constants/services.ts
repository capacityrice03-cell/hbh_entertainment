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

// 活動場域/包場租借：只顯示在「服務項目」區，沒有對應案例，所以不放進 SERVICES（不會出現在案例分類）
export const VENUE = {
  title: "活動場域/包場租借",
  items: ["台北市-捷運松江南京站", "新北烏來"],
};

/**
 * 場地分頁的照片。第一張當大圖，其餘排在下方。
 * 加照片：圖放進 public/images/，在這裡補一行（width / height 填圖片實際尺寸）。
 */
export const VENUE_PLACES = [
  {
    name: "台北市-捷運松江南京站",
    /** 名稱旁的小字，沒有就不寫 */
    note: "(1號出口步行3分鐘)",
    photos: [
      { src: "/images/venue-songjiang-01.jpg", alt: "松江南京場地：舞台與投影幕正面", width: 2000, height: 1125 },
      { src: "/images/venue-songjiang-02.jpg", alt: "松江南京場地：全場沙發座位與打光燈", width: 2000, height: 1125 },
      { src: "/images/venue-songjiang-03.jpg", alt: "松江南京場地：投影使用中，後方為吧台", width: 2000, height: 1125 },
      { src: "/images/venue-songjiang-04.jpg", alt: "松江南京場地：從舞台往後看的空間", width: 2000, height: 1125 },
      { src: "/images/venue-songjiang-05.jpg", alt: "松江南京場地：吧台與咖啡機", width: 2000, height: 1125 },
      { src: "/images/venue-songjiang-06.jpg", alt: "松江南京場地：入口報到桌與展示架", width: 2000, height: 1125 },
    ],
  },
  {
    name: "新北烏來",
    photos: [
      { src: "/images/venue-wulai-01.jpg", alt: "烏來場地：山景與大草地", width: 1600, height: 1200 },
      { src: "/images/venue-wulai-02.jpg", alt: "烏來場地：戶外活動滿場", width: 1600, height: 1067 },
      { src: "/images/venue-wulai-03.jpg", alt: "烏來場地：步道、草地與溪流造景", width: 1600, height: 1067 },
      { src: "/images/venue-wulai-04.jpg", alt: "烏來場地：室內客廳與用餐區", width: 1600, height: 1067 },
      { src: "/images/venue-wulai-05.jpg", alt: "烏來場地：自助餐點", width: 1600, height: 1132 },
    ],
  },
] as const;

export const SERVICE_TITLE: Record<Service["id"], string> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.title]),
) as Record<Service["id"], string>;
