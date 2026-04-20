import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
};

const MAX_BYTES = 50 * 1024 * 1024;

export type SaveUploadResult =
  | { ok: true; filename: string; mime: string; size: number }
  | { ok: false; error: string };

export async function saveUploadedMedia(
  uploadDir: string,
  file: File,
): Promise<SaveUploadResult> {
  const mime = file.type || "application/octet-stream";
  const ext = MIME_TO_EXT[mime];
  if (!ext) {
    return { ok: false, error: "UNSUPPORTED_MEDIA_TYPE" };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "FILE_TOO_LARGE" };
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}${ext}`;
  const dest = join(uploadDir, filename);
  await writeFile(dest, buf);
  return { ok: true, filename, mime, size: buf.length };
}
