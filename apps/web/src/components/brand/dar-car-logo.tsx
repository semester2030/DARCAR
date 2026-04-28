import Image from "next/image";
import logoAsset from "@/components/icons/dar_car_logo.png";
import { siteConfig } from "@/lib/site-config";

/** أبعاد الملف الأصلية — للحفاظ على نسبة العرض إلى الارتفاع */
const W = 1536;
const H = 1024;

type DarCarLogoProps = {
  /** header: شريط علوي — hero: الصفحة الرئيسية — compact: قائمة الجوال — footer: تذييل */
  variant?: "header" | "hero" | "compact" | "footer";
  className?: string;
  priority?: boolean;
};

export function DarCarLogo({ variant = "header", className = "", priority = false }: DarCarLogoProps) {
  const sizeClass =
    variant === "hero"
      ? "h-[4.5rem] w-auto max-w-[min(100%,16rem)] sm:h-28 sm:max-w-[min(100%,20rem)]"
      : variant === "compact"
        ? "h-8 w-auto max-w-[6.25rem]"
        : variant === "footer"
          ? "h-12 w-auto max-w-[10rem] sm:h-14 sm:max-w-[11rem]"
          : "h-9 w-auto max-w-[7.25rem] sm:h-10 sm:max-w-[8.25rem]";

  return (
    <Image
      src={logoAsset}
      alt={`شعار ${siteConfig.nameAr}`}
      width={W}
      height={H}
      priority={priority}
      className={`object-contain object-center ${sizeClass} ${className}`.trim()}
    />
  );
}
