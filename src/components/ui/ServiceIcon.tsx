import type { ServiceId } from "@/types";

const paths: Record<ServiceId, React.ReactNode> = {
  // 攝影機
  commercial: (
    <>
      <rect x="3" y="9" width="13" height="10" rx="2" />
      <path d="M16 13l5-3v8l-5-3" />
      <circle cx="7" cy="5.5" r="2.5" />
      <circle cx="13" cy="5.5" r="2.5" />
    </>
  ),
  // 企劃簡報
  channel: (
    <>
      <circle cx="9" cy="6" r="3" />
      <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
      <rect x="15" y="12" width="6" height="7" rx="1" />
      <path d="M17 14.5h2M17 16.5h2" />
    </>
  ),
  // 相片
  sponsored: (
    <>
      <rect x="3" y="6" width="13" height="14" rx="1.5" transform="rotate(-6 9.5 13)" />
      <rect x="8" y="4" width="13" height="14" rx="1.5" transform="rotate(6 14.5 11)" />
      <path d="M12.5 10.5c.6-1 2.2-1 2.6.2.4 1.3-1.6 2.6-2.6 3.3-1-.7-3-2-2.6-3.3.4-1.2 2-1.2 2.6-.2z" />
    </>
  ),
  // 光圈
  efp: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3l3 7M21 12l-7 3M12 21l-3-7M3 12l7-3M18.4 5.6L14 10M5.6 18.4L10 14" />
    </>
  ),
  // 相機
  event: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  // 新聞視窗
  media: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <circle cx="9" cy="13" r="1.8" />
      <path d="M6 18a3 3 0 0 1 6 0" />
      <path d="M14 12h4v3h-2.5L14 16.5z" />
    </>
  ),
};

export default function ServiceIcon({
  id,
  className = "h-8 w-8",
}: {
  id: ServiceId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  );
}
