import { SITE } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="bg-brand-navy py-8 text-center text-sm text-white/60">
      <p>
        © {SITE.name} {SITE.nameEn}
      </p>
    </footer>
  );
}
