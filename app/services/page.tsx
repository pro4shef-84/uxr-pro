import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Pricing — Random Creation",
  description:
    "Productized AI automation services for growing businesses. Workflow Automation, AI Growth Engine, and Enterprise AI Transformation packages.",
};

const plans = [
  {
    name: "Workflow Automation Starter",
    price: "$2,500",
    period: "one-time",
    tagline: "One broken process costing you hours every week. We fix it in 2 weeks, flat.",
    features: [
      "Discovery call to map your workflow",
      "Up to 3 automated workflows",
      "Integration with your existing tools (Zapier / Make / n8n)",
      "30-day support & iteration window",
      "Loom walkthrough video for your team",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "AI Growth Engine",
    price: "$5,500",
    period: "one-time + $500/mo retainer",
    tagline: "Your team is dropping leads, losing renewals, or doing manual follow-up. This fixes that.",
    features: [
      "Everything in Starter",
      "Custom AI agent (lead qualification, follow-up, or proposals)",
      "CRM / email / calendar integration",
      "Monthly optimization calls",
      "Slack-based async support",
      "Up to 8 automated workflows",
    ],
    cta: "Most Popular — Get Started",
    highlight: true,
  },
  {
    name: "Enterprise AI Transformation",
    price: "Custom",
    period: "scoped engagement",
    tagline: "Complex ops, multiple systems, no time to fix it. We go deep and stay until it runs itself.",
    features: [
      "Full workflow & systems audit",
      "Unlimited automation workflows",
      "Multiple AI agents across departments",
      "Custom dashboards & reporting",
      "Dedicated Slack channel",
      "Quarterly business reviews",
    ],
    cta: "Book a Discovery Call",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Do I need technical staff to work with you?",
    a: "No. We handle all the technical setup. You just need to show us your process — we do the rest.",
  },
  {
    q: "How long does implementation take?",
    a: "Starter projects typically launch in 1–2 weeks. The Growth Engine takes 3–4 weeks. Enterprise timelines are scoped during discovery.",
  },
  {
    q: "What tools do you work with?",
    a: "Salesforce, HubSpot, Notion, Airtable, Google Workspace, Microsoft 365, Slack, and 500+ others via Zapier, Make, and n8n.",
  },
  {
    q: "What if I&apos;m not happy with the results?",
    a: "All projects come with a 30-day iteration window. We keep working until the workflow does what we promised.",
  },
];

export default function Services() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Services & Pricing</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Flat-rate packages so you know exactly what you&apos;re getting — no hourly billing surprises.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-2xl border p-8 flex flex-col ${
              p.highlight
                ? "border-brand-500 shadow-xl bg-brand-600 text-white"
                : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </span>
            )}
            <p className={`text-sm font-semibold mb-2 ${p.highlight ? "text-indigo-200" : "text-brand-600"}`}>
              {p.tagline}
            </p>
            <h2 className="text-xl font-extrabold mb-1">{p.name}</h2>
            <p className={`text-3xl font-extrabold mb-1 ${p.highlight ? "text-white" : "text-gray-900"}`}>
              {p.price}
            </p>
            <p className={`text-xs mb-6 ${p.highlight ? "text-indigo-200" : "text-gray-400"}`}>{p.period}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className={p.highlight ? "text-yellow-300" : "text-brand-500"}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                p.highlight
                  ? "bg-white text-brand-700 hover:bg-brand-50"
                  : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-t border-gray-100 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-xl p-6 border border-gray-100">
                <p className="font-bold mb-2">{f.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
