import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollStrip from "@/components/ui/ScrollStrip";
import { SITE } from "@/constants/site";
import igPosts from "@/constants/igFeed.json";
import fbPosts from "@/constants/fbFeed.json";
import threadsPosts from "@/constants/threadsFeed.json";

// 首頁「AI自動化社群更新」：三排。IG、FB 電腦一排 4 則；Threads 只放 1 篇，圖卡左右滑；只有 IG 那排下面有追蹤按鈕
// - Instagram：GitHub Actions 每天跑 scripts/fetch-ig.mjs 自動更新
// - Facebook：GitHub Actions 每天跑 scripts/fetch-fb.mjs 自動更新（最近的貼文隨機挑 4 篇）
// - Threads：GitHub Actions 每天跑 scripts/fetch-threads.mjs 自動更新（只放 1 篇，當天的貼文隨機挑、不跟 IG／FB 同題目，圖卡左右滑）

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
    <time dateTime={d.toISOString()} className="text-[11px] text-muted md:text-xs">
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
      className="group block h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
        {image ? (
          <Image
            src={image}
            alt={title ? `${platform} 貼文：${title}` : `好不好娛樂 ${platform} 貼文`}
            fill
            sizes="(min-width: 1152px) 270px, (min-width: 768px) 23vw, (min-width: 640px) 45vw, 70vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full flex-col justify-center bg-brand-navy p-5">
            <p className="line-clamp-6 text-lg leading-snug font-bold text-white">{title}</p>
            <p className="mt-3 text-[11px] tracking-wider text-brand-yellow">@hbh__entertainment</p>
          </div>
        )}
      </div>
      <div className="p-3">
        <PostDate ts={ts} />
        {title && <h4 className="mt-1 line-clamp-2 text-sm leading-snug font-bold text-brand-navy">{title}</h4>}
        {body && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{body}</p>}
      </div>
    </a>
  );
}

/** 追蹤按鈕（平台 logo＋文字）；目前只有 IG 那排有（Rice 2026-11-08） */
function FollowButton({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <div className="mt-6 text-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-brand-navy py-2 pr-5 pl-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue"
      >
        <Image src={icon} alt="" width={96} height={96} className="h-6 w-6" />
        {label}
      </a>
    </div>
  );
}

/** IG、FB、Threads 那排左上角的平台名稱（點了到該平台主頁） */
function RowLabel({ name, href, icon }: { name: string; href: string; icon: string }) {
  return (
    <h3 className="mb-3 text-base font-bold tracking-wide text-brand-navy">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-blue">
        <Image src={icon} alt="" width={96} height={96} className="h-5 w-5" />
        {name}
      </a>
    </h3>
  );
}

// 手機上左右滑動；電腦一排 4 張
const ROW =
  "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0";
const ROW_ITEM = "w-[60%] shrink-0 snap-start sm:w-[40%] md:w-auto";

type ThreadsPost = {
  id: string;
  text: string;
  permalink: string;
  timestamp: string;
  images: { src: string; width: number; height: number }[];
};
const threadsPost = (threadsPosts as ThreadsPost[])[0];

/** Threads 那排：只放 1 篇，標題文字在上（電腦在左），圖卡排成一列左右滑（Rice 2026-11-08） */
function ThreadsRow({ post }: { post: ThreadsPost }) {
  const { title, body } = splitText(post.text);
  return (
    <div className="mt-14">
      <RowLabel name="Threads" href={SITE.contact.threads} icon="/images/icon-threads.png" />
      <div className="md:grid md:grid-cols-4 md:gap-5">
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-4 block md:mb-0 md:self-center"
        >
          <PostDate ts={post.timestamp} />
          {title && (
            <h4 className="mt-1 text-base leading-snug font-bold text-brand-navy group-hover:text-brand-blue md:text-lg">
              {title}
            </h4>
          )}
          {body && <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted">{body}</p>}
        </a>
        <div className="md:col-span-3">
          <ScrollStrip label={title ? `Threads 貼文圖卡：${title}` : "Threads 貼文圖卡"}>
            {post.images.map((img, i) => (
              <li key={img.src} className="w-[70%] shrink-0 snap-start sm:w-[42%] md:w-[calc((100%-2rem)/3.3)]">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-brand-cream ring-1 ring-black/5"
                >
                  <Image
                    src={img.src}
                    alt={`Threads 貼文第 ${i + 1} 張圖${title ? `：${title}` : ""}`}
                    fill
                    sizes="(min-width: 1152px) 250px, (min-width: 768px) 22vw, (min-width: 640px) 42vw, 70vw"
                    className="object-cover"
                  />
                </a>
              </li>
            ))}
          </ScrollStrip>
        </div>
      </div>
    </div>
  );
}

export default function IgFeed() {
  return (
    <section id="ig-feed" className="scroll-mt-24 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle title="AI自動化社群更新" en="Auto-update social media" />

        {igPosts.length > 0 && (
          <div>
            <RowLabel name="Instagram" href={SITE.contact.instagram} icon="/images/icon-ig.png" />
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {igPosts.map((p) => (
                <li key={p.id}>
                  <PhotoCard href={p.permalink} image={p.image} text={p.caption} ts={p.timestamp} platform="IG" />
                </li>
              ))}
            </ul>
            <FollowButton href={SITE.contact.instagram} label="追蹤我們的 Instagram" icon="/images/icon-ig.png" />
          </div>
        )}

        {fbPosts.length > 0 && (
          <div className="mt-14">
            <RowLabel name="Facebook" href={SITE.contact.facebook} icon="/images/icon-fb.png" />
            <ul className={ROW}>
              {fbPosts.map((p) => (
                <li key={p.id} className={ROW_ITEM}>
                  <PhotoCard href={p.permalink} image={"image" in p ? p.image : undefined} text={p.message} ts={p.timestamp} platform="FB" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {threadsPost && <ThreadsRow post={threadsPost} />}
      </div>
    </section>
  );
}
