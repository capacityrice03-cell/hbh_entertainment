import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { CaseCard } from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import ShortVideo from "@/components/sections/ShortVideo";
import WarmKitchen from "@/components/sections/WarmKitchen";
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
  description: BRAND_VIDEO.intro,
  alternates: { canonical: PATH },
  ...shareMeta(`${BRAND_VIDEO.title}｜${SITE.name}`, PATH),
};

// 結構化資料：告訴 Google 這是好不好娛樂提供的一項服務
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: BRAND_VIDEO.title,
  serviceType: BRAND_VIDEO.title,
  description: BRAND_VIDEO.intro,
  url: `${SITE_URL}${PATH}`,
  areaServed: { "@type": "Country", name: "Taiwan" },
  provider: { "@type": "Organization", name: SITE.name, url: `${SITE_URL}/` },
};

/** 市場行情卡片的圖示 */
function PriceIcon({ name }: { name: (typeof MARKET_PRICES)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-7 w-7",
    "aria-hidden": true,
  };
  if (name === "camera")
    return (
      <svg {...common}>
        <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
        <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
      </svg>
    );
  if (name === "calendar")
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2M11 17.5h2" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5" />
    </svg>
  );
}

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
            <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">{BRAND_VIDEO.intro}</p>
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
            <h2 className="text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">服務內容</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BRAND_VIDEO_ITEMS.map((item) => (
                <li key={item.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-blue">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 市場行情參考 */}
        <section className="bg-brand-cream/40 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-center text-xs font-semibold tracking-[0.3em] text-brand-blue uppercase">Market Price</p>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-wide text-brand-navy md:text-4xl">市場行情參考</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {MARKET_PRICES.map((p, i) => (
                <li
                  key={p.type}
                  className={`relative overflow-hidden rounded-3xl p-7 text-center shadow-sm ring-1 md:p-8 ${
                    i === 1 ? "bg-brand-navy text-white ring-brand-navy md:-my-3" : "bg-white text-brand-navy ring-black/5"
                  }`}
                >
                  {/* 右上角的裝飾圓 */}
                  <span
                    aria-hidden="true"
                    className={`absolute -top-10 -right-10 h-28 w-28 rounded-full ${i === 1 ? "bg-white/10" : "bg-brand-sky/20"}`}
                  />
                  <span
                    className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
                      i === 1 ? "bg-brand-yellow text-brand-navy" : "bg-brand-sky/25 text-brand-navy"
                    }`}
                  >
                    <PriceIcon name={p.icon} />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold tracking-wider">{p.type}</h3>
                  <p className={`relative mt-4 text-sm tracking-wider ${i === 1 ? "text-white/75" : "text-muted"}`}>{p.detail}</p>
                  <p className="relative mt-1">
                    <span className={`text-base ${i === 1 ? "text-white/75" : "text-muted"}`}>約 </span>
                    <span className={`text-5xl font-black tracking-tight ${i === 1 ? "text-brand-yellow" : "text-brand-orange"}`}>
                      {p.amount}
                    </span>
                    <span className={`text-base ${i === 1 ? "text-white/75" : "text-muted"}`}> 元</span>
                  </p>
                </li>
              ))}
            </ul>
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
