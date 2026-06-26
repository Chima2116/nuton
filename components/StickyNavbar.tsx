"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Logo from "./Logo";
import { scrollToSection } from "@/lib/scroll";

const links: { label: string; id: string }[] = [
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQs", id: "faqs" },
];

const EASE = cubicBezier(0.16, 1, 0.3, 1);

type Theme = "light" | "dark";

/**
 * Fixed top navigation:
 *  - desktop (md+): full pill with inline links + CTA
 *  - mobile/tablet (<md): logo + CTA + hamburger that opens an animated menu
 *  - gains a subtle blurred background once the page is scrolled
 *  - adapts its colour to the section behind it via `data-nav-theme`
 */
export default function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const probe = 54; // navbar vertical mid-point

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setOpen((o) => (o ? false : o)); // close the menu on scroll

      let next: Theme = "light";
      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          next = (el.dataset.navTheme as Theme) ?? "light";
        }
      });
      setTheme(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  const shell = isDark
    ? scrolled || open
      ? "border-white/10 bg-strong/70 shadow-[0_1px_4px_-2px_rgba(14,18,27,0.06)] backdrop-blur-md"
      : "border-white/10 bg-strong/30 backdrop-blur-sm"
    : scrolled || open
      ? "border-stroke-soft bg-white/80 shadow-[0_1px_4px_-2px_rgba(14,18,27,0.06)] backdrop-blur-md"
      : "border-stroke-soft bg-white";

  const textColor = isDark ? "text-white" : "text-strong";
  const cta = isDark ? "bg-white text-strong" : "bg-strong text-white";

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[694px] max-w-[calc(100%-2rem)] -translate-x-1/2">
      <nav className={`relative flex h-[64px] items-center justify-between rounded-full border px-3 transition-colors duration-300 sm:h-[68px] sm:px-4 ${shell}`}>
        <Logo dark={isDark} />

        {/* desktop links */}
        <ul className={`hidden items-center gap-4 md:flex ${textColor}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="block rounded-lg p-2.5 text-[14px] font-medium tracking-[-0.084px] transition-opacity hover:opacity-70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="#"
            className={`flex items-center justify-center rounded-full px-3.5 py-2.5 text-[14px] font-medium tracking-[-0.084px] transition-opacity hover:opacity-90 sm:px-4 sm:py-3 ${cta}`}
          >
            Sign Up
          </a>

          {/* hamburger — mobile/tablet only */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full md:hidden ${textColor}`}
          >
            <span className="relative block h-[14px] w-[18px]">
              <motion.span
                className="absolute left-0 block h-[2px] w-full rounded-full bg-current"
                animate={open ? { top: 6, rotate: 45 } : { top: 2, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ top: 2 }}
              />
              <motion.span
                className="absolute left-0 block h-[2px] w-full rounded-full bg-current"
                animate={open ? { top: 6, rotate: -45 } : { top: 10, rotate: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ top: 10 }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            className={`absolute left-0 right-0 top-[calc(100%+8px)] origin-top overflow-hidden rounded-[24px] border p-2 md:hidden ${
              isDark ? "border-white/10 bg-strong/90 backdrop-blur-md" : "border-stroke-soft bg-white/95 shadow-[0_12px_32px_-12px_rgba(14,18,27,0.12)] backdrop-blur-md"
            }`}
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className={`block rounded-2xl px-4 py-3.5 text-[16px] font-medium tracking-[-0.176px] transition-colors ${
                      isDark ? "text-white hover:bg-white/10" : "text-strong hover:bg-bg-weak"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tap-away backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 cursor-default md:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
