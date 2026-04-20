import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { internalApiFetch } from "@/lib/api-internal";
import { isAdminAuthenticated } from "@/lib/require-admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "ADMIN_API_KEY_NOT_SET_ON_WEB" }, { status: 503 });
  }
  const res = await internalApiFetch("/v1/admin/home", {
    method: "GET",
    headers: { Authorization: `Bearer ${key}` },
  });
  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ error: text || res.statusText }, { status: res.status });
  }
  try {
    return NextResponse.json(JSON.parse(text) as unknown);
  } catch {
    return NextResponse.json({ error: "Invalid upstream JSON" }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "ADMIN_API_KEY_NOT_SET_ON_WEB" }, { status: 503 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const res = await internalApiFetch("/v1/admin/home", {
    method: "PUT",
    headers: { Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    let err: unknown = text;
    try {
      err = JSON.parse(text) as unknown;
    } catch {
      /* keep text */
    }
    return NextResponse.json(typeof err === "object" ? err : { error: text }, { status: res.status });
  }
  revalidatePath("/");
  try {
    return NextResponse.json(JSON.parse(text) as unknown);
  } catch {
    return NextResponse.json({ ok: true });
  }
}
