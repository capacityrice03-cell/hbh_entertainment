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
  return (
    <a
      href={href}
      className="group flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
      {/* 直向排列，「引導」那行推到卡片底部，電腦版同一排的卡片底部會對齊 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg leading-snug font-bold text-brand-blue">{title}</h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <li key={item} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs leading-relaxed text-ink">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-2.5 text-xs font-medium text-brand-navy/60 group-hover:text-brand-blue">{linkText}</p>
      </div>
    </a>
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
              href={`#cases-${s.id}`}
              title={s.title}
              items={s.items}
              linkText="相關案例引導 →"
              accent={accents[i % 3]}
              icon={<ServiceIcon id={s.id} className="h-6 w-6" />}
            />
          ))}
          <ServiceCard
            href="#contact"
            title={VENUE.title}
            items={VENUE.items}
            linkText="場地洽詢 →"
            accent="bg-brand-sky/20 text-brand-navy"
            icon={
              // 地點圖釘
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                <circle cx="12" cy="10" r="2.3" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
