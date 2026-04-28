"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DarCarLogo } from "@/components/brand/dar-car-logo";
import { siteConfig } from "@/lib/site-config";
import { dcMotion } from "@/theme";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const navItems = [...siteConfig.nav];

  return (
    <header
      className={`sticky top-0 z-50 transition-[box-shadow] duration-[var(--dc-duration-base)] ${
        scrolled || menuOpen ? "shadow-[var(--dc-header-shadow)]" : ""
      }`}
    >
      <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dc-primary)]"
            onClick={() => setMenuOpen(false)}
          >
            <motion.span
              className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-200/80 transition-shadow duration-[var(--dc-duration-fast)] group-hover:shadow-md group-hover:ring-sky-200/60"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              aria-hidden
            >
              <DarCarLogo variant="header" priority />
            </motion.span>
            <span className="min-w-0 text-start">
              <span
                className="block truncate text-lg font-extrabold text-[var(--dc-text-primary)] transition-colors group-hover:text-[var(--dc-primary)]"
                style={{ fontFamily: "var(--dc-font-display)" }}
              >
                {siteConfig.nameAr}
              </span>
              <span className="block truncate text-[11px] font-semibold leading-tight text-[var(--dc-text-muted)] sm:text-xs">
                للعقارات والسيارات
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="رئيسي">
            {navItems.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-[var(--dc-text-secondary)] transition-[transform,background-color,color,box-shadow] duration-[var(--dc-duration-fast)] hover:-translate-y-0.5 hover:bg-sky-50 hover:text-[var(--dc-primary-dark)] hover:shadow-sm xl:px-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Link
                href="/#download"
                className="hidden min-h-10 items-center justify-center rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] to-[var(--dc-primary)] px-5 text-xs font-bold text-white shadow-md ring-1 ring-sky-200/50 transition-[box-shadow] duration-[var(--dc-duration-fast)] hover:shadow-[var(--dc-shadow-glow)] sm:inline-flex sm:min-h-11 sm:text-sm"
              >
                جرّب دار كار
              </Link>
            </motion.div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50/90 text-[var(--dc-text-primary)] transition-[transform,background-color,border-color] duration-[var(--dc-duration-fast)] hover:scale-105 hover:border-sky-200 hover:bg-sky-50 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "إغلاق القائمة" : "فتح القائمة"}</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {menuOpen ? (
          <>
            <motion.button
              key="nav-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : dcMotion.fast }}
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm lg:hidden"
              aria-label="إغلاق القائمة"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="nav-drawer"
              id="mobile-nav"
              initial={reduce ? { opacity: 1, x: 0 } : { x: "100%", opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: "100%", opacity: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col border-l border-slate-100 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-l from-white to-sky-50/50 px-4 py-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200/70">
                    <DarCarLogo variant="compact" />
                  </span>
                  <span className="truncate font-extrabold text-[var(--dc-text-primary)]">القائمة</span>
                </div>
                <button
                  type="button"
                  className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-sky-100/80 hover:text-[var(--dc-primary)]"
                  onClick={() => setMenuOpen(false)}
                  aria-label="إغلاق"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
                {navItems.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduce ? 0 : i * 0.05,
                      duration: dcMotion.base,
                      ease: dcMotion.easeOut,
                    }}
                  >
                    <Link
                      href={l.href}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 text-base font-bold text-[var(--dc-text-primary)] shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-[var(--dc-duration-base)] hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/60 hover:shadow-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{l.label}</span>
                      <span className="text-[var(--dc-primary)]" aria-hidden>
                        ‹
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-slate-100 p-4">
                <Link
                  href="/#download"
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-l from-[var(--dc-primary-dark)] to-[var(--dc-primary)] py-3.5 text-sm font-extrabold text-white shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  جرّب دار كار
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
