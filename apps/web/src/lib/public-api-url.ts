/** عنوان الـ API العام (للمعاينة وروابط الملفات في المتصفح) */
export function getPublicApiBase(): string {
  const b = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  return b.replace(/\/$/, "");
}
