import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const validHomePage = {
  version: 2,
  meta: {
    titleAr: "دار كار",
    descriptionAr: "وصف الصفحة",
  },
  blocks: [
    {
      type: "hero",
      id: "hero-main",
      eyebrowAr: "أفراد ومعارض",
      headlineAr: "عنوان رئيسي",
      subheadlineAr: "عنوان فرعي",
      primaryCta: { labelAr: "ابدأ", href: "#start" },
      secondaryCta: { labelAr: "المزيد", href: "#more" },
      badgesAr: ["وسم"],
    },
    {
      type: "feature_spotlight",
      id: "spotlight",
      sectionTitleAr: "المزايا",
      sectionSubtitleAr: "شرح",
      items: [
        {
          id: "feat-1",
          iconKey: "map",
          accent: "primary",
          titleAr: "خرائط",
          whatItIsAr: "تعريف",
          roleAr: "دور",
        },
      ],
    },
    {
      type: "stats",
      id: "stats",
      items: [{ value: "٤", suffixAr: "", labelAr: "فئات" }],
    },
    {
      type: "tech_showcase",
      id: "tech",
      titleAr: "الخدمات",
      subtitleAr: "تفاصيل",
      tagsAr: ["إدارة"],
    },
    {
      type: "cta_band",
      id: "cta",
      titleAr: "حمّل التطبيق",
      bodyAr: "قريباً",
      buttonAr: "تنزيل",
      href: "/download",
    },
  ],
};

describe("homePageJsonSchema", () => {
  it("accepts a renderable home page document", () => {
    assert.equal(homePageJsonSchema.safeParse(validHomePage).success, true);
  });

  it("rejects known blocks missing fields required by the renderer", () => {
    const malformed = structuredClone(validHomePage);
    delete (malformed.blocks[0] as Partial<{ primaryCta: unknown }>).primaryCta;

    const parsed = homePageJsonSchema.safeParse(malformed);

    assert.equal(parsed.success, false);
    assert.match(JSON.stringify(parsed.error.format()), /primaryCta/);
  });

  it("rejects document versions the web contract does not support", () => {
    const unsupported = { ...validHomePage, version: 3 };

    assert.equal(homePageJsonSchema.safeParse(unsupported).success, false);
  });

  it("rejects unknown block types instead of saving content the homepage drops", () => {
    const malformed = structuredClone(validHomePage);
    malformed.blocks.push({ type: "feature_spotlght", id: "typo" } as never);

    assert.equal(homePageJsonSchema.safeParse(malformed).success, false);
  });
});
