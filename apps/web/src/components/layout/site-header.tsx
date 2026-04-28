"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
      <div className="border-b border-[var(--dc-primary)]/8 bg-[var(--dc-surface)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dc-primary)]"
            onClick={() => setMenuOpen(false)}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--dc-primary)] to-[var(--dc-primary-dark)] text-base font-black text-white shadow-md transition-transform duration-[var(--dc-duration-fast)] group-hover:scale-[1.03]"
              aria-hidden
            >
              د
            </span>
            <span className="min-w-0 text-start">
              <span
                className="block truncate text-lg font-extrabold text-[var(--dc-primary-dark)] transition-colors group-hover:text-[var(--dc-primary)]"
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
                className="rounded-full px-3.5 py-2 text-sm font-bold text-[var(--dc-text-secondary)] transition-colors hover:bg-[var(--dc-primary-light-lighter)] hover:text-[var(--dc-primary)] xl:px-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#download"
              className="hidden min-h-10 items-center justify-center rounded-full bg-[var(--dc-primary)] px-5 text-xs font-bold text-white shadow-md transition-[transform,box-shadow] duration-[var(--dc-duration-fast)] hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex sm:min-h-11 sm:text-sm"
            >
              جرّب دار كار
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--dc-primary)]/15 bg-[var(--dc-primary-light-lighter)] text-[var(--dc-primary-dark)] transition-colors hover:bg-[var(--dc-primary-light)] lg:hidden"
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
              className="fixed inset-0 z-40 bg-[var(--dc-primary-dark)]/30 backdrop-blur-sm lg:hidden"
              aria-label="إغلاق القائمة"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="nav-drawer"
              id="mobile-nav"
              initial={reduce ? { opacity: 1, x: 0 } : { x: "100%", opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: "100%", opacity: 0.98 }}
              transition={{ type: "spring", damping: 30, stiffness: 340 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col bg-[var(--dc-surface)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--dc-primary)]/10 bg-[var(--dc-primary)] px-4 py-4 text-white">
                <span className="font-extrabold">القائمة</span>
                <button
                  type="button"
                  className="rounded-xl p-2 text-white/90 hover:bg-white/15"
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
                    initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduce ? 0 : i * 0.04,
                      duration: dcMotion.fast,
                      ease: dcMotion.easeOut,
                    }}
                  >
                    <Link
                      href={l.href}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--dc-primary)]/10 px-4 py-3.5 text-base font-bold text-[var(--dc-text-primary)] transition-colors hover:border-[var(--dc-primary)]/25 hover:bg-[var(--dc-primary-light-lighter)]"
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
              <div className="border-t border-[var(--dc-primary)]/10 p-4">
                <Link
                  href="/#download"
                  className="flex w-full items-center justify-center rounded-full bg-[var(--dc-primary)] py-3.5 text-sm font-extrabold text-white shadow-md"
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
