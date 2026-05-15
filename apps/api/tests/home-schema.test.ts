import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const fixturePath = join(process.cwd(), "..", "..", "data", "home.v1.json");

function loadFixture(): unknown {
  return JSON.parse(readFileSync(fixturePath, "utf8")) as unknown;
}

describe("homePageJsonSchema", () => {
  it("accepts the checked-in home page document", () => {
    const parsed = homePageJsonSchema.safeParse(loadFixture());

    assert.equal(parsed.success, true);
  });

  it("rejects a malformed hero block before it can be saved", () => {
    const parsed = homePageJsonSchema.safeParse({
      version: 2,
      meta: {
        titleAr: "Dar Car",
        descriptionAr: "",
      },
      blocks: [
        {
          type: "hero",
          id: "hero-main",
          headlineAr: "Missing nested CTA fields",
        },
      ],
    });

    assert.equal(parsed.success, false);
  });

  it("rejects invalid feature accents before they can crash rendering", () => {
    const fixture = loadFixture() as {
      blocks: Array<{ type: string; items?: Array<{ accent?: string }> }>;
    };
    const spotlight = fixture.blocks.find((block) => block.type === "feature_spotlight");
    assert.ok(spotlight?.items?.[0]);
    spotlight.items[0].accent = "invalid";

    const parsed = homePageJsonSchema.safeParse(fixture);

    assert.equal(parsed.success, false);
  });

  it("rejects scriptable CTA links in saved public content", () => {
    const fixture = loadFixture() as {
      blocks: Array<{ type: string; href?: string }>;
    };
    const cta = fixture.blocks.find((block) => block.type === "cta_band");
    assert.ok(cta);
    cta.href = "javascript:alert(document.domain)";

    const parsed = homePageJsonSchema.safeParse(fixture);

    assert.equal(parsed.success, false);
  });
});
