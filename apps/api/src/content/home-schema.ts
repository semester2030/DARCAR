import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);

const ctaSchema = z.object({
  labelAr: z.string(),
  href: z.string(),
});

const featureItemSchema = z.object({
  id: z.string(),
  iconKey: iconKeySchema,
  titleAr: z.string(),
  bodyAr: z.string(),
  accent: accentSchema,
});

const featureSpotlightItemSchema = z.object({
  id: z.string(),
  iconKey: iconKeySchema,
  titleAr: z.string(),
  accent: accentSchema,
  whatItIsAr: z.string(),
  roleAr: z.string(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  imageAltAr: z.string().optional(),
});

export const homePageBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    id: z.string(),
    eyebrowAr: z.string(),
    headlineAr: z.string(),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  }),
  z.object({
    type: z.literal("intro_article"),
    id: z.string(),
    titleAr: z.string(),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  }),
  z.object({
    type: z.literal("feature_grid"),
    id: z.string(),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  }),
  z.object({
    type: z.literal("feature_spotlight"),
    id: z.string(),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureSpotlightItemSchema),
  }),
  z.object({
    type: z.literal("stats"),
    id: z.string(),
    items: z.array(
      z.object({
        value: z.string(),
        suffixAr: z.string(),
        labelAr: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal("tech_showcase"),
    id: z.string(),
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  }),
  z.object({
    type: z.literal("cta_band"),
    id: z.string(),
    titleAr: z.string(),
    bodyAr: z.string(),
    buttonAr: z.string(),
    href: z.string(),
  }),
]);

/** تحقق من كل block معروف قبل حفظه حتى لا تتعطل الصفحة العامة بعد تعديل إداري خاطئ */
export const homePageJsonSchema = z.object({
  version: z.union([z.literal(1), z.literal(2)]),
  meta: z.object({
    titleAr: z.string().min(1),
    descriptionAr: z.string(),
  }),
  blocks: z.array(homePageBlockSchema),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
