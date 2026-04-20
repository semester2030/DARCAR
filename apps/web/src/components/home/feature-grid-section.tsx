"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FeatureGridBlock, FeatureItem } from "@/lib/home-content";
import { DcIcon } from "@/components/icons/DcIcons";
import { dcMotion } from "@/theme";

const accentStyles: Record<
  FeatureItem["accent"],
  { ring: string; icon: string; hoverBorder: string }
> = {
  primary: {
    ring: "from-[var(--dc-primary)]/25 to-[var(--dc-primary-dark)]/15",
    icon: "text-[var(--dc-primary)]",
    hoverBorder: "hover:border-[var(--dc-primary)]/35",
  },
  violet: {
    ring: "from-[var(--dc-primary-dark)]/20 to-[var(--dc-primary)]/10",
    icon: "text-[var(--dc-primary-dark)]",
    hoverBorder: "hover:border-[var(--dc-primary-dark)]/30",
  },
  emerald: {
    ring: "from-[var(--dc-emerald)]/25 to-[var(--dc-success)]/10",
    icon: "text-[var(--dc-emerald)]",
    hoverBorder: "hover:border-[var(--dc-emerald)]/35",
  },
  gold: {
    ring: "from-[var(--dc-gold)]/30 to-[var(--dc-primary)]/10",
    icon: "text-[var(--dc-gold)]",
    hoverBorder: "hover:border-[var(--dc-gold)]/40",
  },
};

export function FeatureGridSection({ block }: { block: FeatureGridBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="mb-14 text-center"
        >
          <h2
            className="mb-3 text-3xl font-bold text-[var(--dc-text-primary)] sm:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.sectionTitleAr}
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--dc-text-secondary)]">{block.sectionSubtitleAr}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {block.items.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} reduce={!!reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  item,
  index,
  reduce,
}: {
  item: FeatureItem;
  index: number;
  reduce: boolean;
}) {
  const a = accentStyles[item.accent];
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: reduce ? 0 : index * dcMotion.stagger,
        duration: dcMotion.base,
        ease: dcMotion.easeOut,
      }}
      className={`dc-card-interactive group relative overflow-hidden rounded-[var(--dc-radius-xl)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/95 p-6 shadow-[var(--dc-shadow-sm)] backdrop-blur-sm ${a.hoverBorder}`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl ${a.ring}`}
        aria-hidden
      />
      <div className="relative flex gap-4">
        <div
          className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--dc-radius-lg)] bg-gradient-to-br from-[var(--dc-primary-light-lighter)] to-[var(--dc-primary-light)] shadow-inner transition-shadow duration-[var(--dc-duration-base)] group-hover:shadow-[0_0_0_3px_rgb(124_58_237_/_0.18)] ${a.icon}`}
        >
          <DcIcon name={item.iconKey} className="group-hover:scale-110" />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-bold text-[var(--dc-text-primary)]">{item.titleAr}</h3>
          <p className="text-sm leading-relaxed text-[var(--dc-text-secondary)]">{item.bodyAr}</p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-gradient-to-l from-[var(--dc-primary)] to-[var(--dc-primary-dark)] transition-transform duration-[var(--dc-duration-slow)] ease-out group-hover:origin-left group-hover:scale-x-100"
        aria-hidden
      />
    </motion.article>
  );
}
