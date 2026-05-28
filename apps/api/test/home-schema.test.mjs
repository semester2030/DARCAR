import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { homePageJsonSchema } from "../dist/content/home-schema.js";

async function loadFixture() {
  const raw = await readFile(new URL("../../../data/home.v1.json", import.meta.url), "utf8");
  return JSON.parse(raw);
}

test("home schema accepts the shipped homepage document", async () => {
  const fixture = await loadFixture();
  const parsed = homePageJsonSchema.safeParse(fixture);

  assert.equal(parsed.success, true);
});

test("home schema rejects hero blocks that would crash the renderer", async () => {
  const fixture = await loadFixture();
  const broken = structuredClone(fixture);
  delete broken.blocks[0].primaryCta;

  const parsed = homePageJsonSchema.safeParse(broken);

  assert.equal(parsed.success, false);
});

test("home schema rejects missing arrays used by section renderers", async () => {
  const fixture = await loadFixture();
  const broken = structuredClone(fixture);
  const spotlight = broken.blocks.find((block) => block.type === "feature_spotlight");
  delete spotlight.items;

  const parsed = homePageJsonSchema.safeParse(broken);

  assert.equal(parsed.success, false);
});

test("home schema rejects unsupported enum values that break style lookups", async () => {
  const fixture = await loadFixture();
  const broken = structuredClone(fixture);
  const spotlight = broken.blocks.find((block) => block.type === "feature_spotlight");
  spotlight.items[0].accent = "danger";

  const parsed = homePageJsonSchema.safeParse(broken);

  assert.equal(parsed.success, false);
});

test("home schema rejects versions not understood by the web runtime", async () => {
  const fixture = await loadFixture();
  const broken = { ...fixture, version: 3 };

  const parsed = homePageJsonSchema.safeParse(broken);

  assert.equal(parsed.success, false);
});
