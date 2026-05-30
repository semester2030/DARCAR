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

type UnknownRecord = Record<string, unknown>;

const iconKeys = new Set<IconKey>(["map", "media", "shield", "spark"]);
const accents = new Set<FeatureItem["accent"]>(["primary", "violet", "emerald", "gold"]);

function isRecord(x: unknown): x is UnknownRecord {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isOptionalString(x: unknown): x is string | undefined {
  return x === undefined || typeof x === "string";
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every(isString);
}

function isIconKey(x: unknown): x is IconKey {
  return isString(x) && iconKeys.has(x as IconKey);
}

function isAccent(x: unknown): x is FeatureItem["accent"] {
  return isString(x) && accents.has(x as FeatureItem["accent"]);
}

function isCta(x: unknown): x is HeroBlock["primaryCta"] {
  return isRecord(x) && isString(x.labelAr) && isString(x.href);
}

function isHeroBlock(x: UnknownRecord): x is HeroBlock {
  return (
    x.type === "hero" &&
    isString(x.id) &&
    isString(x.eyebrowAr) &&
    isString(x.headlineAr) &&
    isString(x.subheadlineAr) &&
    isCta(x.primaryCta) &&
    isCta(x.secondaryCta) &&
    isStringArray(x.badgesAr)
  );
}

function isIntroArticleBlock(x: UnknownRecord): x is IntroArticleBlock {
  return (
    x.type === "intro_article" &&
    isString(x.id) &&
    isString(x.titleAr) &&
    isOptionalString(x.leadAr) &&
    isStringArray(x.paragraphsAr)
  );
}

function isFeatureItem(x: unknown): x is FeatureItem {
  return (
    isRecord(x) &&
    isString(x.id) &&
    isIconKey(x.iconKey) &&
    isString(x.titleAr) &&
    isString(x.bodyAr) &&
    isAccent(x.accent)
  );
}

function isFeatureGridBlock(x: UnknownRecord): x is FeatureGridBlock {
  return (
    x.type === "feature_grid" &&
    isString(x.id) &&
    isString(x.sectionTitleAr) &&
    isString(x.sectionSubtitleAr) &&
    Array.isArray(x.items) &&
    x.items.every(isFeatureItem)
  );
}

function isFeatureSpotlightItem(x: unknown): x is FeatureSpotlightItem {
  return (
    isRecord(x) &&
    isString(x.id) &&
    isIconKey(x.iconKey) &&
    isString(x.titleAr) &&
    isAccent(x.accent) &&
    isString(x.whatItIsAr) &&
    isString(x.roleAr) &&
    isOptionalString(x.imageUrl) &&
    isOptionalString(x.videoUrl) &&
    isOptionalString(x.imageAltAr)
  );
}

function isFeatureSpotlightBlock(x: UnknownRecord): x is FeatureSpotlightBlock {
  return (
    x.type === "feature_spotlight" &&
    isString(x.id) &&
    isString(x.sectionTitleAr) &&
    isString(x.sectionSubtitleAr) &&
    Array.isArray(x.items) &&
    x.items.every(isFeatureSpotlightItem)
  );
}

function isStatItem(x: unknown): x is StatItem {
  return isRecord(x) && isString(x.value) && isString(x.suffixAr) && isString(x.labelAr);
}

function isStatsBlock(x: UnknownRecord): x is StatsBlock {
  return x.type === "stats" && isString(x.id) && Array.isArray(x.items) && x.items.every(isStatItem);
}

function isTechShowcaseBlock(x: UnknownRecord): x is TechShowcaseBlock {
  return (
    x.type === "tech_showcase" &&
    isString(x.id) &&
    isString(x.titleAr) &&
    isString(x.subtitleAr) &&
    isStringArray(x.tagsAr)
  );
}

function isCtaBandBlock(x: UnknownRecord): x is CtaBandBlock {
  return (
    x.type === "cta_band" &&
    isString(x.id) &&
    isString(x.titleAr) &&
    isString(x.bodyAr) &&
    isString(x.buttonAr) &&
    isString(x.href)
  );
}

function isHomeBlock(x: unknown): x is HomeBlock {
  if (!isRecord(x)) return false;
  switch (x.type) {
    case "hero":
      return isHeroBlock(x);
    case "intro_article":
      return isIntroArticleBlock(x);
    case "feature_grid":
      return isFeatureGridBlock(x);
    case "feature_spotlight":
      return isFeatureSpotlightBlock(x);
    case "stats":
      return isStatsBlock(x);
    case "tech_showcase":
      return isTechShowcaseBlock(x);
    case "cta_band":
      return isCtaBandBlock(x);
    default:
      return false;
  }
}

export function isHomePageDocument(x: unknown): x is HomePageDocument {
  if (!isRecord(x)) return false;
  const o = x as UnknownRecord;
  const v = o.version;
  return (
    (v === 1 || v === 2) &&
    Array.isArray(o.blocks) &&
    o.blocks.every(isHomeBlock) &&
    isRecord(o.meta) &&
    isString(o.meta.titleAr) &&
    isString(o.meta.descriptionAr)
  );
}
