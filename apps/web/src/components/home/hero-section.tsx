"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroBlock } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";
import { dcMotion } from "@/theme";

const badgeSurfaces = [
  "bg-[var(--dc-stat-violet)] text-[var(--dc-primary-dark)] border-[var(--dc-primary)]/10",
  "bg-[var(--dc-stat-mint)] text-emerald-900 border-emerald-200/60",
  "bg-[var(--dc-stat-sky)] text-sky-900 border-sky-200/60",
] as const;

export function HeroSection({ block }: { block: HeroBlock }) {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduce ? 0 : i * dcMotion.stagger,
        duration: dcMotion.base,
        ease: dcMotion.easeOut,
      },
    }),
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center opacity-50">
        <div
          className="h-72 w-[min(100%,36rem)] rounded-[3rem] blur-3xl"
          style={{
            background: "linear-gradient(135deg, var(--dc-primary-light) 0%, var(--dc-primary-bright) 42%, var(--dc-primary-dark) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={item}
          className="dc-app-card px-6 py-10 text-center sm:px-10 sm:py-12"
        >
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={item}
            className="mb-5 inline-flex items-center justify-center rounded-full border border-[var(--dc-primary)]/15 bg-[var(--dc-primary-light-lighter)] px-4 py-2 text-sm font-bold text-[var(--dc-primary)]"
          >
            {block.eyebrowAr}
          </motion.p>

          <motion.div custom={2} initial="hidden" animate="show" variants={item} className="mb-2">
            <span
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--dc-primary)] to-[var(--dc-primary-dark)] text-xl font-black text-white shadow-lg"
              aria-hidden
            >
              د
            </span>
          </motion.div>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={item}
            className="mb-4 text-sm font-semibold text-[var(--dc-text-muted)]"
          >
            {siteConfig.taglineAr}
          </motion.p>

          <motion.h1
            custom={4}
            initial="hidden"
            animate="show"
            variants={item}
            className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-[var(--dc-primary-dark)] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.headlineAr}
          </motion.h1>

          <motion.p
            custom={5}
            initial="hidden"
            animate="show"
            variants={item}
            className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg"
          >
            {block.subheadlineAr}
          </motion.p>

          <motion.div
            custom={6}
            initial="hidden"
            animate="show"
            variants={item}
            className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <a
              href={block.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--dc-primary)] px-8 py-3 text-sm font-bold text-white shadow-[var(--dc-shadow-md)] transition-[transform,box-shadow] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-glow)] active:translate-y-0"
            >
              {block.primaryCta.labelAr}
            </a>
            <a
              href={block.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--dc-primary)] bg-white px-8 py-3 text-sm font-bold text-[var(--dc-primary)] shadow-sm transition-[transform,background-color] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:bg-[var(--dc-primary-light-lighter)]"
            >
              {block.secondaryCta.labelAr}
            </a>
          </motion.div>

          <motion.ul
            custom={7}
            initial="hidden"
            animate="show"
            variants={item}
            className="grid gap-3 sm:grid-cols-3"
          >
            {block.badgesAr.map((b, i) => (
              <li key={b}>
                <span
                  className={`flex h-full min-h-[4.25rem] items-center justify-center rounded-2xl border px-3 py-3 text-center text-xs font-bold leading-snug shadow-sm sm:text-sm ${badgeSurfaces[i % badgeSurfaces.length]}`}
                >
                  {b}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
