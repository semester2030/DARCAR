import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { homePageJsonSchema } from "../src/content/home-schema.js";

const fixturePath = join(process.cwd(), "..", "..", "data", "home.v1.json");

describe("homePageJsonSchema", () => {
  it("accepts the checked-in home page document", () => {
    const fixture = JSON.parse(readFileSync(fixturePath, "utf8")) as unknown;
    const parsed = homePageJsonSchema.safeParse(fixture);

    assert.equal(parsed.success, true);
  });

  it("rejects a malformed hero block before it can be saved", () => {
    const malformed = {
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
    };

    const parsed = homePageJsonSchema.safeParse(malformed);

    assert.equal(parsed.success, false);
  });

  it("rejects scriptable CTA links in saved public content", () => {
    const fixture = JSON.parse(readFileSync(fixturePath, "utf8")) as {
      blocks: Array<{ type: string; href?: string }>;
    };
    const cta = fixture.blocks.find((block) => block.type === "cta_band");
    assert.ok(cta);
    cta.href = "javascript:alert(document.domain)";

    const parsed = homePageJsonSchema.safeParse(fixture);

    assert.equal(parsed.success, false);
  });
});
