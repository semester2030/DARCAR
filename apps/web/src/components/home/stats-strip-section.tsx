"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { StatsBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

export function StatsStripSection({ block }: { block: StatsBlock }) {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/80 px-4 py-12 shadow-inner backdrop-blur-md sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {block.items.map((s, i) => (
          <motion.div
            key={s.labelAr}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: reduce ? 0 : i * dcMotion.stagger,
              duration: dcMotion.base,
              ease: dcMotion.easeSpring,
            }}
            className="text-center"
          >
            <p
              className="mb-1 text-3xl font-bold tabular-nums text-[var(--dc-primary)] sm:text-4xl"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {s.value}
              <span className="text-2xl text-[var(--dc-text-secondary)] sm:text-3xl">{s.suffixAr}</span>
            </p>
            <p className="text-xs font-medium text-[var(--dc-text-secondary)] sm:text-sm">{s.labelAr}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
