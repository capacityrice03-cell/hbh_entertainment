# 好不好娛樂官網：串接說明

給其他專案（例如 `D:\AI-office` 的社群自動化、n8n、LINE 客服機器人）看的說明。內容包括網站怎麼部署、資料放在哪裡，以及自動化要怎麼把內容推進網站。

> 狀態標示：✅ 已完成　🔜 規劃中（網站端還沒實作，要做時在本專案補上）

---

## 1. 網站基本資訊 ✅

| 項目 | 內容 |
|---|---|
| 正式網址 | https://hbh-tw.store（`www.` 與舊網址 `capacityrice03-cell.github.io/hbh_entertainment/` 都會 301 轉到這裡） |
| GitHub repo | `capacityrice03-cell/hbh_entertainment`（**公開 repo**），分支 `main` |
| 框架 | Next.js 16（App Router），`output: "export"` 純靜態網站，Tailwind CSS 4 |
| 部署 | push 到 `main` → GitHub Actions（`.github/workflows/deploy.yml`）→ GitHub Pages，約 1–2 分鐘上線 |
| 建置 | `npm ci && npm run build`，輸出在 `out/`（Node 24） |
| 網域 | GoDaddy 購買，DNS：4 筆 A 記錄 `185.199.108–111.153`、`www` CNAME → `capacityrice03-cell.github.io`。**只買一年**，預計明年換新網域 |
| GA4 | 評估 ID `G-ZB8HP6W0CG`（`src/constants/site.ts` 的 `GA_ID`） |
| Search Console | 新舊網址都已驗證，sitemap：`https://hbh-tw.store/sitemap.xml` |

**這個網站沒有後端主機。**它不能接收 webhook、不能保存密鑰，也不能在網頁裡直接呼叫 IG / FB / YT API。要即時處理的事情，例如客服、抓社群資料，都要放在 n8n 或其他主機上。

---

## 2. 網站內容放在哪裡 ✅

所有內容都是程式碼裡的資料檔，改完 push 就會上線：

| 檔案 | 內容 |
|---|---|
| `src/constants/site.ts` | 公司名稱、聯絡方式、導覽列、關於我們、數字列（`STATS`）、SEO 文字、正式網址、GA4 ID |
| `src/constants/services.ts` | 六大服務項目（`commercial`、`channel`、`sponsored`、`efp`、`event`、`media`） |
| `src/constants/cases.ts` | 實際案例（型別見 `src/types/index.ts` 的 `CaseStudy`） |
| `src/constants/shortVideo.ts` | 短影音區塊：代表影片（含 IG / FB 連結與播放數）、14 支短影音牆 |
| `src/constants/warmKitchen.ts` | 代表作品《暖廚家味》專區 |
| `public/images/`、`public/videos/` | 圖片與影片，網頁裡用 `/images/xxx.jpg` 這種路徑引用 |

`素材/` 資料夾（原始簡報、截圖）已加入 `.gitignore`，不會上傳。

---

## 3. 社群內容自動更新（IG / FB / YT）🔜

### 3.1 運作方式

```
IG / FB / YT API
      │  AI-office / n8n 定時抓取（密鑰只放在自動化那邊）
      ▼
寫入本 repo 的兩個位置：
  • src/data/social-feed.json   ← 最新內容清單
  • public/images/social/       ← 下載下來的縮圖
      │  commit + push 到 main
      ▼
GitHub Actions 自動重新部署 → 網站顯示最新內容
```

### 3.2 規則（請自動化程式遵守）

1. **只能動自己的檔案**：`src/data/social-feed.json` 和 `public/images/social/`。其他檔案由人工改版維護，自動化不要碰，避免互相覆蓋。
2. **縮圖要下載存檔，不要直接用 IG / FB 的圖片網址**：這些網址會過期。
   - 存成 JPG，寬度最多 600px，檔名用平台加貼文 ID，例如 `ig-DWgBe7RkVMV.jpg`、`yt-mKr5qE1s-5A.jpg`
   - 從清單移除的貼文，縮圖也一起刪掉
3. **內容沒變就不要 commit**。每次 push 都會觸發一次部署，建議一天最多更新 1–4 次。
4. **commit 訊息**用 `chore(social): 更新社群內容 YYYY-MM-DD`，方便和人工改版區分。
5. **push 權限**：用 GitHub **fine-grained personal access token**，只授權這個 repo，權限選 `Contents: Read and write`。token 存在 n8n 憑證或 AI-office 的環境變數裡，**絕對不要寫進任何 repo**，這是公開 repo。
6. push 前先 `git pull --rebase`，避免和人工改版衝突。

### 3.3 `src/data/social-feed.json` 格式

```json
{
  "updatedAt": "2026-10-28T10:00:00+08:00",
  "items": [
    {
      "id": "ig-DWgBe7RkVMV",
      "platform": "instagram",
      "type": "reel",
      "url": "https://www.instagram.com/reel/DWgBe7RkVMV/",
      "title": "炸綺來也有小費服務",
      "thumbnail": "/images/social/ig-DWgBe7RkVMV.jpg",
      "publishedAt": "2026-03-30T12:00:00+08:00",
      "views": 1582000,
      "likes": 15000,
      "tags": ["炸綺來", "短影音"]
    }
  ]
}
```

| 欄位 | 必填 | 說明 |
|---|---|---|
| `updatedAt` | ✔ | 這份檔案的產生時間（ISO 8601，台灣時區） |
| `items[].id` | ✔ | `平台縮寫-貼文ID`，不可重複，也是縮圖檔名 |
| `platform` | ✔ | `instagram` / `facebook` / `youtube` |
| `type` | ✔ | `reel` / `post` / `video` / `short` |
| `url` | ✔ | 原始貼文網址（網頁點擊後開啟） |
| `title` |  | 標題或貼文第一行，最多 40 字，不要放 hashtag |
| `thumbnail` | ✔ | 以 `/images/social/` 開頭的本地路徑 |
| `publishedAt` | ✔ | 發布時間 |
| `views` / `likes` |  | **原始數字**（例如 1582000），網站會自己顯示成「158.2萬」；拿不到就省略，不要填 0 |
| `tags` |  | 分類用，可省略 |

- `items` 依 `publishedAt` 新到舊排序，最多 24 筆。
- 網站端預計做法：新增「最新作品」區塊，讀這個 JSON 顯示最新的 8–12 則。**這部分還沒實作**，第一次產出 JSON 後，在本專案跟 Claude 說「接上 social-feed.json」即可。

### 3.4 限制與注意

- **IG 只能抓自己管理的商業 / 創作者帳號**，而且要連結 FB 粉專（Instagram Graph API）。個人帳號不能用 API。
- 網站上現有的爆量影片，例如張文綺 Shiny 帳號的炸綺來影片、暖廚家味主廚 Reels，**發在別人的帳號**，無法自動抓。這些維持在 `shortVideo.ts`、`warmKitchen.ts` 手動管理，自動化不要覆蓋。
- 建議分工：**自家帳號的新內容自動更新；代表作品由人工挑選。**
- YouTube 可用 YouTube Data API v3 抓頻道 `@hbh_entertainment` 的最新影片，縮圖網址 `https://i.ytimg.com/vi/<影片ID>/hqdefault.jpg` 一樣要下載存檔。

---

## 4. LINE 客服機器人 🔜

```
LINE 使用者 ⇄ LINE Messaging API（webhook）⇄ n8n ⇄ AI 模型
                                              │
                                              └ 參考資料：公司介紹、服務項目、案例（見下）
```

- webhook 要接到 **n8n**，網站本身接不了，因為沒有後端。
- 網站上的 LINE 入口：「聯絡我們」區塊的 QR Code（`public/images/line-qr-haobuhao.jpg`）。之後如果有官方帳號的加好友連結（`https://lin.ee/...`），可以在本專案加一個「加 LINE」按鈕。
- **客服的知識來源建議跟網站共用**，避免兩邊說法不一致：
  - 🔜 規劃：網站建置時自動輸出 `https://hbh-tw.store/data/company.json`，內容包含 `SITE`、`SERVICES`、`CASES` 的公開資訊。n8n 定時讀這份 JSON 當客服資料。要用時在本專案跟 Claude 說「輸出 company.json 給客服用」。
  - 報價、檔期這類不公開的資訊，放在 n8n 或 AI-office 那邊，**不要放進網站 repo**。

---

## 5. 安全檢查清單

- [ ] repo 是公開的：任何 token、API key、LINE channel secret、客戶資料都不能 commit
- [ ] 自動化只寫入 `src/data/social-feed.json` 與 `public/images/social/`
- [ ] GitHub token 只授權這個 repo、只開 Contents 權限，設定到期日並記得更新
- [ ] 換網域時：改 `src/constants/site.ts` 的 `SITE_URL`、GitHub Pages 自訂網域、GoDaddy DNS，並更新 Search Console 與 GA4。網站端的流程請見本專案的 Claude 記憶，或直接請 Claude 協助

---

最後更新：2026-10-28
