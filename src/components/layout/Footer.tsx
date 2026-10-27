import Link from "next/link";
import { SITE } from "@/constants/site";

const LEGAL_LINKS = [
  { label: "隱私權政策", href: "/privacy/" },
  { label: "服務條款", href: "/terms/" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brand-navy py-8 text-center text-sm text-white/60">
      <p>
        © {SITE.name} {SITE.nameEn}
      </p>
      <nav className="mt-2 flex justify-center gap-4">
        {LEGAL_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="underline-offset-2 transition-colors hover:text-white hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
