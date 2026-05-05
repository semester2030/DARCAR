import { test } from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultMediaUploadDir, resolveMediaUploadDir } from "./upload-dir.js";

const here = dirname(fileURLToPath(import.meta.url));
const expectedDefaultUploadDir = join(here, "..", "..", "..", "..", "data", "uploads");

test("defaultMediaUploadDir resolves to the repository data/uploads directory", () => {
  assert.equal(defaultMediaUploadDir(), expectedDefaultUploadDir);
});

test("resolveMediaUploadDir uses a non-empty override as-is", () => {
  assert.equal(resolveMediaUploadDir("/data/uploads"), "/data/uploads");
  assert.equal(resolveMediaUploadDir("  /data/uploads  "), "/data/uploads");
});

test("resolveMediaUploadDir falls back for missing or blank overrides", () => {
  assert.equal(resolveMediaUploadDir(), expectedDefaultUploadDir);
  assert.equal(resolveMediaUploadDir("  "), expectedDefaultUploadDir);
});
