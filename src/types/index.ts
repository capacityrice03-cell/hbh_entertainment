/** channel = 品牌影音營銷、event = 活動 / EFP 直播 / 媒體廣告、commercial = 商業拍攝 */
export type ServiceId = "channel" | "event" | "commercial";

export type Service = {
  id: ServiceId;
  title: string;
  items: string[];
};

export type CaseLink = {
  label: string;
  url: string;
};

export type CaseImage = {
  src: string;
  alt: string;
  /** 集數，例如 "Ep.01"（layout 為 "episodes" 時顯示） */
  episode?: string;
  /** 圖片下方標題（layout 為 "episodes" 時顯示） */
  caption?: string;
  /** 點圖片開啟的影片網址 */
  url?: string;
};

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  /** 標題中要用黃底凸顯的字 */
  titleHighlight?: string;
  /** 凸顯字的底色（色碼），預設黃色 */
  titleHighlightColor?: string;
  subtitle?: string;
  client?: string;
  /** 「合作對象」這個標籤可以換成別的字，例如「架構」；設成空字串就不顯示標籤 */
  clientLabel?: string;
  services: ServiceId[];
  description: string;
  highlights: string[];
  images: CaseImage[];
  /** 主圖是直式照片時設為 true：主圖放左邊直式，其他小圖直排在右邊，避免裁切 */
  portraitMain?: boolean;
  /** "episodes"：系列影片封面，以 2×2 完整 16:9 封面加集數標題呈現，不裁切 */
  layout?: "episodes";
  /** 設定後改用專屬元件呈現整張卡片（例如代表作品專區），其他欄位只用於分類篩選與計數 */
  feature?: "warm-kitchen";
  metrics?: CaseMetric[];
  links?: CaseLink[];
};
