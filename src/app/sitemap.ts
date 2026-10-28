import type { MetadataRoute } from "next";
import { SEO, SITE_URL } from "@/constants/site";

// 靜態網站：建置時就產生 sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}${SEO.ogImage}`],
    },
    { url: `${SITE_URL}/venue/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
