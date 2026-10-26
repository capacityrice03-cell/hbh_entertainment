import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE } from "@/constants/site";

const taglineColors = ["text-brand-sky", "text-brand-yellow", "text-brand-green"];

export default function Contact() {
  const { contact } = SITE;

  return (
    <section id="contact" className="bg-brand-navy py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle title="聯絡我們" en="Contact" light />

        <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <p className="text-2xl font-bold tracking-widest">
              {SITE.tagline.map((t, i) => (
                <span key={t}>
                  <span className={taglineColors[i]}>{t}</span>
                  {i < SITE.tagline.length - 1 && <span className="text-muted">、</span>}
                </span>
              ))}
            </p>
            <p className="mt-2 text-muted">歡迎來信或加 LINE 洽詢，我們會依您的需求提供客製化提案。</p>

            <dl className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <dt className="w-16 shrink-0 text-sm text-muted">聯絡人</dt>
                <dd className="text-lg font-semibold text-brand-navy">{contact.person}</dd>
              </div>
              <div className="flex items-center gap-4">
                <dt className="w-16 shrink-0 text-sm text-muted">Email</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-lg font-semibold break-all text-brand-navy hover:text-brand-blue"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent("合作洽詢")}`}
                className="rounded-full bg-brand-yellow px-6 py-2.5 font-semibold text-brand-navy transition-transform hover:scale-105"
              >
                寄信洽詢
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 rounded-2xl p-2 ring-1 ring-black/10">
              <Image src="/images/line-qr.jpg" alt="LINE 加好友 QR Code" fill sizes="160px" className="object-contain p-2" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#06c755]">掃描加入 LINE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
