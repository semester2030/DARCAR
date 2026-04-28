import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--dc-text-secondary)]">
        404
      </p>
      <h1
        className="mt-4 bg-gradient-to-l from-[var(--dc-primary-bright)] via-[var(--dc-primary)] to-[var(--dc-primary-dark)] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
        style={{ fontFamily: "var(--dc-font-display)" }}
      >
        الصفحة غير موجودة
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[var(--dc-text-secondary)]">
        الرابط قد يكون قديماً أو غير صحيح. ارجع إلى {siteConfig.nameAr} من الصفحة الرئيسية.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center justify-center rounded-[var(--dc-radius-lg)] bg-gradient-to-l from-[var(--dc-primary-dark)] to-[var(--dc-primary)] px-8 py-2.5 text-sm font-bold text-white shadow-[var(--dc-shadow-md)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-glow)]"
      >
        الصفحة الرئيسية
      </Link>
    </div>
  );
}
