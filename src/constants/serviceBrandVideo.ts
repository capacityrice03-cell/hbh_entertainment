// 「品牌影音行銷」分頁（/services/brand-video/）的文字。
// 2026-11-01 負責人已確認內容。

export const BRAND_VIDEO = {
  title: "品牌影音行銷",
  en: "Brand Video Marketing",
  // 頁面開頭的一段介紹，也用在 Google 搜尋結果的描述
  intro:
    "品牌影音行銷是好不好娛樂為企業、品牌量身規劃的社群影音服務：從企劃、拍攝到剪輯一條龍，產出系列短影音與 Reels，並持續經營 FB、IG、Threads、TikTok 帳號，讓品牌在社群上長期曝光。",
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
    text: "FB、IG、Threads、TikTok 帳號 AI 自動化營運，維持穩定的發文節奏。",
  },
  {
    title: "業配與廣告影片",
    text: "商品廣告影片製作、置入行銷與導購，以轉化率為目標。",
  },
  {
    title: "人物故事短影音",
    text: "為主廚、創辦人等關鍵人物量身打造故事短影音，從人生轉折帶出品牌的意義。",
  },
] as const;

// 市場行情參考（整理自業界公開方案，不寫公司名稱；原始資料在 素材/素材_給ai/短影音業界行情_整理.md）
// detail：金額上方的小字；amount：放大顯示的金額（前面自動加「約」、後面加「元」）
export const MARKET_PRICES = [
  { type: "單次拍攝", detail: "網路業配", amount: "5 萬", icon: "camera" },
  { type: "季約品牌代操", detail: "3 個月 36 支", amount: "42 萬", icon: "calendar" },
  { type: "教學陪跑", detail: "每月", amount: "15 萬", icon: "teach" },
] as const;

export const MARKET_PRICE_NOTES = [
  "以上為市場行情參考（未稅），並非本公司報價。",
  "我們提供專案優惠價，將依照專案需求進行報價。",
] as const;

// 合作流程（依序顯示）；text 可省略，省略就只顯示標題
export const BRAND_VIDEO_STEPS: { title: string; text?: string }[] = [
  { title: "告知需求", text: "說明品牌現況、想拍攝的內容與預計時程。" },
  { title: "報價與匯款", text: "確認檔期。" },
  { title: "企劃、拍攝執行", text: "規劃企劃主題、並執行拍攝。" },
  { title: "剪輯後製", text: "剪輯版本的確認與交付。" },
  { title: "結案" },
];
