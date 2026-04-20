import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));

const defaultInbox = join(__dirname, "..", "..", "..", "..", "data", "contact-inbox.jsonl");

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  /** مفتاح Bearer لمسارات PUT/GET /v1/admin/* — يجب أن يطابق ما يُرسل من خادم الويب (سري) */
  ADMIN_API_KEY: z.string().min(8).optional(),
  /** مسار ملف سجل طلبات التواصل (سطر JSON لكل رسالة) */
  CONTACT_INBOX_PATH: z.string().default(defaultInbox),
  /** مفتاح Resend — إن وُجد مع `RESEND_FROM` و`CONTACT_NOTIFY_TO` يُرسل إشعار بريد */
  RESEND_API_KEY: z.string().min(8).optional(),
  /** مرسل معتمد في Resend، مثل: Dar Car &lt;noreply@yourdomain.com&gt; */
  RESEND_FROM: z.string().min(3).optional(),
  /** مستلمون (بريد الفريق)، مفصولون بفاصلة */
  CONTACT_NOTIFY_TO: z.string().optional(),
  /** مجلد رفع الوسائط (صور/فيديو) — على Render مع قرص استخدم مثل `/data/uploads` */
  MEDIA_UPLOAD_DIR: z.string().optional(),
});

export type Env = z.infer<typeof schema>;

export function loadEnv(): Env {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}
