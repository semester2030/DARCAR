import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SubpageHero } from "@/components/site/subpage-hero";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "دار كار منصة سعودية للعقارات والسيارات: أفراد، معارض سيارات، شركات عقارية، ووسطاء — عرض على الخريطة وإدارة أعمال متكاملة.",
};

const pillars = [
  {
    title: "رؤية موحّدة",
    body: "جمع مسار العميل في العقارات والسيارات في تجربة واحدة — للفرد وللمعرض وللشركة وللوسيط — تقلّل الاحتكاك وتبرز جودة العرض.",
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
        subtitle="دار كار منصة رقمية للعقارات والسيارات: تمكّن الأفراد ومعارض السيارات والشركات العقارية والوسطاء من العرض على الخريطة وإدارة العقود والمبيعات والفريق بأسلوب عصري وموثوق."
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
            نؤمن بأن السوق السعودي يستحق أدوات تعكس تنوعه: من يبيع سيارته مرة، ومن يدير معرضاً، ومن يمثّل شركة عقارية أو وسيطاً مستقلاً. {siteConfig.nameAr} تجمع الاستكشاف والعرض مع طبقة إدارة أعمال
            (عقارات، مبيعات، إيجارات، عملاء، فروع، فريق، تقارير، مخزون) في تجربة واحدة متناسقة.
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
                <h3 className="text-lg font-bold text-[var(--dc-text-primary)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--dc-text-secondary)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="dc-app-card bg-gradient-to-l from-sky-50/90 to-white p-8 text-center">
          <p className="text-[var(--dc-text-secondary)]">استكشفوا على الصفحة الرئيسية ما تقدّمه المنصة لفئتكم ولقطاعكم.</p>
          <Link
            href="/#services"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] to-[var(--dc-primary)] px-8 py-3 text-sm font-extrabold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-glow)]"
          >
            ما نقدّمه
          </Link>
        </section>
      </div>
    </>
  );
}
