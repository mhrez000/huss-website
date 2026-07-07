"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change (adjust-state-during-render pattern)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the mobile menu is open. Lenis drives scrolling on
  // the root, bypassing body overflow, so it must be stopped explicitly too.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  // If the viewport crosses the lg breakpoint while the menu is open, the
  // panel is display-hidden but scroll would stay locked — close it instead.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // While open: Escape closes (returning focus to the toggle), and Tab is
  // trapped, cycling through the toggle button + the menu panel's controls.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      const focusables = [toggleRef.current, ...(nodes ? Array.from(nodes) : [])].filter(
        (el): el is HTMLElement => el !== null
      );
      if (focusables.length === 0) return;
      e.preventDefault();
      const index = focusables.indexOf(document.activeElement as HTMLElement);
      const next =
        index === -1
          ? e.shiftKey
            ? focusables.length - 1
            : 0
          : (index + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
      focusables[next].focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  /** Transparent-over-hero only on the homepage before scroll. */
  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          overHero
            ? "bg-transparent"
            : "bg-cream/80 shadow-nav backdrop-blur-xl"
        )}
      >
        <nav
          className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className={cn(
              "text-base font-bold tracking-tight transition-colors",
              overHero ? "text-white" : "text-ink"
            )}
          >
            Huss<span className="text-accent">Media</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 text-xs font-normal transition-colors",
                      overHero
                        ? active
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                        : active
                          ? "text-ink"
                          : "text-stone hover:text-ink"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-xs font-medium transition-colors",
                overHero ? "text-white/80 hover:text-white" : "text-stone hover:text-ink"
              )}
            >
              <Phone className="size-4" aria-hidden />
              {site.phoneDisplay}
            </a>
            <Button href="/book" variant={overHero ? "light" : "primary"} size="sm">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={toggleRef}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              overHero ? "text-white" : "text-ink"
            )}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu — a SIBLING of the header, not a descendant: the header's
          backdrop-blur creates a containing block for fixed descendants, which
          would resolve the panel's height against the 48px header box (=> 0). */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-12 z-40 flex h-[calc(100dvh-3rem)] flex-col bg-cream lg:hidden"
          >
            <ul className="flex-1 space-y-1 overflow-y-auto px-6 pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3.5 text-2xl font-semibold text-ink hover:bg-ivory"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-3 border-t hairline p-6 pb-10">
              <Button
                href="/book"
                variant="accent"
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                Book a Shoot
              </Button>
              <div className="flex gap-3">
                <Button
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={closeMenu}
                >
                  <Phone className="size-4" aria-hidden /> Call
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={closeMenu}
                >
                  Email
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
