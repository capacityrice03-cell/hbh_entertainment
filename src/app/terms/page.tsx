import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `服務條款｜${SITE.name} ${SITE.nameEn}`,
  description: `${SITE.name}網站與服務使用條款。`,
};

const UPDATED = "2026 年 10 月 27 日";

const SECTIONS: LegalSection[] = [
  {
    title: "一、條款的接受",
    body: (
      <p>
        歡迎使用{SITE.name}（以下簡稱「本公司」或「我們」）的網站及相關應用程式與服務（以下合稱「本服務」）。當您瀏覽或使用本服務，即表示您已閱讀、了解並同意遵守本條款。若您不同意本條款的任何內容，請停止使用本服務。
      </p>
    ),
  },
  {
    title: "二、服務內容",
    body: (
      <>
        <p>本服務提供本公司的介紹與服務資訊，包括商業影像拍攝、頻道經營企劃、業配拍攝置入、EFP 直播系統、活動舉辦與新聞媒體操作等，以及洽詢合作的聯繫管道。</p>
        <p>
          網站上的服務說明、案例與數據僅供參考，不構成要約。實際合作內容、費用、時程與權利義務，以雙方另行簽訂的合約或報價單為準；合約與本條款不一致時，以合約為準。
        </p>
      </>
    ),
  },
  {
    title: "三、使用者的義務",
    body: (
      <>
        <p>使用本服務時，您同意不從事下列行為：</p>
        <ul>
          <li>提供不實資料，或冒用他人名義與我們聯繫</li>
          <li>侵害本公司或他人的智慧財產權、隱私權或其他權利</li>
          <li>以任何方式干擾、破壞本服務的正常運作，或未經授權存取本服務的系統</li>
          <li>利用本服務從事任何違反中華民國法令或公序良俗的行為</li>
        </ul>
      </>
    ),
  },
  {
    title: "四、智慧財產權",
    body: (
      <p>
        本服務上的所有內容，包括文字、圖片、影片、標誌（Logo）、版面設計及程式碼，其著作權、商標權等智慧財產權均屬本公司或原權利人所有。未經本公司事先書面同意，您不得重製、改作、散布、公開傳輸或作商業使用。案例中出現的品牌與藝人肖像，其權利屬各該權利人所有。
      </p>
    ),
  },
  {
    title: "五、個人資料保護",
    body: (
      <p>
        我們如何蒐集、使用與保護您的個人資料，請參閱本公司的<Link href="/privacy/">隱私權政策</Link>。
      </p>
    ),
  },
  {
    title: "六、第三方服務與連結",
    body: (
      <p>本服務可能包含連往第三方網站或服務的連結（例如 YouTube、Instagram、LINE），也可能使用第三方提供的服務。這些第三方的內容與做法不受本公司控制，您使用時應遵守各該第三方的條款與隱私權政策，本公司不對其負責。</p>
    ),
  },
  {
    title: "七、免責聲明",
    body: (
      <>
        <p>本服務依「現況」提供。本公司會盡力維持資訊正確與服務穩定，但不保證：</p>
        <ul>
          <li>本服務不會中斷、沒有錯誤，或不會受到病毒等有害程式影響</li>
          <li>網站上的所有資訊都完整、正確且即時</li>
        </ul>
        <p>在法律允許的範圍內，對於因使用或無法使用本服務所造成的任何直接或間接損害，本公司不負賠償責任。</p>
      </>
    ),
  },
  {
    title: "八、服務的變更與終止",
    body: <p>本公司得隨時修改、暫停或終止本服務的全部或一部分，無須事先通知。若您違反本條款，本公司得停止提供您服務。</p>,
  },
  {
    title: "九、條款修訂",
    body: <p>本公司得隨時修訂本條款，修訂後的內容會公布於本頁面，並更新頁面上方的「最後更新日期」。修訂後您繼續使用本服務，即視為您同意修訂後的條款。</p>,
  },
  {
    title: "十、準據法與管轄法院",
    body: <p>本條款的解釋與適用，以中華民國法律為準據法。因本條款或本服務所生的爭議，雙方同意以本公司所在地的地方法院為第一審管轄法院。</p>,
  },
  {
    title: "十一、聯絡我們",
    body: (
      <p>
        對本服務條款有任何疑問，歡迎來信：<a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>（聯絡人：{SITE.contact.person}）。
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="服務條款"
      titleEn="Terms of Service"
      updated={UPDATED}
      intro={`以下條款說明您使用${SITE.name}網站及相關服務時，雙方的權利與義務。使用前請詳細閱讀。`}
      sections={SECTIONS}
    />
  );
}
