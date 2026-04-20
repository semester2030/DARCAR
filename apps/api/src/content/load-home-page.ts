import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveHomeJsonPath(): string {
  const override = process.env.HOME_PAGE_JSON_PATH?.trim();
  if (override) return override;
  return join(__dirname, "..", "..", "..", "..", "data", "home.v1.json");
}

/** افتراضياً: `data/home.v1.json` — أو `HOME_PAGE_JSON_PATH` (مثلاً على قرص Render دائم) */
export function loadHomePageJson(): unknown {
  const path = resolveHomeJsonPath();
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw) as unknown;
}
