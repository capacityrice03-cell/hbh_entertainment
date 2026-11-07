"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ShowcaseItem } from "./types";

/**
 * Tech-Bento 作品展示：
 * - 不對稱網格（桌面 4 欄、手機 1 欄）
 * - 每張卡片的邊框與背景會跟著滑鼠位置出現聚光燈光暈
 * - 滑鼠移上去播放預覽短片（有提供時），移開暫停並回到開頭
 * - 點卡片後，卡片本身放大成詳細介紹視窗（共享佈局動畫），不用換頁
 */
export default function BentoShowcase({ items }: { items: ShowcaseItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const open = items.find((i) => i.id === openId) ?? null;

  const close = useCallback(() => {
    setOpenId(null);
    opener.current?.focus();
  }, []);

  return (
    <>
      <ul className="grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <li key={item.id} className={item.span}>
            <SpotlightCard
              item={item}
              hidden={openId === item.id}
              onOpen={(el) => {
                opener.current = el;
                setOpenId(item.id);
              }}
            />
          </li>
        ))}
      </ul>

      <AnimatePresence>{open && <MorphDialog key={open.id} item={open} onClose={close} />}</AnimatePresence>
    </>
  );
}

/* ───────────── 卡片 ───────────── */

function SpotlightCard({
  item,
  hidden,
  onOpen,
}: {
  item: ShowcaseItem;
  hidden: boolean;
  onOpen: (el: HTMLButtonElement) => void;
}) {
  const card = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // 只改 CSS 變數，不觸發 React 重新渲染，滑鼠移動才會順
  const track = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const start = () => {
    const v = video.current;
    if (!v) return;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <motion.button
      ref={card}
      type="button"
      layoutId={`card-${item.id}`}
      onPointerMove={track}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
      onClick={() => card.current && onOpen(card.current)}
      aria-haspopup="dialog"
      style={{ borderRadius: 24, visibility: hidden ? "hidden" : "visible" }}
      className="group relative block h-full w-full overflow-hidden bg-[#0f1a2e] text-left ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
    >
      {/* 封面圖（滑鼠移上去時緩慢放大） */}
      <Image
        src={item.cover.src}
        alt={item.cover.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
      />

      {/* 預覽短片：平時透明、不下載；滑鼠移上去才載入並淡入 */}
      {item.previewVideo && (
        <video
          ref={video}
          src={item.previewVideo}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* 文字底下的漸層，確保字看得清楚 */}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/40 to-transparent" />

      {/* 聚光燈：背景光暈 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(124, 205, 196, 0.16), transparent 45%)",
        }}
      />
      {/* 聚光燈：邊框光暈（用遮罩只留下 1px 邊框） */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(124, 205, 196, 0.9), transparent 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* 文字 */}
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6">
        <span className="w-fit rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium tracking-widest text-brand-sky backdrop-blur">
          {item.category}
        </span>
        <span className="mt-1 text-lg leading-snug font-bold text-white md:text-xl">{item.title}</span>
        {item.subtitle && <span className="text-sm text-white/65">{item.subtitle}</span>}
      </span>

      {/* 右上角：展開提示 */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition-transform duration-300 group-hover:rotate-45"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M10 4v12M4 10h12" strokeLinecap="round" />
        </svg>
      </span>
    </motion.button>
  );
}

/* ───────────── 展開視窗 ───────────── */

function MorphDialog({ item, onClose }: { item: ShowcaseItem; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // 鎖住背景捲動（平滑滾動元件偵測到 overflow: hidden 也會跟著暫停）
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-8">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#050a14]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        layoutId={reduceMotion ? undefined : `card-${item.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dialog-${item.id}`}
        style={{ borderRadius: 24 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden bg-[#0f1a2e] text-white ring-1 ring-white/10"
      >
        {/* data-lenis-prevent：視窗內容自己捲動，不交給全站平滑滾動 */}
        <div data-lenis-prevent className="overflow-y-auto overscroll-contain">
          <Media item={item} />

          <motion.div
            className="p-6 md:p-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
            exit={{ opacity: 0 }}
          >
            <p className="text-xs font-medium tracking-[0.3em] text-brand-sky">{item.category}</p>
            <h3 id={`dialog-${item.id}`} className="mt-2 text-2xl font-bold md:text-3xl">
              {item.title}
            </h3>
            {item.subtitle && <p className="mt-1 text-white/65">{item.subtitle}</p>}

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li key={t} className="rounded-full border border-brand-sky/40 px-3 py-1 text-xs text-brand-sky">
                  {t}
                </li>
              ))}
            </ul>

            {item.description && <p className="mt-6 leading-relaxed whitespace-pre-line text-white/85">{item.description}</p>}

            {item.specs.length > 0 && (
              <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
                {item.specs.map((s) => (
                  <div key={s.label + s.value} className="bg-[#0f1a2e] p-4">
                    <dt className="text-xs tracking-widest text-white/50">{s.label}</dt>
                    <dd className="mt-1 text-sm text-white/90">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {item.links && item.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {item.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    {...(l.url.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b1220] transition-colors hover:bg-brand-sky"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/75"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

function Media({ item }: { item: ShowcaseItem }) {
  const m = item.media;
  if (m.type === "youtube")
    return (
      <div className="aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${m.id}?autoplay=1&rel=0`}
          title={m.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  if (m.type === "video")
    return (
      <video
        src={m.src}
        poster={m.poster}
        controls
        autoPlay
        playsInline
        title={m.title}
        className="aspect-video w-full bg-black"
      />
    );
  return (
    <div className="grid grid-cols-2 gap-1 bg-black p-1 md:grid-cols-3">
      {m.images.map((img, i) => (
        <div key={img.src} className={`relative aspect-video ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
