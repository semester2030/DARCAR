"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
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
import { AdminMediaField } from "./admin-media-field";

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

function defaultSpotlightItem(): FeatureSpotlightItem {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto ? `feat-${crypto.randomUUID()}` : `feat-${Date.now()}`;
  return {
    id,
    iconKey: "shield",
    accent: "primary",
    titleAr: "ميزة جديدة",
    whatItIsAr: "",
    roleAr: "",
  };
}

function SectionShell({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const didInit = useRef(false);
  useLayoutEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const el = ref.current;
    if (el) el.open = defaultOpen;
  }, [defaultOpen]);
  return (
    <details ref={ref} className="group rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] shadow-sm open:shadow-md">
      <summary className="cursor-pointer list-none px-5 py-4 text-lg font-bold text-[var(--dc-text-primary)] [&::-webkit-details-marker]:hidden">
        <span className="inline-flex w-full items-center justify-between gap-2">
          <span>{title}</span>
          <span className="text-sm font-normal text-[var(--dc-text-secondary)] group-open:rotate-180">▼</span>
        </span>
      </summary>
      <div className="border-t border-[var(--dc-primary-light)] px-5 pb-5 pt-4">{children}</div>
    </details>
  );
}

export function AdminVisualHomeEditor({ doc, onChange }: Props) {
  const setMeta = (patch: Partial<HomePageDocument["meta"]>) => {
    onChange({ ...doc, meta: { ...doc.meta, ...patch } });
  };

  return (
    <div className="space-y-6 pb-4">
      <SectionShell key="meta" title="ميتاداتا الصفحة" defaultOpen={true}>
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
      </SectionShell>

      {doc.blocks.map((block, i) => {
        const key = `${block.type}-${(block as { id?: string }).id ?? i}`;
        const openFirst = i === 0;
        if (block.type === "hero") {
          const b = block as HeroBlock;
          const set = (patch: Partial<HeroBlock>) => onChange(repBlock(doc, i, { ...b, ...patch } as HeroBlock));
          return (
            <SectionShell key={key} title="قسم البطل (Hero)" defaultOpen={openFirst}>
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
            </SectionShell>
          );
        }
        if (block.type === "intro_article") {
          const b = block as IntroArticleBlock;
          const set = (patch: Partial<IntroArticleBlock>) => onChange(repBlock(doc, i, { ...b, ...patch } as IntroArticleBlock));
          return (
            <SectionShell key={key} title="مقال التعريف" defaultOpen={openFirst}>
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
            </SectionShell>
          );
        }
        if (block.type === "feature_spotlight") {
          const b = block as FeatureSpotlightBlock;
          const setBlock = (next: FeatureSpotlightBlock) => onChange(repBlock(doc, i, next));
          const moveItem = (j: number, dir: -1 | 1) => {
            const k = j + dir;
            if (k < 0 || k >= b.items.length) return;
            const items = b.items.slice();
            [items[j], items[k]] = [items[k], items[j]];
            setBlock({ ...b, items });
          };
          const removeItem = (j: number) => {
            if (b.items.length <= 1) {
              window.alert("يجب الإبقاء على ميزة واحدة على الأقل في هذا القسم.");
              return;
            }
            setBlock({ ...b, items: b.items.filter((_, idx) => idx !== j) });
          };
          return (
            <SectionShell
              key={key}
              title="مزايا مفصّلة (صور وفيديو)"
              defaultOpen={openFirst}
            >
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
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setBlock({ ...b, items: [...b.items, defaultSpotlightItem()] })}
                  className="rounded-lg bg-[var(--dc-primary)] px-4 py-2 text-sm font-bold text-[var(--dc-surface)] shadow-sm"
                >
                  + إضافة ميزة
                </button>
              </div>
              <div className="space-y-6 border-t border-[var(--dc-primary-light)] pt-6">
                {b.items.map((item, j) => {
                  const setItem = (patch: Partial<FeatureSpotlightItem>) => {
                    const items = b.items.slice();
                    items[j] = { ...item, ...patch };
                    setBlock({ ...b, items });
                  };
                  return (
                    <div key={item.id} className="rounded-lg bg-[var(--dc-bg)] p-4 ring-1 ring-[var(--dc-primary-light)]/60">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-[var(--dc-primary-dark)]">ميزة {j + 1}: {item.titleAr || item.id}</h3>
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            disabled={j === 0}
                            onClick={() => moveItem(j, -1)}
                            className="rounded border border-[var(--dc-primary-light)] px-2 py-1 text-xs font-semibold disabled:opacity-40"
                            title="أعلى"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            disabled={j >= b.items.length - 1}
                            onClick={() => moveItem(j, 1)}
                            className="rounded border border-[var(--dc-primary-light)] px-2 py-1 text-xs font-semibold disabled:opacity-40"
                            title="أسفل"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(j)}
                            className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 dark:border-red-900 dark:text-red-400"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          {lbl("عنوان الميزة")}
                          <input className={icn()} dir="rtl" value={item.titleAr} onChange={(e) => setItem({ titleAr: e.target.value })} />
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
                          <select className={icn()} value={item.iconKey} onChange={(e) => setItem({ iconKey: e.target.value as IconKey })}>
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
                          <AdminMediaField
                            label="صورة الميزة (رابط أو رفع)"
                            kind="image"
                            value={item.imageUrl}
                            onChange={(next) => setItem({ imageUrl: next })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          {lbl("وصف الصورة (alt)")}
                          <input className={icn()} dir="rtl" value={item.imageAltAr ?? ""} onChange={(e) => setItem({ imageAltAr: e.target.value || undefined })} />
                        </div>
                        <div className="sm:col-span-2">
                          <AdminMediaField
                            label="فيديو (يوتيوب أو ملف — رفع mp4/webm)"
                            kind="video"
                            value={item.videoUrl}
                            onChange={(next) => setItem({ videoUrl: next })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionShell>
          );
        }
        if (block.type === "stats") {
          const b = block as StatsBlock;
          const setBlock = (next: StatsBlock) => onChange(repBlock(doc, i, next));
          return (
            <SectionShell key={key} title="شريط الأرقام" defaultOpen={openFirst}>
              <div className="grid gap-4">
              {b.items.map((it, j) => (
                <div key={j} className="grid gap-2 rounded-md bg-[var(--dc-bg)] p-3 sm:grid-cols-3">
                  <div>
                    {lbl("القيمة")}
                    <input
                      className={icn()}
                      dir="ltr"
                      value={it.value}
                      onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, value: e.target.value };
                        setBlock({ ...b, items });
                      }}
                    />
                  </div>
                  <div>
                    {lbl("لاحقة")}
                    <input
                      className={icn()}
                      dir="rtl"
                      value={it.suffixAr}
                      onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, suffixAr: e.target.value };
                        setBlock({ ...b, items });
                      }}
                    />
                  </div>
                  <div>
                    {lbl("التسمية")}
                    <input
                      className={icn()}
                      dir="rtl"
                      value={it.labelAr}
                      onChange={(e) => {
                        const items = b.items.slice();
                        items[j] = { ...it, labelAr: e.target.value };
                        setBlock({ ...b, items });
                      }}
                    />
                  </div>
                </div>
              ))}
              </div>
            </SectionShell>
          );
        }
        if (block.type === "tech_showcase") {
          const b = block as TechShowcaseBlock;
          const setBlock = (next: TechShowcaseBlock) => onChange(repBlock(doc, i, next));
          return (
            <SectionShell key={key} title="قسم التقنية" defaultOpen={openFirst}>
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
            </SectionShell>
          );
        }
        if (block.type === "cta_band") {
          const b = block as CtaBandBlock;
          const setBlock = (next: CtaBandBlock) => onChange(repBlock(doc, i, next));
          return (
            <SectionShell key={key} title="شريط الدعوة (CTA)" defaultOpen={openFirst}>
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
            </SectionShell>
          );
        }
        if (block.type === "feature_grid") {
          return (
            <SectionShell key={key} title="شبكة المزايا (JSON)" defaultOpen={false}>
              <p className="text-sm text-amber-900 dark:text-amber-200" dir="rtl">
                كتلة <code className="font-mono">feature_grid</code> — عدّلها من تبويب JSON المتقدم.
              </p>
            </SectionShell>
          );
        }
        return (
          <SectionShell key={key} title={`كتلة: ${(block as { type: string }).type}`} defaultOpen={false}>
            <p className="text-sm text-amber-900 dark:text-amber-200" dir="rtl">
              نوع كتلة غير مدعوم في الواجهة البصرية: <code className="font-mono">{(block as { type: string }).type}</code> — استخدم JSON.
            </p>
          </SectionShell>
        );
      })}
    </div>
  );
}
