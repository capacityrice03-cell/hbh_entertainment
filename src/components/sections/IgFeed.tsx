import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { SITE } from "@/constants/site";
import igPosts from "@/constants/igFeed.json";
import fbPosts from "@/constants/fbFeed.json";
import threadsPosts from "@/constants/threadsFeed.json";

// 首頁「AI自動化社群更新」：三排
// - Instagram：GitHub Actions 每天跑 scripts/fetch-ig.mjs 自動更新
// - Facebook：Rice 指定的貼文（src/constants/fbPicks.json），本機跑 scripts/fetch-fb.mjs 更新
// - Threads：GitHub Actions 每天跑 scripts/fetch-threads.mjs 自動更新（沒圖的貼文顯示文字卡）

// 日期一律用台灣時間顯示，例如 2026/11/07
const dateFmt = new Intl.DateTimeFormat("zh-TW", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// API 回傳的時間像 2026-11-07T14:00:34+0000，補成標準格式再解析
function toDate(ts: string) {
  return new Date(ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}

// 第一行當標題（去掉【】），其餘合成一段內文（Google 會讀到完整文字）
function splitText(text: string) {
  const [first = "", ...rest] = text.split("\n").filter((l) => l.trim());
  return { title: first.replace(/^【(.*)】$/, "$1"), body: rest.join(" ") };
}

function PostDate({ ts }: { ts: string }) {
  const d = toDate(ts);
  return (
    <time dateTime={d.toISOString()} className="text-xs text-muted">
      {dateFmt.format(d)}
    </time>
  );
}

/** 貼文卡：上方圖片（沒圖的貼文改成深藍底大字標題），下方日期、標題、內文 */
function PhotoCard({ href, image, text, ts, platform }: { href: string; image?: string; text: string; ts: string; platform: string }) {
  const { title, body } = splitText(text);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
        {image ? (
          <Image
            src={image}
            alt={title ? `${platform} 貼文：${title}` : `好不好娛樂 ${platform} 貼文`}
            fill
            sizes="(min-width: 1152px) 360px, (min-width: 768px) 31vw, 70vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full flex-col justify-center bg-brand-navy p-6 md:p-8">
            <p className="line-clamp-6 text-xl leading-snug font-bold text-white md:text-2xl">{title}</p>
            <p className="mt-4 text-xs tracking-wider text-brand-yellow">@hbh__entertainment</p>
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <PostDate ts={ts} />
        {title && (
          <h4 className="mt-1 line-clamp-2 text-sm leading-snug font-bold text-brand-navy md:text-base">{title}</h4>
        )}
        {body && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted md:line-clamp-3 md:text-sm">{body}</p>}
      </div>
    </a>
  );
}

/** 每一排的平台名稱（點了到該平台主頁） */
function RowHeading({ name, href, icon }: { name: string; href: string; icon?: string }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-wide text-brand-navy">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-blue">
        {icon ? (
          <Image src={icon} alt="" width={96} height={96} className="h-6 w-6" />
        ) : (
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-sm font-bold text-white">
            @
          </span>
        )}
        {name}
      </a>
    </h3>
  );
}

// 手機上左右滑動、電腦上一排三張
const ROW = "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0";
const ROW_ITEM = "w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto";

export default function IgFeed() {
  return (
    <section id="ig-feed" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="AI自動化社群更新" en="Instagram" />

        {igPosts.length > 0 && (
          <div>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {igPosts.map((p) => (
                <li key={p.id}>
                  <PhotoCard href={p.permalink} image={p.image} text={p.caption} ts={p.timestamp} platform="IG" />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <a
                href={SITE.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-blue"
              >
                追蹤我們的 Instagram
              </a>
            </div>
          </div>
        )}

        {fbPosts.length > 0 && (
          <div className="mt-16">
            <RowHeading name="Facebook" href={SITE.contact.facebook} icon="/images/icon-fb.png" />
            <ul className={ROW}>
              {fbPosts.map((p) => (
                <li key={p.id} className={ROW_ITEM}>
                  <PhotoCard href={p.permalink} image={"image" in p ? p.image : undefined} text={p.message} ts={p.timestamp} platform="FB" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {threadsPosts.length > 0 && (
          <div className="mt-16">
            <RowHeading name="Threads" href={SITE.contact.threads} />
            <ul className={ROW}>
              {threadsPosts.map((p) => (
                <li key={p.id} className={ROW_ITEM}>
                  <PhotoCard href={p.permalink} image={"image" in p ? p.image : undefined} text={p.text} ts={p.timestamp} platform="Threads" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
