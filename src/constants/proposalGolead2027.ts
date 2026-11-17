// 提案簡報頁 /proposal/golead-2027/ 的文字內容。
// 來源：Rice 提供的「宏力移動 2027 年度影音與品牌整合行銷企劃書.docx」（主要內容，逐字照用）
// 與「宏力移動 2027 影音拍攝企劃_compressed.pdf」（各頁大標、成長願景、結語）。
// 這一頁不放進首頁選單和 sitemap，也不讓搜尋引擎收錄。

export const PROPOSAL = {
  path: "/proposal/golead-2027/",
  title: "宏力移動 2027 年度影音與品牌整合行銷企劃書",
  client: "宏力移動",
  /** 封面第二行（第一行是 client） */
  subtitle: "年度影音與品牌整合行銷企劃書",
  clientEn: "Go Lead Mobility",
  byline: "2027 年度策略提案｜好不好娛樂企劃團隊",
  axes: ["企劃", "影像", "平台", "實體活動"],
  footer: "宏力移動 2027｜好不好娛樂",
};

export const SUMMARY = {
  intro:
    "本企劃案由好不好娛樂 (Haobuhao Entertainment) 專業團隊規劃，旨在全方位重塑「宏力移動 (Go Lead Mobility)」之品牌形象與市場定位。",
  items: [
    { label: "提案單位", text: "好不好娛樂 (Haobuhao Entertainment)" },
    {
      label: "專案目標",
      text: "透過「企劃 x 影像 x 平台 x 實體活動」的垂直整合策略，將「宏力移動」的核心理念，真正與駕駛夥伴站在一起的團隊，打造「司機專屬經紀人」的品牌定位，透過社群媒體帳號推廣。",
    },
    {
      label: "核心策略",
      text: "運用每月 8 支短影音構成的「內容矩陣」，結合線上社群互動與線下實體活動，達成「品牌形象強化」與「精準招募轉單」雙重目標。",
    },
  ],
};

export const POSITIONING = {
  core: {
    title: "你的「專屬司機經紀人」",
    text: "打破傳統車行僅出租車輛的單向關係，宏力移動以經紀人角色出發，提供全方位的職涯保障、法律後援與實體後勤支援，成為司機最堅實的後盾。",
  },
  personas: [
    { name: "專業", text: "深耕法規解析、事故肇責拆解與營業實戰經驗分享。" },
    { name: "溫暖", text: "以人為本，展現守護司機職涯與家庭生活的堅強後盾形象。" },
    { name: "科技", text: "布局綠能純電世代，展現移動科技、時代尖端與永續營運的未來願景。" },
  ],
};

export const PAIN_POINTS = [
  {
    no: "01",
    name: "資金不足",
    pain: "想入行但缺乏購車預算，擔心長期租賃合約綁死。",
    solution: "強打「0 成本上路」、「免租免買免綁約」彈性方案。",
    appeal: "低門檻極速開工，降低創業與轉職壓力。",
  },
  {
    no: "02",
    name: "風險擔憂",
    pain: "害怕路上發生車禍事故影響收入，缺乏專業知識資源。",
    solution: "強調「保障收入 $53,400 起」、專屬小幫手全天候輔導、專屬團隊陪伴處理車禍。",
    appeal: "提供完備的安全氣袋，將意外損失降至最低。",
  },
  {
    no: "03",
    name: "孤軍奮戰",
    pain: "獨自跑車缺乏歸屬感，遇到經營瓶頸無人協助。",
    solution: "展現車隊強大後勤支援、月會聚餐、榮譽頒獎等內部向心力活動。",
    appeal: "加入團隊共享資源，不再一個人單打獨鬥。",
  },
];

export const MATRIX_INTRO = {
  text: "本案規劃每月產出 8 支短影音，透過黃金比例分配，兼顧品牌高度、自然流量爆發力與商業轉單率。",
  note: "【品牌矩陣月配比】會視每個月不同情況做戰略規劃調整。",
};

export type Pillar = {
  no: string;
  tag: string;
  title: string;
  count: string;
  /** 總覽長條的寬度比例（以 8 支為滿） */
  share: number;
  appeal: string;
  directions: { title: string; text: string; link?: { label: string; url: string } }[];
};

export const PILLARS: Pillar[] = [
  {
    no: "01",
    tag: "品牌護城河",
    title: "認同深化故事",
    count: "0-1 支/月",
    share: 1,
    appeal: "建立情感共鳴與企業高度，拉開與傳統車行的品牌差距。",
    directions: [
      {
        title: "每個方向盤後的守護者",
        text: "採用暖廚家味敘事風格，微電影敘事，故事呈現司機為人生奮鬥的真實故事，展現宏力在背後的默默支持。",
        link: { label: "範例連結", url: "https://www.instagram.com/p/DRhO1ItE2uj/" },
      },
      {
        title: "創辦人理念與宏力願景",
        text: "高質感深度訪談，傳達「尊重司機、翻轉產業」的企業精神。",
      },
      {
        title: "宏力電動無人車計畫願景",
        text: "結合綠能純電趨勢，展現未來移動科技與前瞻營運布局。",
      },
    ],
  },
  {
    no: "02",
    tag: "差異化吸力",
    title: "車禍事故探討專家",
    count: "3-4 支/月",
    share: 4,
    appeal: "結合時事熱點，創造自然流量，展現「經紀人」專業知識後盾，吸引同行注意並增加跳槽吸力。",
    directions: [
      { title: "時事蹭熱度", text: "快速解析近期熱門交通新聞、重大事故之肇責劃分。" },
      {
        title: "事故肇責討論、真實案例分享",
        text: "以行車紀錄器畫面展示議題，例如「轉彎車對直行車，真的絕對錯嗎？」。",
      },
      { title: "核心", text: "影片穿插置入品牌「宏力團隊」。" },
    ],
  },
  {
    no: "03",
    tag: "企業向心力",
    title: "線下活動與講座紀錄",
    count: "1-2 支/月",
    share: 2,
    appeal: "對內凝聚士氣，對外展現龐大資源與歸屬感。",
    directions: [
      { title: "宏力領航者月會紀錄", text: "捕捉歡樂聚餐、優秀司機榮譽頒獎與夥伴交流對談畫面。" },
      {
        title: "達人/名人講堂",
        text: "精華紀錄宏力邀請理財、健康保養等領域專家演講及司機 Q&A 互動亮點。",
      },
    ],
  },
  {
    no: "04",
    tag: "直擊痛點轉單",
    title: "實戰心法、司機互動與招募相關",
    count: "至少 2 支/月",
    share: 2,
    appeal: "消除入行疑慮，透過社群互動機制直接獲取潛在名單 (Lead Generation)。",
    directions: [
      { title: "「營業神單」大公開", text: "真實開箱月入 10 萬報表，邀請資深學長無私分享實戰接單心法。" },
      {
        title: "留言互動機制",
        text: "引導觀眾於評論區留言指定關鍵字（如：「想賺錢」），自動觸發私訊發送「隱藏爆單熱區圖」以獲取高意向名單。",
      },
      { title: "招募實測", text: "短影音實測，直擊新手從諮詢到順利加入的完整流程。" },
    ],
  },
];

export const OFFLINE = {
  intro: "為將線上流量有效轉化為實體招募成果，規劃三大地推與公關活動戰線：",
  fronts: [
    {
      title: "實體活動",
      note: "額外討論是否有預算進行",
      items: [{ title: "快閃攤位/展示", text: "或於重點商圈或人潮聚集地，提供現場諮詢。" }],
    },
    {
      title: "考試地推",
      note: "精準攔截",
      items: [
        { title: "考場應援站", text: "於計程車執業登記證考場外設立「宏力補給站」，提供考試應援物資。" },
        {
          title: "實體互動",
          text: "現場發放「考前必過秘笈」，引導應試者掃描 QR Code 加入 LINE 官方帳號獲取完整資料。",
        },
      ],
    },
    {
      title: "訪問",
      note: "真實社群素材",
      items: [
        {
          title: "運將訪問",
          text: "月會時訪問司機，或是外面找他行或自營的uber司機，蒐集對業界痛點的真實情況，反向凸顯宏力專屬經紀人的制度優勢。",
        },
        {
          title: "乘客街訪",
          text: "收集消費者對宏力純電車隊與服務品質的真實好評，作為品牌口碑背書。",
        },
      ],
    },
  ],
};

export const FUNNEL = {
  note: "進行效果評估；廣告效益長期追蹤觀察。",
  stages: [
    {
      name: "品牌聲量",
      en: "Top of Funnel",
      text: "影音總觀看數、完播率、社群互動率、品牌關鍵字搜尋量",
    },
    {
      name: "名單獲取",
      en: "Middle of Funnel",
      text: "短影音留言私訊數、LINE 官方帳號 (@UberGo) 新增好友數",
    },
    {
      name: "轉換率",
      en: "Bottom of Funnel",
      text: "預約面談數、實際簽約上線率、CPA (每次獲取名單成本)",
    },
  ],
};

export const KPIS = [
  {
    stage: "品牌聲量",
    en: "Brand Awareness",
    metrics: ["影音觀看次數 (Views)", "平均完播率 (Completion Rate)", "社群互動率 (Engagement Rate)", "品牌關鍵字搜尋量"],
    goal: "全面提升宏力移動在全台司機圈之知名度，樹立「專屬經紀人」之第一品牌聯想。",
  },
  {
    stage: "名單獲取",
    en: "Lead Generation",
    metrics: ["短影音索取資料互動數", "LINE 官方號 (@UberGo) 增粉數", "地推掃碼加入數"],
    goal: "建立穩定的潛在司機名單庫，透過自動化私訊進行初步意向篩選。",
  },
  {
    stage: "轉換效益",
    en: "Conversion Rate",
    metrics: ["預約實體面談人數", "最終簽約上線人數", "每位加盟獲客成本 (CPA)"],
    goal: "名單順利進入面談與簽約階段，優化招募成本並提升車隊擴張速度。",
  },
];

// 以下兩段取自 PDF 簡報（文字檔沒有這兩頁）
export const GROWTH = {
  title: "從首選經紀人品牌，走向規模化成長",
  steps: [
    { no: "01", name: "品牌首選", text: "建立司機首選經紀人定位" },
    { no: "02", name: "社群忠誠", text: "強化歸屬感與長期信任" },
    { no: "03", name: "車隊規模", text: "擴大車隊與市場佔有率" },
    { no: "04", name: "持續創新", text: "影音 × O2O 不斷迭代" },
  ],
  closing: "品牌透過每一次的拍攝，每一場活動，形成可以累積的成長系統。",
};

export const ENDING = {
  title: "謝謝收看",
  byline: "好不好娛樂｜品牌策略・影音企劃・整合行銷",
  recap: [
    { name: "司機專屬經紀人", text: "以專業、溫暖、科技重塑品牌" },
    { name: "四大影音內容柱", text: "故事・陪伴・活動・招募" },
    { name: "O2O × KPI", text: "把互動轉為名單，把名單轉為陣容" },
  ],
  closing: "創造宏力移動的品牌能見度與招募司機成長。",
};
