import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

function readFixture(): unknown {
  const fixturePath = new URL("../../../data/home.v1.json", import.meta.url);
  return JSON.parse(readFileSync(fixturePath, "utf-8")) as unknown;
}

test("home page schema accepts the checked-in fixture", () => {
  const parsed = homePageJsonSchema.parse(readFixture());

  assert.equal(parsed.version, 2);
  assert.ok(parsed.blocks.some((block) => block.type === "stats"));
});

test("home page schema rejects rendered blocks with missing required fields", () => {
  const result = homePageJsonSchema.safeParse({
    version: 2,
    meta: {
      titleAr: "Dar Car",
      descriptionAr: "Marketing home page",
    },
    blocks: [
      {
        type: "stats",
        id: "stats-strip",
      },
    ],
  });

  assert.equal(result.success, false);
});
