"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IntroArticleBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function IntroArticleSection({ block }: { block: IntroArticleBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="about-dar-car" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98, filter: reduce ? "none" : "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          whileHover={reduce ? undefined : { y: -3 }}
          className="dc-app-card px-6 py-10 text-center sm:px-10 sm:py-12"
        >
          <h2
            className="mb-4 text-2xl font-extrabold text-[var(--dc-text-primary)] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.titleAr}
          </h2>
          {block.leadAr ? (
            <p className="mb-8 text-base font-semibold leading-relaxed text-[var(--dc-primary)] sm:text-lg">
              {block.leadAr}
            </p>
          ) : null}
          <div className="space-y-5 text-start text-base leading-[1.85] text-[var(--dc-text-secondary)] sm:text-lg">
            {block.paragraphsAr.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: reduce ? 0 : 0.08 + i * 0.06,
                  duration: dcMotion.base,
                  ease: dcMotion.easeSpring,
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
