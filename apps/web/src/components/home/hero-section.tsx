"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DarCarLogo } from "@/components/brand/dar-car-logo";
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
    <section className="relative overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          className="h-72 w-[min(100%,56rem)] rounded-[3rem] blur-3xl sm:h-80"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(34 211 238 / 0.2), transparent 52%), radial-gradient(circle at 70% 60%, rgb(11 124 255 / 0.16), transparent 48%), radial-gradient(circle at 50% 100%, rgb(99 102 241 / 0.07), transparent 40%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={item}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -2,
                  transition: { type: "spring", stiffness: 380, damping: 24 },
                }
          }
          className="group dc-app-card relative px-5 py-8 text-center sm:px-8 sm:py-9 lg:px-10 lg:py-10 lg:text-start"
        >
          <div
            className="pointer-events-none absolute inset-x-6 top-0 h-px overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:inset-x-10 lg:inset-x-12"
            aria-hidden
          >
            <div className="dc-gradient-ring h-full w-full opacity-80" />
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-start lg:gap-x-10 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-x-12">
            {/* عمود الشعار — على الشاشة العريضة يملأ الجانب بدل فراغ وسط الصفحة */}
            <div className="mb-6 flex flex-col items-center lg:mb-0 lg:items-start">
              <motion.p
                custom={1}
                initial="hidden"
                animate="show"
                variants={item}
                className="mb-3 inline-flex items-center justify-center rounded-full border border-sky-200/70 bg-sky-50/90 px-3.5 py-1.5 text-xs font-bold text-[var(--dc-primary-dark)] shadow-sm backdrop-blur-sm sm:text-sm lg:self-start"
              >
                {block.eyebrowAr}
              </motion.p>
              <motion.div
                custom={2}
                initial="hidden"
                animate="show"
                variants={item}
                className="mb-2 flex justify-center lg:justify-start"
              >
                <span className="inline-block overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/70">
                  <DarCarLogo variant="hero" priority className="!h-[4rem] !max-w-[min(100%,14rem)] sm:!h-24 sm:!max-w-[min(100%,17rem)] lg:!h-[5.25rem] lg:!max-w-[min(100%,18rem)]" />
                </span>
              </motion.div>
              <motion.p
                custom={3}
                initial="hidden"
                animate="show"
                variants={item}
                className="text-xs font-semibold leading-snug text-[var(--dc-text-muted)] sm:text-sm lg:max-w-[17rem] lg:text-pretty"
              >
                {siteConfig.taglineAr}
              </motion.p>
            </div>

            <div className="min-w-0">
              <motion.h1
                custom={4}
                initial="hidden"
                animate="show"
                variants={item}
                className="mb-3 bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] bg-clip-text text-2xl font-extrabold leading-[1.18] tracking-tight text-transparent sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.2] xl:text-5xl"
                style={{ fontFamily: "var(--dc-font-display)" }}
              >
                {block.headlineAr}
              </motion.h1>
              <motion.p
                custom={5}
                initial="hidden"
                animate="show"
                variants={item}
                className="mb-6 text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg lg:mb-5 lg:max-w-none xl:text-xl/[1.65]"
              >
                {block.subheadlineAr}
              </motion.p>
              <motion.div
                custom={6}
                initial="hidden"
                animate="show"
                variants={item}
                className="mb-0 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
              >
                <motion.a
                  href={block.primaryCta.href}
                  whileHover={reduce ? undefined : { scale: 1.02, y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="group/cta relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] px-7 py-2.5 text-sm font-bold text-white shadow-[var(--dc-shadow-md)] ring-1 ring-white/20 sm:min-h-12 sm:px-8"
                >
                  <span className="relative z-10">{block.primaryCta.labelAr}</span>
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.22) 50%, transparent 65%)",
                    }}
                    aria-hidden
                  />
                </motion.a>
                <motion.a
                  href={block.secondaryCta.href}
                  whileHover={reduce ? undefined : { scale: 1.02, y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[var(--dc-primary)]/35 bg-white/90 px-7 py-2.5 text-sm font-bold text-[var(--dc-primary-dark)] shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-[var(--dc-duration-base)] hover:border-[var(--dc-primary)] hover:bg-sky-50/80 hover:shadow-md sm:min-h-12 sm:px-8"
                >
                  {block.secondaryCta.labelAr}
                </motion.a>
              </motion.div>
            </div>
          </div>

          <motion.ul
            custom={7}
            initial="hidden"
            animate="show"
            variants={item}
            className="mt-7 grid gap-2.5 sm:grid-cols-3 sm:gap-3 lg:mt-8"
          >
            {block.badgesAr.map((b, i) => (
              <motion.li
                key={b}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.4 + i * 0.06,
                  duration: dcMotion.base,
                  ease: dcMotion.easeSpring,
                }}
                whileHover={reduce ? undefined : { y: -2, transition: { type: "spring", stiffness: 420, damping: 20 } }}
              >
                <span
                  className={`flex h-full min-h-[3.75rem] items-center justify-center rounded-xl border px-2.5 py-2.5 text-center text-[11px] font-bold leading-snug shadow-sm transition-shadow duration-[var(--dc-duration-base)] hover:shadow-md sm:min-h-[4rem] sm:rounded-2xl sm:px-3 sm:text-sm ${badgeSurfaces[i % badgeSurfaces.length]}`}
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
