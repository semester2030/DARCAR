import { cookies } from "next/headers";
import { verifyAdminSession } from "./admin-session";

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const jar = await cookies();
  return await verifyAdminSession(jar.get("dc_admin")?.value, secret);
}
