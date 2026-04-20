"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dcMotion } from "@/theme";

export function ContactForm() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(j?.error ?? "تعذر الإرسال");
        return;
      }
      setSent(true);
      form.reset();
    } catch {
      setError("خطأ في الشبكة");
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
      onSubmit={(ev) => void handleSubmit(ev)}
      className="mx-auto max-w-xl space-y-5 rounded-[var(--dc-radius-xl)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/95 p-6 shadow-[var(--dc-shadow-sm)] backdrop-blur-sm sm:p-8"
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-[var(--dc-text-primary)]">
          الاسم
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-[var(--dc-radius-md)] border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-4 py-3 text-[var(--dc-text-primary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--dc-primary)] focus:ring-2 focus:ring-[var(--dc-primary)]/25"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[var(--dc-text-primary)]">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-[var(--dc-radius-md)] border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-4 py-3 text-[var(--dc-text-primary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--dc-primary)] focus:ring-2 focus:ring-[var(--dc-primary)]/25"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[var(--dc-text-primary)]">
          الرسالة
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-[var(--dc-radius-md)] border border-[var(--dc-primary-light)] bg-[var(--dc-bg)] px-4 py-3 text-[var(--dc-text-primary)] outline-none transition-[border-color,box-shadow] focus:border-[var(--dc-primary)] focus:ring-2 focus:ring-[var(--dc-primary)]/25"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] py-3 text-sm font-bold text-[var(--dc-surface)] shadow-md transition-[transform,box-shadow] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-glow)] disabled:opacity-60"
        disabled={sent || pending}
      >
        {pending ? "جاري الإرسال…" : sent ? "تم الإرسال" : "إرسال الرسالة"}
      </button>
      {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}
      {sent ? (
        <p className="text-center text-sm text-[var(--dc-text-secondary)]">
          تم استلام رسالتك. سنعود إليك قريباً على البريد الذي أدخلته. تُخزَّن الرسائل في سجل الخادم (
          <code className="text-xs" dir="ltr">
            contact-inbox.jsonl
          </code>
          ) ويمكن ربطها لاحقاً ببريد تلقائي.
        </p>
      ) : null}
    </motion.form>
  );
}
