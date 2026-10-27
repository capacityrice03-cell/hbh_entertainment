import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/constants/site";

export type LegalSection = { title: string; body: React.ReactNode };

type Props = {
  title: string;
  titleEn: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
};

/** 隱私權政策、服務條款等法律頁面共用的版面 */
export default function LegalPage({ title, titleEn, updated, intro, sections }: Props) {
  return (
    <>
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
            <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
          </Link>
          <Link href="/" className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue">
            ← 回首頁
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-brand-cream/40 py-14 md:py-20">
        <article className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold tracking-widest text-brand-navy md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">
            {titleEn}｜最後更新日期：{updated}
          </p>

          <p className="mt-8 leading-relaxed">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section
                key={s.title}
                className="space-y-3 leading-relaxed [&_a]:text-brand-blue [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6"
              >
                <h2 className="text-xl font-bold text-brand-navy">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
