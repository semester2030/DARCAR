/** Types aligned with `data/home.v1.json` — single contract for API + web */

export type IconKey = "map" | "media" | "shield" | "spark";

export type HeroBlock = {
  type: "hero";
  id: string;
  eyebrowAr: string;
  headlineAr: string;
  subheadlineAr: string;
  primaryCta: { labelAr: string; href: string };
  secondaryCta: { labelAr: string; href: string };
  badgesAr: string[];
};

/** تعريف طويل عن الشركة — فقرات قابلة للتوسيع من الاستديو عبر JSON */
export type IntroArticleBlock = {
  type: "intro_article";
  id: string;
  titleAr: string;
  /** سطر اختياري تحت العنوان */
  leadAr?: string;
  paragraphsAr: string[];
};

export type FeatureItem = {
  id: string;
  iconKey: IconKey;
  titleAr: string;
  bodyAr: string;
  accent: "primary" | "violet" | "emerald" | "gold";
};

/** شبكة مزايا مختصرة (اختياري — للتوافق مع نسخ قديمة) */
export type FeatureGridBlock = {
  type: "feature_grid";
  id: string;
  sectionTitleAr: string;
  sectionSubtitleAr: string;
  items: FeatureItem[];
};

/** ميزة موسّعة: ما هي + دورها + صورة/فيديو من الاستديو */
export type FeatureSpotlightItem = {
  id: string;
  iconKey: IconKey;
  titleAr: string;
  accent: "primary" | "violet" | "emerald" | "gold";
  whatItIsAr: string;
  roleAr: string;
  /** رابط صورة (CDN، استديو، إلخ) */
  imageUrl?: string;
  /** رابط يوتيوب أو ملف فيديو مباشر (.mp4 / .webm) */
  videoUrl?: string;
  imageAltAr?: string;
};

export type FeatureSpotlightBlock = {
  type: "feature_spotlight";
  id: string;
  sectionTitleAr: string;
  sectionSubtitleAr: string;
  items: FeatureSpotlightItem[];
};

export type StatItem = {
  value: string;
  suffixAr: string;
  labelAr: string;
};

export type StatsBlock = {
  type: "stats";
  id: string;
  items: StatItem[];
};

export type TechShowcaseBlock = {
  type: "tech_showcase";
  id: string;
  titleAr: string;
  subtitleAr: string;
  tagsAr: string[];
};

export type CtaBandBlock = {
  type: "cta_band";
  id: string;
  titleAr: string;
  bodyAr: string;
  buttonAr: string;
  href: string;
};

export type HomeBlock =
  | HeroBlock
  | IntroArticleBlock
  | FeatureGridBlock
  | FeatureSpotlightBlock
  | StatsBlock
  | TechShowcaseBlock
  | CtaBandBlock;

export type HomePageDocument = {
  version: number;
  meta: {
    titleAr: string;
    descriptionAr: string;
  };
  blocks: HomeBlock[];
};

const iconKeys = new Set<IconKey>(["map", "media", "shield", "spark"]);
const accents = new Set<FeatureItem["accent"]>(["primary", "violet", "emerald", "gold"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

export function isSafePublicHref(value: unknown): value is string {
  if (typeof value !== "string") return false;
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

export function safePublicHref(href: string): string {
  const trimmed = href.trim();
  return isSafePublicHref(trimmed) ? trimmed : "#";
}

function isCta(value: unknown): value is { labelAr: string; href: string } {
  return isRecord(value) && typeof value.labelAr === "string" && isSafePublicHref(value.href);
}

function isFeatureItem(value: unknown): value is FeatureItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    iconKeys.has(value.iconKey as IconKey) &&
    typeof value.titleAr === "string" &&
    typeof value.bodyAr === "string" &&
    accents.has(value.accent as FeatureItem["accent"])
  );
}

function isFeatureSpotlightItem(value: unknown): value is FeatureSpotlightItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    iconKeys.has(value.iconKey as IconKey) &&
    typeof value.titleAr === "string" &&
    accents.has(value.accent as FeatureSpotlightItem["accent"]) &&
    typeof value.whatItIsAr === "string" &&
    typeof value.roleAr === "string" &&
    isOptionalString(value.imageUrl) &&
    isOptionalString(value.videoUrl) &&
    isOptionalString(value.imageAltAr)
  );
}

function isHomeBlock(value: unknown): value is HomeBlock {
  if (!isRecord(value) || typeof value.id !== "string") return false;

  switch (value.type) {
    case "hero":
      return (
        typeof value.eyebrowAr === "string" &&
        typeof value.headlineAr === "string" &&
        typeof value.subheadlineAr === "string" &&
        isCta(value.primaryCta) &&
        isCta(value.secondaryCta) &&
        isStringArray(value.badgesAr)
      );
    case "intro_article":
      return (
        typeof value.titleAr === "string" &&
        isOptionalString(value.leadAr) &&
        isStringArray(value.paragraphsAr)
      );
    case "feature_grid":
      return (
        typeof value.sectionTitleAr === "string" &&
        typeof value.sectionSubtitleAr === "string" &&
        Array.isArray(value.items) &&
        value.items.every(isFeatureItem)
      );
    case "feature_spotlight":
      return (
        typeof value.sectionTitleAr === "string" &&
        typeof value.sectionSubtitleAr === "string" &&
        Array.isArray(value.items) &&
        value.items.every(isFeatureSpotlightItem)
      );
    case "stats":
      return (
        Array.isArray(value.items) &&
        value.items.every(
          (item) =>
            isRecord(item) &&
            typeof item.value === "string" &&
            typeof item.suffixAr === "string" &&
            typeof item.labelAr === "string",
        )
      );
    case "tech_showcase":
      return typeof value.titleAr === "string" && typeof value.subtitleAr === "string" && isStringArray(value.tagsAr);
    case "cta_band":
      return (
        typeof value.titleAr === "string" &&
        typeof value.bodyAr === "string" &&
        typeof value.buttonAr === "string" &&
        isSafePublicHref(value.href)
      );
    default:
      return false;
  }
}

export function isHomePageDocument(x: unknown): x is HomePageDocument {
  if (!isRecord(x)) return false;
  const o = x;
  const v = o.version;
  return (
    (v === 1 || v === 2) &&
    Array.isArray(o.blocks) &&
    o.blocks.every(isHomeBlock) &&
    isRecord(o.meta) &&
    typeof o.meta.titleAr === "string" &&
    typeof o.meta.descriptionAr === "string"
  );
}
