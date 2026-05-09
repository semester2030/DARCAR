import { z } from "zod";

const text = z.string();
const id = z.string().min(1);
const iconKey = z.enum(["map", "media", "shield", "spark"]);
const accent = z.enum(["primary", "violet", "emerald", "gold"]);

function isSafeHref(value: string): boolean {
  const href = value.trim();
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:" || url.protocol === "tel:";
  } catch {
    return false;
  }
}

const href = z.string().trim().min(1).refine(isSafeHref, "UNSAFE_HREF");

const heroBlockSchema = z.object({
  type: z.literal("hero"),
  id,
  eyebrowAr: text,
  headlineAr: text,
  subheadlineAr: text,
  primaryCta: z.object({ labelAr: text, href }),
  secondaryCta: z.object({ labelAr: text, href }),
  badgesAr: z.array(text),
});

const introArticleBlockSchema = z.object({
  type: z.literal("intro_article"),
  id,
  titleAr: text,
  leadAr: text.optional(),
  paragraphsAr: z.array(text),
});

const featureItemSchema = z.object({
  id,
  iconKey,
  titleAr: text,
  bodyAr: text,
  accent,
});

const featureGridBlockSchema = z.object({
  type: z.literal("feature_grid"),
  id,
  sectionTitleAr: text,
  sectionSubtitleAr: text,
  items: z.array(featureItemSchema),
});

const featureSpotlightItemSchema = z.object({
  id,
  iconKey,
  titleAr: text,
  accent,
  whatItIsAr: text,
  roleAr: text,
  imageUrl: text.optional(),
  videoUrl: text.optional(),
  imageAltAr: text.optional(),
});

const featureSpotlightBlockSchema = z.object({
  type: z.literal("feature_spotlight"),
  id,
  sectionTitleAr: text,
  sectionSubtitleAr: text,
  items: z.array(featureSpotlightItemSchema),
});

const statsBlockSchema = z.object({
  type: z.literal("stats"),
  id,
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
  id,
  titleAr: text,
  subtitleAr: text,
  tagsAr: z.array(text),
});

const ctaBandBlockSchema = z.object({
  type: z.literal("cta_band"),
  id,
  titleAr: text,
  bodyAr: text,
  buttonAr: text,
  href,
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

/** تحقق من عقد الصفحة الرئيسية قبل الحفظ أو النشر للويب العام. */
export const homePageJsonSchema = z.object({
  version: z.union([z.literal(1), z.literal(2)]),
  meta: z.object({
    titleAr: z.string().min(1),
    descriptionAr: z.string(),
  }),
  blocks: z.array(homeBlockSchema),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
