import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p
              className="mb-3 text-lg font-bold text-[var(--dc-text-primary)]"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {siteConfig.nameAr}
            </p>
            <p className="leading-relaxed text-[var(--dc-text-secondary)]">
              للمكاتب العقارية ومعارض السيارات — عرض أصولكم على الخريطة، كتالوج غني، وتجربة تواصل تليق بعلامتكم.
            </p>
          </div>
          <div>
            <p className="mb-3 font-bold text-[var(--dc-text-primary)]">استكشف</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.nav.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[var(--dc-primary)] hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-[var(--dc-text-primary)]">الشركة</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.nav.slice(4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[var(--dc-primary)] hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-[var(--dc-text-primary)]">قانوني</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[var(--dc-primary)] hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--dc-text-secondary)]">
              بريد:{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-[var(--dc-primary)] hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-[var(--dc-primary-light)] pt-6 text-center text-xs text-[var(--dc-text-secondary)]">
          © {year} {siteConfig.nameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
