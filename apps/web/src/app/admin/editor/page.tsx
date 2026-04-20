import type { Metadata } from "next";
import { AdminHomeEditor } from "@/components/admin/admin-home-editor";

export const metadata: Metadata = {
  title: "محرر المحتوى",
  robots: { index: false, follow: false },
};

export default function AdminEditorPage() {
  return <AdminHomeEditor />;
}
