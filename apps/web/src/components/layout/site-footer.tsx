import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--dc-primary)]/15 bg-gradient-to-b from-[var(--dc-primary-dark)] to-[#1a0638] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p
              className="mb-3 text-lg font-extrabold text-white"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {siteConfig.nameAr}
            </p>
            <p className="leading-relaxed text-white/75">
              للمكاتب العقارية ومعارض السيارات — عرض أصولكم على الخريطة، كتالوج غني، وتجربة تواصل تليق بعلامتكم.
            </p>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-white">استكشف</p>
            <ul className="space-y-2 text-white/75">
              {siteConfig.nav.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-white">الشركة</p>
            <ul className="space-y-2 text-white/75">
              {siteConfig.nav.slice(4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-extrabold text-white">قانوني</p>
            <ul className="space-y-2 text-white/75">
              {siteConfig.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-white/60">
              بريد:{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-semibold text-[var(--dc-primary-light)] hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/55">
          © {year} {siteConfig.nameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
