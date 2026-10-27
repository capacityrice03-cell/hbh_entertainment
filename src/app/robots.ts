import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

// 靜態網站：建置時就產生 robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
