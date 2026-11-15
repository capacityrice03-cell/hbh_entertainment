// 抓 Threads（hbh__entertainment）貼文，給首頁「AI自動化社群更新」的 Threads 那一排用。
// 跟 IG 一樣一排 4 則、每則一張封面圖（Rice 2026-11-16，Threads 排在 IG 上面）：
// 從最新的有圖貼文照新到舊挑 4 篇，跳過 IG、FB 那兩排已有的題目（igFeed.json、fbFeed.json，比對文字相似度，見 sameTopic），
// 所以要在 fetch-ig、fetch-fb 之後跑。輪播用第一張，影片用封面圖。
// GitHub Actions 每天台灣時間 08:00、12:00 跑。
// 輸出：src/constants/threadsFeed.json（陣列，最多 4 篇）、public/images/threads/<貼文ID>.jpg。
// 需要環境變數 THREADS_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { downloadJpeg, getJson, sameTopic, saveFeed, usedTexts, warn } from "./social-lib.mjs";

const LABEL = "Threads 貼文";
const COUNT = 4; // 一排 4 則，跟 IG 一樣

/** 貼文的封面圖網址（輪播用第一張，影片用封面）；沒有圖回傳 undefined */
function coverOf(p) {
  const m = p.media_type === "CAROUSEL_ALBUM" ? p.children?.data?.[0] : p;
  return m?.media_type === "VIDEO" ? m.thumbnail_url : m?.media_url;
}

async function main() {
  const token = process.env.THREADS_ACCESS_TOKEN;
  if (!token) return warn(LABEL, "沒有 THREADS_ACCESS_TOKEN，沿用上一次的資料");

  const url = new URL("https://graph.threads.net/v1.0/me/threads");
  url.searchParams.set(
    "fields",
    "id,text,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}",
  );
  url.searchParams.set("limit", "25"); // 多抓一些，扣掉沒圖和跟 IG／FB 同題目的還夠 4 篇
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
    (p) => p.text?.trim() && p.permalink && coverOf(p) && !sameTopic(p.text, used),
  );

  // 先把圖片全部下載好，成功了才換掉舊資料
  const posts = [];
  const images = new Map();
  for (const p of candidates) {
    if (posts.length >= COUNT) break;
    try {
      const { data, width, height } = await downloadJpeg(coverOf(p));
      images.set(`${p.id}.jpg`, data);
      posts.push({
        id: p.id,
        text: p.text.trim(),
        permalink: p.permalink,
        timestamp: p.timestamp,
        image: `/images/threads/${p.id}.jpg`,
        width,
        height,
      });
    } catch (e) {
      warn(LABEL, `貼文 ${p.id} 的圖片下載失敗（${e.message}），略過這則`);
    }
  }

  if (posts.length === 0) return warn(LABEL, "沒有找到有圖的貼文，沿用上一次的資料");
  await saveFeed("threads", images, "threadsFeed.json", posts);
  console.log(`${LABEL}：已更新 ${posts.length} 則（最新 ${posts[0].timestamp}）`);
}

await main();
