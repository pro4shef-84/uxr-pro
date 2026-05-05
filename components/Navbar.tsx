"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`w-full max-w-5xl mx-4 flex items-center justify-between px-5 h-14 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "glass shadow-2xl shadow-black/40"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            <span style={{ color: "var(--accent)" }}>R</span>
            <span className="text-white">andom</span>
            <span className="text-white/40 mx-1">·</span>
            <span className="text-white">Creation</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent !py-2 !px-5 !text-sm !rounded-xl"
            >
              Book Audit
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="absolute top-20 inset-x-4 glass rounded-2xl p-5 flex flex-col gap-4 shadow-2xl shadow-black/60">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent !py-2.5 !px-5 !text-sm text-center"
              onClick={() => setOpen(false)}
            >
              Book a Free Audit
            </a>
          </div>
        )}
      </header>
    </>
  );
}
