import Image from "next/image";
import { SITE } from "@/constants/site";
import { SERVICES } from "@/constants/services";
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[88vh] items-center overflow-hidden pt-20">
      <Image
        src="/images/hero.jpg"
        alt="台北京站開幕活動現場人潮"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/30" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-6 flex gap-1.5">
          <span className="h-1.5 w-10 rounded-full bg-brand-sky" />
          <span className="h-1.5 w-10 rounded-full bg-brand-yellow" />
          <span className="h-1.5 w-10 rounded-full bg-brand-green" />
        </div>
        <p className="text-sm font-semibold tracking-[0.3em] text-brand-yellow uppercase">
          {SITE.nameEn}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold tracking-wide text-white md:text-6xl">
          專為<span className="text-brand-sky">企業</span>、
          <span className="text-brand-sky">品牌</span>
          <br />
          規劃的影音運營團隊
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
          {SITE.subSlogan}
          <br />
          從傳統媒體到新媒體平台、實體活動的線上線下整合。
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#cases"
            className="rounded-full bg-brand-yellow px-7 py-3 font-semibold text-brand-navy transition-transform hover:scale-105"
          >
            看實際案例
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand-navy"
          >
            洽詢合作
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap gap-2">
          {[...SERVICES.map((s) => s.title), "場域租借"].map((title) => (
            <li
              key={title}
              className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
