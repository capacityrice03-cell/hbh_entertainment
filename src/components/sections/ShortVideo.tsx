import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Parallax from "@/components/ui/Parallax";
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
          description="藉由短影音的內容矩陣，編排企劃內容來達成各項行銷目標，透過社群平台的長期經營曝光達成數倍效益。"
        />

        {/* 獨立標語 */}
        <p className="text-center text-2xl font-bold tracking-wider text-brand-orange md:text-3xl">
          長期的
          <span className="underline decoration-brand-yellow decoration-4 underline-offset-8">持續性曝光</span>
        </p>

        {/* 成效亮點：一條精簡橫幅，放在影片卡上方 */}
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center rounded-2xl bg-gradient-to-r from-brand-navy to-[#2c5592] px-6 py-4 text-center text-white shadow-lg">
          <p className="text-base leading-relaxed md:text-lg">
            數支短影音，自然流量即突破
            {/* 手機在「突破」後換行，讓「1,000 萬次觀看!!」整組不被拆開 */}
            <br className="sm:hidden" />
            <span className="whitespace-nowrap">
              <span className="mx-1.5 text-2xl font-black text-brand-yellow md:text-3xl">1,000 萬</span>
              次觀看!!
            </span>
          </p>
        </div>

        {/* 四則代表性短影音（皆可點開原影片） */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {SHORT_VIDEO_HIGHLIGHTS.map((h, i) => (
              // 桌機版四張卡片交錯浮動（視差），手機不啟用
              <Parallax key={h.src} speed={i % 2 === 0 ? 0.05 : -0.04} minWidth={1024}>
              <figure>
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
                  {h.label && <p className="mt-0.5 text-xs leading-snug text-muted md:text-sm">{h.label}</p>}
                </figcaption>
              </figure>
              </Parallax>
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
