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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter] duration-[var(--dc-duration-base)] ease-out ${
        scrolled || menuOpen
          ? "border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/75 shadow-[var(--dc-shadow-sm)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-[var(--dc-radius-md)] px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dc-primary)]"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[var(--dc-radius-md)] bg-gradient-to-br from-[var(--dc-primary)] to-[var(--dc-primary-dark)] text-sm font-bold text-[var(--dc-surface)] shadow-md transition-transform duration-[var(--dc-duration-fast)] group-hover:scale-105"
            aria-hidden
          >
            د
          </span>
          <span
            className="text-lg font-bold text-[var(--dc-text-primary)] transition-colors group-hover:text-[var(--dc-primary)]"
            style={{ fontFamily: "var(--dc-font-display)" }}
          >
            {siteConfig.nameAr}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="رئيسي">
          {navItems.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-[var(--dc-radius-md)] px-2.5 py-2 text-sm font-semibold text-[var(--dc-text-secondary)] transition-colors hover:text-[var(--dc-primary)] after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:bg-[var(--dc-primary)] after:transition-transform after:duration-[var(--dc-duration-base)] hover:after:origin-left hover:after:scale-x-100 xl:px-3"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#download"
            className="hidden min-h-9 items-center justify-center rounded-[var(--dc-radius-md)] bg-[var(--dc-primary)] px-3 text-xs font-bold text-[var(--dc-surface)] shadow-sm transition-[transform,box-shadow] duration-[var(--dc-duration-fast)] hover:-translate-y-0.5 hover:shadow-md sm:inline-flex sm:px-4 sm:text-sm"
          >
            جرّب دار كار
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--dc-radius-md)] border border-[var(--dc-primary-light)] bg-[var(--dc-surface)]/80 text-[var(--dc-text-primary)] transition-colors hover:bg-[var(--dc-primary-light-lighter)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? "إغلاق القائمة" : "فتح القائمة"}</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
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
              className="fixed inset-0 z-40 bg-[var(--dc-text-primary)]/25 backdrop-blur-sm lg:hidden"
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
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-[var(--dc-primary-light)] bg-[var(--dc-surface)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--dc-primary-light)] px-4 py-3">
                <span className="font-bold text-[var(--dc-text-primary)]">القائمة</span>
                <button
                  type="button"
                  className="rounded-[var(--dc-radius-md)] p-2 text-[var(--dc-text-secondary)] hover:bg-[var(--dc-primary-light-lighter)]"
                  onClick={() => setMenuOpen(false)}
                  aria-label="إغلاق"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
                {navItems.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduce ? 0 : i * 0.05,
                      duration: dcMotion.fast,
                      ease: dcMotion.easeOut,
                    }}
                  >
                    <Link
                      href={l.href}
                      className="block rounded-[var(--dc-radius-md)] px-4 py-3 text-base font-semibold text-[var(--dc-text-primary)] transition-colors hover:bg-[var(--dc-primary-light-lighter)] hover:text-[var(--dc-primary)]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-[var(--dc-primary-light)] p-4">
                <Link
                  href="/#download"
                  className="flex w-full items-center justify-center rounded-[var(--dc-radius-lg)] bg-[var(--dc-primary)] py-3 text-sm font-bold text-[var(--dc-surface)]"
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
