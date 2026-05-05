import Link from "next/link";

const stats = [
  { value: "40%", label: "Average time saved on operations" },
  { value: "3×", label: "Faster lead follow-up with AI agents" },
  { value: "$0", label: "Upfront cost — pay only on ROI milestones" },
];

const services = [
  {
    icon: "⚙️",
    title: "Workflow Automation",
    desc: "Eliminate repetitive tasks across your CRM, spreadsheets, email, and 500+ apps — no code required.",
  },
  {
    icon: "🤖",
    title: "AI Agents",
    desc: "Deploy custom AI agents that qualify leads, draft proposals, and answer customer questions 24/7.",
  },
  {
    icon: "🔗",
    title: "Systems Integration",
    desc: "Connect your siloed tools so data flows automatically — from intake to invoice without manual entry.",
  },
];

const testimonials = [
  {
    quote:
      "AutomateIQ cut our client onboarding from 3 days to 4 hours. The ROI was visible in week one.",
    name: "Sarah K.",
    role: "COO, Regional Mortgage Lender",
  },
  {
    quote:
      "We went from chasing leads manually to having an AI agent follow up within 5 minutes. Pipeline grew 60%.",
    name: "Marcus T.",
    role: "VP Sales, SaaS Startup",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-700 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-28 md:py-36 text-center">
          <span className="inline-block mb-4 px-4 py-1 bg-white/10 rounded-full text-sm font-medium tracking-wide">
            AI Automation Consulting
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Stop doing manually<br className="hidden sm:block" /> what AI can do instantly
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-indigo-100 mb-10">
            AutomateIQ designs and deploys AI-powered workflows that save your team 20+ hours a week —
            without disrupting how you already work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              📅 Book a Free Audit →
            </a>
            <Link
              href="/services"
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-50 border-y border-brand-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-brand-600 mb-1">{s.value}</p>
              <p className="text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">What we do</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          We don&apos;t sell software — we build custom automation systems tailored to how your business actually runs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
            >
              <p className="text-4xl mb-4">{s.icon}</p>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-block px-6 py-3 border border-brand-600 text-brand-600 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
          >
            View all services & pricing →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-12">What clients say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to reclaim 20 hours a week?
        </h2>
        <p className="text-gray-500 mb-8">
          Book a free 30-minute automation audit. We&apos;ll map your biggest bottlenecks and show you exactly what&apos;s possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg text-lg"
          >
            📅 Book Your Free Audit →
          </a>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 border border-brand-600 text-brand-600 font-bold rounded-xl hover:bg-brand-50 transition-colors text-lg"
          >
            Send a Message
          </Link>
        </div>
      </section>
    </>
  );
}
