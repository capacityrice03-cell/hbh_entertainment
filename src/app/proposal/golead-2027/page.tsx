import type { Metadata } from "next";
import Image from "next/image";
import DeckNav from "@/components/ui/DeckNav";
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

// 提案簡報頁：只給拿到網址的人看，不放進選單和 sitemap，也不讓搜尋引擎收錄
export const metadata: Metadata = {
  title: `${PROPOSAL.title}｜${SITE.name}`,
  description: PROPOSAL.byline,
  alternates: { canonical: PROPOSAL.path },
  robots: { index: false, follow: false },
  ...shareMeta(PROPOSAL.title, PROPOSAL.path),
};

const IMG = "/images/proposal";
// 專業、溫暖、科技／三個痛點／漏斗三層共用的三個品牌色
const TRIO = ["bg-brand-sky", "bg-brand-yellow", "bg-brand-green"];

/** 一頁簡報：至少一個螢幕高，內容垂直置中 */
function Slide({
  children,
  className = "bg-white",
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
function PillarSlide({ pillar, image, className }: { pillar: Pillar; image?: { src: string; alt: string }; className?: string }) {
  return (
    <Slide className={className}>
      <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue-ink uppercase">Content Matrix {pillar.no}</p>
          <p className="mt-4 inline-block rounded-full bg-brand-navy px-4 py-1.5 text-sm font-medium tracking-widest text-white">
            {pillar.tag}
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-bold tracking-wide text-brand-navy md:text-[2.75rem]">{pillar.title}</h2>
          <p className="mt-4 text-3xl font-black tracking-tight text-brand-orange md:text-4xl">{pillar.count}</p>
          <div className="mt-6 border-l-4 border-brand-yellow pl-4">
            <p className="text-sm font-semibold tracking-widest text-muted">訴求</p>
            <p className="mt-1 text-lg leading-relaxed text-ink md:text-xl">{pillar.appeal}</p>
          </div>
          {image && (
            <div className="relative mt-8 hidden aspect-[3/2] overflow-hidden rounded-3xl shadow-sm lg:block">
              <Image src={image.src} alt={image.alt} fill loading="eager" sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest text-muted">企劃方向</p>
          <ul className="mt-3 space-y-4">
            {pillar.directions.map((d) => (
              <li key={d.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="text-xl font-bold text-brand-navy md:text-2xl">{d.title}</h3>
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
                alt="宏力移動領航者活動戶外大合照，背景為台北 101"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/30" aria-hidden="true" />
            </>
          }
        >
          <div>
            <span className="inline-flex rounded-2xl bg-white px-4 py-2">
              <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-10 w-auto md:h-12" />
            </span>
            <p className="mt-10 text-sm font-semibold tracking-[0.3em] text-brand-yellow md:text-base">{PROPOSAL.byline}</p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-bold tracking-wide text-white md:text-6xl md:leading-[1.2]">
              {PROPOSAL.client} 2027
              <br />
              年度影音與品牌
              <br />
              整合行銷企劃書
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
        <Slide>
          <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr]">
            <div>
              <Heading en="Executive Summary" title="一、計畫摘要" lead={SUMMARY.intro} />
              <dl className="space-y-5">
                {SUMMARY.items.map((item) => (
                  <div key={item.label} className="grid gap-2 md:grid-cols-[7rem_1fr] md:gap-5">
                    <dt>
                      <span className="inline-block rounded-full bg-brand-sky/25 px-4 py-1 text-sm font-bold tracking-widest text-brand-navy">
                        {item.label}
                      </span>
                    </dt>
                    <dd className="text-lg leading-relaxed text-ink">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-sm lg:aspect-[4/5]">
              <Image
                src={`${IMG}/golead-2027-partners.jpg`}
                alt="宏力移動與叫車平台、合作夥伴的室內大合照"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Slide>

        {/* 03 核心定位 */}
        <Slide className="bg-brand-cream/40">
          <Heading en="Brand & Account Positioning" title="二、核心定位與解決痛點" />
          <div className="rounded-3xl bg-brand-navy p-7 text-white md:p-10">
            <p className="text-sm font-semibold tracking-widest text-brand-yellow">品牌核心定調</p>
            <h3 className="mt-2 text-3xl font-bold tracking-wide md:text-4xl">{POSITIONING.core.title}</h3>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/90 md:text-xl">{POSITIONING.core.text}</p>
          </div>
          <p className="mt-8 text-sm font-semibold tracking-widest text-muted">帳號人設風格</p>
          <ul className="mt-3 grid gap-4 md:grid-cols-3">
            {POSITIONING.personas.map((p, i) => (
              <li key={p.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                <span className={`block h-2 ${TRIO[i]}`} aria-hidden="true" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold tracking-widest text-brand-navy md:text-3xl">{p.name}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 04 受眾痛點與解決方案 */}
        <Slide className="bg-slate-50">
          <Heading
            en="Target Audience"
            title="目標受眾與痛點解決方案"
            lead="從三個司機痛點，重塑一個可信任的職涯品牌"
          />
          <ul className="grid gap-4 lg:grid-cols-3">
            {PAIN_POINTS.map((p, i) => (
              <li key={p.no} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                <span className={`block h-2 ${TRIO[i]}`} aria-hidden="true" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-bold tracking-widest text-brand-orange-ink">痛點 {p.no}</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{p.name}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink">{p.pain}</p>
                  <div className="mt-5 rounded-2xl bg-brand-sky/15 p-4">
                    <p className="text-xs font-semibold tracking-widest text-brand-blue-ink">宏力移動獨家解決方案</p>
                    <p className="mt-1 text-lg leading-relaxed font-medium text-brand-navy">{p.solution}</p>
                  </div>
                  <div className="mt-4 border-l-4 border-brand-yellow pl-4">
                    <p className="text-xs font-semibold tracking-widest text-muted">整合傳播訴求</p>
                    <p className="mt-1 leading-relaxed text-ink">{p.appeal}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 05 內容矩陣總覽 */}
        <Slide className="bg-brand-navy" dark>
          <Heading en="Content Matrix" title="三、影音內容矩陣規劃" lead={MATRIX_INTRO.text} light />
          <div className="grid items-center gap-8 lg:grid-cols-[4fr_8fr] lg:gap-12">
            <div className="flex items-end gap-3 lg:justify-center">
              <span className="text-[7rem] leading-none font-black text-brand-yellow md:text-[10rem]">8</span>
              <span className="pb-3 text-2xl font-bold tracking-widest text-white md:pb-6 md:text-3xl">支／月</span>
            </div>
            <ol className="space-y-3">
              {PILLARS.map((p) => (
                <li key={p.no} className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/15">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-xl font-bold tracking-wide text-white md:text-2xl">
                      <span className="mr-3 text-brand-sky">{p.no}</span>
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
        <PillarSlide pillar={PILLARS[0]} />
        <PillarSlide pillar={PILLARS[1]} className="bg-brand-cream/40" />
        <PillarSlide
          pillar={PILLARS[2]}
          className="bg-slate-50"
          image={{ src: `${IMG}/golead-2027-talk.jpg`, alt: "宏力移動領航者活動現場致詞" }}
        />
        <PillarSlide pillar={PILLARS[3]} />

        {/* 10 實體活動與地推 */}
        <Slide className="bg-brand-cream/40">
          <Heading en="Offline & O2O Integration" title="四、實體活動與地推延伸" lead={OFFLINE.intro} />
          <ol className="grid gap-4 lg:grid-cols-3">
            {OFFLINE.fronts.map((front, i) => (
              <li key={front.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <p className="text-sm font-bold tracking-widest text-brand-orange-ink">戰線 {i + 1}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{front.title}</h3>
                <p className="mt-2 inline-block rounded-full bg-brand-sky/25 px-3 py-1 text-sm font-medium text-brand-navy">{front.note}</p>
                <ul className="mt-5 space-y-4">
                  {front.items.map((item) => (
                    <li key={item.title} className="border-l-4 border-brand-yellow pl-4">
                      <p className="text-lg font-bold text-brand-navy">{item.title}</p>
                      <p className="mt-1 leading-relaxed text-ink">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Slide>

        {/* 11 成效漏斗 */}
        <Slide>
          <Heading en="KPIs & Metrics" title="五、預期效益與追蹤指標" lead="從品牌聲量，到可衡量的招募轉換" />
          <ol className="space-y-4">
            {FUNNEL.stages.map((stage, i) => (
              <li
                key={stage.name}
                // 一層比一層窄，排成漏斗；手機版維持同寬
                className={`mx-auto overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 ${["", "lg:w-[86%]", "lg:w-[72%]"][i]}`}
              >
                <div className="grid md:grid-cols-[15rem_1fr]">
                  <div className={`px-6 py-4 md:py-6 ${TRIO[i]}`}>
                    <p className="text-2xl font-bold tracking-widest text-brand-navy">{stage.name}</p>
                    <p className="text-sm font-semibold tracking-wider text-brand-navy/75">{stage.en}</p>
                  </div>
                  <p className="flex items-center px-6 py-4 text-lg leading-relaxed text-ink md:text-xl">{stage.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-base text-muted md:text-lg">{FUNNEL.note}</p>
        </Slide>

        {/* 12 追蹤指標明細 */}
        <Slide className="bg-slate-50">
          <Heading en="KPIs & Metrics" title="追蹤指標與評估目標" />
          <ul className="grid gap-4 lg:grid-cols-3">
            {KPIS.map((k, i) => (
              <li key={k.stage} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
                <span className={`block h-2 ${TRIO[i]}`} aria-hidden="true" />
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
                    <div className="border-l-4 border-brand-yellow pl-4">
                      <p className="text-xs font-semibold tracking-widest text-muted">評估目標與效益描述</p>
                      <p className="mt-1 leading-relaxed text-ink">{k.goal}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Slide>

        {/* 13 成長願景 */}
        <Slide>
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
                {GROWTH.steps.map((step) => (
                  <li key={step.no} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <p className="text-sm font-bold tracking-widest text-brand-orange-ink">{step.no}</p>
                    <h3 className="mt-1 text-2xl font-bold tracking-wider text-brand-navy">{step.name}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-ink">{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-l-4 border-brand-yellow pl-4 text-lg leading-relaxed font-medium text-brand-navy md:text-xl">
                {GROWTH.closing}
              </p>
            </div>
            <div className="relative hidden aspect-[2/3] overflow-hidden rounded-3xl shadow-sm lg:block">
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
        <Slide className="bg-brand-navy" dark>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-yellow uppercase">Thank You</p>
            <h2 className="mt-4 text-5xl font-bold tracking-[0.2em] text-white md:text-7xl">{ENDING.title}</h2>
            <div className="mx-auto mt-6 flex w-28 gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-brand-sky" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-yellow" />
              <span className="h-1.5 flex-1 rounded-full bg-brand-green" />
            </div>
            <ul className="mt-12 grid gap-4 text-left md:grid-cols-3">
              {ENDING.recap.map((r) => (
                <li key={r.name} className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
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
