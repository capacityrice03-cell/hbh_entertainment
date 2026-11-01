# SEO Audit Report

**Project:** practice1（好不好娛樂官網 hbh-tw.store）
**Framework:** Next.js 16.4.2（App Router、靜態輸出 `output: "export"`，部署在 GitHub Pages；沒有 vercel.json、netlify.toml、_headers、middleware 等主機或邊緣設定）
**Audit Date:** 2026-11-01T10:15:48+08:00
**Auditor:** ai-seo plugin 2.1.0
**Lenses:** SEO, AEO, GEO
**Knowledge Source:** Context7 MCP
**Scope:** Entire solution
**Live Check:** Not run
**Web Search:** Not run
**Question Map:** None
**Settings:** Lenses = All (answer)；Scope = Entire solution (answer)；Version control = commit audits (answer)；Live check = Codebase only (answer)；Web search = Not run（沒有選 live URL）。依網站負責人的決定，場域租借頁（`/venue/`）不是主要營業項目，不列入內容與描述檢查。

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 99.9/100 | A+ | ➡️ from 98 | 0 | 0 | 0 | 1 |
| AEO | Answer Readiness | 98/100 | A+ | first run | 0 | 0 | 2 | 4 |
| GEO | Citation Readiness | 94/100 | A | first run | 0 | 2 | 4 | 4 |

Each lens is scored on its own. There is no combined score.

**Summary:** 技術面（SEO）已經接近滿分，唯一剩下的是 GitHub Pages 無法自訂安全性標頭。AEO 分數高，主要是因為網站是作品集型的一頁式官網，可被當成「直接答案」檢查的內容本來就少；真正缺的是常見問題區（費用、流程、時程等）和每項服務的一句話說明。GEO 最大的缺口有兩個：所有服務和案例都擠在首頁，沒有各自的獨立頁面；暖廚家味的募資金額、加盟店數等關鍵數字旁邊沒有附來源連結。這些都需要網站負責人提供內容，不能由 AI 代寫。

### Top Critical Issues

None found.

---

## SEO: Search Health

### Executive Summary

**SEO Health Score:** 99.9 / 100

**Grade:** A+

**Summary:** 上次報告的服務條款描述、影片封面 WebP、referrer 政策、分享預覽描述都已修好。唯一剩下的扣分是 GitHub Pages 的主機限制，在程式裡無法處理。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 100/100 | 20% |
| Modern Meta Tags | 100/100 | 15% |
| Semantic HTML | 100/100 | 10% |
| Structured Data | 100/100 | 15% |
| Performance Signals | 100/100 | 15% |
| Accessibility | 100/100 | 10% |
| URL Structure | 100/100 | 5% |
| Security Headers | 98/100 | 5% |
| Framework Best Practices | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical Issues:** 0
- 🟠 **High Priority:** 0
- 🟡 **Medium Priority:** 0
- 🔵 **Low Priority / Suggestions:** 1
- 🟢 **Passing Checks:** 35

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

None found.

### 🔵 Suggestions & Nice-to-Haves

#### SEO-1: 無法設定 HSTS、CSP 等安全性標頭

**File:** `next.config.ts:11`
**Category:** Security Headers
**Impact:** Low

**Current Code:**
```ts
  output: "export",
```

**Problem:**
GitHub Pages 無法自訂回應標頭。`Referrer-Policy` 已經改用 `<meta name="referrer">` 補上；HSTS、CSP、`X-Content-Type-Options` 則只能靠主機或 CDN 設定。這是主機限制，不是程式寫錯。

**Recommended Fix:**
```text
維持現狀即可。若日後需要完整的安全性標頭，可以在網域前加一層 Cloudflare 這類 CDN 來設定。
```

**Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security

### ✅ What's Working Well

- ✅ 服務條款描述已補成完整的一句話（上次 SEO-1，已修正）
- ✅ 分享預覽改用副標語「提供精準的客製化服務」，不再是空白（上次 SEO-2，已修正）
- ✅ 影片封面改用建置時產生的 WebP（`optimizedSrc()`），約 61 KB，原圖約 182 KB（上次 SEO-4，已修正）
- ✅ `metadata.referrer` 已設為 `strict-origin-when-cross-origin`（上次 SEO-5 中能在程式裡處理的部分）
- ✅ 沒有 `keywords` 標籤、IE 寫法、jQuery、float 排版、microdata 或 `<b>`/`<i>`
- ✅ 每頁都有自己的 title、description、canonical 和完整的分享設定；`metadataBase`、`lang="zh-Hant"`、viewport 都正確
- ✅ 首頁有 `Organization`、`WebSite` JSON-LD，子頁面有 `BreadcrumbList`
- ✅ 圖片在建置時產生多尺寸 WebP，每張都有 `alt`、尺寸和 `decoding="async"`，首屏以外的圖片延遲載入
- ✅ 每頁只有一個 `<h1>`、標題層級沒有跳級；有「跳到主要內容」連結
- ✅ 外部連結的 `rel` 正確，沒有混合內容
- ✅ 404 頁是 `noindex`，不沿用首頁的描述和 canonical
- ✅ sitemap 用各頁真正的更新日期，robots.txt 有指向 sitemap

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 依 Context7 查到的 Next.js 16 文件，子頁面寫了 `openGraph` 就會整組取代上層設定；目前用 `shareMeta()` 處理是正確做法。
- 新增頁面時：metadata 加 `...shareMeta()`、`sitemap.ts` 的 `UPDATED` 加日期、用 `JsonLd` + `breadcrumbLd()` 加麵包屑。
- 不經過 `next/image` 的圖片用 `optimizedSrc()` 取得 WebP。

### 📊 Core Web Vitals Considerations

Static-analysis findings that may impact Core Web Vitals:

- **LCP (Largest Contentful Paint):** 首屏大圖有 `preload`，並依螢幕寬度提供 WebP（手機約 70 KB）。
- **CLS (Cumulative Layout Shift):** 圖片都有固定比例或尺寸，字型由 `next/font` 處理，風險低。
- **INP (Interaction to Next Paint):** 互動元件不多（案例篩選、短影音牆），看不出明顯的長任務。

Runtime measurement is required for actual Core Web Vitals scores. Use PageSpeed Insights or Chrome DevTools. INP replaced FID in March 2024.

---

## AEO: Answer Readiness

### What is AEO?

Answer Engine Optimization (AEO) structures content so a search or answer engine can lift one passage as the direct answer to a specific question: a featured snippet, a voice assistant reply, a direct answer box, or a question-and-answer pair an assistant quotes. Its goal is to be *the* concise answer. Generative Engine Optimization (GEO) is the related discipline: being cited and mentioned inside longer AI answers that draw on many sources.

No markup guarantees a direct answer. Engines choose answers automatically, and Google says its AI features need nothing beyond normal SEO. This section measures how clearly the site answers the questions its readers bring, which is what every engine can use.

### Executive Summary

**Answer Readiness Score:** 98 / 100

**Grade:** A+

**Summary:** 網站沒有任何會擋住摘要的設定，內容全部在靜態 HTML 裡，清單也都是真正的 `<ul>`／`<ol>`。分數高的主要原因是可檢查的「答案內容」很少：整個網站只有首頁算是答案頁，而且沒有問句式標題或常見問題區。最大的缺口是：企業主常問的費用、流程、時程等問題，網站上都找不到答案。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Answer-First Formatting | 98/100 | 20% |
| Question Coverage & Headings | 98/100 | 15% |
| Concise Definitions | 95/100 | 10% |
| Snippet-Ready Structure | 98/100 | 15% |
| Snippet Eligibility & Indexing Controls | 100/100 | 15% |
| FAQ Sections & Structured Data | 95/100 | 10% |
| Voice & Assistant Readiness | 100/100（not applicable：沒有實體門市資料） | 5% |
| Answer Trust Signals | 100/100 | 5% |
| Technical Answer Accessibility | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical:** 0
- 🟠 **High:** 0
- 🟡 **Medium:** 2
- 🔵 **Low / Suggestions:** 4
- 🟢 **Passing checks:** 14

Items marked 🧪 rest on industry heuristics or limited features rather than documented engine behavior. Apply judgment.

### Snippet Eligibility Status

| Directive | Where | Scope | Looks intended? |
|-----------|-------|-------|-----------------|
| noindex | `src/app/not-found.tsx`（Next.js 自動加上） | 404 頁 | yes |

No snippet restrictions found on answer pages.

**Manual check:** in Search Console, Settings → "Search generative AI". "Exclude" removes the site from AI Overviews and AI Mode.

### Question Coverage

沒有問題地圖（question map）。首頁的標題都是描述型（「服務項目」「短影音經營」「實際案例」「聯絡我們」「關於我們」），沒有問句式標題；以作品集為主的頁面這樣寫是合理的。企業主在委託前常問的問題，例如費用怎麼算、合作流程、拍攝或製作要多久、服務哪些地區，網站上都沒有回答。建議執行 `/seo-questions` 整理目標問題。

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### AEO-1: 沒有常見問題區

**File:** `src/app/page.tsx:58`
**Category:** FAQ Sections & Structured Data
**Impact:** Medium

**Current Code:**
```tsx
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <ShortVideo />
        <Cases />
        <Contact />
        <About />
      </main>
```

**Problem:**
這是企業委託型的服務網站，訪客通常帶著固定的問題來，例如「費用怎麼算？」「合作流程是什麼？」「短影音多久可以交片？」「直播需要哪些場地條件？」。目前這些問題都沒有答案，搜尋引擎和 AI 助理找不到可以直接引用的段落。

**Recommended Fix:**
```text
在「聯絡我們」前面加一個常見問題區，每題一個問句標題，第一句就直接回答。
問題和答案必須由網站負責人提供（費用區間、流程、時程等），不能由 AI 編寫。
可以用 /seo-faq 一題一題整理；答案用 <details> 呈現時，前幾題要預設展開。
FAQPage 結構化資料可加可不加 🧪：Google 自 2026 年 5 月起已不顯示 FAQ 複合式結果。
```

**Why it matters for AEO:**
問句加上一兩句直接回答，是 Bing／Copilot 說明中最容易被原句引用的格式。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-2: 服務項目沒有一句話說明

**File:** `src/constants/services.ts:5`
**Category:** Concise Definitions
**Impact:** Medium

**Current Code:**
```ts
  {
    id: "channel",
    title: "品牌影音行銷",
    items: ["客製化企劃內容", "FB、IG、Threads、TikTok 帳號 AI 自動化營運"],
  },
```

**Problem:**
三項主要服務（品牌影音行銷；活動／EFP 直播／媒體廣告；節目製作）都只有標題和幾個短詞，沒有一句完整的話說明「這項服務是什麼、幫企業做到什麼」。短詞被單獨引用時，讀者看不懂意思。

**Recommended Fix:**
```ts
// 在每項服務加一個 summary 欄位，顯示在標題下方；文字請網站負責人確認，例如（僅示意格式）：
  {
    id: "channel",
    title: "品牌影音行銷",
    summary: "<一句話：這項服務為品牌做什麼、產出什麼>",
    items: [...],
  },
```

**Why it matters for AEO:**
「X 是……」或「我們為品牌……」這類完整定義句，最容易被當成「好不好娛樂提供什麼服務」這類問題的答案。

**Source:** https://developers.google.com/search/docs/appearance/featured-snippets

### 🔵 Suggestions & Experimental Practices 🧪

#### AEO-3: 沒有問題地圖

**File:** `docs/seo-audit/`（沒有 `question-map-latest.md`）
**Category:** Question Coverage & Headings
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
沒有整理過目標客戶會搜尋的問題，無法判斷網站涵蓋了哪些問題、漏了哪些。

**Recommended Fix:**
```text
執行 /seo-questions，整理企業主委託影音製作、直播、記者會前常問的問題，再對照網站內容。
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
「指數型成長」「商業效益」沒有具體內容。Microsoft 提醒，沒有具體說明的形容詞對 AI 的意義不大。下方的「自然流量突破 1,000 萬次觀看」反而具體又有連結佐證，是好的寫法。

**Recommended Fix:**
```text
視覺標語可以保留。若想讓這段更容易被引用，可以在附近加一句具體說明，
例如每週產出幾支、經營多久達到多少觀看（數字請由網站負責人提供）。
```

**Why it matters for AEO:**
具體的數字和做法，比形容詞更容易被當成答案引用。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-5: 文字裡夾雜裝飾符號

**File:** `src/components/sections/ShortVideo.tsx:51`、`src/components/sections/ShortVideo.tsx:124`、`src/components/sections/Services.tsx:62`
**Category:** Snippet-Ready Structure
**Impact:** Low

**Current Code:**
```tsx
              次觀看!!
          <p className="mt-1 text-center text-xs text-muted">← 左右滑動看更多 →</p>
              linkText="相關案例引導 →"
```

**Problem:**
`!!`、`←`、`→` 這類符號在網頁上是視覺效果，但被擷取成純文字時會變成雜訊。Microsoft 提到裝飾符號可能干擾擷取。

**Recommended Fix:**
```tsx
// 把箭頭改成 CSS 或加上 aria-hidden 的 <span>，文字本身保持乾淨，例如：
              linkText="相關案例引導"  // 箭頭改由元件用 <span aria-hidden="true">→</span> 加上
```

**Why it matters for AEO:**
影響很小，只在文字被逐字引用時才有差別。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### AEO-6: 首頁沒有一段完整的公司介紹文字 🧪

**File:** `src/constants/site.ts:94`
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
「關於我們」由三組短詞組成，沒有一段能回答「好不好娛樂是什麼公司？」的完整句子。只有 meta description 裡有完整的一句，頁面上看不到。

**Recommended Fix:**
```text
在「關於我們」標題下加一兩句完整介紹，例如把首頁描述那句放到頁面上：
「好不好娛樂是專為企業、品牌規劃的影音製作團隊，提供系列短影音拍攝、EFP多機直播、……」
文字請網站負責人確認。
```

**Why it matters for AEO:**
被問到「好不好娛樂是做什麼的」時，頁面上有一句完整的話可以直接引用。

**Source:** https://developers.google.com/search/docs/appearance/featured-snippets

### ✅ What's Working Well

- ✅ 沒有 `nosnippet`、`max-snippet`、`data-nosnippet`、`X-Robots-Tag`；只有 404 頁有 `noindex`，屬於刻意設定
- ✅ 全站靜態輸出，所有內容都在初始 HTML 裡；案例篩選器預設顯示「全部」，10 個案例都在 HTML 中
- ✅ 沒有「點了才出現」的折疊答案
- ✅ 清單都是真正的 `<ul>`／`<ol>`（服務項目、案例重點、暖廚家味的四個步驟）
- ✅ 案例敘述以具體成果開頭，例如「三年即達成全台加盟店面超過十間」「現場百名粉絲入場，獲數十家媒體報導」
- ✅ 案例都標了時間（例如「2022.05 台中開幕・2024.11 台北京站開幕」）
- ✅ 標題、描述、H1 都清楚說明網站主題
- ✅ robots.txt 沒有擋 Applebot、Amzn-SearchBot 等語音助理爬蟲
- ✅ 結構化資料都是 JSON-LD，而且只描述頁面上看得到的內容

### Live Check

Not run.

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 加常見問題區時，用同一份資料陣列同時產生畫面和（可選的）FAQPage JSON-LD，避免兩邊內容不一致；JSON-LD 用現有的 `JsonLd` 元件輸出。
- 折疊答案用 `<details>`，不要用 `{open && <Answer />}`，確保答案在 HTML 裡。
- `Cases.tsx` 是 client component，但初始畫面就輸出全部案例，所以不影響擷取；之後若改成「點了才載入」，就要重新檢查。

### 📊 Content Analysis Summary

- **Answer pages analyzed:** 1（首頁；隱私權政策、服務條款屬法律頁，場域租借依負責人決定不列入）
- **Question-shaped headings:** 0 (0 answered in the first sentence)
- **Median answer paragraph length:** 不適用（沒有問句式標題）；案例敘述約 40–70 字
- **Definitional openings on concept pages:** 0/3（三項主要服務）
- **Lists and tables in real HTML:** 全部（沒有用 div 或 `<br>` 假裝的清單）
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

**Citation Readiness Score:** 94 / 100

**Grade:** A

**Summary:** 所有 AI 爬蟲都可以進入，內容也都在靜態 HTML 裡。最好的部分是案例都寫了真實的客戶名稱，短影音觀看數也都連到原始貼文。最大的缺口是：所有主題都擠在首頁，沒有各自的獨立頁面；暖廚家味的募資金額、加盟店數等關鍵數字沒有附來源。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| AI Crawler Access | 100/100 | 15% |
| Technical AI Accessibility | 100/100 | 10% |
| Topical Authority | 90/100 | 15% |
| Original Research & Evidence | 85/100 | 15% |
| Expert Perspectives & Authorship | 95/100 | 10% |
| External Validation | 90/100 | 10% |
| Entity Clarity | 98/100 | 10% |
| Extractable Passages | 99/100 | 5% |
| Content Freshness | 98/100 | 5% |
| llms.txt & Markdown Access 🧪 | 99/100 | 5% |

#### Issue Counts

- 🔴 **Critical:** 0
- 🟠 **High:** 2
- 🟡 **Medium:** 4
- 🔵 **Low / Suggestions:** 4
- 🟢 **Passing checks:** 16

Items marked 🧪 rest on heuristics, vendor studies or proposals rather than documented engine behavior. Apply judgment.

### 🤖 AI Crawler Access

`src/app/robots.ts` 只有一條規則：`User-agent: *`、`Allow: /`，沒有任何針對個別機器人的規則，所以下表全部依 `*` 判定。

#### Training crawlers and tokens

| Bot | Operator | Controls | Status | Notes |
|-----|----------|----------|--------|-------|
| GPTBot | OpenAI | Training | ❓ Not specified（`*` → allowed） | |
| ClaudeBot | Anthropic | Training | ❓ Not specified（allowed） | |
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
| OAI-SearchBot | OpenAI | ChatGPT search | ❓ Not specified（allowed） | |
| Claude-SearchBot | Anthropic | Claude search | ❓ Not specified（allowed） | |
| PerplexityBot | Perplexity | Perplexity | ❓ Not specified（allowed） | |
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
| ChatGPT-User | OpenAI | May not | ❓ Not specified（allowed） | |
| Claude-User | Anthropic | Yes | ❓ Not specified（allowed） | |
| Perplexity-User | Perplexity | Generally not | ❓ Not specified（allowed） | |
| meta-externalfetcher | Meta | May not | ❓ Not specified（allowed） | |
| Amzn-User | Amazon | Not fully | ❓ Not specified（allowed） | |
| MistralAI-User | Mistral | See docs | ❓ Not specified（allowed） | |
| Google-Agent | Google | Generally not | ❓ Not specified（allowed） | |

#### Other AI controls found

404 頁的 `noindex`（刻意設定，AEO 檢查已列出）。沒有 `nosnippet`、`max-snippet`、`data-nosnippet`、`nocache`、`noarchive`、`noai`、`Content-Signal`、已停用的機器人名稱，也沒有 middleware。

**Manual check:** Search Console → Settings → "Search generative AI". "Exclude" removes the site from AI Overviews and AI Mode.

**Analysis:** 全部開放。對一個希望被企業主找到的服務型網站來說，這通常就是想要的設定：網站可以出現在 ChatGPT、Perplexity、Claude、Copilot 和 Google AI 摘要的答案裡，代價是內容也可能被拿去訓練模型。如果日後想「被引用但不被拿去訓練」，可以只擋訓練用爬蟲（GPTBot、ClaudeBot、Google-Extended、CCBot 等），同時保留搜尋用爬蟲；`/seo-fix` 會逐組詢問。部署在 GitHub Pages、沒有經過 Cloudflare，所以正式網站的 robots.txt 應該和程式產生的一樣（這次沒有連到正式網站確認）。

### 🌐 Live Check

Not run.

### 🔎 Off-site Snapshot (not scored)

Not run. Pass `search=yes` with a live URL to `/seo-audit` to include it.

#### External validation checklist

- [ ] Wikidata item for the organization (Wikipedia article only if notable)
- [ ] Current profiles on the main review platforms for this vertical（例如 Google 商家檔案）
- [ ] Listings in relevant industry directories（例如影視製作、活動公司名錄）
- [ ] Independent coverage (press, analyst, expert blogs)（已有工商時報、TVBS，見 GEO-4）
- [ ] Brand's own, disclosed participation in community discussions
- [ ] Brand name and description consistent across all of the above

### 📄 llms.txt Status 🧪

- **llms.txt:** missing
- **llms-full.txt:** missing
- **Format:** 不適用
- **Staleness:** 不適用
- **Discovery hints:** 都沒有

Google says Google Search ignores llms.txt, and no other major AI search provider has said it uses it for ranking or citation. Treat it as a low-cost extra, most useful for developer documentation. Lighthouse's agentic browsing audit checks for it, and some coding tools read it. `/seo-llms-txt` creates, updates and validates it.

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

#### GEO-1: 所有服務和案例都在首頁，沒有獨立頁面

**File:** `src/app/page.tsx:58`
**Category:** Topical Authority
**Impact:** High

**Current Code:**
```tsx
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <ShortVideo />
        <Cases />
        <Contact />
        <About />
      </main>
```

**Problem:**
三個核心主題（品牌影音行銷、活動／EFP 直播／媒體廣告、節目製作）和 10 個案例都在同一頁，每個主題只有幾行字，案例也只能用 `#錨點` 連結。AI 搜尋是以「段落和頁面」為單位擷取的；沒有一頁專門、深入講「EFP 多機直播」或「品牌短影音經營」，就很難被當成這個主題的來源引用。（以主題深度判斷權威是常見的經驗法則，各家 AI 都沒有公開具體的排名因素。）

**Recommended Fix:**
```text
優先從最主要的營業項目開始，例如先做一頁「品牌短影音經營」：
- /services/short-video/：說明服務內容、流程、適合哪些品牌，並連到相關案例
- 案例獨立成頁（例如 /cases/zha-qi-lai/），寫出背景、做法、成果與時間
- 首頁的服務區和案例區改成連到這些頁面，子頁面再互相連結
頁面內容需要網站負責人提供；可以先從現有的案例文字擴寫。
```

**Why it matters for GEO:**
有一頁專講某個主題、並和相關案例互相連結，AI 回答「台北 EFP 直播團隊推薦」這類問題時，才有完整的頁面可以引用。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

#### GEO-2: 關鍵數字沒有附來源

**File:** `src/constants/warmKitchen.ts:25`、`src/constants/cases.ts:13`、`src/constants/cases.ts:218`
**Category:** Original Research & Evidence
**Impact:** High

**Current Code:**
```ts
// src/constants/warmKitchen.ts:24-29
export const WARM_METRICS = [
  { value: "3,300萬+", label: "線上課程募資金額" },
  { value: "8,144份", highlight: "前一季", label: "捐出食物包" },
  { value: "1,357戶", label: "弱勢、急難家庭受助" },
  { value: "1,300公里", label: "志工環台親送" },
] as const;

// src/constants/cases.ts:13
    client: "三年即達成全台加盟店面超過十間。",

// src/constants/cases.ts:218
      "結合記者會、媒體曝光與 KOL 宣傳：FB 與 YouTube 雙平台同步直播，事前號召代言人粉絲，現場百名粉絲入場，獲數十家媒體報導。",
```

**Problem:**
這些是網站上最有說服力的成果數字，但旁邊沒有說明資料來源和時間。相比之下，短影音的觀看數（158萬、474萬等）都直接連到原始貼文，是很好的示範。GEO 研究指出，附上來源的統計數字是提高被 AI 引用機率最有效的做法之一。

**Recommended Fix:**
```text
每個數字旁邊加上來源和時間，連到可以查證的頁面，例如：
- 3,300萬+、8,144份、1,357戶：註明「資料來源：1919 食物銀行／ShiFu 平台，截至 YYYY 年 MM 月」，並連到公開頁面
- 「超過十間」：連到炸綺來的門市列表
- 「數十家媒體報導」：列出幾則報導連結
來源和日期必須由網站負責人提供，不能自行推測。
```

**Why it matters for GEO:**
AI 傾向引用可以查證的數字；沒有來源的數字可能被忽略，或被當成行銷話術。

**Source:** https://arxiv.org/abs/2311.09735

### 🟡 Medium Priority Issues

#### GEO-3: 「長年收視率第一」沒有說明是哪個節目

**File:** `src/constants/site.ts:98`
**Category:** Original Research & Evidence
**Impact:** Medium

**Current Code:**
```ts
    lines: ["長年收視率第一之", "電視節目製作團隊經驗"],
```

**Problem:**
「收視率第一」是很強的說法，但沒有說是哪個節目、哪個時段、根據哪份收視調查。沒有佐證的最高級說法，會降低 AI 對整段內容的信任。

**Recommended Fix:**
```text
寫出節目名稱、播出平台和年份，最好附上收視報導連結，例如：
「曾任《<節目名稱>》（<頻道>，<年份>）製作團隊，該節目連續 N 年同時段收視第一（<來源連結>）」
內容請由網站負責人提供。
```

**Why it matters for GEO:**
具名、可查證的經歷，才會被 AI 當成專業背景引用。

**Source:** https://arxiv.org/abs/2311.09735

#### GEO-4: TVBS 報導沒有連到原始新聞

**File:** `src/constants/warmKitchen.ts:44`
**Category:** External Validation
**Impact:** Medium

**Current Code:**
```ts
    caption: "TVBS 新聞台報導《暖廚家味》記者會",
```

**Problem:**
網站播放的是自己存的影片檔（`/videos/warm-news.mp4`），沒有連到 TVBS 的原始新聞頁。第三方媒體報導是 AI 判斷一家公司是否可信的重要依據；只放影片和說明文字，AI 無法追到報導本身。工商時報那篇已經有連結，是正確做法。

**Recommended Fix:**
```text
在說明文字旁邊加上 TVBS 新聞的原始網址（例如 news.tvbs.com.tw 或 YouTube 官方頻道的報導連結）。
網址請由網站負責人提供。
```

**Why it matters for GEO:**
AI 搜尋引擎很重視第三方報導；有連結，AI 才能確認這份報導真的存在。

**Source:** https://arxiv.org/abs/2509.08919

#### GEO-5: 沒有客戶推薦語

**File:** `src/constants/cases.ts`（10 個案例都沒有推薦語欄位）
**Category:** External Validation
**Impact:** Medium

**Current Code:** N/A — element absent

**Problem:**
案例都寫了真實的客戶名稱（炸綺來、Hydrafacial、宏力移動、李熊鴨霸），這是加分的。但沒有任何客戶自己說的話。具名客戶的推薦語是很有力的第三方肯定。

**Recommended Fix:**
```text
向合作過的客戶取得一兩句推薦語，並取得授權，註明姓名、職稱和公司，放在對應的案例裡。
絕對不要自己編寫推薦語。
```

**Why it matters for GEO:**
具名推薦語讓 AI 有第三方說法可以引用，而不只有公司自己的說法。

**Source:** https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

#### GEO-6: 網站沒有說明公司背後是誰

**File:** `src/components/sections/About.tsx:9`
**Category:** Expert Perspectives & Authorship
**Impact:** Medium

**Current Code:**
```tsx
        <SectionTitle title="關於我們" en="About Us" />
```

**Problem:**
「關於我們」只有三組能力短詞，沒有負責人或核心團隊的名字、經歷，也沒有成立年份或公司登記名稱。隱私權政策和服務條款雖然都有，但同樣沒有說明營運主體是誰。

**Recommended Fix:**
```text
在「關於我們」加上：
- 創辦人或製作人的姓名、職稱與代表作品（例如做過哪些電視節目）
- 成立年份、公司登記名稱（如有）
之後可以再加上 Person 結構化資料。內容請由網站負責人提供。
```

**Why it matters for GEO:**
AI 在推薦服務商時，會優先引用身分清楚、有具名專業人士的來源。

**Source:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### 🔵 Suggestions & Experimental Practices 🧪

#### GEO-7: Organization 結構化資料只連到 YouTube

**File:** `src/app/page.tsx:24`
**Category:** Entity Clarity
**Impact:** Low

**Current Code:**
```tsx
  sameAs: [SITE.contact.youtube],
```

**Problem:**
`sameAs` 只有 YouTube 頻道，也沒有 `foundingDate`、`founder`。「好不好」是常見的口語詞，品牌名稱需要更多線索，AI 才能分辨這是哪一家公司。

**Recommended Fix:**
```tsx
// 若公司有官方 FB 粉絲頁、IG、LINE 官方帳號或 Google 商家檔案，把網址加進來；
// 成立年份、創辦人屬實再加。網址和資料請由網站負責人提供，不要猜。
  sameAs: [SITE.contact.youtube, "<官方 FB 粉絲頁>", "<官方 IG>"],
  foundingDate: "<YYYY>",
```

**Why it matters for GEO:**
`sameAs` 把網站和公司的其他官方帳號串起來，AI 比較容易確認是同一家公司。

**Source:** https://schema.org/Organization

#### GEO-8: 沒有 dateModified

**File:** `src/app/page.tsx:44`
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
sitemap 已經有各頁真正的更新日期（`src/app/sitemap.ts` 的 `UPDATED`），但頁面本身沒有 `dateModified`，也沒有 `article:modified_time`。

**Recommended Fix:**
```tsx
// 把 sitemap 的 UPDATED 匯出共用，首頁加一筆 WebPage JSON-LD：
{ "@context": "https://schema.org", "@type": "WebPage", url: `${SITE_URL}/`, dateModified: UPDATED.home }
// 日期只在內容真的有改時才更新。
```

**Why it matters for GEO:**
有研究指出 AI 重排序會偏好較新的日期；真實的更新日期讓 AI 知道內容仍在維護。

**Source:** https://arxiv.org/abs/2509.11353

#### GEO-9: 「關於我們」是拆開的短詞 🧪

**File:** `src/constants/site.ts:98`
**Category:** Extractable Passages
**Impact:** Low 🧪

**Current Code:**
```ts
    lines: ["長年收視率第一之", "電視節目製作團隊經驗"],
```

**Problem:**
一句話被拆成兩個 `<p>`，三組能力也都是短詞（「平台 × 企劃 × 影像」）。被單獨擷取時，很難看懂完整意思。

**Recommended Fix:**
```text
視覺上可以維持分行，但用同一個 <p> 加 <br> 呈現，讓 HTML 裡是一句完整的話；
或在下方補一段完整介紹（見 AEO-6）。
```

**Why it matters for GEO:**
完整的句子才能被當成段落引用。

**Source:** https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers

#### GEO-10: 沒有 llms.txt 🧪

**File:** `public/`（沒有 `llms.txt`）
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

### ✅ What's Working Well

- ✅ robots.txt 對所有爬蟲開放，沒有誤擋 Googlebot、Bingbot 或 AI 搜尋爬蟲
- ✅ 全站靜態輸出，內容都在初始 HTML 裡，不需要執行 JavaScript 才看得到
- ✅ 沒有針對機器人顯示不同內容（沒有 middleware 或 user-agent 判斷）
- ✅ 全站 HTTPS，沒有混合內容；404 頁回傳正確的 404 狀態碼
- ✅ 短影音觀看數（158萬、118萬、474萬、194萬、39.9萬、209萬）都直接連到原始 IG／FB 貼文，可以查證
- ✅ 案例都寫了真實客戶名稱，並連到客戶官網或作品（宏力移動官網、暖廚家味官網、1919 食物銀行）
- ✅ 工商時報報導有連到原文
- ✅ 暖廚家味寫出五位主廚的姓名和所屬餐廳
- ✅ 首頁有 `Organization` JSON-LD（name、alternateName、url、logo、description、email、areaServed、knowsAbout、服務目錄）
- ✅ 有隱私權政策、服務條款、聯絡方式
- ✅ 有 `BreadcrumbList` 和清楚的網址結構

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 新增服務頁或案例頁（GEO-1）時，直接用 App Router 的資料夾建立靜態頁面，例如 `src/app/services/short-video/page.tsx`；案例很多時，可以用 `src/app/cases/[slug]/page.tsx` 搭配 `generateStaticParams()`，資料沿用 `src/constants/cases.ts`。
- 每個新頁面都要有 `metadata`（含 `...shareMeta()`）、`sitemap.ts` 的日期和麵包屑。
- 若想區分「訓練」和「搜尋」爬蟲，在 `src/app/robots.ts` 的 `rules` 改成陣列，逐一列出機器人。
- `dateModified` 可以和 `sitemap.ts` 共用同一份日期，避免兩邊不一致。

### 📊 Content Analysis Summary

- **Content pages analyzed:** 1（首頁；場域租借依負責人決定不列入，隱私權政策與服務條款屬法律頁）
- **Core topics:** 品牌影音行銷（短影音、自媒體經營）、活動／EFP 直播／媒體廣告、節目製作 (pages per topic: 0, 0, 0 獨立頁面；都只是首頁的區塊)
- **Hub pages / orphan pages / thin pages:** 0 / 0 / 0（沒有主題子頁）
- **Pages with first-party data:** 1（首頁的案例成果數字）
- **Numeric claims with a linked source:** 7/14（短影音觀看數有連結；募資金額、食物包、受助戶數、環台公里數、加盟店數、媒體報導數、粉絲入場數沒有）
- **Bylined content pages:** 0/0（沒有文章類頁面）(author pages with `Person` markup: 0)
- **Organization `sameAs` links:** 1
- **Pages with dateModified:** 0/4

### 📈 Measuring Citations

This audit measures readiness, not citations. To track citations over time:

- **Bing Webmaster Tools → AI Performance** (public preview since February 2026): citations in Copilot, Bing AI summaries and some partners, with cited pages and grounding queries. No click data.
- **Google Search Console → Generative AI performance report** (since June 2026, all sites since August 31, 2026): impressions in AI Overviews and AI Mode by page, country and device. AI feature traffic is also counted in the Web search type of the main Performance report.
- **Server logs:** requests from the AI user agents above, verified against each operator's published IP ranges.（GitHub Pages 不提供原始日誌，這項做不到。）
- **A fixed question panel:** ask ChatGPT, Perplexity, Claude, Gemini and Copilot the same questions each month (`/seo-questions` can build the list) and record whether the site is cited or mentioned. Answers vary by user, session and location, so look at trends, not single runs.

---

## 🎯 Prioritized Action Plan

Across all audited lenses, ranked by impact for the effort:

1. **[Quick Win]** GEO-2：在暖廚家味、炸綺來、代言人記者會的數字旁加上來源連結和日期（需要負責人提供來源）
2. **[Quick Win]** GEO-4：TVBS 報導加上原始新聞連結
3. **[Quick Win]** GEO-3、GEO-6、AEO-6：「關於我們」寫出具名經歷和一段完整的公司介紹
4. **[Quick Win]** GEO-7、GEO-8：Organization 補上其他官方帳號；首頁加 `dateModified`
5. **[Medium Effort]** AEO-1、AEO-3：用 `/seo-questions` 整理問題，再用 `/seo-faq` 做常見問題區
6. **[Medium Effort]** AEO-2：三項服務各加一句說明
7. **[Medium Effort]** GEO-5：向客戶取得具名推薦語
8. **[Larger Effort]** GEO-1：主要服務和代表案例做成獨立頁面
9. **[Optional]** AEO-4、AEO-5、GEO-9、GEO-10、SEO-1

---

## 🔧 Remediation

```
/seo-fix              # apply fixes from this report
/seo-fix --dry-run    # preview the diffs without writing
/seo-schema           # Organization sameAs、WebPage dateModified 等結構化資料
/seo-questions        # 整理目標客戶會問的問題，對照網站內容
/seo-faq              # 建立常見問題區（答案由負責人提供）
/seo-llms-txt         # 建立 llms.txt（可選）
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

Performed by the `ai-seo` plugin using Context7 MCP for real-time documentation（Next.js v16.2.9 Metadata API）.

**Files analyzed:** 40（原始碼、設定檔，以及建置輸出 `out/` 的 5 個 HTML 頁面）
**Routes detected:** 4（`/`、`/venue/`、`/privacy/`、`/terms/`，另有 404 頁）
**Answer pages:** 1
**Content pages:** 1
**Live URLs fetched:** 0
**Web searches run:** 0

### Limitations

#### SEO

- Static analysis only (no runtime Core Web Vitals measurement)
- Does not crawl external links
- Does not test server response headers (recommend a separate HTTP header audit)
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
