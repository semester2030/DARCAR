"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CtaBandBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function CtaBandSection({ block }: { block: CtaBandBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="download" className="scroll-mt-24 px-4 pb-14 pt-5 sm:px-6 sm:pb-16 sm:pt-6">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: dcMotion.slow, ease: dcMotion.easeSpring }}
        className="dc-gradient-ring relative mx-auto w-full max-w-5xl rounded-[var(--dc-radius-2xl)] p-[2px] shadow-[var(--dc-shadow-card)]"
      >
        <div className="rounded-[calc(var(--dc-radius-2xl)-2px)] bg-white px-5 py-9 text-center sm:px-10 sm:py-11">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: dcMotion.base }}
          >
            <h2
              className="mb-4 text-2xl font-extrabold text-[var(--dc-text-primary)] sm:text-3xl"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {block.titleAr}
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-sm leading-relaxed text-[var(--dc-text-secondary)] sm:text-base">
              {block.bodyAr}
            </p>
            <motion.a
              href={block.href}
              whileHover={reduce ? undefined : { scale: 1.04, y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] via-[var(--dc-primary)] to-[var(--dc-primary-bright)] px-10 py-3 text-sm font-extrabold text-white shadow-lg ring-1 ring-sky-200/40"
            >
              {block.buttonAr}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
