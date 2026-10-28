import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { VENUE } from "@/constants/services";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `場域租借｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}場域租借：${VENUE.items.join("、")}。`,
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
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-blue">VENUE RENTAL</p>
          <h1 className="mt-2 text-3xl font-bold tracking-widest text-brand-navy md:text-4xl">{VENUE.title}</h1>

          {/* 場地清單：之後要加地址、照片、坪數等資訊，改 constants/services.ts 的 VENUE 或這裡即可 */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VENUE.items.map((place) => (
              <div key={place} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
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
                <h2 className="text-lg font-bold text-brand-blue">{place}</h2>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-brand-navy p-6 text-white md:p-8">
            <p className="leading-relaxed">場地租借歡迎來信洽詢</p>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="mt-4 inline-block rounded-full bg-brand-yellow px-6 py-2.5 font-semibold text-brand-navy transition-opacity hover:opacity-90"
            >
              {SITE.contact.email}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
