/** عنوان الـ API من الخادم (Vercel → خدمة الـ API العامة). */
export function getInternalApiBase(): string {
  const raw =
    process.env.API_INTERNAL_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://127.0.0.1:4000";
  return raw.replace(/\/$/, "");
}

export async function internalApiFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = getInternalApiBase();
  return fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
}
