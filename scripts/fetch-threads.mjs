// 抓 Threads（hbh__entertainment）貼文，給首頁「AI自動化社群更新」的 Threads 那一排用。
// 只放 1 篇，網站上把它的圖卡排成一列左右滑（Rice 2026-11-08）：
// 從「當天」（台灣日期）發的有圖貼文裡隨機挑一篇；當天還沒有，就從最近一天有發的貼文裡隨機挑。
// 跳過 IG、FB 那兩排已有的題目（igFeed.json、fbFeed.json，比對文字相似度，見 sameTopic），所以要在 fetch-ig、fetch-fb 之後跑。
// 當天的貼文都被跳過時，就從最近一天還有剩的貼文裡挑。影片用封面圖。
// GitHub Actions 每天台灣時間 11:00 跑一次。
// 輸出：src/constants/threadsFeed.json（陣列，只有 1 篇）、public/images/threads/<貼文ID>-<序號>.jpg。
// 需要環境變數 THREADS_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { downloadJpeg, getJson, sameTopic, saveFeed, usedTexts, warn } from "./social-lib.mjs";

const LABEL = "Threads 貼文";

// API 的時間像 2026-11-07T14:00:34+0000 → 台灣日期 "2026-11-07"
const twDate = (ts) =>
  new Date(ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2")).toLocaleDateString("sv-SE", { timeZone: "Asia/Taipei" });

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
  url.searchParams.set("limit", "25"); // 一天最多發幾篇，25 篇夠涵蓋當天
  url.searchParams.set("access_token", token);

  let body;
  try {
    body = await getJson(url);
  } catch (e) {
    return warn(LABEL, `${e.message}，沿用上一次的資料`);
  }

  // 候選：有文字、有圖、不是 IG／FB 那兩排已有的題目；API 已經照新到舊排好
  const used = await usedTexts([["igFeed.json", "caption"], ["fbFeed.json", "message"]]);
  const candidates = (body.data ?? []).filter(
    (p) => p.text?.trim() && p.permalink && imagesOf(p).length > 0 && !sameTopic(p.text, used),
  );
  if (candidates.length === 0) return warn(LABEL, "沒有找到有圖的貼文，沿用上一次的資料");

  // 當天（台灣日期）的貼文；當天還沒發，就用最近一天有發的
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Taipei" });
  const day = candidates.some((p) => twDate(p.timestamp) === today) ? today : twDate(candidates[0].timestamp);
  const sameDay = candidates.filter((p) => twDate(p.timestamp) === day);
  const pick = sameDay[Math.floor(Math.random() * sameDay.length)];

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
  const note = day === today ? "當天" : `當天還沒發，改用 ${day}`;
  console.log(`${LABEL}：已更新 1 則，${list.length} 張圖（${note}，${sameDay.length} 篇裡隨機挑，${pick.timestamp}）`);
}

await main();
