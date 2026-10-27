import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  SHORT_VIDEO_HIGHLIGHTS,
  SHORT_VIDEO_PLAYLIST,
  SHORT_VIDEOS,
} from "@/constants/shortVideo";

export default function ShortVideo() {
  return (
    <section id="short-video" className="bg-brand-cream/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="短影音經營"
          en="Short Video"
          description="IG Reels、FB、TikTok 短影音企劃拍攝與社群經營。以炸綺來鹹酥雞為例，從開幕活動到日常門市，用短影音為品牌帶來長期的自然流量。"
        />

        {/* 重點成效：左邊文案、右邊四則代表性短影音（皆可點開原影片） */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_3fr]">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold tracking-wider text-brand-orange">
              長期的
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">持續性曝光</span>
            </p>
            <div className="mt-8 rounded-2xl bg-brand-navy px-6 py-5 text-white">
              <p className="text-base text-white/80">10 多支短影音即</p>
              <p className="mt-1 text-3xl font-bold whitespace-nowrap text-brand-yellow">
                突破 1000 萬<span className="text-xl">次觀看</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5">
            {SHORT_VIDEO_HIGHLIGHTS.map((h) => (
              <figure key={h.src}>
                <a href={h.stats[0].url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[59/100] overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">
                    <Image
                      src={h.src}
                      alt={h.alt}
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 24vw, 48vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-0 shadow transition-opacity group-hover:opacity-100">
                        <svg viewBox="0 0 20 20" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M6 4.5v11l9-5.5z" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </a>
                <figcaption className="mt-3 text-center">
                  {/* 多平台時 IG / FB 標籤靠左對齊排成一欄，整組仍置中 */}
                  <div className="inline-flex flex-col items-start">
                  {h.stats.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline gap-1.5 hover:opacity-80"
                    >
                      {s.platform && (
                        <span className="rounded bg-brand-navy px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {s.platform}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-brand-orange md:text-3xl">{s.value}</span>
                    </a>
                  ))}
                  </div>
                  <p className="mt-0.5 text-xs leading-snug text-muted md:text-sm">{h.label}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* 簡報第 8 頁：短影音牆 */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-bold tracking-wider text-brand-navy">
            IG Reels・FB 自然曝光流量數據
          </h3>
          <p className="mt-1 text-center text-xs text-muted sm:hidden">← 左右滑動看更多 →</p>
          {/* 手機：兩列橫向滑動；平板以上：7 × 2 格 */}
          <ul className="mt-6 grid auto-cols-[30%] grid-flow-col grid-rows-2 gap-1 overflow-x-auto rounded-2xl sm:grid-flow-row sm:grid-cols-7 sm:overflow-hidden">
            {SHORT_VIDEOS.map((v, i) => (
              <li key={v.src} className="relative aspect-[9/14]">
                <Image
                  src={v.src}
                  alt={`炸綺來短影音 ${i + 1}，${v.views} 萬次播放`}
                  fill
                  sizes="(min-width: 1152px) 165px, (min-width: 640px) 14vw, 30vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <a
              href={SHORT_VIDEO_PLAYLIST}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-blue"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M6 4.5v11l9-5.5z" />
              </svg>
              觀看短影音作品
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
