import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);

const ctaSchema = z
  .object({
    labelAr: z.string(),
    href: z.string(),
  })
  .passthrough();

const baseBlockSchema = z
  .object({
    id: z.string().min(1),
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

const homeBlockSchema = z.discriminatedUnion("type", [
  baseBlockSchema.extend({
    type: z.literal("hero"),
    eyebrowAr: z.string(),
    headlineAr: z.string(),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  }),
  baseBlockSchema.extend({
    type: z.literal("intro_article"),
    titleAr: z.string(),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  }),
  baseBlockSchema.extend({
    type: z.literal("feature_grid"),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  }),
  baseBlockSchema.extend({
    type: z.literal("feature_spotlight"),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  }),
  baseBlockSchema.extend({
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
  }),
  baseBlockSchema.extend({
    type: z.literal("tech_showcase"),
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  }),
  baseBlockSchema.extend({
    type: z.literal("cta_band"),
    titleAr: z.string(),
    bodyAr: z.string(),
    buttonAr: z.string(),
    href: z.string(),
  }),
]);

/** تحقق من شكل JSON الصفحة الرئيسية بما يضمن أن كل block قابل للعرض بأمان */
export const homePageJsonSchema = z.object({
  version: z.coerce
    .number()
    .int()
    .refine((version) => version === 1 || version === 2, "Unsupported home content version"),
  meta: z
    .object({
      titleAr: z.string().min(1),
      descriptionAr: z.string(),
    })
    .passthrough(),
  blocks: z.array(homeBlockSchema),
}).passthrough();

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
