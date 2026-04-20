"use client";

import type { IconKey } from "@/lib/home-content";

const common = "h-7 w-7 shrink-0 transition-transform duration-[var(--dc-duration-base)] ease-out";

export function DcIcon({ name, className = "" }: { name: IconKey; className?: string }) {
  const cn = `${common} ${className}`.trim();
  switch (name) {
    case "map":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 4.5 3 6v13.5l6-1.5 6 1.5 6-1.5V6l-6 1.5L9 4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="m9 4.5 6 1.5v13.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "media":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="m7 15 3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="7" r="3.5" fill="currentColor" className="opacity-25" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 5 6v6c0 4 3.5 7.2 7 9 3.5-1.8 7-5 7-9V6l-7-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="m9.5 12 1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "spark":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="m12 7 1.6 4.4L18 13l-4.4 1.6L12 19l-1.6-4.4L6 13l4.4-1.6L12 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
