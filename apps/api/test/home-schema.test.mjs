import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { homePageJsonSchema } from "../dist/content/home-schema.js";

const fixtureUrl = new URL("../../../data/home.v1.json", import.meta.url);

function loadFixture() {
  return JSON.parse(readFileSync(fixtureUrl, "utf8"));
}

test("accepts the committed home page document", () => {
  const result = homePageJsonSchema.safeParse(loadFixture());

  assert.equal(result.success, true);
});

test("rejects hero blocks that would crash public rendering", () => {
  const doc = loadFixture();
  delete doc.blocks[0].primaryCta;

  const result = homePageJsonSchema.safeParse(doc);

  assert.equal(result.success, false);
});

test("rejects malformed nested block arrays", () => {
  const doc = loadFixture();
  const spotlight = doc.blocks.find((block) => block.type === "feature_spotlight");
  spotlight.items = [{ id: "broken", iconKey: "map", accent: "primary", titleAr: "Broken" }];

  const result = homePageJsonSchema.safeParse(doc);

  assert.equal(result.success, false);
});

test("rejects unknown block types that the homepage cannot render", () => {
  const doc = loadFixture();
  doc.blocks.push({ type: "typo_block", id: "lost-section" });

  const result = homePageJsonSchema.safeParse(doc);

  assert.equal(result.success, false);
});
