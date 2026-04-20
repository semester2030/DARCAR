import { Hono } from "hono";
import type { AppVariables } from "../../types/context.js";

export const healthRouter = new Hono<{ Variables: AppVariables }>();

healthRouter.get("/", (c) =>
  c.json({
    ok: true,
    service: "dar-car-api",
    requestId: c.get("requestId"),
  }),
);
