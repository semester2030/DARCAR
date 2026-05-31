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

function isRecord(x: unknown): x is Record<string, unknown> {
  return x !== null && typeof x === "object";
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every(isString);
}

function isCta(x: unknown): x is HeroBlock["primaryCta"] {
  return isRecord(x) && isString(x.labelAr) && isString(x.href);
}

function isFeatureItem(x: unknown): x is FeatureItem {
  return (
    isRecord(x) &&
    isString(x.id) &&
    isString(x.iconKey) &&
    iconKeys.has(x.iconKey as IconKey) &&
    isString(x.titleAr) &&
    isString(x.bodyAr) &&
    isString(x.accent) &&
    accents.has(x.accent as FeatureItem["accent"])
  );
}

function isFeatureSpotlightItem(x: unknown): x is FeatureSpotlightItem {
  return (
    isRecord(x) &&
    isString(x.id) &&
    isString(x.iconKey) &&
    iconKeys.has(x.iconKey as IconKey) &&
    isString(x.titleAr) &&
    isString(x.accent) &&
    accents.has(x.accent as FeatureItem["accent"]) &&
    isString(x.whatItIsAr) &&
    isString(x.roleAr) &&
    (x.imageUrl === undefined || isString(x.imageUrl)) &&
    (x.videoUrl === undefined || isString(x.videoUrl)) &&
    (x.imageAltAr === undefined || isString(x.imageAltAr))
  );
}

function isHomeBlock(x: unknown): x is HomeBlock {
  if (!isRecord(x) || !isString(x.type) || !isString(x.id)) return false;
  switch (x.type) {
    case "hero":
      return (
        isString(x.eyebrowAr) &&
        isString(x.headlineAr) &&
        isString(x.subheadlineAr) &&
        isCta(x.primaryCta) &&
        isCta(x.secondaryCta) &&
        isStringArray(x.badgesAr)
      );
    case "intro_article":
      return (
        isString(x.titleAr) &&
        (x.leadAr === undefined || isString(x.leadAr)) &&
        isStringArray(x.paragraphsAr)
      );
    case "feature_grid":
      return (
        isString(x.sectionTitleAr) &&
        isString(x.sectionSubtitleAr) &&
        Array.isArray(x.items) &&
        x.items.every(isFeatureItem)
      );
    case "feature_spotlight":
      return (
        isString(x.sectionTitleAr) &&
        isString(x.sectionSubtitleAr) &&
        Array.isArray(x.items) &&
        x.items.every(isFeatureSpotlightItem)
      );
    case "stats":
      return (
        Array.isArray(x.items) &&
        x.items.every(
          (item) =>
            isRecord(item) &&
            isString(item.value) &&
            isString(item.suffixAr) &&
            isString(item.labelAr),
        )
      );
    case "tech_showcase":
      return isString(x.titleAr) && isString(x.subtitleAr) && isStringArray(x.tagsAr);
    case "cta_band":
      return (
        isString(x.titleAr) &&
        isString(x.bodyAr) &&
        isString(x.buttonAr) &&
        isString(x.href)
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
    o.meta !== null &&
    typeof o.meta === "object" &&
    isString((o.meta as Record<string, unknown>).titleAr) &&
    isString((o.meta as Record<string, unknown>).descriptionAr) &&
    o.blocks.every(isHomeBlock)
  );
}
