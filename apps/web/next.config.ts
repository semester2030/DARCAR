import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** جذر مشروع دار كار (مجلد `package.json` workspaces) — لتتبع الملفات في البناء */
const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** يضمّ `node_modules` المرفوع في جذر الـ monorepo عند بناء السيرفر */
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["framer-motion"],
};

export default nextConfig;
