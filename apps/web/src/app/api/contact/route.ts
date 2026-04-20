import { NextResponse } from "next/server";
import { internalApiFetch } from "@/lib/api-internal";

const bodySchema = {
  parse(data: unknown):
    | { ok: true; value: { name: string; email: string; message: string; company?: string } }
    | { ok: false; error: string } {
    if (typeof data !== "object" || data === null) {
      return { ok: false, error: "Invalid body" };
    }
    const o = data as Record<string, unknown>;
    const name = typeof o.name === "string" ? o.name.trim() : "";
    const email = typeof o.email === "string" ? o.email.trim() : "";
    const message = typeof o.message === "string" ? o.message.trim() : "";
    const company = typeof o.company === "string" ? o.company : undefined;
    if (!name || name.length > 200) return { ok: false, error: "Invalid name" };
    if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: "Invalid email" };
    }
    if (!message || message.length > 20_000) return { ok: false, error: "Invalid message" };
    return { ok: true, value: { name, email, message, company } };
  },
};

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.parse(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 422 });
  }
  const res = await internalApiFetch("/v1/contact", {
    method: "POST",
    body: JSON.stringify(parsed.value),
  });
  if (!res.ok) {
    const t = await res.text();
    return NextResponse.json({ error: t || "Upstream error" }, { status: res.status === 422 ? 422 : 502 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
