import SectionTitle from "@/components/ui/SectionTitle";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { SERVICES, VENUE } from "@/constants/services";

const accents = [
  "bg-brand-sky/20 text-brand-navy",
  "bg-brand-yellow/30 text-brand-navy",
  "bg-brand-green/25 text-brand-navy",
];

function ServiceCard({
  href,
  title,
  items,
  linkText,
  accent,
  icon,
}: {
  href: string;
  title: string;
  items: string[];
  linkText: string;
  accent: string;
  icon: React.ReactNode;
}) {
  // 整張卡片可點（標題連結用 after: 蓋滿卡片）；「AI 自動化」標籤另外連到首頁社群自動化區塊，疊在上層（Rice 2026-11-08）
  return (
    <div className="group relative flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
      {/* 直向排列，「引導」那行推到卡片底部，電腦版同一排的卡片底部會對齊 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg leading-snug font-bold text-brand-blue-ink">
          <a href={href} className="after:absolute after:inset-0 after:rounded-2xl">
            {title}
          </a>
        </h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item) =>
            item.includes("AI 自動化") ? (
              <li key={item} className="relative z-10">
                <a
                  href="#ig-feed"
                  className="block rounded-full bg-brand-yellow/35 px-2.5 py-0.5 text-xs leading-relaxed text-ink transition-colors hover:bg-brand-yellow/60"
                >
                  {item}
                </a>
              </li>
            ) : (
              <li key={item} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs leading-relaxed text-ink">
                {item}
              </li>
            ),
          )}
        </ul>
        <p className="mt-auto pt-2.5 text-xs font-medium text-brand-navy/60 group-hover:text-brand-blue-ink">{linkText}</p>
      </div>
    </div>
  );
}

// 精簡版：手機一欄、電腦 2×2，快速接到短影音區塊
export default function Services() {
  return (
    <section id="services" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="服務項目" en="Our Services" compact />

        <div className="grid gap-3 md:grid-cols-2 md:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              href={s.caseHref ?? `#cases-${s.id}`}
              title={s.title}
              items={s.items}
              linkText="相關案例引導 →"
              accent={accents[i % 3]}
              icon={<ServiceIcon id={s.id} className="h-6 w-6" order={i} />}
            />
          ))}
          <ServiceCard
            href="/venue/"
            title={VENUE.title}
            items={VENUE.items}
            linkText="場地租借資訊 →"
            accent="bg-brand-sky/20 text-brand-navy"
            icon={<ServiceIcon id="venue" className="h-6 w-6" order={SERVICES.length} />}
          />
        </div>
      </div>
    </section>
  );
}
