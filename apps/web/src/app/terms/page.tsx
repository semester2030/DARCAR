import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHero } from "@/components/site/subpage-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "شروط استخدام موقع وتطبيق دار كار — نص داخلي قابل للمراجعة القانونية.",
};

export default function TermsPage() {
  return (
    <>
      <SubpageHero
        title="الشروط والأحكام"
        subtitle="هذا النص تعريفي ويجب مراجعته مع مستشار قانوني قبل الاعتماد الرسمي."
        breadcrumb={[
          { label: "الرئيسية", href: "/" },
          { label: "الشروط", href: "/terms" },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-[var(--dc-text-secondary)] sm:px-6 sm:py-16">
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">١. المقدمة</h2>
          <p className="mt-3 leading-relaxed">
            مرحباً بك في {siteConfig.nameAr}. باستخدامك لموقعنا الإلكتروني أو تطبيقاتنا أو أي خدمة مرتبطة بنا، فإنك
            توافق على الالتزام بهذه الشروط. إذا لم توافق على أي بند، يرجى عدم استخدام الخدمات.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٢. الترخيص والاستخدام</h2>
          <p className="mt-3 leading-relaxed">
            نمنحك ترخيصاً محدوداً وغير حصري وغير قابل للتحويل لاستخدام الواجهات العامة لـ{siteConfig.nameAr} وفقاً
            للغرض المعلن. يُحظر إساءة الاستخدام، أو محاولة تعطيل الأنظمة، أو استخراج البيانات بطرق غير مصرح بها، أو
            استخدام الخدمة لأغراض مخالفة للأنظمة المعمول بها في المملكة العربية السعودية أو أي اختصاص قضائي ينطبق
            عليك.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٣. المحتوى والإعلانات</h2>
          <p className="mt-3 leading-relaxed">
            قد يعرض المستخدمون أو الشركاء محتوى إعلانات (عقارات، مركبات، وغيرها). أنت المسؤول عن دقة المعلومات
            التي تنشرها، وعن امتلاكك للحقوق اللازمة للوسائط. نحتفظ بحق إزالة أي محتوى يخالف السياسات أو القانون دون
            إشعار مسبق عند الاقتضاء.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٤. إخلاء المسؤولية</h2>
          <p className="mt-3 leading-relaxed">
            تُقدَّم الخدمات «كما هي» و«حسب التوفر» ضمن حدود تشغيلية معقولة. لا نضمن خلو الخدمة من الانقطاعات أو
            الأخطاء. لن نكون مسؤولين عن أي أضرار غير مباشرة أو تبعية تنشأ عن استخدامك للخدمة، ضمن الحدود التي
            يسمح بها القانون.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٥. التعديلات</h2>
          <p className="mt-3 leading-relaxed">
            قد نُحدّث هذه الشروط من وقت لآخر. استمرارك في الاستخدام بعد نشر التعديلات يُعد موافقة على النسخة
            المحدثة، ما لم نُعلن خلاف ذلك.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--dc-text-primary)]">٦. التواصل</h2>
          <p className="mt-3 leading-relaxed">
            لأسئلة قانونية تتعلق بهذه الشروط يمكنك التواصل عبر{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className="font-medium text-[var(--dc-primary)]">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>
        <p className="pt-6 text-center text-sm">
          <Link href="/privacy" className="font-semibold text-[var(--dc-primary)] hover:underline">
            سياسة الخصوصية
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
