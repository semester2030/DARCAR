import { NextResponse } from "next/server";
import { getInternalApiBase } from "@/lib/api-internal";
import { isAdminAuthenticated } from "@/lib/require-admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "ADMIN_API_KEY_NOT_SET_ON_WEB" }, { status: 503 });
  }
  const formData = await request.formData();
  const base = getInternalApiBase();
  const res = await fetch(`${base}/v1/admin/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: formData,
  });
  const text = await res.text();
  if (!res.ok) {
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  let parsed: { ok: true; path: string; filename: string; mime: string; size: number };
  try {
    parsed = JSON.parse(text) as typeof parsed;
  } catch {
    return NextResponse.json({ error: "Invalid upstream JSON" }, { status: 502 });
  }
  const publicBase = (process.env.NEXT_PUBLIC_API_URL?.trim() || base).replace(/\/$/, "");
  const url = `${publicBase}${parsed.path}`;
  return NextResponse.json({ ...parsed, url });
}
