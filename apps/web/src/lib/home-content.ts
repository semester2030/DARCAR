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

const iconKeys = new Set<string>(["map", "media", "shield", "spark"]);
const accents = new Set<string>(["primary", "violet", "emerald", "gold"]);

function isRecord(x: unknown): x is Record<string, unknown> {
  return Boolean(x) && typeof x === "object" && !Array.isArray(x);
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((item) => typeof item === "string");
}

function isOptionalString(x: unknown): x is string | undefined {
  return x === undefined || typeof x === "string";
}

function isCta(x: unknown): x is { labelAr: string; href: string } {
  return isRecord(x) && typeof x.labelAr === "string" && typeof x.href === "string";
}

function isIconKey(x: unknown): x is IconKey {
  return typeof x === "string" && iconKeys.has(x);
}

function isAccent(x: unknown): x is FeatureItem["accent"] {
  return typeof x === "string" && accents.has(x);
}

function isFeatureItem(x: unknown): x is FeatureItem {
  return (
    isRecord(x) &&
    typeof x.id === "string" &&
    isIconKey(x.iconKey) &&
    typeof x.titleAr === "string" &&
    typeof x.bodyAr === "string" &&
    isAccent(x.accent)
  );
}

function isFeatureSpotlightItem(x: unknown): x is FeatureSpotlightItem {
  return (
    isRecord(x) &&
    typeof x.id === "string" &&
    isIconKey(x.iconKey) &&
    typeof x.titleAr === "string" &&
    isAccent(x.accent) &&
    typeof x.whatItIsAr === "string" &&
    typeof x.roleAr === "string" &&
    isOptionalString(x.imageUrl) &&
    isOptionalString(x.videoUrl) &&
    isOptionalString(x.imageAltAr)
  );
}

function isStatItem(x: unknown): x is StatItem {
  return (
    isRecord(x) &&
    typeof x.value === "string" &&
    typeof x.suffixAr === "string" &&
    typeof x.labelAr === "string"
  );
}

function isHomeBlock(x: unknown): x is HomeBlock {
  if (!isRecord(x) || typeof x.id !== "string") return false;

  switch (x.type) {
    case "hero":
      return (
        typeof x.eyebrowAr === "string" &&
        typeof x.headlineAr === "string" &&
        typeof x.subheadlineAr === "string" &&
        isCta(x.primaryCta) &&
        isCta(x.secondaryCta) &&
        isStringArray(x.badgesAr)
      );
    case "intro_article":
      return (
        typeof x.titleAr === "string" &&
        isOptionalString(x.leadAr) &&
        isStringArray(x.paragraphsAr)
      );
    case "feature_grid":
      return (
        typeof x.sectionTitleAr === "string" &&
        typeof x.sectionSubtitleAr === "string" &&
        Array.isArray(x.items) &&
        x.items.every(isFeatureItem)
      );
    case "feature_spotlight":
      return (
        typeof x.sectionTitleAr === "string" &&
        typeof x.sectionSubtitleAr === "string" &&
        Array.isArray(x.items) &&
        x.items.every(isFeatureSpotlightItem)
      );
    case "stats":
      return Array.isArray(x.items) && x.items.every(isStatItem);
    case "tech_showcase":
      return (
        typeof x.titleAr === "string" &&
        typeof x.subtitleAr === "string" &&
        isStringArray(x.tagsAr)
      );
    case "cta_band":
      return (
        typeof x.titleAr === "string" &&
        typeof x.bodyAr === "string" &&
        typeof x.buttonAr === "string" &&
        typeof x.href === "string"
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
    typeof v === "number" &&
    Number.isInteger(v) &&
    v > 0 &&
    Array.isArray(o.blocks) &&
    o.blocks.every(isHomeBlock) &&
    isRecord(o.meta) &&
    typeof o.meta.titleAr === "string" &&
    typeof o.meta.descriptionAr === "string"
  );
}
