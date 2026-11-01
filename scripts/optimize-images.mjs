// 建置後執行（npm run build 會自動接著跑）：
// 把 public/images 裡每張 jpg / png 轉成多種寬度的 WebP，放到 out/images/_w/，
// 讓手機只下載小張的圖。寬度清單和 src/lib/image-loader.ts 共用 image-widths.json。
// 原始檔不會被修改；開發模式（npm run dev）不會用到這些檔案。
import { readFile, readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "public", "images");
const outDir = path.join(root, "out", "images", "_w");

const { deviceSizes, imageSizes } = JSON.parse(
  await readFile(path.join(root, "src", "lib", "image-widths.json"), "utf8"),
);
const widths = [...new Set([...imageSizes, ...deviceSizes])];

async function listImages(dir, prefix = "") {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...(await listImages(path.join(dir, entry.name), rel)));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) files.push(rel);
  }
  return files;
}

try {
  await stat(path.join(root, "out"));
} catch {
  console.error("找不到 out 資料夾，請先執行 next build");
  process.exit(1);
}

const files = await listImages(srcDir);
let before = 0;
let after = 0;
const started = Date.now();

// 一次處理幾張，避免同時開太多檔案
const queue = [...files];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const rel = queue.shift();
      const input = await readFile(path.join(srcDir, rel));
      const base = rel.replace(/\.[^.]+$/, "").split(path.sep).join("/");
      await mkdir(path.dirname(path.join(outDir, base)), { recursive: true });
      before += input.length;
      const isPng = /\.png$/i.test(rel);
      for (const w of widths) {
        // 原圖比目標寬度小就不放大，輸出原尺寸
        const resized = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
        const encode = (opts) => resized.clone().webp(opts).toBuffer();
        let best = await encode({ quality: 78 });
        // PNG（例如 Logo）常是簡單圖形，無損壓縮可能更小
        if (isPng) {
          const lossless = await encode({ lossless: true });
          if (lossless.length < best.length) best = lossless;
        }
        // 轉出來比原檔還大，就逐步降低品質，直到不比原檔大
        for (const quality of [70, 62, 55]) {
          if (best.length <= input.length) break;
          best = await encode({ quality });
        }
        await writeFile(path.join(outDir, `${base}-${w}.webp`), best);
        if (w === 1080) after += best.length;
      }
    }
  }),
);

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(
  `圖片最佳化完成：${files.length} 張 × ${widths.length} 種寬度，` +
    `原檔共 ${mb(before)} MB，1080 寬的 WebP 共 ${mb(after)} MB，用時 ${((Date.now() - started) / 1000).toFixed(1)} 秒`,
);
