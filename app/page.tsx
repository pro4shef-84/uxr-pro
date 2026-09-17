import Link from "next/link";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="py-24 px-4 text-center">
        <FadeIn>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 max-w-3xl mx-auto leading-tight">
            {site.hero.headline}
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {site.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/book" className="btn-primary">
              📅 {site.hero.cta}
            </Link>
            <a href="tel:303-218-0821" className="btn-secondary">
              📞 {site.closing.phone}
            </a>
          </div>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {site.hero.meta}
          </p>
        </FadeIn>
      </section>

      {/* ── WALK-THROUGH EXPLAINED ── */}
      <section className="py-24 px-4 bg-white/50 border-t border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl mb-6">{site.walkthrough.title}</h2>
            <div className="space-y-4 text-base leading-relaxed">
              {site.walkthrough.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE THREE THINGS ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {site.three.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="pb-8 border-b" style={{ borderColor: "var(--border)" }}>
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--accent)" }}>
                    {item.num}
                  </p>
                  <h3 className="font-display font-bold text-2xl mb-3">{item.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO I WORK WITH ── */}
      <section className="py-24 px-4 bg-white/50" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl mb-6">{site.who.title}</h2>
            <p className="text-lg mb-6">{site.who.description}</p>
            <p className="italic" style={{ color: "var(--text-muted)" }}>
              {site.who.exclusion}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl mb-12">How it works</h2>
            <div className="space-y-8">
              {site.process.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p style={{ color: "var(--text-muted)" }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT THE AI PART ── */}
      <section className="py-24 px-4 bg-white/50" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl mb-6">{site.ai.title}</h2>
            <div className="space-y-4">
              {site.ai.description.split("\n\n").map((para, i) => (
                <p key={i} style={{ color: "var(--text-muted)" }}>
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-24 px-4 text-center">
        <FadeIn>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 max-w-3xl mx-auto">
            {site.closing.title}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {site.closing.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">
              {site.closing.cta}
            </Link>
            <a href="tel:303-218-0821" className="btn-secondary">
              📞 {site.closing.phone}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
