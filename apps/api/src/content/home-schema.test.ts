import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homePageJsonSchema } from "./home-schema.js";

const fixture = JSON.parse(readFileSync(join(process.cwd(), "..", "..", "data", "home.v1.json"), "utf8")) as unknown;

function parseFixtureWithPatch(patch: (doc: Record<string, unknown>) => void) {
  const doc = structuredClone(fixture) as Record<string, unknown>;
  patch(doc);
  return homePageJsonSchema.safeParse(doc);
}

assert.equal(homePageJsonSchema.safeParse(fixture).success, true, "current home fixture should be valid");

assert.equal(
  parseFixtureWithPatch((doc) => {
    const blocks = doc.blocks as Array<Record<string, unknown>>;
    const hero = blocks.find((block) => block.type === "hero");
    assert.ok(hero);
    delete hero.primaryCta;
  }).success,
  false,
  "hero blocks without primaryCta must be rejected before they can crash the homepage",
);

assert.equal(
  parseFixtureWithPatch((doc) => {
    const blocks = doc.blocks as Array<Record<string, unknown>>;
    const spotlight = blocks.find((block) => block.type === "feature_spotlight") as {
      items: Array<Record<string, unknown>>;
    };
    assert.ok(spotlight);
    spotlight.items[0].accent = "danger";
  }).success,
  false,
  "invalid spotlight accents must be rejected before render looks up accent styles",
);

assert.equal(
  parseFixtureWithPatch((doc) => {
    const blocks = doc.blocks as Array<Record<string, unknown>>;
    const cta = blocks.find((block) => block.type === "cta_band");
    assert.ok(cta);
    cta.href = "javascript:alert(1)";
  }).success,
  false,
  "unsafe CTA schemes must not be persisted into public links",
);
