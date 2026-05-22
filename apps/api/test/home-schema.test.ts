import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const fixturePath = new URL("../../../data/home.v1.json", import.meta.url);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(readFileSync(fixturePath, "utf8")) as Record<string, unknown>;
}

test("accepts the checked-in home document", () => {
  const parsed = homePageJsonSchema.safeParse(loadFixture());

  assert.equal(parsed.success, true);
});

test("rejects hero blocks that would crash the renderer", () => {
  const payload = loadFixture();
  const blocks = payload.blocks as Record<string, unknown>[];
  const { primaryCta: _primaryCta, ...heroWithoutCta } = blocks[0];
  payload.blocks = [heroWithoutCta, ...blocks.slice(1)];

  const parsed = homePageJsonSchema.safeParse(payload);

  assert.equal(parsed.success, false);
});

test("rejects section item collections that are not arrays", () => {
  const payload = loadFixture();
  const blocks = payload.blocks as Record<string, unknown>[];
  payload.blocks = blocks.map((block) =>
    block.type === "feature_spotlight" ? { ...block, items: { id: "not-an-array" } } : block,
  );

  const parsed = homePageJsonSchema.safeParse(payload);

  assert.equal(parsed.success, false);
});

test("preserves additional fields while validating known block shape", () => {
  const payload = loadFixture();
  const blocks = payload.blocks as Record<string, unknown>[];
  payload.blocks = [{ ...blocks[0], analyticsKey: "hero-ab-test" }, ...blocks.slice(1)];

  const parsed = homePageJsonSchema.parse(payload);
  const hero = parsed.blocks[0] as Record<string, unknown>;

  assert.equal(hero.analyticsKey, "hero-ab-test");
});
