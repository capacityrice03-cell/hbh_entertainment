import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE } from "@/constants/site";
import posts from "@/constants/igFeed.json";

// IG 最新貼文：GitHub Actions 每天跑 scripts/fetch-ig.mjs 更新 igFeed.json 後重新上線

// 日期一律用台灣時間顯示，例如 2026/11/07
const dateFmt = new Intl.DateTimeFormat("zh-TW", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// IG 回傳的時間是 2026-11-07T14:00:34+0000，補成標準格式再解析
function toDate(ts: string) {
  return new Date(ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}

export default function IgFeed() {
  if (posts.length === 0) return null;

  return (
    <section id="ig-feed" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="AI自動化社群更新" en="Instagram" />

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {posts.map((p) => {
            const date = toDate(p.timestamp);
            // 第一行當標題，其餘當內文（Google 會讀到完整文字）
            const [first, ...rest] = p.caption.split("\n").filter((l) => l.trim());
            return (
              <li key={p.id}>
                <a
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
                    <Image
                      src={p.image}
                      alt={first ? `IG 貼文：${first}` : "好不好娛樂 IG 貼文"}
                      fill
                      sizes="(min-width: 1152px) 360px, (min-width: 768px) 31vw, 46vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <time dateTime={date.toISOString()} className="text-xs text-muted">
                      {dateFmt.format(date)}
                    </time>
                    {first && (
                      <h3 className="mt-1 line-clamp-2 text-sm leading-snug font-bold text-brand-navy md:text-base">
                        {first}
                      </h3>
                    )}
                    {rest.length > 0 && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted md:line-clamp-3 md:text-sm">
                        {rest.join(" ")}
                      </p>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={SITE.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-blue"
          >
            {/* 按鈕文字待 Rice 定稿 */}
            @hbh__entertainment
          </a>
        </div>
      </div>
    </section>
  );
}
