import type { HomePageDocument } from "./home-content";
import { isHomePageDocument } from "./home-content";
import { fetchApi } from "./api-client";
import homeFallback from "../../../../data/home.v1.json";

/**
 * المحتوى الافتراضي من `data/home.v1.json` (مُضمَّن في البناء).
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

  if (isHomePageDocument(homeFallback)) return homeFallback;
  throw new Error("Invalid home.v1.json fallback");
}
