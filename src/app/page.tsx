import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ShortVideo from "@/components/sections/ShortVideo";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import { SEO, SITE, SITE_URL } from "@/constants/site";
import { SERVICES } from "@/constants/services";

// 結構化資料：讓 Google 認得這是一間公司（名稱、網址、Logo、聯絡方式、服務）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}${SEO.ogImage}`,
  description: SEO.description,
  email: SITE.contact.email,
  sameAs: [SITE.contact.youtube],
  areaServed: { "@type": "Country", name: "Taiwan" },
  knowsAbout: [...SEO.keywords],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: SITE.contact.email,
    availableLanguage: ["zh-Hant"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "服務項目",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.items.join("、") },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <ShortVideo />
        <Cases />
        <Contact />
        <About />
      </main>
      <Footer />
    </>
  );
}
