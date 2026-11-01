import { deviceSizes, imageSizes } from "./image-widths.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const WIDTHS = [...imageSizes, ...deviceSizes].sort((a, b) => a - b);

/** 非 next/image 的靜態檔（例如影片）要自己補上 basePath */
export function withBase(path: string) {
  return `${basePath}${path}`;
}

/**
 * next/image 的圖片網址。
 * 正式網站：/images/xxx.jpg → /images/_w/xxx-<寬度>.webp（建置後由 scripts/optimize-images.mjs 產生）
 * 開發模式：直接用原始檔，不需要先產生縮圖。
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  const match = src.match(/^\/images\/(.+)\.(jpe?g|png)$/i);
  if (process.env.NODE_ENV !== "production" || !match) return `${basePath}${src}`;
  // 用清單中「不小於需要寬度」的最小一種；超過最大的就用最大的
  const w = WIDTHS.find((n) => n >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${basePath}/images/_w/${match[1]}-${w}.webp`;
}
