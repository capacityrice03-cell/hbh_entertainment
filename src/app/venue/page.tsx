import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import VenueGallery from "@/components/ui/VenueGallery";
import { VENUE, VENUE_PLACES } from "@/constants/services";
import { SITE } from "@/constants/site";

function PinIcon() {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    </div>
  );
}

export const metadata: Metadata = {
  title: `${VENUE.title}｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}${VENUE.title}：${VENUE.items.join("、")}。`,
  alternates: { canonical: "/venue/" },
};

export default function VenuePage() {
  return (
    <>
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

      <main className="flex-1 bg-brand-cream/40 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue">VENUE RENTAL</p>
          <h1 className="mt-2 text-3xl font-bold tracking-widest text-brand-navy md:text-4xl">{VENUE.title}</h1>

          {/* 地點卡片：點了跳到該地點的照片。照片與地點資料在 constants/services.ts 的 VENUE_PLACES */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VENUE_PLACES.map((place, i) => (
              <a
                key={place.name}
                href={`#place-${i + 1}`}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <PinIcon />
                <span className="text-lg font-bold text-brand-blue">{place.name}</span>
                <span className="ml-auto text-brand-blue" aria-hidden="true">
                  ↓
                </span>
              </a>
            ))}
          </div>

          {VENUE_PLACES.map((place, i) => (
            <section key={place.name} id={`place-${i + 1}`} className="mt-14 scroll-mt-6 md:mt-20">
              <div className="mb-5 flex items-center gap-3 md:mb-6">
                <PinIcon />
                <h2 className="text-2xl font-bold tracking-wider text-brand-navy md:text-3xl">{place.name}</h2>
              </div>
              <VenueGallery photos={place.photos} />
            </section>
          ))}

          <div className="mt-14 flex flex-col md:mt-20 gap-6 rounded-2xl bg-brand-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="leading-relaxed">場地租借歡迎來信或加 LINE 洽詢</p>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="mt-4 inline-block rounded-full bg-brand-yellow px-6 py-2.5 font-semibold break-all text-brand-navy transition-opacity hover:opacity-90"
              >
                {SITE.contact.email}
              </a>
            </div>
            <div className="text-center">
              <div className="relative mx-auto h-36 w-36 rounded-2xl bg-white p-2">
                <Image src="/images/line-qr-haobuhao.jpg" alt="LINE 加好友 QR Code" fill sizes="144px" className="object-contain p-2" />
              </div>
              <p className="mt-2 text-sm font-medium text-[#06c755]">掃描加入 LINE</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
