import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);

const ctaSchema = z
  .object({
    labelAr: z.string(),
    href: z.string(),
  })
  .passthrough();

const heroBlockSchema = z
  .object({
    type: z.literal("hero"),
    id: z.string().min(1),
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
    id: z.string().min(1),
    titleAr: z.string(),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  })
  .passthrough();

const featureItemSchema = z
  .object({
    id: z.string().min(1),
    iconKey: iconKeySchema,
    titleAr: z.string(),
    bodyAr: z.string(),
    accent: accentSchema,
  })
  .passthrough();

const featureGridBlockSchema = z
  .object({
    type: z.literal("feature_grid"),
    id: z.string().min(1),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  })
  .passthrough();

const featureSpotlightItemSchema = z
  .object({
    id: z.string().min(1),
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
    id: z.string().min(1),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  })
  .passthrough();

const statItemSchema = z
  .object({
    value: z.string(),
    suffixAr: z.string(),
    labelAr: z.string(),
  })
  .passthrough();

const statsBlockSchema = z
  .object({
    type: z.literal("stats"),
    id: z.string().min(1),
    items: z.array(statItemSchema),
  })
  .passthrough();

const techShowcaseBlockSchema = z
  .object({
    type: z.literal("tech_showcase"),
    id: z.string().min(1),
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  })
  .passthrough();

const ctaBandBlockSchema = z
  .object({
    type: z.literal("cta_band"),
    id: z.string().min(1),
    titleAr: z.string(),
    bodyAr: z.string(),
    buttonAr: z.string(),
    href: z.string(),
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

/** تحقق من شكل المحتوى قبل حفظه حتى لا يُنشر JSON يكسر الصفحة الرئيسية. */
export const homePageJsonSchema = z.object({
  version: z.coerce
    .number()
    .int()
    .refine((version) => version === 1 || version === 2, "Unsupported home payload version"),
  meta: z
    .object({
      titleAr: z.string().min(1),
      descriptionAr: z.string(),
    })
    .passthrough(),
  blocks: z.array(homeBlockSchema),
}).passthrough();

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
