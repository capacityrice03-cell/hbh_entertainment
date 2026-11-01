import type { MetadataRoute } from "next";
import { SEO, SITE_URL } from "@/constants/site";

// 靜態網站：建置時就產生 sitemap.xml
export const dynamic = "force-static";

// 各頁「內容」最後更新的日期。改了某一頁的內容，就順手更新這裡對應的日期。
// （不用 new Date()：那會讓每次部署所有頁面都變成「剛更新」，Google 會因此不信任這個欄位）
const UPDATED = {
  home: "2026-11-01",
  venue: "2026-11-01",
  brandVideo: "2026-11-01",
  privacy: "2026-10-27",
  terms: "2026-10-27",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: UPDATED.home,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}${SEO.ogImage}`],
    },
    { url: `${SITE_URL}/services/brand-video/`, lastModified: UPDATED.brandVideo, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/venue/`, lastModified: UPDATED.venue, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy/`, lastModified: UPDATED.privacy, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms/`, lastModified: UPDATED.terms, changeFrequency: "yearly", priority: 0.3 },
  ];
}
