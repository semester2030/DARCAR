import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHero } from "@/components/site/subpage-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "كيف تتعامل دار كار مع البيانات الشخصية — نص داخلي قابل للمراجعة القانونية.",
};

export default function PrivacyPage() {
  return (
    <>
      <SubpageHero
        title="سياسة الخصوصية"
        subtitle="هذا النص تعريفي ويجب صياغته واعتماده مع مستشار خصوصية قبل الإنتاج."
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "الخصوصية", href: "/privacy" },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-[var(--dc-text-secondary)] sm:px-6 sm:py-16">
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">١. من نحن</h2>
          <p className="mt-3 leading-relaxed">
            تشرح هذه السياسة كيف تجمع {siteConfig.nameAr} وتستخدم وتخزن وتشارك المعلومات عند استخدامك لموقعنا
            وتطبيقاتنا. «البيانات الشخصية» تعني أي معلومات ترتبط بشخص محدد أو قابل للتحديد.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٢. البيانات التي قد نجمعها</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed">
            <li>بيانات الحساب والتواصل (مثل الاسم والبريد) عندما تملأ نماذج التواصل أو تُنشئ حساباً.</li>
            <li>بيانات الاستخدام والتشخيص (مثل نوع الجهاز والمتصفح) لتحسين الأداء والأمان.</li>
            <li>محتوى الإعلانات والوسائط التي ترفعها كمستخدم مسجّل أو شريك.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٣. الأساس القانوني والأغراض</h2>
          <p className="mt-3 leading-relaxed">
            نعالج البيانات لتقديم الخدمة، والرد على طلباتك، وتحسين المنتج، والامتثال للالتزامات القانونية، وحماية
            حقوقنا والمستخدمين. عند الحاجة سنطلب موافقتك الصريحة (مثل تسويق اختياري أو ملفات تعريف غير ضرورية).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٤. المشاركة والتخزين</h2>
          <p className="mt-3 leading-relaxed">
            قد نستخدم مزودي بنية تحتية سحابية داخل أو خارج المملكة وفق عقود تعالج بموجبها البيانات وفق أحكام
            نظام حماية البيانات الشخصية ولائحته حيث ينطبق. لا نبيع بياناتك الشخصية لأطراف ثالثة لأغراض تسويقية
            لها.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٥. الاحتفاظ والأمان</h2>
          <p className="mt-3 leading-relaxed">
            نحتفظ بالبيانات للمدة اللازمة لتحقيق الأغراض المذكورة أو كما يقتضيه القانون. نطبّق تدابير أمن وتشغيل
            معقولة؛ ومع ذلك لا يوجد نقل أو تخزين إلكتروني خالٍ من المخاطر بالكامل.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٦. حقوقك</h2>
          <p className="mt-3 leading-relaxed">
            قد يشمل ذلك، حسب السياق القانوني: طلب الاطلاع أو التصحيح أو الحذف، أو تقييد المعالجة، أو الاعتراض، أو
            سحب الموافقة حيث ينطبق ذلك. لطلبات تتعلق بالخصوصية راسلنا على{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-[var(--dc-primary)]">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٧. التحديثات</h2>
          <p className="mt-3 leading-relaxed">
            قد نُحدّث هذه السياسة. سنعرض تاريخ «آخر تحديث» عند إدخال ذلك في النظام، ونشجّعك على مراجعتها دورياً.
          </p>
        </section>
        <p className="pt-6 text-center text-sm">
          <Link href="/terms" className="font-semibold text-[var(--dc-primary)] hover:underline">
            الشروط والأحكام
          </Link>
          <span className="mx-2 opacity-40">|</span>
          <Link href="/" className="font-semibold text-[var(--dc-primary)] hover:underline">
            الرئيسية
          </Link>
        </p>
      </article>
    </>
  );
}
