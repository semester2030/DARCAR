import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);

const safeHrefSchema = z.string().min(1).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^https?:\/\//i.test(value) ||
    /^mailto:/i.test(value) ||
    /^tel:/i.test(value),
  "URL_SCHEME_NOT_ALLOWED",
);

const safeMediaUrlSchema = z.string().min(1).refine(
  (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
  "MEDIA_URL_SCHEME_NOT_ALLOWED",
);

const ctaSchema = z
  .object({
    labelAr: z.string().min(1),
    href: safeHrefSchema,
  })
  .passthrough();

const heroBlockSchema = z
  .object({
    type: z.literal("hero"),
    id: z.string().min(1),
    eyebrowAr: z.string(),
    headlineAr: z.string().min(1),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  })
  .passthrough();

const introArticleBlockSchema = z
  .object({
    type: z.literal("intro_article"),
    id: z.string().min(1),
    titleAr: z.string().min(1),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  })
  .passthrough();

const featureItemSchema = z
  .object({
    id: z.string().min(1),
    iconKey: iconKeySchema,
    titleAr: z.string().min(1),
    bodyAr: z.string(),
    accent: accentSchema,
  })
  .passthrough();

const featureGridBlockSchema = z
  .object({
    type: z.literal("feature_grid"),
    id: z.string().min(1),
    sectionTitleAr: z.string().min(1),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  })
  .passthrough();

const featureSpotlightItemSchema = z
  .object({
    id: z.string().min(1),
    iconKey: iconKeySchema,
    titleAr: z.string().min(1),
    accent: accentSchema,
    whatItIsAr: z.string(),
    roleAr: z.string(),
    imageUrl: safeMediaUrlSchema.optional(),
    videoUrl: safeMediaUrlSchema.optional(),
    imageAltAr: z.string().optional(),
  })
  .passthrough();

const featureSpotlightBlockSchema = z
  .object({
    type: z.literal("feature_spotlight"),
    id: z.string().min(1),
    sectionTitleAr: z.string().min(1),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  })
  .passthrough();

const statsBlockSchema = z
  .object({
    type: z.literal("stats"),
    id: z.string().min(1),
    items: z.array(
      z
        .object({
          value: z.string(),
          suffixAr: z.string(),
          labelAr: z.string().min(1),
        })
        .passthrough(),
    ),
  })
  .passthrough();

const techShowcaseBlockSchema = z
  .object({
    type: z.literal("tech_showcase"),
    id: z.string().min(1),
    titleAr: z.string().min(1),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  })
  .passthrough();

const ctaBandBlockSchema = z
  .object({
    type: z.literal("cta_band"),
    id: z.string().min(1),
    titleAr: z.string().min(1),
    bodyAr: z.string(),
    buttonAr: z.string().min(1),
    href: safeHrefSchema,
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

/** تحقق من JSON الصفحة الرئيسية قبل حفظه حتى لا تُخزّن كتل تكسر الصفحة العامة. */
export const homePageJsonSchema = z
  .object({
    version: z.coerce.number().int().refine((value) => value === 1 || value === 2, "UNSUPPORTED_HOME_VERSION"),
    meta: z
      .object({
        titleAr: z.string().min(1),
        descriptionAr: z.string(),
      })
      .passthrough(),
    blocks: z.array(homeBlockSchema),
  })
  .passthrough();

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
