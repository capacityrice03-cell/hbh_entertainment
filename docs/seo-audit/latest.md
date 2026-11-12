# SEO Audit Report

**Project:** practice1（好不好娛樂官網 hbh-tw.store）
**Framework:** Next.js 16.4.2（App Router、靜態輸出 `output: "export"`，部署在 GitHub Pages；沒有 vercel.json、netlify.toml、_headers、middleware 等主機或邊緣設定）
**Audit Date:** 2026-11-13T04:06:37+08:00
**Auditor:** ai-seo plugin 2.1.0
**Lenses:** SEO, AEO, GEO
**Knowledge Source:** Context7 MCP
**Scope:** Entire solution
**Live Check:** https://hbh-tw.store
**Web Search:** Not run
**Question Map:** None
**Settings:** Lenses = All (answer)；Scope = Entire solution (answer)；Version control = commit audits (answer)；Live check = Codebase + live URL，https://hbh-tw.store (answer)；Web search = Not run (answer)。依網站負責人的決定，場域租借頁（`/venue/`）不做 SEO，不列入檢查。

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 99.1/100 | A+ | ➡️ from 99.9 | 0 | 0 | 1 | 2 |
| AEO | Answer Readiness | 97.7/100 | A+ | ➡️ from 98 | 0 | 0 | 2 | 5 |
| GEO | Citation Readiness | 94.4/100 | A | ➡️ from 94 | 0 | 1 | 6 | 4 |

Each lens is scored on its own. There is no combined score.

**Summary:** 三項分數和 11/1 幾乎一樣，沒有退步。這次第一次連到正式網站檢查：上線的內容和程式一致，robots.txt、sitemap、轉址都正確，7 種 AI 爬蟲拿到的首頁和一般瀏覽器完全相同。11/1 之後新增的「品牌影音行銷」分頁補上了費用和合作流程，Organization 的官方帳號也從 1 個變 4 個。新發現的問題是「作品集」分頁（`/works/`）：雖然已決定暫不導入，但它仍在正式網站上、Google 可以收錄，而且描述還是草稿。最大的缺口仍然是成果數字沒有附來源，這需要負責人提供資料。

### Top Critical Issues

None found.

---

## SEO: Search Health

### Executive Summary

**SEO Health Score:** 99.1 / 100

**Grade:** A+

**Summary:** 技術面維持接近滿分。正式網站每頁都有自己的標題、描述、canonical 和分享設定，結構化資料全部是合法的 JSON-LD。這次扣分來自暫不導入的作品集分頁仍可被收錄，以及 sitemap 的更新日期沒有跟著 11/8 的改版更新。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 100/100 | 20% |
| Modern Meta Tags | 95/100 | 15% |
| Semantic HTML | 100/100 | 10% |
| Structured Data | 100/100 | 15% |
| Performance Signals | 100/100 | 15% |
| Accessibility | 100/100 | 10% |
| URL Structure | 100/100 | 5% |
| Security Headers | 98/100 | 5% |
| Framework Best Practices | 98/100 | 5% |

#### Issue Counts

- 🔴 **Critical Issues:** 0
- 🟠 **High Priority:** 0
- 🟡 **Medium Priority:** 1
- 🔵 **Low Priority / Suggestions:** 2
- 🟢 **Passing Checks:** 36

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### SEO-1: 暫不導入的作品集分頁仍在正式網站上，Google 可以收錄

**File:** `src/app/works/page.tsx:17`
**Category:** Modern Meta Tags
**Impact:** Medium

**Current Code:**
```tsx
export const metadata: Metadata = {
  title: `${TITLE}｜節目製作・活動策畫・EFP 直播・場域出租｜${SITE.name}`,
  // 草稿：待負責人確認
  description: `${SITE.name}作品集：暖廚家味料理實境節目、品牌代言人記者會、EFP 多機直播、品牌自媒體、企業尾牙與場域出租等實際案例。`,
  alternates: { canonical: PATH },
  ...shareMeta(`${TITLE}｜${SITE.name}`, PATH),
};
```

**Problem:**
11/8 已經把首頁的「綜合瀏覽作品集」按鈕隱藏（`src/components/sections/Cases.tsx:64`），也從 sitemap 拿掉（`src/app/sitemap.ts:29`），但頁面本身還在。正式網站檢查結果：`https://hbh-tw.store/works/` 回傳 200，沒有 `noindex`，canonical 指向自己。11/1 到 11/8 這段期間它在 sitemap 裡，Google 可能已經收錄。這一頁的描述還是「草稿：待負責人確認」，全站也沒有任何連結連到它。

**Recommended Fix:**
```tsx
// 請負責人二選一：
// A. 確定暫時不公開：加上 noindex，等要導入時再拿掉
export const metadata: Metadata = {
  title: `${TITLE}｜節目製作・活動策畫・EFP 直播・場域出租｜${SITE.name}`,
  description: `...`,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  ...shareMeta(`${TITLE}｜${SITE.name}`, PATH),
};
// B. 其實可以公開：確認描述文字、放回 sitemap、恢復首頁按鈕
```

**Source:** https://developers.google.com/search/docs/crawling-indexing/block-indexing

### 🔵 Suggestions & Nice-to-Haves

#### SEO-2: sitemap 的更新日期沒有跟著 11/8 的改版更新

**File:** `src/app/sitemap.ts:10`
**Category:** Framework Best Practices
**Impact:** Low

**Current Code:**
```ts
const UPDATED = {
  home: "2026-11-01",
  venue: "2026-11-01",
  brandVideo: "2026-11-01",
```

**Problem:**
首頁在 11/8 新增了「AI自動化社群更新」區塊和主圖上的標籤，品牌影音行銷頁在 11/8 也改了文字，但 `home`、`brandVideo` 還是 `2026-11-01`。正式網站的 sitemap.xml 顯示的也是 11/1。日期不準，Google 會比較不信任這個欄位。

**Recommended Fix:**
```ts
const UPDATED = {
  home: "2026-11-08",
  venue: "2026-11-01",
  brandVideo: "2026-11-08",
```
首頁的社群貼文每天自動更新，那部分不用每天改日期；只在版面或文案有改時更新。

**Source:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

#### SEO-3: 無法設定 HSTS、CSP 等安全性標頭

**File:** `next.config.ts:11`
**Category:** Security Headers
**Impact:** Low

**Current Code:**
```ts
  output: "export",
```

**Problem:**
GitHub Pages 無法自訂回應標頭。正式網站的回應標頭確認：沒有 `Strict-Transport-Security`、`Content-Security-Policy`、`X-Content-Type-Options`。`Referrer-Policy` 已經用 `<meta name="referrer">` 補上。這是主機限制，不是程式寫錯（和上次報告相同）。

**Recommended Fix:**
```text
維持現狀即可。若日後需要完整的安全性標頭，可以在網域前加一層 Cloudflare 這類 CDN 來設定。
```

**Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security

### ✅ What's Working Well

- ✅ 正式網站 5 個頁面都有各自的 title、description、canonical 和完整的 Open Graph／Twitter 設定
- ✅ `http://`、`www.`、沒有結尾斜線的網址都是 301 轉到正確網址
- ✅ 正式網站的 robots.txt、sitemap.xml 和程式產生的內容一致
- ✅ 每頁只有一個 `<h1>`，標題層級沒有跳級（首頁 37 個標題、品牌影音行銷頁 24 個）
- ✅ 5 筆 JSON-LD 全部是合法 JSON：首頁 `Organization`、`WebSite`，子頁 `BreadcrumbList`，品牌影音行銷頁另有 `Service`
- ✅ 首頁 124 張圖全部是 WebP、都有 `alt`（5 張裝飾用圖示是空 `alt`，正確）、首屏以外延遲載入
- ✅ 首頁 61 個、品牌影音行銷頁 24 個外部連結都有 `rel="noopener noreferrer"`；沒有 `http://` 混合內容
- ✅ 沒有 `keywords` 標籤、IE 寫法、jQuery、float 排版、microdata 或 `<b>`／`<i>`
- ✅ 404 頁回傳 404 狀態碼，並帶 `noindex`
- ✅ 有「跳到主要內容」連結；`lang="zh-Hant"`、viewport、charset 正確

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 暫時不公開的頁面，用 Metadata API 的 `robots: { index: false, follow: true }`；Next.js 會輸出 `<meta name="robots" content="noindex, follow">`。
- 新增頁面時：metadata 加 `...shareMeta()`、`sitemap.ts` 的 `UPDATED` 加日期、用 `JsonLd` + `breadcrumbLd()` 加麵包屑（品牌影音行銷頁都有做到）。
- 改了某頁的版面或文案，同一次更新 `sitemap.ts` 的 `UPDATED`。

### 📊 Core Web Vitals Considerations

Static-analysis findings that may impact Core Web Vitals:

- **LCP (Largest Contentful Paint):** 首頁主圖有 `preload` 和多尺寸 WebP。首頁 HTML 現在約 268 KB（加了社群貼文區），仍在合理範圍。
- **CLS (Cumulative Layout Shift):** 社群貼文圖片都用固定比例（4:5）的容器，風險低。
- **INP (Interaction to Next Paint):** 新增的服務圖示自動動畫每 1.2 秒觸發一次，建議用 PageSpeed Insights 實測手機表現。

Runtime measurement is required for actual Core Web Vitals scores. Use PageSpeed Insights or Chrome DevTools. INP replaced FID in March 2024.

**For deeper a11y coverage, run `/accessibility-audit` from the ai-accessibility plugin.**

---

## AEO: Answer Readiness

### What is AEO?

Answer Engine Optimization (AEO) structures content so a search or answer engine can lift one passage as the direct answer to a specific question: a featured snippet, a voice assistant reply, a direct answer box, or a question-and-answer pair an assistant quotes. Its goal is to be *the* concise answer. Generative Engine Optimization (GEO) is the related discipline: being cited and mentioned inside longer AI answers that draw on many sources.

No markup guarantees a direct answer. Engines choose answers automatically, and Google says its AI features need nothing beyond normal SEO. This section measures how clearly the site answers the questions its readers bring, which is what every engine can use.

### Executive Summary

**Answer Readiness Score:** 97.7 / 100

**Grade:** A+

**Summary:** 新的品牌影音行銷頁用真正的表格列出三種方案的價格，用編號清單列出五步合作流程，這兩項正好回答上次報告說缺少的「費用怎麼算」「合作流程是什麼」。還缺的是：問句式的常見問題區、每項服務的一句話定義，以及價格旁邊的「更新日期」。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Answer-First Formatting | 97/100 | 20% |
| Question Coverage & Headings | 98/100 | 15% |
| Concise Definitions | 95/100 | 10% |
| Snippet-Ready Structure | 98/100 | 15% |
| Snippet Eligibility & Indexing Controls | 100/100 | 15% |
| FAQ Sections & Structured Data | 95/100 | 10% |
| Voice & Assistant Readiness | 100/100（not applicable：場域租借頁不列入） | 5% |
| Answer Trust Signals | 98/100 | 5% |
| Technical Answer Accessibility | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical:** 0
- 🟠 **High:** 0
- 🟡 **Medium:** 2
- 🔵 **Low / Suggestions:** 5
- 🟢 **Passing checks:** 16

Items marked 🧪 rest on industry heuristics or limited features rather than documented engine behavior. Apply judgment.

### Snippet Eligibility Status

| Directive | Where | Scope | Looks intended? |
|-----------|-------|-------|-----------------|
| noindex | `src/app/not-found.tsx`（Next.js 自動加上；正式網站 404 頁確認有 `<meta name="robots" content="noindex">`） | 404 頁 | yes |

No snippet restrictions found on answer pages. 正式網站的回應標頭沒有 `X-Robots-Tag`。

**Manual check:** in Search Console, Settings → "Search generative AI". "Exclude" removes the site from AI Overviews and AI Mode.

### Question Coverage

沒有問題地圖（question map）。兩個答案頁的標題都是描述型，沒有問句式標題：

- 首頁：「服務項目」「短影音經營」「AI自動化社群更新」「實際案例」「聯絡我們」「關於我們」
- 品牌影音行銷頁：「服務內容」「服務方案與費用」「合作流程」「短影音經營」「品牌影音行銷案例」

「服務方案與費用」「合作流程」實質上回答了費用和流程兩個問題。還沒回答的常見問題：製作要多久、服務哪些地區、直播需要哪些場地條件、活動和節目製作怎麼計價。建議執行 `/seo-questions` 整理目標問題。

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### AEO-1: 沒有常見問題區

**File:** `src/app/services/brand-video/page.tsx:182`
**Category:** FAQ Sections & Structured Data
**Impact:** Medium

**Current Code:**
```tsx
        {/* 合作流程 */}
        <section className="bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">合作流程</h2>
```

**Problem:**
品牌影音行銷頁有費用和流程，是放常見問題最合適的頁面，但全站都沒有「問句＋直接回答」的區塊。訪客帶著問題來（例如「一支短影音多久可以交片？」「可以只拍不代操嗎？」），搜尋引擎和 AI 助理找不到可以原句引用的問答。

**Recommended Fix:**
```text
在品牌影音行銷頁的「合作流程」後面加一個常見問題區，每題一個問句標題，第一句直接回答。
問題和答案必須由網站負責人提供，不能由 AI 編寫。可以用 /seo-faq 一題一題整理。
答案用 <details> 呈現時，前幾題要預設展開。
FAQPage 結構化資料可加可不加 🧪：Google 自 2026 年 5 月起已不顯示 FAQ 複合式結果。
```

**Why it matters for AEO:**
問句加上一兩句直接回答，是 Bing／Copilot 說明中最容易被原句引用的格式。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-2: 服務沒有一句話定義

**File:** `src/constants/serviceBrandVideo.ts:8`、`src/constants/services.ts:5`
**Category:** Concise Definitions
**Impact:** Medium

**Current Code:**
```ts
// src/constants/serviceBrandVideo.ts:8-9
  intro:
    "品牌影音行銷不適用一套公式，量身打造雖費時費力，但成效會說話；\n品牌在社群上長期曝光，需要的是與時俱進的正確方向。",

// src/constants/services.ts:5-9
  {
    id: "channel",
    title: "品牌影音行銷",
    items: ["客製化企劃內容", "FB、IG、Threads 帳號 AI 自動化營運"],
    caseHref: "/services/brand-video/",
  },
```

**Problem:**
品牌影音行銷頁開頭那段是理念，沒有說「這項服務是什麼、包含什麼」；同一段也用在 Google 搜尋結果的描述（`description`）。首頁三項服務仍然只有標題和短詞。被問到「好不好娛樂的品牌影音行銷包含什麼」時，沒有一句完整的話可以引用。

**Recommended Fix:**
```ts
// 在理念那段的前面或後面加一句定義，文字請負責人決定，格式示意：
//   "<品牌影音行銷是……，包含 A、B、C>"
// 現有五項服務內容（客製化影音企劃、系列短影音拍攝、社群帳號經營、業配與廣告影片、人物故事短影音）可以當素材。
// 同一句也適合放進這一頁的 description。
```

**Why it matters for AEO:**
「X 是……」這類完整定義句，最容易被當成「某公司提供什麼服務」的答案。

**Source:** https://developers.google.com/search/docs/appearance/featured-snippets

### 🔵 Suggestions & Experimental Practices 🧪

#### AEO-3: 沒有問題地圖

**File:** `docs/seo-audit/`（沒有 `question-map-latest.md`）
**Category:** Question Coverage & Headings
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
沒有整理過目標客戶會搜尋的問題，無法判斷網站涵蓋了哪些、漏了哪些。

**Recommended Fix:**
```text
執行 /seo-questions，整理企業主委託短影音、直播、記者會前常問的問題，再對照網站內容。
```

**Why it matters for AEO:**
有了問題清單，AEO-1 的常見問題區才知道要先回答哪些題目。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

#### AEO-4: 短影音區的說法比較籠統

**File:** `src/components/sections/ShortVideo.tsx:32`
**Category:** Answer-First Formatting
**Impact:** Low

**Current Code:**
```tsx
              每週微小的邊際投入，轉化為<Em>指數型成長</Em>的<Em>商業效益</Em>
```

**Problem:**
「指數型成長」「商業效益」沒有具體內容。這個區塊現在同時出現在首頁和品牌影音行銷頁。下方有連結佐證的觀看數是好的寫法。

**Recommended Fix:**
```text
視覺標語可以保留。若想讓這段更容易被引用，在附近加一句具體說明
（每週產出幾支、經營多久達到多少觀看；數字請負責人提供）。
```

**Why it matters for AEO:**
具體的數字和做法，比形容詞更容易被當成答案引用。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-5: 文字裡夾雜裝飾符號

**File:** `src/components/sections/ShortVideo.tsx:51`、`src/components/sections/ShortVideo.tsx:124`、`src/components/sections/Services.tsx:75`、`src/components/sections/Services.tsx:84`、`src/app/services/brand-video/page.tsx:55`
**Category:** Snippet-Ready Structure
**Impact:** Low

**Current Code:**
```tsx
              次觀看!!
          <p className="mt-1 text-center text-xs text-muted">← 左右滑動看更多 →</p>
              linkText="相關案例引導 →"
            linkText="場地租借資訊 →"
            ← 回服務項目
```

**Problem:**
`!!`、`←`、`→` 在網頁上是視覺效果，被擷取成純文字時會變成雜訊。

**Recommended Fix:**
```tsx
// 箭頭改放在加了 aria-hidden 的 <span> 裡，文字本身保持乾淨，例如：
<span aria-hidden="true">← </span>回服務項目
```

**Why it matters for AEO:**
影響很小，只在文字被逐字引用時才有差別。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-6: 首頁沒有一段完整的公司介紹文字 🧪

**File:** `src/constants/site.ts:97`
**Category:** Answer-First Formatting
**Impact:** Low 🧪

**Current Code:**
```ts
export const ABOUT_PILLARS = [
  {
    image: "/images/about-tv.jpg",
    alt: "電視節目製作團隊與藝人合照",
    lines: ["長年收視率第一之", "電視節目製作團隊經驗"],
```

**Problem:**
「關於我們」由三組短詞組成，沒有一段能回答「好不好娛樂是什麼公司？」的完整句子。完整的一句只在 meta description 裡，頁面上看不到。

**Recommended Fix:**
```text
在「關於我們」標題下加一兩句完整介紹，例如把首頁描述那句放到頁面上：
「好不好娛樂是專為企業、品牌規劃的影音製作團隊，提供系列短影音拍攝、EFP多機直播、……」
文字請負責人確認。
```

**Why it matters for AEO:**
被問到「好不好娛樂是做什麼的」時，頁面上有一句完整的話可以直接引用。

**Source:** https://developers.google.com/search/docs/appearance/featured-snippets

#### AEO-7: 價格旁邊沒有更新日期

**File:** `src/constants/serviceBrandVideo.ts:77`
**Category:** Answer Trust Signals
**Impact:** Low

**Current Code:**
```ts
export const MARKET_PRICE_NOTES = ["以上價格皆為未稅，實際費用依專案需求報價，我們提供專案優惠價。"] as const;
```

**Problem:**
價格會隨時間調整。頁面上看不到這份價格是什麼時候訂的，結構化資料也沒有 `dateModified`。搜尋引擎和 AI 無法判斷「約 12 萬元／月」是不是現在的價格。

**Recommended Fix:**
```ts
// 在備註加一行更新日期（日期用價格實際訂定或最後修改的那天，請負責人確認）：
export const MARKET_PRICE_NOTES = [
  "以上價格皆為未稅，實際費用依專案需求報價，我們提供專案優惠價。",
  "價格更新日期：<YYYY 年 MM 月>",
] as const;
```

**Why it matters for AEO:**
會變動的答案附上日期，才會被當成可信的現況引用。

**Source:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### ✅ What's Working Well

- ✅ 「服務方案與費用」是真正的 `<table>`，有 `<th scope="col">` 欄標題和 `<th scope="row">` 列標題
- ✅ 「合作流程」是真正的 `<ol>`，五個步驟依序排列
- ✅ 價格寫得具體：單次拍攝約 5–10 萬元、品牌IP打造約 12 萬元／月、季約品牌代操約 40 萬元／季，並註明未稅
- ✅ 正式網站確認：價格、流程、開頭介紹都在伺服器回傳的 HTML 裡，不需要執行 JavaScript
- ✅ 沒有 `nosnippet`、`max-snippet`、`data-nosnippet`、`X-Robots-Tag`
- ✅ 沒有「點了才出現」的折疊答案（兩頁的 `<details>` 數量都是 0）
- ✅ 首頁社群貼文都有 `<time datetime>` 標示日期
- ✅ 結構化資料都是 JSON-LD，而且只描述頁面上看得到的內容
- ✅ robots.txt 沒有擋 Applebot、Amzn-SearchBot 等語音助理爬蟲

### Live Check

| URL | 狀態 | robots 設定 | 答案文字在初始 HTML | 主要答案不用點就看得到 | FAQ 標記與畫面一致 | canonical |
|-----|------|-------------|---------------------|------------------------|--------------------|-----------|
| `/` | 200 | 無限制 | yes | yes | n/a | `https://hbh-tw.store/` |
| `/services/brand-video/` | 200 | 無限制 | yes（開頭介紹、三種方案與價格、五步流程） | yes | n/a | `https://hbh-tw.store/services/brand-video/` |
| `/privacy/` | 200 | 無限制 | yes | yes | n/a | `https://hbh-tw.store/privacy/` |
| `/terms/` | 200 | 無限制 | yes | yes | n/a | `https://hbh-tw.store/terms/` |
| 不存在的網址 | 404 | `noindex` | — | — | — | 無 |

正式網站的 `/robots.txt` 和程式產生的內容相同（`User-Agent: *`、`Allow: /`、指向 sitemap），主機沒有另外加規則。

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 加常見問題區時，用同一份資料陣列同時產生畫面和（可選的）FAQPage JSON-LD；JSON-LD 用現有的 `JsonLd` 元件輸出。
- 折疊答案用 `<details>`，不要用 `{open && <Answer />}`，確保答案在 HTML 裡。
- 品牌影音行銷頁是 server component，答案文字都直接輸出；`PriceIcon`、`ServiceIcon` 雖是 client component，但只負責圖示。

### 📊 Content Analysis Summary

- **Answer pages analyzed:** 2（首頁、品牌影音行銷頁；隱私權政策與服務條款屬法律頁，場域租借不列入）
- **Question-shaped headings:** 0 (0 answered in the first sentence)
- **Median answer paragraph length:** 不適用（沒有問句式標題）；服務內容每項約 30–40 字
- **Definitional openings on concept pages:** 0/1（品牌影音行銷頁）
- **Lists and tables in real HTML:** 全部（1 個表格、2 個編號清單，其餘為 `<ul>`）
- **Visible FAQ sections:** 0 (0 with matching FAQPage JSON-LD)
- **Answers rendered only after interaction:** 0
- **Main answers collapsed by default:** 0

---

## GEO: Citation Readiness

### What is GEO?

Generative Engine Optimization (GEO) makes a site worth citing and mentioning inside AI answers that draw on many sources, such as ChatGPT, Perplexity, Claude, Gemini, Copilot and Google's AI Overviews and AI Mode. Its levers are topical authority, original research and evidence, expert authorship, and validation from other sites, on top of letting the right crawlers in.

Answer Engine Optimization (AEO) is the neighboring discipline: being *the* single direct answer in a featured snippet, voice reply or answer box.

No AI provider publishes how it chooses citations. This section measures readiness; it can't measure how often the site is cited today (see "Measuring Citations" below).

### Executive Summary

**Citation Readiness Score:** 94.4 / 100

**Grade:** A

**Summary:** 正式網站測試確認 AI 爬蟲都進得來，拿到的內容和一般訪客相同。比起上次，「品牌影音行銷」有了自己的頁面，Organization 也連上 YouTube、IG、FB、Threads 四個官方帳號。最大的缺口沒變：暖廚家味的募資金額、加盟店數等成果數字沒有附來源；另外兩項核心服務（活動／EFP 直播、節目製作）還沒有獨立頁面。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| AI Crawler Access | 100/100 | 15% |
| Technical AI Accessibility | 100/100 | 10% |
| Topical Authority | 89/100 | 15% |
| Original Research & Evidence | 85/100 | 15% |
| Expert Perspectives & Authorship | 95/100 | 10% |
| External Validation | 90/100 | 10% |
| Entity Clarity | 100/100 | 10% |
| Extractable Passages | 99/100 | 5% |
| Content Freshness | 98/100 | 5% |
| llms.txt & Markdown Access 🧪 | 99/100 | 5% |

#### Issue Counts

- 🔴 **Critical:** 0
- 🟠 **High:** 1
- 🟡 **Medium:** 6
- 🔵 **Low / Suggestions:** 4
- 🟢 **Passing checks:** 18

Items marked 🧪 rest on heuristics, vendor studies or proposals rather than documented engine behavior. Apply judgment.

### 🤖 AI Crawler Access

`src/app/robots.ts` 只有一條規則：`User-agent: *`、`Allow: /`，沒有針對個別機器人的規則，所以下表全部依 `*` 判定。正式網站的 robots.txt 內容相同。

#### Training crawlers and tokens

| Bot | Operator | Controls | Status | Notes |
|-----|----------|----------|--------|-------|
| GPTBot | OpenAI | Training | ❓ Not specified（`*` → allowed） | 正式網站測試 200 |
| ClaudeBot | Anthropic | Training | ❓ Not specified（allowed） | 正式網站測試 200 |
| Google-Extended | Google | Gemini training and grounding (token; no effect on Search) | ❓ Not specified（allowed） | |
| Applebot-Extended | Apple | Apple AI training (token) | ❓ Not specified（allowed） | |
| meta-externalagent | Meta | Training and products | ❓ Not specified（allowed） | |
| Amazonbot | Amazon | Products; may train | ❓ Not specified（allowed） | |
| CCBot | Common Crawl | Open corpus | ❓ Not specified（allowed） | |
| MistralAI-Training | Mistral | Training | ❓ Not specified（allowed） | |
| Bytespider | ByteDance | Reported training; undocumented | ❓ Not specified（allowed） | |

#### AI search indexers

| Bot | Operator | Feeds | Status | Notes |
|-----|----------|-------|--------|-------|
| OAI-SearchBot | OpenAI | ChatGPT search | ❓ Not specified（allowed） | 正式網站測試 200 |
| Claude-SearchBot | Anthropic | Claude search | ❓ Not specified（allowed） | 正式網站測試 200 |
| PerplexityBot | Perplexity | Perplexity | ❓ Not specified（allowed） | 正式網站測試 200 |
| Meta-WebIndexer | Meta | Meta AI search | ❓ Not specified（allowed） | |
| Amzn-SearchBot | Amazon | Alexa and search features | ❓ Not specified（allowed） | |
| MistralAI-Index | Mistral | Mistral search | ❓ Not specified（allowed） | |
| DuckAssistBot | DuckDuckGo | DuckAssist | ❓ Not specified（allowed） | |
| Googlebot | Google | Search, AI Overviews, AI Mode | ❓ Not specified（allowed） | |
| Bingbot | Microsoft | Bing, Copilot | ❓ Not specified（allowed） | |
| Applebot | Apple | Siri, Spotlight, Safari | ❓ Not specified（allowed） | |

#### User-triggered fetchers

| Bot | Operator | Honors robots.txt? | Status | Notes |
|-----|----------|--------------------|--------|-------|
| ChatGPT-User | OpenAI | May not | ❓ Not specified（allowed） | 正式網站測試 200 |
| Claude-User | Anthropic | Yes | ❓ Not specified（allowed） | 正式網站測試 200 |
| Perplexity-User | Perplexity | Generally not | ❓ Not specified（allowed） | |
| meta-externalfetcher | Meta | May not | ❓ Not specified（allowed） | |
| Amzn-User | Amazon | Not fully | ❓ Not specified（allowed） | |
| MistralAI-User | Mistral | See docs | ❓ Not specified（allowed） | |
| Google-Agent | Google | Generally not | ❓ Not specified（allowed） | |

#### Other AI controls found

404 頁的 `noindex`（刻意設定，AEO 檢查已列出）。沒有 `nosnippet`、`max-snippet`、`data-nosnippet`、`nocache`、`noarchive`、`noai`、`Content-Signal`、已停用的機器人名稱，也沒有 middleware。

**Manual check:** Search Console → Settings → "Search generative AI". "Exclude" removes the site from AI Overviews and AI Mode.

**Analysis:** 全部開放，而且這次在正式網站上實測確認。對一個希望被企業主找到的服務型網站，這通常就是想要的設定：網站可以出現在 ChatGPT、Perplexity、Claude、Copilot 和 Google AI 摘要的答案裡，代價是內容也可能被拿去訓練模型。如果日後想「被引用但不被拿去訓練」，可以只擋訓練用爬蟲（GPTBot、ClaudeBot、Google-Extended、CCBot 等），同時保留搜尋用爬蟲；`/seo-fix` 會逐組詢問。

### 🌐 Live Check

檢查時間：2026-11-13 04:05（台灣時間）。網站由 GitHub Pages 提供（回應標頭 `Server: GitHub.com`，經 Fastly），沒有經過 Cloudflare。

**robots.txt：** 正式網站和程式產生的內容相同，主機沒有加規則，也沒有 `Content-Signal`。

**llms.txt：** `https://hbh-tw.store/llms.txt` 回傳 404（沒有這個檔案）。

**頁面：**

| URL | 狀態 | X-Robots-Tag | robots meta | 主要內容在 HTML |
|-----|------|--------------|-------------|-----------------|
| `/` | 200 | 無 | 無 | yes |
| `/services/brand-video/` | 200 | 無 | 無 | yes |
| `/works/` | 200 | 無 | 無（可被收錄，見 SEO-1） | 部分（卡片標題在；完整介紹要點開才顯示） |
| `/privacy/` | 200 | 無 | 無 | yes |
| `/terms/` | 200 | 無 | 無 | yes |

**AI user agent 測試（首頁）：**

| Bot | 狀態 | 大小（bytes） | 和瀏覽器比 |
|-----|------|---------------|------------|
| 一般瀏覽器 | 200 | 267,875 | — |
| GPTBot | 200 | 267,875 | 相同 |
| OAI-SearchBot | 200 | 267,875 | 相同 |
| ChatGPT-User | 200 | 267,875 | 相同 |
| ClaudeBot | 200 | 267,875 | 相同 |
| Claude-SearchBot | 200 | 267,875 | 相同 |
| Claude-User | 200 | 267,875 | 相同 |
| PerplexityBot | 200 | 267,875 | 相同 |

GPTBot 拿到的內容和瀏覽器逐字相同。這項測試是用模擬的 user agent 做的，結果僅供參考；GitHub Pages 沒有防火牆規則可設定，實際爬蟲應該也是同樣結果。

**Markdown negotiation 🧪：** 帶 `Accept: text/markdown` 請求首頁，回傳的仍是 HTML（`text/html`）。僅供參考，不需要處理。

### 🔎 Off-site Snapshot (not scored)

Not run. Pass `search=yes` with a live URL to `/seo-audit` to include it.

#### External validation checklist

- [ ] Wikidata item for the organization (Wikipedia article only if notable)
- [ ] Current profiles on the main review platforms for this vertical（例如 Google 商家檔案）
- [ ] Listings in relevant industry directories（例如影視製作、活動公司名錄）
- [ ] Independent coverage (press, analyst, expert blogs)（已有工商時報、TVBS，見 GEO-5）
- [ ] Brand's own, disclosed participation in community discussions
- [ ] Brand name and description consistent across all of the above

### 📄 llms.txt Status 🧪

- **llms.txt:** missing（正式網站回傳 404）
- **llms-full.txt:** missing
- **Format:** 不適用
- **Staleness:** 不適用
- **Discovery hints:** 都沒有

Google says Google Search ignores llms.txt, and no other major AI search provider has said it uses it for ranking or citation. Treat it as a low-cost extra, most useful for developer documentation. Lighthouse's agentic browsing audit checks for it, and some coding tools read it. `/seo-llms-txt` creates, updates and validates it.

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

#### GEO-1: 關鍵數字沒有附來源

**File:** `src/constants/warmKitchen.ts:24`、`src/constants/cases.ts:13`、`src/constants/cases.ts:218`
**Category:** Original Research & Evidence
**Impact:** High

**Current Code:**
```ts
// src/constants/warmKitchen.ts:24-28
export const WARM_METRICS = [
  { value: "3,300萬+", label: "線上課程募資金額" },
  { value: "8,144份", highlight: "前一季", label: "捐出食物包" },
  { value: "1,357戶", label: "弱勢、急難家庭受助" },
  { value: "1,300公里", label: "志工環台親送" },

// src/constants/cases.ts:13
    client: "三年即達成全台加盟店面超過十間。",

// src/constants/cases.ts:218
      "結合記者會、媒體曝光與 KOL 宣傳：FB 與 YouTube 雙平台同步直播，事前號召代言人粉絲，現場百名粉絲入場，獲數十家媒體報導。",
```

**Problem:**
這些是網站上最有說服力的成果數字，旁邊沒有說明資料來源和時間（和上次報告相同，尚未處理）。短影音的觀看數都直接連到原始貼文，是很好的示範。GEO 研究指出，附上來源的統計數字是提高被 AI 引用機率最有效的做法之一。

**Recommended Fix:**
```text
每個數字旁邊加上來源和時間，連到可以查證的頁面，例如：
- 3,300萬+、8,144份、1,357戶：註明「資料來源：1919 食物銀行／課程平台，截至 YYYY 年 MM 月」並連到公開頁面
- 「超過十間」：連到炸綺來的門市列表
- 「數十家媒體報導」：列出幾則報導連結
來源和日期必須由網站負責人提供，不能自行推測。
```

**Why it matters for GEO:**
AI 傾向引用可以查證的數字；沒有來源的數字可能被忽略，或被當成行銷話術。

**Source:** https://arxiv.org/abs/2311.09735

### 🟡 Medium Priority Issues

#### GEO-2: 三項核心服務只有一項有獨立頁面

**File:** `src/constants/services.ts:11`
**Category:** Topical Authority
**Impact:** Medium

**Current Code:**
```ts
  {
    id: "event",
    title: "活動 / EFP 直播 / 媒體廣告",
    items: ["多機位/多平台 直播", "各類型活動統籌", "平面/動態 攝影紀錄", "記者會/新聞媒體投放"],
  },
  {
    id: "commercial",
    title: "節目製作",
    items: ["電視/OTT節目製作", "專案策劃&統籌"],
    caseHref: "#warm-kitchen",
  },
```

**Problem:**
「品牌影音行銷」已經有自己的頁面（上次報告的 GEO-1，從 High 降為 Medium）。另外兩項「活動／EFP 直播／媒體廣告」「節目製作」仍然只有首頁上的幾個短詞，連結也只跳到首頁的案例錨點。10 個案例也還沒有各自的頁面。AI 回答「EFP 多機直播團隊」這類問題時，沒有一頁專講這個主題的內容可以引用。（以主題深度判斷權威是常見的經驗法則，各家 AI 都沒有公開具體的排名因素。）

**Recommended Fix:**
```text
照品牌影音行銷頁的做法，依營業重要性逐項新增：
- /services/event-live/：活動與 EFP 直播的服務內容、流程、相關案例
- /services/program/：節目製作
新增後把 services.ts 的 caseHref 指到新頁面，並在各服務頁之間互相連結。
頁面內容需要負責人提供。
```

**Why it matters for GEO:**
有一頁專講某個主題、並和相關案例互相連結，AI 才有完整的頁面可以引用。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

#### GEO-3: 作品集分頁沒有任何連結連到它

**File:** `src/app/works/page.tsx:17`
**Category:** Topical Authority
**Impact:** Medium

Same as SEO-1。這一頁在正式網站上存在，但首頁按鈕已隱藏、也不在 sitemap，等於是孤立頁面。決定公開或加 `noindex` 之後，這項一併解決。

#### GEO-4: 「長年收視率第一」沒有說明是哪個節目

**File:** `src/constants/site.ts:101`
**Category:** Original Research & Evidence
**Impact:** Medium

**Current Code:**
```ts
    lines: ["長年收視率第一之", "電視節目製作團隊經驗"],
```

**Problem:**
「收視率第一」是很強的說法，但沒有說是哪個節目、哪個時段、根據哪份收視調查。沒有佐證的最高級說法，會降低 AI 對整段內容的信任（和上次報告相同，尚未處理）。

**Recommended Fix:**
```text
寫出節目名稱、播出平台和年份，最好附上收視報導連結，例如：
「曾任《<節目名稱>》（<頻道>，<年份>）製作團隊，該節目連續 N 年同時段收視第一（<來源連結>）」
內容請由網站負責人提供。
```

**Why it matters for GEO:**
具名、可查證的經歷，才會被 AI 當成專業背景引用。

**Source:** https://arxiv.org/abs/2311.09735

#### GEO-5: TVBS 報導沒有連到原始新聞

**File:** `src/constants/warmKitchen.ts:44`
**Category:** External Validation
**Impact:** Medium

**Current Code:**
```ts
    caption: "TVBS 新聞台報導《暖廚家味》記者會",
```

**Problem:**
網站播放的是自己存的影片檔，沒有連到 TVBS 的原始新聞頁。只放影片和說明文字，AI 無法追到報導本身。工商時報那篇已經有連結，是正確做法（和上次報告相同，尚未處理）。

**Recommended Fix:**
```text
在說明文字旁邊加上 TVBS 新聞的原始網址（例如 news.tvbs.com.tw 或 TVBS 官方 YouTube 頻道的報導連結）。
網址請由網站負責人提供。
```

**Why it matters for GEO:**
AI 搜尋引擎很重視第三方報導；有連結，AI 才能確認這份報導真的存在。

**Source:** https://arxiv.org/abs/2509.08919

#### GEO-6: 沒有客戶推薦語

**File:** `src/constants/cases.ts`（10 個案例都沒有推薦語欄位）
**Category:** External Validation
**Impact:** Medium

**Current Code:** N/A — element absent

**Problem:**
案例都寫了真實的客戶名稱，這是加分的，但沒有任何客戶自己說的話。具名客戶的推薦語是很有力的第三方肯定（和上次報告相同，尚未處理）。

**Recommended Fix:**
```text
向合作過的客戶取得一兩句推薦語，並取得授權，註明姓名、職稱和公司，放在對應的案例裡。
絕對不要自己編寫推薦語。
```

**Why it matters for GEO:**
具名推薦語讓 AI 有第三方說法可以引用，而不只有公司自己的說法。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

#### GEO-7: 網站沒有說明公司背後是誰

**File:** `src/components/sections/About.tsx:9`
**Category:** Expert Perspectives & Authorship
**Impact:** Medium

**Current Code:**
```tsx
        <SectionTitle title="關於我們" en="About Us" />
```

**Problem:**
「關於我們」只有三組能力短詞，沒有負責人或核心團隊的名字、經歷，也沒有成立年份或公司登記名稱（和上次報告相同，尚未處理）。

**Recommended Fix:**
```text
在「關於我們」加上：
- 創辦人或製作人的姓名、職稱與代表作品
- 成立年份、公司登記名稱（如有）
之後可以再加上 Person 結構化資料，以及 Organization 的 foundingDate、founder。內容請由負責人提供。
```

**Why it matters for GEO:**
AI 在推薦服務商時，會優先引用身分清楚、有具名專業人士的來源。

**Source:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### 🔵 Suggestions & Experimental Practices 🧪

#### GEO-8: 沒有 dateModified

**File:** `src/app/page.tsx:45`
**Category:** Content Freshness
**Impact:** Low

**Current Code:**
```tsx
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: `${SITE_URL}/`,
};
```

**Problem:**
5 個頁面的結構化資料都沒有 `dateModified`。sitemap 有各頁的更新日期（但目前沒跟上，見 SEO-2）。

**Recommended Fix:**
```tsx
// 把 sitemap.ts 的 UPDATED 匯出共用，各頁加一筆 WebPage JSON-LD：
{ "@context": "https://schema.org", "@type": "WebPage", url: `${SITE_URL}/`, dateModified: UPDATED.home }
// 日期只在內容真的有改時才更新。
```

**Why it matters for GEO:**
有研究指出 AI 重排序會偏好較新的日期；真實的更新日期讓 AI 知道內容仍在維護。

**Source:** https://arxiv.org/abs/2509.11353

#### GEO-9: 「關於我們」是拆開的短詞 🧪

**File:** `src/components/sections/About.tsx:27`
**Category:** Extractable Passages
**Impact:** Low 🧪

**Current Code:**
```tsx
                {p.lines.map((line) => (
                  <p key={line} className="text-lg font-medium tracking-wide text-brand-navy">
                    {line}
                  </p>
                ))}
```

**Problem:**
「長年收視率第一之」「電視節目製作團隊經驗」被拆成兩個 `<p>`。被單獨擷取時，前半句看不懂意思。

**Recommended Fix:**
```text
視覺上可以維持分行，但用同一個 <p> 加 <br> 呈現，讓 HTML 裡是一句完整的話；
或在下方補一段完整介紹（見 AEO-6）。
```

**Why it matters for GEO:**
完整的句子才能被當成段落引用。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### GEO-10: 沒有 llms.txt 🧪

**File:** `public/`（沒有 `llms.txt`；正式網站回傳 404）
**Category:** llms.txt & Markdown Access 🧪
**Impact:** Low 🧪

**Current Code:** N/A — element absent

**Problem:**
這是 2024 年提出的提案，Google 搜尋明確表示不使用，其他 AI 搜尋也沒有說會用它來排名或引用。對服務型網站幫助很小。

**Recommended Fix:**
```text
可做可不做。想加的話用 /seo-llms-txt 產生，放在 public/llms.txt。
```

**Why it matters for GEO:**
成本很低，但效果沒有證據，優先順序最低。

**Source:** https://llmstxt.org/

#### GEO-11: 首頁社群區塊沒有說明它和服務的關係 🧪

**File:** `src/components/sections/IgFeed.tsx:172`
**Category:** Topical Authority
**Impact:** Low 🧪

**Current Code:**
```tsx
        <SectionTitle title="AI自動化社群更新" en="Auto-update social media" />
```

**Problem:**
這個區塊每天放進 9 則社群貼文，題目是時事趣聞（好萊塢女星、拉麵連鎖、Netflix 影集等），和影音製作沒有直接關係。區塊只有標題，沒有一句話說明「這些貼文是好不好娛樂用 AI 自動化經營社群的實際成果」。AI 擷取首頁時，會讀到一批和公司業務無關的標題，卻不知道它們是服務的示範。（主題集中度是經驗法則，不是公開的排名因素。）

**Recommended Fix:**
```text
在標題下方加一句說明，把這個區塊和「社群帳號 AI 自動化營運」服務連起來，
例如說明這是哪個帳號、由誰經營、多久更新一次。文字請負責人決定。
```

**Why it matters for GEO:**
有了這句話，這個區塊就從「無關的內容」變成「服務的實證」。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

### ✅ What's Working Well

- ✅ 正式網站實測：7 種 AI user agent 都拿到 200，內容和一般瀏覽器相同，沒有針對機器人顯示不同內容
- ✅ robots.txt 對所有爬蟲開放，正式網站和程式一致
- ✅ 全站靜態輸出，內容都在初始 HTML 裡
- ✅ 「品牌影音行銷」有獨立頁面，包含服務內容、價格、流程和 3 個相關案例（上次 GEO-1 的第一步，已完成）
- ✅ `Organization` 的 `sameAs` 連到 YouTube、Instagram、Facebook、Threads 四個官方帳號（上次 GEO-7，已修正）
- ✅ 品牌影音行銷頁有 `Service` JSON-LD，`provider` 指回好不好娛樂
- ✅ 價格是自家訂的第一手資料，寫得具體
- ✅ 短影音觀看數都直接連到原始 IG／FB 貼文，可以查證
- ✅ 案例都寫了真實客戶名稱，並連到客戶官網或作品；工商時報報導有連到原文
- ✅ 社群貼文每則都連到原始貼文，並有 `<time>` 標示日期
- ✅ 全站 HTTPS；`http://` 和 `www.` 都 301 轉到正式網址；404 頁回傳正確的 404 狀態碼
- ✅ 有隱私權政策、服務條款、聯絡方式；子頁面都有 `BreadcrumbList`

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 新增其他服務頁（GEO-2）時，沿用 `src/app/services/brand-video/page.tsx` 的結構，文字放在 `src/constants/` 的獨立檔案。
- 案例要獨立成頁時，用 `src/app/cases/[slug]/page.tsx` 搭配 `generateStaticParams()`，資料沿用 `src/constants/cases.ts`。
- `dateModified` 和 `sitemap.ts` 共用同一份日期，避免兩邊不一致。
- 若想區分「訓練」和「搜尋」爬蟲，把 `src/app/robots.ts` 的 `rules` 改成陣列，逐一列出機器人。

### 📊 Content Analysis Summary

- **Content pages analyzed:** 3（首頁、品牌影音行銷頁、作品集；場域租借不列入，隱私權政策與服務條款屬法律頁）
- **Core topics:** 品牌影音行銷、活動／EFP 直播／媒體廣告、節目製作 (pages per topic: 1, 0, 0)
- **Hub pages / orphan pages / thin pages:** 1 / 1 / 0（品牌影音行銷頁是主題頁；作品集是孤立頁面）
- **Pages with first-party data:** 2（首頁的案例成果數字、品牌影音行銷頁的價格）
- **Numeric claims with a linked source:** 7/14（短影音觀看數有連結；募資金額、食物包、受助戶數、環台公里數、加盟店數、媒體報導數、粉絲入場數沒有）
- **Bylined content pages:** 0/0（沒有文章類頁面）(author pages with `Person` markup: 0)
- **Organization `sameAs` links:** 4
- **Pages with dateModified:** 0/5

### 📈 Measuring Citations

This audit measures readiness, not citations. To track citations over time:

- **Bing Webmaster Tools → AI Performance** (public preview since February 2026): citations in Copilot, Bing AI summaries and some partners, with cited pages and grounding queries. No click data.
- **Google Search Console → Generative AI performance report** (since June 2026, all sites since August 31, 2026): impressions in AI Overviews and AI Mode by page, country and device. AI feature traffic is also counted in the Web search type of the main Performance report.
- **Server logs:** requests from the AI user agents above, verified against each operator's published IP ranges.（GitHub Pages 不提供原始日誌，這項做不到。）
- **A fixed question panel:** ask ChatGPT, Perplexity, Claude, Gemini and Copilot the same questions each month (`/seo-questions` can build the list) and record whether the site is cited or mentioned. Answers vary by user, session and location, so look at trends, not single runs.

---

## 🎯 Prioritized Action Plan

Across all audited lenses, ranked by impact for the effort:

1. **[Quick Win]** SEO-1（同 GEO-3）：決定作品集分頁要公開還是加 `noindex`（需要負責人決定）
2. **[Quick Win]** SEO-2：把 sitemap 的首頁、品牌影音行銷頁日期更新為 2026-11-08（技術修正，可直接改）
3. **[Quick Win]** GEO-1：成果數字旁加上來源連結和日期（需要負責人提供來源）
4. **[Quick Win]** GEO-5：TVBS 報導加上原始新聞連結（需要負責人提供網址）
5. **[Quick Win]** AEO-7、GEO-8：價格加更新日期；各頁加 `dateModified`
6. **[Quick Win]** GEO-4、GEO-7、AEO-6：「關於我們」寫出具名經歷和一段完整的公司介紹
7. **[Medium Effort]** AEO-2、GEO-11：品牌影音行銷加一句定義；社群區塊加一句說明
8. **[Medium Effort]** AEO-1、AEO-3：用 `/seo-questions` 整理問題，再用 `/seo-faq` 做常見問題區
9. **[Medium Effort]** GEO-6：向客戶取得具名推薦語
10. **[Larger Effort]** GEO-2：活動／EFP 直播、節目製作各做一頁
11. **[Optional]** AEO-4、AEO-5、GEO-9、GEO-10、SEO-3

---

## 🔧 Remediation

```
/seo-fix              # apply fixes from this report
/seo-fix --dry-run    # preview the diffs without writing
/seo-schema           # WebPage dateModified、Organization founder 等結構化資料
/seo-questions        # 整理目標客戶會問的問題，對照網站內容
/seo-faq              # 建立常見問題區（答案由負責人提供）
/seo-llms-txt         # 建立 llms.txt（可選）
/seo-crawl            # 連到正式網站檢查 SEO 基本項目（狀態碼、轉址、標頭）
```

---

## 📚 Resources

### SEO

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [web.dev - Learn SEO](https://web.dev/learn/seo/)
- [MDN - HTML Meta Tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Core Web Vitals](https://web.dev/articles/vitals)

### AEO

- [Featured snippets and your website (Google)](https://developers.google.com/search/docs/appearance/featured-snippets)
- [Robots meta tag, data-nosnippet and X-Robots-Tag (Google)](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [AI features and your website (Google)](https://developers.google.com/search/docs/appearance/ai-features)
- [Search Console control for AI features (Google)](https://support.google.com/webmasters/answer/16908024)
- [Bing controls for Copilot: NOCACHE and NOARCHIVE (Microsoft)](https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat)
- [Optimizing for generative AI search (Google)](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Optimizing your content for inclusion in AI search answers (Microsoft)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- [FAQPage (Schema.org)](https://schema.org/FAQPage)
- [QAPage structured data (Google)](https://developers.google.com/search/docs/appearance/structured-data/qapage)
- [General structured data guidelines (Google)](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Speakable (Google, beta, news only)](https://developers.google.com/search/docs/appearance/structured-data/speakable)

### GEO

- [GEO: Generative Engine Optimization (Aggarwal et al., KDD 2024)](https://arxiv.org/abs/2311.09735)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/guides/bots)
- [Google common crawlers, including Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- [Google user-triggered fetchers](https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers)
- [Applebot](https://support.apple.com/en-us/119829)
- [Meta web crawlers](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers)
- [Amazonbot](https://developer.amazon.com/amazonbot)
- [Bing Webmaster Tools AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [Cloudflare Content Signals Policy](https://blog.cloudflare.com/content-signals-policy)
- [llms.txt proposal](https://llmstxt.org/)

---

## 🔍 Audit Methodology

Performed by the `ai-seo` plugin using Context7 MCP for real-time documentation（Next.js Metadata API）.

**Files analyzed:** 28（原始碼與設定檔），加上正式網站的 9 個回應
**Routes detected:** 6（`/`、`/services/brand-video/`、`/works/`、`/venue/`、`/privacy/`、`/terms/`，另有 404 頁）
**Answer pages:** 2
**Content pages:** 3
**Live URLs fetched:** 9（5 個頁面、robots.txt、sitemap.xml、llms.txt、一個不存在的網址；另有 3 次轉址測試、7 次 AI user agent 測試、1 次 Markdown 測試）
**Web searches run:** 0

### Limitations

#### SEO

- Static analysis only (no runtime Core Web Vitals measurement)
- Does not crawl external links
- Does not test server response headers (recommend a separate HTTP header audit)；這次只看了首頁的回應標頭
- Accessibility is surface-level. For WCAG 2.1/2.2 compliance, run `/accessibility-audit` from the ai-accessibility plugin.

#### AEO

- Static analysis estimates readiness. It can't see which queries trigger a featured snippet today or who holds it.
- Engines choose direct answers automatically and change how they do it often.
- Word-count and formatting targets are industry heuristics, marked 🧪. Google publishes no length rule.
- Third-party tracking shows featured snippets on fewer results as AI Overviews spread; readiness here also serves "People also ask", assistants and AI answers, but no engine documents how it picks a quoted passage.
- Voice assistants now run on large models with their own sources (Gemini, Alexa+, Siri), which isn't documented well enough to test from code.
- Doesn't measure traffic or zero-click effects. Use Search Console and Bing Webmaster Tools for that.

#### GEO

- No AI provider publishes how it picks citations; the categories and weights here are informed judgment based on the GEO research and the Google and Microsoft guidance above.
- For Google's AI features, Google says normal SEO is all that's needed. Audit the SEO lens as well.
- Static analysis can't see off-site reputation; the off-site snapshot is a dated sample, not a census.
- robots.txt states policy; it doesn't prove enforcement. Live user-agent tests are indicative because CDNs verify crawlers by IP.
- Doesn't measure citation frequency (see "Measuring Citations").

---

*Generated by [ai-seo](https://github.com/charlesjones-dev/ai-agent-plugins), a plugin for search, answer engine and generative engine optimization.*
