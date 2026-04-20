function publicEnvUrl(key: "NEXT_PUBLIC_IOS_APP_STORE_URL" | "NEXT_PUBLIC_GOOGLE_PLAY_URL", fallback: string): string {
  const v = process.env[key]?.trim();
  return v && v.length > 0 ? v : fallback;
}

/** روابط متاجر التطبيق — عيّن المعرفات الحقيقية في `.env` قبل الإنتاج */
export const storeUrls = {
  iosAppStoreUrl: publicEnvUrl(
    "NEXT_PUBLIC_IOS_APP_STORE_URL",
    "https://apps.apple.com/sa/app/dar-car/id0000000000",
  ),
  googlePlayUrl: publicEnvUrl(
    "NEXT_PUBLIC_GOOGLE_PLAY_URL",
    "https://play.google.com/store/apps/details?id=com.darcar.app",
  ),
} as const;

/** Public site metadata — single place for names, nav, and contact hints */
export const siteConfig = {
  nameAr: "دار كار",
  nameEn: "Dar Car",
  taglineAr: "عقارات وسيارات — منصة احترافية",
  defaultLocale: "ar" as const,
  locales: ["ar", "en"] as const,
  supportEmail: "support@reca.com",
  /** روابط التنقل — تُستخدم في الهيدر والفوتر */
  nav: [
    { href: "/", label: "الرئيسية" },
    { href: "/#about-dar-car", label: "التعريف" },
    { href: "/#features", label: "المزايا" },
    { href: "/#tech", label: "التقنية" },
    { href: "/download", label: "التحميل" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل" },
  ] as const,
  legal: [
    { href: "/terms", label: "الشروط" },
    { href: "/privacy", label: "الخصوصية" },
  ] as const,
} as const;
