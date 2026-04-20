import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** جذر المشروع من `apps/api/src/lib` أو `apps/api/dist/lib` */
export function defaultMediaUploadDir(): string {
  return join(here, "..", "..", "..", "data", "uploads");
}

export function resolveMediaUploadDir(override?: string | undefined): string {
  const t = override?.trim();
  return t && t.length > 0 ? t : defaultMediaUploadDir();
}

export async function ensureMediaUploadDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}
