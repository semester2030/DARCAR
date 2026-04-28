import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SubpageHero } from "@/components/site/subpage-hero";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "دار كار منصة سعودية تخدم المكاتب العقارية ومعارض السيارات بتجربة عرض وتواصل موحّدة تليق بعلامتكم.",
};

const pillars = [
  {
    title: "رؤية موحّدة",
    body: "جمع مسار العميل في العقارات والسيارات في تجربة واحدة تقلّل الاحتكاك وتبرز جودة عروضكم.",
  },
  {
    title: "جودة العرض",
    body: "صور وفيديو وخرائط واضحة — لأن الانطباع الأول غالباً ما يُقرر في ثوانٍ أمام العميل.",
  },
  {
    title: "تجربة عربية كاملة",
    body: "لغة وواجهة تناسب جمهوركم المحلي، مع احترام اتجاه القراءة والصياغة التي يتوقعها العميل السعودي.",
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
            نؤمن بأن السوق السعودي يستحق أدوات تعكس تنوعه وسرعته: خرائط دقيقة، وسائط غنية، ومسارات واضحة للمستخدم
            ولصاحب العمل في آن واحد. {siteConfig.nameAr} تجمع هذه العناصر في تجربة واحدة متناسقة مع هوية بصرية
            قوية لعلامتكم.
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
                className="dc-card-interactive dc-app-card p-6 text-center"
              >
                <h3 className="text-lg font-bold text-[var(--dc-primary-dark)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--dc-text-secondary)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="dc-app-card bg-gradient-to-l from-[var(--dc-primary-light-lighter)] to-[var(--dc-surface)] p-8 text-center">
          <p className="text-[var(--dc-text-secondary)]">استكشفوا على الصفحة الرئيسية ما تقدّمه المنصة لقطاعكم.</p>
          <Link
            href="/#services"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--dc-primary)] px-8 py-3 text-sm font-extrabold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            ما نقدّمه
          </Link>
        </section>
      </div>
    </>
  );
}
