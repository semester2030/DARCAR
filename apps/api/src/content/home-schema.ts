import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);
const ctaSchema = z.object({
  labelAr: z.string(),
  href: z.string(),
});

const baseBlockSchema = z.object({
  id: z.string().min(1),
});

const heroBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("hero"),
    eyebrowAr: z.string(),
    headlineAr: z.string(),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  })
  .passthrough();

const introArticleBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("intro_article"),
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

const featureGridBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("feature_grid"),
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

const featureSpotlightBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("feature_spotlight"),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  })
  .passthrough();

const statsBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("stats"),
    items: z.array(
      z
        .object({
          value: z.string(),
          suffixAr: z.string(),
          labelAr: z.string(),
        })
        .passthrough(),
    ),
  })
  .passthrough();

const techShowcaseBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("tech_showcase"),
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  })
  .passthrough();

const ctaBandBlockSchema = baseBlockSchema
  .extend({
    type: z.literal("cta_band"),
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

const homeVersionSchema = z.coerce
  .number()
  .int()
  .refine((v) => v === 1 || v === 2, "Unsupported home content version");

/** تحقق مطابق لأشكال blocks التي تعرضها الصفحة العامة حتى لا نحفظ محتوى يكسر الواجهة */
export const homePageJsonSchema = z.object({
  version: homeVersionSchema,
  meta: z.object({
    titleAr: z.string().min(1),
    descriptionAr: z.string(),
  }),
  blocks: z.array(homeBlockSchema),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
