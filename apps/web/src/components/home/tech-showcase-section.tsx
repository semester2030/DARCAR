"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TechShowcaseBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function TechShowcaseSection({ block }: { block: TechShowcaseBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="dc-app-card px-6 py-10 text-center sm:px-10 sm:py-12"
        >
          <h2
            className="mb-4 text-2xl font-extrabold text-[var(--dc-primary-dark)] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.titleAr}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg">
            {block.subtitleAr}
          </p>

          <motion.ul
            className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
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
                <span className="inline-flex cursor-default items-center rounded-full border-2 border-[var(--dc-primary)]/12 bg-[var(--dc-primary-light-lighter)] px-4 py-2.5 text-sm font-extrabold text-[var(--dc-primary-dark)] shadow-sm transition-[transform,box-shadow] duration-[var(--dc-duration-fast)] hover:-translate-y-0.5 hover:border-[var(--dc-primary)]/25 hover:shadow-md">
                  {tag}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
