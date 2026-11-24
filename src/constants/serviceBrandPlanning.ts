// 「品牌LOGO設計展店規劃」分頁（/services/brand-planning/）的文字。
// 來源：食包食粽專案資料夾的 PDF（品牌形象方案、品牌設計方向）；開頭介紹和各段導語是 Rice 選定的版本。
// 合約條款（修改次數、重新收費）不放（Rice 2026-11-24）。

export const BRAND_PLANNING = {
  // Rice 2026-11-24：頁名從「自創品牌運營規劃」改成跟首頁標籤一樣
  title: "品牌LOGO設計展店規劃",
  en: "Brand Planning",
  // Rice 2026-11-24 選 A 版
  intro: "從品牌定位、LOGO 到店面與菜單，陪品牌把第一間店做出來",
  // Google 搜尋結果與結構化資料用的描述（畫面上看不到）
  description:
    "食包食粽案例：品牌設計方向、LOGO、店面視覺、電子菜單與紙本菜單，以及實際店面照片。好不好娛樂的品牌形象方案內容。",
} as const;

// 服務內容：好不好娛樂_品牌形象方案_內容.pdf 第 1、3、4、5、7、8 頁（逐字）
export const PLAN = {
  title: "品牌形象方案",
  en: "Brand Image Plan",
  cards: [
    { no: "01", title: "基本設計系統開發", text: "高強度識別性視覺設計，包含字體、圖形、顏色、符號等。" },
    {
      no: "02",
      title: "菜單設計",
      text: "專業菜單設計，包含 A4 紙本菜單 2 頁與電子菜單 4 面，提升品牌形象，優化顧客體驗，增加銷售機會。",
    },
    {
      no: "03",
      title: "店面形象視覺規劃",
      text: "包括櫃檯下方牆面設計、小招牌規劃及兩面電子看板，打造專業且吸引人的品牌形象，提升顧客體驗。",
    },
  ],
  systemTitle: "基本系統開發",
  system: [
    { item: "標誌設計(LOGO)", text: "" },
    { item: "標誌精緻化", text: "將定案的標誌依各種視覺特性作修飾及視覺精緻化作業" },
    { item: "標準色彩", text: "依定位規劃品牌的使用色彩" },
    { item: "中英文標準字", text: "依標誌特性發展設計中英文標準字體" },
    { item: "指定印刷字體", text: "指定品牌印刷品專用字體" },
    { item: "確立標準組合模式", text: "商標、色彩、字體與象徵圖型基本組合與編排模式的訂定" },
  ],
  appTitle: "品牌應用系統設計項目",
  app: [
    { group: "(一) 應用設計", items: ["A4 紙本菜單設計2面", "電子菜單設計4面"] },
    {
      group: "(二) 環境風格",
      note: "（依實際外觀需求評估規劃）",
      items: ["店面吧檯視覺規劃", "電子看板圖文設計2面"],
    },
  ],
} as const;

// 案例：食包食粽。步驟名稱照 Rice 給的順序
export const CASE = {
  title: "食包食粽",
  steps: [
    // lead：各段導語（Rice 2026-11-24 選 A 版）
    { id: "direction", no: "01", title: "品牌設計方向" },
    { id: "logo", no: "02", title: "LOGO", lead: "以文字為核心，把刈包與粽子的形象融進字形" },
    { id: "store", no: "03", title: "店面視覺", lead: "把品牌視覺帶進形象牆與櫃檯，打造專業且吸引人的店面" },
    { id: "menu", no: "04", title: "電子菜單／紙本菜單", lead: "電子菜單 4 面、紙本菜單 2 面，提升品牌形象" },
    { id: "photos", no: "05", title: "實際店面照片", lead: "完工後的實際店面" },
  ],
  // 品牌設計方向.pdf 第 3 頁的標題與說明（逐字）
  directionHead: "台式經典，風味新生",
  directionText: "將刈包與粽子，從節慶與回憶中，帶入每日生活與旅途場景",
} as const;

const D = "/images/brand-planning";

// 品牌設計方向的投影片（PDF 第 2、3、4、5、6、12 頁）
export const DIRECTION_SLIDES = [
  { src: `${D}/direction-02.jpg`, alt: "食包食粽品牌設計方向：從市場到餐桌" },
  { src: `${D}/direction-03.jpg`, alt: "食包食粽品牌設計方向：台式經典，風味新生" },
  { src: `${D}/direction-04.jpg`, alt: "食包食粽品牌設計方向：刈包" },
  { src: `${D}/direction-05.jpg`, alt: "食包食粽品牌設計方向：粽子" },
  { src: `${D}/direction-06.jpg`, alt: "食包食粽品牌設計方向：關鍵賣點" },
  { src: `${D}/direction-12.jpg`, alt: "食包食粽品牌設計方向：菜單規劃" },
] as const;

export const LOGO_IMAGES = {
  story: { src: `${D}/logo-story.jpg`, w: 2000, h: 3760, alt: "食包食粽 LOGO 與設計說明" },
  type: { src: `${D}/logo-type.jpg`, w: 2000, h: 1170, alt: "食包食粽標準字體" },
  color: { src: `${D}/logo-color.jpg`, w: 2000, h: 1480, alt: "食包食粽標準色彩" },
  combo: { src: `${D}/logo-combo.jpg`, w: 2000, h: 2080, alt: "食包食粽 LOGO 與標準字排列組合" },
  apply: { src: `${D}/logo-apply.jpg`, w: 2000, h: 1872, alt: "食包食粽 LOGO 色彩應用" },
} as const;

export const STORE_IMAGES = {
  mockup: { src: `${D}/store-mockup.jpg`, w: 2000, h: 1160, alt: "食包食粽店面形象模擬圖", label: "店面形象模擬" },
  wall: { src: `${D}/store-wall.jpg`, w: 2000, h: 1140, alt: "食包食粽形象牆設計稿", label: "形象牆" },
} as const;

export const MENU_PAPER = [
  { src: `${D}/menu-paper-front.jpg`, w: 1140, h: 820, alt: "食包食粽紙本菜單正面", label: "正面" },
  { src: `${D}/menu-paper-back.jpg`, w: 1130, h: 820, alt: "食包食粽紙本菜單背面", label: "背面" },
] as const;

export const MENU_DIGITAL = [1, 2, 3, 4].map((n) => ({
  src: `${D}/emenu-${n}.jpg`,
  w: 1920,
  h: 1080,
  alt: `食包食粽電子菜單 第 ${n} 面`,
}));

// 實際店面照片（8 張；w、h 為縮圖後尺寸）
export const STORE_PHOTOS = [
  { n: 1, w: 2000, h: 1125 },
  { n: 2, w: 2000, h: 1125 },
  { n: 3, w: 2000, h: 1125 },
  { n: 4, w: 1125, h: 2000 },
  { n: 5, w: 2000, h: 1125 },
  { n: 6, w: 2000, h: 1125 },
  { n: 7, w: 1125, h: 2000 },
  { n: 8, w: 1125, h: 2000 },
].map((p) => ({ src: `${D}/store-photo-${p.n}.jpg`, w: p.w, h: p.h, alt: `食包食粽實際店面照片 ${p.n}` }));
