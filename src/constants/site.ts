import type { Metadata } from "next";

// 網站正式網址（不含結尾斜線），給 Google、社群分享預覽和 sitemap 用。
// 換網域時改這裡就好。
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hbh-tw.store").replace(/\/$/, "");

// Google Analytics 4 評估 ID（G- 開頭）。留空就不載入 GA。
export const GA_ID = "G-ZB8HP6W0CG";

// SEO 主打關鍵字：用在網頁標題、描述和結構化資料
export const SEO = {
  title: "好不好娛樂｜品牌短影音・影音製作・業配拍攝・EFP 直播・記者會",
  description:
    "好不好娛樂是專為企業、品牌規劃的影音製作團隊，提供系列短影音拍攝、EFP多機直播、各類型活動籌備與執行，商品包裝與廣告、銷售網站建置。",
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
  slogan: "專為企業、品牌規劃的影音製作團隊",
  subSlogan: "提供精準的客製化服務",
  contact: {
    email: "haobuhao0112@gmail.com",
    youtube: "https://www.youtube.com/@hbh_entertainment",
  },
} as const;

// 網址丟到 LINE / FB 時的預覽卡片（標題 + 一句短描述 + 圖片）；Google 搜尋仍用上面的 SEO 標題與描述
export const SHARE = {
  title: "好不好娛樂｜陪伴品牌成長的影音製作團隊",
  description: SITE.subSlogan,
  image: "/images/og-logo.jpg",
} as const;

// 社群分享預覽（LINE / FB / X）的完整設定。
// Next.js 子頁面只要寫了 openGraph 就會整組取代上層設定，所以每一頁都用這個函式產生一整組。
export function shareMeta(title: string, url: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: `${SITE.name} ${SITE.nameEn}`,
      title,
      description: SHARE.description,
      url,
      images: [{ url: SHARE.image, width: 1200, height: 630, alt: `${SITE.name} LOGO` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: SHARE.description,
      images: [SHARE.image],
    },
  };
}

// 結構化資料：子頁面的麵包屑「首頁 › 本頁」，Google 搜尋結果可能用它顯示網址路徑
export function breadcrumbLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export const NAV = [
  { label: "關於我們", href: "#about" },
  { label: "服務項目", href: "#services" },
  { label: "短影音", href: "#short-video" },
  { label: "實際案例", href: "#cases" },
  { label: "場域租借", href: "/venue/" },
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
