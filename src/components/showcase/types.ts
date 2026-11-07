/** Bento 作品展示的一張卡片（由 Server Component 組好資料再傳給客戶端元件） */
export type ShowcaseItem = {
  id: string;
  /** 左上角的分類，例如「場域出租」「節目製作」 */
  category: string;
  title: string;
  subtitle?: string;
  cover: { src: string; alt: string };
  /** 封面裁切時保留的位置（CSS object-position，例如 "50% 15%" = 偏上）。直式照片放進扁卡片時，用它避免切到臉 */
  coverPosition?: string;
  /** 滑鼠移上去時播放的靜音預覽短片（選填，沒有就只做照片放大） */
  previewVideo?: string;
  /** 卡片在網格中的大小（Tailwind class，例如 "md:col-span-2 md:row-span-2"） */
  span: string;
  /** 視窗裡的服務標籤 */
  tags: string[];
  description: string;
  /** 視窗裡的規格／重點，例如「交通：捷運松江南京站 1 號出口步行 3 分鐘」 */
  specs: { label: string; value: string }[];
  /** 視窗上方的主要媒體 */
  media:
    | { type: "youtube"; id: string; title: string }
    | { type: "video"; src: string; poster: string; title: string }
    | { type: "images"; images: { src: string; alt: string; position?: string }[] };
  links?: { label: string; url: string }[];
};
