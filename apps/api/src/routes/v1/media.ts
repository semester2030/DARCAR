import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Hono } from "hono";
import type { Env } from "../../config/env.js";
import { contentTypeForMediaFilename, isSafeMediaFilename } from "../../lib/media-file.js";
import type { AppVariables } from "../../types/context.js";
import { resolveMediaUploadDir } from "../../lib/upload-dir.js";

export function createMediaRouter(env: Env) {
  const mediaRouter = new Hono<{ Variables: AppVariables }>();

  mediaRouter.get("/policy", (c) =>
    c.json({
      maxUploadMb: 50,
      allowedMime: ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"],
      uploadPath: "POST /v1/admin/media (Bearer) form field `file`",
      publicUrlPattern: "/v1/media/files/{uuid}.{ext}",
    }),
  );

  /** قراءة عامة للملفات المرفوعة (روابط تُضمّن في الصفحة الرئيسية) */
  mediaRouter.get("/files/:name", async (c) => {
    const name = c.req.param("name");
    if (!isSafeMediaFilename(name)) {
      return c.body(null, 404);
    }
    const dir = resolveMediaUploadDir(env.MEDIA_UPLOAD_DIR);
    const full = join(dir, name);
    try {
      const s = await stat(full);
      if (!s.isFile()) {
        return c.body(null, 404);
      }
    } catch {
      return c.body(null, 404);
    }
    const type = contentTypeForMediaFilename(name);
    return new Response(createReadStream(full), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  });

  return mediaRouter;
}
