import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact — Random Creation",
  description: "Book a free 30-minute automation audit with Random Creation.",
};

const benefits = [
  "30 minutes. You talk, we listen — zero deck, zero pitch.",
  "We map your top 3 automation opportunities with estimated time savings.",
  "You leave with a written roadmap — yours to keep, whether you hire us or not.",
];

export default function Contact() {
  return (
    <>
      <section className="mesh-hero pt-36 pb-16 text-center px-4">
        <FadeIn>
          <span className="pill mb-4 inline-flex" style={{ color: "var(--text-muted)" }}>Free audit</span>
          <h1
            className="font-display font-extrabold text-5xl md:text-6xl mt-4 mb-4"
            style={{ color: "var(--text)" }}
          >
            Book a Free Audit
          </h1>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            In 30 minutes, we&apos;ll identify your top automation opportunities and give you a written roadmap — yours to keep, whether you hire us or not.
          </p>
        </FadeIn>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: benefits */}
        <FadeIn>
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text)" }}>
              What you&apos;ll get
            </h2>
            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{b}</span>
                </li>
              ))}
            </ul>

            {/* Calendar CTA */}
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl group transition-all"
              style={{
                background: "var(--accent-dim)",
                border: "1px solid rgba(185,255,102,0.2)",
              }}
            >
              <span className="text-3xl">📅</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "var(--accent)" }}>Book directly on my calendar</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Pick a time — no back-and-forth</p>
              </div>
              <span className="group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent)" }}>→</span>
            </a>

            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Prefer email?</p>
              <a
                href="mailto:hello@randomcreation.io"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--brand)" }}
              >
                hello@randomcreation.io
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right: form */}
        <FadeIn delay={100}>
          <div
            className="rounded-3xl p-8"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <ContactForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
