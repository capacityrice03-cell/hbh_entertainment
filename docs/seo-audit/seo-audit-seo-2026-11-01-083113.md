# SEO Audit Report

**Project:** practice1（好不好娛樂官網 hbh-tw.store）
**Framework:** Next.js 16.4.2（App Router、靜態輸出 `output: "export"`，部署在 GitHub Pages）
**Audit Date:** 2026-11-01T08:31:13+08:00
**Auditor:** ai-seo plugin 2.1.0
**Lenses:** SEO
**Knowledge Source:** LLM Training Data (fallback)
**Scope:** Entire solution
**Live Check:** Not run
**Settings:** Lenses = SEO (argument)；Scope = Entire solution (argument `.`)；Live check = Not run (argument `live=no`)；Web search = Not run (argument `search=no`)；Version control = commit audits (argument `commit=yes`)

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 97/100 | A+ | 📈 from 92 | 0 | 0 | 1 | 8 |

Each lens is scored on its own. There is no combined score.

**Summary:** 上次的 Critical（`keywords` 標籤）和子頁面分享預覽的問題都已修好，分數從 92（B）升到 97（A+），已經沒有 Critical 或 High 等級的問題。剩下唯一的中度問題是圖片沒有依螢幕大小給不同尺寸：大照片已經壓縮過，但 loader 的運作方式沒變。其餘都是小幅加分項。

### Top Critical Issues

None found.

---

## SEO: Search Health

### Executive Summary

**SEO Health Score:** 97 / 100

**Grade:** A+

**Summary:** 已淘汰的寫法全部清除，每頁都有正確的標題、描述、canonical 和自己的分享設定。剩下的扣分集中在圖片效能與一些選配的結構化資料。

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 100/100 | 20% |
| Modern Meta Tags | 94/100 | 15% |
| Semantic HTML | 100/100 | 10% |
| Structured Data | 96/100 | 15% |
| Performance Signals | 93/100 | 15% |
| Accessibility | 98/100 | 10% |
| URL Structure | 100/100 | 5% |
| Security Headers | 98/100 | 5% |
| Framework Best Practices | 100/100 | 5% |

#### Issue Counts

- 🔴 **Critical Issues:** 0
- 🟠 **High Priority:** 0
- 🟡 **Medium Priority:** 1
- 🔵 **Low Priority / Suggestions:** 8
- 🟢 **Passing Checks:** 30

### 🔴 Critical Issues

None found.

### 🟠 High Priority Issues

None found.

### 🟡 Medium Priority Issues

#### SEO-1: 自訂圖片 loader 沒有依螢幕大小提供不同尺寸

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
上次報告後已把 10 張大照片壓縮（約省 1.2 MB），最大的檔案從 530 KB 降到約 380 KB。但 loader 仍只是在網址後加 `?w=寬度`，GitHub Pages 不處理這個參數，手機和電腦拿到的還是同一張圖。目前還有 3 張超過 300 KB：`venue-wulai-01.jpg`（約 380 KB）、`venue-wulai-02.jpg`、`venue-wulai-03.jpg`（各約 325 KB）。

**Recommended Fix:**
```text
在建置時預先產生多種寬度的圖片（例如 next-image-export-optimizer 這類套件，
或自寫腳本輸出 640 / 1080 / 1600 寬的版本），並讓 loader 回傳對應寬度的檔名。
```

**Source:** https://web.dev/articles/optimize-lcp

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
這是刻意的設計，FB 分享偵錯工具確認預覽顯示正常。但 `og:description` 等於空白，部分平台可能自己抓頁面文字來填。

**Recommended Fix:**
預覽目前正常可維持現狀；想更保險，可改成一句短描述，例如 `SITE.slogan`。

**Source:** https://ogp.me/

#### SEO-3: 沒有 Apple 主畫面圖示（apple-touch-icon）

**File:** `src/app/`（只有 `icon.png`）
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
iPhone 使用者把網站「加入主畫面」時，沒有專用圖示。

**Recommended Fix:**
```text
在 src/app/ 放一張 180×180 的 apple-icon.png，Next.js 會自動輸出 <link rel="apple-touch-icon">。
```

**Source:** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

#### SEO-4: sitemap 的最後更新時間每次建置都會變成「現在」

**File:** `src/app/sitemap.ts:8`
**Category:** Modern Meta Tags
**Impact:** Low

**Current Code:**
```ts
  const lastModified = new Date();
```

**Problem:**
每次部署，所有頁面都被標成剛更新。Google 發現 `lastmod` 不可信時會忽略它。

**Recommended Fix:**
```ts
// 改成手動填各頁真正的更新日期，例如：
{ url: `${SITE_URL}/privacy/`, lastModified: "2026-10-27", changeFrequency: "yearly", priority: 0.3 },
```

**Source:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

#### SEO-5: 子頁面沒有麵包屑結構化資料（BreadcrumbList）

**File:** `src/app/venue/page.tsx`、`src/app/privacy/page.tsx`、`src/app/terms/page.tsx`
**Category:** Structured Data
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
加上後，Google 搜尋結果可能把網址顯示成「hbh-tw.store › 場域租借」。

**Recommended Fix:**
可用 `/seo-schema` 產生；或在場域租借頁加入 `首頁 → 場域租借` 兩層的 `BreadcrumbList` JSON-LD。

**Source:** https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

#### SEO-6: 沒有 WebSite 結構化資料

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
Google 用 `WebSite` 的 `name` 決定搜尋結果上方顯示的網站名稱，沒有的話可能顯示網域。

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

#### SEO-7: 圖片都是 JPG，沒有 WebP / AVIF

**File:** `public/images/`（全部為 .jpg / .png，0 個 .webp / .avif）
**Category:** Performance Signals
**Impact:** Low

**Current Code:** N/A — element absent

**Problem:**
同樣畫質下，WebP 通常比 JPG 小 25–35%。

**Recommended Fix:**
處理 SEO-1 時一併輸出 WebP，並更新 `constants/*.ts` 裡的檔名。

**Source:** https://web.dev/articles/serve-images-webp

#### SEO-8: 沒有「跳到主要內容」連結

**File:** `src/components/layout/Header.tsx:11`
**Category:** Accessibility
**Impact:** Low

**Current Code:**
```tsx
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
```

**Problem:**
用鍵盤或螢幕閱讀器的訪客，每頁都要先跳過整排選單。

**Recommended Fix:**
```tsx
// Header 最前面加入，並讓 <main> 加上 id="main"
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
  跳到主要內容
</a>
```

**Source:** https://www.w3.org/WAI/WCAG22/Techniques/general/G1

For deeper a11y coverage, run `/accessibility-audit` from the ai-accessibility plugin.

#### SEO-9: 沒有設定安全性標頭

**File:** `next.config.ts:10`
**Category:** Security Headers
**Impact:** Low

**Current Code:**
```ts
  output: "export",
```

**Problem:**
GitHub Pages 不能自訂 HSTS、CSP 等回應標頭，這是主機限制，不是程式寫錯。

**Recommended Fix:**
```tsx
// 能在程式裡做的：在 layout.tsx 的 metadata 加上
referrer: "strict-origin-when-cross-origin",
// 其他標頭若需要，可在網域前加 Cloudflare 這類 CDN。
```

**Source:** https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy

### ✅ What's Working Well

- ✅ 已移除淘汰的 `keywords` 標籤（上次 SEO-1，已修正）
- ✅ 每頁都有自己的分享設定：場域租借、隱私權政策、服務條款的 `og:title`、`og:url` 正確（上次 SEO-2，已修正；FB 分享偵錯工具已確認 `/venue/`）
- ✅ `shareMeta()` 共用函式，避免 Next.js 的 openGraph 整組取代造成遺漏
- ✅ 大張照片已壓縮，最大檔案從約 530 KB 降到約 380 KB
- ✅ 使用 Next.js Metadata API，每頁都有自己的 `title`、`description`、canonical，並設定 `metadataBase`
- ✅ `sitemap.ts`、`robots.ts` 自動產生，robots 指向 sitemap
- ✅ `<html lang="zh-Hant">`、`openGraph.locale: "zh_TW"`
- ✅ 首頁有完整的 `Organization` JSON-LD，並跳脫 `<` 避免注入
- ✅ 每頁一個 `<h1>`，標題層級沒有跳級；語意標籤使用正確
- ✅ 全站 `next/image`；所有內容圖片都有具體中文替代文字，裝飾圖用 `alt=""` 加 `aria-hidden`
- ✅ 首屏大圖與 Logo 有 `preload`，其他圖片延遲載入
- ✅ 所有 `target="_blank"` 連結都有 `rel="noopener noreferrer"`
- ✅ iframe 有 `title` 與 `loading="lazy"`；影片 `preload="none"`
- ✅ GA 透過 `@next/third-parties` 載入，不阻擋畫面
- ✅ 網址結尾斜線一致；沒有 IE 時代寫法、jQuery、float 排版或 microdata

### 🏗️ Framework-Specific Recommendations

**Detected Framework:** Next.js 16.4.2（App Router、static export）

- 新增頁面時，記得在 `metadata` 裡加上 `...shareMeta(標題, 網址)`，否則會繼承首頁的分享設定。
- Apple 圖示用檔案慣例：在 `src/app/` 放 `apple-icon.png`。
- `output: "export"` 下 `next/image` 不會自動縮圖，多尺寸要在建置時自己產生（見 SEO-1）。

### 📊 Core Web Vitals Considerations

Static-analysis findings that may impact Core Web Vitals:

- **LCP (Largest Contentful Paint):** Hero 圖有 `preload`（約 155 KB）。照片已壓縮，但手機仍下載電腦版尺寸（SEO-1）。
- **CLS (Cumulative Layout Shift):** 圖片都有固定比例外框或寫明尺寸，字型由 `next/font` 處理，風險低。
- **INP (Interaction to Next Paint):** 互動元件不多，從程式碼看不出明顯長任務。

Runtime measurement is required for actual Core Web Vitals scores. Use PageSpeed Insights or Chrome DevTools. INP replaced FID in March 2024.

---

## 🎯 Prioritized Action Plan

Across all audited lenses, ranked by impact for the effort:

1. **[Quick Win]** SEO-6 / SEO-3：首頁加 `WebSite` 結構化資料、放一張 `apple-icon.png`
2. **[Quick Win]** SEO-4：sitemap 改成手動填真正的更新日期
3. **[Quick Win]** SEO-8：加「跳到主要內容」連結
4. **[Medium Effort]** SEO-5：子頁面麵包屑結構化資料
5. **[Larger Effort]** SEO-1 + SEO-7：建置時產生多尺寸、WebP 圖片
6. **[Larger Effort]** SEO-9：若需要完整安全標頭，評估在網域前加 CDN

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

Performed by the `ai-seo` plugin using LLM training data as fallback.（Context7 已在本次工作階段中途安裝，需重新啟動 Claude Code 才會載入。）

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
