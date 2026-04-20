"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FeatureSpotlightBlock, FeatureSpotlightItem } from "@/lib/home-content";
import { DcIcon } from "@/components/icons/DcIcons";
import { dcMotion } from "@/theme";
import { isDirectVideoUrl, youtubeEmbedSrc } from "@/lib/video-embed";

const accentStyles: Record<
  FeatureSpotlightItem["accent"],
  { border: string; iconBg: string; icon: string }
> = {
  primary: {
    border: "border-[var(--dc-primary-light)] hover:border-[var(--dc-primary)]/35",
    iconBg: "from-[var(--dc-primary-light-lighter)] to-[var(--dc-primary-light)]",
    icon: "text-[var(--dc-primary)]",
  },
  violet: {
    border: "border-[var(--dc-primary-light)] hover:border-[var(--dc-primary-dark)]/30",
    iconBg: "from-[var(--dc-primary-light)] to-[var(--dc-primary-light-lighter)]",
    icon: "text-[var(--dc-primary-dark)]",
  },
  emerald: {
    border: "border-[var(--dc-primary-light)] hover:border-[var(--dc-emerald)]/35",
    iconBg: "from-emerald-50 to-[var(--dc-primary-light-lighter)]",
    icon: "text-[var(--dc-emerald)]",
  },
  gold: {
    border: "border-[var(--dc-primary-light)] hover:border-[var(--dc-gold)]/40",
    iconBg: "from-amber-50 to-[var(--dc-primary-light-lighter)]",
    icon: "text-[var(--dc-gold)]",
  },
};

function MediaBlock({ item }: { item: FeatureSpotlightItem }) {
  const yt = item.videoUrl ? youtubeEmbedSrc(item.videoUrl) : null;
  const direct = item.videoUrl && isDirectVideoUrl(item.videoUrl);

  if (yt) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-black shadow-inner">
        <iframe
          title={item.imageAltAr ?? item.titleAr}
          src={yt}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (direct && item.videoUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] bg-black shadow-inner">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={item.imageUrl}
        >
          <source src={item.videoUrl} />
        </video>
      </div>
    );
  }

  if (item.imageUrl) {
    return (
      <div className="overflow-hidden rounded-[var(--dc-radius-lg)] border border-[var(--dc-primary-light)] shadow-md">
        {/* روابط CDN من الاستديو — أي نطاق؛ next/image يحتاج allowlist لكل مزود */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.imageAltAr ?? item.titleAr}
          className="aspect-[16/10] w-full object-cover transition-transform duration-[var(--dc-duration-slow)] hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--dc-radius-lg)] border border-dashed border-[var(--dc-primary-light)] bg-[var(--dc-primary-light-lighter)]/50 text-sm text-[var(--dc-text-secondary)]">
      أضف من الاستديو: <span className="mx-1 font-semibold text-[var(--dc-primary)]">imageUrl</span> أو{" "}
      <span className="font-semibold text-[var(--dc-primary)]">videoUrl</span> في ملف المحتوى
    </div>
  );
}

export function FeatureSpotlightSection({ block }: { block: FeatureSpotlightBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: dcMotion.base, ease: dcMotion.easeOut }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-3 text-3xl font-bold text-[var(--dc-text-primary)] sm:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.sectionTitleAr}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg">
            {block.sectionSubtitleAr}
          </p>
        </motion.div>

        <ul className="flex list-none flex-col gap-16 sm:gap-20 lg:gap-24">
          {block.items.map((item, index) => (
            <SpotlightRow key={item.id} item={item} index={index} reduce={!!reduce} reverse={index % 2 === 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpotlightRow({
  item,
  index,
  reduce,
  reverse,
}: {
  item: FeatureSpotlightItem;
  index: number;
  reduce: boolean;
  reverse: boolean;
}) {
  const a = accentStyles[item.accent];
  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: reduce ? 0 : Math.min(index * 0.06, 0.3),
        duration: dcMotion.slow,
        ease: dcMotion.easeOut,
      }}
      className={`dc-card-interactive flex flex-col gap-8 rounded-[var(--dc-radius-xl)] border bg-[var(--dc-surface)]/95 p-6 shadow-[var(--dc-shadow-sm)] backdrop-blur-sm sm:p-8 lg:flex-row lg:items-stretch lg:gap-10 ${a.border} ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="min-w-0 flex-1 lg:max-w-[52%]">
        <MediaBlock item={item} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--dc-radius-lg)] bg-gradient-to-br ${a.iconBg} ${a.icon}`}
          >
            <DcIcon name={item.iconKey} />
          </div>
          <div>
            <h3
              className="text-xl font-bold text-[var(--dc-text-primary)] sm:text-2xl"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {item.titleAr}
            </h3>
          </div>
        </div>
        <div className="space-y-4 text-[var(--dc-text-secondary)]">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--dc-primary)]">ما هي؟</p>
            <p className="leading-relaxed">{item.whatItIsAr}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--dc-primary-dark)]">دورها</p>
            <p className="leading-relaxed">{item.roleAr}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
