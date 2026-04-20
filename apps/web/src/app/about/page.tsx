import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SubpageHero } from "@/components/site/subpage-hero";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على رؤية دار كار: منصة موحّدة للعقارات والسيارات بتجربة رقمية احترافية مصممة للسوق السعودي.",
};

const pillars = [
  {
    title: "رؤية موحّدة",
    body: "جمع مسار العميل العقاري ومعرض السيارات في منتج واحد يقلل الاحتكاك ويرفع جودة العرض.",
  },
  {
    title: "جودة تقنية",
    body: "أداء عالٍ، أمان للبيانات، واستعداد للتوسع — لأن الثقة الرقمية جزء من هوية العلامة.",
  },
  {
    title: "تجربة عربية أصيلة",
    body: "RTL كامل، خطوط عربية واضحة، ولغة واجهة تناسب جمهورنا المحلي دون اختصار.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <SubpageHero
        title="من نحن"
        subtitle="دار كار منصة رقمية تهدف إلى تمكين المكاتب العقارية ومعارض السيارات من العرض والتواصل بأسلوب عصري وموثوق."
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن", href: "/about" },
        ]}
      />
      <div className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 sm:py-20">
        <section className="max-w-none text-[var(--dc-text-secondary)]">
          <h2
            className="text-2xl font-bold text-[var(--dc-text-primary)]"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            قصتنا
          </h2>
          <p className="mt-4 text-base sm:text-lg">
            نؤمن بأن السوق السعودي يستحق أدوات تعكس سرعته وتنوعه: خرائط دقيقة، وسائط غنية، ومسارات
            واضحة للمستخدم النهائي ولصاحب العمل في آن واحد. {siteConfig.nameAr} تجمع هذه العناصر في
            تجربة واحدة متناسقة مع هوية بصرية قوية.
          </p>
        </section>

        <section>
          <h2
            className="mb-8 text-center text-2xl font-bold text-[var(--dc-text-primary)]"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            ما الذي نميّز به؟
          </h2>
          <ul className="grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => (
              <li
                key={p.title}
                className="dc-card-interactive rounded-[var(--dc-radius-xl)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/90 p-6 text-center shadow-[var(--dc-shadow-sm)]"
              >
                <h3 className="text-lg font-bold text-[var(--dc-primary-dark)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--dc-text-secondary)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[var(--dc-radius-xl)] border border-[var(--dc-primary-light)] bg-gradient-to-l from-[var(--dc-primary-light-lighter)] to-[var(--dc-surface)] p-8 text-center">
          <p className="text-[var(--dc-text-secondary)]">
            جاهز للعودة للصفحة الرئيسية واستكشاف المزايا التقنية؟
          </p>
          <Link
            href="/#tech"
            className="mt-4 inline-flex items-center justify-center rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] px-6 py-2.5 text-sm font-bold text-[var(--dc-surface)] shadow-md transition-transform hover:-translate-y-0.5"
          >
            القوة التقنية
          </Link>
        </section>
      </div>
    </>
  );
}
