"use client";

import Image from "next/image";
import { useState } from "react";
import { NAV, SITE } from "@/constants/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <a href="#top" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={1225}
            height={746}
            className="h-11 w-auto md:h-14"
            preload
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue"
          >
            洽詢合作
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-center text-base font-medium text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 pb-3 text-center">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block rounded-full bg-brand-navy px-6 py-2 text-sm font-medium text-white"
            >
              洽詢合作
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
