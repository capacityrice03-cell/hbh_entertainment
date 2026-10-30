/** channel = 品牌影音營銷、event = 活動 / EFP 直播 / 媒體廣告、commercial = 節目製作 */
export type ServiceId = "channel" | "event" | "commercial";

export type Service = {
  id: ServiceId;
  title: string;
  items: string[];
  /** 「相關案例引導」要跳去的位置；沒填就跳到該分類的案例列表 */
  caseHref?: string;
};

export type CaseLink = {
  label: string;
  url: string;
  /** 按鈕圖示：預設 "play"（影片）；"external" 用於官網、新聞等外部網頁 */
  icon?: "play" | "external";
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
  /** 照片牆（layout 為 "gallery"）裡的格子大小："big" 佔 2×2、"tall" 直式佔 1×2，沒填佔 1 格 */
  tile?: "big" | "tall";
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
  /**
   * "episodes"：系列影片封面，以 2×2 完整 16:9 封面加集數標題呈現，不裁切
   * "gallery"：文字在上、全寬拼貼照片牆在下，點照片可全螢幕瀏覽
   */
  layout?: "episodes" | "gallery";
  /** 照片牆裡的文字格（佔 2×1），用來寫活動名稱、補滿拼貼空位 */
  galleryNote?: { kicker: string; text: string };
  /** 設定後改用專屬元件呈現整張卡片（例如代表作品專區），其他欄位只用於分類篩選與計數 */
  feature?: "warm-kitchen";
  metrics?: CaseMetric[];
  links?: CaseLink[];
};
