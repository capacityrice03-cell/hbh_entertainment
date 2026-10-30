"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PhotoWall from "@/components/ui/PhotoWall";
import SectionTitle from "@/components/ui/SectionTitle";
import WarmKitchen from "@/components/sections/WarmKitchen";
import { CASES } from "@/constants/cases";
import { SERVICES, SERVICE_TITLE } from "@/constants/services";
import type { CaseImage, CaseStudy, ServiceId } from "@/types";

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
          {list.map((c, i) =>
            c.feature === "warm-kitchen" ? (
              <WarmKitchen key={c.id} />
            ) : (
              <CaseCard key={c.id} item={c} reverse={i % 2 === 1} />
            ),
          )}
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

function EpisodeGrid({ images }: { images: CaseImage[] }) {
  return (
    <div className="grid content-center grid-cols-2 gap-x-3 gap-y-4 bg-white p-4 md:p-5">
      {images.map((img) => {
        const cover = (
          <div className="group relative aspect-video overflow-hidden rounded-md ring-4 ring-[#7ccdc4]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {img.url && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100">
                  <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4 text-[#ff0000]" fill="currentColor" aria-hidden="true">
                    <path d="M6 4.5v11l9-5.5z" />
                  </svg>
                </span>
              </span>
            )}
          </div>
        );
        const caption = (
          <p className="mt-2 text-sm font-medium tracking-wider text-brand-navy md:text-base">
            {img.episode && (
              <span className="mr-2 text-brand-blue underline underline-offset-4">{img.episode}</span>
            )}
            {img.caption}
          </p>
        );
        return img.url ? (
          <a key={img.src} href={img.url} target="_blank" rel="noopener noreferrer" className="block">
            {cover}
            {caption}
          </a>
        ) : (
          <div key={img.src}>
            {cover}
            {caption}
          </div>
        );
      })}
    </div>
  );
}

function CaseCard({ item, reverse }: { item: CaseStudy; reverse: boolean }) {
  // 照片牆：文字在上（電腦版左右兩欄），全寬照片牆在下
  if (item.layout === "gallery") {
    return (
      <article id={item.id} className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid gap-x-12 p-7 md:p-10 lg:grid-cols-2">
          <div>
            <CaseHeading item={item} />
          </div>
          <div className="flex flex-col lg:justify-end">
            <CaseDetails item={item} />
          </div>
        </div>
        <div className="px-2 pb-2 md:px-3 md:pb-3">
          <PhotoWall images={item.images} note={item.galleryNote} />
        </div>
      </article>
    );
  }

  const [main, ...rest] = item.images;

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className={`grid lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* 照片 */}
        {item.layout === "episodes" ? (
          <EpisodeGrid images={item.images} />
        ) : (
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
        )}

        {/* 文字 */}
        <div className="flex flex-col p-7 md:p-10">
          <CaseHeading item={item} />
          <CaseDetails item={item} />
        </div>
      </div>
    </article>
  );
}

/** 分類標籤、標題、副標、合作對象、說明 */
function CaseHeading({ item }: { item: CaseStudy }) {
  return (
    <>
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

      <h3 className="mt-4 text-2xl font-bold text-brand-navy">
        {item.titleHighlight
          ? item.title.split(item.titleHighlight).map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <mark
                    className="mx-0.5 rounded bg-brand-yellow px-1.5 text-brand-navy"
                    style={item.titleHighlightColor ? { backgroundColor: item.titleHighlightColor } : undefined}
                  >
                    {item.titleHighlight}
                  </mark>
                )}
                {part}
              </span>
            ))
          : item.title}
      </h3>
      {item.subtitle && <p className="mt-1 font-medium text-brand-orange">{item.subtitle}</p>}
      {item.client && (
        <p className="mt-1 text-sm text-muted">
          {item.clientLabel === "" ? "" : `${item.clientLabel ?? "合作對象"}：`}
          {item.client}
        </p>
      )}

      {/* 說明文字裡的 \n 會換行 */}
      {item.description && <p className="mt-5 leading-relaxed whitespace-pre-line text-ink">{item.description}</p>}
    </>
  );
}

/** 重點清單、數據、連結 */
function CaseDetails({ item }: { item: CaseStudy }) {
  return (
    <>
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
              {...(l.url.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/40 px-4 py-1.5 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            >
              {l.icon === "external" ? (
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M11 3h6v6M17 3l-8 8M8 5H4v11h11v-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M6 4.5v11l9-5.5z" />
                </svg>
              )}
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
