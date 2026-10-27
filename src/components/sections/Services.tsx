import SectionTitle from "@/components/ui/SectionTitle";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/constants/services";

const accents = [
  "bg-brand-sky/20 text-brand-navy",
  "bg-brand-yellow/30 text-brand-navy",
  "bg-brand-green/25 text-brand-navy",
];

// 精簡版：三張橫向小卡，手機上不會拖太長，快速接到短影音區塊
export default function Services() {
  return (
    <section id="services" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="服務項目" en="Our Services" compact />

        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {SERVICES.map((s, i) => (
            <a
              key={s.id}
              href={`#cases-${s.id}`}
              className="group flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accents[i % 3]}`}>
                <ServiceIcon id={s.id} className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg leading-snug font-bold text-brand-blue">{s.title}</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs leading-relaxed text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-xs font-medium text-brand-navy/60 group-hover:text-brand-blue">相關案例引導 →</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
