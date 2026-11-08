import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { CaseCard } from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import ShortVideo from "@/components/sections/ShortVideo";
import WarmKitchen from "@/components/sections/WarmKitchen";
import PriceIcon from "@/components/ui/PriceIcon";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { CASES } from "@/constants/cases";
import {
  BRAND_VIDEO,
  BRAND_VIDEO_ITEMS,
  BRAND_VIDEO_STEPS,
  MARKET_PRICES,
  MARKET_PRICE_NOTES,
} from "@/constants/serviceBrandVideo";
import { SITE, SITE_URL, breadcrumbLd, shareMeta } from "@/constants/site";

const PATH = "/services/brand-video/";
const cases = CASES.filter((c) => c.services.includes("channel"));

export const metadata: Metadata = {
  title: `${BRAND_VIDEO.title}｜品牌短影音企劃拍攝・社群經營｜${SITE.name}`,
  description: BRAND_VIDEO.description,
  alternates: { canonical: PATH },
  ...shareMeta(`${BRAND_VIDEO.title}｜${SITE.name}`, PATH),
};

// 結構化資料：告訴 Google 這是好不好娛樂提供的一項服務
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: BRAND_VIDEO.title,
  serviceType: BRAND_VIDEO.title,
  description: BRAND_VIDEO.description,
  url: `${SITE_URL}${PATH}`,
  areaServed: { "@type": "Country", name: "Taiwan" },
  provider: { "@type": "Organization", name: SITE.name, url: `${SITE_URL}/` },
};

export default function BrandVideoPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(BRAND_VIDEO.title, PATH)} />
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
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy">
                <ServiceIcon id="channel" className="h-6 w-6" />
              </span>
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue uppercase">{BRAND_VIDEO.en}</p>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-widest text-brand-navy md:text-5xl">{BRAND_VIDEO.title}</h1>
            <p className="mt-6 text-lg leading-relaxed whitespace-pre-line text-ink md:text-xl">{BRAND_VIDEO.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-brand-navy px-6 py-2.5 font-medium tracking-wider text-white transition-colors hover:bg-brand-blue"
              >
                洽詢合作
              </a>
              <a
                href="#cases"
                className="rounded-full border border-brand-navy/30 px-6 py-2.5 font-medium tracking-wider text-brand-navy transition-colors hover:bg-white"
              >
                看相關案例
              </a>
            </div>
          </div>
        </section>

        {/* 服務內容 */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            {/* 標題畫面上不顯示，但保留給 Google 和螢幕閱讀器，讓標題層級維持 h1 → h2 → h3 */}
            <h2 className="sr-only">服務內容</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BRAND_VIDEO_ITEMS.map((item) => (
                <li key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-blue">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 服務方案與費用 */}
        <section className="bg-brand-cream/40 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-center text-xs font-semibold tracking-[0.3em] text-brand-blue uppercase">Plans &amp; Pricing</p>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">服務方案與費用</h2>
            {/* 電腦版是表格；手機版每一列變成一張卡片，欄位名稱顯示在內容上方（data-label） */}
            <table className="mt-10 w-full border-separate border-spacing-0 text-left md:overflow-hidden md:rounded-3xl md:bg-white md:shadow-sm md:ring-1 md:ring-black/5">
              <thead className="hidden bg-brand-navy text-white md:table-header-group">
                <tr>
                  {["方案", "交付內容", "週期", "價格"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-4 text-sm font-medium tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MARKET_PRICES.map((p) => (
                  <tr
                    key={p.plan}
                    data-icon-trigger
                    className="mb-4 block rounded-3xl bg-white p-6 shadow-sm md:mb-0 ring-1 ring-black/5 md:table-row md:rounded-none md:p-0 md:shadow-none md:ring-0 md:[&:not(:last-child)>*]:border-b md:[&>*]:border-black/5"
                  >
                    <th scope="row" className="block md:table-cell md:px-6 md:py-6 md:align-middle">
                      <span className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/25 text-brand-navy">
                          <PriceIcon name={p.icon} />
                        </span>
                        <span className="text-lg font-bold tracking-wider whitespace-nowrap text-brand-navy">{p.plan}</span>
                      </span>
                    </th>
                    <td
                      data-label="交付內容"
                      className="mt-4 block text-ink before:mb-1 before:block before:text-xs before:text-muted before:content-[attr(data-label)] md:mt-0 md:table-cell md:px-6 md:py-6 md:align-middle md:before:hidden"
                    >
                      <p className="leading-relaxed">{p.deliverable}</p>
                      {p.caseLink && (
                        <a
                          href={p.caseLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 px-3 py-1 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                        >
                          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                            <path d="M6 4.5v11l9-5.5z" />
                          </svg>
                          {p.caseLink.label}
                        </a>
                      )}
                    </td>
                    <td
                      data-label="週期"
                      // 週期留空時：電腦版保留空白格子，手機版整個不顯示（避免只剩「週期」兩個字）
                      className={`${p.period ? "block" : "hidden"} mt-4 text-sm text-ink before:mb-1 before:block before:text-xs before:text-muted before:content-[attr(data-label)] md:mt-0 md:table-cell md:px-6 md:py-6 md:align-middle md:before:hidden`}
                    >
                      {p.period}
                    </td>
                    <td
                      data-label="價格"
                      className="mt-4 block whitespace-nowrap before:mb-1 before:block before:text-xs before:text-muted before:content-[attr(data-label)] md:mt-0 md:table-cell md:px-6 md:py-6 md:align-middle md:before:hidden"
                    >
                      <span className="text-sm text-muted">約 </span>
                      <span className="text-3xl font-black tracking-tight text-brand-orange">{p.amount}</span>
                      <span className="text-sm text-muted"> 元{p.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-8 space-y-1 text-center text-sm text-muted">
              {MARKET_PRICE_NOTES.map((note) => (
                <li key={note}>※ {note}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 合作流程 */}
        <section className="bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">合作流程</h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {BRAND_VIDEO_STEPS.map((step, i) => (
                <li key={step.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <p className="text-sm font-bold text-brand-orange">STEP {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-brand-navy">{step.title}</h3>
                  {step.text && <p className="mt-2 text-sm leading-relaxed text-ink">{step.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 短影音成效（與首頁同一個區塊） */}
        <ShortVideo />

        {/* 相關案例 */}
        <section id="cases" className="scroll-mt-6 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">
              {BRAND_VIDEO.title}案例
            </h2>
            <div className="mt-10 space-y-10">
              {cases.map((c, i) =>
                c.feature === "warm-kitchen" ? (
                  <WarmKitchen key={c.id} />
                ) : (
                  <CaseCard key={c.id} item={c} reverse={i % 2 === 1} />
                ),
              )}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
