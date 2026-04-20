import { Hono } from "hono";
import type { Env } from "../../config/env.js";
import type { AppVariables } from "../../types/context.js";
import { healthRouter } from "./health.js";
import { contentRouter } from "./content.js";
import { mediaRouter } from "./media.js";
import { createAdminRouter } from "./admin.js";
import { createContactRouter } from "./contact.js";

export function createV1Router(env: Env) {
  const v1 = new Hono<{ Variables: AppVariables }>();

  v1.route("/health", healthRouter);
  v1.route("/content", contentRouter);
  v1.route("/media", mediaRouter);
  v1.route("/admin", createAdminRouter(env));
  v1.route("/contact", createContactRouter(env));

  return v1;
}
