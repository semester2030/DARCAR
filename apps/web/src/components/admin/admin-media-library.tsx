"use client";

import { useCallback, useEffect, useState } from "react";
import { getPublicApiBase } from "@/lib/public-api-url";

export type MediaLibraryKind = "image" | "video" | "all";

type MediaRow = {
  filename: string;
  path: string;
  mime: string;
  size: number;
  mtime: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  kind: MediaLibraryKind;
  onSelect: (publicUrl: string) => void;
};

function formatSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesKind(row: MediaRow, kind: MediaLibraryKind): boolean {
  if (kind === "all") return true;
  if (kind === "image") return row.mime.startsWith("image/");
  return row.mime.startsWith("video/");
}

async function uploadOne(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body: fd });
  const t = await res.text();
  if (!res.ok) throw new Error(t || `HTTP ${res.status}`);
  const j = JSON.parse(t) as { url: string };
  return j.url;
}

export function AdminMediaLibrary({ open, onClose, kind, onSelect }: Props) {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busyName, setBusyName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const publicBase = getPublicApiBase();

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const t = await res.text();
      if (!res.ok) throw new Error(t || `HTTP ${res.status}`);
      const j = JSON.parse(t) as { files?: MediaRow[] };
      setRows(Array.isArray(j.files) ? j.files : []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "فشل تحميل القائمة");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = rows.filter((r) => matchesKind(r, kind));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] shadow-xl"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--dc-primary-light)] px-4 py-3">
          <h2 className="text-lg font-bold text-[var(--dc-text-primary)]">معرض الوسائط</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--dc-primary-light)] px-3 py-1.5 text-sm font-semibold text-[var(--dc-text-secondary)] hover:bg-[var(--dc-bg)]"
          >
            إغلاق
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto p-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={async (e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (!f) return;
              setUploading(true);
              setErr(null);
              try {
                const url = await uploadOne(f);
                await load();
                onSelect(url);
              } catch (x) {
                setErr(x instanceof Error ? x.message : "فشل الرفع");
              } finally {
                setUploading(false);
              }
            }}
            className={`rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
              dragOver
                ? "border-[var(--dc-primary)] bg-[var(--dc-primary-light-lighter)]"
                : "border-[var(--dc-primary-light)] bg-[var(--dc-bg)]"
            }`}
          >
            <p className="text-sm font-semibold text-[var(--dc-text-primary)]">اسحب ملفاً وأفلته هنا</p>
            <p className="mt-1 text-xs text-[var(--dc-text-secondary)]">صور: jpeg/png/webm — فيديو: mp4/webm (حتى ~50 ميجابايت)</p>
            <label className="mt-3 inline-block cursor-pointer">
              <span className="rounded-lg bg-[var(--dc-primary)] px-4 py-2 text-sm font-bold text-[var(--dc-surface)]">
                {uploading ? "جاري الرفع…" : "اختيار ملف"}
              </span>
              <input
                type="file"
                className="sr-only"
                disabled={uploading}
                accept={kind === "video" ? "video/mp4,video/webm" : kind === "image" ? "image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,video/mp4,video/webm"}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  setUploading(true);
                  setErr(null);
                  try {
                    const url = await uploadOne(file);
                    await load();
                    onSelect(url);
                  } catch (x) {
                    setErr(x instanceof Error ? x.message : "فشل الرفع");
                  } finally {
                    setUploading(false);
                  }
                }}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="rounded-lg border border-[var(--dc-primary-light)] px-3 py-1.5 text-sm font-semibold text-[var(--dc-primary-dark)] disabled:opacity-50"
            >
              تحديث القائمة
            </button>
          </div>

          {loading ? <p className="text-sm text-[var(--dc-text-secondary)]">جاري التحميل…</p> : null}
          {err ? (
            <p className="whitespace-pre-wrap text-sm text-red-600 dark:text-red-400" dir="ltr">
              {err}
            </p>
          ) : null}

          {!loading && filtered.length === 0 ? (
            <p className="text-sm text-[var(--dc-text-secondary)]">لا توجد ملفات مطابقة بعد — ارفع وسيطاً أو غيّر نوع التصفية.</p>
          ) : null}

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((r) => {
              const url = publicBase ? `${publicBase}${r.path}` : r.path;
              const isImg = r.mime.startsWith("image/");
              return (
                <li key={r.filename} className="overflow-hidden rounded-lg border border-[var(--dc-primary-light)] bg-[var(--dc-bg)]">
                  <button
                    type="button"
                    className="block w-full text-start"
                    onClick={() => {
                      onSelect(url);
                      onClose();
                    }}
                  >
                    <div className="relative aspect-video bg-[var(--dc-primary-light-lighter)]">
                      {isImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-3xl text-[var(--dc-text-secondary)]">▶</div>
                      )}
                    </div>
                    <div className="space-y-0.5 p-2">
                      <p className="truncate font-mono text-[10px] text-[var(--dc-text-secondary)]" dir="ltr" title={r.filename}>
                        {r.filename}
                      </p>
                      <p className="text-xs text-[var(--dc-text-secondary)]">{formatSize(r.size)}</p>
                    </div>
                  </button>
                  <div className="flex gap-1 border-t border-[var(--dc-primary-light)] p-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded bg-[var(--dc-primary-light-lighter)] py-1 text-center text-xs font-semibold text-[var(--dc-primary-dark)]"
                    >
                      فتح
                    </a>
                    <button
                      type="button"
                      disabled={busyName === r.filename}
                      className="flex-1 rounded border border-red-200 py-1 text-xs font-semibold text-red-700 disabled:opacity-50 dark:border-red-900 dark:text-red-400"
                      onClick={async () => {
                        if (!confirm(`حذف الملف من الخادم؟\n${r.filename}`)) return;
                        setBusyName(r.filename);
                        setErr(null);
                        try {
                          const res = await fetch(`/api/admin/media?name=${encodeURIComponent(r.filename)}`, { method: "DELETE" });
                          const t = await res.text();
                          if (!res.ok) throw new Error(t || `HTTP ${res.status}`);
                          await load();
                        } catch (x) {
                          setErr(x instanceof Error ? x.message : "فشل الحذف");
                        } finally {
                          setBusyName(null);
                        }
                      }}
                    >
                      {busyName === r.filename ? "…" : "حذف"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
