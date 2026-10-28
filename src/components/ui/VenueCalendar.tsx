/**
 * 場地檔期：嵌入公開的 Google 日曆。
 * 在 Google 日曆新增或修改活動，網站會自動更新，不用改程式。
 * 電腦版顯示月曆，手機版改成清單（月曆在窄螢幕會擠在一起）。
 */
function calendarUrl(id: string, mode: "MONTH" | "AGENDA") {
  const params = new URLSearchParams({
    src: id,
    ctz: "Asia/Taipei",
    hl: "zh_TW",
    mode,
    wkst: "1",
    showTitle: "0",
    showPrint: "0",
    showCalendars: "0",
    showTz: "0",
  });
  return `https://calendar.google.com/calendar/embed?${params}`;
}

export default function VenueCalendar({ id, title }: { id: string; title: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white p-2 shadow-sm md:mt-10 md:p-4">
      <iframe
        src={calendarUrl(id, "MONTH")}
        title={`${title} 場地檔期（月曆）`}
        loading="lazy"
        className="hidden h-[640px] w-full border-0 md:block"
      />
      <iframe
        src={calendarUrl(id, "AGENDA")}
        title={`${title} 場地檔期（清單）`}
        loading="lazy"
        className="block h-[520px] w-full border-0 md:hidden"
      />
    </div>
  );
}
