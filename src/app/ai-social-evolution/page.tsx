import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { AI_EVOLUTION, AI_EVOLUTION_PALETTES, AI_EVOLUTION_STEPS } from "@/constants/aiEvolution";
import { SITE, breadcrumbLd, shareMeta } from "@/constants/site";

const PATH = "/ai-social-evolution/";

export const metadata: Metadata = {
  title: `${AI_EVOLUTION.title}｜${SITE.name}`,
  description: AI_EVOLUTION.intro,
  alternates: { canonical: PATH },
  ...shareMeta(`${AI_EVOLUTION.title}｜${SITE.name}`, PATH),
};

export default function AiSocialEvolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(AI_EVOLUTION.title, PATH)} />
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
            <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
          </Link>
          <Link href="/#ig-feed" className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue">
            ← {AI_EVOLUTION.backLabel}
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* 開頭 */}
        <section className="bg-brand-cream/40 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue-ink uppercase">{AI_EVOLUTION.en}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-widest text-brand-navy md:text-5xl">{AI_EVOLUTION.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">{AI_EVOLUTION.intro}</p>
          </div>
        </section>

        {/* 步驟：由上往下 */}
        <section className="py-14 md:py-20">
          <ol className="mx-auto max-w-4xl space-y-12 px-4 md:space-y-16">
            {AI_EVOLUTION_STEPS.map((step, i) => (
              <li key={step.title} className="relative md:pl-16">
                <div className="flex items-start gap-3 md:block">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-lg font-bold text-brand-yellow md:absolute md:top-0 md:left-0 md:h-11 md:w-11">
                    {i + 1}
                  </span>
                  <h2 className="min-w-0 pt-1 text-xl font-bold text-brand-navy md:pt-0 md:text-2xl">{step.title}</h2>
                </div>
                <p className="mt-3 leading-relaxed text-ink">{step.text}</p>
                <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                  {step.images.map((img) => (
                    <li key={img.src} className={img.wide ? "col-span-2 md:col-span-3" : undefined}>
                      <figure>
                        <Image
                          src={img.src}
                          alt={img.caption ? `${step.title}：${img.caption}` : step.title}
                          width={img.width}
                          height={img.height}
                          sizes={img.wide ? "(min-width: 768px) 700px, 92vw" : "(min-width: 768px) 220px, 46vw"}
                          className={`h-auto rounded-xl shadow-sm ring-1 ring-black/5 ${img.wide ? "mx-auto w-full max-w-2xl" : "w-full"}`}
                        />
                        {img.caption && (
                          <figcaption className="mt-2 text-center text-sm text-muted">{img.caption}</figcaption>
                        )}
                      </figure>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* 配色總覽 */}
        <section className="bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{AI_EVOLUTION_PALETTES.title}</h2>
            <p className="mt-3 leading-relaxed text-ink">{AI_EVOLUTION_PALETTES.text}</p>
            <Image
              src={AI_EVOLUTION_PALETTES.image.src}
              alt={AI_EVOLUTION_PALETTES.title}
              width={AI_EVOLUTION_PALETTES.image.width}
              height={AI_EVOLUTION_PALETTES.image.height}
              sizes="(min-width: 896px) 832px, 92vw"
              className="mt-6 h-auto w-full rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            />
          </div>
        </section>

        <section className="py-10 text-center">
          <Link
            href={AI_EVOLUTION.backHref}
            className="inline-block rounded-full bg-brand-navy px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-brand-blue"
          >
            {AI_EVOLUTION.backLabel}
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
