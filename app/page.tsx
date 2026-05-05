import Link from "next/link";
import AuditWidget from "@/components/AuditWidget";
import AgentTicker from "@/components/AgentTicker";
import AgentCounter from "@/components/AgentCounter";
import FadeIn from "@/components/FadeIn";

const bento = [
  {
    size: "large",
    icon: "⚙️",
    title: "Workflow Automation",
    desc: "Connect your CRM, inbox, spreadsheets, and 500+ apps into self-running pipelines. No code, no maintenance.",
    tag: "Most deployed",
  },
  {
    size: "medium",
    icon: "🤖",
    title: "AI Agents",
    desc: "Custom agents that qualify leads, draft proposals, and handle follow-up 24/7 — trained on your business.",
    tag: "Highest ROI",
  },
  {
    size: "small",
    icon: "🔗",
    title: "Systems Integration",
    desc: "Siloed tools, connected. Data flows from intake to invoice without a human in the loop.",
    tag: null,
  },
  {
    size: "small",
    icon: "📊",
    title: "Reporting Automation",
    desc: "Your Friday afternoon report, built and sent automatically every week.",
    tag: null,
  },
];

const stats = [
  { value: "10+", label: "hrs saved per week" },
  { value: "2 wks", label: "avg deployment time" },
  { value: "50+", label: "client automations shipped" },
];


export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="mesh-hero relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Ambient glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(185,255,102,0.08) 0%, transparent 70%)" }}
        />

        {/* Pills row */}
        <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="pill text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            We build automation that runs while you sleep
          </span>
          <AgentCounter />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100 font-display font-extrabold leading-[0.95] tracking-tight mb-6 max-w-4xl"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", color: "var(--text)" }}
        >
          Your team is doing work{" "}
          <span style={{ color: "var(--accent)" }}>AI should own.</span>
        </h1>

        <p
          className="animate-fade-up delay-200 text-lg md:text-xl mb-10 max-w-xl"
          style={{ color: "var(--text-muted)" }}
        >
          Tell us your biggest bottleneck. We&apos;ll show you exactly what to automate
          and what it&apos;s costing you — free, in 60 seconds.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            📅 Book a Free Audit
          </a>
          <Link href="/services" className="btn-ghost">
            See how we work →
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up delay-400 glass rounded-2xl px-8 py-5 flex gap-10 flex-wrap justify-center"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display font-bold text-2xl"
                style={{ color: "var(--accent)" }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
          style={{ color: "var(--text-dim)" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── TICKER ── */}
      <AgentTicker />

      {/* ── AI AUDIT ── */}
      <section className="mesh-section relative py-24 px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <FadeIn>
            <span className="pill mb-4 inline-flex" style={{ color: "var(--accent)", borderColor: "var(--accent-dim)" }}>
              Live AI Analysis
            </span>
            <h2
              className="font-display font-bold text-4xl md:text-5xl mt-4 mb-4"
              style={{ color: "var(--text)" }}
            >
              See your automation roadmap
              <br />
              <span style={{ color: "var(--text-muted)" }}>in 60 seconds.</span>
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Powered by Claude AI — the same agent stack we deploy for clients.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={100}>
          <AuditWidget />
        </FadeIn>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-14">
              <span className="pill mb-4 inline-flex" style={{ color: "var(--text-muted)" }}>
                What we build
              </span>
              <h2
                className="font-display font-bold text-4xl md:text-5xl mt-4 max-w-xl"
                style={{ color: "var(--text)" }}
              >
                Not software.
                <br />
                <span style={{ color: "var(--accent)" }}>Systems.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
            {/* Large card — spans 2 cols */}
            <FadeIn className="md:col-span-2 md:row-span-2">
              <div className="bento-card p-8 h-full min-h-[280px] relative group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl">{bento[0].icon}</span>
                    <span
                      className="pill text-xs"
                      style={{ color: "var(--accent)", background: "var(--accent-dim)", borderColor: "transparent" }}
                    >
                      {bento[0].tag}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-2xl mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {bento[0].title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {bento[0].desc}
                  </p>
                </div>
                <div
                  className="mt-6 w-full h-px"
                  style={{ background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)" }}
                />
              </div>
            </FadeIn>

            {/* Medium card */}
            <FadeIn delay={100}>
              <div className="bento-card p-6 h-full min-h-[130px] relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{bento[1].icon}</span>
                  <span
                    className="pill text-xs"
                    style={{ color: "var(--brand)", background: "var(--brand-dim)", borderColor: "transparent" }}
                  >
                    {bento[1].tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--text)" }}>
                  {bento[1].title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{bento[1].desc}</p>
              </div>
            </FadeIn>

            {/* Small cards */}
            {bento.slice(2).map((b, i) => (
              <FadeIn key={b.title} delay={(i + 2) * 100}>
                <div className="bento-card p-6 h-full min-h-[130px]">
                  <span className="text-2xl mb-3 block">{b.icon}</span>
                  <h3 className="font-display font-semibold text-base mb-2" style={{ color: "var(--text)" }}>
                    {b.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {b.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200} className="mt-8 text-center">
            <Link href="/services" className="btn-ghost inline-flex">
              View all services & pricing →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mesh-hero relative py-32 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--brand), transparent)" }}
        />
        <FadeIn>
          <span className="pill mb-6 inline-flex" style={{ color: "var(--text-muted)" }}>
            Ready when you are
          </span>
          <h2
            className="font-display font-extrabold text-4xl md:text-6xl mb-6 leading-tight max-w-3xl mx-auto"
            style={{ color: "var(--text)" }}
          >
            Stop losing hours to work
            <br />
            that shouldn&apos;t require a human.
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            In 30 minutes, we&apos;ll map your top automation opportunities and give you a written roadmap — yours to keep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              📅 Book a Free Audit
            </a>
            <Link href="/contact" className="btn-ghost">
              Send a message
            </Link>
          </div>
        </FadeIn>
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border-2), transparent)" }}
        />
      </section>
    </>
  );
}
