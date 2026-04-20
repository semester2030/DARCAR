import { config as loadDotenv } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { loadEnv } from "./config/env.js";
import { createApp } from "./app.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadDotenv({ path: join(__dirname, "../.env") });
loadDotenv({ path: join(__dirname, "../.env.local"), override: true });

const env = loadEnv();
const app = createApp(env);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Dar Car API listening on http://127.0.0.1:${info.port}`);
  },
);
