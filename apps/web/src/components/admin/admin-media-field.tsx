"use client";

import { useCallback, useId, useState } from "react";
import { AdminMediaLibrary, type MediaLibraryKind } from "./admin-media-library";

type Props = {
  label: string;
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  kind: MediaLibraryKind;
  urlPlaceholder?: string;
  disabled?: boolean;
};

async function uploadOne(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body: fd });
  const t = await res.text();
  if (!res.ok) throw new Error(t || `HTTP ${res.status}`);
  const j = JSON.parse(t) as { url: string };
  return j.url;
}

export function AdminMediaField({ label, value, onChange, kind, urlPlaceholder, disabled }: Props) {
  const [libOpen, setLibOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputId = useId();

  const accept =
    kind === "video"
      ? "video/mp4,video/webm"
      : kind === "image"
        ? "image/jpeg,image/png,image/webp"
        : "image/jpeg,image/png,image/webp,video/mp4,video/webm";

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      setBusy(true);
      setErr(null);
      try {
        const url = await uploadOne(file);
        onChange(url);
      } catch (x) {
        setErr(x instanceof Error ? x.message : "فشل الرفع");
      } finally {
        setBusy(false);
      }
    },
    [onChange],
  );

  const isDirectVideo = Boolean(value && /\.(mp4|webm)(\?|$)/i.test(value));
  const isYoutube = Boolean(value && (/youtu\.be\//.test(value) || /youtube\.com\//.test(value)));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <label htmlFor={inputId} className="block text-sm font-semibold text-[var(--dc-text-primary)]">
          {label}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={disabled || busy}
            onClick={() => setLibOpen(true)}
            className="rounded-md border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--dc-primary-dark)] hover:bg-[var(--dc-primary-light-lighter)] disabled:opacity-50"
          >
            معرض الوسائط
          </button>
          {value ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChange(undefined)}
              className="rounded-md border border-[var(--dc-primary-light)] px-3 py-1.5 text-xs font-semibold text-[var(--dc-text-secondary)] hover:bg-[var(--dc-bg)] disabled:opacity-50"
            >
              إزالة الرابط
            </button>
          ) : null}
        </div>
      </div>

      <input
        id={inputId}
        className="w-full rounded-lg border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-3 py-2 text-sm text-[var(--dc-text-primary)] outline-none focus:ring-2 focus:ring-[var(--dc-primary)]/25"
        dir="ltr"
        placeholder={urlPlaceholder ?? "https://… أو ارفع ملفاً"}
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value.trim() || undefined)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={async (e) => {
          e.preventDefault();
          setDragOver(false);
          await handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-lg border-2 border-dashed px-3 py-4 transition-colors ${
          dragOver ? "border-[var(--dc-primary)] bg-[var(--dc-primary-light-lighter)]" : "border-[var(--dc-primary-light)]/70 bg-[var(--dc-bg)]"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer text-sm font-semibold text-[var(--dc-primary-dark)]">
            {busy ? "جاري الرفع…" : "رفع من الجهاز"}
            <input
              type="file"
              accept={accept}
              className="sr-only"
              disabled={disabled || busy}
              onChange={async (e) => {
                await handleFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <span className="text-xs text-[var(--dc-text-secondary)]">أو اسحب الملف وأفلته هنا</span>
        </div>
      </div>

      {value ? (
        <div className="overflow-hidden rounded-lg border border-[var(--dc-primary-light)] bg-[var(--dc-primary-light-lighter)]/40">
          <p className="border-b border-[var(--dc-primary-light)] px-2 py-1 text-[10px] font-medium text-[var(--dc-text-secondary)]" dir="ltr">
            معاينة
          </p>
          <div className="flex max-h-56 items-center justify-center p-2">
            {isDirectVideo ? (
              <video src={value} className="max-h-52 w-full rounded object-contain" controls muted playsInline />
            ) : isYoutube ? (
              <p className="px-2 text-center text-sm text-[var(--dc-text-secondary)]" dir="rtl">
                رابط يوتيوب — استخدم «فتح الرابط» للمعاينة في المتصفح.
              </p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="max-h-52 max-w-full rounded object-contain" />
            )}
          </div>
          <div className="border-t border-[var(--dc-primary-light)] p-2 text-center">
            <a href={value} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[var(--dc-primary-dark)] underline">
              فتح الرابط في تبويب جديد
            </a>
          </div>
        </div>
      ) : null}

      {err ? (
        <p className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400" dir="ltr">
          {err}
        </p>
      ) : null}

      <AdminMediaLibrary
        open={libOpen}
        onClose={() => setLibOpen(false)}
        kind={kind}
        onSelect={(url) => {
          onChange(url);
          setLibOpen(false);
        }}
      />
    </div>
  );
}
