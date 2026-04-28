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
    <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-bl from-[var(--dc-primary-bright)] via-[var(--dc-primary)] to-[var(--dc-primary-dark)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center text-white">
        {breadcrumb?.length ? (
          <nav className="mb-6 text-sm text-white/85" aria-label="مسار التنقل">
            {breadcrumb.map((b, i) => (
              <span key={b.href}>
                {i > 0 ? <span className="mx-2 opacity-60">/</span> : null}
                {i === breadcrumb.length - 1 ? (
                  <span className="font-bold text-white">{b.label}</span>
                ) : (
                  <Link href={b.href} className="transition-colors hover:text-white hover:underline">
                    {b.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: dcMotion.base }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
