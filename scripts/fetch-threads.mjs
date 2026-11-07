// 抓 Threads（hbh__entertainment）貼文，給首頁「AI自動化社群更新」的 Threads 那一排用。
// 為了不跟 IG 那排重複同一個題目（Rice 2026-11-08）：只挑比 IG 那幾則都早至少一天的貼文
// （台灣日期早於 igFeed.json 裡最舊那則的日期），取其中最新的 3 則。所以要在 fetch-ig 之後跑。
// 有圖的貼文存第一張圖（輪播取第一張、影片取封面）；純文字貼文沒有圖，網站顯示深藍底大字卡。
// 輸出：src/constants/threadsFeed.json、public/images/threads/<貼文ID>.jpg。
// 需要環境變數 THREADS_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { readFile } from "node:fs/promises";
import path from "node:path";
import { downloadJpeg, getJson, root, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "Threads 貼文";
const COUNT = 3; // 一排幾則

// API 的時間像 2026-11-07T14:00:34+0000 → 台灣日期 "2026-11-07"
const twDate = (ts) =>
  new Date(ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2")).toLocaleDateString("sv-SE", { timeZone: "Asia/Taipei" });

/** IG 那排最舊一則的台灣日期；讀不到就回傳 undefined（不限制） */
async function igOldestDate() {
  try {
    const ig = JSON.parse(await readFile(path.join(root, "src", "constants", "igFeed.json"), "utf8"));
    return ig.map((p) => twDate(p.timestamp)).sort()[0];
  } catch {
    return undefined;
  }
}

/** 貼文的代表圖網址；沒有圖回傳 undefined */
function coverOf(p) {
  const m = p.media_type === "CAROUSEL_ALBUM" ? p.children?.data?.[0] : p;
  if (!m) return undefined;
  return m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
}

async function main() {
  const token = process.env.THREADS_ACCESS_TOKEN;
  if (!token) return warn(LABEL, "沒有 THREADS_ACCESS_TOKEN，沿用上一次的資料");

  const url = new URL("https://graph.threads.net/v1.0/me/threads");
  url.searchParams.set(
    "fields",
    "id,text,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}",
  );
  url.searchParams.set("limit", "50"); // 多抓一些，才挑得到比 IG 早一天的
  url.searchParams.set("access_token", token);
  const before = await igOldestDate();

  let body;
  try {
    body = await getJson(url);
  } catch (e) {
    return warn(LABEL, `${e.message}，沿用上一次的資料`);
  }

  const posts = [];
  const images = new Map();
  for (const p of body.data ?? []) {
    if (posts.length >= COUNT) break;
    if (!p.text?.trim() || !p.permalink) continue;
    if (before && twDate(p.timestamp) >= before) continue; // 跟 IG 同一天或更新的不放
    const post = { id: p.id, text: p.text.trim(), permalink: p.permalink, timestamp: p.timestamp };
    const src = coverOf(p);
    if (src) {
      try {
        const { data, width, height } = await downloadJpeg(src);
        images.set(`${p.id}.jpg`, data);
        Object.assign(post, { image: `/images/threads/${p.id}.jpg`, width, height });
      } catch (e) {
        warn(LABEL, `貼文 ${p.id} 的圖片下載失敗（${e.message}），這則改顯示文字`);
      }
    }
    posts.push(post);
  }

  if (posts.length === 0) return warn(LABEL, "沒有抓到任何貼文，沿用上一次的資料");
  await saveFeed("threads", images, "threadsFeed.json", posts);
  console.log(`${LABEL}：已更新 ${posts.length} 則（${before ? `早於 IG 的 ${before}，` : ""}最新 ${posts[0].timestamp}）`);
}

await main();
