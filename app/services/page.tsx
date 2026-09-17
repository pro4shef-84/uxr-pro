import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: `${site.services.title} — Random Creation`,
  description: site.services.intro,
};

export default function Services() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">{site.services.title}</h1>
          <p className="text-lg mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {site.services.intro}
          </p>
        </FadeIn>

        <div className="space-y-12">
          {site.three.map((service, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="pb-12 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-bold mb-2" style={{ color: "var(--accent)" }}>
                  {service.num}
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">{service.title}</h2>
                <p className="text-base leading-relaxed">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="mt-16 text-center">
            <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
              Questions? Let's talk.
            </p>
            <Link href="/book" className="btn-primary">
              Schedule a walk-through
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
