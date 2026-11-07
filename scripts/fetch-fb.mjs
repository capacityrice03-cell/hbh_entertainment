// FB 粉專「指定貼文」：照 src/constants/fbPicks.json 的順序抓那幾篇，給首頁「AI自動化社群更新」的 Facebook 那一排用。
// 不會自動更新：Rice 指定貼文 → 改 fbPicks.json → 在本機跑這支（_tmp\run-fetch-social.ps1）→ commit → 推上去。
// GitHub Actions 不跑這支（FB 權杖沒放上 GitHub）。
// 輸出：src/constants/fbFeed.json、public/images/fb/<貼文ID>.jpg。
// 需要環境變數 FB_PAGE_ID、FB_PAGE_ACCESS_TOKEN（ai-office .env 的使用者權杖，這裡換成粉專權杖才讀得到）。
// 另外印出最近 10 篇的 ID 和標題，方便對照 Rice 給的貼文。
import { readFile } from "node:fs/promises";
import path from "node:path";
import { downloadJpeg, getJson, root, saveFeed, warn } from "./social-lib.mjs";

const LABEL = "FB 貼文";
const API = "https://graph.facebook.com/v21.0";
const FIELDS = "id,message,created_time,permalink_url,full_picture";

async function main() {
  const pageId = process.env.FB_PAGE_ID;
  const userToken = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!pageId || !userToken) return warn(LABEL, "沒有 FB_PAGE_ID 或 FB_PAGE_ACCESS_TOKEN，沒有更新");

  const picks = JSON.parse(await readFile(path.join(root, "src", "constants", "fbPicks.json"), "utf8"));

  let token;
  try {
    const u = new URL(`${API}/${pageId}`);
    u.searchParams.set("fields", "access_token");
    u.searchParams.set("access_token", userToken);
    token = (await getJson(u)).access_token;
    if (!token) throw new Error("換不到粉專權杖");
  } catch (e) {
    return warn(LABEL, `${e.message}，沒有更新（FB 授權可能過期，要重新授權）`);
  }

  // 最近 10 篇對照表
  try {
    const u = new URL(`${API}/${pageId}/posts`);
    u.searchParams.set("fields", "id,message,created_time");
    u.searchParams.set("limit", "10");
    u.searchParams.set("access_token", token);
    console.log("最近 10 篇（ID｜日期｜第一行）：");
    for (const p of (await getJson(u)).data ?? []) {
      console.log(`  ${p.id}｜${p.created_time.slice(0, 10)}｜${(p.message ?? "").split("\n")[0].slice(0, 40)}`);
    }
  } catch (e) {
    warn(LABEL, `讀最近貼文失敗：${e.message}`);
  }

  const posts = [];
  const images = new Map();
  for (const { id } of picks) {
    try {
      const u = new URL(`${API}/${id}`);
      u.searchParams.set("fields", FIELDS);
      u.searchParams.set("access_token", token);
      const p = await getJson(u);
      const post = {
        id: p.id,
        message: (p.message ?? "").trim(),
        permalink: p.permalink_url,
        timestamp: p.created_time,
      };
      if (p.full_picture) {
        const { data, width, height } = await downloadJpeg(p.full_picture);
        images.set(`${p.id}.jpg`, data);
        Object.assign(post, { image: `/images/fb/${p.id}.jpg`, width, height });
      }
      posts.push(post);
    } catch (e) {
      return warn(LABEL, `指定的貼文 ${id} 抓不到（${e.message}），沒有更新`);
    }
  }

  await saveFeed("fb", images, "fbFeed.json", posts);
  console.log(`${LABEL}：已更新 ${posts.length} 則指定貼文`);
}

await main();
