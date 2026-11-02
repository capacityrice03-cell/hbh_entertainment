@AGENTS.md

# 好不好娛樂官網（hbh-tw.store）

Next.js 16 靜態輸出（`output: "export"`）＋ Tailwind 4。push 到 `main` → GitHub Actions → GitHub Pages，約 1–2 分鐘上線。
網址、內容檔位置、DNS、GA4、Search Console 等完整資訊：`docs/INTEGRATION.md`（先讀它，不要重新摸索專案）。

## 內容放哪裡
- 文字和資料：`src/constants/`（`site.ts` 公司資訊／SEO／網址／GA_ID、`services.ts`、`cases.ts`、`shortVideo.ts`、`warmKitchen.ts`）
- 頁面：`src/app/`；圖片影片：`public/images/`、`public/videos/`

## 上線規則（不可違反）
- 改完先在本機 commit（中文訊息）。**使用者說「推上去」才 push**，push 就是正式網站改版。
- 「先存檔」= 確認都已 commit。
- push 後等 GitHub Actions 跑完，用 curl 確認正式網站已更新，回報時提醒使用者 Ctrl+F5。
- 參考用、不上線的設計放本機分支，不留在 `main`。

## 文案規則
- 網站上看得到的文字由使用者決定措辭。需要我寫時給 2–3 版（附字數）讓使用者挑，不自己定稿。
- 使用者給的文字逐字照用；刪字後不通順要說明改了哪裡。同一句出現在兩處時，問清楚或說明改了哪一處。
- 台灣用語：行銷（不用營銷）、影音製作／經營（不用運營）；不用「一條龍」「一站式」「一手包辦」「從企劃到剪輯」。
- 技術性修正（SEO 標籤、圖片最佳化）可以直接改。

## 改完的檢查
- 建置用 PowerShell 跑 `npm run build`（Git Bash 會改寫 /path 參數），再跑 `npm run lint`。
- build 後會自動跑 `scripts/optimize-images.mjs` 產 WebP；不經 next/image 的圖用 `optimizedSrc()`。
- 新頁面要做：metadata 加 `...shareMeta()`、`src/app/sitemap.ts` 的 UPDATED 加日期、`JsonLd` + `breadcrumbLd()` 麵包屑。
- `/venue/` 場域租借頁不做 SEO，檢查報告列出它的項目直接略過。

## 網域
- hbh-tw.store（GoDaddy）只買一年，約到 2027-10 底；使用者計畫明年因新業務換新網域。換的時候：舊網域保留並轉址一段時間、Search Console 用「網址變更」工具、新網域重新提交 sitemap、GA4 串流網址改新網域。到期前一個月提醒是否續約。
- 舊網址 `github.io/hbh_entertainment` 會 301 轉到自訂網域，所以 repo 名稱不可改。網址集中在 `src/constants/site.ts` 的 `SITE_URL`。

## 已定案的設計決定（不要再提議改回）
- 作品集 `/works/`：Bento 網格，元件在 `src/components/showcase/`；滑鼠移上去播放的預覽片放 `public/videos/previews/`。
- 首頁不做「滾動放大影片」，影片讓人自己點開。

## 其他
- 專案層級裝了：ai-seo、ai-performance、playwright（用電腦上的 Chrome）、frontend-design（做新頁面時的設計指引）、Context7 MCP。
- 改版後截圖檢查畫面再回報。
- AI 生成圖片要付費（fal.ai，金鑰在 ai-office 的 `.env` 的 `FAL_KEY`，只在執行時讀，不複製、不印出）：先說模型和張數，圖放 `D:\Downloads\fal-images\` 讓使用者挑；不可冒充案例照片。
- `/ai-seo:seo-audit`、`/ai-performance:performance-audit` 只能使用者自己輸入，報告在 `docs/`。

# 專案規則
- 修改檔案時，優先使用 Edit / Write 工具，不要用 heredoc（<<EOF）或 python - 從 stdin 執行程式碼
- 需要跑腳本時，先把腳本寫成檔案再執行
