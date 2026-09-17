"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-tight">
          Random Creation
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" style={{ color: "var(--text-muted)" }}>
            {site.nav.services}
          </Link>
          <Link href="/about" style={{ color: "var(--text-muted)" }}>
            {site.nav.about}
          </Link>
          <a href="tel:303-218-0821" style={{ color: "var(--text-muted)" }}>
            📞 {site.closing.phone}
          </a>
          <Link href="/book" className="btn-primary">
            {site.nav.book}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text)" }}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-4" style={{ borderColor: "var(--border)" }}>
          <Link href="/services" className="block" style={{ color: "var(--text-muted)" }}>
            {site.nav.services}
          </Link>
          <Link href="/about" className="block" style={{ color: "var(--text-muted)" }}>
            {site.nav.about}
          </Link>
          <a href="tel:303-218-0821" className="block" style={{ color: "var(--text-muted)" }}>
            📞 {site.closing.phone}
          </a>
          <Link href="/book" className="btn-primary block text-center">
            {site.nav.book}
          </Link>
        </div>
      )}
    </nav>
  );
}
