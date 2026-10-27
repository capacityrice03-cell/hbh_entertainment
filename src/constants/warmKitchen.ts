// 《暖廚家味 Taste of Love》代表作品專區
// 資料來源：素材/素材_暖廚家味（圖片、連結.txt）與 https://warmlearning.com/

export const WARM = {
  website: "https://warmlearning.com/",
  title: "暖廚家味 Taste of Love",
  subtitle: "米其林主廚 × 公益料理實境節目",
  intro:
    "集結跨國名廚走進廚房與家人做菜的料理實境節目，在 TVBS 播出；再將主廚招牌料理製作成線上課程販售募資，所得全數捐贈 1919 食物銀行，化為食物包送到需要的家庭。",
  poster: { src: "/images/warm-poster.jpg", alt: "暖廚家味 2025 主視覺：5 位暖廚 15 道招牌料理" },
} as const;

/** 節目 → 課程 → 公益 的運作流程 */
export const WARM_FLOW = [
  { title: "料理實境節目", note: "TVBS 播出" },
  { title: "線上課程募資", note: "ShiFu 線上課程平台" },
  { title: "1919 食物銀行", note: "全數捐贈" },
  { title: "食物包送到家", note: "志工環台親送" },
] as const;

export const WARM_METRICS = [
  { value: "3,300萬+", label: "線上課程募資金額" },
  { value: "8,144份", label: "第一季捐出食物包" },
  { value: "1,357戶", label: "弱勢、急難家庭受助" },
  { value: "1,300公里", label: "志工環台親送" },
] as const;

export const WARM_CHEFS = [
  { name: "鄔海明", title: "晶華軒主廚" },
  { name: "林麗珠", title: "明福台菜創辦人" },
  { name: "陳嵐舒", title: "樂沐 Le Mout 創辦人" },
  { name: "李信男 Nobu", title: "NOBUO 創辦人" },
  { name: "萩本郡大 Kuni", title: "INITA 創辦人" },
] as const;

/** TVBS 播出與新聞報導 */
export const WARM_MEDIA = {
  newsVideo: {
    src: "/videos/warm-news.mp4",
    poster: "/images/warm-news.jpg",
    caption: "TVBS 新聞台報導《暖廚家味》記者會",
  },
  episodes: [
    { src: "/images/warm-tvbs-1.jpg", alt: "暖廚家味 實境版：開箱米其林主廚江振誠的家，與母親廚藝大對決" },
    { src: "/images/warm-tvbs-2.jpg", alt: "暖廚家味第二季 實境版：晶華軒鄔海明，市場生鮮挑選密笈大公開" },
  ],
  episodesCaption: "TVBS 娛樂頭條《暖廚家味》實境版",
  photos: [
    { src: "/images/warm-team.jpg", alt: "暖廚家味 2025 記者會幕後團隊合照", caption: "記者會幕後團隊" },
    { src: "/images/warm-volunteer.jpg", alt: "穿著 1919 食物銀行背心的志工與食物包", caption: "1919 食物銀行 親送食物包" },
  ],
} as const;

/** 短影音 Reels（views 單位：萬次觀看） */
export const WARM_REELS = [
  {
    src: "/images/warm-reel-nobu.jpg",
    chef: "NOBUO 李信男主廚",
    hook: "退學負債，也要闖出亮眼舞台",
    views: 100,
    url: "https://www.instagram.com/reel/DRhO1ItE2uj/",
  },
  {
    src: "/images/warm-reel-mingfu.jpg",
    chef: "明福台菜 麗珠阿姨",
    hook: "別說不可能",
    views: 55.3,
    url: "https://www.instagram.com/reel/DQ4AulIE6IW/",
  },
  {
    src: "/images/warm-reel-kuni.jpg",
    chef: "INITA Kuni 桑主廚",
    hook: "想都沒想就答應",
    views: 53.8,
    url: "https://www.instagram.com/reel/DTNhQWJk2_I/",
  },
] as const;

export const WARM_CELEBRATION_REEL = {
  label: "線上課程募資突破 3,300 萬｜慶功 Reels",
  url: "https://www.instagram.com/reel/DWTrGgSzu9n/",
} as const;
