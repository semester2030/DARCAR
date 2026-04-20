"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHomeEditor() {
  const router = useRouter();
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/home", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/admin/login?next=/admin/editor");
        return;
      }
      if (!res.ok) {
        setError(await res.text());
        return;
      }
      const data = (await res.json()) as unknown;
      setRaw(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل التحميل");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setSaving(true);
    setMessage(null);
    setError(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      setError("JSON غير صالح — راجع الصياغة.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) {
        const t = await res.text();
        setError(t || `خطأ ${res.status}`);
        return;
      }
      setMessage("تم الحفظ وإعادة توليد الصفحة الرئيسية.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--dc-text-primary)]"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            تحرير الصفحة الرئيسية
          </h1>
          <p className="mt-1 text-sm text-[var(--dc-text-secondary)]">
            يُحفظ الملف <code className="rounded bg-[var(--dc-primary-light-lighter)] px-1">data/home.v1.json</code> عبر
            الـ API — تأكد أن الخادم يملك صلاحية الكتابة على القرص.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] px-4 py-2 text-sm font-semibold text-[var(--dc-primary-dark)] hover:bg-[var(--dc-primary-light-lighter)]"
          >
            عرض الموقع
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] px-4 py-2 text-sm font-semibold text-[var(--dc-text-secondary)] hover:bg-[var(--dc-surface)]"
          >
            خروج
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-[var(--dc-text-secondary)]">جاري التحميل…</p>
      ) : (
        <>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            spellCheck={false}
            className="min-h-[70vh] w-full rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] p-4 font-mono text-sm leading-relaxed text-[var(--dc-text-primary)] outline-none focus:ring-2 focus:ring-[var(--dc-primary)]/30"
            dir="ltr"
            aria-label="محتوى JSON"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] px-6 py-2.5 text-sm font-bold text-[var(--dc-surface)] shadow-md transition-opacity disabled:opacity-50"
            >
              {saving ? "جاري الحفظ…" : "حفظ"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void load()}
              className="rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] px-4 py-2 text-sm font-semibold text-[var(--dc-primary-dark)]"
            >
              إعادة التحميل من الخادم
            </button>
          </div>
          {message ? <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">{message}</p> : null}
          {error ? (
            <p className="mt-3 whitespace-pre-wrap text-sm text-red-700 dark:text-red-400" dir="ltr">
              {error}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
