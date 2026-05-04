import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { homePageJsonSchema } from "../src/content/home-schema.js";

describe("homePageJsonSchema", () => {
  it("accepts the checked-in home content payload", () => {
    const payload = JSON.parse(readFileSync(join(process.cwd(), "..", "..", "data", "home.v1.json"), "utf8")) as unknown;

    const result = homePageJsonSchema.safeParse(payload);

    assert.equal(result.success, true);
  });

  it("rejects blocks that match a rendered type but omit required fields", () => {
    const result = homePageJsonSchema.safeParse({
      version: 2,
      meta: {
        titleAr: "دار كار",
        descriptionAr: "وصف",
      },
      blocks: [
        {
          type: "hero",
          id: "hero-main",
        },
      ],
    });

    assert.equal(result.success, false);
  });

  it("rejects unsafe CTA URL schemes before content is published", () => {
    const result = homePageJsonSchema.safeParse({
      version: 2,
      meta: {
        titleAr: "دار كار",
        descriptionAr: "وصف",
      },
      blocks: [
        {
          type: "cta_band",
          id: "cta",
          titleAr: "العنوان",
          bodyAr: "النص",
          buttonAr: "اضغط",
          href: "javascript:alert(1)",
        },
      ],
    });

    assert.equal(result.success, false);
  });
});
