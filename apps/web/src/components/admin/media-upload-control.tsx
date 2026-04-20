"use client";

import { useState } from "react";

type Props = {
  label: string;
  accept?: string;
  onUploaded: (url: string) => void;
  disabled?: boolean;
};

export function MediaUploadControl({ label, accept = "image/jpeg,image/png,image/webp,video/mp4,video/webm", onUploaded, disabled }: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-[var(--dc-text-primary)]">{label}</label>
      <input
        type="file"
        accept={accept}
        disabled={disabled || busy}
        className="block w-full max-w-md cursor-pointer text-sm text-[var(--dc-text-secondary)] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--dc-primary-light-lighter)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--dc-primary-dark)]"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          setErr(null);
          try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/admin/media", { method: "POST", body: fd });
            const t = await res.text();
            if (!res.ok) {
              throw new Error(t || `HTTP ${res.status}`);
            }
            const j = JSON.parse(t) as { url: string };
            onUploaded(j.url);
          } catch (x) {
            setErr(x instanceof Error ? x.message : "فشل الرفع");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      {busy ? <p className="text-xs text-[var(--dc-text-secondary)]">جاري الرفع…</p> : null}
      {err ? (
        <p className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400" dir="ltr">
          {err}
        </p>
      ) : null}
    </div>
  );
}
