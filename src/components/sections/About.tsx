import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { ABOUT_PILLARS, SITE } from "@/constants/site";

export default function About() {
  return (
    <section id="about" className="bg-brand-cream/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="關於我們"
          en="About Us"
          description={`${SITE.name}是來自電視節目製作背景的影音製作團隊，為企業與品牌提供影片拍攝、頻道經營、直播與活動企劃服務。`}
        />

        <div className="grid gap-8 md:grid-cols-3">
          {ABOUT_PILLARS.map((p) => (
            <article
              key={p.keyword}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                {p.lines.map((line) => (
                  <p key={line} className="text-lg font-medium tracking-wide text-brand-navy">
                    {line}
                  </p>
                ))}
                <p className="mt-3 font-bold tracking-wider text-brand-blue">{p.keyword}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-3 text-center text-base leading-relaxed tracking-wide text-muted md:text-lg">
          {SITE.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
