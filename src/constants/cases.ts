import type { CaseStudy } from "@/types";

// 內容整理自《好不好娛樂_公司簡介2024V1》簡報
export const CASES: CaseStudy[] = [
  {
    id: "chi-vlog",
    title: "品牌自媒體｜從零開始的品牌 VLOG",
    subtitle: "炸綺來 鹹酥雞新品牌誕生",
    client: "炸綺來",
    services: ["channel", "commercial", "event"],
    description:
      "依照需求為品牌量身打造自媒體經營規劃，以實境拍攝紀錄品牌從誕生、展店、試營運到盛大開幕的過程，再將內容投放至網路社群、實體店面與街頭廣告版面。",
    highlights: [
      "統籌、企劃、執行、攝影、剪輯一條龍",
      "四集系列：品牌誕生、展店規劃、試營運活動、開幕記者會",
      "全年度節慶與活動檔期，長期持續性曝光",
    ],
    images: [
      { src: "/images/chi-ep04.jpg", alt: "炸綺來 Ep.04 盛大開幕記者會" },
      { src: "/images/chi-ep01.jpg", alt: "炸綺來 Ep.01 鹹酥雞品牌誕生" },
      { src: "/images/chi-ep02.jpg", alt: "炸綺來 Ep.02 展店規劃" },
      { src: "/images/chi-ep03.jpg", alt: "炸綺來 Ep.03 試營運活動" },
    ],
    metrics: [
      { value: "194萬", label: "台南永康店開幕 自然曝光" },
      { value: "39.9萬", label: "台北京站店開幕 自然曝光" },
      { value: "368萬", label: "單支短影音播放" },
    ],
    links: [
      { label: "Ep.01 品牌誕生", url: "https://youtu.be/mKr5qE1s-5A" },
      { label: "Ep.02 展店規劃", url: "https://youtu.be/bqOzOKDlYSQ" },
      { label: "Ep.03 試營運活動", url: "https://youtu.be/TABMIosjn3s" },
      { label: "Ep.04 開幕記者會", url: "https://youtu.be/6EXJEHtxD3c" },
      {
        label: "IG Reels / FB 短影音",
        url: "https://youtube.com/playlist?list=PLWaU_EMlsoBpjwS9AXaFxXhoZCZSU9Ye8",
      },
    ],
  },
  {
    id: "chi-opening",
    title: "品牌活動｜門市開幕記者會",
    subtitle: "2022.05 台中開幕・2024.11 台北京站開幕",
    client: "炸綺來",
    services: ["event", "media"],
    description:
      "從活動企劃、藝人邀約、現場執行到活動影音紀錄，打造人潮滿滿的開幕記者會，並同步在社群擴散。",
    highlights: ["藝人站台與粉絲互動", "現場活動影音紀錄", "社群與新聞同步曝光"],
    images: [
      { src: "/images/taichung-02.jpg", alt: "台中開幕記者會排隊人潮" },
      { src: "/images/taipei-02.jpg", alt: "台北京站開幕現場" },
      { src: "/images/taichung-01.jpg", alt: "台中開幕藝人與餐點" },
      { src: "/images/taipei-03.jpg", alt: "台北京站開幕與粉絲合照" },
    ],
    links: [
      { label: "2022 台中開幕影音", url: "https://youtu.be/6EXJEHtxD3c" },
      { label: "2024 台北京站開幕影音", url: "https://youtu.be/ZBzHC49nDA4" },
    ],
  },
  {
    id: "hydrafacial",
    title: "品牌活動｜KOL × 快閃店 × 新客體驗",
    subtitle: "以快閃店提升知名度、獲取新客",
    client: "Hydrafacial",
    services: ["sponsored", "event", "commercial"],
    description:
      "串連品牌端、快閃店、KOL 與廣告四個環節：KOL 現身快閃店體驗，同步拍攝形象影片，帶動現場人潮與線上聲量。",
    highlights: ["KOL 現場體驗與粉絲見面", "快閃店活動執行", "形象影片拍攝"],
    images: [
      { src: "/images/hydra-02.jpg", alt: "KOL 於快閃店化妝準備" },
      { src: "/images/hydra-01.jpg", alt: "快閃店現場體驗" },
      { src: "/images/hydra-03.jpg", alt: "快閃店主視覺看板" },
      { src: "/images/hydra-04.jpg", alt: "快閃店外排隊人潮" },
    ],
    links: [{ label: "形象影片", url: "https://youtu.be/KoawbCiQWes" }],
  },
  {
    id: "live-commerce",
    title: "EFP 多機導播系統 × 帶貨直播",
    client: "品牌端 × KOL × MCN",
    services: ["efp", "sponsored"],
    description:
      "整合品牌端、KOL 與 MCN 三方資源，以 EFP 多機導播系統執行帶貨直播，從棚內佈燈、導播到多平台推流一手包辦。",
    highlights: ["多機位導播系統", "棚內燈光與場景佈置", "電商帶貨直播操作"],
    images: [
      { src: "/images/live-shop-01.jpg", alt: "直播攝影棚現場" },
      { src: "/images/live-shop-02.jpg", alt: "帶貨直播現場" },
      { src: "/images/live-shop-03.jpg", alt: "直播節目音樂演出" },
      { src: "/images/live-shop-04.jpg", alt: "直播導播控制台" },
    ],
  },
  {
    id: "live-event",
    title: "EFP 多機導播系統 × 活動直播",
    subtitle: "活動現場多平台串流直播",
    client: "原繞臺北城－原住民族文化節 等",
    services: ["efp", "event"],
    description:
      "講座、演唱會、大型戶外文化節，皆可提供多機作業與多平台同步串流，讓無法到場的觀眾也能即時參與。",
    highlights: ["演講講座直播", "大型舞台演出直播", "多平台同步串流"],
    images: [
      { src: "/images/live-event-01.jpg", alt: "大型舞台演出直播" },
      { src: "/images/live-event-02.jpg", alt: "演講廳直播導播台" },
      { src: "/images/live-event-03.jpg", alt: "文化節舞台演出" },
      { src: "/images/live-event-04.jpg", alt: "直播導播畫面" },
    ],
    links: [{ label: "活動直播紀錄", url: "https://youtu.be/M8vWWhzcPao" }],
  },
  {
    id: "duck-hotpot",
    title: "品牌行銷｜客製化ODM × 影像 × 電商",
    subtitle: "李熊鴨霸 胡椒鴨火鍋",
    services: ["sponsored", "commercial"],
    description:
      "從商品包裝設計、置入行銷影片到網站架設，一次完成產品上市所需的視覺與銷售素材，直接帶動轉單。",
    highlights: ["商品包裝設計", "置入行銷影片拍攝", "銷售網站架設"],
    images: [
      { src: "/images/duck-01.jpg", alt: "李熊鴨霸產品拍攝" },
      { src: "/images/duck-02.jpg", alt: "李熊鴨霸商品包裝" },
      { src: "/images/duck-03.jpg", alt: "胡椒鴨火鍋宣傳圖" },
      { src: "/images/duck-04.jpg", alt: "產品攝影棚現場" },
    ],
    portraitMain: true,
    links: [{ label: "相關影片", url: "https://youtube.com/shorts/hGbdgd4zIPs" }],
  },
  {
    id: "ad-production",
    title: "品牌行銷｜影像製作 × 廣告 × 轉單",
    subtitle: "高品質影像・精準曝光・置入行銷・導購",
    client: "多個品牌合作",
    services: ["commercial", "sponsored"],
    description:
      "以高品質人像與商品影像搭配精準投放，結合置入行銷與導購，讓內容不只好看，也能帶來實際銷售。",
    highlights: ["人像 × 商品平面攝影", "廣告影片製作", "置入行銷與導購"],
    images: [
      { src: "/images/ad-01.jpg", alt: "飲品廣告人像攝影" },
      { src: "/images/ad-02.jpg", alt: "咖啡廳人像攝影" },
      { src: "/images/ad-03.jpg", alt: "戶外人像商品攝影" },
      { src: "/images/ad-04.jpg", alt: "街訪置入影片" },
    ],
    links: [
      {
        label: "相關影片",
        url: "https://youtube.com/playlist?list=PLWaU_EMlsoBoXOTzrAJibJEQQLEnFmPOC",
      },
    ],
  },
  {
    id: "dr-jou",
    title: "品牌代言人記者會",
    subtitle: "代言人曝光 & 新品上市發布",
    client: "森田藥粧 DR.JOU",
    services: ["event", "media", "efp"],
    description:
      "結合記者會、媒體曝光與 KOL 宣傳：FB 與 YouTube 雙平台同步直播，事前號召代言人粉絲，現場百名粉絲入場，獲數十家媒體報導。",
    highlights: [
      "FB 與 YouTube 雙平台同步直播、多機 EFP 系統",
      "協助場勘，洽詢最合適之場地",
      "線上號召代言人粉絲，限量抽獎 100 名入場",
      "KOL 事前號召，現場 FB / IG 粉絲頁直播",
    ],
    images: [
      { src: "/images/presscon-01.jpg", alt: "記者會現場觀眾" },
      { src: "/images/presscon-02.jpg", alt: "代言人登台" },
      { src: "/images/presscon-03.jpg", alt: "代言人主視覺背板" },
      { src: "/images/presscon-04.jpg", alt: "記者會舞台互動" },
    ],
    metrics: [
      { value: "100名", label: "粉絲限量入場" },
      { value: "數十家", label: "媒體報導" },
    ],
    links: [{ label: "活動側錄", url: "https://www.youtube.com/watch?v=ggH5rFmIlr0" }],
  },
];
