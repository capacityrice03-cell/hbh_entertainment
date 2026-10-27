import Link from "next/link";
import { SITE } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="bg-brand-navy py-8 text-center text-sm text-white/60">
      <p>
        © {SITE.name} {SITE.nameEn}
      </p>
      <p className="mt-2">
        <Link href="/privacy/" className="underline-offset-2 transition-colors hover:text-white hover:underline">
          隱私權政策
        </Link>
      </p>
    </footer>
  );
}
