import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { SiteShell } from "@/components/layout/site-shell";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.nameAr,
    template: `%s | ${siteConfig.nameAr}`,
  },
  description: siteConfig.taglineAr,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: امتدادات المتصفح (Grammarly وغيرها) تضيف سمات لـ body وتسبب تحذير React */}
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
