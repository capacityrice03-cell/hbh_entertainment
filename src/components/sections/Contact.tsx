import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE } from "@/constants/site";

function LineQr() {
  return (
    <div className="text-center">
      <div className="relative mx-auto h-40 w-40 rounded-2xl p-2 ring-1 ring-black/10">
        <Image src="/images/line-qr-haobuhao.jpg" alt="LINE 加好友 QR Code" fill sizes="160px" className="object-contain p-2" />
      </div>
      <p className="mt-3 text-sm font-medium text-[#06c755]">掃描加入 LINE</p>
    </div>
  );
}

export default function Contact() {
  const { contact } = SITE;

  return (
    <section id="contact" className="bg-brand-navy py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle title="聯絡我們" en="Contact" light />

        <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <p className="text-lg font-medium tracking-wide text-brand-navy">歡迎加LINE聯繫合作業務需求。</p>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <dt className="w-16 shrink-0 text-sm text-muted">Email</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-base font-semibold break-all text-brand-navy hover:text-brand-blue md:text-lg"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>

            {/* 手機版：QR Code 放在按鈕上方 */}
            <div className="mt-8 md:hidden">
              <LineQr />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent("合作洽詢")}`}
                className="rounded-full bg-brand-yellow px-6 py-2.5 font-semibold text-brand-navy transition-transform hover:scale-105"
              >
                寄信洽詢
              </a>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-6 py-2.5 font-semibold text-white transition-transform hover:scale-105"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
                YouTube 頻道
              </a>
            </div>
          </div>

          {/* 電腦版：QR Code 在右邊 */}
          <div className="hidden md:block">
            <LineQr />
          </div>
        </div>
      </div>
    </section>
  );
}
