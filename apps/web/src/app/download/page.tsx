import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHero } from "@/components/site/subpage-hero";
import { storeUrls } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "تحميل التطبيق",
  description: "حمّل تطبيق دار كار من App Store أو Google Play.",
};

export default function DownloadPage() {
  const { iosAppStoreUrl, googlePlayUrl } = storeUrls;
  return (
    <>
      <SubpageHero
        title="تحميل التطبيق"
        subtitle="روابط المتاجر الرسمية — حدّث المعرفات في متغيرات البيئة عند نشر التطبيق الفعلي."
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "التحميل", href: "/download" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--dc-radius-lg)] bg-[var(--dc-text-primary)] px-8 py-3 text-sm font-bold text-[var(--dc-surface)] shadow-md transition-transform hover:-translate-y-0.5"
          >
            App Store
          </a>
          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--dc-radius-lg)] border-2 border-[var(--dc-primary)] bg-transparent px-8 py-3 text-sm font-bold text-[var(--dc-primary)] transition-transform hover:-translate-y-0.5"
          >
            Google Play
          </a>
        </div>
        <p className="mt-10 text-center text-sm leading-relaxed text-[var(--dc-text-secondary)]">
          يمكن تخصيص الروابط عبر{" "}
          <code className="rounded bg-[var(--dc-primary-light-lighter)] px-1" dir="ltr">
            NEXT_PUBLIC_IOS_APP_STORE_URL
          </code>{" "}
          و{" "}
          <code className="rounded bg-[var(--dc-primary-light-lighter)] px-1" dir="ltr">
            NEXT_PUBLIC_GOOGLE_PLAY_URL
          </code>{" "}
          في ملف البيئة قبل البناء.
        </p>
        <p className="mt-8 text-center">
          <Link href="/" className="text-sm font-semibold text-[var(--dc-primary)] hover:underline">
            العودة للرئيسية
          </Link>
        </p>
      </div>
    </>
  );
}
