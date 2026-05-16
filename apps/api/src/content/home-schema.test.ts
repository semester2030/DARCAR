import assert from "node:assert/strict";
import test from "node:test";
import { homePageJsonSchema } from "./home-schema.js";

function validHeroBlock() {
  return {
    type: "hero",
    id: "hero-main",
    eyebrowAr: "Eyebrow",
    headlineAr: "Headline",
    subheadlineAr: "Subheadline",
    primaryCta: { labelAr: "Primary", href: "#primary" },
    secondaryCta: { labelAr: "Secondary", href: "#secondary" },
    badgesAr: ["One", "Two"],
  };
}

function validDocument() {
  return {
    version: 3,
    meta: {
      titleAr: "Dar Car",
      descriptionAr: "Description",
    },
    blocks: [validHeroBlock()],
  };
}

test("homePageJsonSchema accepts renderable home documents and preserves extra fields", () => {
  const parsed = homePageJsonSchema.parse({
    ...validDocument(),
    customTopLevel: true,
    blocks: [
      {
        ...validHeroBlock(),
        customBlockField: "keep-me",
      },
    ],
  });

  assert.equal(parsed.version, 3);
  assert.equal(parsed.customTopLevel, true);
  assert.equal((parsed.blocks[0] as Record<string, unknown>).customBlockField, "keep-me");
});

test("homePageJsonSchema rejects a known block missing fields the renderer dereferences", () => {
  const invalid = {
    ...validDocument(),
    blocks: [
      {
        ...validHeroBlock(),
        badgesAr: undefined,
      },
    ],
  };

  assert.equal(homePageJsonSchema.safeParse(invalid).success, false);
});

test("homePageJsonSchema rejects malformed nested block items", () => {
  const invalid = {
    ...validDocument(),
    blocks: [
      {
        type: "feature_spotlight",
        id: "spotlight",
        sectionTitleAr: "Features",
        sectionSubtitleAr: "Subtitle",
        items: [
          {
            id: "broken",
            iconKey: "map",
            accent: "unknown",
            titleAr: "Broken",
            whatItIsAr: "What",
            roleAr: "Role",
          },
        ],
      },
    ],
  };

  assert.equal(homePageJsonSchema.safeParse(invalid).success, false);
});
