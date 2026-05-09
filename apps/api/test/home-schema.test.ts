import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const fixture = JSON.parse(readFileSync(join(process.cwd(), "..", "..", "data", "home.v1.json"), "utf8")) as unknown;

test("accepts the checked-in home page document", () => {
  assert.equal(homePageJsonSchema.safeParse(fixture).success, true);
});

test("rejects known block types missing render-critical fields", () => {
  const invalid = structuredClone(fixture) as {
    blocks: Array<{ type: string; primaryCta?: unknown }>;
  };
  const hero = invalid.blocks.find((block) => block.type === "hero");
  assert.ok(hero);
  delete hero.primaryCta;

  assert.equal(homePageJsonSchema.safeParse(invalid).success, false);
});

test("rejects unsafe CTA hrefs before they reach public anchors", () => {
  const invalid = structuredClone(fixture) as {
    blocks: Array<{ type: string; href?: string }>;
  };
  const cta = invalid.blocks.find((block) => block.type === "cta_band");
  assert.ok(cta);
  cta.href = "javascript:alert(1)";

  assert.equal(homePageJsonSchema.safeParse(invalid).success, false);
});
