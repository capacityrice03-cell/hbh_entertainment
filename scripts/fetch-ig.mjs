// 抓 IG（hbh__entertainment）最新貼文，給首頁「AI自動化社群更新」的 Instagram 那幾排用。
// 輸出：src/constants/igFeed.json（貼文資料）、public/images/ig/<貼文ID>.jpg（封面圖）。
// 需要環境變數 IG_USER_ID、IG_ACCESS_TOKEN（GitHub 上存在 Secrets；ai-office 續期後會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗，只在 GitHub Actions 顯示警告。
import { downloadJpeg, getJson, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "IG 貼文";
const COUNT = 4; // 一排 4 則
const API = "https://graph.instagram.com/v21.0";

async function main() {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!userId || !token) return warn(LABEL, "沒有 IG_USER_ID 或 IG_ACCESS_TOKEN，沿用上一次的資料");

  const url = new URL(`${API}/${userId}/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
  url.searchParams.set("limit", String(COUNT));
  url.searchParams.set("access_token", token);

  let body;
  try {
    body = await getJson(url);
  } catch (e) {
    return warn(LABEL, `${e.message}，沿用上一次的資料`);
  }

  // 先把圖片全部下載好，成功了才換掉舊資料
  const posts = [];
  const images = new Map();
  for (const m of body.data ?? []) {
    const src = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
    if (!src) continue;
    try {
      const { data, width, height } = await downloadJpeg(src);
      images.set(`${m.id}.jpg`, data);
      posts.push({
        id: m.id,
        type: m.media_type,
        caption: (m.caption ?? "").trim(),
        permalink: m.permalink,
        timestamp: m.timestamp,
        image: `/images/ig/${m.id}.jpg`,
        width,
        height,
      });
    } catch (e) {
      warn(LABEL, `貼文 ${m.id} 的圖片下載失敗（${e.message}），略過這則`);
    }
  }

  if (posts.length === 0) return warn(LABEL, "沒有抓到任何貼文，沿用上一次的資料");
  await saveFeed("ig", images, "igFeed.json", posts);
  console.log(`${LABEL}：已更新 ${posts.length} 則（最新 ${posts[0].timestamp}）`);
}

await main();
