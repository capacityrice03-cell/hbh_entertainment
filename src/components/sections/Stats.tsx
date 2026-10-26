import { STATS } from "@/constants/site";

export default function Stats() {
  return (
    <section className="bg-brand-navy py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-brand-yellow md:text-4xl">{s.value}</p>
            <p className="mt-2 text-sm tracking-wide text-white/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
