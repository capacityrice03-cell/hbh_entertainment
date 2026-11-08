// 抓 FB 粉專「好不好娛樂」最新貼文，給首頁「AI自動化社群更新」的 Facebook 那一排用（一排 4 則）。
// 2026-11-08 起改成自動更新（原本是 Rice 指定貼文）：GitHub Actions 每天台灣時間 11:00 跑一次。
// 挑法：最近 25 篇裡有文字、有圖的貼文隨機挑 4 篇，網站上照新到舊排；不跳過跟 IG 同題目的（Rice 2026-11-08）。
// 要在 fetch-threads 之前跑（Threads 會跳過 FB 那排已有的題目）。
// 輸出：src/constants/fbFeed.json、public/images/fb/<貼文ID>.jpg。
// 需要環境變數 FB_PAGE_ID、FB_PAGE_ACCESS_TOKEN（ai-office .env 的使用者權杖，這裡換成粉專權杖才讀得到；
// GitHub 上存在 Secrets，ai-office 的 sync_github_secrets.py 會同步過去）。
// 沒有權杖或抓取失敗時：保留上一次的資料，不讓網站建置失敗。
import { downloadJpeg, getJson, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "FB 貼文";
const COUNT = 4; // 一排 4 則
const API = "https://graph.facebook.com/v21.0";

async function main() {
  const pageId = process.env.FB_PAGE_ID;
  const userToken = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !userToken) return warn(LABEL, "沒有 FB_PAGE_ID 或 FB_PAGE_ACCESS_TOKEN，沿用上一次的資料");

  let body;
  try {
    const t = new URL(`${API}/${pageId}`);
    t.searchParams.set("fields", "access_token");
    t.searchParams.set("access_token", userToken);
    const token = (await getJson(t)).access_token;
    if (!token) throw new Error("換不到粉專權杖");

    const u = new URL(`${API}/${pageId}/posts`);
    u.searchParams.set("fields", "id,message,created_time,permalink_url,full_picture");
    u.searchParams.set("limit", "25");
    u.searchParams.set("access_token", token);
    body = await getJson(u);
  } catch (e) {
    return warn(LABEL, `${e.message}，沿用上一次的資料（FB 授權可能過期，要重新授權）`);
  }

  // 候選：最近 25 篇裡有文字、有圖的，打亂順序隨機挑（不跳過跟 IG 同題目的，Rice 2026-11-08）
  const all = (body.data ?? []).filter((p) => p.message?.trim() && p.permalink_url && p.full_picture);
  const ordered = all
    .map((p) => [Math.random(), p])
    .sort((a, b) => a[0] - b[0])
    .map(([, p]) => p);

  // 先把圖片全部下載好，成功了才換掉舊資料
  const posts = [];
  const images = new Map();
  for (const p of ordered) {
    if (posts.length >= COUNT) break;
    try {
      const { data, width, height } = await downloadJpeg(p.full_picture);
      images.set(`${p.id}.jpg`, data);
      posts.push({
        id: p.id,
        message: p.message.trim(),
        permalink: p.permalink_url,
        timestamp: p.created_time,
        image: `/images/fb/${p.id}.jpg`,
        width,
        height,
      });
    } catch (e) {
      warn(LABEL, `貼文 ${p.id} 的圖片下載失敗（${e.message}），略過這則`);
    }
  }

  if (posts.length === 0) return warn(LABEL, "沒有抓到任何有圖的貼文，沿用上一次的資料");
  // 網站上照新到舊排
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  await saveFeed("fb", images, "fbFeed.json", posts);
  console.log(`${LABEL}：已更新 ${posts.length} 則（從最近 ${all.length} 篇有圖的貼文裡隨機挑）`);
}

await main();
