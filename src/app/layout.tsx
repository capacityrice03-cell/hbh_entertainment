import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID, SEO, SITE, SITE_URL } from "@/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 讓下面的相對路徑（"/"、"/images/..."）自動補成完整網址
  metadataBase: new URL(`${SITE_URL}/`),
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  // Google Search Console 網站擁有權驗證（舊網址 github.io、新網域 hbh-tw.store 各一組）
  verification: {
    google: ["92Z8ONTNTHsJAkaO1AGDU88xsEBEYxlpYpxQtBY8q2E", "jLv7y4wiVA9zV0BnBkSIat-2F0HhcwRSSsj3aatIlZ8"],
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: `${SITE.name} ${SITE.nameEn}`,
    title: SEO.title,
    description: SEO.description,
    url: "/",
    images: [{ url: SEO.ogImage, width: 960, height: 640, alt: `${SITE.name}活動現場` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
