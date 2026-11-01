# SEO Audit Report

**Project:** practice1（好不好娛樂官網 hbh-tw.store）
**Framework:** Next.js 16.4.2（App Router、靜態輸出 `output: "export"`，部署在 GitHub Pages）
**Audit Date:** 2026-11-01T09:29:38+08:00
**Auditor:** ai-seo plugin 2.1.0
**Lenses:** SEO
**Knowledge Source:** Context7 MCP
**Scope:** Entire solution
**Live Check:** Not run
**Settings:** Lenses = SEO (argument)；Scope = Entire solution (argument `.`)；Live check = Not run（argument `live=yes` 沒有附網址，且 SEO lens 不使用 live check；正式網站的狀態碼、轉址與標頭請用 `/seo-crawl`）；Version control = commit audits (argument `commit=yes`)

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 98/100 | A+ | ➡️ from 97 | 0 | 0 | 1 | 4 |

Each lens is scored on its own. There is no combined score.

**Summary:** 上次報告的 8 個建議項目中，有 6 項已經修好：WebSite 結構化資料、Apple 主畫面圖示、sitemap 日期、跳到主要內容、子頁面麵包屑，以及多尺寸 WebP 圖片（原本唯一的中度問題）。這次唯一的中度問題是服務條款和場域租借頁的描述太短。其餘都是小幅加分項，網站已經沒有 Critical 或 High 等級的問題。

### Top Critical Issues

None found.

---

## SEO: Search Health

### Executive Summary

**SEO Health Score:** 98 / 100

**Grade:** A+

**Summary:** 每頁都有正確的標題、描述、canonical、分享設定和結構化資料，圖片也改成建置時產生多尺寸 WebP。剩下的扣分集中在兩個子頁面的描述太短，以及幾個選配項目。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 100/100 | 20% |
| Modern Meta Tags | 93/100 | 15% |
| Semantic HTML | 100/100 | 10% |
| Structured Data | 98/100 | 15% |
| Performance Signals | 98/100 | 15% |
| Accessibility | 100/100 | 10% |
| URL Structure | 100/100 | 5% |
| Security Headers | 98/100 | 5% |
| Framework Best Practices | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical Issues:** 0
- 🟠 **High Priority:** 0
- 🟡 **Medium Priority:** 1
- 🔵 **Low Priority / Suggestions:** 4
- 🟢 **Passing Checks:** 32

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### SEO-1: 服務條款與場域租借頁的描述太短

**File:** `src/app/terms/page.tsx:8`、`src/app/venue/page.tsx:33`
**Category:** Modern Meta Tags
**Impact:** Medium

**Current Code:**
```tsx
// src/app/terms/page.tsx:8（輸出 15 字）
  description: `${SITE.name}網站與服務使用條款。`,

// src/app/venue/page.tsx:33（輸出 32 字：「好不好娛樂活動場域/包場租借：台北市-捷運松江南京站、新北烏來。」）
  description: `${SITE.name}${VENUE.title}：${VENUE.items.join("、")}。`,
```

**Problem:**
描述太短時，Google 常會改抓頁面裡的其他文字當摘要，搜尋結果的呈現就比較難掌握。中文描述大約 60–80 字最能完整顯示；首頁（68 字）和隱私權政策（34 字）的長度都在合理範圍。

**Recommended Fix:**
```tsx
// terms：說明條款涵蓋的範圍，例如
  description: `${SITE.name}網站服務條款：說明網站內容的使用方式、智慧財產權、免責聲明、第三方連結，以及條款修訂與準據法。`,

// venue：補上場地特色。需要場地人數、設備、適合的活動類型等實際資料，請由網站負責人提供，這裡不自行編寫。
```

**Source:** https://developers.google.com/search/docs/appearance/snippet

### 🔵 Suggestions & Nice-to-Haves

#### SEO-2: 社群分享描述刻意留成全形空白

**File:** `src/constants/site.ts:38`
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:**
```ts
  description: "　",
```

**Problem:**
這是刻意的設計，FB 分享預覽也確認顯示正常（沿用上次報告的 SEO-2）。但 `og:description` 等於空白，部分平台可能會自己抓頁面文字來填。

**Recommended Fix:**
預覽目前正常，可以維持現狀；想更保險的話，可改成一句短描述，例如 `SITE.slogan`。

**Source:** https://ogp.me/

#### SEO-3: 場域租借頁沒有地點的結構化資料

**File:** `src/app/venue/page.tsx:41`
**Category:** Structured Data
**Impact:** Low

**Current Code:**
```tsx
      <JsonLd data={breadcrumbLd(VENUE.title, "/venue/")} />
```

**Problem:**
這頁目前只有麵包屑。如果補上 `Place`（或 `EventVenue`）並附上地址，Google 比較容易把這頁和「松江南京」「烏來」等地區的搜尋連結起來。網站目前只有地區名稱，沒有完整地址。

**Recommended Fix:**
```text
等網站負責人提供兩處場地的地址（以及可容納人數，可省略），再用 /seo-schema 產生
每個場地一筆 EventVenue JSON-LD（name、address、url: https://hbh-tw.store/venue/）。
不要用推測的地址。
```

**Source:** https://schema.org/EventVenue

#### SEO-4: 影片封面圖沒有經過 WebP 最佳化

**File:** `src/components/sections/WarmKitchen.tsx:155`
**Category:** Performance Signals
**Impact:** Low

**Current Code:**
```tsx
                poster={withBase(WARM_MEDIA.newsVideo.poster)}
```

**Problem:**
`<video poster>` 不經過 `next/image`，所以這張封面還是下載原始的 `/images/warm-news.jpg`（約 182 KB）。建置腳本其實已經產生了 `warm-news-<寬度>.webp`，只是這裡沒用到。

**Recommended Fix:**
```tsx
// 生產環境改用已產生的 1080 寬 WebP；開發時沿用原圖
poster={process.env.NODE_ENV === "production" ? withBase("/images/_w/warm-news-1080.webp") : withBase(WARM_MEDIA.newsVideo.poster)}
// 較乾淨的做法：在 src/lib/image-loader.ts 匯出一個 optimizedSrc(src, width) 共用函式
```

**Source:** https://web.dev/articles/serve-images-webp

#### SEO-5: 沒有設定安全性標頭

**File:** `next.config.ts:11`
**Category:** Security Headers
**Impact:** Low

**Current Code:**
```ts
  output: "export",
```

**Problem:**
GitHub Pages 無法自訂 HSTS、CSP 等回應標頭。這是主機的限制，不是程式寫錯（沿用上次報告的 SEO-9）。

**Recommended Fix:**
```tsx
// 能在程式裡做的：在 src/app/layout.tsx 的 metadata 加上
referrer: "strict-origin-when-cross-origin",
// 其他標頭如果需要，可以在網域前面加一層 Cloudflare 這類 CDN。
```

**Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy

### ✅ What's Working Well

- ✅ 圖片在建置時轉成 8 種寬度的 WebP（`scripts/optimize-images.mjs`），手機只下載需要的尺寸；首頁大圖在手機上約 70 KB，原圖是 151 KB（上次 SEO-1 / SEO-7，已修正）
- ✅ 場域租借、隱私權政策、服務條款都有 `BreadcrumbList` JSON-LD（上次 SEO-5，已修正）
- ✅ 首頁有 `Organization` 與 `WebSite` JSON-LD，透過共用的 `JsonLd` 元件輸出，並把 `<` 跳脫（上次 SEO-6，已修正）
- ✅ 有 Apple 主畫面圖示（`src/app/apple-icon.png`）（上次 SEO-3，已修正）
- ✅ sitemap 改成手動填各頁真正的更新日期（上次 SEO-4，已修正）
- ✅ 有「跳到主要內容」連結，四個頁面的 `<main>` 都有 `id="main"`（上次 SEO-8，已修正）
- ✅ 自訂 404 頁：中文標題、`noindex`，不沿用首頁的描述和 canonical
- ✅ 首頁描述精簡到 68 字，主標題改用台灣常用的「影音製作」
- ✅ 沒有 `keywords` 標籤、IE 寫法、jQuery、float 排版、microdata 或 `<b>`/`<i>`
- ✅ 每頁都有自己的 `title`、`description`、canonical，以及 `shareMeta()` 產生的完整分享設定
- ✅ `metadataBase`、`<html lang="zh-Hant">`、`og:locale` zh_TW、viewport 都已設定
- ✅ `sitemap.ts`、`robots.ts` 自動產生，robots 有指向 sitemap
- ✅ 每頁只有一個 `<h1>`，標題層級沒有跳級
- ✅ 197 張圖片都有 `alt`（重複的輪播圖用 `alt=""` 加 `aria-hidden`），而且都有 `decoding="async"`；首屏以外的圖片延遲載入
- ✅ 首屏大圖和 Logo 有 `preload`；字型由 `next/font` 處理
- ✅ 41 個外部連結的 `target="_blank"` 都有加 `rel="noopener noreferrer"`；沒有任何 `http://` 混合內容
- ✅ 所有連結都有文字或 `aria-label`，沒有「點此」「看更多」這類意義不明的連結文字
- ✅ 影片 `preload="none"`，12 MB 的影片不會在開頁時下載
- ✅ GA 透過 `@next/third-parties` 載入，不會擋住畫面顯示

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- Context7 查到的 Next.js 16 文件確認：子頁面只要寫了 `openGraph`，就會整組取代上層的設定。目前的 `shareMeta()` 做法正確，新增頁面時記得一起 spread 進 metadata。
- 新增頁面時，也記得在 `src/app/sitemap.ts` 的 `UPDATED` 加上日期，並用 `JsonLd` + `breadcrumbLd()` 加上麵包屑。
- 不經過 `next/image` 的圖片（例如 `<video poster>`、CSS 背景）不會自動換成 WebP，見 SEO-4。
- React 輸出的 `<meta … />` 自閉合寫法是框架產生的，瀏覽器和搜尋引擎都能正確解析，不需要處理。

### 📊 Core Web Vitals Considerations

Static-analysis findings that may impact Core Web Vitals:

- **LCP (Largest Contentful Paint):** 首屏大圖有 `preload`，並依螢幕寬度提供 WebP（手機約 70 KB）。改版後這一項明顯改善。
- **CLS (Cumulative Layout Shift):** 圖片都有固定比例的外框或寫明尺寸，字型由 `next/font` 處理，風險低。
- **INP (Interaction to Next Paint):** 互動元件不多，從程式碼看不出明顯的長任務。

Runtime measurement is required for actual Core Web Vitals scores. Use PageSpeed Insights or Chrome DevTools. INP replaced FID in March 2024.

---

## 🎯 Prioritized Action Plan

Across all audited lenses, ranked by impact for the effort:

1. **[Quick Win]** SEO-1：補長服務條款頁的描述（場域租借頁需要負責人提供場地資料）
2. **[Quick Win]** SEO-4：影片封面改用已產生的 WebP
3. **[Quick Win]** SEO-5：metadata 加上 `referrer`
4. **[Medium Effort]** SEO-3：取得場地地址後，加上 `EventVenue` 結構化資料
5. **[Optional]** SEO-2：分享描述改成一句短文案

---

## 🔧 Remediation

```
/seo-fix              # apply fixes from this report
/seo-fix --dry-run    # preview the diffs without writing
/seo-schema           # generate EventVenue structured data for the venue page
```

---

## 📚 Resources

### SEO

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [web.dev - Learn SEO](https://web.dev/learn/seo/)
- [MDN - HTML Meta Tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Core Web Vitals](https://web.dev/articles/vitals)

---

## 🔍 Audit Methodology

Performed by the `ai-seo` plugin using Context7 MCP for real-time documentation（Next.js v16.2.9 的 Metadata API 文件）.

**Files analyzed:** 36（原始碼與設定檔，另外檢查了建置輸出 `out/` 的 5 個 HTML 頁面）
**Routes detected:** 4（`/`、`/venue/`、`/privacy/`、`/terms/`，另有 404 頁）
**Live URLs fetched:** 0
**Web searches run:** 0

### Limitations

#### SEO

- Static analysis only (no runtime Core Web Vitals measurement)
- Does not crawl external links
- Does not test server response headers (recommend a separate HTTP header audit)
- Accessibility is surface-level. For WCAG 2.1/2.2 compliance, run `/accessibility-audit` from the ai-accessibility plugin.

Not audited in this run: AEO, GEO. Run `/seo-audit aeo` or `/seo-audit geo` to add them.

---

*Generated by [ai-seo](https://github.com/charlesjones-dev/ai-agent-plugins), a plugin for search, answer engine and generative engine optimization.*
