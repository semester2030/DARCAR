"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { StatsBlock } from "@/lib/home-content";
import { dcMotion } from "@/theme";

const tileClass = [
  "bg-[var(--dc-stat-violet)] border-sky-200/55 text-[var(--dc-text-primary)]",
  "bg-[var(--dc-stat-mint)] border-emerald-200/50 text-emerald-950",
  "bg-[var(--dc-stat-sky)] border-sky-200/50 text-sky-950",
  "bg-[var(--dc-stat-amber)] border-amber-200/60 text-amber-950",
] as const;

export function StatsStripSection({ block }: { block: StatsBlock }) {
  const reduce = useReducedMotion();

  return (
    <section className="px-4 py-7 sm:px-6 sm:py-9">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {block.items.map((s, i) => (
          <motion.div
            key={s.labelAr}
            initial={{ opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "none" : "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{
              delay: reduce ? 0 : i * dcMotion.stagger,
              duration: dcMotion.slow,
              ease: dcMotion.easeOut,
            }}
            whileHover={
              reduce
                ? undefined
                : {
                    y: -6,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 420, damping: 20 },
                  }
            }
            className={`flex cursor-default flex-col items-center justify-center rounded-[var(--dc-radius-2xl)] border px-3 py-6 text-center shadow-[var(--dc-shadow-sm)] transition-shadow duration-[var(--dc-duration-base)] hover:shadow-[var(--dc-shadow-card)] sm:py-8 ${tileClass[i % tileClass.length]}`}
          >
            <p
              className="mb-2 text-2xl font-black tabular-nums sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {s.value}
              <span className="text-xl font-bold opacity-80 sm:text-2xl">{s.suffixAr}</span>
            </p>
            <p className="text-xs font-bold leading-snug opacity-90 sm:text-sm">{s.labelAr}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
