import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SubpageHero } from "@/components/site/subpage-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق دار كار — نستقبل اقتراحاتكم واستفساراتكم.",
};

export default function ContactPage() {
  return (
    <>
      <SubpageHero
        title="تواصل معنا"
        subtitle="نرحب بملاحظاتكم وشراكاتكم. املأ النموذج أدناه أو راسلنا مباشرة على البريد."
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "تواصل", href: "/contact" },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-right">
          <div>
            <p className="text-sm font-semibold text-[var(--dc-text-secondary)]">البريد المباشر</p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="mt-1 text-lg font-bold text-[var(--dc-primary)] underline-offset-4 transition-colors hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--dc-text-secondary)] transition-colors hover:text-[var(--dc-primary)]"
          >
            ← العودة للرئيسية
          </Link>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
