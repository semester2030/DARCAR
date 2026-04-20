import type { MiddlewareHandler } from "hono";
import { randomUUID } from "node:crypto";
import type { AppVariables } from "../types/context.js";

export const requestId: MiddlewareHandler<{ Variables: AppVariables }> = async (c, next) => {
  const id = c.req.header("x-request-id") ?? randomUUID();
  c.set("requestId", id);
  c.header("x-request-id", id);
  await next();
};
