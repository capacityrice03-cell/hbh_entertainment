// 提案簡報頁用的插圖：全部是 inline SVG，扁平、圓頭線條、品牌色。
// 純裝飾，不放任何文字；大型插圖只在寬螢幕顯示。

export type IconName =
  | "wheel"
  | "shield"
  | "team"
  | "play"
  | "dashcam"
  | "mic"
  | "chat"
  | "pin"
  | "funnel"
  | "trend"
  | "coin"
  | "bolt"
  | "heart"
  | "briefcase"
  | "flag"
  | "clipboard"
  | "store"
  | "doc"
  | "rocket"
  | "target"
  | "eye"
  | "userplus"
  | "car";

/** 24 格的線條圖示（圓頭圓角） */
const ICONS: Record<IconName, React.ReactNode> = {
  wheel: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M3.4 10.6 9.6 11.4M20.6 10.6 14.4 11.4M12 14.4V21" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19.5 6v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.6" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16.2 13.8c2.6 0 4.3 1.6 4.3 4.4" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="m10.5 9.2 4.5 2.8-4.5 2.8z" fill="currentColor" />
    </>
  ),
  dashcam: (
    <>
      <rect x="3" y="8" width="18" height="10" rx="3.5" />
      <circle cx="12" cy="13" r="2.6" />
      <path d="M12 8V4.5M9 4.5h6" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11c0 3.5 2.5 6 6 6s6-2.5 6-6M12 17v4M9 21h6" />
    </>
  ),
  chat: (
    <>
      <path d="M7 5h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5l-4 3.5V17H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.800 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  funnel: <path d="M4 5h16l-6.200 7.500V19l-3.600 2v-8.500z" />,
  trend: (
    <>
      <path d="m3.500 17 6-6 3.500 3.500L20.500 7" />
      <path d="M15.500 7h5v5" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.800 9.200c-.5-1-1.500-1.500-2.800-1.500-1.700 0-2.700.8-2.700 1.900 0 2.900 5.500 1.400 5.500 4.600 0 1.200-1.200 2.100-2.800 2.100-1.400 0-2.500-.6-3-1.700M12 6v1.700M12 16.300V18" />
    </>
  ),
  bolt: <path d="M13 3 5.500 13.500h6L10.500 21l8-11h-6z" />,
  heart: <path d="M12 20C5 15 3.500 11.500 3.500 8.800a4.300 4.300 0 0 1 8.500-1 4.300 4.300 0 0 1 8.500 1C20.500 11.500 19 15 12 20z" />,
  briefcase: (
    <>
      <rect x="3" y="7.500" width="18" height="12" rx="3" />
      <path d="M9 7.500V6a1.500 1.500 0 0 1 1.500-1.500h3A1.500 1.500 0 0 1 15 6v1.500M3 13h18" />
    </>
  ),
  flag: <path d="M6 21V4M6 5h11l-2.500 3.500L17 12H6" />,
  clipboard: (
    <>
      <rect x="5" y="4.500" width="14" height="16.500" rx="3" />
      <path d="M9 4.500a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6H9zM9 11h6M9 15h4" />
    </>
  ),
  store: (
    <>
      <path d="m4 9 1.500-5h13L20 9" />
      <path d="M4 9a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9M5.500 11.500V20h13v-8.500" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3.500h7l4.500 4.500v11.500a1.500 1.500 0 0 1-1.500 1.500H7a1.500 1.500 0 0 1-1.500-1.500V5A1.500 1.500 0 0 1 7 3.500z" />
      <path d="M14 3.500V8h4.500M9 14l2 2 4-4.500" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.800 2 5.500 6 4.600 11L12 19l-4.600-5C6.500 9 8.200 5 12 3z" />
      <circle cx="12" cy="10" r="1.800" />
      <path d="m7.500 14-3 2.200 2.500 1.300M16.500 14l3 2.200-2.500 1.300" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.200" fill="currentColor" />
    </>
  ),
  eye: (
    <>
      <path d="M2.500 12C5 7.500 8.500 5.500 12 5.500S19 7.500 21.500 12c-2.500 4.500-6 6.500-9.500 6.500S5 16.500 2.500 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  userplus: (
    <>
      <circle cx="10" cy="8" r="3.500" />
      <path d="M3.500 20c0-3.800 3-6 6.500-6s6.500 2.200 6.500 6M18.500 7v6M15.500 10h6" />
    </>
  ),
  car: (
    <>
      <path d="M3.500 14.500V12a1.500 1.500 0 0 1 .2-.8L5.800 7a2 2 0 0 1 1.800-1h8.800a2 2 0 0 1 1.800 1l2.100 4.200a1.500 1.500 0 0 1 .2.800v2.500a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1zM3.500 12h17" />
      <circle cx="7.500" cy="17.500" r="1.800" />
      <circle cx="16.500" cy="17.500" r="1.800" />
    </>
  ),
};

export function DeckIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export type Tone = "sky" | "yellow" | "green" | "navy" | "glass";
const BADGE: Record<Tone, string> = {
  // 不透明的淡色（品牌色混白），半壓在色塊上時才不會透出底下的顏色
  sky: "bg-[#b8e4f9] text-brand-navy ring-2 ring-white",
  yellow: "bg-[#f8e67a] text-brand-navy ring-2 ring-white",
  green: "bg-[#cee492] text-brand-navy ring-2 ring-white",
  navy: "bg-brand-navy text-white ring-2 ring-white",
  glass: "bg-white/15 text-brand-yellow ring-1 ring-white/25",
};
const SIZE = {
  sm: "h-9 w-9 [&>svg]:h-5 [&>svg]:w-5",
  md: "h-11 w-11 [&>svg]:h-6 [&>svg]:w-6",
  lg: "h-16 w-16 [&>svg]:h-8 [&>svg]:w-8",
} as const;

/** 圓形圖示徽章 */
export function IconBadge({
  icon,
  tone = "sky",
  size = "md",
  className = "",
}: {
  icon: IconName;
  tone?: Tone;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${BADGE[tone]} ${SIZE[size]} ${className}`} aria-hidden="true">
      <DeckIcon name={icon} />
    </span>
  );
}

const BLOB: Record<"sky" | "yellow" | "green", string> = {
  sky: "bg-brand-sky/30",
  yellow: "bg-brand-yellow/35",
  green: "bg-brand-green/30",
};

/** 卡片右上角：柔和的圓形色塊＋圖示徽章（父層要 relative overflow-hidden） */
export function CardAccent({ icon, tone = "sky" }: { icon: IconName; tone?: "sky" | "yellow" | "green" }) {
  return (
    <>
      <span className={`absolute -top-9 -right-9 h-28 w-28 rounded-full ${BLOB[tone]}`} aria-hidden="true" />
      <IconBadge icon={icon} tone={tone} className="absolute top-4 right-4" />
    </>
  );
}

const TONES = [
  { a: "bg-brand-sky/25", b: "bg-brand-yellow/25", c: "border-brand-green/25" },
  { a: "bg-brand-yellow/25", b: "bg-brand-green/20", c: "border-brand-sky/35" },
  { a: "bg-brand-green/20", b: "bg-brand-sky/25", c: "border-brand-yellow/40" },
];
const TONES_DARK = { a: "bg-white/5", b: "bg-brand-sky/10", c: "border-brand-yellow/20" };

export type HeroName = "target" | "shield" | "wheel" | "play" | "pin" | "funnel" | "chart" | "team";

const HEROES: Record<HeroName, React.ReactNode> = {
  // 專案目標：靶心＋飛鏢
  target: (
    <>
      <circle cx="74" cy="70" r="46" className="fill-brand-navy" />
      <circle cx="74" cy="70" r="34" className="fill-white" />
      <circle cx="74" cy="70" r="23" className="fill-brand-sky" />
      <circle cx="74" cy="70" r="11" className="fill-brand-yellow" />
      <path d="M74 70 128 22" className="stroke-brand-orange" strokeWidth="6" strokeLinecap="round" />
      <path d="M118 14l14-3-3 14" className="stroke-brand-orange" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="22" cy="30" r="6" className="fill-brand-green" />
      <circle cx="140" cy="98" r="7" className="fill-brand-yellow" />
    </>
  ),
  // 保障：盾牌＋勾
  shield: (
    <>
      <path d="M80 12 118 26v34c0 28-17 44-38 52C59 104 42 88 42 60V26z" className="fill-brand-navy stroke-brand-navy" strokeWidth="8" strokeLinejoin="round" />
      <path d="M80 26 106 36v24c0 19-11 30-26 37z" className="fill-brand-sky/30" />
      <path d="m62 62 13 13 24-26" className="stroke-brand-yellow" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="26" cy="40" r="6" className="fill-brand-yellow" />
      <circle cx="138" cy="86" r="7" className="fill-brand-green" />
      <circle cx="132" cy="26" r="4" className="fill-brand-sky" />
    </>
  ),
  // 方向盤
  wheel: (
    <>
      <circle cx="80" cy="64" r="42" className="stroke-brand-navy" strokeWidth="11" fill="none" />
      <path d="M40 58 68 64M120 58 92 64M80 76v36" className="stroke-brand-navy" strokeWidth="9" strokeLinecap="round" />
      <circle cx="80" cy="64" r="13" className="fill-brand-yellow stroke-brand-navy" strokeWidth="5" />
      <circle cx="22" cy="26" r="6" className="fill-brand-green" />
      <circle cx="142" cy="102" r="6" className="fill-brand-sky" />
    </>
  ),
  // 影片：兩張疊起來的螢幕＋播放鍵（深色頁用）
  play: (
    <>
      <rect x="48" y="12" width="98" height="66" rx="15" className="fill-brand-yellow" />
      <rect x="20" y="34" width="102" height="72" rx="15" className="fill-white" />
      <path d="m58 56 28 14-28 14z" className="fill-brand-blue stroke-brand-blue" strokeWidth="6" strokeLinejoin="round" />
      <rect x="34" y="92" width="44" height="6" rx="3" className="fill-brand-sky" />
      <circle cx="140" cy="102" r="6" className="fill-brand-sky" />
    </>
  ),
  // 地推：定位點＋路線
  pin: (
    <>
      <ellipse cx="80" cy="106" rx="40" ry="9" className="fill-brand-sky/60" />
      <path d="M20 94c20-16 34 6 54-8" className="stroke-brand-blue" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" fill="none" />
      <path d="M80 100S46 70 46 48a34 34 0 0 1 68 0c0 22-34 52-34 52z" className="fill-brand-navy stroke-brand-navy" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="80" cy="48" r="13" className="fill-brand-yellow" />
      <circle cx="132" cy="30" r="6" className="fill-brand-green" />
      <circle cx="28" cy="34" r="5" className="fill-brand-yellow" />
    </>
  ),
  // 漏斗：三層三色
  funnel: (
    <>
      <path d="M32 24h96l-13 20H45z" className="fill-brand-sky stroke-brand-sky" strokeWidth="8" strokeLinejoin="round" />
      <path d="M50 54h60l-9 18H59z" className="fill-brand-yellow stroke-brand-yellow" strokeWidth="8" strokeLinejoin="round" />
      <path d="M64 82h32l-6 16H70z" className="fill-brand-green stroke-brand-green" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="56" cy="8" r="4" className="fill-brand-navy" />
      <circle cx="80" cy="6" r="3" className="fill-brand-blue" />
      <circle cx="104" cy="9" r="4" className="fill-brand-orange" />
      <circle cx="80" cy="112" r="5" className="fill-brand-navy" />
    </>
  ),
  // 成長：圓角長條＋上升箭頭
  chart: (
    <>
      <rect x="26" y="72" width="26" height="40" rx="9" className="fill-brand-sky" />
      <rect x="60" y="54" width="26" height="58" rx="9" className="fill-brand-yellow" />
      <rect x="94" y="36" width="26" height="76" rx="9" className="fill-brand-green" />
      <path d="M26 56 60 36l22 8 48-30" className="stroke-brand-navy" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M114 12h16v16" className="stroke-brand-navy" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="142" cy="92" r="6" className="fill-brand-orange" />
    </>
  ),
  // 夥伴：三個圓頭小人（深色頁用）
  team: (
    <>
      <circle cx="80" cy="42" r="17" className="fill-white" />
      <path d="M50 100c0-18 13-30 30-30s30 12 30 30z" className="fill-white" />
      <circle cx="36" cy="58" r="13" className="fill-brand-yellow" />
      <path d="M14 106c0-14 10-24 22-24 5 0 9 2 12 5-6 5-10 12-10 19z" className="fill-brand-yellow" />
      <circle cx="124" cy="58" r="13" className="fill-brand-sky" />
      <path d="M146 106c0-14-10-24-22-24-5 0-9 2-12 5 6 5 10 12 10 19z" className="fill-brand-sky" />
    </>
  ),
};

/**
 * 每頁的背景裝飾：角落的柔和色塊＋圓環，寬螢幕再加右上角的插圖。
 * 絕對定位，不佔版面高度；放進 Slide 的 backdrop。
 */
export function DeckDecor({ hero, variant = 0, dark = false }: { hero?: HeroName; variant?: number; dark?: boolean }) {
  const t = dark ? TONES_DARK : TONES[variant % TONES.length];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className={`absolute -top-20 -right-10 h-80 w-80 rounded-full ${t.a}`} />
      <span className={`absolute -bottom-24 -left-16 h-60 w-60 rotate-12 rounded-[3rem] ${t.b}`} />
      <span className={`absolute top-1/2 -left-10 h-20 w-20 rounded-full border-[10px] ${t.c}`} />
      {hero && (
        <svg viewBox="0 0 160 120" className="absolute top-[14px] right-[62px] hidden h-[132px] w-44 xl:block" aria-hidden="true">
          {HEROES[hero]}
        </svg>
      )}
    </div>
  );
}
