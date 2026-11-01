import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/constants/site";

// 404 頁不要沿用首頁的描述和標準網址（canonical），避免 Google 混淆
export const metadata: Metadata = {
  title: `找不到頁面｜${SITE.name}`,
  description: null,
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-navy">404</p>
      <h1 className="text-2xl font-bold tracking-widest text-brand-navy">找不到這個頁面</h1>
      <p className="text-muted">網址可能打錯了，或頁面已經移除。</p>
      <Link
        href="/"
        className="rounded-full bg-brand-navy px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors hover:bg-brand-blue"
      >
        回首頁
      </Link>
    </main>
  );
}
