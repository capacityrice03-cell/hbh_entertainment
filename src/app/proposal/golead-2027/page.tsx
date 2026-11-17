import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DeckNav from "@/components/ui/DeckNav";
import { CardAccent, DeckDecor, IconBadge, type IconName } from "@/components/ui/DeckArt";
import {
  ENDING,
  FUNNEL,
  GROWTH,
  KPIS,
  MATRIX_INTRO,
  OFFLINE,
  PAIN_POINTS,
  PILLARS,
  POSITIONING,
  PROPOSAL,
  SUMMARY,
  type Pillar,
} from "@/constants/proposalGolead2027";
import { SITE, shareMeta } from "@/constants/site";
import { WARM, WARM_REELS } from "@/constants/warmKitchen";

// 提案簡報頁：只給拿到網址的人看，不放進選單和 sitemap，也不讓搜尋引擎收錄
export const metadata: Metadata = {
  title: `${PROPOSAL.title}｜${SITE.name}`,
  description: PROPOSAL.byline,
  alternates: { canonical: PROPOSAL.path },
  robots: { index: false, follow: false },
  ...shareMeta(PROPOSAL.title, PROPOSAL.path),
};

const IMG = "/images/proposal";
// 內容頁統一的暖米色底（卡片維持白色）；封面和深藍頁不套用
const PAPER = "bg-[#f6efe2]";
// 專業、溫暖、科技／三個痛點／漏斗三層共用的三個品牌色
const TRIO = ["bg-brand-sky", "bg-brand-yellow", "bg-brand-green"];
const TONES = ["sky", "yellow", "green"] as const;
// 白色卡片：大圓角、柔和帶藍的陰影、極淡的邊框
const CARD = "rounded-3xl bg-white shadow-[0_10px_28px_-12px_rgba(31,58,110,0.25)] ring-1 ring-brand-navy/5";
// 小標籤（痛點 01、戰線 1 …）：淡橘底的膠囊；用負邊距抵掉 padding，不增加行高
const TAG = "inline-block -my-0.5 rounded-full bg-brand-orange/10 px-3 py-0.5";

/** 左側圓頭的黃色重點線（取代直角的 border-l） */
function SoftBar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative pl-5 ${className}`}>
      <span className="absolute inset-y-0 left-0 w-1.5 rounded-full bg-brand-yellow" aria-hidden="true" />
      {children}
    </div>
  );
}

// 四類內容各自的圖示：左欄大徽章＋每張企劃方向卡一個
const PILLAR_ART: { badge: IconName; dirs: IconName[] }[] = [
  { badge: "heart", dirs: ["wheel", "mic", "bolt"] },
  { badge: "dashcam", dirs: ["chat", "dashcam", "shield"] },
  { badge: "team", dirs: ["team", "mic"] },
  { badge: "target", dirs: ["clipboard", "chat", "rocket"] },
];

/** 一頁簡報：至少一個螢幕高，內容垂直置中 */
function Slide({
  children,
  className = PAPER,
  dark = false,
  backdrop,
}: {
  children: React.ReactNode;
  /** 鋪滿整頁的底圖（放在內容後面） */
  backdrop?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section data-slide className={`relative flex min-h-svh flex-col justify-center overflow-hidden py-14 md:py-14 ${className}`}>
      {backdrop}
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
      <p
        className={`absolute bottom-5 left-5 hidden text-xs tracking-widest md:left-8 md:block ${dark ? "text-white/50" : "text-muted/70"}`}
        aria-hidden="true"
      >
        {PROPOSAL.footer}
      </p>
    </section>
  );
}

/** 每頁左上的標題：英文小標 → 中文大標 → 三色短線 */
function Heading({
  en,
  title,
  lead,
  light = false,
}: {
  en: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <p className={`text-xs font-semibold tracking-[0.3em] uppercase ${light ? "text-brand-yellow" : "text-brand-blue-ink"}`}>
        {en}
      </p>
      <h2 className={`mt-3 text-3xl leading-tight font-bold tracking-wide text-balance md:text-[2.75rem] ${light ? "text-white" : "text-brand-navy"}`}>
        {title}
      </h2>
      <div className="mt-4 flex w-24 gap-1">
        <span className="h-1 flex-1 rounded-full bg-brand-sky" />
        <span className="h-1 flex-1 rounded-full bg-brand-yellow" />
        <span className="h-1 flex-1 rounded-full bg-brand-green" />
      </div>
      {lead && (
        <p className={`mt-5 max-w-4xl text-lg leading-relaxed md:text-xl ${light ? "text-white/85" : "text-ink"}`}>{lead}</p>
      )}
    </div>
  );
}

/** 內容矩陣的單一類別頁 */
/** 第 6 頁用：官網《暖廚家味》的敘事風格參考（資料沿用 src/constants/warmKitchen.ts） */
function WarmKitchenRef() {
  return (
    <div className={`mt-4 flex items-center gap-5 px-5 py-4 ${CARD}`}>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold tracking-widest text-brand-orange-ink">敘事風格參考</p>
        <p className="mt-1 text-xl font-bold text-brand-navy">{WARM.title}</p>
        <p className="mt-0.5 text-sm text-muted">{WARM.subtitle}</p>
        <Link
          href="/#warm-kitchen"
          target="_blank"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-4 py-1.5 text-sm font-medium tracking-wider text-white transition-colors hover:bg-brand-blue"
        >
          看官網完整案例
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul className="flex shrink-0 gap-2.5">
        {WARM_REELS.map((reel) => (
          <li key={reel.url}>
            <a
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${reel.chef}「${reel.hook}」${reel.views} 萬次觀看（開啟 Instagram）`}
              title={`${reel.chef}「${reel.hook}」`}
              className="relative block aspect-[9/16] w-[3.75rem] overflow-hidden rounded-xl ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
            >
              <Image src={reel.src} alt="" fill loading="eager" sizes="128px" className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1 pt-4 pb-1 text-center text-xs font-bold text-white">
                {reel.views}萬
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PillarSlide({
  pillar,
  image,
  extra,
  className,
}: {
  pillar: Pillar;
  /** wide：用 16:9（較矮），標題或訴求比較長的頁才放得進一屏 */
  image?: { src: string; alt: string; wide?: boolean };
  /** 接在企劃方向卡片下面的補充內容 */
  extra?: React.ReactNode;
  className?: string;
}) {
  const idx = Number(pillar.no) - 1;
  const art = PILLAR_ART[idx];
  return (
    <Slide className={className} backdrop={<DeckDecor variant={idx} />}>
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <div className="relative">
          {/* 左欄右上角的大圓徽章（絕對定位，不佔高度；照片位置在下方，不受影響） */}
          <IconBadge icon={art.badge} tone={TONES[idx % 3]} size="lg" className="absolute top-0 right-0" />
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue-ink uppercase">Content Matrix {pillar.no}</p>
          <p className="mt-4 inline-block rounded-full bg-brand-navy px-4 py-1.5 text-sm font-medium tracking-widest text-white">
            {pillar.tag}
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-bold tracking-wide text-brand-navy md:text-[2.75rem]">{pillar.title}</h2>
          <p className="mt-4 text-3xl font-black tracking-tight text-brand-orange md:text-4xl">{pillar.count}</p>
          <SoftBar className="mt-6">
            <p className="text-sm font-semibold tracking-widest text-muted">訴求</p>
            <p className="mt-1 text-lg leading-relaxed text-ink md:text-xl">{pillar.appeal}</p>
          </SoftBar>
          {image && (
            <div className={`relative mt-8 hidden overflow-hidden ${image.wide ? "aspect-[16/9]" : "aspect-[3/2]"} rounded-3xl shadow-[0_10px_28px_-12px_rgba(31,58,110,0.35)] ring-4 ring-white lg:block`}>
              <Image src={image.src} alt={image.alt} fill loading="eager" sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest text-muted">企劃方向</p>
          <ul className="mt-3 space-y-4">
            {pillar.directions.map((d, di) => (
              <li key={d.title} className={`relative overflow-hidden p-6 ${CARD}`}>
                <CardAccent icon={art.dirs[di]} tone={TONES[(idx + di) % 3]} />
                <h3 className="pr-12 text-xl font-bold text-brand-navy md:text-2xl">{d.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink">{d.text}</p>
                {d.link && (
                  <a
                    href={d.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 px-4 py-1.5 text-sm font-medium text-brand-blue-ink transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M6 4.5v11l9-5.5z" />
                    </svg>
                    {d.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {extra}
        </div>
      </div>
    </Slide>
  );
}

export default function GoleadProposalPage() {
  return (
    <>
      <DeckNav />
      <main id="main" className="flex-1">
        {/* 01 封面 */}
        <Slide
          className="bg-brand-navy"
          dark
          backdrop={
            <>
              <Image
                src={`${IMG}/golead-2027-cover.jpg`}
                alt="夜晚的台北街頭，司機站在計程車旁望向台北 101"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {/* 左邊壓暗讓標題好讀，右邊保留原圖 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#061226]/85 via-[#061226]/45 to-transparent" aria-hidden="true" />
            </>
          }
        >
          <div>
            {/* 透明底 Logo；深色背景用白字版（由 logo.png 把灰字改白，色塊不變） */}
            <Image src={`${IMG}/logo-light.png`} alt={SITE.name} width={1225} height={746} className="block h-16 w-auto md:h-20" />
            <p className="mt-8 text-smfont-semibold tracking-[0.3em] text-brand-yellow md:text-base">{PROPOSAL.byline}</p>
            {/* 兩行：客戶名稱放大，第二行企劃書名稱（Rice 2026-11-17 指定的排版） */}
            <h1 className="mt-5 font-bold text-white">
              <span className="block text-5xl leading-tight tracking-[0.12em] md:text-7xl">{PROPOSAL.client}</span>
              <span className="mt-3 block text-2xl leading-snug tracking-wide md:mt-4 md:text-[2.5rem] md:whitespace-nowrap">
                {PROPOSAL.subtitle}
              </span>
            </h1>
            <div className="mt-6 flex w-28 gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-brand-sky" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-yellow" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-green" />
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium tracking-widest text-white md:text-xl">
              {PROPOSAL.axes.map((axis, i) => (
                <li key={axis} className="flex items-center gap-3">
                  {i > 0 && <span className="text-brand-yellow" aria-hidden="true">×</span>}
                  {axis}
                </li>
              ))}
            </ul>
            <p className="mt-12 hidden text-sm tracking-wider text-white/60 md:block">按 → 或空白鍵換頁，按 F 全螢幕</p>
          </div>
        </Slide>

        {/* 02 計畫摘要 */}
        <Slide backdrop={<DeckDecor hero="target" variant={0} />}>
          <Heading en="Executive Summary" title="一、計畫摘要" lead={SUMMARY.intro} />
          <dl className="space-y-4">
            {SUMMARY.items.map((item, i) => (
              <div key={item.label} className={`relative grid gap-2 md:grid-cols-[11rem_1fr] md:gap-0 ${CARD}`}>
                {/* 圖示徽章半壓在卡片左緣，不佔版面 */}
                <IconBadge
                  icon={(["target", "trend"] as const)[i]}
                  tone={TONES[i + 1]}
                  size="sm"
                  className="absolute top-1/2 -left-5 z-10 hidden -translate-y-1/2 md:flex"
                />
                {/* 色塊內縮 8px、四邊圓角；上下 padding 減掉同樣的量，整列高度不變 */}
                <dt className={`m-2 flex items-center rounded-2xl px-6 py-3 text-xl font-bold tracking-widest text-brand-navy ${TRIO[i + 1]}`}>
                  {item.label}
                </dt>
                <dd className="flex items-center px-6 pb-4 text-lg leading-relaxed text-ink md:py-5 md:text-xl">{item.text}</dd>
              </div>
            ))}
          </dl>
        </Slide>

        {/* 03 核心定位 */}
        <Slide backdrop={<DeckDecor hero="shield" variant={1} />}>
          <Heading en="Brand & Account Positioning" title="二、核心定位與解決痛點" />
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-[0_14px_32px_-14px_rgba(31,58,110,0.55)] md:p-10">
            <span className="absolute -right-12 -bottom-20 h-56 w-56 rounded-full bg-white/5" aria-hidden="true" />
            <span className="absolute -top-10 right-24 hidden h-28 w-28 rounded-full bg-brand-sky/15 md:block" aria-hidden="true" />
            <IconBadge icon="shield" tone="yellow" size="lg" className="absolute top-8 right-10 hidden md:flex" />
            <p className="text-sm font-semibold tracking-widest text-brand-yellow">品牌核心定調</p>
            <h3 className="mt-2 text-3xl font-bold tracking-wide md:text-4xl">{POSITIONING.core.title}</h3>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/90 md:text-xl">{POSITIONING.core.text}</p>
          </div>
          <p className="mt-8 text-sm font-semibold tracking-widest text-muted">帳號人設風格</p>
          <ul className="mt-3 grid gap-4 md:grid-cols-3">
            {POSITIONING.personas.map((p, i) => (
              <li key={p.name} className={`relative overflow-hidden ${CARD}`}>
                <CardAccent icon={(["doc", "heart", "bolt"] as const)[i]} tone={TONES[i]} />
                <div className="p-6">
                  <h3 className="text-2xl font-bold tracking-widest text-brand-navy md:text-3xl">{p.name}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 04 受眾痛點與解決方案 */}
        <Slide backdrop={<DeckDecor hero="wheel" variant={2} />}>
          <Heading
            en="Target Audience"
            title="目標受眾與痛點解決方案"
            lead="從三個司機痛點，重塑一個可信任的職涯品牌"
          />
          <ul className="grid gap-4 lg:grid-cols-3">
            {PAIN_POINTS.map((p, i) => (
              <li key={p.no} className={`relative flex flex-col overflow-hidden ${CARD}`}>
                <CardAccent icon={(["coin", "shield", "team"] as const)[i]} tone={TONES[i]} />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-bold tracking-widest text-brand-orange-ink">
                    <span className={TAG}>痛點 {p.no}</span>
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{p.name}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{p.pain}</p>
                  <div className="mt-5 rounded-2xl bg-brand-sky/15 p-4">
                    <p className="text-xs font-semibold tracking-widest text-brand-blue-ink">宏力移動獨家解決方案</p>
                    <p className="mt-1 text-lg leading-relaxed font-medium text-brand-navy">{p.solution}</p>
                  </div>
                  <SoftBar className="mt-4">
                    <p className="text-xs font-semibold tracking-widest text-muted">整合傳播訴求</p>
                    <p className="mt-1 leading-relaxed text-ink">{p.appeal}</p>
                  </SoftBar>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 05 內容矩陣總覽 */}
        <Slide className="bg-brand-navy" dark backdrop={<DeckDecor hero="play" dark />}>
          <Heading en="Content Matrix" title="三、影音內容矩陣規劃" lead={MATRIX_INTRO.text} light />
          <div className="grid items-center gap-8 lg:grid-cols-[4fr_8fr] lg:gap-12">
            <div className="flex items-end gap-3 lg:justify-center">
              <span className="text-[7rem] leading-none font-black text-brand-yellow md:text-[10rem]">8</span>
              <span className="pb-3 text-2xl font-bold tracking-widest text-white md:pb-6 md:text-3xl">支／月</span>
            </div>
            <ol className="space-y-3">
              {PILLARS.map((p) => (
                <li key={p.no} className="rounded-3xl bg-white/10 px-6 py-4 ring-1 ring-white/15">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-xl font-bold tracking-wide text-white md:text-2xl">
                      {/* 圓形編號徽章（高度跟文字行高一樣 32px，不增加整列高度） */}
                      <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-sky/20 align-middle text-sm text-brand-sky">
                        {p.no}
                      </span>
                      {p.title}
                    </p>
                    <p className="text-xl font-black whitespace-nowrap text-brand-yellow md:text-2xl">{p.count}</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/15" aria-hidden="true">
                    <div className="h-full rounded-full bg-brand-sky" style={{ width: `${(p.share / 8) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">{MATRIX_INTRO.note}</p>
        </Slide>

        {/* 06–09 內容矩陣四類 */}
        {/* 第 6、7、9 頁的圖是 ComfyUI 產的情境示意圖（非案例照片）；第 8 頁是活動實拍 */}
        <PillarSlide
          pillar={PILLARS[0]}
          image={{ src: `${IMG}/golead-2027-story.jpg`, alt: "情境示意圖：黃昏時握著方向盤的司機", wide: true }}
          extra={<WarmKitchenRef />}
        />
        <PillarSlide
          pillar={PILLARS[1]}
          image={{ src: `${IMG}/golead-2027-dashcam.jpg`, alt: "情境示意圖：從車內看出去的路口與行車紀錄器", wide: true }}
        />
        <PillarSlide
          pillar={PILLARS[2]}
          image={{ src: `${IMG}/golead-2027-partners.jpg`, alt: "宏力移動與叫車平台、合作夥伴的室內大合照" }}
        />
        <PillarSlide
          pillar={PILLARS[3]}
          image={{ src: `${IMG}/golead-2027-recruit.jpg`, alt: "情境示意圖：兩位夥伴靠在黃色車旁聊天", wide: true }}
        />

        {/* 10 實體活動與地推 */}
        <Slide backdrop={<DeckDecor hero="pin" variant={0} />}>
          <Heading en="Offline & O2O Integration" title="四、實體活動與地推延伸" lead={OFFLINE.intro} />
          <ol className="grid gap-4 lg:grid-cols-3">
            {OFFLINE.fronts.map((front, i) => (
              <li key={front.title} className={`relative overflow-hidden p-6 ${CARD}`}>
                <CardAccent icon={(["store", "pin", "mic"] as const)[i]} tone={TONES[i]} />
                <p className="text-sm font-bold tracking-widest text-brand-orange-ink">
                  <span className={TAG}>戰線 {i + 1}</span>
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{front.title}</h3>
                <p className="mt-2 inline-block rounded-full bg-brand-sky/25 px-3 py-1 text-sm font-medium text-brand-navy">{front.note}</p>
                <ul className="mt-5 space-y-4">
                  {front.items.map((item) => (
                    <li key={item.title}>
                      <SoftBar>
                        <p className="text-lg font-bold text-brand-navy">{item.title}</p>
                        <p className="mt-1 leading-relaxed text-ink">{item.text}</p>
                      </SoftBar>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Slide>

        {/* 11 成效漏斗 */}
        <Slide backdrop={<DeckDecor hero="funnel" variant={1} />}>
          <Heading en="KPIs & Metrics" title="五、預期效益與追蹤指標" lead="從品牌聲量，到可衡量的招募轉換" />
          <ol className="space-y-4">
            {FUNNEL.stages.map((stage, i) => (
              <li
                key={stage.name}
                // 一層比一層窄，排成漏斗；手機版維持同寬
                className={`relative mx-auto ${CARD} ${["", "lg:w-[86%]", "lg:w-[72%]"][i]}`}
              >
                <IconBadge
                  icon={(["eye", "userplus", "flag"] as const)[i]}
                  tone={TONES[i]}
                  size="sm"
                  className="absolute top-1/2 -left-5 z-10 hidden -translate-y-1/2 md:flex"
                />
                <div className="grid md:grid-cols-[15rem_1fr]">
                  {/* 色塊內縮 8px、圓角；padding 減掉同樣的量，整列高度不變 */}
                  <div className={`m-2 rounded-2xl px-6 py-4 ${TRIO[i]}`}>
                    <p className="text-2xl font-bold tracking-widest text-brand-navy">{stage.name}</p>
                    <p className="text-sm font-semibold tracking-wider text-brand-navy/75">{stage.en}</p>
                  </div>
                  <p className="flex items-center px-6 py-4 text-lg leading-relaxed text-ink md:text-xl">{stage.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-7 w-fit rounded-full bg-white/70 px-6 py-1 text-center text-base text-muted md:text-lg">{FUNNEL.note}</p>
        </Slide>

        {/* 12 追蹤指標明細 */}
        <Slide backdrop={<DeckDecor hero="chart" variant={2} />}>
          <Heading en="KPIs & Metrics" title="追蹤指標與評估目標" />
          <ul className="grid gap-4 lg:grid-cols-3">
            {KPIS.map((k, i) => (
              <li key={k.stage} className={`relative flex flex-col overflow-hidden ${CARD}`}>
                <CardAccent icon={(["eye", "userplus", "trend"] as const)[i]} tone={TONES[i]} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{k.stage}</h3>
                  <p className="text-sm font-semibold tracking-wider text-brand-blue-ink">{k.en}</p>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-muted">追蹤指標 (KPIs)</p>
                  <ul className="mt-2 space-y-1.5 text-lg text-ink">
                    {k.metrics.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <SoftBar>
                      <p className="text-xs font-semibold tracking-widest text-muted">評估目標與效益描述</p>
                      <p className="mt-1 leading-relaxed text-ink">{k.goal}</p>
                    </SoftBar>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 13 成長願景 */}
        <Slide backdrop={<DeckDecor variant={0} />}>
          <div className="grid items-center gap-10 lg:grid-cols-[8fr_4fr]">
            <div>
              <Heading
                en="Growth Vision"
                // 逗號後才換行，不把詞切開
                title={GROWTH.title.split(/(?<=，)/).map((part) => (
                  <span key={part} className="inline-block">
                    {part}
                  </span>
                ))}
              />
              <ol className="grid gap-4 sm:grid-cols-2">
                {GROWTH.steps.map((step, i) => (
                  <li key={step.no} className={`relative overflow-hidden p-6 ${CARD}`}>
                    <CardAccent icon={(["flag", "heart", "car", "rocket"] as const)[i]} tone={TONES[i % 3]} />
                    {/* 圓形編號徽章跟名稱排同一行（比原本「編號一行、名稱一行」矮） */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold tracking-wider text-brand-orange-ink">
                        {step.no}
                      </span>
                      <h3 className="text-2xl font-bold tracking-wider text-brand-navy">{step.name}</h3>
                    </div>
                    <p className="mt-2 text-lg leading-relaxed text-ink">{step.text}</p>
                  </li>
                ))}
              </ol>
              <SoftBar className="mt-8 text-lg leading-relaxed font-medium text-brand-navy md:text-xl">{GROWTH.closing}</SoftBar>
            </div>
            <div className="relative hidden aspect-[2/3] overflow-hidden rounded-[2rem] shadow-[0_10px_28px_-12px_rgba(31,58,110,0.35)] ring-4 ring-white lg:block">
              <Image
                src={`${IMG}/golead-2027-101.jpg`}
                alt="宏力移動領航者活動戶外大合照，背景為台北 101"
                fill
                loading="eager"
                sizes="380px"
                className="object-cover"
              />
            </div>
          </div>
        </Slide>

        {/* 14 結語 */}
        <Slide className="bg-brand-navy" dark backdrop={<DeckDecor hero="team" dark />}>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-yellow uppercase">Thank You</p>
            <h2 className="mt-4 text-5xl font-bold tracking-[0.2em] text-white md:text-7xl">{ENDING.title}</h2>
            <div className="mx-auto mt-6 flex w-28 gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-brand-sky" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-yellow" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-green" />
            </div>
            <ul className="mt-12 grid gap-4 text-left md:grid-cols-3">
              {ENDING.recap.map((r, i) => (
                <li key={r.name} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
                  <IconBadge icon={(["wheel", "play", "trend"] as const)[i]} tone="glass" className="mb-3" />
                  <h3 className="text-xl font-bold tracking-wide text-brand-yellow md:text-2xl">{r.name}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-white/90">{r.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xl leading-relaxed font-medium text-white md:text-2xl">{ENDING.closing}</p>
            <p className="mt-10 text-sm tracking-widest text-white/70 md:text-base">{ENDING.byline}</p>
          </div>
        </Slide>
      </main>
    </>
  );
}
