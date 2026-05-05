import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — AutomateIQ",
  description: "Book a free 30-minute automation audit with AutomateIQ. Tell us your biggest bottleneck and we'll show you what's possible.",
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

          <div className="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-100">
            <p className="text-sm font-semibold text-brand-700 mb-1">Typical response time</p>
            <p className="text-gray-600 text-sm">
              We reply within one business day to schedule your audit.
            </p>
          </div>

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
