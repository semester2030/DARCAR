import { renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homePageJsonSchema, type HomePageJsonValidated } from "./home-schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function homeJsonPath(): string {
  const override = process.env.HOME_PAGE_JSON_PATH?.trim();
  if (override) return override;
  return join(__dirname, "..", "..", "..", "..", "data", "home.v1.json");
}

/**
 * يتحقق من الشكل ثم يكتب الملف ذرّياً.
 * @throws إذا فشل التحقق أو الكتابة
 */
export function saveHomePageJson(data: unknown): HomePageJsonValidated {
  const parsed = homePageJsonSchema.safeParse(data);
  if (!parsed.success) {
    const msg = parsed.error.flatten().formErrors.join("; ") || "INVALID_HOME_PAYLOAD";
    throw new Error(msg);
  }
  const path = homeJsonPath();
  const tmp = `${path}.${Date.now()}.tmp`;
  const body = `${JSON.stringify(parsed.data, null, 2)}\n`;
  writeFileSync(tmp, body, "utf-8");
  renameSync(tmp, path);
  return parsed.data;
}
