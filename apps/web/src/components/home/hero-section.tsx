"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function HeroSection({ block }: { block: HeroBlock }) {
  const reduce = useReducedMotion();

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
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
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center opacity-40">
        <div
          className="h-64 w-[min(100%,42rem)] rounded-full blur-3xl"
          style={{
            background:
              "linear-gradient(90deg, var(--dc-primary-light) 0%, var(--dc-primary) 45%, var(--dc-primary-dark) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={item}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--dc-text-secondary)] sm:text-sm"
        >
          {block.eyebrowAr}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={item}
          className="mb-6 bg-gradient-to-l from-[var(--dc-primary)] via-[var(--dc-primary-dark)] to-[var(--dc-text-primary)] bg-clip-text text-4xl font-bold leading-[1.1] text-transparent sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {block.headlineAr}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={item}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg"
        >
          {block.subheadlineAr}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={item}
          className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={block.primaryCta.href}
            className="group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] px-7 py-2.5 text-sm font-semibold text-[var(--dc-surface)] shadow-[var(--dc-shadow-md)] transition-[transform,box-shadow] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-glow)]"
          >
            <span className="relative z-10">{block.primaryCta.labelAr}</span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
          </a>
          <a
            href={block.secondaryCta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)] px-6 py-2.5 text-sm font-semibold text-[var(--dc-primary-dark)] shadow-[var(--dc-shadow-sm)] transition-[transform,background-color] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:bg-[var(--dc-primary-light-lighter)]"
          >
            {block.secondaryCta.labelAr}
          </a>
        </motion.div>

        <motion.ul
          custom={4}
          initial="hidden"
          animate="show"
          variants={item}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {block.badgesAr.map((b) => (
            <li key={b}>
              <span className="inline-flex items-center rounded-full border border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/90 px-4 py-1.5 text-xs font-medium text-[var(--dc-text-primary)] shadow-[var(--dc-shadow-sm)] backdrop-blur-sm transition-transform duration-[var(--dc-duration-fast)] hover:scale-[1.02]">
                {b}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
