"use client";

import type {
  CtaBandBlock,
  FeatureSpotlightBlock,
  FeatureSpotlightItem,
  HeroBlock,
  HomeBlock,
  HomePageDocument,
  IconKey,
  IntroArticleBlock,
  StatsBlock,
  TechShowcaseBlock,
} from "@/lib/home-content";
import { MediaUploadControl } from "./media-upload-control";

const iconOptions: IconKey[] = ["map", "media", "shield", "spark"];
const accentOptions: FeatureSpotlightItem["accent"][] = ["primary", "violet", "emerald", "gold"];

type Props = {
  doc: HomePageDocument;
  onChange: (next: HomePageDocument) => void;
};

function icn() {
  return "w-full rounded-lg border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-3 py-2 text-sm text-[var(--dc-text-primary)] outline-none focus:ring-2 focus:ring-[var(--dc-primary)]/25";
}

function lbl(t: string) {
  return <label className="mb-1 block text-xs font-semibold text-[var(--dc-text-secondary)]">{t}</label>;
}

function repBlock(doc: HomePageDocument, i: number, b: HomeBlock): HomePageDocument {
  const blocks = doc.blocks.slice();
  blocks[i] = b;
  return { ...doc, blocks };
}

export function AdminVisualHomeEditor({ doc, onChange }: Props) {
  const setMeta = (patch: Partial<HomePageDocument["meta"]>) => {
    onChange({ ...doc, meta: { ...doc.meta, ...patch } });
  };

  return (
    <div className="space-y-10 pb-24">
      <section className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">ميتاداتا الصفحة</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            {lbl("عنوان الموقع (عربي)")}
            <input className={icn()} dir="rtl" value={doc.meta.titleAr} onChange={(e) => setMeta({ titleAr: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            {lbl("وصف مختصر (عربي)")}
            <textarea
              className={`${icn()} min-h-[88px]`}
              dir="rtl"
              value={doc.meta.descriptionAr}
              onChange={(e) => setMeta({ descriptionAr: e.target.value })}
            />
          </div>
        </div>
      </section>

      {doc.blocks.map((block, i) => {
        const key = `${block.type}-${(block as { id?: string }).id ?? i}`;
        if (block.type === "hero") {
          const b = block as HeroBlock;
          const set = (patch: Partial<HeroBlock>) => onChange(repBlock(doc, i, { ...b, ...patch } as HeroBlock));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">قسم البطل (Hero)</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {lbl("سطر علوي (eyebrow)")}
                  <input className={icn()} dir="rtl" value={b.eyebrowAr} onChange={(e) => set({ eyebrowAr: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  {lbl("العنوان الرئيسي")}
                  <input className={icn()} dir="rtl" value={b.headlineAr} onChange={(e) => set({ headlineAr: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  {lbl("العنوان الفرعي")}
                  <textarea className={`${icn()} min-h-[72px]`} dir="rtl" value={b.subheadlineAr} onChange={(e) => set({ subheadlineAr: e.target.value })} />
                </div>
                <div>
                  {lbl("زر أساسي — النص")}
                  <input className={icn()} dir="rtl" value={b.primaryCta.labelAr} onChange={(e) => set({ primaryCta: { ...b.primaryCta, labelAr: e.target.value } })} />
                </div>
                <div>
                  {lbl("زر أساسي — الرابط")}
                  <input className={icn()} dir="ltr" value={b.primaryCta.href} onChange={(e) => set({ primaryCta: { ...b.primaryCta, href: e.target.value } })} />
                </div>
                <div>
                  {lbl("زر ثانوي — النص")}
                  <input className={icn()} dir="rtl" value={b.secondaryCta.labelAr} onChange={(e) => set({ secondaryCta: { ...b.secondaryCta, labelAr: e.target.value } })} />
                </div>
                <div>
                  {lbl("زر ثانوي — الرابط")}
                  <input className={icn()} dir="ltr" value={b.secondaryCta.href} onChange={(e) => set({ secondaryCta: { ...b.secondaryCta, href: e.target.value } })} />
                </div>
                <div className="sm:col-span-2">
                  {lbl("شارات (سطر لكل شارة)")}
                  <textarea
                    className={`${icn()} min-h-[96px]`}
                    dir="rtl"
                    value={b.badgesAr.join("\n")}
                    onChange={(e) =>
                      set({
                        badgesAr: e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            </section>
          );
        }
        if (block.type === "intro_article") {
          const b = block as IntroArticleBlock;
          const set = (patch: Partial<IntroArticleBlock>) => onChange(repBlock(doc, i, { ...b, ...patch } as IntroArticleBlock));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">مقال التعريف</h2>
              <div className="grid gap-4">
                <div>
                  {lbl("العنوان")}
                  <input className={icn()} dir="rtl" value={b.titleAr} onChange={(e) => set({ titleAr: e.target.value })} />
                </div>
                <div>
                  {lbl("المقدمة (اختياري)")}
                  <textarea className={`${icn()} min-h-[64px]`} dir="rtl" value={b.leadAr ?? ""} onChange={(e) => set({ leadAr: e.target.value || undefined })} />
                </div>
                <div>
                  {lbl("الفقرات (فقرة فارغة بين كل فقرة)")}
                  <textarea
                    className={`${icn()} min-h-[200px]`}
                    dir="rtl"
                    value={b.paragraphsAr.join("\n\n")}
                    onChange={(e) =>
                      set({
                        paragraphsAr: e.target.value
                          .split(/\n\n+/)
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            </section>
          );
        }
        if (block.type === "feature_spotlight") {
          const b = block as FeatureSpotlightBlock;
          const setBlock = (next: FeatureSpotlightBlock) => onChange(repBlock(doc, i, next));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">مزايا مفصّلة (صور وفيديو)</h2>
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {lbl("عنوان القسم")}
                  <input className={icn()} dir="rtl" value={b.sectionTitleAr} onChange={(e) => setBlock({ ...b, sectionTitleAr: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  {lbl("وصف القسم")}
                  <textarea className={`${icn()} min-h-[72px]`} dir="rtl" value={b.sectionSubtitleAr} onChange={(e) => setBlock({ ...b, sectionSubtitleAr: e.target.value })} />
                </div>
              </div>
              <div className="space-y-8 border-t border-[var(--dc-primary-light)] pt-6">
                {b.items.map((item, j) => {
                  const setItem = (patch: Partial<FeatureSpotlightItem>) => {
                    const items = b.items.slice();
                    items[j] = { ...item, ...patch };
                    setBlock({ ...b, items });
                  };
                  return (
                    <div key={item.id} className="rounded-lg bg-[var(--dc-bg)] p-4 ring-1 ring-[var(--dc-primary-light)]/60">
                      <h3 className="mb-3 text-sm font-bold text-[var(--dc-primary-dark)]">ميزة: {(item as { titleAr?: string }).titleAr || item.id}</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          {lbl("عنوان الميزة")}
                          <input
                            className={icn()}
                            dir="rtl"
                            value={(item as { titleAr?: string }).titleAr ?? ""}
                            onChange={(e) => setItem({ titleAr: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("ما هي الميزة؟")}
                          <textarea className={`${icn()} min-h-[64px]`} dir="rtl" value={item.whatItIsAr} onChange={(e) => setItem({ whatItIsAr: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("دورها في أعمالكم")}
                          <textarea className={`${icn()} min-h-[64px]`} dir="rtl" value={item.roleAr} onChange={(e) => setItem({ roleAr: e.target.value })} />
                        </div>
                        <div>
                          {lbl("أيقونة")}
                          <select
                            className={icn()}
                            value={item.iconKey}
                            onChange={(e) => setItem({ iconKey: e.target.value as IconKey })}
                          >
                            {iconOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          {lbl("لون التمييز")}
                          <select
                            className={icn()}
                            value={item.accent}
                            onChange={(e) => setItem({ accent: e.target.value as FeatureSpotlightItem["accent"] })}
                          >
                            {accentOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("رابط الصورة (أو ارفع ملفاً)")}
                          <input className={`${icn()} mb-2`} dir="ltr" value={item.imageUrl ?? ""} onChange={(e) => setItem({ imageUrl: e.target.value || undefined })} />
                          <MediaUploadControl label="رفع صورة" onUploaded={(url) => setItem({ imageUrl: url })} />
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("وصف الصورة (alt)")}
                          <input className={icn()} dir="rtl" value={item.imageAltAr ?? ""} onChange={(e) => setItem({ imageAltAr: e.target.value || undefined })} />
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("رابط فيديو (يوتيوب أو .mp4) — أو ارفع فيديو")}
                          <input className={`${icn()} mb-2`} dir="ltr" value={item.videoUrl ?? ""} onChange={(e) => setItem({ videoUrl: e.target.value || undefined })} />
                          <MediaUploadControl label="رفع فيديو (mp4/webm)" accept="video/mp4,video/webm" onUploaded={(url) => setItem({ videoUrl: url })} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }
        if (block.type === "stats") {
          const b = block as StatsBlock;
          const setBlock = (next: StatsBlock) => onChange(repBlock(doc, i, next));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">شريط الأرقام</h2>
              <div className="grid gap-4">
                {b.items.map((it, j) => (
                  <div key={j} className="grid gap-2 rounded-md bg-[var(--dc-bg)] p-3 sm:grid-cols-3">
                    <div>
                      {lbl("القيمة")}
                      <input className={icn()} dir="ltr" value={it.value} onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, value: e.target.value };
                        setBlock({ ...b, items });
                      }} />
                    </div>
                    <div>
                      {lbl("لاحقة")}
                      <input className={icn()} dir="rtl" value={it.suffixAr} onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, suffixAr: e.target.value };
                        setBlock({ ...b, items });
                      }} />
                    </div>
                    <div>
                      {lbl("التسمية")}
                      <input className={icn()} dir="rtl" value={it.labelAr} onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, labelAr: e.target.value };
                        setBlock({ ...b, items });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (block.type === "tech_showcase") {
          const b = block as TechShowcaseBlock;
          const setBlock = (next: TechShowcaseBlock) => onChange(repBlock(doc, i, next));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">قسم التقنية</h2>
              <div className="grid gap-4">
                <div>
                  {lbl("العنوان")}
                  <input className={icn()} dir="rtl" value={b.titleAr} onChange={(e) => setBlock({ ...b, titleAr: e.target.value })} />
                </div>
                <div>
                  {lbl("الوصف")}
                  <textarea className={`${icn()} min-h-[80px]`} dir="rtl" value={b.subtitleAr} onChange={(e) => setBlock({ ...b, subtitleAr: e.target.value })} />
                </div>
                <div>
                  {lbl("وسوم (سطر لكل وسم)")}
                  <textarea
                    className={`${icn()} min-h-[120px]`}
                    dir="ltr"
                    value={b.tagsAr.join("\n")}
                    onChange={(e) =>
                      setBlock({
                        ...b,
                        tagsAr: e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            </section>
          );
        }
        if (block.type === "cta_band") {
          const b = block as CtaBandBlock;
          const setBlock = (next: CtaBandBlock) => onChange(repBlock(doc, i, next));
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[var(--dc-text-primary)]">شريط الدعوة (CTA)</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {lbl("العنوان")}
                  <input className={icn()} dir="rtl" value={b.titleAr} onChange={(e) => setBlock({ ...b, titleAr: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  {lbl("النص")}
                  <textarea className={`${icn()} min-h-[80px]`} dir="rtl" value={b.bodyAr} onChange={(e) => setBlock({ ...b, bodyAr: e.target.value })} />
                </div>
                <div>
                  {lbl("نص الزر")}
                  <input className={icn()} dir="rtl" value={b.buttonAr} onChange={(e) => setBlock({ ...b, buttonAr: e.target.value })} />
                </div>
                <div>
                  {lbl("رابط الزر")}
                  <input className={icn()} dir="ltr" value={b.href} onChange={(e) => setBlock({ ...b, href: e.target.value })} />
                </div>
              </div>
            </section>
          );
        }
        if (block.type === "feature_grid") {
          return (
            <section key={key} className="rounded-[var(--dc-radius-lg)] border border-amber-200 bg-amber-50/40 p-5 dark:bg-amber-950/20">
              <p className="text-sm text-amber-900 dark:text-amber-200" dir="rtl">
                كتلة <code className="font-mono">feature_grid</code> — عدّلها من تبويب JSON المتقدم.
              </p>
            </section>
          );
        }
        return (
          <section key={key} className="rounded-[var(--dc-radius-lg)] border border-amber-200 bg-amber-50/40 p-5 dark:bg-amber-950/20">
            <p className="text-sm text-amber-900 dark:text-amber-200" dir="rtl">
              نوع كتلة غير مدعوم في الواجهة البصرية: <code className="font-mono">{(block as { type: string }).type}</code> — استخدم JSON.
            </p>
          </section>
        );
      })}
    </div>
  );
}
