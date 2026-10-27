"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { CASES } from "@/constants/cases";
import { SERVICES, SERVICE_TITLE } from "@/constants/services";
import type { CaseStudy, ServiceId } from "@/types";

type Filter = ServiceId | "all";

export default function Cases() {
  const [filter, setFilter] = useState<Filter>("all");

  // 從「服務項目」卡片點進來時（#cases-efp 這類網址），自動切換分類
  useEffect(() => {
    const apply = () => {
      const match = window.location.hash.match(/^#cases-(\w+)$/);
      if (!match) return;
      const id = match[1] as ServiceId;
      if (SERVICES.some((s) => s.id === id)) {
        setFilter(id);
        document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const list = filter === "all" ? CASES : CASES.filter((c) => c.services.includes(filter));

  return (
    <section id="cases" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="實際案例"
          en="Case Sharing"
          description="依接案類別瀏覽我們執行過的專案。"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            全部（{CASES.length}）
          </FilterButton>
          {SERVICES.map((s) => (
            <FilterButton key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)}>
              {s.title}（{CASES.filter((c) => c.services.includes(s.id)).length}）
            </FilterButton>
          ))}
        </div>

        <div className="space-y-10">
          {list.map((c, i) => (
            <CaseCard key={c.id} item={c} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-brand-navy text-white"
          : "bg-white text-brand-navy ring-1 ring-brand-navy/15 hover:bg-brand-sky/20"
      }`}
    >
      {children}
    </button>
  );
}

function CaseCard({ item, reverse }: { item: CaseStudy; reverse: boolean }) {
  const [main, ...rest] = item.images;

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className={`grid lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* 照片 */}
        <div className={`grid content-start grid-cols-3 gap-1 bg-white p-1 ${item.portraitMain ? "grid-rows-3" : ""}`}>
          <div className={`relative ${item.portraitMain ? "col-span-2 row-span-3" : "col-span-3 aspect-[16/10]"}`}>
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes={item.portraitMain ? "(min-width: 1024px) 34vw, 67vw" : "(min-width: 1024px) 50vw, 100vw"}
              className={`object-cover ${
                item.portraitMain ? "rounded-l-[1.25rem]" : "rounded-t-[1.25rem] lg:rounded-[1.25rem]"
              }`}
            />
          </div>
          {rest.map((img) => (
            <div key={img.src} className="relative aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 17vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>

        {/* 文字 */}
        <div className="flex flex-col p-7 md:p-10">
          <div className="flex flex-wrap gap-2">
            {item.services.map((id) => (
              <span
                key={id}
                className="rounded-full bg-brand-sky/20 px-3 py-1 text-xs font-medium text-brand-navy"
              >
                {SERVICE_TITLE[id]}
              </span>
            ))}
          </div>

          <h3 className="mt-4 text-2xl font-bold text-brand-navy">{item.title}</h3>
          {item.subtitle && <p className="mt-1 font-medium text-brand-orange">{item.subtitle}</p>}
          {item.client && <p className="mt-1 text-sm text-muted">{item.clientLabel ?? "合作對象"}：{item.client}</p>}

          <p className="mt-5 leading-relaxed text-ink">{item.description}</p>

          <ul className="mt-5 space-y-2">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-ink">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" fill="currentColor">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" />
                </svg>
                {h}
              </li>
            ))}
          </ul>

          {item.metrics && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {item.metrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-brand-cream px-4 py-3">
                  <p className="text-2xl font-bold text-brand-orange">{m.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {item.links && (
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {item.links.map((l) => (
                <a
                  key={l.url + l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 px-4 py-1.5 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M6 4.5v11l9-5.5z" />
                  </svg>
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
