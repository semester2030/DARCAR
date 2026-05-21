import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { homePageJsonSchema } from "./home-schema.js";

function validHomePayload() {
  return {
    version: 2,
    meta: {
      titleAr: "دار كار",
      descriptionAr: "وصف الصفحة",
    },
    blocks: [
      {
        type: "hero",
        id: "hero-main",
        eyebrowAr: "سطر علوي",
        headlineAr: "عنوان رئيسي",
        subheadlineAr: "عنوان فرعي",
        primaryCta: { labelAr: "ابدأ", href: "/download" },
        secondaryCta: { labelAr: "المزيد", href: "#features" },
        badgesAr: ["شارة"],
      },
      {
        type: "feature_spotlight",
        id: "spotlight",
        sectionTitleAr: "المزايا",
        sectionSubtitleAr: "وصف المزايا",
        items: [
          {
            id: "feature-1",
            iconKey: "map",
            accent: "primary",
            titleAr: "الخريطة",
            whatItIsAr: "ما هي",
            roleAr: "دورها",
          },
        ],
      },
    ],
  };
}

describe("homePageJsonSchema", () => {
  it("accepts renderable home content and preserves extra editorial fields", () => {
    const payload = validHomePayload();
    (payload.blocks[0] as Record<string, unknown>).editorNote = "keep this field";

    const parsed = homePageJsonSchema.parse(payload);

    assert.equal((parsed.blocks[0] as Record<string, unknown>).editorNote, "keep this field");
  });

  it("rejects hero blocks missing arrays used during rendering", () => {
    const payload = validHomePayload();
    delete (payload.blocks[0] as Record<string, unknown>).badgesAr;

    assert.equal(homePageJsonSchema.safeParse(payload).success, false);
  });

  it("rejects invalid spotlight accents before they can crash the homepage", () => {
    const payload = validHomePayload();
    const spotlight = payload.blocks[1] as { items: Array<Record<string, unknown>> };
    spotlight.items[0].accent = "bogus";

    assert.equal(homePageJsonSchema.safeParse(payload).success, false);
  });
});
