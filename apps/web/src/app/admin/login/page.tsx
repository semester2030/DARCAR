import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "./admin-login-form";

export const metadata: Metadata = {
  title: "دخول المحرر",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-[var(--dc-text-secondary)]">…</p>}>
      <AdminLoginForm />
    </Suspense>
  );
}
