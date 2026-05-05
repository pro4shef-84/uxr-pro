import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Random Creation",
  description: "Book a free 30-minute automation audit with Random Creation. Tell us your biggest bottleneck and we'll show you what's possible.",
};

const benefits = [
  "30-minute call, no sales pitch",
  "We map your top 3 automation opportunities",
  "You leave with a clear action plan — whether you hire us or not",
];

export default function Contact() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Book a Free Audit</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Tell us what&apos;s eating your team&apos;s time. We&apos;ll show you exactly what AI can fix — for free.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Benefits */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">What you&apos;ll get</h2>
          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-4 p-6 bg-brand-600 rounded-2xl text-white hover:bg-brand-700 transition-colors group"
          >
            <span className="text-3xl">📅</span>
            <div>
              <p className="font-bold text-base">Book directly on my calendar</p>
              <p className="text-indigo-200 text-sm mt-0.5">Pick a time that works — no back-and-forth</p>
            </div>
            <span className="ml-auto text-indigo-300 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-1">Prefer email?</p>
            <p className="text-gray-500 text-sm">
              Reach us directly at{" "}
              <a href="mailto:hello@automateiq.io" className="text-brand-600 hover:underline font-medium">
                hello@automateiq.io
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
