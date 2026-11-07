// 抓 Threads（hbh__entertainment）貼文，給首頁「AI自動化社群更新」的 Threads 那一排用。
// 為了不跟 IG 那排重複同一個題目（Rice 2026-11-08）：只挑比 IG 那幾則都早至少一天的貼文
// （台灣日期早於 igFeed.json 裡最舊那則的日期）。所以要在 fetch-ig 之後跑。
// 只放 1 篇，網站上把它的圖卡排成一列左右滑（Rice 2026-11-08）：
// 也跳過 FB 那排已有的題目（fbFeed.json，比對標題開頭）。
// 挑最新一篇有多張圖的輪播貼文；都沒有就挑最新一篇有圖的貼文。影片用封面圖。
// 輸出：src/constants/threadsFeed.json（陣列，只有 1 篇）、public/images/threads/<貼文ID>-<序號>.jpg。
// 需要環境變數 THREADS_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { readFile } from "node:fs/promises";
import path from "node:path";
import { downloadJpeg, getJson, root, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "Threads 貼文";

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

/** 標題開頭（第一行去掉【】和空白，取前 12 字），用來比對是不是同一個題目 */
const titleKey = (text) =>
  (text ?? "").split("\n")[0].replace(/[【】\s]/g, "").slice(0, 12);

/** FB 那排已經放的題目（避免 Threads 跟 FB 兩排同一篇）；讀不到就回傳空集合 */
async function fbTitleKeys() {
  try {
    const fb = JSON.parse(await readFile(path.join(root, "src", "constants", "fbFeed.json"), "utf8"));
    return new Set(fb.map((p) => titleKey(p.message)).filter(Boolean));
  } catch {
    return new Set();
  }
}

/** 貼文所有圖的網址（輪播是每一張，影片用封面）；沒有圖回傳空陣列 */
function imagesOf(p) {
  const items = p.media_type === "CAROUSEL_ALBUM" ? (p.children?.data ?? []) : [p];
  return items.map((m) => (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url)).filter(Boolean);
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

  // 候選：有文字、有圖、比 IG 早一天以上、不是 FB 那排已有的題目；API 已經照新到舊排好
  const onFb = await fbTitleKeys();
  const candidates = (body.data ?? []).filter(
    (p) =>
      p.text?.trim() &&
      p.permalink &&
      imagesOf(p).length > 0 &&
      !(before && twDate(p.timestamp) >= before) &&
      !onFb.has(titleKey(p.text)),
  );
  const pick = candidates.find((p) => imagesOf(p).length > 1) ?? candidates[0];
  if (!pick) return warn(LABEL, "沒有找到有圖的貼文，沿用上一次的資料");

  const images = new Map();
  const list = [];
  for (const [i, src] of imagesOf(pick).entries()) {
    try {
      const { data, width, height } = await downloadJpeg(src);
      const name = `${pick.id}-${i + 1}.jpg`;
      images.set(name, data);
      list.push({ src: `/images/threads/${name}`, width, height });
    } catch (e) {
      warn(LABEL, `貼文 ${pick.id} 第 ${i + 1} 張圖下載失敗（${e.message}），跳過這張`);
    }
  }
  if (list.length === 0) return warn(LABEL, "圖片全部下載失敗，沿用上一次的資料");

  const post = { id: pick.id, text: pick.text.trim(), permalink: pick.permalink, timestamp: pick.timestamp, images: list };
  await saveFeed("threads", images, "threadsFeed.json", [post]);
  console.log(`${LABEL}：已更新 1 則，${list.length} 張圖（${before ? `早於 IG 的 ${before}，` : ""}${pick.timestamp}）`);
}

await main();
