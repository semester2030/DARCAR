import { Hono } from "hono";
import type { Env } from "../../config/env.js";
import type { AppVariables } from "../../types/context.js";
import { loadHomePageJson } from "../../content/load-home-page.js";
import { saveHomePageJson } from "../../content/save-home-page.js";

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

  return admin;
}
