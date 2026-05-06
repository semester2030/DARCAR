import { z } from "zod";

const iconKeySchema = z.enum(["map", "media", "shield", "spark"]);
const accentSchema = z.enum(["primary", "violet", "emerald", "gold"]);

const ctaSchema = z.object({
  labelAr: z.string(),
  href: z.string(),
}).passthrough();

const featureItemSchema = z.object({
  id: z.string(),
  iconKey: iconKeySchema,
  titleAr: z.string(),
  bodyAr: z.string(),
  accent: accentSchema,
}).passthrough();

const spotlightItemSchema = z.object({
  id: z.string(),
  iconKey: iconKeySchema,
  titleAr: z.string(),
  accent: accentSchema,
  whatItIsAr: z.string(),
  roleAr: z.string(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  imageAltAr: z.string().optional(),
}).passthrough();

const statItemSchema = z.object({
  value: z.string(),
  suffixAr: z.string(),
  labelAr: z.string(),
}).passthrough();

const homeBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    id: z.string(),
    eyebrowAr: z.string(),
    headlineAr: z.string(),
    subheadlineAr: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    badgesAr: z.array(z.string()),
  }).passthrough(),
  z.object({
    type: z.literal("intro_article"),
    id: z.string(),
    titleAr: z.string(),
    leadAr: z.string().optional(),
    paragraphsAr: z.array(z.string()),
  }).passthrough(),
  z.object({
    type: z.literal("feature_grid"),
    id: z.string(),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(featureItemSchema),
  }).passthrough(),
  z.object({
    type: z.literal("feature_spotlight"),
    id: z.string(),
    sectionTitleAr: z.string(),
    sectionSubtitleAr: z.string(),
    items: z.array(spotlightItemSchema),
  }).passthrough(),
  z.object({
    type: z.literal("stats"),
    id: z.string(),
    items: z.array(statItemSchema),
  }).passthrough(),
  z.object({
    type: z.literal("tech_showcase"),
    id: z.string(),
    titleAr: z.string(),
    subtitleAr: z.string(),
    tagsAr: z.array(z.string()),
  }).passthrough(),
  z.object({
    type: z.literal("cta_band"),
    id: z.string(),
    titleAr: z.string(),
    bodyAr: z.string(),
    buttonAr: z.string(),
    href: z.string(),
  }).passthrough(),
]);

/** تحقق يحمي الصفحة العامة من JSON محفوظ لا تستطيع مكوّنات العرض استهلاكه. */
export const homePageJsonSchema = z.object({
  version: z.coerce.number().int().refine((v) => v === 1 || v === 2, "Unsupported home payload version"),
  meta: z.object({
    titleAr: z.string(),
    descriptionAr: z.string(),
  }).passthrough(),
  blocks: z.array(homeBlockSchema),
}).passthrough();

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
