/** أسماء ملفات الوسائط المرفوعة: UUID v4 + امتداد معروف فقط — يمنع التسلل خارج المجلد */
export const MEDIA_FILENAME_SAFE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpe?g|png|webp|mp4|webm)$/i;

export function isSafeMediaFilename(name: string): boolean {
  return MEDIA_FILENAME_SAFE.test(name);
}

const EXT_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export function contentTypeForMediaFilename(filename: string): string {
  const dot = filename.lastIndexOf(".");
  if (dot < 0) return "application/octet-stream";
  return EXT_MIME[filename.slice(dot).toLowerCase()] ?? "application/octet-stream";
}
