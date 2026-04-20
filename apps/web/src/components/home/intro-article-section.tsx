"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IntroArticleBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function IntroArticleSection({ block }: { block: IntroArticleBlock }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="about-dar-car"
      className="scroll-mt-24 border-b border-[var(--dc-primary-light)]/80 bg-[var(--dc-surface)]/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="mb-4 text-center text-3xl font-bold text-[var(--dc-text-primary)] sm:text-4xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {block.titleAr}
        </motion.h2>
        {block.leadAr ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06, duration: dcMotion.base }}
            className="mb-10 text-center text-lg font-medium leading-relaxed text-[var(--dc-primary-dark)]"
          >
            {block.leadAr}
          </motion.p>
        ) : null}
        <div className="space-y-6 text-justify text-base leading-[1.9] text-[var(--dc-text-secondary)] sm:text-lg">
          {block.paragraphsAr.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: reduce ? 0 : 0.08 + i * 0.05,
                duration: dcMotion.base,
                ease: dcMotion.easeOut,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
