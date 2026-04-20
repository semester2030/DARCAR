import type { Env } from "../config/env.js";

type Payload = { name: string; email: string; message: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * إشعار عبر Resend بعد حفظ الرسالة محلياً.
 * يُرجع false إذا تُرك التكامل معطّلاً أو فشل الطلب (يُسجَّل في السجلات).
 */
export async function sendResendContactNotification(env: Env, p: Payload): Promise<boolean> {
  const key = env.RESEND_API_KEY?.trim();
  const from = env.RESEND_FROM?.trim();
  const rawTo = env.CONTACT_NOTIFY_TO?.trim();
  if (!key || !from || !rawTo) {
    return false;
  }

  const to = rawTo
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (to.length === 0) return false;

  const safeName = p.name.replace(/[\r\n]/g, " ").slice(0, 120);
  const subject = `تواصل من الموقع — ${safeName}`;
  const html = `
    <p><strong>الاسم:</strong> ${escapeHtml(p.name)}</p>
    <p><strong>البريد:</strong> <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></p>
    <p><strong>الرسالة:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(p.message)}</pre>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: p.email,
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    console.error("Resend contact notification failed", res.status, t);
    return false;
  }
  return true;
}
