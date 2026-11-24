// 「品牌LOGO設計展店規劃」分頁（/services/brand-planning/）的文字。
// 來源：食包食粽專案資料夾的 PDF（品牌形象方案、品牌設計方向）；開頭介紹和各段導語是 Rice 選定的版本。
// 合約條款（修改次數、重新收費）不放（Rice 2026-11-24）。

export const BRAND_PLANNING = {
  // Rice 2026-11-24：頁名從「自創品牌運營規劃」改成跟首頁標籤一樣
  title: "品牌LOGO設計展店規劃",
  // 頁面最上面的大標題，分兩行顯示（Rice 2026-11-25）
  heading: ["品牌LOGO設計", "(店面設計規劃)"],
  // 大標題上方的小字（Rice 2026-11-25 從 Brand Planning 改）
  en: "京站美食街實體店面",
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
      text: "專業菜單設計，包含 紙本菜單 與 電子菜單，提升品牌形象，優化顧客體驗。",
    },
    {
      no: "03",
      title: "店面形象視覺規劃",
      text: "包括櫃檯下方牆面設計、小招牌規劃及電子看板，打造專業且吸引人的品牌形象，提升顧客體驗。",
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
    { group: "(一) 應用設計", items: ["A4 紙本菜單設計", "電子菜單設計"] },
    {
      group: "(二) 環境風格",
      note: "（依實際外觀需求評估規劃）",
      items: ["店面吧檯視覺規劃", "電子看板圖文設計"],
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

export const LOGO_IMAGES = {
  story: { src: `${D}/logo-story.jpg`, w: 2000, h: 3125, alt: "食包食粽 LOGO 與設計說明" }, // 去掉上方白色區，LOGO 用 .ai 轉出的透明底 PNG（Rice 2026-11-25）
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

// 品牌設計方向（品牌設計方向.pdf 第 2、3、4、5、6、12 頁，文字逐字）。
// 第 3 頁「台式經典，風味新生」兩句已放在 CASE.directionHead／directionText，這裡不重複。
// 照片 dir-a／b／c／d1～d4 為生圖師產的情境示意圖（4:3），alt 都寫「情境示意圖」。
export const DIRECTION = {
  story: {
    title: "從市場到餐桌：六十年的傳承滋味",
    paragraphs: [
      "來自傳統市場超過六十年的傳承，背後是幾代人對味道的堅持！",
      "「食包食粽」將家的溫暖帶進每一口。\n我們的故事始於市場的角落，延續至今日的創新。",
    ],
    photo: { src: `${D}/dir-a.jpg`, w: 1200, h: 900, alt: "情境示意圖：盤中的刈包" },
  },
  circles: ["傳統\n台味", "創新\n風味"],
  bao: {
    title: "刈包，新一代的台式漢堡",
    paragraphs: [
      "刈包，用一張手工蒸製的半月包子，夾起台灣最柔軟的五花肉、最香的酸菜與花生糖粉。",
      "如今，我們翻轉這份記憶，選用吃益生菌長大的豬；以特選牛腹肉，是吃得見肉質、咬得出誠意的台灣風味堡，不再只是懷舊，而是你能隨手帶走、認真咀嚼的「新一代台灣漢堡」",
    ],
    photo: { src: `${D}/dir-b.jpg`, w: 1200, h: 900, alt: "情境示意圖：手拿刈包" },
  },
  zongzi: {
    title: "粽子，是包裹四季風味的日常小食",
    paragraphs: [
      "粽子不該只出現在節日那天，而應該成為日常的驚喜。",
      "粽葉襯香的台灣圓糯米，每一顆粽子，都能是你便當盒裡的主角，或想念台灣味的解答。\n粽子，不只是習俗，而是你的生活食帖。",
    ],
    photo: { src: `${D}/dir-c.jpg`, w: 1200, h: 900, alt: "情境示意圖：肉粽" },
  },
  points: {
    title: "關鍵賣點",
    items: [
      { text: "單手享用，方便帶走", src: `${D}/dir-d1.jpg`, alt: "情境示意圖：單手享用、方便帶走" },
      { text: "北車商圈優勢，旅人需求導向", src: `${D}/dir-d2.jpg`, alt: "情境示意圖：北車商圈、旅人需求" },
      { text: "食材講究，口味新穎", src: `${D}/dir-d3.jpg`, alt: "情境示意圖：食材講究、口味新穎" },
      { text: "可視覺化、可話題化、可送禮", src: `${D}/dir-d4.jpg`, alt: "情境示意圖：可視覺化、可話題化、可送禮" },
    ],
  },
  menu: {
    title: "菜單規劃",
    text: "菜單規劃採「圖文搭配＋套餐式」呈現，透過視覺引導與組合優惠策略，鼓勵顧客選擇雙品組合或加價升級，進一步提升營業額與客單價。",
    // 我們自己設計的菜單：紙本菜單正面、電子菜單第 1 面
    images: [MENU_PAPER[0], MENU_DIGITAL[0]],
  },
} as const;

// 實際店面照片（w、h 為縮圖後尺寸）；直式的 4、7、8 張 Rice 2026-11-25 要求刪除
export const STORE_PHOTOS = [
  { n: 1, w: 2000, h: 1125 },
  { n: 2, w: 2000, h: 1125 },
  { n: 3, w: 2000, h: 1125 },
  { n: 5, w: 2000, h: 1125 },
  { n: 6, w: 2000, h: 1125 },
].map((p) => ({ src: `${D}/store-photo-${p.n}.jpg`, w: p.w, h: p.h, alt: `食包食粽實際店面照片 ${p.n}` }));
