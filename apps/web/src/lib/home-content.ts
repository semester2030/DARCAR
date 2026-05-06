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

function isRecord(x: unknown): x is Record<string, unknown> {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

function hasString(o: Record<string, unknown>, key: string): boolean {
  return typeof o[key] === "string";
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}

function isIconKey(x: unknown): x is IconKey {
  return x === "map" || x === "media" || x === "shield" || x === "spark";
}

function isAccent(x: unknown): x is FeatureItem["accent"] {
  return x === "primary" || x === "violet" || x === "emerald" || x === "gold";
}

function isCta(x: unknown): x is { labelAr: string; href: string } {
  return isRecord(x) && hasString(x, "labelAr") && hasString(x, "href");
}

function hasBlockBase(o: Record<string, unknown>): boolean {
  return hasString(o, "id");
}

function isFeatureItem(x: unknown): x is FeatureItem {
  return (
    isRecord(x) &&
    hasString(x, "id") &&
    isIconKey(x.iconKey) &&
    hasString(x, "titleAr") &&
    hasString(x, "bodyAr") &&
    isAccent(x.accent)
  );
}

function isSpotlightItem(x: unknown): x is FeatureSpotlightItem {
  return (
    isRecord(x) &&
    hasString(x, "id") &&
    isIconKey(x.iconKey) &&
    hasString(x, "titleAr") &&
    isAccent(x.accent) &&
    hasString(x, "whatItIsAr") &&
    hasString(x, "roleAr") &&
    (x.imageUrl === undefined || typeof x.imageUrl === "string") &&
    (x.videoUrl === undefined || typeof x.videoUrl === "string") &&
    (x.imageAltAr === undefined || typeof x.imageAltAr === "string")
  );
}

function isStatItem(x: unknown): x is StatItem {
  return isRecord(x) && hasString(x, "value") && hasString(x, "suffixAr") && hasString(x, "labelAr");
}

function isHomeBlock(x: unknown): x is HomeBlock {
  if (!isRecord(x) || !hasBlockBase(x)) return false;
  switch (x.type) {
    case "hero":
      return (
        hasString(x, "eyebrowAr") &&
        hasString(x, "headlineAr") &&
        hasString(x, "subheadlineAr") &&
        isCta(x.primaryCta) &&
        isCta(x.secondaryCta) &&
        isStringArray(x.badgesAr)
      );
    case "intro_article":
      return (
        hasString(x, "titleAr") &&
        (x.leadAr === undefined || typeof x.leadAr === "string") &&
        isStringArray(x.paragraphsAr)
      );
    case "feature_grid":
      return (
        hasString(x, "sectionTitleAr") &&
        hasString(x, "sectionSubtitleAr") &&
        Array.isArray(x.items) &&
        x.items.every(isFeatureItem)
      );
    case "feature_spotlight":
      return (
        hasString(x, "sectionTitleAr") &&
        hasString(x, "sectionSubtitleAr") &&
        Array.isArray(x.items) &&
        x.items.every(isSpotlightItem)
      );
    case "stats":
      return Array.isArray(x.items) && x.items.every(isStatItem);
    case "tech_showcase":
      return hasString(x, "titleAr") && hasString(x, "subtitleAr") && isStringArray(x.tagsAr);
    case "cta_band":
      return hasString(x, "titleAr") && hasString(x, "bodyAr") && hasString(x, "buttonAr") && hasString(x, "href");
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
    isRecord(o.meta) &&
    hasString(o.meta, "titleAr") &&
    hasString(o.meta, "descriptionAr") &&
    Array.isArray(o.blocks) &&
    o.blocks.every(isHomeBlock)
  );
}
