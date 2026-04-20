import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { HomePageDocument } from "./home-content";
import { isHomePageDocument } from "./home-content";
import { fetchApi } from "./api-client";

/**
 * يبحث عن `data/home.v1.json` في جذر المستودع دون الاعتماد على استيراد JSON من خارج `apps/web`
 * (يُجنّب أعطال Turbopack/البناء عند مسارات نسبية عبر workspaces).
 */
function resolveHomeFallbackPath(): string | null {
  const cwd = process.cwd();
  const candidates = [
    join(cwd, "..", "..", "data", "home.v1.json"),
    join(cwd, "data", "home.v1.json"),
    join(cwd, "..", "data", "home.v1.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function loadHomeFallbackFromDisk(): unknown {
  const path = resolveHomeFallbackPath();
  if (!path) {
    throw new Error(
      `لم يُعثر على data/home.v1.json (cwd=${process.cwd()}). تأكد أنك تشغّل الويب من مجلد apps/web أو جذر dar_car_marketing.`,
    );
  }
  return JSON.parse(readFileSync(path, "utf8")) as unknown;
}

/**
 * المحتوى من `data/home.v1.json` في المستودع، أو من الـ API عند التفعيل.
 *
 * لتفعيل الجلب الحي من الـ API أثناء التشغيل أو البناء، عيّن في `.env.local`:
 *   NEXT_PUBLIC_USE_HOME_API=true
 * وشغّل الـ API على `NEXT_PUBLIC_API_URL` (افتراضيًا 127.0.0.1:4000).
 *
 * بدون هذا المتغير لا نستدعي الشبكة — فيتجنب `next build` أخطاء ECONNREFUSED عندما الـ API متوقف.
 */
export async function getHomeContent(): Promise<HomePageDocument> {
  const useApi = process.env.NEXT_PUBLIC_USE_HOME_API === "true";

  if (useApi) {
    try {
      const data = await fetchApi<unknown>("/v1/content/home");
      if (isHomePageDocument(data)) return data;
    } catch {
      /* API غير متاح — نعود للملف */
    }
  }

  const homeFallback = loadHomeFallbackFromDisk();
  if (isHomePageDocument(homeFallback)) return homeFallback;
  throw new Error("Invalid home.v1.json fallback");
}
