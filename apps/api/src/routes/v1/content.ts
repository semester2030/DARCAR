import { Hono } from "hono";
import type { AppVariables } from "../../types/context.js";
import { loadHomePageJson } from "../../content/load-home-page.js";

/** Home payload from `data/home.v1.json` — later swappable for CMS/DB */
export const contentRouter = new Hono<{ Variables: AppVariables }>();

contentRouter.get("/home", (c) => {
  try {
    const payload = loadHomePageJson();
    return c.json(payload);
  } catch (e) {
    console.error("loadHomePageJson failed", e);
    return c.json({ error: "HOME_PAYLOAD_UNAVAILABLE" }, 503);
  }
});
