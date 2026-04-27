import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homePageJsonSchema } from "./home-schema.js";

const fixturePath = join(process.cwd(), "..", "..", "data", "home.v1.json");
const validHome = JSON.parse(readFileSync(fixturePath, "utf8")) as unknown;

assert.equal(
  homePageJsonSchema.safeParse(validHome).success,
  true,
  "current home.v1.json should remain saveable",
);

const malformedHero = {
  version: 2,
  meta: {
    titleAr: "دار كار",
    descriptionAr: "وصف",
  },
  blocks: [
    {
      type: "hero",
      id: "hero-main",
      eyebrowAr: "سطر علوي",
      headlineAr: "عنوان",
      subheadlineAr: "عنوان فرعي",
      secondaryCta: { labelAr: "ثانوي", href: "#secondary" },
      badgesAr: ["شارة"],
    },
  ],
};

assert.equal(
  homePageJsonSchema.safeParse(malformedHero).success,
  false,
  "hero blocks without primaryCta must be rejected before they can crash the public page",
);

const malformedSpotlight = {
  version: 2,
  meta: {
    titleAr: "دار كار",
    descriptionAr: "وصف",
  },
  blocks: [
    {
      type: "feature_spotlight",
      id: "spotlight-features",
      sectionTitleAr: "العنوان",
      sectionSubtitleAr: "الوصف",
    },
  ],
};

assert.equal(
  homePageJsonSchema.safeParse(malformedSpotlight).success,
  false,
  "feature spotlight blocks without items must be rejected before render-time .map crashes",
);
