"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { dcMotion } from "@/theme";

type Props = {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
};

export function SubpageHero({ title, subtitle, breadcrumb }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/40 to-[var(--dc-bg)] px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center">
        {breadcrumb?.length ? (
          <motion.nav
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dcMotion.fast }}
            className="mb-6 text-sm text-[var(--dc-text-muted)]"
            aria-label="مسار التنقل"
          >
            {breadcrumb.map((b, i) => (
              <span key={b.href}>
                {i > 0 ? <span className="mx-2 text-slate-300">/</span> : null}
                {i === breadcrumb.length - 1 ? (
                  <span className="font-bold text-[var(--dc-text-primary)]">{b.label}</span>
                ) : (
                  <Link
                    href={b.href}
                    className="transition-colors hover:text-[var(--dc-primary)] hover:underline"
                  >
                    {b.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20, filter: reduce ? "none" : "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          className="bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: dcMotion.base, ease: dcMotion.easeOut }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
