const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** 非 next/image 的靜態檔（例如影片）要自己補上 basePath */
export function withBase(path: string) {
  return `${basePath}${path}`;
}

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${basePath}${src}?w=${width}`;
}
