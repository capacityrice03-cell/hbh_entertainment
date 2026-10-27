// 網站正式網址（不含結尾斜線），給 Google、社群分享預覽和 sitemap 用。
// 之後換成自己的網域（例如 https://haobuhao.com.tw）時，改這裡就好。
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://capacityrice03-cell.github.io/hbh_entertainment"
).replace(/\/$/, "");

// Google Analytics 4 評估 ID（G- 開頭）。留空就不載入 GA。
export const GA_ID = "G-ZB8HP6W0CG";

// SEO 主打關鍵字：用在網頁標題、描述和結構化資料
export const SEO = {
  title: "好不好娛樂｜品牌短影音・影音製作・業配拍攝・EFP 直播・記者會",
  description:
    "好不好娛樂是專為企業、品牌規劃的影音製作團隊：品牌短影音（IG Reels、TikTok）企劃拍攝、企業形象影片、業配拍攝與 KOL 行銷、頻道經營、EFP 多機直播、代言人記者會與開幕活動企劃，一站整合拍攝、直播與媒體曝光。",
  keywords: [
    "短影音製作",
    "品牌短影音",
    "Reels 拍攝",
    "影音製作",
    "影片製作公司",
    "企業形象影片",
    "業配拍攝",
    "KOL 行銷",
    "頻道經營",
    "EFP 直播",
    "直播團隊",
    "記者會",
    "活動企劃",
    "好不好娛樂",
  ],
  ogImage: "/images/hero.jpg",
} as const;

export const SITE = {
  name: "好不好娛樂",
  nameEn: "Haobuhao Entertainment",
  slogan: "專為企業、品牌規劃的影音運營團隊",
  subSlogan: "最貼切需求的客製化服務",
  intro: [
    "提供高質感，各類型節目、業配影音製作",
    "從大型代言人記者會，至新媒體 YT、IG、TikTok 多平台經營",
    "讓您的商業模式獲得大幅成長並強化轉換率，達到永續經營",
  ],
  contact: {
    person: "Rice",
    email: "haobuhao0112@gmail.com",
    youtube: "https://www.youtube.com/@hbh_entertainment",
  },
  tagline: ["活動", "通告", "業配"],
} as const;

export const NAV = [
  { label: "關於我們", href: "#about" },
  { label: "服務項目", href: "#services" },
  { label: "短影音", href: "#short-video" },
  { label: "實際案例", href: "#cases" },
  { label: "聯絡我們", href: "#contact" },
] as const;

export const ABOUT_PILLARS = [
  {
    image: "/images/about-tv.jpg",
    alt: "電視節目製作團隊與藝人合照",
    lines: ["長年收視率第一之", "電視節目製作團隊經驗"],
    keyword: "平台 × 企劃 × 影像",
  },
  {
    image: "/images/about-event.jpg",
    alt: "品牌開幕活動藝人合照",
    lines: ["各類活動策劃", "代言記者會"],
    keyword: "品牌 × 自媒體 × 新聞",
  },
  {
    image: "/images/about-live.jpg",
    alt: "直播攝影棚拍攝現場",
    lines: ["垂直整合經營操作", "電商經營販售"],
    keyword: "KOL × 直播 × 開團",
  },
] as const;

export const STATS = [
  { value: "474萬", label: "單支短影音播放" },
  { value: "194萬", label: "門市開幕社群自然曝光" },
  { value: "128萬", label: "藝人公益影片曝光" },
  { value: "數十家", label: "代言記者會媒體報導" },
] as const;
