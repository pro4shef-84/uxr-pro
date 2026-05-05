import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — AutomateIQ",
  description:
    "AutomateIQ is an AI automation consultancy helping growing businesses eliminate manual work and unlock scale.",
};

const values = [
  {
    icon: "🎯",
    title: "Results before theory",
    desc: "We measure success in hours saved and revenue generated — not in decks delivered.",
  },
  {
    icon: "🔍",
    title: "Radical transparency",
    desc: "You always know what we're building, why, and what it will cost. No surprises.",
  },
  {
    icon: "🏗️",
    title: "Build to last",
    desc: "We document everything so your team can own and extend the systems we build.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About AutomateIQ</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          We&apos;re a small, senior team obsessed with one thing: making your business run without you having to babysit it.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5">
          <p>
            AutomateIQ was founded after watching talented teams burn hundreds of hours a month on work
            that software could — and should — be doing for them. Copy-pasting between systems. Manually
            following up on leads. Building reports by hand every Friday.
          </p>
          <p>
            We built this consultancy to fix that. We combine deep process knowledge with hands-on AI
            and automation engineering to design systems that actually stick. Not pilot programs that die
            in Q2 — real infrastructure that compounds over time.
          </p>
          <p>
            Our team has shipped automation for mortgage lenders, SaaS sales orgs, healthcare practices,
            and e-commerce brands. We bring that cross-industry pattern-matching to every engagement.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">How we work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center px-6">
                <p className="text-5xl mb-4">{v.icon}</p>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Let&apos;s build something that lasts</h2>
        <p className="text-gray-500 mb-8">
          Start with a free 30-minute audit — no pitch, just a clear picture of what&apos;s possible for your business.
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors"
        >
          Book a Free Audit →
        </Link>
      </section>
    </>
  );
}
