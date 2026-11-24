import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Contact from "@/components/sections/Contact";
import {
  BRAND_PLANNING,
  CASE,
  DIRECTION_SLIDES,
  LOGO_IMAGES,
  MENU_DIGITAL,
  MENU_PAPER,
  PLAN,
  STORE_IMAGES,
  STORE_PHOTOS,
} from "@/constants/serviceBrandPlanning";
import { SITE, SITE_URL, breadcrumbLd, shareMeta } from "@/constants/site";

const PATH = "/services/brand-planning/";

export const metadata: Metadata = {
  title: `${BRAND_PLANNING.title}｜食包食粽案例｜${SITE.name}`,
  description: BRAND_PLANNING.description,
  alternates: { canonical: PATH },
  ...shareMeta(`${BRAND_PLANNING.title}｜${SITE.name}`, PATH),
};

// 結構化資料：告訴 Google 這是好不好娛樂提供的一項服務
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: BRAND_PLANNING.title,
  serviceType: BRAND_PLANNING.title,
  description: BRAND_PLANNING.description,
  url: `${SITE_URL}${PATH}`,
  areaServed: { "@type": "Country", name: "Taiwan" },
  provider: { "@type": "Organization", name: SITE.name, url: `${SITE_URL}/` },
};

type Img = { src: string; w: number; h: number; alt: string };

function Pic({ img, className = "", sizes = "(min-width: 1024px) 50vw, 100vw" }: { img: Img; className?: string; sizes?: string }) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      sizes={sizes}
      className={`h-auto w-full rounded-3xl bg-white shadow-sm ring-1 ring-black/5 ${className}`}
    />
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-brand-sky/25 px-4 py-1 text-sm font-medium tracking-wider text-brand-navy">
      {children}
    </span>
  );
}

function StepHead({ no, title, lead }: { no: string; title: string; lead?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-lg font-black text-white shadow-sm">
        {no}
      </span>
      <h3 className="mt-3 text-2xl font-bold tracking-wide text-brand-navy md:text-3xl">{title}</h3>
      {lead && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}


// 四個規格膠囊前面的線稿圖示（純裝飾）：A4 紙本、電子菜單、店面吧檯、電子看板
function SpecIcon({ kind }: { kind: number }) {
  const paths = [
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>,
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M10 18h4" />
    </>,
    <>
      <path d="M3 9l2-5h14l2 5c0 1.5-1.2 2.5-2.5 2.5S16 10.5 16 9c0 1.5-1.2 2.5-2 2.5S12 10.5 12 9c0 1.5-1 2.5-2 2.5S8 10.5 8 9c0 1.5-1.2 2.5-2.5 2.5S3 10.5 3 9z" />
      <path d="M5 12v8h14v-8M4 20h16M9 16h6" />
    </>,
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4M8 20h8" />
    </>,
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="#B8322A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}

export default function BrandPlanningPage() {
  const landscape = STORE_PHOTOS.filter((p) => p.w > p.h);
  // 01 放左欄；02 對應「(一) 應用設計」、03 對應「(二) 環境風格」（Rice 2026-11-25 確認）
  const planBase = PLAN.cards[0];
  const appCards = [
    { card: PLAN.cards[1], group: PLAN.app[0] },
    { card: PLAN.cards[2], group: PLAN.app[1] },
  ];
  const [dir, logo, store, menu, photos] = CASE.steps;

  return (
    <>
      <JsonLd data={breadcrumbLd(BRAND_PLANNING.title, PATH)} />
      <JsonLd data={serviceLd} />
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
            <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
          </Link>
          <Link href="/#services" className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue">
            ← 回服務項目
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* 開頭介紹 */}
        <section className="bg-brand-cream/40 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue uppercase">{BRAND_PLANNING.en}</p>
              <h1 className="mt-4 text-3xl font-bold tracking-widest text-brand-navy md:text-5xl">
                {/* 畫面上分兩行（Rice 2026-11-25）；搜尋標題、麵包屑仍用 title */}
                {BRAND_PLANNING.heading.map((line, i) => (
                  <span key={line} className={i === 0 ? "block" : "mt-2 block"}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg leading-relaxed whitespace-pre-line text-ink md:text-xl">{BRAND_PLANNING.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-brand-navy px-6 py-2.5 font-medium tracking-wider text-white transition-colors hover:bg-brand-blue"
                >
                  洽詢合作
                </a>
                <a
                  href="#case"
                  className="rounded-full border border-brand-navy/30 px-6 py-2.5 font-medium tracking-wider text-brand-navy transition-colors hover:bg-white"
                >
                  看相關案例
                </a>
              </div>
            </div>
            <Image
              src={STORE_PHOTOS[2].src}
              alt={STORE_PHOTOS[2].alt}
              width={STORE_PHOTOS[2].w}
              height={STORE_PHOTOS[2].h}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="h-auto w-full rounded-3xl shadow-md ring-1 ring-black/5"
            />
          </div>
        </section>

        {/* 品牌形象方案（服務內容） */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue-ink uppercase">{PLAN.en}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-wide text-brand-navy md:text-[40px] md:leading-tight">{PLAN.title}</h2>
            <span className="mt-4 block h-1 w-12 rounded-full bg-[#D84439]" aria-hidden="true" />

            {/* 01、02、03 由上而下一整排，寬度相等，配色統一用奶油底＋白卡＋紅數字 */}
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-[#FFF3E3] p-5 md:p-8 lg:rounded-[2rem] lg:p-10">
              <span
                className="pointer-events-none absolute -right-[110px] -bottom-[110px] h-[220px] w-[220px] rounded-full border-2 border-[#FCA95E]/40"
                aria-hidden="true"
              />
              {/* 01 基本設計系統開發＋基本系統開發（時間軸） */}
              <div className="relative flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(96,54,48,0.25)] md:flex-row md:gap-6">
                <span className="text-[72px] leading-none font-black text-[#D84439] md:w-28 md:shrink-0 lg:text-[80px]">
                  {planBase.no}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="mt-1 text-2xl font-bold text-brand-navy lg:text-[28px]">{planBase.title}</h3>
                  <p className="mt-3 leading-[1.8] text-ink">{planBase.text}</p>

                  <div className="mt-6 border-t border-brand-navy/10 pt-6">
                    <h4 className="text-sm font-bold tracking-[0.08em] text-[#B8322A]">{PLAN.systemTitle}</h4>
                    <ol className="relative mt-5">
                      <span className="absolute top-2 bottom-2 left-[6px] w-px bg-[#D84439]/25" aria-hidden="true" />
                      {PLAN.system.map((s, i) => (
                        <li key={s.item} className="relative pb-6 pl-9 last:pb-0">
                          <span
                            className={`absolute top-[7px] left-0 h-[14px] w-[14px] rounded-full ${
                              i === 0 ? "bg-[#D84439]" : "border-2 border-[#D84439] bg-white"
                            }`}
                            aria-hidden="true"
                          />
                          <p className={`font-bold text-brand-navy ${i === 0 ? "text-xl" : "text-base lg:text-[17px]"}`}>{s.item}</p>
                          {s.text && <p className="mt-1 text-[15px] leading-relaxed text-ink">{s.text}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* 品牌應用系統設計項目＝02 菜單設計（一）、03 店面形象視覺規劃（二） */}
              <h3 className="relative mt-8 text-lg font-bold text-[#603630] lg:text-xl">{PLAN.appTitle}</h3>
              <ul className="relative mt-5 flex flex-col gap-4">
                  {appCards.map(({ card, group }, gi) => (
                    <li
                      key={card.no}
                      className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(96,54,48,0.25)] md:flex-row md:gap-6"
                    >
                      <span className="text-[72px] leading-none font-black text-[#D84439] md:w-28 md:shrink-0 lg:text-[80px]">
                        {card.no}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold tracking-[0.08em] text-[#B8322A]">{group.group}</p>
                        <h4 className="mt-1 text-2xl font-bold text-brand-navy lg:text-[28px]">{card.title}</h4>
                        <p className="mt-3 leading-[1.8] text-ink">{card.text}</p>
                        {"note" in group && (
                          <p className="mt-3">
                            <span className="inline-block rounded-full border border-dashed border-[#603630]/40 px-3 py-0.5 text-sm font-medium text-[#603630]">
                              {group.note}
                            </span>
                          </p>
                        )}
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {group.items.map((it, ii) => (
                            <li
                              key={it}
                              className="flex max-w-full items-center gap-2 rounded-2xl border border-brand-navy/15 bg-white px-4 py-2.5 text-sm font-medium text-ink lg:text-[15px]"
                            >
                              <SpecIcon kind={gi * 2 + ii} />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 案例：食包食粽 */}
        <section id="case" className="scroll-mt-6 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">{CASE.title}</h2>
            <ol className="mt-6 flex flex-wrap justify-center gap-2">
              {CASE.steps.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block rounded-full border border-brand-navy/20 bg-white px-4 py-1.5 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
                  >
                    {s.no} {s.title}
                  </a>
                </li>
              ))}
            </ol>

            {/* 01 品牌設計方向 */}
            <div id={dir.id} className="mt-16 scroll-mt-6">
              <StepHead no={dir.no} title={dir.title} />
              <p className="mt-4 text-center text-xl font-bold text-brand-orange-ink">{CASE.directionHead}</p>
              <p className="mt-1 text-center leading-relaxed text-ink">{CASE.directionText}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {DIRECTION_SLIDES.map((s) => (
                  <Pic key={s.src} img={{ ...s, w: 1600, h: 899 }} />
                ))}
              </div>
            </div>

            {/* 02 LOGO */}
            <div id={logo.id} className="mt-20 scroll-mt-6">
              <StepHead no={logo.no} title={logo.title} lead={logo.lead} />
              <div className="mx-auto mt-8 max-w-xl">
                <Pic img={LOGO_IMAGES.story} sizes="(min-width: 768px) 576px, 100vw" />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Pic img={LOGO_IMAGES.color} />
                <Pic img={LOGO_IMAGES.type} />
                <Pic img={LOGO_IMAGES.combo} />
                <Pic img={LOGO_IMAGES.apply} />
              </div>
            </div>

            {/* 03 店面視覺 */}
            <div id={store.id} className="mt-20 scroll-mt-6">
              <StepHead no={store.no} title={store.title} lead={store.lead} />
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {[STORE_IMAGES.mockup, STORE_IMAGES.wall].map((m) => (
                  <figure key={m.src} className="space-y-3 text-center">
                    <Pic img={m} />
                    <figcaption>
                      <Pill>{m.label}</Pill>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* 04 電子菜單／紙本菜單 */}
            <div id={menu.id} className="mt-20 scroll-mt-6">
              <StepHead no={menu.no} title={menu.title} lead={menu.lead} />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {MENU_DIGITAL.map((m) => (
                  <Pic key={m.src} img={m} />
                ))}
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {MENU_PAPER.map((m) => (
                  <figure key={m.src} className="space-y-3 text-center">
                    <Pic img={m} />
                    <figcaption>
                      <Pill>{m.label}</Pill>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* 05 實際店面照片 */}
            <div id={photos.id} className="mt-20 scroll-mt-6">
              <StepHead no={photos.no} title={photos.title} lead={photos.lead} />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {landscape.map((p, i) => (
                  <Pic key={p.src} img={p} className={i === 0 ? "md:col-span-2" : ""} sizes={i === 0 ? "(min-width: 1152px) 1120px, 100vw" : undefined} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
