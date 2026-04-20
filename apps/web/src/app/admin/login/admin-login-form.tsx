"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(j?.error ?? "فشل تسجيل الدخول");
        return;
      }
      const next = searchParams.get("next") ?? "/admin/editor";
      router.replace(next.startsWith("/admin") ? next : "/admin/editor");
      router.refresh();
    } catch {
      setError("خطأ في الشبكة");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1
        className="text-2xl font-bold text-[var(--dc-text-primary)]"
        style={{ fontFamily: "var(--dc-font-display)" }}
      >
        دخول لوحة التحرير
      </h1>
      <p className="mt-2 text-sm text-[var(--dc-text-secondary)]">
        أدخل كلمة المرور المعرفة في خادم الويب (<code className="text-xs">ADMIN_PASSWORD</code>).
      </p>
      <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-pass" className="mb-1 block text-sm font-semibold text-[var(--dc-text-primary)]">
            كلمة المرور
          </label>
          <input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[var(--dc-radius-md)] border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-4 py-3 text-[var(--dc-text-primary)] outline-none focus:ring-2 focus:ring-[var(--dc-primary)]/30"
            dir="ltr"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] py-3 text-sm font-bold text-[var(--dc-surface)] disabled:opacity-50"
        >
          {pending ? "…" : "دخول"}
        </button>
      </form>
    </div>
  );
}
