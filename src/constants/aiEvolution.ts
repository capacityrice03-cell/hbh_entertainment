// 「AI 自動化社群：版型調整過程」分頁 /ai-social-evolution/ 的文字與圖片（Rice 2026-11-17）
// 不寫日期、不寫個人評語；圖片放 public/images/ai-evolution/

export const AI_EVOLUTION = {
  title: "AI 自動化社群：版型調整過程",
  en: "Card layout evolution",
  intro:
    "好不好娛樂的 AI 動物小編每天自動產圖、發文。這一頁整理圖卡版型從第一版到現在的每一次調整。",
  backLabel: "回到 AI自動化社群更新",
  backHref: "/#ig-feed",
};

export type EvolutionImage = {
  src: string;
  width: number;
  height: number;
  caption?: string;
  /** 寬圖：獨佔一整排 */
  wide?: boolean;
  /** 寬圖再放大到跟文字一樣寬（張數多、字小的對照圖用） */
  full?: boolean;
};

export type EvolutionStep = {
  title: string;
  text: string;
  images: EvolutionImage[];
  /** 電腦版一排幾張（預設 3） */
  cols?: 3 | 4;
};

const P = "/images/ai-evolution/";
const tall = (name: string, caption?: string, height = 900): EvolutionImage => ({
  src: `${P}${name}.jpg`,
  width: 720,
  height,
  caption,
});

export const AI_EVOLUTION_STEPS: EvolutionStep[] = [
  {
    title: "只有照片",
    text: "畫風定為寫實電影感，不用 3D、不用插畫，圖上還沒有字。",
    images: [tall("v0_photo", "第一批貼文", 894)],
  },
  {
    title: "資訊卡第一版：品牌藍黃",
    text: "照片框在深藍底上，下方放大標題，關鍵字套亮黃底色。一篇約 5 張，內頁是米色底的條列。文字由程式排版，不交給 AI 畫。",
    images: [
      tall("v1_card_a"),
      tall("v1_card_b", "首頁卡"),
      { src: `${P}v1_test.jpg`, width: 1400, height: 436, caption: "同一篇的首頁和內頁", wide: true },
    ],
  },
  {
    title: "加入莫蘭迪配色，條列不再只有長方形",
    text: "新增多套低飽和配色輪流使用。內頁條列改成膠囊、對話泡泡、便利貼等樣式輪流，並加入圓弧和漸層。",
    images: [tall("v2_card", "芥末黃"), tall("v2c_udm", "鼠尾草綠"), tall("v2_fb", "FB 場景圖，三條色帶")],
  },
  {
    title: "強調詞不一定加底色",
    text: "標題的重點字可以用底色框、底線，或不加，依字的強弱決定。",
    images: [tall("v3_ig", "底線樣式")],
  },
  {
    title: "首頁改成滿版漸層",
    text: "比較三種版型後選定：照片鋪滿，下半部漸層融進底色，大標題壓在上面。FB 同步改版，亮黃不再當主視覺。強調框那一行只放框內的字，其餘推到下一行。",
    images: [
      // Rice 2026-11-18：只留對照圖最上面一排三張＋Threads 首頁，共四張一排
      tall("v3_s1_a"),
      tall("v3_s1_b"),
      tall("v3_s1_c"),
      tall("v3_threads", "Threads 首頁"),
    ],
    cols: 4,
  },
  {
    title: "照片封面登場",
    text: "滿版示意照片加白字黑邊大標題，跟滿版漸層圖卡並排比較。",
    images: [
      { src: `${P}v4_compare.jpg`, width: 1400, height: 867, caption: "左為圖卡，右為照片封面", wide: true },
    ],
  },
  {
    title: "重點卡：實用內容改用滿版單色卡",
    text: "清單、步驟類的內容用重點卡，每張只用底色、字色、強調色三色，三套配色輪流。",
    images: [tall("v5_C", "灰紅"), tall("v5_F", "青碧"), tall("v5_W", "暖米")],
  },
  {
    title: "現在：照片封面為主",
    text: "新聞、趣聞類發一張照片封面，內容寫在貼文裡；實用類試驗照片封面加重點卡。",
    images: [tall("v4b_cover", "照片封面"), tall("v6_cover", "照片封面")],
  },
  {
    // Rice 2026-11-19：新的重點字卡設計，放在最新位置。標題、說明文字待 Rice 挑版本
    title: "新版重點字卡：照片、郵戳、小情報",
    text: "重點字卡加上照片和郵戳圖章，條列下方多一格當地小情報；清單類內容另有一款列表版。",
    images: [{ src: `${P}v7_cards.jpg`, width: 1600, height: 989, wide: true, full: true }],
  },
];

export const AI_EVOLUTION_PALETTES = {
  title: "同一篇貼文 × 11 套配色",
  text: "同一篇內容套上不同配色，每欄由上到下是 IG 首頁、IG 內頁、重點卡。",
  image: { src: `${P}palettes.jpg`, width: 1600, height: 2199 },
};
