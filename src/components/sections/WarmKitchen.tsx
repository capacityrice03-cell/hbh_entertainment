import Image from "next/image";
import { withBase } from "@/lib/image-loader";
import {
  WARM,
  WARM_CELEBRATION_REEL,
  WARM_CHEFS,
  WARM_FLOW,
  WARM_MEDIA,
  WARM_METRICS,
  WARM_REELS,
} from "@/constants/warmKitchen";

// 暖廚家味品牌色（取自其主視覺）
const RED = "bg-[#b8230c]";

const reelsTotal = Math.round(WARM_REELS.reduce((sum, r) => sum + r.views, 0));

function BlockTitle({ no, title, en }: { no: string; title: string; en: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="text-3xl font-bold text-[#b8230c]">{no}</span>
      <h4 className="text-xl font-bold tracking-wider text-[#2b1a14] md:text-2xl">{title}</h4>
      <span className="hidden text-xs font-semibold tracking-[0.25em] text-[#b8230c]/70 uppercase sm:inline">{en}</span>
    </div>
  );
}

function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5z" />
    </svg>
  );
}

export default function WarmKitchen() {
  return (
    <article className="overflow-hidden rounded-3xl bg-[#f6efe6] shadow-sm ring-1 ring-black/5">
      {/* 標題列 */}
      <header className={`${RED} px-7 py-8 text-white md:px-10`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#b8230c]">公益 × 線上課程</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs">TVBS 播出</span>
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-wide md:text-4xl">{WARM.title}</h3>
        <p className="mt-2 text-lg text-white/90 md:text-xl">{WARM.subtitle}</p>
      </header>

      <div className="space-y-14 px-5 py-10 md:px-10 md:py-12">
        {/* 區塊 1：節目 × 課程 × 公益 */}
        <section>
          <BlockTitle no="01" title="一檔節目，善的循環" en="A Cycle of Good" />
          <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[880/1000] overflow-hidden rounded-2xl shadow-md">
              <Image src={WARM.poster.src} alt={WARM.poster.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
            </div>

            <div className="flex flex-col">
              <p className="leading-relaxed text-ink">{WARM.intro}</p>

              {/* 流程 */}
              <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {WARM_FLOW.map((step, i) => (
                  <li key={step.title} className="relative rounded-xl bg-white px-3 py-4 text-center shadow-sm">
                    <span className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${RED} text-sm font-bold text-white`}>
                      {i + 1}
                    </span>
                    <p className="mt-2 text-sm font-bold text-[#2b1a14]">{step.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{step.note}</p>
                    {i < WARM_FLOW.length - 1 && (
                      <span className="absolute top-1/2 -right-2.5 z-10 hidden -translate-y-1/2 text-[#b8230c] sm:block" aria-hidden="true">
                        ▶
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              {/* 成效數字 */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {WARM_METRICS.map((m) => (
                  <div key={m.label} className="rounded-xl border border-[#b8230c]/15 bg-white px-4 py-3">
                    <p className="text-2xl font-bold text-[#b8230c] md:text-3xl">{m.value}</p>
                    <p className="mt-0.5 text-xs text-muted md:text-sm">
                      {"highlight" in m && (
                        <mark className="mr-1 rounded bg-brand-yellow px-1.5 py-0.5 font-bold text-[#2b1a14]">
                          {m.highlight}
                        </mark>
                      )}
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* 主廚 */}
              <div className="mt-6">
                <p className="text-sm font-bold tracking-wider text-[#2b1a14]">5 位跨國名廚・15 道招牌料理</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {WARM_CHEFS.map((c) => (
                    <li key={c.name} className="rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
                      <span className="font-bold text-[#2b1a14]">{c.name}</span>
                      <span className="ml-1.5 text-xs text-muted">{c.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={WARM.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#b8230c]/40 px-4 py-1.5 text-sm font-medium text-[#b8230c] transition-colors hover:bg-[#b8230c] hover:text-white"
              >
                暖廚家味官網 →
              </a>
            </div>
          </div>
        </section>

        {/* 區塊 2：TVBS 播出與記者會 */}
        <section>
          <BlockTitle no="02" title="TVBS 播出・記者會" en="On Air & Press" />
          <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
            <figure>
              <video
                controls
                preload="none"
                playsInline
                poster={withBase(WARM_MEDIA.newsVideo.poster)}
                className="aspect-video w-full rounded-2xl bg-black shadow-md"
              >
                <source src={withBase(WARM_MEDIA.newsVideo.src)} type="video/mp4" />
              </video>
              <figcaption className="mt-2 text-sm text-muted">{WARM_MEDIA.newsVideo.caption}</figcaption>
            </figure>

            <figure className="flex flex-col">
              <div className="grid flex-1 gap-3 max-lg:grid-cols-2">
                {WARM_MEDIA.episodes.map((ep) => (
                  <div key={ep.src} className="relative aspect-video overflow-hidden rounded-xl shadow-md">
                    <Image src={ep.src} alt={ep.alt} fill sizes="(min-width: 1024px) 400px, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <figcaption className="mt-2 text-sm text-muted">{WARM_MEDIA.episodesCaption}</figcaption>
            </figure>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {WARM_MEDIA.photos.map((p) => (
              <figure key={p.src}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-md">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-sm text-muted">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 區塊 3：短影音 Reels */}
        <section>
          <BlockTitle no="03" title="主廚短影音 Reels" en="Short Video" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="leading-relaxed text-ink">
                為每位主廚量身打造人物故事短影音，從主廚的人生轉折切入，帶出公益課程與食物包的意義，在 IG 創造大量自然觸及。
              </p>
              <div className={`mt-6 rounded-2xl ${RED} px-6 py-5 text-white`}>
                <p className="text-sm text-white/80">{WARM_REELS.length} 支主廚 Reels</p>
                <p className="mt-1 text-3xl font-bold">
                  累積 {reelsTotal} 萬<span className="text-xl">次觀看</span>
                </p>
              </div>
              <a
                href={WARM_CELEBRATION_REEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-[#b8230c]/15 transition-colors hover:bg-[#b8230c]/5"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${RED} text-white`}>
                  <PlayIcon />
                </span>
                <span className="text-sm font-bold text-[#2b1a14]">{WARM_CELEBRATION_REEL.label}</span>
              </a>
            </div>

            <ul className="grid grid-cols-3 gap-3 md:gap-5">
              {WARM_REELS.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-[9/14] overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">
                      <Image
                        src={r.src}
                        alt={`${r.chef} Reels：${r.hook}，${r.views} 萬次觀看`}
                        fill
                        sizes="(min-width: 1024px) 220px, 32vw"
                        className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#b8230c] opacity-0 shadow transition-opacity group-hover:opacity-100">
                          <PlayIcon className="ml-0.5 h-4 w-4" />
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-center text-xl font-bold text-[#b8230c] md:text-2xl">{r.views}萬</p>
                    <p className="text-center text-xs text-muted md:text-sm">{r.chef}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
