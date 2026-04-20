"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CtaBandBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function CtaBandSection({ block }: { block: CtaBandBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="download" className="scroll-mt-24 px-4 pb-24 pt-4 sm:px-6 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--dc-radius-xl)] border border-[var(--dc-primary-light)] bg-gradient-to-l from-[var(--dc-primary-dark)] to-[var(--dc-primary)] p-[1px] shadow-[var(--dc-shadow-glow)]"
      >
        <div className="rounded-[calc(var(--dc-radius-xl)-1px)] bg-[var(--dc-surface)]/5 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
          <h2
            className="mb-3 text-2xl font-bold text-[var(--dc-surface)] sm:text-3xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.titleAr}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[var(--dc-primary-light)] sm:text-base">
            {block.bodyAr}
          </p>
          <a
            href={block.href}
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--dc-radius-lg)] bg-[var(--dc-surface)] px-8 py-2.5 text-sm font-bold text-[var(--dc-primary-dark)] shadow-lg transition-[transform,box-shadow] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:shadow-xl"
          >
            {block.buttonAr}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
