import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Spectral } from "next/font/google";
import "../app/globals.css";
import LenisScroll from "../components/LenisScroll";
import Cursor from "../components/Cursor";
import PageLoader from "../components/PageLoader";
import Header from "../components/Header";

const editorial = Spectral({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arey Studio — креативное агентство",
  description:
    "Визуальный идентитет, фестивальный брендинг, афиши и иммерсивный дизайн",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const navLinks = [
  { href: "/works", label: "Работы" },
  { href: "/team", label: "Команда" },
  { href: "/contact", label: "Контакты" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={editorial.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <LenisScroll />
        <Cursor />
        <PageLoader />
        <Header />

        {/* Main content */}
        <main className="relative z-10 pt-14 md:pt-16">{children}</main>

        {/* Footer */}
        <footer className="relative border-t border-white/[0.04]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 md:py-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-brand text-2xl text-white/60" style={{ fontFamily: "var(--font-brand)" }}>
                  Arey Agency
                </p>
                <p className="text-[11px] text-white/15 mt-2 tracking-wide">
                  Креативное агентство · Москва
                </p>
              </div>

              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-6 border-t border-white/[0.03] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[10px] text-white/10 tracking-wide">
                © {new Date().getFullYear()} Arey Studio. Все права защищены.
              </p>
              <a
                href="mailto:annaarey22@yandex.ru"
                className="text-[10px] text-white/15 hover:text-white/30 transition-colors duration-500 tracking-wide"
              >
                annaarey22@yandex.ru
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
