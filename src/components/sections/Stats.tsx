import Image from "next/image";
import Parallax from "@/components/ui/Parallax";
import { STATS } from "@/constants/site";

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 md:py-24">
      {/* 視差背景照片：上下各預留空間，移動時不露出空白 */}
      <Parallax speed={0.25} className="absolute inset-x-0 -top-56 -bottom-56">
        <Image src="/images/live-event-01.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </Parallax>
      <div className="absolute inset-0 bg-brand-navy/85" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
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
