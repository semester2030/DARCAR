import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

import { homePageJsonSchema } from "../dist/content/home-schema.js";

function loadFixture() {
  return JSON.parse(readFileSync(new URL("../../../data/home.v1.json", import.meta.url), "utf8"));
}

test("accepts the committed home page document", () => {
  const parsed = homePageJsonSchema.safeParse(loadFixture());

  assert.equal(parsed.success, true);
});

test("rejects malformed render-critical feature accents", () => {
  const doc = loadFixture();
  const spotlight = doc.blocks.find((block) => block.type === "feature_spotlight");
  spotlight.items[0].accent = "blue";

  const parsed = homePageJsonSchema.safeParse(doc);

  assert.equal(parsed.success, false);
});

test("rejects missing render-critical arrays", () => {
  const doc = loadFixture();
  const hero = doc.blocks.find((block) => block.type === "hero");
  delete hero.badgesAr;

  const parsed = homePageJsonSchema.safeParse(doc);

  assert.equal(parsed.success, false);
});

test("preserves unknown CMS fields while validating known block contracts", () => {
  const doc = {
    version: 2,
    extraRoot: "keep",
    meta: {
      titleAr: "title",
      descriptionAr: "description",
      extraMeta: "keep",
    },
    blocks: [
      {
        type: "stats",
        id: "stats",
        extraBlock: "keep",
        items: [
          {
            value: "1",
            suffixAr: "",
            labelAr: "label",
            extraItem: "keep",
          },
        ],
      },
    ],
  };

  const parsed = homePageJsonSchema.parse(doc);

  assert.equal(parsed.extraRoot, "keep");
  assert.equal(parsed.meta.extraMeta, "keep");
  assert.equal(parsed.blocks[0].extraBlock, "keep");
  assert.equal(parsed.blocks[0].items[0].extraItem, "keep");
});
