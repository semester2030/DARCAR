import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { z } from "zod";
import { Hono } from "hono";
import type { Env } from "../../config/env.js";
import { sendResendContactNotification } from "../../lib/send-resend-contact.js";
import type { AppVariables } from "../../types/context.js";

const contactBodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(20_000),
  /** حقل وهمي ضد السبام — يجب أن يبقى فارغاً */
  company: z.string().optional(),
});

export function createContactRouter(env: Env) {
  const contact = new Hono<{ Variables: AppVariables }>();

  contact.post("/", async (c) => {
    let raw: unknown;
    try {
      raw = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON body" }, 400);
    }

    const parsed = contactBodySchema.safeParse(raw);
    if (!parsed.success) {
      return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 422);
    }

    const { name, email, message, company } = parsed.data;
    if (company?.trim()) {
      return c.json({ ok: true }, 201);
    }

    const line = {
      at: new Date().toISOString(),
      requestId: c.get("requestId"),
      name,
      email,
      message,
    };

    try {
      const dir = dirname(env.CONTACT_INBOX_PATH);
      mkdirSync(dir, { recursive: true });
      appendFileSync(env.CONTACT_INBOX_PATH, `${JSON.stringify(line)}\n`, "utf-8");
    } catch (e) {
      console.error("contact inbox write failed", e);
      return c.json({ error: "INBOX_WRITE_FAILED" }, 500);
    }

    try {
      await sendResendContactNotification(env, { name, email, message });
    } catch (e) {
      console.error("Resend notification error", e);
    }

    return c.json({ ok: true }, 201);
  });

  return contact;
}
