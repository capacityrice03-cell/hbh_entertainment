# SEO Audit Report

**Project:** practice1（好不好娛樂官網 hbh-tw.store）
**Framework:** Next.js 16.4.2（App Router、靜態輸出 `output: "export"`，部署在 GitHub Pages）
**Audit Date:** 2026-11-01T07:56:35+08:00
**Auditor:** ai-seo plugin 2.1.0
**Lenses:** SEO
**Knowledge Source:** LLM Training Data (fallback)
**Scope:** Entire solution
**Live Check:** Not run
**Settings:** Lenses = SEO (argument)；Scope = Entire solution (argument `.`)；Live check = Not run (argument `live=no`)；Web search = Not run (argument `search=no`)；Version control = commit audits (answer)

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 92/100 | B | first run | 1 | 0 | 2 | 8 |

Each lens is scored on its own. There is no combined score.

**Summary:** 網站的 SEO 基礎打得很紮實：每頁都有標題、描述和 canonical，sitemap / robots 由 Next.js 自動產生，首頁有公司結構化資料，圖片全部有替代文字，外部連結都有加安全屬性。唯一的 Critical 是 `keywords` 標籤（Google 早就不看，Bing 甚至可能當成灌關鍵字的訊號），刪掉一行就好。其餘多半是小幅加分項，影響較大的是子頁面的分享預覽指回首頁，以及大張照片沒有真的被縮小。

### Top Critical Issues

1. **SEO-1** 使用已淘汰的 `keywords` 標籤 (`src/app/layout.tsx:17`)

---

## SEO: Search Health

### Executive Summary

**SEO Health Score:** 92 / 100

**Grade:** B

**Summary:** 結構、標籤和 Next.js 寫法大致都正確。扣分主要來自一個已淘汰的 `keywords` 標籤（−20 分在權重最高的類別），只要刪除就能升到 A 級左右。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 80/100 | 20% |
| Modern Meta Tags | 89/100 | 15% |
| Semantic HTML | 100/100 | 10% |
| Structured Data | 96/100 | 15% |
| Performance Signals | 93/100 | 15% |
| Accessibility | 98/100 | 10% |
| URL Structure | 100/100 | 5% |
| Security Headers | 98/100 | 5% |
| Framework Best Practices | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical Issues:** 1
- 🟠 **High Priority:** 0
- 🟡 **Medium Priority:** 2
- 🔵 **Low Priority / Suggestions:** 8
- 🟢 **Passing Checks:** 27

### 🔴 Critical Issues

#### SEO-1: 使用已淘汰的 `keywords` 標籤

**File:** `src/app/layout.tsx:17`
**Category:** Deprecated Patterns
**Impact:** Critical

**Current Code:**
```tsx
  keywords: [...SEO.keywords],
```

**Problem:**
這行會在每一頁輸出 `<meta name="keywords">`。Google 從 2009 年起就完全不看這個標籤，Bing 則表示它可能被當作關鍵字堆砌的訊號。留著沒有好處，還會把你的主打關鍵字清單直接公開給競爭對手。

**Recommended Fix:**
```tsx
// 刪除這一行即可。
// SEO.keywords 仍可保留在 constants/site.ts，首頁結構化資料的 knowsAbout 還在用它。
```

**Source:** https://developers.google.com/search/docs/crawling-indexing/special-tags

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### SEO-2: 子頁面的分享預覽（Open Graph）沿用首頁網址與標題

**File:** `src/app/venue/page.tsx:30`（同樣情況：`src/app/privacy/page.tsx:5`、`src/app/terms/page.tsx:6`）
**Category:** Modern Meta Tags
**Impact:** Medium

**Current Code:**
```tsx
export const metadata: Metadata = {
  title: `${VENUE.title}｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}${VENUE.title}：${VENUE.items.join("、")}。`,
  alternates: { canonical: "/venue/" },
};
```

**Problem:**
子頁面沒有自己的 `openGraph`，所以會整組繼承 `src/app/layout.tsx:24-33` 的設定，包括 `url: "/"` 和首頁的分享標題。把「場域租借」頁貼到 LINE / FB 時，預覽卡片的標題是首頁標題，`og:url` 也指向首頁，社群平台可能把它當成首頁。

**Recommended Fix:**
在每個子頁面補上自己的 `openGraph`。注意 Next.js 會「整組取代」上層的 openGraph，所以圖片、站名等也要一起帶入，可以做成共用設定：
```tsx
// src/constants/site.ts 新增
export const BASE_OG = {
  type: "website",
  locale: "zh_TW",
  siteName: `${SITE.name} ${SITE.nameEn}`,
  images: [{ url: SHARE.image, width: 1200, height: 630, alt: `${SITE.name} LOGO` }],
} as const;

// src/app/venue/page.tsx
export const metadata: Metadata = {
  title: `${VENUE.title}｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}${VENUE.title}：${VENUE.items.join("、")}。`,
  alternates: { canonical: "/venue/" },
  openGraph: { ...BASE_OG, title: `${VENUE.title}｜${SITE.name}`, url: "/venue/" },
};
```

**Source:** https://ogp.me/

#### SEO-3: 自訂圖片 loader 沒有真的縮圖，手機也下載原尺寸大圖

**File:** `src/lib/image-loader.ts:8`
**Category:** Performance Signals
**Impact:** Medium

**Current Code:**
```ts
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${basePath}${src}?w=${width}`;
}
```

**Problem:**
`next/image` 會依螢幕大小產生多個尺寸（srcset），但這個 loader 只是在網址後面加 `?w=寬度`。GitHub Pages 不會處理這個參數，所以每個尺寸拿到的都是同一張原圖。`public/images` 共約 13 MB，最大的照片超過 500 KB（例如 `venue-wulai-01.jpg` 約 530 KB、`golead-02.jpg` 約 420 KB），手機版也是整張下載，拖慢 LCP（最大內容繪製時間）。

**Recommended Fix:**
靜態網站沒有伺服器即時縮圖，有兩種做法擇一：
```text
1. 簡單版：把超過 300 KB 的照片先壓縮（長邊約 1600px、品質 75–80），直接覆蓋原檔。
2. 進階版：在建置時預先產生多種尺寸（例如使用 next-image-export-optimizer 這類套件），
   讓 loader 指到對應尺寸的檔案。
```

**Source:** https://web.dev/articles/optimize-lcp

### 🔵 Suggestions & Nice-to-Haves

#### SEO-4: 社群分享描述刻意留成全形空白

**File:** `src/constants/site.ts:36`
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:**
```ts
  description: "　",
```

**Problem:**
這是刻意的設計（只想讓預覽卡顯示一行標題）。但 `og:description` 等於空白，FB 等平台有時會自己抓頁面上的文字來填，結果反而不可控。

**Recommended Fix:**
若卡片目前顯示正常可以維持現狀；想更保險，可以改成一句短的描述，例如品牌標語 `SITE.slogan`。

**Source:** https://ogp.me/

#### SEO-5: 沒有 Apple 主畫面圖示（apple-touch-icon）

**File:** `src/app/`（只有 `icon.png`）
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
iPhone 使用者把網站「加入主畫面」時，沒有專用圖示會顯示截圖或空白圖示。

**Recommended Fix:**
```text
在 src/app/ 放一張 180×180 的 apple-icon.png，Next.js 會自動輸出 <link rel="apple-touch-icon">。
```

**Source:** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

#### SEO-6: sitemap 的最後更新時間每次建置都會變成「現在」

**File:** `src/app/sitemap.ts:8`
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:**
```ts
  const lastModified = new Date();
```

**Problem:**
每次部署，四個頁面都會被標成剛更新，連一年沒改的隱私權政策也一樣。Google 發現 `lastmod` 不可信時會直接忽略它。

**Recommended Fix:**
```ts
// 改成手動填各頁真正的更新日期，例如：
{ url: `${SITE_URL}/privacy/`, lastModified: "2026-10-27", changeFrequency: "yearly", priority: 0.3 },
```

**Source:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

#### SEO-7: 子頁面沒有麵包屑結構化資料（BreadcrumbList）

**File:** `src/app/venue/page.tsx`、`src/app/privacy/page.tsx`、`src/app/terms/page.tsx`
**Category:** Structured Data
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
加上麵包屑資料後，Google 搜尋結果可能把網址顯示成「hbh-tw.store › 場域租借」，比較好讀。

**Recommended Fix:**
可用 `/seo-schema` 產生；或在場域租借頁加入 `首頁 → 場域租借` 兩層的 `BreadcrumbList` JSON-LD。

**Source:** https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

#### SEO-8: 沒有 WebSite 結構化資料

**File:** `src/app/page.tsx:13`
**Category:** Structured Data
**Impact:** Low

**Current Code:**
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
```

**Problem:**
首頁只有 `Organization`。Google 用 `WebSite` 的 `name` 來決定搜尋結果上方顯示的網站名稱，沒有的話可能顯示網域。

**Recommended Fix:**
```tsx
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: `${SITE_URL}/`,
};
// 和 jsonLd 一樣輸出成另一個 <script type="application/ld+json">
```

**Source:** https://developers.google.com/search/docs/appearance/site-names

#### SEO-9: 圖片都是 JPG，沒有 WebP / AVIF

**File:** `public/images/`（全部為 .jpg / .png，0 個 .webp / .avif）
**Category:** Performance Signals
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
同樣畫質下，WebP 通常比 JPG 小 25–35%。靜態網站無法自動轉檔，要在上傳前先轉好。

**Recommended Fix:**
處理 SEO-3 時一併轉成 WebP，並把 `constants/*.ts` 裡的檔名副檔名一起改掉。

**Source:** https://web.dev/articles/serve-images-webp

#### SEO-10: 沒有「跳到主要內容」連結

**File:** `src/components/layout/Header.tsx:11`
**Category:** Accessibility
**Impact:** Low

**Current Code:**
```tsx
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
```

**Problem:**
用鍵盤或螢幕閱讀器的訪客，每頁都要先跳過整排選單才能看到內容。

**Recommended Fix:**
```tsx
// Header 最前面加入，並讓 <main> 加上 id="main"
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
  跳到主要內容
</a>
```

**Source:** https://www.w3.org/WAI/WCAG22/Techniques/general/G1

For deeper a11y coverage, run `/accessibility-audit` from the ai-accessibility plugin.

#### SEO-11: 沒有設定安全性標頭

**File:** `next.config.ts:10`
**Category:** Security Headers
**Impact:** Low

**Current Code:**
```ts
  output: "export",
```

**Problem:**
網站是靜態輸出、放在 GitHub Pages，GitHub Pages 不能自訂 HSTS、CSP、X-Content-Type-Options 等回應標頭。這受限於主機，不是程式寫錯。

**Recommended Fix:**
```tsx
// 能在程式裡做的：在 layout.tsx 的 metadata 加上 Referrer-Policy
referrer: "strict-origin-when-cross-origin",
// 其他標頭若真的需要，可以在網域前面加 Cloudflare 這類 CDN 來設定。
```

**Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy

### ✅ What's Working Well

- ✅ 使用 Next.js Metadata API，每頁都有自己的 `title`、`description` 和 canonical（`/`、`/venue/`、`/privacy/`、`/terms/`）
- ✅ 設定了 `metadataBase`，相對網址會自動補成完整網址
- ✅ `src/app/sitemap.ts`、`src/app/robots.ts` 自動產生 sitemap 和 robots，robots 也有指向 sitemap
- ✅ `<html lang="zh-Hant">`、`openGraph.locale: "zh_TW"` 語言設定正確
- ✅ 首頁有完整的 `Organization` JSON-LD（名稱、Logo、聯絡方式、服務目錄），並把 `<` 跳脫，避免注入問題
- ✅ 每一頁都只有一個 `<h1>`，標題層級 h1 → h2 → h3 → h4 沒有跳級
- ✅ 使用 `<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<footer>`、`<figure>` 等語意標籤
- ✅ 全站使用 `next/image`，沒有直接寫 `<img>`；所有內容圖片都有具體的中文替代文字，純裝飾圖用 `alt=""` 加 `aria-hidden`
- ✅ 首屏大圖（Hero）和 Logo 有 `preload`，其他圖片自動延遲載入
- ✅ 所有 `target="_blank"` 外部連結都有 `rel="noopener noreferrer"`
- ✅ Google 日曆 iframe 有 `title` 和 `loading="lazy"`；影片 `preload="none"`，不拖慢首頁
- ✅ Google Analytics 透過 `@next/third-parties` 載入，不會阻擋畫面顯示
- ✅ `trailingSlash: true` 和 sitemap、canonical 的網址結尾斜線一致
- ✅ 標題與描述長度以中文來看都在合理範圍
- ✅ 沒有 IE 時代的舊寫法、jQuery、float 排版或 microdata

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 子頁面的 `openGraph` 要自己寫完整一組（見 SEO-2），因為 Next.js 對 `openGraph` 是整組取代，不會逐欄合併。
- Apple 圖示用檔案慣例：在 `src/app/` 放 `apple-icon.png` 即可，不用手寫 `<link>`。
- 因為是 `output: "export"`，`next/image` 的內建縮圖功能用不到，要自己準備縮好的圖（見 SEO-3）。
- 已經在用 `sitemap.ts`、`robots.ts`、Metadata API，都是目前建議的寫法，維持即可。

### 📊 Core Web Vitals Considerations

Static-analysis findings that may impact Core Web Vitals:

- **LCP (Largest Contentful Paint):** Hero 圖有 `preload` 很好（約 155 KB）。但自訂 loader 不會縮圖（SEO-3），手機也下載原尺寸，案例區的大照片會拖慢整體載入。
- **CLS (Cumulative Layout Shift):** 圖片都用 `fill` 搭配固定比例的外框，或寫明 `width` / `height`，版面跳動風險低。字型由 `next/font` 處理。
- **INP (Interaction to Next Paint):** 互動元件不多（選單、案例篩選、視差、輪播）。從程式碼看不出明顯的長任務。

Runtime measurement is required for actual Core Web Vitals scores. Use PageSpeed Insights or Chrome DevTools. INP replaced FID in March 2024.

---

## 🎯 Prioritized Action Plan

Across all audited lenses, ranked by impact for the effort:

1. **[Quick Win]** SEO-1：刪除 `layout.tsx` 的 `keywords` 那一行（分數預估升到 A 級左右）
2. **[Quick Win]** SEO-2：子頁面補上自己的 `openGraph`，讓分享預覽正確
3. **[Quick Win]** SEO-8 / SEO-5：首頁加 `WebSite` 結構化資料、放一張 `apple-icon.png`
4. **[Quick Win]** SEO-6：sitemap 改成手動填真正的更新日期
5. **[Medium Effort]** SEO-3 + SEO-9：壓縮大張照片並轉成 WebP
6. **[Medium Effort]** SEO-7 / SEO-10：子頁面麵包屑資料、跳到主要內容連結
7. **[Larger Effort]** SEO-11：若需要完整安全標頭，評估在網域前加 CDN

---

## 🔧 Remediation

```
/seo-fix              # apply fixes from this report
/seo-fix --dry-run    # preview the diffs without writing
/seo-schema           # generate BreadcrumbList / WebSite structured data
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

Performed by the `ai-seo` plugin using LLM training data as fallback.

**Files analyzed:** 32
**Routes detected:** 4（`/`、`/venue/`、`/privacy/`、`/terms/`）
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
