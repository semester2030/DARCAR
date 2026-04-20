import { Hono } from "hono";
import type { AppVariables } from "../../types/context.js";

/** Placeholder: signed upload URLs, image variants, video embed metadata */
export const mediaRouter = new Hono<{ Variables: AppVariables }>();

mediaRouter.get("/policy", (c) =>
  c.json({
    maxUploadMb: 50,
    allowedMime: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
    message: "Upload handlers to be implemented",
  }),
);
