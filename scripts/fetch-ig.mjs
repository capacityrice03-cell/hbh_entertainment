// 抓 IG（hbh__entertainment）最新貼文，給首頁「AI自動化社群更新」區塊用。
// 輸出：src/constants/igFeed.json（貼文資料）、public/images/ig/<貼文ID>.jpg（封面圖）。
// 需要環境變數 IG_USER_ID、IG_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗，只在 GitHub Actions 顯示警告。
// 權杖不會出現在畫面或紀錄裡。
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const COUNT = 6; // 顯示幾則
const API = "https://graph.instagram.com/v21.0";
const root = path.resolve(import.meta.dirname, "..");
const imgDir = path.join(root, "public", "images", "ig");
const dataFile = path.join(root, "src", "constants", "igFeed.json");

function warn(msg) {
  // GitHub Actions 會把 ::warning:: 顯示成黃色警告
  console.log(process.env.GITHUB_ACTIONS ? `::warning::IG 貼文：${msg}` : `IG 貼文：${msg}`);
}

async function main() {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!userId || !token) {
    warn("沒有 IG_USER_ID 或 IG_ACCESS_TOKEN，沿用上一次的資料");
    return;
  }

  const url = new URL(`${API}/${userId}/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
  url.searchParams.set("limit", String(COUNT));
  url.searchParams.set("access_token", token);

  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    warn(`連線失敗（${e.name}），沿用上一次的資料`);
    return;
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = body.error ?? {};
    warn(`API 回 HTTP ${res.status}，code ${err.code ?? "?"}：${err.message ?? ""}，沿用上一次的資料`);
    return;
  }

  // 先把圖片全部下載好，成功了才換掉舊資料
  const posts = [];
  const images = new Map();
  for (const m of body.data ?? []) {
    const src = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
    if (!src) continue;
    try {
      const r = await fetch(src);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const img = sharp(Buffer.from(await r.arrayBuffer())).rotate().resize({ width: 1080, withoutEnlargement: true });
      const { data, info } = await img.jpeg({ quality: 85, mozjpeg: true }).toBuffer({ resolveWithObject: true });
      images.set(`${m.id}.jpg`, data);
      posts.push({
        id: m.id,
        type: m.media_type,
        caption: (m.caption ?? "").trim(),
        permalink: m.permalink,
        timestamp: m.timestamp,
        image: `/images/ig/${m.id}.jpg`,
        width: info.width,
        height: info.height,
      });
    } catch (e) {
      warn(`貼文 ${m.id} 的圖片下載失敗（${e.message}），略過這則`);
    }
  }

  if (posts.length === 0) {
    warn("沒有抓到任何貼文，沿用上一次的資料");
    return;
  }

  await mkdir(imgDir, { recursive: true });
  for (const name of await readdir(imgDir)) {
    if (!images.has(name)) await rm(path.join(imgDir, name));
  }
  for (const [name, data] of images) await writeFile(path.join(imgDir, name), data);
  await writeFile(dataFile, JSON.stringify(posts, null, 2) + "\n");
  console.log(`IG 貼文：已更新 ${posts.length} 則（最新 ${posts[0].timestamp}）`);
}

await main();
