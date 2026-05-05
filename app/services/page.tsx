import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Services & Pricing — Random Creation",
  description: "Flat-rate AI automation packages. No hourly billing surprises.",
};

const plans = [
  {
    name: "Automation Starter",
    tagline: "One broken process costing you hours every week. We fix it in 2 weeks, flat.",
    features: [
      "Discovery call to map your workflow",
      "Up to 3 automated workflows",
      "Zapier / Make / n8n integration",
      "30-day support & iteration window",
      "Loom walkthrough for your team",
    ],
    accent: false,
  },
  {
    name: "AI Growth Engine",
    tagline: "Your team is dropping leads, losing renewals, or doing manual follow-up. This fixes that.",
    features: [
      "Everything in Starter",
      "Custom AI agent (leads, follow-up, or proposals)",
      "CRM / email / calendar integration",
      "Monthly optimization calls",
      "Slack-based async support",
      "Up to 8 automated workflows",
    ],
    accent: true,
  },
  {
    name: "Enterprise AI",
    tagline: "Complex ops, multiple systems, no time to fix it. We go deep and stay until it runs itself.",
    features: [
      "Full workflow & systems audit",
      "Unlimited automation workflows",
      "Multiple AI agents across departments",
      "Custom dashboards & reporting",
      "Dedicated Slack channel",
      "Quarterly business reviews",
    ],
    accent: false,
  },
];

const faqs = [
  { q: "Do I need technical staff?", a: "No. We handle all setup. You show us the process — we do the rest." },
  { q: "How long does implementation take?", a: "Starter projects launch in 1–2 weeks. Growth Engine takes 3–4 weeks. Enterprise timelines are scoped during discovery." },
  { q: "What tools do you work with?", a: "Salesforce, HubSpot, Notion, Airtable, Google Workspace, Microsoft 365, Slack, and 500+ others via Zapier, Make, and n8n." },
  { q: "What if I'm not happy with the results?", a: "All projects come with a 30-day iteration window. We keep working until the workflow does what we promised." },
];

export default function Services() {
  return (
    <>
      {/* Header */}
      <section className="mesh-hero pt-24 pb-20 text-center px-4">
        <FadeIn>
          <span className="pill mb-4 inline-flex" style={{ color: "var(--text-muted)" }}>
            Services
          </span>
          <h1
            className="font-display font-extrabold text-4xl md:text-5xl mt-4 mb-4"
            style={{ color: "var(--text)" }}
          >
            Three ways we work.
            <br />
            <span style={{ color: "var(--accent)" }}>One goal.</span>
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Every engagement starts with a free 30-minute audit. We scope, you decide.
          </p>
        </FadeIn>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((p, i) => (
          <FadeIn key={p.name} delay={i * 100}>
            <div
              className="bento-card p-8 flex flex-col h-full"
              style={p.accent ? { borderColor: "var(--accent)", boxShadow: "0 0 40px var(--glow-accent)" } : {}}
            >
              {p.accent && (
                <span
                  className="pill text-xs mb-4 self-start"
                  style={{ color: "#09090b", background: "var(--accent)", borderColor: "transparent", fontWeight: 700 }}
                >
                  MOST POPULAR
                </span>
              )}
              <p className="text-xs font-medium mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {p.tagline}
              </p>
              <h2 className="font-display font-bold text-xl mb-6" style={{ color: "var(--text)" }}>
                {p.name}
              </h2>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: p.accent ? "var(--accent)" : "var(--brand)" }} className="mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
                target="_blank"
                rel="noopener noreferrer"
                className={p.accent ? "btn-accent justify-center" : "btn-ghost justify-center"}
              >
                Contact for pricing
              </a>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-32">
        <FadeIn>
          <h2 className="font-display font-bold text-3xl text-center mb-10" style={{ color: "var(--text)" }}>
            Frequently asked
          </h2>
        </FadeIn>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FadeIn key={f.q} delay={i * 80}>
              <div className="bento-card p-6">
                <p className="font-semibold mb-2 text-sm" style={{ color: "var(--text)" }}>{f.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
