"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Great_Vibes } from "next/font/google";

const brandFont = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const navLinks = [
  { href: "/works", label: "Работы" },
  { href: "/team", label: "Команда" },
  { href: "/contact", label: "Контакты" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => { if (mq.matches) setMenuOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 md:h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className={`font-brand text-2xl md:text-3xl text-white hover:text-white/80 transition-colors duration-500 ${brandFont.className}`}
        >
          Arey Agency
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" data-cursor="hover">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-50 bg-[#050505]/95 backdrop-blur-xl">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-white/80 text-lg tracking-[0.15em] hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
