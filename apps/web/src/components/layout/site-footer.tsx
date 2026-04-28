import Link from "next/link";
import { DarCarLogo } from "@/components/brand/dar-car-logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200/90 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="mb-4 inline-block overflow-hidden rounded-xl ring-1 ring-slate-200/80">
              <DarCarLogo variant="footer" />
            </div>
            <p
              className="mb-2 text-lg font-extrabold text-[var(--dc-text-primary)]"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {siteConfig.nameAr}
            </p>
            <p className="leading-relaxed text-[var(--dc-text-secondary)]">
              منصة للعقارات والسيارات: للأفراد ولمعارض المركبات وللشركات العقارية وللوسطاء — عروض على الخريطة، إدارة عقارات ومبيعات وإيجارات وعملاء وفروع وفريق وتقارير ومخزون.
            </p>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-[var(--dc-text-primary)]">استكشف</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.nav.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-[var(--dc-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-[var(--dc-text-primary)]">الشركة</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.nav.slice(4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-[var(--dc-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-[var(--dc-text-primary)]">قانوني</p>
            <ul className="space-y-2 text-[var(--dc-text-secondary)]">
              {siteConfig.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-[var(--dc-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--dc-text-muted)]">
              بريد:{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-semibold text-[var(--dc-primary)] underline-offset-4 hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-[var(--dc-text-muted)]">
          © {year} {siteConfig.nameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
