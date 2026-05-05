import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About — Random Creation",
  description: "Built by operators, not agencies.",
};

const values = [
  { icon: "🎯", title: "Results before theory", desc: "We measure success in hours saved and revenue generated — not in decks delivered." },
  { icon: "🔍", title: "Radical transparency", desc: "You always know what we're building, why, and what it costs. No surprises." },
  { icon: "🏗️", title: "Build to last", desc: "We document everything so your team can own and extend the systems we build." },
];

export default function About() {
  return (
    <>
      <section className="mesh-hero pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <span className="pill mb-6 inline-flex" style={{ color: "var(--text-muted)" }}>Our story</span>
            <h1
              className="font-display font-extrabold text-4xl md:text-5xl mt-4 mb-6 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Built by operators,
              <br />
              <span style={{ color: "var(--accent)" }}>not agencies.</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We&apos;ve been inside the messy systems, the manual workarounds, the Friday afternoon reports. We build automation that actually gets used.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          <FadeIn>
            <p>
              We built Random Creation after watching a 12-person ops team spend 3 months manually reconciling
              data between two systems. One automation fixed it in a day. That gap — between what&apos;s possible
              and what teams are actually doing — is what we work on.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <p>
              We combine deep process knowledge with hands-on AI and automation engineering to design systems
              that actually stick. Not pilot programs that die in Q2 — real infrastructure that compounds over time.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p>
              Our team has shipped automation for mortgage lenders, SaaS sales orgs, healthcare practices,
              and e-commerce brands. We bring cross-industry pattern-matching to every engagement.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl mb-12 text-center" style={{ color: "var(--text)" }}>
              How we work
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 100}>
                <div className="bento-card p-8 text-center">
                  <span className="text-5xl mb-5 block">{v.icon}</span>
                  <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--text)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 py-24 text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: "var(--text)" }}>
            Let&apos;s build something that lasts.
          </h2>
          <p className="mb-8" style={{ color: "var(--text-muted)" }}>
            Start with a free 30-minute audit — no pitch, just a clear picture of what&apos;s possible.
          </p>
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex"
          >
            📅 Book a Free Audit →
          </a>
        </FadeIn>
      </section>
    </>
  );
}
