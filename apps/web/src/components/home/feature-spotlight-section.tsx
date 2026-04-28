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
    border: "border-sky-100 hover:border-sky-300/80",
    iconBg: "from-sky-50 to-cyan-50",
    icon: "text-[var(--dc-primary)]",
  },
  violet: {
    border: "border-indigo-50 hover:border-indigo-200/90",
    iconBg: "from-indigo-50 to-sky-50",
    icon: "text-indigo-600",
  },
  emerald: {
    border: "border-emerald-50 hover:border-emerald-200/80",
    iconBg: "from-emerald-50 to-teal-50",
    icon: "text-[var(--dc-emerald)]",
  },
  gold: {
    border: "border-amber-50 hover:border-amber-200/80",
    iconBg: "from-amber-50 to-orange-50/80",
    icon: "text-[var(--dc-gold)]",
  },
};

function MediaBlock({ item }: { item: FeatureSpotlightItem }) {
  const yt = item.videoUrl ? youtubeEmbedSrc(item.videoUrl) : null;
  const direct = item.videoUrl && isDirectVideoUrl(item.videoUrl);

  const frame =
    "group/media relative overflow-hidden rounded-[var(--dc-radius-2xl)] border border-slate-200/90 bg-slate-50 shadow-[var(--dc-shadow-md)] ring-1 ring-white/80 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-sky-200/90 hover:shadow-[var(--dc-shadow-card-hover)]";

  if (yt) {
    return (
      <div className={frame}>
        <div className="aspect-video w-full overflow-hidden rounded-[calc(var(--dc-radius-2xl)-1px)] bg-black">
          <iframe
            title={item.imageAltAr ?? item.titleAr}
            src={yt}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (direct && item.videoUrl) {
    return (
      <div className={frame}>
        <div className="aspect-video w-full overflow-hidden rounded-[calc(var(--dc-radius-2xl)-1px)] bg-black">
          <video
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/media:scale-[1.03]"
            controls
            playsInline
            preload="metadata"
            poster={item.imageUrl}
          >
            <source src={item.videoUrl} />
          </video>
        </div>
      </div>
    );
  }

  if (item.imageUrl) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.imageAltAr ?? item.titleAr}
          className="aspect-[16/10] w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover/media:scale-[1.04] group-hover/media:brightness-[1.03]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/30"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--dc-radius-2xl)] border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50/40 px-4 text-center text-sm font-semibold leading-relaxed text-[var(--dc-text-secondary)]">
      يمكن إضافة صورة أو فيديو للعرض من لوحة التحرير ليظهر هنا بشكل احترافي.
    </div>
  );
}

export function FeatureSpotlightSection({ block }: { block: FeatureSpotlightBlock }) {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20, filter: reduce ? "none" : "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: dcMotion.slow, ease: dcMotion.easeOut }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2
            className="mb-4 text-2xl font-extrabold text-[var(--dc-text-primary)] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {block.sectionTitleAr}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--dc-text-secondary)] sm:text-lg">
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
  const mediaX = reduce ? 0 : reverse ? 36 : -36;
  const textX = reduce ? 0 : reverse ? -28 : 28;

  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: reduce ? 0 : Math.min(index * 0.08, 0.35),
        duration: dcMotion.slow,
        ease: dcMotion.easeOut,
      }}
      whileHover={reduce ? undefined : { y: -6, transition: { type: "spring", stiffness: 380, damping: 22 } }}
      className={`flex flex-col gap-8 rounded-[var(--dc-radius-2xl)] border border-slate-100 bg-white p-6 shadow-[var(--dc-shadow-sm)] transition-shadow duration-[var(--dc-duration-base)] hover:shadow-[var(--dc-shadow-card)] sm:p-8 lg:flex-row lg:items-stretch lg:gap-10 ${a.border} ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      <motion.div
        className="min-w-0 flex-1 lg:max-w-[52%]"
        initial={{ opacity: 0, x: mediaX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: dcMotion.slow, ease: dcMotion.easeSpring, delay: reduce ? 0 : 0.06 }}
      >
        <MediaBlock item={item} />
      </motion.div>
      <motion.div
        className="flex min-w-0 flex-1 flex-col justify-center"
        initial={{ opacity: 0, x: textX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: dcMotion.slow, ease: dcMotion.easeSpring, delay: reduce ? 0 : 0.12 }}
      >
        <div className="mb-4 flex items-start gap-3">
          <motion.div
            whileHover={reduce ? undefined : { rotate: [0, -6, 6, 0], scale: 1.05 }}
            transition={{ duration: 0.45 }}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-sm ring-1 ring-white/60 ${a.iconBg} ${a.icon}`}
          >
            <DcIcon name={item.iconKey} />
          </motion.div>
          <div>
            <h3
              className="text-xl font-extrabold text-[var(--dc-text-primary)] sm:text-2xl"
              style={{ fontFamily: "var(--dc-font-display)" }}
            >
              {item.titleAr}
            </h3>
          </div>
        </div>
        <div className="space-y-4 text-[var(--dc-text-secondary)]">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-sky-100 bg-sky-50/90 px-3 py-1 text-xs font-extrabold text-[var(--dc-primary-dark)]">
              ما هي؟
            </p>
            <p className="leading-relaxed">{item.whatItIsAr}</p>
          </div>
          <div>
            <p className="mb-2 inline-flex rounded-full border border-emerald-100 bg-emerald-50/90 px-3 py-1 text-xs font-extrabold text-emerald-900">
              دورها لكم
            </p>
            <p className="leading-relaxed">{item.roleAr}</p>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
