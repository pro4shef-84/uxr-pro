import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white text-xl font-extrabold tracking-tight mb-2">AutomateIQ</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            AI-powered automation consulting that turns hours of manual work into minutes.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>hello@automateiq.io</li>
            <li>Denver, CO</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-700/50 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} AutomateIQ. All rights reserved.
      </div>
    </footer>
  );
}
