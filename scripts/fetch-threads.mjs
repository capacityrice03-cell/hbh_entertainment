// 抓 Threads（hbh__entertainment）最新貼文，給首頁「AI自動化社群更新」的 Threads 那一排用。
// 有圖的貼文存第一張圖（輪播取第一張、影片取封面）；純文字貼文沒有圖，網站顯示文字卡。
// 輸出：src/constants/threadsFeed.json、public/images/threads/<貼文ID>.jpg。
// 需要環境變數 THREADS_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { downloadJpeg, getJson, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "Threads 貼文";
const COUNT = 3; // 一排幾則

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
  url.searchParams.set("limit", "10"); // 多抓幾則，略過沒有文字的
  url.searchParams.set("access_token", token);

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
  console.log(`${LABEL}：已更新 ${posts.length} 則（最新 ${posts[0].timestamp}）`);
}

await main();
