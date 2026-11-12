import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import BentoShowcase from "@/components/showcase/BentoShowcase";
import type { ShowcaseItem } from "@/components/showcase/types";
import { CASES } from "@/constants/cases";
import { SERVICE_TITLE, VENUE, VENUE_PLACES } from "@/constants/services";
import { SITE, breadcrumbLd, shareMeta } from "@/constants/site";
import { WARM, WARM_FLOW, WARM_MEDIA, WARM_METRICS } from "@/constants/warmKitchen";
import { optimizedSrc, withBase } from "@/lib/image-loader";

const PATH = "/works/";
const TITLE = "作品集";

export const metadata: Metadata = {
  title: `${TITLE}｜節目製作・活動策畫・EFP 直播・場域出租｜${SITE.name}`,
  // 草稿：待負責人確認
  description: `${SITE.name}作品集：暖廚家味料理實境節目、品牌代言人記者會、EFP 多機直播、品牌自媒體、企業尾牙與場域出租等實際案例。`,
  alternates: { canonical: PATH },
  // 作品集分頁先不公開（2026-11-13 Rice）：請 Google 不要收錄。要導入時把下一行拿掉
  robots: { index: false, follow: true },
  ...shareMeta(`${TITLE}｜${SITE.name}`, PATH),
};

const byId = (id: string) => {
  const c = CASES.find((x) => x.id === id);
  if (!c) throw new Error(`找不到案例 ${id}`);
  return c;
};

/** 從 YouTube 網址取出影片 ID（youtu.be/xxx 或 watch?v=xxx） */
const ytId = (url: string) => url.match(/(?:youtu\.be\/|v=)([\w-]{11})/)?.[1] ?? "";

function fromCase(id: string, category: string, span: string, extra?: Partial<ShowcaseItem>): ShowcaseItem {
  const c = byId(id);
  const yt = [...(c.links ?? []), ...c.images.filter((i) => i.url).map((i) => ({ label: i.caption ?? "", url: i.url! }))].find(
    (l) => ytId(l.url),
  );
  return {
    id: c.id,
    category,
    title: c.title,
    subtitle: c.subtitle,
    cover: { src: c.images[0].src, alt: c.images[0].alt },
    span,
    tags: c.services.map((s) => SERVICE_TITLE[s]),
    description: c.description,
    specs: [
      ...(c.client ? [{ label: c.clientLabel || "合作對象", value: c.client }] : []),
      ...c.highlights.map((h, i) => ({ label: `重點 ${i + 1}`, value: h })),
      ...(c.metrics ?? []).map((m) => ({ label: m.label, value: m.value })),
    ],
    media: yt
      ? { type: "youtube", id: ytId(yt.url), title: `${c.title} 影片` }
      : {
          type: "images",
          // 第一張就是封面，裁切位置跟卡片一致
          images: c.images
            .slice(0, 5)
            .map((img, i) => ({ src: img.src, alt: img.alt, position: i === 0 ? extra?.coverPosition : undefined })),
        },
    links: (c.links ?? []).filter((l) => !l.url.startsWith("#")).slice(0, 4),
    ...extra,
  };
}

const venue = VENUE_PLACES[0];

const ITEMS: ShowcaseItem[] = [
  {
    id: "warm-kitchen",
    category: "精選作品・節目製作",
    title: WARM.title,
    subtitle: WARM.subtitle,
    cover: { src: WARM_MEDIA.newsVideo.poster, alt: "TVBS 新聞台報導《暖廚家味》記者會畫面" },
    previewVideo: withBase("/videos/previews/warm-kitchen.mp4"),
    span: "md:col-span-2 md:row-span-2",
    tags: ["節目製作", "品牌影音行銷", "活動 / EFP 直播 / 媒體廣告"],
    description: WARM.intro,
    specs: [
      ...WARM_FLOW.map((f, i) => ({ label: `流程 ${i + 1}`, value: `${f.title}（${f.note}）` })),
      ...WARM_METRICS.map((m) => ({ label: m.label, value: m.value })),
    ],
    media: {
      type: "video",
      src: withBase(WARM_MEDIA.newsVideo.src),
      poster: optimizedSrc(WARM_MEDIA.newsVideo.poster, 1080),
      title: WARM_MEDIA.newsVideo.caption,
    },
    links: [
      { label: "暖廚家味官網", url: WARM.website },
      { label: "1919 食物銀行", url: WARM.foodBank },
    ],
  },
  fromCase("dr-jou", "活動策畫", "md:col-span-2"),
  {
    id: "venue",
    category: "場域出租",
    title: venue.name,
    subtitle: venue.note,
    cover: { src: venue.photos[0].src, alt: venue.photos[0].alt },
    span: "md:row-span-2",
    tags: [VENUE.title],
    description: `${SITE.name}${VENUE.title}：${VENUE.items.join("、")}。`,
    specs: [
      { label: "地點", value: venue.name },
      { label: "交通", value: venue.note.replace(/[()（）]/g, "") },
      ...VENUE.items.map((p, i) => ({ label: `場地 ${i + 1}`, value: p })),
    ],
    media: { type: "images", images: venue.photos.slice(0, 5).map((p) => ({ src: p.src, alt: p.alt })) },
    links: [{ label: "場地租借資訊", url: "/venue/" }],
  },
  fromCase("chi-vlog", "節目製作", "md:row-span-2"),
  fromCase("live-event", "活動策畫・EFP 直播", ""),
  fromCase("hydrafacial", "活動策畫", ""),
  fromCase("golead-year-end", "活動策畫", "md:col-span-2"),
  fromCase("live-commerce", "節目製作", ""),
  // 直式照片：裁切偏上，保留人物的臉
  fromCase("duck-hotpot", "品牌行銷", "", { coverPosition: "50% 15%" }),
];
// 桌面版 4 欄 × 4 列 = 16 格：2×2 + 2×1 + 1×2 + 1×2 + 1 + 1 + 2×1 + 1 + 1，剛好填滿

export default function WorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(TITLE, PATH)} />
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
            <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
          </Link>
          <Link href="/#cases" className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue">
            ← 回實際案例
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1 bg-[#0b1220] py-14 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-brand-sky uppercase">Works</p>
          <h1 className="mt-3 text-center text-3xl font-bold tracking-wide md:text-4xl">{TITLE}</h1>
          <p className="mt-4 text-center text-sm text-white/60">點選作品查看完整影片與介紹</p>

          <div className="mt-12">
            <BentoShowcase items={ITEMS} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
