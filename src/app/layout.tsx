import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "好不好娛樂 Haobuhao Entertainment｜品牌影音運營團隊",
  description:
    "專為企業、品牌規劃的影音運營團隊。商業影像拍攝、頻道經營企劃、業配拍攝置入、EFP 直播系統、活動舉辦與新聞媒體操作。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
