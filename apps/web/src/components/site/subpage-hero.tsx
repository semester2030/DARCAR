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
    <section className="relative overflow-hidden border-b border-[var(--dc-primary-light)] bg-gradient-to-b from-[var(--dc-primary-light-lighter)]/80 to-transparent px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--dc-primary-light) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl">
        {breadcrumb?.length ? (
          <nav className="mb-6 text-sm text-[var(--dc-text-secondary)]" aria-label="مسار التنقل">
            {breadcrumb.map((b, i) => (
              <span key={b.href}>
                {i > 0 ? <span className="mx-2 opacity-50">/</span> : null}
                {i === breadcrumb.length - 1 ? (
                  <span className="font-medium text-[var(--dc-text-primary)]">{b.label}</span>
                ) : (
                  <Link href={b.href} className="transition-colors hover:text-[var(--dc-primary)]">
                    {b.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="text-3xl font-bold text-[var(--dc-text-primary)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: dcMotion.base }}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--dc-text-secondary)]"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
