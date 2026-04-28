"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TechShowcaseBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function TechShowcaseSection({ block }: { block: TechShowcaseBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="mb-4 text-3xl font-bold text-[var(--dc-text-primary)] sm:text-4xl"
          style={{ fontFamily: "var(--dc-font-display)" }}
        >
          {block.titleAr}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: dcMotion.base }}
          className="mx-auto mb-10 max-w-2xl text-[var(--dc-text-secondary)]"
        >
          {block.subtitleAr}
        </motion.p>

        <motion.ul
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            show: {
              transition: { staggerChildren: reduce ? 0 : dcMotion.stagger },
            },
          }}
        >
          {block.tagsAr.map((tag) => (
            <motion.li
              key={tag}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: dcMotion.fast, ease: dcMotion.easeOut },
                },
              }}
            >
              <span className="inline-flex cursor-default items-center rounded-full border border-[var(--dc-primary-light)] bg-[var(--dc-primary-light-lighter)] px-4 py-2 text-sm font-semibold text-[var(--dc-primary-dark)] shadow-sm transition-[transform,box-shadow] duration-[var(--dc-duration-fast)] hover:-translate-y-0.5 hover:shadow-[var(--dc-shadow-sm)]">
                {tag}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
