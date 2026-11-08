// fetch-ig / fetch-threads / fetch-fb 共用：警告訊息、下載圖片、寫檔。
// 規則：權杖不印出；抓取失敗時保留上一次的資料，不讓網站建置失敗。
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const root = path.resolve(import.meta.dirname, "..");

export function warn(label, msg) {
  // GitHub Actions 會把 ::warning:: 顯示成黃色警告
  console.log(process.env.GITHUB_ACTIONS ? `::warning::${label}：${msg}` : `${label}：${msg}`);
}

/** GET 一個 API 網址，回傳 JSON；失敗時 throw 一個不含權杖的錯誤訊息 */
export async function getJson(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    throw new Error(`連線失敗（${e.name}）`);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = body.error ?? {};
    throw new Error(`API 回 HTTP ${res.status}，code ${err.code ?? "?"}：${err.message ?? ""}`);
  }
  return body;
}

/** 下載圖片，轉成最寬 1080 的 JPG；回傳 { data, width, height } */
export async function downloadJpeg(src) {
  const r = await fetch(src);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const img = sharp(Buffer.from(await r.arrayBuffer())).rotate().resize({ width: 1080, withoutEnlargement: true });
  const { data, info } = await img.jpeg({ quality: 85, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** 把圖片寫進 public/images/<dir>/（清掉不再用到的舊圖），再寫資料檔 src/constants/<dataName> */
export async function saveFeed(dir, images, dataName, posts) {
  const imgDir = path.join(root, "public", "images", dir);
  await mkdir(imgDir, { recursive: true });
  for (const name of await readdir(imgDir)) {
    if (!images.has(name)) await rm(path.join(imgDir, name));
  }
  for (const [name, data] of images) await writeFile(path.join(imgDir, name), data);
  await writeFile(path.join(root, "src", "constants", dataName), JSON.stringify(posts, null, 2) + "\n");
}

/** 只留文字和數字（去掉標點、空白、【】），方便比對 */
export const plain = (text) => (text ?? "").replace(/[^\p{L}\p{N}]/gu, "");

/** 讀其他排已經放的貼文全文（只留文字和數字）；sources 例：[["igFeed.json", "caption"]]；讀不到的檔案略過 */
export async function usedTexts(sources) {
  const texts = [];
  for (const [file, field] of sources) {
    try {
      const posts = JSON.parse(await readFile(path.join(root, "src", "constants", file), "utf8"));
      for (const p of posts) texts.push(plain(p[field]));
    } catch {
      // 讀不到就不比對這一排
    }
  }
  return texts;
}

/** 字串裡每兩個相鄰的字（「一枚火箭」→ 一枚、枚火、火箭） */
const pairs = (s) => new Set([...Array(Math.max(s.length - 1, 0)).keys()].map((i) => s.slice(i, i + 2)));

/**
 * 判斷是不是同一個題目：這篇的「每兩個相鄰的字」有 25% 以上也出現在別排某篇裡。
 * 各平台會改寫標題（例：Threads「一枚火箭飛上天」、IG「天啊天啊！一枚火箭飛上去」），所以不比整句。
 * 2026-11-08 用真實貼文測過：不同題目最高 0.15，同題目最低 0.27。
 */
const SAME_TOPIC = 0.25;
export const sameTopic = (text, texts) => {
  const a = pairs(plain(text));
  if (a.size === 0) return false;
  return texts.some((t) => {
    let hit = 0;
    for (const x of a) if (t.includes(x)) hit++;
    return hit / a.size >= SAME_TOPIC;
  });
};

/** 只寫資料檔（沒有圖片的平台用） */
export async function saveData(dataName, posts) {
  await writeFile(path.join(root, "src", "constants", dataName), JSON.stringify(posts, null, 2) + "\n");
}
