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
    email: "chouricky3315@gmail.com",
  },
  tagline: ["活動", "通告", "業配"],
} as const;

export const NAV = [
  { label: "關於我們", href: "#about" },
  { label: "服務項目", href: "#services" },
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
  { value: "368萬", label: "單支短影音播放" },
  { value: "194萬", label: "門市開幕社群自然曝光" },
  { value: "128萬", label: "藝人公益影片曝光" },
  { value: "數十家", label: "代言記者會媒體報導" },
] as const;
