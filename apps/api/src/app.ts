import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env } from "./config/env.js";
import { requestId } from "./middleware/request-id.js";
import { createV1Router } from "./routes/v1/index.js";
import type { AppVariables } from "./types/context.js";

export function createApp(env: Env) {
  const app = new Hono<{ Variables: AppVariables }>();

  app.use("*", logger());
  app.use("*", requestId);
  app.use(
    "*",
    cors({
      origin: env.CORS_ORIGIN.split(",").map((s) => s.trim()),
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "x-request-id"],
    }),
  );

  app.get("/", (c) =>
    c.json({
      name: "Dar Car API",
      docs: "/v1/health",
    }),
  );

  app.route("/v1", createV1Router(env));

  return app;
}
