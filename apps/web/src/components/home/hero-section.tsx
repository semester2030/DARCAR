"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroBlock } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";
import { dcMotion } from "@/theme";

const badgeSurfaces = [
  "bg-[var(--dc-stat-violet)] text-[var(--dc-text-primary)] border-sky-200/50",
  "bg-[var(--dc-stat-mint)] text-emerald-900 border-emerald-200/60",
  "bg-[var(--dc-stat-sky)] text-sky-900 border-sky-200/60",
] as const;

export function HeroSection({ block }: { block: HeroBlock }) {
  const reduce = useReducedMotion();
  const blur = reduce ? 0 : dcMotion.enterBlur.amount;
  const yIn = reduce ? 0 : dcMotion.enterBlur.y;

  const item = {
    hidden: { opacity: 0, y: yIn, filter: reduce ? "none" : `blur(${blur}px)` },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: reduce ? 0 : i * dcMotion.stagger,
        duration: dcMotion.slow,
        ease: dcMotion.easeOut,
      },
    }),
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          className="h-80 w-[min(100%,40rem)] rounded-[3rem] blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(34 211 238 / 0.22), transparent 52%), radial-gradient(circle at 70% 60%, rgb(11 124 255 / 0.18), transparent 48%), radial-gradient(circle at 50% 100%, rgb(99 102 241 / 0.08), transparent 40%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={item}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -4,
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }
          }
          className="group dc-app-card relative px-6 py-10 text-center sm:px-10 sm:py-12"
        >
          {/* خط متدرج متحرك خلف الحافة العلوية */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          >
            <div className="dc-gradient-ring h-full w-full opacity-80" />
          </div>

          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={item}
            className="mb-5 inline-flex items-center justify-center rounded-full border border-sky-200/70 bg-sky-50/90 px-4 py-2 text-sm font-bold text-[var(--dc-primary-dark)] shadow-sm backdrop-blur-sm"
          >
            {block.eyebrowAr}
          </motion.p>

          <motion.div custom={2} initial="hidden" animate="show" variants={item} className="mb-2 flex justify-center">
            <span
              className="dc-logo-shine relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--dc-primary-bright)] via-[var(--dc-primary)] to-[var(--dc-primary-dark)] text-xl font-black text-white shadow-lg ring-1 ring-white/30"
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
            className="mb-5 bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] bg-clip-text text-3xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-4xl md:text-5xl"
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
            <motion.a
              href={block.primaryCta.href}
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="group/cta relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] px-8 py-3 text-sm font-bold text-white shadow-[var(--dc-shadow-md)] ring-1 ring-white/20"
            >
              <span className="relative z-10">{block.primaryCta.labelAr}</span>
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.22) 50%, transparent 65%)",
                }}
                aria-hidden
              />
            </motion.a>
            <motion.a
              href={block.secondaryCta.href}
              whileHover={reduce ? undefined : { scale: 1.02, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--dc-primary)]/35 bg-white/90 px-8 py-3 text-sm font-bold text-[var(--dc-primary-dark)] shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-[var(--dc-duration-base)] hover:border-[var(--dc-primary)] hover:bg-sky-50/80 hover:shadow-md"
            >
              {block.secondaryCta.labelAr}
            </motion.a>
          </motion.div>

          <motion.ul
            custom={7}
            initial="hidden"
            animate="show"
            variants={item}
            className="grid gap-3 sm:grid-cols-3"
          >
            {block.badgesAr.map((b, i) => (
              <motion.li
                key={b}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.45 + i * 0.07,
                  duration: dcMotion.base,
                  ease: dcMotion.easeSpring,
                }}
                whileHover={reduce ? undefined : { y: -3, transition: { type: "spring", stiffness: 400, damping: 18 } }}
              >
                <span
                  className={`flex h-full min-h-[4.25rem] items-center justify-center rounded-2xl border px-3 py-3 text-center text-xs font-bold leading-snug shadow-sm transition-shadow duration-[var(--dc-duration-base)] hover:shadow-md sm:text-sm ${badgeSurfaces[i % badgeSurfaces.length]}`}
                >
                  {b}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
