import type { ServiceId } from "@/types";

const paths: Record<ServiceId, React.ReactNode> = {
  // 品牌影音行銷：手機 + AI 星芒
  channel: (
    <>
      <rect x="5" y="2.5" width="10" height="19" rx="2" />
      <path d="M9 18.5h2" />
      <path d="M9 8.5v5l4-2.5z" />
      <path d="M19 3.5v3M17.5 5h3" />
      <path d="M19.5 10v2M18.5 11h2" />
    </>
  ),
  // 活動 / EFP 直播 / 媒體廣告：直播攝影機 + 訊號
  event: (
    <>
      <rect x="2.5" y="9" width="12" height="9" rx="2" />
      <path d="M14.5 12.5l4-2.5v7l-4-2.5" />
      <circle cx="6" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M17 3.5a6 6 0 0 1 3.5 3.5M15.5 6a3 3 0 0 1 2 2" />
    </>
  ),
  // 節目製作：攝影機
  commercial: (
    <>
      <rect x="3" y="9" width="13" height="10" rx="2" />
      <path d="M16 13l5-3v8l-5-3" />
      <circle cx="7" cy="5.5" r="2.5" />
      <circle cx="13" cy="5.5" r="2.5" />
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
