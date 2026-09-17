import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: `About — Random Creation`,
  description: site.about.intro,
};

export default function About() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">{site.about.headline}</h1>
          <p className="text-lg mb-8 leading-relaxed">{site.about.intro}</p>

          <div className="space-y-4 mb-12 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {site.about.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/book" className="btn-primary">
              Let's talk
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
