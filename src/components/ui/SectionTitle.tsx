export default function SectionTitle({
  title,
  en,
  description,
  light = false,
  compact = false,
}: {
  title: string;
  en: string;
  description?: string;
  light?: boolean;
  /** 縮小與下方內容的間距（精簡版區塊用） */
  compact?: boolean;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${compact ? "mb-7" : "mb-12"}`}>
      <p
        className={`text-xs font-semibold tracking-[0.3em] uppercase ${
          light ? "text-brand-yellow" : "text-brand-blue"
        }`}
      >
        {en}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold tracking-wide md:text-4xl ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 flex w-24 gap-1">
        <span className="h-1 flex-1 rounded-full bg-brand-sky" />
        <span className="h-1 flex-1 rounded-full bg-brand-yellow" />
        <span className="h-1 flex-1 rounded-full bg-brand-green" />
      </div>
      {description && (
        <p className={`mt-5 leading-relaxed ${light ? "text-white/80" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
