import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `隱私權政策｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}網站隱私權政策：說明我們如何蒐集、使用與保護您的個人資料。`,
};

const UPDATED = "2026 年 10 月 27 日";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "一、適用範圍",
    body: (
      <p>
        本隱私權政策適用於您瀏覽{SITE.name}（以下簡稱「本公司」或「我們」）官方網站，以及透過網站上提供的
        Email、LINE 等管道與我們聯繫時，我們對個人資料的蒐集、處理與利用。本網站連結的其他網站（例如 YouTube、Instagram、LINE）不適用本政策，請參考各該網站的隱私權政策。
      </p>
    ),
  },
  {
    title: "二、我們蒐集哪些資料",
    body: (
      <>
        <p>本網站為純資訊展示網站，沒有會員註冊、線上表單或購物功能，也不會主動要求您在網站上輸入個人資料。我們只在以下情況取得您的資料：</p>
        <ul>
          <li>
            <strong>您主動聯繫我們時：</strong>當您寄送 Email 或加入 LINE 洽詢合作，我們會取得您提供的姓名、公司名稱、Email、LINE 帳號、電話及洽詢內容等資料。
          </li>
          <li>
            <strong>網站主機自動記錄：</strong>本網站架設於 GitHub Pages，GitHub 為了維護服務安全與穩定，可能會記錄訪客的 IP 位址、瀏覽器類型、造訪時間等連線資訊。這些紀錄由 GitHub 依其
            <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
              隱私權聲明
            </a>
            處理，本公司無法存取可識別個人的連線紀錄。
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "三、資料的使用目的",
    body: (
      <>
        <p>您主動提供的資料，僅會用於下列目的：</p>
        <ul>
          <li>回覆您的洽詢、提供報價與客製化提案</li>
          <li>執行雙方合作專案所需的聯繫與溝通</li>
          <li>經您同意後，寄送本公司的服務資訊</li>
        </ul>
        <p>我們不會將您的個人資料出售、出租或交換給任何第三方。</p>
      </>
    ),
  },
  {
    title: "四、Cookie 與追蹤技術",
    body: (
      <p>本網站目前沒有使用 Cookie 進行追蹤，也沒有安裝 Google Analytics、Facebook Pixel 等第三方分析或廣告追蹤工具。若日後新增此類工具，我們會更新本政策並在網站上告知。</p>
    ),
  },
  {
    title: "五、資料的分享與揭露",
    body: (
      <>
        <p>除下列情況外，我們不會將您的個人資料提供給第三方：</p>
        <ul>
          <li>事先取得您的同意</li>
          <li>執行合作專案必要時（例如提供給協力的拍攝、活動廠商），並僅限於必要範圍</li>
          <li>依法令規定，或應司法、檢調等政府機關依法要求</li>
        </ul>
      </>
    ),
  },
  {
    title: "六、資料保存與安全",
    body: (
      <p>我們會採取合理的措施保護您的個人資料，避免遭到未經授權的存取、使用或洩漏。您的資料只會保存到完成上述目的所需的期間；洽詢結束且無合作需求後，或依您的要求，我們會刪除相關資料，法令另有規定者除外。</p>
    ),
  },
  {
    title: "七、您的權利",
    body: (
      <>
        <p>依中華民國《個人資料保護法》第 3 條，您對自己的個人資料享有以下權利：</p>
        <ul>
          <li>查詢或請求閱覽</li>
          <li>請求製給複製本</li>
          <li>請求補充或更正</li>
          <li>請求停止蒐集、處理或利用</li>
          <li>請求刪除</li>
        </ul>
        <p>如需行使上述權利，請透過下方聯絡方式與我們聯繫，我們會盡快處理。</p>
      </>
    ),
  },
  {
    title: "八、政策修訂",
    body: <p>本政策可能因法令變更或服務調整而修訂，修訂後的內容會公布於本頁面，並更新頁面上方的「最後更新日期」。</p>,
  },
  {
    title: "九、聯絡我們",
    body: (
      <p>
        對本隱私權政策或您的個人資料有任何疑問，歡迎來信：
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>（聯絡人：{SITE.contact.person}）。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
          <Link href="/" className="flex items-center" aria-label={`${SITE.name} 首頁`}>
            <Image src="/images/logo.png" alt={SITE.name} width={1225} height={746} className="h-11 w-auto md:h-14" />
          </Link>
          <Link href="/" className="text-sm font-medium tracking-wider text-ink transition-colors hover:text-brand-blue">
            ← 回首頁
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-brand-cream/40 py-14 md:py-20">
        <article className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold tracking-widest text-brand-navy md:text-4xl">隱私權政策</h1>
          <p className="mt-2 text-sm text-muted">Privacy Policy｜最後更新日期：{UPDATED}</p>

          <p className="mt-8 leading-relaxed">
            {SITE.name}非常重視您的隱私。本政策說明您使用本網站及與我們聯繫時，我們如何蒐集、使用與保護您的個人資料。
          </p>

          <div className="mt-10 space-y-10">
            {SECTIONS.map((s) => (
              <section
                key={s.title}
                className="space-y-3 leading-relaxed [&_a]:text-brand-blue [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6"
              >
                <h2 className="text-xl font-bold text-brand-navy">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
