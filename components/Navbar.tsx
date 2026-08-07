"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Instagram } from "lucide-react";

const nav = [
  { label: "خانه", href: "#home" },
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "برندها", href: "#brands" },
  { label: "شوروم", href: "#showroom" },
  { label: "میز ملاقات", href: "#table" },
  { label: "پروژه‌ها", href: "#projects" },
  { label: "ارتباط", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const barTone = open || scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          barTone
            ? "bg-cream-100/90 backdrop-blur-md border-b border-line"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-12 md:py-5">
          <a
            href="#home"
            className={`display text-lg tracking-tight transition-colors md:text-2xl ${
              open ? "text-walnut-800" : "text-walnut-800"
            }`}
          >
            Design Station
          </a>

          {/* Desktop nav */}
          <nav className="hidden gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line text-sm text-walnut-800"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#table"
            className="btn btn-outline btn-fa hidden md:inline-flex"
          >
            رزرو میز
          </a>

          {/* Mobile hamburger — custom two-line that morphs to X */}
          <button
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((o) => !o)}
            className="relative -m-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">منو</span>
            <span aria-hidden className="relative block h-3.5 w-6">
              <motion.span
                className="absolute inset-x-0 top-0 h-px bg-walnut-800"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute inset-x-0 bottom-0 h-px bg-walnut-800"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            initial={reduce ? { opacity: 0 } : { x: "-100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream-100 md:hidden"
          >
            {/* Spacer to clear the fixed navbar */}
            <div className="h-[60px] shrink-0 border-b border-line" />

            {/* Meta strip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center justify-between border-b border-line px-6 py-4 text-walnut-700"
            >
              <p className="kicker">EST. 2026</p>
              <p className="kicker">TEHRAN · DUBAI</p>
            </motion.div>

            {/* Nav items */}
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={reduce ? undefined : { opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-4 text-walnut-800"
                >
                  <span className="kicker text-walnut-700 transition-colors group-hover:text-sage-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-fa flex-1 text-right text-2xl transition-colors group-hover:text-sage-600">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Footer contact block */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="shrink-0 space-y-5 border-t border-line px-6 pb-8 pt-6"
            >
              <a
                href="#table"
                onClick={() => setOpen(false)}
                className="btn btn-primary btn-fa btn-lg w-full justify-center"
              >
                رزرو میز ملاقات
              </a>

              <div className="grid grid-cols-2 gap-4 text-sm text-walnut-800">
                <a
                  href="mailto:s.nahvi@designstation.net"
                  className="flex items-center gap-2"
                  dir="ltr"
                >
                  <Mail size={14} className="text-walnut-700" />
                  <span>s.nahvi@designstation.net</span>
                </a>
                <a
                  href="https://instagram.com/designstation.iran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end gap-2"
                >
                  <Instagram size={14} className="text-walnut-700" />
                  <span>Instagram</span>
                </a>
              </div>

              <p className="flex items-center gap-2 text-sm text-walnut-700">
                <MapPin size={14} />
                <span>مرکز خرید پالادیوم، تهران</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
