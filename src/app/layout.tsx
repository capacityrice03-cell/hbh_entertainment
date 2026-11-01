import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID, SEO, SHARE, SITE, SITE_URL, shareMeta } from "@/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 讓下面的相對路徑（"/"、"/images/..."）自動補成完整網址
  metadataBase: new URL(`${SITE_URL}/`),
  title: SEO.title,
  description: SEO.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  // Google Search Console 網站擁有權驗證（舊網址 github.io、新網域 hbh-tw.store 各一組）
  verification: {
    google: ["92Z8ONTNTHsJAkaO1AGDU88xsEBEYxlpYpxQtBY8q2E", "jLv7y4wiVA9zV0BnBkSIat-2F0HhcwRSSsj3aatIlZ8"],
  },
  // 分享預覽只放一行標題，不放長描述
  ...shareMeta(SHARE.title, "/"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* 鍵盤或螢幕閱讀器使用者按 Tab 時才會出現，可直接跳過選單 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-brand-navy focus:shadow-lg"
        >
          跳到主要內容
        </a>
        {children}
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
