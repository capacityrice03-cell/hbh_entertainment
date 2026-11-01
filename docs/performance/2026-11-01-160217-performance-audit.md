# 效能檢查報告（Performance Audit）

## Executive Summary

### Audit Overview

- **Target System**: practice1（好不好娛樂官網 hbh-tw.store）
- **Analysis Date**: 2026-11-01
- **Analysis Scope**: Web Application（純靜態網站，無後端、無資料庫）
- **Audited Path**: Whole repository
- **Technology Stack**: Next.js 16.4.2（`output: "export"` 靜態匯出、Turbopack）、React 19.3、TypeScript、Tailwind CSS 4、Lenis 1.3（平滑滾動）、motion 14（作品集頁動畫）、sharp（建置後產生 WebP 縮圖）、GitHub Pages 部署、Google Analytics（@next/third-parties）

### Performance Assessment Summary

| Performance Level | Count | Percentage |
|-------------------|-------|------------|
| Critical Issues   | 0     | 0%         |
| High Impact       | 0     | 0%         |
| Medium Impact     | 4     | 44%        |
| Low Impact        | 5     | 56%        |
| **Total**         | **9** | **100%**   |

### Key Analysis Results

- **Performance Anti-Patterns**: 0 個需要立即處理的嚴重問題。網站是靜態檔，沒有伺服器、資料庫，不會有 N+1 查詢、連線池耗盡這類問題。
- **Code Optimization Opportunities**: 4 個中等影響的改善點，集中在「首屏圖片優先順序」與「送到瀏覽器的 JavaScript／HTML 份量」。
- **Architecture Assessment**: 8/10 項效能最佳做法已經做到（靜態輸出、WebP 多尺寸、圖片延遲載入、影片 `preload="none"`、字型只載拉丁子集、GA 延後載入、事件監聽都有清除、尊重「減少動態效果」設定）。
- **Overall Code Performance Score**: 82/100（以靜態分析與建置產物量測為準）

---

## Analysis Methodology

### Performance Analysis Approach

- **Static Code Analysis**: 逐一閱讀 `src/` 下所有元件、頁面、常數與 `scripts/optimize-images.mjs`
- **Database Query Analysis**: 不適用（無資料庫、無 API；資料都寫在 `src/constants/*.ts`）
- **Resource Utilization Assessment**: 量測 `out/`（2026-11-01 12:40 建置）中每頁的 JS chunk、HTML、圖片、影片大小與 gzip 後大小
- **Architecture Performance Review**: 檢查 Server／Client Component 切分、圖片 loader、部署設定（`.github/workflows/deploy.yml`、`next.config.ts`）

### Analysis Coverage

- **Files Analyzed**: 41 個原始檔（約 3,900 行），分布在 `src/app`、`src/components`（6 個子資料夾）、`src/constants`、`src/lib`、`scripts`
- **Database Queries Reviewed**: 0（專案沒有資料存取層）
- **API Endpoints Analyzed**: 0 個 API；6 個靜態頁面（`/`、`/works/`、`/venue/`、`/services/brand-video/`、`/privacy/`、`/terms/`）
- **Performance Patterns Checked**: 首屏 LCP 圖片優先權、hydration 份量、bundle 大小、DOM 數量、記憶體洩漏（監聽器／計時器清除）、rAF 迴圈、快取標頭、壓縮、建置產物重複

### Analysis Capabilities

- **Pattern Detection**: 監聽器未清除、rAF 未節流、重複渲染、不必要的 client component
- **Database Analysis**: 不適用
- **Resource Analysis**: 每頁 JS（原始／gzip）、HTML 大小、WebP 輸出重複率、影片位元率與 moov 位置
- **Architecture Assessment**: Server／Client 元件邊界、靜態主機快取策略
- **Frontend Analysis**: LCP（Hero 圖）、INP（hydration 與主執行緒負擔）、CLS（圖片皆有固定比例容器）、bundle 組成

**量測摘要（建置產物）**

| 頁面 | 載入 JS（原始） | 載入 JS（gzip） | HTML（原始／gzip） | `<img>` 數 |
|------|----------------|----------------|-------------------|-----------|
| `/` | 658 KB | 204 KB | 255 KB / 28.7 KB | 197（195 個 lazy） |
| `/works/` | 760 KB | 239 KB | 50 KB | — |
| `/venue/` | 621 KB | 192 KB | 36 KB | — |
| `/services/brand-video/` | 656 KB | 204 KB | 233 KB | — |

其中約 170 KB（gzip）是 React／Next.js 執行環境，每個 Next 網站都有，不列為問題。

---

## Performance Findings

### Critical Performance Issues

No critical issues identified.

### High Performance Impact Findings

No high issues identified.

### Medium Performance Impact Findings

#### P-001: Hero 首屏大圖沒有設定高優先權（影響 LCP）

**Location**: `src/components/sections/Hero.tsx:7-14`、`src/components/layout/Header.tsx:14-21`
**Performance Impact**: 6.0 (Medium)
**Pattern Detected**: LCP 圖片只用 `preload`、沒有 `fetchPriority="high"`；同時 Logo 也被 preload，跟 Hero 搶頻寬
**Code Context**:

```tsx
// Hero.tsx
<Image
  src="/images/hero.jpg"
  alt="台北京站開幕活動現場人潮"
  fill
  preload
  sizes="100vw"
  className="object-cover"
/>

// Header.tsx
<Image src="/images/logo.png" alt={SITE.name} width={1225} height={746}
  className="h-11 w-auto md:h-14" preload />
```

建置後的 `out/index.html`：

```html
<link rel="preload" as="image" imageSrcSet="/images/_w/logo-1600.webp 1x, /images/_w/logo-1920.webp 2x"/>
<link rel="preload" as="image" imageSrcSet="/images/_w/hero-640.webp 640w, ..." imageSizes="100vw"/>
<!-- 兩者都沒有 fetchpriority="high"；<img> 本身也沒有 -->
```

**Impact**: Chrome 對圖片（包含 `<link rel=preload as=image>`）預設給「低」優先權，要等版面排好、確認在畫面內才升高。Hero 圖（手機約 50–90 KB WebP）是首頁的 LCP 元素，晚一步開始下載就直接拖慢 LCP。Logo 排在 Hero 前面一起 preload，在手機 4G 上會再分走一點頻寬。Next.js 16 文件（`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:290`）也寫明：「多數情況應改用 `loading="eager"` 或 `fetchPriority="high"`，而不是 `preload`。」
**Performance Cost**: 手機 4G 估計 LCP 多 150–400 ms
**Recommendation**: Hero 改用 `fetchPriority="high"` + `loading="eager"`；Logo 拿掉 `preload`（它很小，不是 LCP，放 `loading="eager"` 即可）。

```tsx
// Hero.tsx
<Image src="/images/hero.jpg" alt="..." fill sizes="100vw"
  loading="eager" fetchPriority="high" className="object-cover" />

// Header.tsx
<Image src="/images/logo.png" alt={SITE.name} width={1225} height={746}
  sizes="96px" loading="eager" className="h-11 w-auto md:h-14" />
```

**Fix Priority**: Within 1 week

#### P-002: 整個「實際案例」區塊都是 Client Component，案例資料和渲染全部送到瀏覽器

**Location**: `src/components/sections/Cases.tsx:1`（`"use client"`），連帶 `src/components/sections/WarmKitchen.tsx`、`src/components/ui/PhotoWall.tsx`，以及 `src/app/services/brand-video/page.tsx:6` 引用的 `CaseCard`
**Performance Impact**: 5.5 (Medium)
**Pattern Detected**: Over-hydration——只有「分類篩選按鈕」需要互動，卻把整份案例資料、所有卡片、暖廚家味大區塊都變成瀏覽器端元件
**Code Context**:

```tsx
"use client";
// ...
import WarmKitchen from "@/components/sections/WarmKitchen";
import { CASES } from "@/constants/cases";

export default function Cases() {
  const [filter, setFilter] = useState<Filter>("all");
  // ...
  const list = filter === "all" ? CASES : CASES.filter((c) => c.services.includes(filter));
```

**Impact**: 
- `CASES` 全部文字、暖廚家味內容被打包進 `2n3b15lez0c3o.js`（35.6 KB／gzip 11.6 KB），首頁與品牌影音分頁都會下載、解析、執行。
- 瀏覽器載入後要把整個案例區（數十張圖、WarmKitchen 三個區塊）重新 hydrate，佔用手機主執行緒，影響使用者第一次點擊的反應速度（INP／TBT）。
- 同樣的內容已經在 HTML 裡，等於送了兩次。

**Performance Cost**: 每次載入首頁或品牌影音頁多 11.6 KB gzip JS；中低階手機估計 hydration 多 30–80 ms 主執行緒時間
**Recommendation**: 讓 `Cases` 回到 Server Component，案例卡片在伺服器（建置時）產生；只把「篩選按鈕 + 顯示／隱藏」做成小的 client 元件，用 `children` 把伺服器產生的卡片傳進去，切換時只改 `hidden` 屬性。範例見「Code Optimization Examples」。
**Fix Priority**: Within 1 month

#### P-003: 短影音牆把 51 張圖複製 3 份，首頁 HTML 與 DOM 偏重，載入後還會整批重排

**Location**: `src/components/ui/LoopingWall.tsx:29-33`、`:136-160`
**Performance Impact**: 5.0 (Medium)
**Pattern Detected**: 為了無限循環，伺服器端就輸出 3 × 51 = 153 個 `<li>` + `<Image>`；載入後再洗牌，React 要移動 153 個節點
**Code Context**:

```tsx
const [items, setItems] = useState<readonly Item[]>(source);
const [ready, setReady] = useState(false);
useEffect(() => {
  setItems(shuffle(source));
  setReady(true);
}, [source]);
// ...
const copies = [0, 1, 2];
{copies.flatMap((c) =>
  items.map((v, i) => (
    <li key={`${c}-${v.src}`} ...>
      <Image src={v.src} fill sizes="(min-width: 1024px) 165px, (min-width: 640px) 150px, 28vw" ... />
```

**Impact**: 
- 首頁 197 個 `<img>` 裡有 153 個來自這面牆；每個都帶完整 `srcSet`，是首頁 HTML 達 255 KB（gzip 28.7 KB）的主要原因之一，也拉長 HTML 解析與 hydration 時間。
- 載入順序是：HTML 顯示時 `scrollLeft = 0`（停在第 1 份開頭）→ hydration 後洗牌 → 捲到第 2 份中間。如果這區塊在瀏覽器延遲載入的預讀距離內（Chrome 約 1,250–2,500 px），一開始第 1 份開頭那幾張縮圖可能先被下載，但洗牌、置中後使用者根本看不到它們（推測，需用 DevTools Network 確認）。
- 洗牌後重排 153 個節點，在手機上是一次明顯的主執行緒工作。

**Performance Cost**: 首頁 HTML 約多 60–80 KB（原始）；可能多下載 8–16 張 10–20 KB 的縮圖；hydration 階段多 20–50 ms
**Recommendation**: 
1. 伺服器端只輸出「中間那一份」，載入後再於瀏覽器補上前後兩份（`ready` 之後才渲染 copies 0 與 2）。
2. 前後兩份加上 `loading="lazy"`（預設已是）並維持 `aria-hidden`，同時把它們的 `sizes` 與中間份一致，確保共用快取。
3. 如果不一定要每次隨機，可以在建置時就決定順序，省掉洗牌造成的重排。

**Fix Priority**: Within 1 month

#### P-004: GitHub Pages 無法設定快取標頭，所有檔案只快取 10 分鐘

**Location**: `.github/workflows/deploy.yml:28-31`、`next.config.ts:11`
**Performance Impact**: 4.5 (Medium)
**Pattern Detected**: 靜態主機的快取策略不可調整；圖片檔名沒有內容雜湊
**Code Context**:

```yaml
- run: npm run build
- uses: actions/upload-pages-artifact@v5
  with:
    path: out
```

**Impact**: GitHub Pages 對所有檔案一律回 `Cache-Control: max-age=600`，也只支援 gzip、不支援 brotli。`/_next/static/*` 檔名已含雜湊，其實可以永久快取，但現在回訪者每隔 10 分鐘就要重新驗證約 200 KB gzip 的 JS、幾十張 WebP。圖片在 `/images/_w/xxx-640.webp` 這種固定檔名，換圖時也只能靠 10 分鐘過期。
**Performance Cost**: 回訪者（例如客戶隔天再打開）每次多 30–80 個條件請求（304），手機網路每個約 50–150 ms 往返；brotli 比 gzip 再小約 15–20%
**Recommendation**: 在網域前面接 Cloudflare（免費方案即可），設定快取規則：
- `/_next/static/*` → `Cache-Control: public, max-age=31536000, immutable`
- `/images/_w/*`、`/videos/*` → Edge TTL 30 天，換圖時改檔名或清除快取
- 開啟 Brotli

不想多一層服務的話，這項可以先不做，影響主要在回訪者。
**Fix Priority**: Within 2 months

### Low Performance Impact Findings

#### P-005: 作品集頁整包載入 motion，可改用 LazyMotion 縮小

**Location**: `src/components/showcase/BentoShowcase.tsx:4`
**Performance Impact**: 3.5 (Low)
**Pattern Detected**: 使用完整的 `motion.*` 元件，所有動畫功能都被打包
**Code Context**:

```tsx
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
// ...
<motion.button layoutId={`card-${item.id}`} ...>
```

**Impact**: `/works/` 多一個 142 KB（gzip 47.8 KB）的 chunk（`3nh2a_jg7vusn.js`），是所有頁面裡 JS 最重的一頁。只影響作品集頁。
**Performance Cost**: 作品集頁多 47.8 KB gzip JS；改用 `LazyMotion` + `m` 預估可省 10–20 KB gzip（共享佈局動畫需要 `domMax`，省得沒有 `domAnimation` 多）
**Recommendation**:

```tsx
import { AnimatePresence, LazyMotion, domMax, m, useReducedMotion } from "motion/react";

export default function BentoShowcase({ items }: { items: ShowcaseItem[] }) {
  return (
    <LazyMotion features={domMax} strict>
      {/* 內部所有 motion.xxx 改成 m.xxx */}
    </LazyMotion>
  );
}
```

**Fix Priority**: Within 2 months

#### P-006: Logo 用 1600 px 寬的圖顯示在約 90 px 的位置

**Location**: `src/components/layout/Header.tsx:14-21`、`src/app/works/page.tsx:123`、`src/app/venue/page.tsx:45`、`src/app/services/brand-video/page.tsx:85`
**Performance Impact**: 2.5 (Low)
**Pattern Detected**: 固定寬高的 `<Image>` 用了原圖尺寸 `width={1225}`，沒給 `sizes`，srcset 只會產生 1600w／1920w
**Code Context**:

```tsx
<Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
```

輸出：`srcSet="/images/_w/logo-1600.webp 1x, /images/_w/logo-1920.webp 2x"`

**Impact**: 實際顯示約 72–92 px 寬，下載的是原尺寸檔（9.9 KB）。因為無損 WebP 壓得很好，浪費不多，但解碼一張 1225 px 的圖還是比 256 px 慢。
**Performance Cost**: 每頁約 5 KB、解碼時間數毫秒
**Recommendation**: 改成實際顯示比例的寬高（例如 `width={151} height={92}`），srcset 就會選 256w／384w：

```tsx
<Image src="/images/logo.png" alt={SITE.name} width={151} height={92} className="h-11 w-auto md:h-14" />
```

**Fix Priority**: Within 2 months（可和 P-001 一起改）

#### P-007: Lenis 開啟 `autoRaf` 後，每一幀都在跑，即使頁面沒有捲動

**Location**: `src/components/providers/SmoothScrollProvider.tsx:17-22`
**Performance Impact**: 2.5 (Low)
**Pattern Detected**: 永不停止的 `requestAnimationFrame` 迴圈（Lenis 原始碼 `node_modules/lenis/dist/lenis.mjs:730` 每幀重新排下一次）
**Code Context**:

```tsx
const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.1,
  anchors: { offset: -80 },
});
```

**Impact**: 頁面開著不動時，主執行緒仍每秒被喚醒 60–120 次。每次工作很少，但會讓筆電、手機多耗一點電，並讓滾輪捲動完全依賴主執行緒（主執行緒忙時捲動會卡）。這是「慣性滾動」效果本身的取捨，不算錯誤。
**Performance Cost**: 閒置時約 0.1–0.3 ms／幀的 CPU
**Recommendation**: 目前做法可接受（已在「減少動態效果」時停用）。若在意電量，可以只在 Lenis 捲動中才跑 rAF：

```tsx
const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -80 } });
let id = 0;
const loop = (t: number) => {
  lenis.raf(t);
  id = lenis.isScrolling ? requestAnimationFrame(loop) : 0;
};
const kick = () => { if (!id) id = requestAnimationFrame(loop); };
window.addEventListener("wheel", kick, { passive: true });
window.addEventListener("touchstart", kick, { passive: true });
lenis.on("scroll", kick); // 錨點捲動時也會喚醒
```

（改之前要實測錨點連結與燈箱暫停仍正常。）
**Fix Priority**: Within 2 months（可選）

#### P-008: 縮圖產生腳本輸出 489 個重複檔案，原圖也一起部署

**Location**: `scripts/optimize-images.mjs:51-67`
**Performance Impact**: 2.0 (Low)
**Pattern Detected**: 原圖寬度小於目標寬度時（`withoutEnlargement`），仍為每個寬度各寫一個內容相同的檔
**Code Context**:

```js
for (const w of widths) {
  const resized = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
  // ...
  await writeFile(path.join(outDir, `${base}-${w}.webp`), best);
}
```

**Impact**: `out/images/_w` 共 1,008 個檔、33 MB，其中 489 個（約 48%）是重複內容。例如 `hero-1080.webp`、`hero-1600.webp`、`hero-1920.webp` 都是 92,656 bytes。對訪客的影響：不同網址各自快取，視窗大小改變時可能重複下載同一張圖。另外 `public/images` 的 12 MB 原圖也被複製進 `out/`，正式網站不會用到大部分原圖。每次建置都重新轉 126 張 × 8 種寬度，沒有快取。
**Performance Cost**: 部署包多約 15 MB 重複檔 + 12 MB 原圖；建置時間多數十秒
**Recommendation**: 讓 loader 和腳本都只用「不超過原圖寬度」的尺寸。做法：腳本輸出一份 `image-manifest.json`（每張圖的實際寬度），`image-loader.ts` 依照它把超過原圖的寬度改成原圖寬度那一檔，腳本就不必寫重複檔。
**Fix Priority**: Within 2 months

#### P-009: 多處 `backdrop-blur` 與大面積 `blur-xl`，低階手機捲動時 GPU 負擔較重

**Location**: `src/components/layout/Header.tsx:11`、`src/components/sections/Hero.tsx:59`、`src/components/sections/WarmKitchen.tsx:187-194`
**Performance Impact**: 2.0 (Low)
**Pattern Detected**: 固定頁首使用 `backdrop-blur`，捲動時每一幀都要重新模糊背後內容；WarmKitchen 用同一張照片再疊一層 `blur-xl scale-110` 當背景
**Code Context**:

```tsx
<header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
// ...
<Image src={p.src} alt="" aria-hidden="true" fill ... className="scale-110 object-cover blur-xl" />
```

**Impact**: 頁首背景已經是 90% 不透明白色，模糊效果幾乎看不出來，但在中低階 Android 上會增加捲動時的合成成本。`blur-xl` 那張圖是同一個網址，不會多下載，只有繪製成本。
**Performance Cost**: 低階手機捲動時可能掉幀（每幀多 1–3 ms GPU）
**Recommendation**: 頁首改成 `bg-white/95` 拿掉 `backdrop-blur`，或只在 `md:` 以上開啟（`md:backdrop-blur`）。`blur-xl` 背景可改用預先模糊的小圖（例如 128w 縮圖放大），繪製成本會小很多。
**Fix Priority**: Within 2 months（可選）

---

## Code Pattern Performance Analysis

### Performance Anti-Pattern Detection

- **N+1 Query Patterns**: 0 instances（無資料庫）
- **Blocking Operations**: 0 個；建置腳本使用非同步 I/O，並限制同時處理 4 張
- **Memory Pressure Points**: 0 個洩漏。所有 `addEventListener`、`ResizeObserver`、`MutationObserver`、`requestAnimationFrame` 都在 effect 清除函式中正確移除（`Parallax.tsx:52-57`、`LoopingWall.tsx:119-128`、`Lightbox.tsx:40-43`、`SmoothScrollProvider.tsx:29-32`、`BentoShowcase.tsx:186-189`）
- **Inefficient Data Access**: 1 個（P-002：案例資料整份送到瀏覽器）
- **Concurrency Issues**: 0 個

### Database Access Pattern Analysis

- **ORM/Query Usage**: 0 queries（資料來自 `src/constants/*.ts`，建置時就固定）
- **Missing Async Patterns**: 0
- **Query Complexity**: 0
- **Connection Management**: 不適用

### Resource Management Pattern Analysis

- **Memory Allocation Patterns**: 主要壓力在首頁 DOM（197 個 `<img>`，其中 153 個來自 P-003 的短影音牆）
- **Garbage Collection Pressure**: 0 個明顯位置。`Cases.tsx:49` 每次 render 對每個分類跑一次 `CASES.filter`，資料量小（數十筆），可忽略
- **Thread/Event Loop Usage**: 2 個主執行緒持續負擔：Lenis rAF（P-007）、hydration 份量（P-002、P-003）
- **Caching Opportunities**: 1 個（P-004：CDN／瀏覽器快取標頭）
- **Resource Disposal**: 0 個問題

---

## Architecture Performance Assessment

### Data Access Layer Analysis

- 沒有資料存取層。所有內容在建置時寫進 HTML，是最快的做法。
- 唯一的「資料傳輸」問題是 P-002：案例資料因 client component 被重複放進 JS。
- 讀寫模式不適用（網站唯讀）。

### Application Layer Analysis

- 沒有 async／阻塞問題；互動邏輯都是輕量的事件處理。
- 資源生命週期處理得很好：每個 effect 都有對應清除；`Parallax` 用 rAF 合併捲動事件、只改 `transform`、畫面外不計算；`SpotlightCard` 用 CSS 變數追蹤滑鼠，不觸發 React 重新渲染。
- CPU：首頁 hydration（P-002、P-003）是主要成本；Lenis 持續 rAF 是次要成本（P-007）。
- 外部資源：Google Analytics 由 `@next/third-parties` 在互動後載入；YouTube 只在打開作品詳情時才嵌入（`youtube-nocookie.com`）；Google 日曆 iframe 有 `loading="lazy"`。

### Frontend Analysis (if applicable)

- **LCP**：Hero 圖已 preload、已用 WebP 多尺寸，缺的是高優先權（P-001）。
- **INP**：hydration 量偏大（P-002、P-003）；互動處理函式本身都很輕。
- **CLS**：所有 `fill` 圖片都在固定比例容器內（`aspect-*`），固定寬高的圖都有 `width`/`height`；字型用 `next/font` 自動處理 fallback 尺寸。CLS 風險低。短影音牆用 `opacity-0` 等洗牌完成才顯示，不會造成位移。
- **Bundle**：每頁 192–239 KB gzip，其中約 170 KB 是 React／Next 執行環境；專案自己的程式碼約 25–70 KB。最重的是作品集頁的 motion（P-005）。
- **字型**：Geist 只載 `latin` 子集，中文用系統字型（蘋方、微軟正黑體），避免下載數 MB 的中文字型。
- **影片**：`warm-news.mp4` 12.7 MB（720p、880 kbps、115 秒），`moov` 在檔頭（可邊下載邊播），首頁用 `preload="none"` + WebP 海報圖，不點不下載。作品集卡片的預覽短片 194 KB，也是 `preload="none"`、滑鼠移上去才載入。

### Infrastructure Analysis

- **快取**：GitHub Pages 固定 `max-age=600`，無法設定（P-004）。
- **壓縮**：GitHub Pages 提供 gzip（首頁 HTML 255 KB → 28.7 KB），沒有 brotli。
- **監控**：只有 Google Analytics，沒有 Core Web Vitals 的實際使用者資料（RUM）。

---

## Performance Bottleneck Analysis

### Top Performance Bottlenecks

| Rank | Component | Issue | Impact Score | Estimated Cost |
|------|-----------|-------|--------------|----------------|
| 1 | `Hero.tsx` / `Header.tsx` | LCP 圖沒有高優先權，Logo 一起 preload 搶頻寬（P-001） | 6.0 | 手機 LCP 慢 150–400 ms |
| 2 | `Cases.tsx` | 整個案例區塊是 client component（P-002） | 5.5 | +11.6 KB gzip JS、hydration +30–80 ms |
| 3 | `LoopingWall.tsx` | 153 張圖 SSR + 載入後重排（P-003） | 5.0 | HTML +60–80 KB、可能多下載 8–16 張縮圖 |
| 4 | GitHub Pages | 快取 10 分鐘、無 brotli（P-004） | 4.5 | 回訪者 30–80 個 304 請求 |
| 5 | `BentoShowcase.tsx` | 完整 motion 打包（P-005） | 3.5 | 作品集頁 +47.8 KB gzip |
| 6 | `Header.tsx` 等 | Logo 用 1600 px 檔（P-006） | 2.5 | 每頁約 5 KB |
| 7 | `SmoothScrollProvider.tsx` | Lenis 持續 rAF（P-007） | 2.5 | 閒置耗電 |
| 8 | `optimize-images.mjs` | 489 個重複 WebP + 原圖部署（P-008） | 2.0 | 部署包 +27 MB |
| 9 | `Header.tsx` / `WarmKitchen.tsx` | `backdrop-blur`、`blur-xl`（P-009） | 2.0 | 低階手機捲動掉幀 |

---

## Technical Recommendations

### Immediate Performance Fixes

1. **P-001**：Hero 圖改 `loading="eager"` + `fetchPriority="high"`，拿掉 `preload`；Logo 拿掉 `preload`。只改兩個檔、各一行，風險最低、對 LCP 幫助最大。

### Performance Enhancements

1. **P-002**：`Cases` 改回 Server Component，只把篩選按鈕做成 client 元件。
2. **P-003**：短影音牆伺服器端只輸出中間那份，載入後再補前後兩份。
3. **P-006**：Logo `width`/`height` 改成實際顯示尺寸。
4. **P-005**：作品集頁改用 `LazyMotion` + `m`。

### Architecture Improvements

1. **P-004**：在 hbh-tw.store 前面接 Cloudflare，對 `/_next/static/*` 設永久快取、圖片設長快取、開 Brotli。
2. **P-008**：縮圖腳本輸出圖片實際寬度清單，loader 依清單選檔，不再寫重複檔；部署時排除不會用到的原圖。
3. 加上 Core Web Vitals 實際使用者資料收集（見「Performance Monitoring Setup Recommendations」）。

---

## Code Optimization Examples

### Hero 圖改用高優先權（references P-001）

**Before (Inefficient)**:

```tsx
<Image
  src="/images/hero.jpg"
  alt="台北京站開幕活動現場人潮"
  fill
  preload
  sizes="100vw"
  className="object-cover"
/>
```

**After (Optimized)**:

```tsx
<Image
  src="/images/hero.jpg"
  alt="台北京站開幕活動現場人潮"
  fill
  loading="eager"
  fetchPriority="high"
  sizes="100vw"
  className="object-cover"
/>
```

**Expected Improvement**: 手機 4G LCP 約快 150–400 ms（瀏覽器一看到 `<img>` 就以高優先權下載，不必等版面計算）

### 案例區只讓篩選按鈕在瀏覽器執行（references P-002）

**Before (Inefficient)**:

```tsx
// Cases.tsx
"use client";
import { CASES } from "@/constants/cases";
export default function Cases() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? CASES : CASES.filter((c) => c.services.includes(filter));
  return (/* 篩選按鈕 + list.map(CaseCard / WarmKitchen) */);
}
```

**After (Optimized)**:

```tsx
// Cases.tsx（Server Component，拿掉 "use client"）
import CaseFilter from "@/components/sections/CaseFilter";
export default function Cases() {
  return (
    <section id="cases" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="實際案例" en="Case Sharing" />
        <CaseFilter
          counts={{ all: CASES.length, ...Object.fromEntries(SERVICES.map((s) => [s.id, CASES.filter((c) => c.services.includes(s.id)).length])) }}
        >
          {CASES.map((c, i) => (
            <div key={c.id} data-services={c.services.join(" ")}>
              {c.feature === "warm-kitchen" ? <WarmKitchen /> : <CaseCard item={c} reverse={i % 2 === 1} />}
            </div>
          ))}
        </CaseFilter>
      </div>
    </section>
  );
}

// CaseFilter.tsx（很小的 client 元件）
"use client";
export default function CaseFilter({ counts, children }: { counts: Record<string, number>; children: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  // hashchange 處理同原本
  return (
    <>
      {/* 篩選按鈕 */}
      <div className="space-y-10" data-filter={filter}>{children}</div>
    </>
  );
}
```

```css
/* globals.css：依篩選隱藏不符合的案例 */
[data-filter="channel"] > :not([data-services~="channel"]),
[data-filter="event"] > :not([data-services~="event"]),
[data-filter="commercial"] > :not([data-services~="commercial"]) { display: none; }
```

注意：
- `CaseCard` 要搬到沒有 `"use client"` 的檔案（`PhotoWall` 仍是 client 元件，沒關係）。
- 原本的左右交錯（`reverse={i % 2 === 1}`）是依篩選後的順序計算，改成全部輸出後要改用 CSS（例如 `:nth-child` 搭配篩選後的可見項目）或接受固定交錯。這是畫面行為，改之前要確認。

**Expected Improvement**: 首頁與品牌影音頁各少 11.6 KB gzip JS；hydration 範圍從整個案例區縮到幾個按鈕，中低階手機主執行緒約省 30–80 ms

### 短影音牆前後兩份延後渲染（references P-003）

**Before (Inefficient)**:

```tsx
const copies = [0, 1, 2];
// 伺服器端就輸出 153 個 <li>
{copies.flatMap((c) => items.map((v, i) => <li key={`${c}-${v.src}`}>...</li>))}
```

**After (Optimized)**:

```tsx
// 伺服器端（ready = false）只輸出中間那份；洗牌完成後才補上前後兩份
const copies = ready ? [0, 1, 2] : [1];
{copies.flatMap((c) => items.map((v, i) => <li key={`${c}-${v.src}`}>...</li>))}
```

搭配：`measure()`／`center()` 的 effect 依賴要改成 `[items.length, ready]`，`ready` 之後才量寬度、置中。

**Expected Improvement**: 首頁 HTML 減少約 100 個 `<img>`（約 60–80 KB 原始、6–8 KB gzip），hydration 少處理約 2/3 的牆面節點

---

## Performance Optimization Priorities

### Phase 1: Critical Performance Fixes

- [ ] 無 Critical 問題。建議先做 P-001（Hero `fetchPriority="high"`、Logo 拿掉 `preload`），改動最小、效果最明確

### Phase 2: High Impact Optimizations

- [ ] 無 High 問題。依序處理 Medium：P-002（Cases 改 Server Component）
- [ ] P-003（短影音牆只 SSR 中間那份）

### Phase 3: Medium Impact Improvements

- [ ] P-004（評估是否接 Cloudflare 做快取與 Brotli）
- [ ] P-005（作品集頁 `LazyMotion`）
- [ ] P-006（Logo 尺寸）
- [ ] P-008（縮圖腳本去重複、部署排除原圖）
- [ ] P-007、P-009（可選：Lenis rAF、blur 效果）

### Phase 4: Performance Monitoring and Fine-tuning

- [ ] 用 Lighthouse（行動裝置模式）量測首頁、作品集頁目前的 LCP／TBT，做為改動前基準
- [ ] 加入 `web-vitals` 回報到 Google Analytics，收集實際使用者的 LCP／INP／CLS
- [ ] 在 GitHub Actions 加上 bundle 大小檢查（例如首頁 JS gzip 超過 220 KB 就警告）

---

## Estimated Performance Improvement Impact

### Performance Gains by Priority

| Priority Level | Expected Improvement | Implementation Complexity |
|----------------|---------------------|--------------------------|
| Critical Fixes | 無 | — |
| High Impact | 無 | — |
| Medium Impact | 手機 LCP 快 150–400 ms；首頁 JS 少約 12 KB gzip、HTML 少約 6–8 KB gzip；hydration 少 50–130 ms；回訪者省 30–80 個請求 | P-001 很低；P-002、P-003 中等（要調整元件結構並檢查畫面）；P-004 中等（要設定 DNS／Cloudflare） |
| Low Impact | 作品集頁 JS 少 10–20 KB gzip；部署包少約 27 MB；閒置耗電與低階手機捲動略改善 | 低到中等 |

### Resource Utilization Improvements

- **Database Load**: 不適用（無資料庫）
- **Memory Usage**: 首頁 DOM 少約 100 個圖片節點（P-003），手機記憶體與版面計算略降
- **CPU Utilization**: hydration 範圍縮小（P-002、P-003），首次互動前的主執行緒工作減少；Lenis 閒置不再每幀執行（P-007，可選）
- **Concurrency/Throughput**: 靜態主機沒有併發瓶頸；接 CDN（P-004）後，回訪流量大多由邊緣節點直接回應

---

## Performance Monitoring Setup Recommendations

### Observability Recommendations

- **Metrics**: 用 `web-vitals` 套件把 LCP、INP、CLS 送到現有的 Google Analytics（GA4 事件），可以在 GA 依頁面、裝置類型看分布；另可參考 Google Search Console 的「Core Web Vitals」報表（已驗證網站）
- **Logging**: 靜態網站沒有伺服器日誌；可在 GA 事件附上 `page_path`、`device_category`、`effective_connection_type`（`navigator.connection.effectiveType`）
- **Distributed Tracing**: 不適用（沒有多個服務）

### Recommended Performance Tracking

- 首頁行動版 LCP 第 75 百分位：目標 < 2.5 秒，超過 3 秒要檢查
- 首頁 INP 第 75 百分位：目標 < 200 ms
- CLS：目標 < 0.1（目前設計應已達成）
- 每頁 JS gzip 總量：首頁 ≤ 210 KB、作品集頁 ≤ 230 KB（以本次量測為基準設上限）

### Performance Testing Recommendations

- 用 Chrome DevTools（Performance 面板，CPU 4× 降速、Fast 4G）錄首頁載入，確認 Hero 圖的請求優先權（P-001）與短影音牆是否先載了看不到的縮圖（P-003）
- 用 Lighthouse CI（`@lhci/cli`）在 GitHub Actions 對 `out/` 跑 `/`、`/works/`、`/services/brand-video/` 三頁
- 用 PageSpeed Insights 量正式網站 `https://hbh-tw.store/`，比對改動前後
- 不需要負載測試：GitHub Pages／CDN 承擔流量，沒有伺服器端瓶頸

---

## Summary

This performance analysis identified **0 critical**, **0 high**, **4 medium**, and **5 low** performance issues across the application stack. The analysis focused on code patterns, database queries, resource utilization, and architectural performance.

**Key Strengths Identified**:

- 純靜態輸出，沒有伺服器與資料庫，回應時間只取決於 CDN 與檔案大小
- 自建 WebP 多尺寸流程（8 種寬度），搭配 `sizes` 讓手機只下載小圖；首頁 197 張圖有 195 張延遲載入
- 影片 `preload="none"` + WebP 海報圖、`moov` 在檔頭、位元率合理（880 kbps）
- 中文不載網路字型，只載 Geist 拉丁子集
- 所有事件監聽、Observer、rAF 都有清除；`Parallax` 用 rAF 節流、只改 `transform`；`SpotlightCard` 用 CSS 變數避免重新渲染
- 尊重「減少動態效果」設定（Lenis、Parallax、motion 都有處理）
- 圖片都在固定比例容器中，CLS 風險低

**Critical Areas Requiring Immediate Attention**:

- Hero 首屏圖要設 `fetchPriority="high"`，Logo 不要 preload（P-001）
- 案例區塊整個是 client component，資料與渲染送了兩次（P-002）
- 短影音牆 153 張圖在伺服器端全部輸出（P-003）
- GitHub Pages 快取只有 10 分鐘（P-004）

**Expected Overall Performance Improvement**: 完成 P-001 至 P-003 後，預估首頁行動版 LCP 快約 0.2–0.4 秒，首次互動前的主執行緒工作減少約 50–130 ms，首頁傳輸量少約 20 KB gzip。網站本身已經相當輕量，這些改動屬於微調，不需要大幅重構。
