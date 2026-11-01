/** 輸出一段結構化資料（JSON-LD）；把 < 跳脫，避免內容被當成 HTML 標籤 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
