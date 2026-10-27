export type ServiceId =
  | "commercial"
  | "channel"
  | "sponsored"
  | "efp"
  | "event"
  | "media";

export type Service = {
  id: ServiceId;
  title: string;
  items: string[];
};

export type CaseLink = {
  label: string;
  url: string;
};

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  subtitle?: string;
  client: string;
  services: ServiceId[];
  description: string;
  highlights: string[];
  images: { src: string; alt: string }[];
  /** 主圖是直式照片時設為 true：主圖放左邊直式，其他小圖直排在右邊，避免裁切 */
  portraitMain?: boolean;
  metrics?: CaseMetric[];
  links?: CaseLink[];
};
