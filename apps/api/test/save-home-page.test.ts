import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { homePageJsonSchema } from "../src/content/home-schema.js";
import { saveHomePageJson } from "../src/content/save-home-page.js";

const validHomeDocument = {
  version: 2,
  meta: {
    titleAr: "دار كار",
    descriptionAr: "وصف",
  },
  blocks: [
    {
      type: "hero",
      id: "hero-main",
      eyebrowAr: "سطر علوي",
      headlineAr: "عنوان",
      subheadlineAr: "وصف",
      primaryCta: { labelAr: "ابدأ", href: "#start" },
      secondaryCta: { labelAr: "المزيد", href: "#more" },
      badgesAr: ["شارة"],
    },
  ],
};

function withTempHomeFile(run: (file: string) => void) {
  const previousPath = process.env.HOME_PAGE_JSON_PATH;
  const dir = mkdtempSync(join(tmpdir(), "dar-home-"));
  const file = join(dir, "home.json");
  process.env.HOME_PAGE_JSON_PATH = file;
  try {
    run(file);
  } finally {
    if (previousPath === undefined) {
      delete process.env.HOME_PAGE_JSON_PATH;
    } else {
      process.env.HOME_PAGE_JSON_PATH = previousPath;
    }
    rmSync(dir, { recursive: true, force: true });
  }
}

test("home schema accepts the checked-in home content", () => {
  const fixture = JSON.parse(readFileSync(new URL("../../../data/home.v1.json", import.meta.url), "utf8")) as unknown;
  assert.equal(homePageJsonSchema.safeParse(fixture).success, true);
});

test("saveHomePageJson rejects malformed blocks before overwriting existing content", () => {
  withTempHomeFile((file) => {
    writeFileSync(file, "sentinel\n", "utf8");

    assert.throws(
      () =>
        saveHomePageJson({
          version: 2,
          meta: {
            titleAr: "دار كار",
            descriptionAr: "وصف",
          },
          blocks: [
            {
              type: "feature_spotlight",
              id: "spotlight-broken",
              sectionTitleAr: "عنوان",
              sectionSubtitleAr: "وصف",
            },
          ],
        }),
      /blocks\.0\.items/,
    );
    assert.equal(readFileSync(file, "utf8"), "sentinel\n");
  });
});

test("saveHomePageJson preserves valid renderable content and extra metadata", () => {
  withTempHomeFile((file) => {
    const saved = saveHomePageJson({
      ...validHomeDocument,
      draftNote: "kept",
      meta: {
        ...validHomeDocument.meta,
        socialTitleAr: "عنوان اجتماعي",
      },
      blocks: [
        {
          ...validHomeDocument.blocks[0],
          analyticsKey: "hero",
        },
      ],
    });

    const written = JSON.parse(readFileSync(file, "utf8")) as {
      draftNote?: string;
      meta?: { socialTitleAr?: string };
      blocks?: Array<{ analyticsKey?: string }>;
      version?: number;
    };

    assert.equal(saved.version, 2);
    assert.equal(written.version, 2);
    assert.equal(written.draftNote, "kept");
    assert.equal(written.meta?.socialTitleAr, "عنوان اجتماعي");
    assert.equal(written.blocks?.[0]?.analyticsKey, "hero");
  });
});
