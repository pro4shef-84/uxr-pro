import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-bold text-lg mb-3">
            <span style={{ color: "var(--accent)" }}>Random</span>
            <span className="text-white"> Creation</span>
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            AI automation studio. We deploy agents that run while you sleep, eliminate manual work, and compound over time.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-dim)" }}>
            Navigate
          </p>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/",        label: "Home" },
              { href: "/services",label: "Services" },
              { href: "/about",   label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-dim)" }}>
            Contact
          </p>
          <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
            <li>hello@randomcreation.io</li>
            <li>Denver, CO</li>
          </ul>
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex mt-6 !py-2.5 !px-5 !text-sm !rounded-xl"
          >
            Book a call
          </a>
        </div>
      </div>

      <div
        className="text-center py-5 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-dim)" }}
      >
        © {new Date().getFullYear()} Random Creation. All rights reserved.
      </div>
    </footer>
  );
}
