// 「品牌影音行銷」分頁（/services/brand-video/）的文字。
// 2026-11-01 負責人已確認內容。

export const BRAND_VIDEO = {
  title: "品牌影音行銷",
  en: "Brand Video Marketing",
  // 頁面開頭的一段介紹（畫面上看得到；\n 會換行）
  intro:
    "品牌影音行銷不適用一套公式，量身打造雖費時費力，但成效會說話；\n品牌在社群上長期曝光，需要的是與時俱進的正確方向。",
  // Google 搜尋結果與結構化資料用的描述（畫面上看不到）；和開頭介紹相同，只是不換行
  description:
    "品牌影音行銷不適用一套公式，量身打造雖費時費力，但成效會說話；品牌在社群上長期曝光，需要的是與時俱進的正確方向。",
} as const;

// 服務內容：每項一個標題 + 一句說明
export const BRAND_VIDEO_ITEMS = [
  {
    title: "客製化影音企劃",
    text: "依品牌定位與檔期規劃內容主題，例如品牌誕生、展店規劃、試營運到開幕的系列影音。",
  },
  {
    title: "系列短影音拍攝",
    text: "IG Reels、FB、TikTok 直式短影音，配合全年節慶與活動檔期持續產出。",
  },
  {
    title: "社群帳號經營",
    text: "FB、IG、Threads 帳號 AI 自動化營運，維持穩定的發文節奏。",
  },
  {
    title: "業配與廣告影片",
    text: "商品廣告影片製作、置入行銷與導購，以轉化率為目標。",
  },
  {
    title: "人物故事短影音",
    text: "為IP關鍵人物量身打造故事短影音，是介紹品牌的一項利器。",
  },
] as const;

// 服務方案與費用（負責人訂定的價格；市場行情原始整理在 素材/素材_給ai/短影音業界行情_整理.md）
// amount：放大顯示的金額（前面自動加「約」、後面加「元」）；unit：金額後面的「／月」這類小字
// caseLink：選填，交付內容下方的實際案例按鈕
export const MARKET_PRICES: {
  plan: string;
  deliverable: string;
  caseLink?: { label: string; url: string };
  period: string;
  amount: string;
  unit?: string;
  icon: "camera" | "star" | "calendar";
}[] = [
  {
    plan: "單次拍攝",
    deliverable: "網路業配影片 1 支",
    caseLink: { label: "實際案例：品牌 × 節目 × 公益", url: "https://youtu.be/0DEVAr1YG90" },
    period: "專案制",
    amount: "5–10 萬",
    icon: "camera",
  },
  {
    plan: "品牌IP打造",
    deliverable: "每月8支影片企劃製作",
    period: "",
    amount: "12 萬",
    unit: "／月",
    icon: "star",
  },
  {
    plan: "季約品牌代操",
    deliverable: "3 個月共 36 支：帳號規劃、腳本企劃、拍攝、剪輯後製、協助上片",
    period: "季約（3 個月）",
    amount: "40 萬",
    unit: "／季",
    icon: "calendar",
  },
];

export const MARKET_PRICE_NOTES = ["以上價格皆為未稅，實際費用依專案需求報價，我們提供專案優惠價。"] as const;

// 合作流程（依序顯示）；text 可省略，省略就只顯示標題
export const BRAND_VIDEO_STEPS: { title: string; text?: string }[] = [
  { title: "告知需求", text: "說明品牌現況、想拍攝的內容與預計時程。" },
  { title: "報價與匯款", text: "確認檔期。" },
  { title: "企劃、拍攝執行", text: "規劃企劃主題、並執行拍攝。" },
  { title: "剪輯後製", text: "剪輯版本的確認與交付。" },
  { title: "結案" },
];
