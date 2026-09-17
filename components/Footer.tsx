"use client";

import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-display font-bold mb-4">Random Creation</h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {site.footer.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" style={{ color: "var(--text-muted)" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" style={{ color: "var(--text-muted)" }}>
                  {site.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: "var(--text-muted)" }}>
                  {site.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Get in touch</h4>
            <a href="tel:303-218-0821" className="block text-sm mb-4" style={{ color: "var(--accent)" }}>
              {site.footer.phone}
            </a>
            <Link href="/book" className="btn-secondary text-sm">
              Book a walk-through
            </Link>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
          <p>Random Creation · Denver, Colorado</p>
        </div>
      </div>
    </footer>
  );
}
