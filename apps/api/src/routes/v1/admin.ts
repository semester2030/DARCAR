import { Hono } from "hono";
import type { Env } from "../../config/env.js";
import type { AppVariables } from "../../types/context.js";
import { loadHomePageJson } from "../../content/load-home-page.js";
import { saveHomePageJson } from "../../content/save-home-page.js";
import { ensureMediaUploadDir, resolveMediaUploadDir } from "../../lib/upload-dir.js";
import { saveUploadedMedia } from "../../lib/save-uploaded-media.js";

function bearerKey(c: { req: { header: (n: string) => string | undefined } }): string {
  const h = c.req.header("authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m?.[1]?.trim() ?? "";
}

export function createAdminRouter(env: Env) {
  const admin = new Hono<{ Variables: AppVariables }>();

  admin.use("*", async (c, next) => {
    if (!env.ADMIN_API_KEY) {
      return c.json({ error: "ADMIN_API_KEY_NOT_SET" }, 503);
    }
    if (bearerKey(c) !== env.ADMIN_API_KEY) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    await next();
  });

  admin.get("/home", (c) => {
    try {
      const payload = loadHomePageJson();
      return c.json(payload);
    } catch (e) {
      console.error("admin GET /home failed", e);
      return c.json({ error: "HOME_PAYLOAD_UNAVAILABLE" }, 503);
    }
  });

  admin.put("/home", async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON body" }, 400);
    }
    try {
      const saved = saveHomePageJson(body);
      return c.json({ ok: true, version: saved.version });
    } catch (e) {
      const message = e instanceof Error ? e.message : "SAVE_FAILED";
      return c.json({ error: message }, 400);
    }
  });

  admin.post("/media", async (c) => {
    let body: Record<string, unknown>;
    try {
      body = (await c.req.parseBody({ all: true })) as Record<string, unknown>;
    } catch {
      return c.json({ error: "INVALID_MULTIPART" }, 400);
    }
    const file = body.file;
    if (!(file instanceof File)) {
      return c.json({ error: "MISSING_FILE", hint: "use form field name `file`" }, 400);
    }
    const dir = resolveMediaUploadDir(env.MEDIA_UPLOAD_DIR);
    try {
      await ensureMediaUploadDir(dir);
    } catch (e) {
      console.error("upload mkdir failed", e);
      return c.json({ error: "UPLOAD_DIR_UNAVAILABLE" }, 503);
    }
    const saved = await saveUploadedMedia(dir, file);
    if (!saved.ok) {
      const status = saved.error === "FILE_TOO_LARGE" ? 413 : 415;
      return c.json({ error: saved.error }, status);
    }
    const path = `/v1/media/files/${saved.filename}`;
    return c.json({
      ok: true,
      filename: saved.filename,
      path,
      mime: saved.mime,
      size: saved.size,
    });
  });

  return admin;
}
