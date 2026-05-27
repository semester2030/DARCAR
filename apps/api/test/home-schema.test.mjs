import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import { homePageJsonSchema } from "../dist/content/home-schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadFixture() {
  return JSON.parse(readFileSync(join(__dirname, "..", "..", "..", "data", "home.v1.json"), "utf8"));
}

function parseFixture() {
  const result = homePageJsonSchema.safeParse(loadFixture());
  assert.equal(result.success, true);
  return result.data;
}

test("accepts the committed homepage document", () => {
  parseFixture();
});

test("rejects hero blocks that would crash the public renderer", () => {
  const doc = parseFixture();
  const hero = doc.blocks.find((block) => block.type === "hero");
  assert.ok(hero);
  delete hero.badgesAr;

  const result = homePageJsonSchema.safeParse(doc);
  assert.equal(result.success, false);
});

test("rejects feature spotlight accents outside the rendered style map", () => {
  const doc = parseFixture();
  const spotlight = doc.blocks.find((block) => block.type === "feature_spotlight");
  assert.ok(spotlight);
  spotlight.items[0].accent = "danger";

  const result = homePageJsonSchema.safeParse(doc);
  assert.equal(result.success, false);
});

test("rejects dangerous CTA URL schemes before they are persisted", () => {
  const doc = parseFixture();
  const hero = doc.blocks.find((block) => block.type === "hero");
  assert.ok(hero);
  hero.primaryCta.href = "javascript:alert(document.domain)";

  const result = homePageJsonSchema.safeParse(doc);
  assert.equal(result.success, false);
});

test("rejects dangerous media URL schemes before they are persisted", () => {
  const doc = parseFixture();
  const spotlight = doc.blocks.find((block) => block.type === "feature_spotlight");
  assert.ok(spotlight);
  spotlight.items[0].imageUrl = "data:image/svg+xml,<svg onload=alert(1)>";

  const result = homePageJsonSchema.safeParse(doc);
  assert.equal(result.success, false);
});
