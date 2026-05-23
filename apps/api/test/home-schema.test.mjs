import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { homePageJsonSchema } from "../dist/content/home-schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "..", "..", "..", "data", "home.v1.json");

test("accepts the shipped homepage document", () => {
  const document = JSON.parse(readFileSync(fixturePath, "utf8"));
  const parsed = homePageJsonSchema.safeParse(document);

  assert.equal(parsed.success, true);
});

test("rejects hero blocks missing fields required by the renderer", () => {
  const document = JSON.parse(readFileSync(fixturePath, "utf8"));
  const hero = document.blocks.find((block) => block.type === "hero");
  delete hero.badgesAr;

  const parsed = homePageJsonSchema.safeParse(document);

  assert.equal(parsed.success, false);
  assert.match(parsed.error.issues.map((issue) => issue.path.join(".")).join("\n"), /blocks\.0\.badgesAr/);
});

test("rejects spotlight accents that would crash style lookup", () => {
  const document = JSON.parse(readFileSync(fixturePath, "utf8"));
  const spotlight = document.blocks.find((block) => block.type === "feature_spotlight");
  spotlight.items[0].accent = "danger";

  const parsed = homePageJsonSchema.safeParse(document);

  assert.equal(parsed.success, false);
  assert.match(parsed.error.issues.map((issue) => issue.path.join(".")).join("\n"), /blocks\.2\.items\.0\.accent/);
});
