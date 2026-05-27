import { z } from "zod";

const text = z.string();
const nonEmptyText = z.string().min(1);
const iconKey = z.enum(["map", "media", "shield", "spark"]);
const accent = z.enum(["primary", "violet", "emerald", "gold"]);

function hasControlChars(value: string): boolean {
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

function isSafeHref(value: string): boolean {
  const href = value.trim();
  if (!href || hasControlChars(href)) return false;

  try {
    const parsed = new URL(href, "https://dar-car.invalid");
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function isSafeMediaUrl(value: string): boolean {
  const url = value.trim();
  if (!url || hasControlChars(url)) return false;
  if (url.startsWith("/") && !url.startsWith("//")) return true;

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const safeHref = z.string().trim().refine(isSafeHref, "UNSAFE_HREF");
const safeMediaUrl = z.string().trim().refine(isSafeMediaUrl, "UNSAFE_MEDIA_URL");

const ctaSchema = z.object({
  labelAr: text,
  href: safeHref,
});

const heroBlockSchema = z.object({
  type: z.literal("hero"),
  id: nonEmptyText,
  eyebrowAr: text,
  headlineAr: text,
  subheadlineAr: text,
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  badgesAr: z.array(text),
});

const introArticleBlockSchema = z.object({
  type: z.literal("intro_article"),
  id: nonEmptyText,
  titleAr: text,
  leadAr: text.optional(),
  paragraphsAr: z.array(text),
});

const featureItemSchema = z.object({
  id: nonEmptyText,
  iconKey,
  titleAr: text,
  bodyAr: text,
  accent,
});

const featureGridBlockSchema = z.object({
  type: z.literal("feature_grid"),
  id: nonEmptyText,
  sectionTitleAr: text,
  sectionSubtitleAr: text,
  items: z.array(featureItemSchema),
});

const featureSpotlightItemSchema = z.object({
  id: nonEmptyText,
  iconKey,
  titleAr: text,
  accent,
  whatItIsAr: text,
  roleAr: text,
  imageUrl: safeMediaUrl.optional(),
  videoUrl: safeMediaUrl.optional(),
  imageAltAr: text.optional(),
});

const featureSpotlightBlockSchema = z.object({
  type: z.literal("feature_spotlight"),
  id: nonEmptyText,
  sectionTitleAr: text,
  sectionSubtitleAr: text,
  items: z.array(featureSpotlightItemSchema),
});

const statsBlockSchema = z.object({
  type: z.literal("stats"),
  id: nonEmptyText,
  items: z.array(
    z.object({
      value: text,
      suffixAr: text,
      labelAr: text,
    }),
  ),
});

const techShowcaseBlockSchema = z.object({
  type: z.literal("tech_showcase"),
  id: nonEmptyText,
  titleAr: text,
  subtitleAr: text,
  tagsAr: z.array(text),
});

const ctaBandBlockSchema = z.object({
  type: z.literal("cta_band"),
  id: nonEmptyText,
  titleAr: text,
  bodyAr: text,
  buttonAr: text,
  href: safeHref,
});

const homeBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  introArticleBlockSchema,
  featureGridBlockSchema,
  featureSpotlightBlockSchema,
  statsBlockSchema,
  techShowcaseBlockSchema,
  ctaBandBlockSchema,
]);

/** يتحقق من JSON الصفحة الرئيسية بنفس شكل الكتل التي يعرضها الموقع العام. */
export const homePageJsonSchema = z.object({
  version: z.coerce.number().int().positive(),
  meta: z.object({
    titleAr: nonEmptyText,
    descriptionAr: text,
  }),
  blocks: z.array(homeBlockSchema),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
