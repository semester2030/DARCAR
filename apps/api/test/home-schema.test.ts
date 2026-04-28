import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const validHomeDocument = {
  version: 2,
  meta: {
    titleAr: "دار كار",
    descriptionAr: "وصف الصفحة",
  },
  blocks: [
    {
      type: "hero",
      id: "hero-main",
      eyebrowAr: "منصة سعودية",
      headlineAr: "دار كار",
      subheadlineAr: "منصة واحدة",
      primaryCta: { labelAr: "ابدأ", href: "#start" },
      secondaryCta: { labelAr: "المزايا", href: "#features" },
      badgesAr: ["خرائط", "وسائط"],
    },
    {
      type: "intro_article",
      id: "intro",
      titleAr: "تعريف",
      paragraphsAr: ["فقرة أولى"],
    },
    {
      type: "feature_spotlight",
      id: "spotlight",
      sectionTitleAr: "المزايا",
      sectionSubtitleAr: "تفاصيل المزايا",
      items: [
        {
          id: "feat-map",
          iconKey: "map",
          accent: "primary",
          titleAr: "خرائط",
          whatItIsAr: "تعريف الميزة",
          roleAr: "دورها",
        },
      ],
    },
    {
      type: "stats",
      id: "stats",
      items: [{ value: "24", suffixAr: "/7", labelAr: "جاهزية" }],
    },
    {
      type: "tech_showcase",
      id: "tech",
      titleAr: "تقنيات",
      subtitleAr: "خلف المشهد",
      tagsAr: ["Next.js"],
    },
    {
      type: "cta_band",
      id: "cta",
      titleAr: "جاهز؟",
      bodyAr: "جرّب المنصة",
      buttonAr: "ابدأ",
      href: "/download",
    },
  ],
};

describe("homePageJsonSchema", () => {
  it("accepts the supported homepage block shapes", () => {
    assert.equal(homePageJsonSchema.safeParse(validHomeDocument).success, true);
  });

  it("rejects a block that would crash the public renderer", () => {
    const invalidHomeDocument = {
      ...validHomeDocument,
      blocks: [
        {
          type: "hero",
          id: "hero-main",
        },
      ],
    };

    const parsed = homePageJsonSchema.safeParse(invalidHomeDocument);

    assert.equal(parsed.success, false);
  });
});
