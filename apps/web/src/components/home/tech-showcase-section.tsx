"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { TechShowcaseBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function TechShowcaseSection({ block }: { block: TechShowcaseBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 px-4 py-11 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20, filter: reduce ? "none" : "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          whileHover={reduce ? undefined : { y: -2 }}
          className="dc-app-card px-5 py-8 text-center sm:px-8 sm:py-9 lg:px-10"
        >
          <h2
            className="mb-3 text-2xl font-extrabold text-[var(--dc-text-primary)] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.titleAr}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg">
            {block.subtitleAr}
          </p>

          <motion.ul
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
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
                  hidden: { opacity: 0, y: reduce ? 0 : 12, scale: 0.96 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: dcMotion.base, ease: dcMotion.easeSpring },
                  },
                }}
              >
                <motion.span
                  whileHover={reduce ? undefined : { y: -4, scale: 1.03 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="inline-flex cursor-default items-center rounded-full border border-slate-200/90 bg-gradient-to-b from-white to-sky-50/40 px-4 py-2.5 text-sm font-extrabold text-[var(--dc-text-primary)] shadow-sm ring-1 ring-sky-100/50 transition-[box-shadow,border-color] duration-[var(--dc-duration-fast)] hover:border-sky-300/70 hover:shadow-md"
                >
                  {tag}
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
