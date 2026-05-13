import { z } from "zod";

function isSafePublicHref(value: string): boolean {
  const href = value.trim();
  if (!href) return false;
  if (href.startsWith("#")) return true;
  if (href.startsWith("/") && !href.startsWith("//")) return true;

  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:" || url.protocol === "tel:";
  } catch {
    return false;
  }
}

const idSchema = z.string().min(1);
const publicHrefSchema = z.string().trim().min(1).refine(isSafePublicHref, "UNSAFE_PUBLIC_HREF");
const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);
const ctaSchema = z.object({
  labelAr: z.string(),
  href: publicHrefSchema,
});

const heroBlockSchema = z
  .object({
    type: z.literal("hero"),
    id: idSchema,
    eyebrowAr: z.string(),
    headlineAr: z.string(),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  })
  .passthrough();

const introArticleBlockSchema = z
  .object({
    type: z.literal("intro_article"),
    id: idSchema,
    titleAr: z.string(),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  })
  .passthrough();

const featureItemSchema = z
  .object({
    id: idSchema,
    iconKey: iconKeySchema,
    titleAr: z.string(),
    bodyAr: z.string(),
    accent: accentSchema,
  })
  .passthrough();

const featureGridBlockSchema = z
  .object({
    type: z.literal("feature_grid"),
    id: idSchema,
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  })
  .passthrough();

const featureSpotlightItemSchema = z
  .object({
    id: idSchema,
    iconKey: iconKeySchema,
    titleAr: z.string(),
    accent: accentSchema,
    whatItIsAr: z.string(),
    roleAr: z.string(),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    imageAltAr: z.string().optional(),
  })
  .passthrough();

const featureSpotlightBlockSchema = z
  .object({
    type: z.literal("feature_spotlight"),
    id: idSchema,
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  })
  .passthrough();

const statItemSchema = z.object({
  value: z.string(),
  suffixAr: z.string(),
  labelAr: z.string(),
});

const statsBlockSchema = z
  .object({
    type: z.literal("stats"),
    id: idSchema,
    items: z.array(statItemSchema),
  })
  .passthrough();

const techShowcaseBlockSchema = z
  .object({
    type: z.literal("tech_showcase"),
    id: idSchema,
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  })
  .passthrough();

const ctaBandBlockSchema = z
  .object({
    type: z.literal("cta_band"),
    id: idSchema,
    titleAr: z.string(),
    bodyAr: z.string(),
    buttonAr: z.string(),
    href: publicHrefSchema,
  })
  .passthrough();

const homeBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  introArticleBlockSchema,
  featureGridBlockSchema,
  featureSpotlightBlockSchema,
  statsBlockSchema,
  techShowcaseBlockSchema,
  ctaBandBlockSchema,
]);

/** تحقق بنيوي قبل حفظ JSON الصفحة الرئيسية حتى لا تنكسر الصفحة العامة بمحتوى غير صالح. */
export const homePageJsonSchema = z.object({
  version: z.coerce
    .number()
    .int()
    .refine((version) => version === 1 || version === 2, "UNSUPPORTED_HOME_VERSION"),
  meta: z.object({
    titleAr: z.string().min(1),
    descriptionAr: z.string(),
  }),
  blocks: z.array(homeBlockSchema),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
