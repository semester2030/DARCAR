"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CtaBandBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function CtaBandSection({ block }: { block: CtaBandBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="download" className="scroll-mt-24 px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-8">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[var(--dc-radius-2xl)] bg-gradient-to-br from-[var(--dc-primary-bright)] via-[var(--dc-primary)] to-[var(--dc-primary-dark)] p-[2px] shadow-[var(--dc-shadow-glow)]"
      >
        <div className="rounded-[calc(var(--dc-radius-2xl)-2px)] bg-gradient-to-b from-white/12 to-transparent px-6 py-12 text-center sm:px-10 sm:py-14">
          <h2
            className="mb-4 text-2xl font-extrabold text-white sm:text-3xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.titleAr}
          </h2>
          <p className="mx-auto mb-9 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
            {block.bodyAr}
          </p>
          <a
            href={block.href}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-10 py-3 text-sm font-extrabold text-[var(--dc-primary-dark)] shadow-lg transition-[transform,box-shadow] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:shadow-xl"
          >
            {block.buttonAr}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
