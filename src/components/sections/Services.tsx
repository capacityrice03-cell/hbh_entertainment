import SectionTitle from "@/components/ui/SectionTitle";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/constants/services";
import { CASES } from "@/constants/cases";

const accents = [
  "bg-brand-sky/20 text-brand-navy",
  "bg-brand-yellow/30 text-brand-navy",
  "bg-brand-green/25 text-brand-navy",
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="服務項目"
          en="Our Services"
          description="從企業形象影片、業配拍攝、EFP 直播到記者會活動企劃，六大接案類別可單項委託，也能整合成完整的品牌影音製作方案。"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const count = CASES.filter((c) => c.services.includes(s.id)).length;
            return (
              <a
                key={s.id}
                href={`#cases-${s.id}`}
                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${accents[i % 3]}`}
                >
                  <ServiceIcon id={s.id} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-brand-blue">{s.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5 text-muted">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-medium text-brand-navy/70 group-hover:text-brand-blue">
                  相關案例 {count} 件 →
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
