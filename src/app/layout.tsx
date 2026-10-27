import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SEO, SITE, SITE_URL } from "@/constants/site";

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
    </html>
  );
}
