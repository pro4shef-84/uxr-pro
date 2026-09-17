import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.booking.title} — Random Creation`,
  description: site.booking.description,
};

export default function Book() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-4xl mb-4">{site.booking.title}</h1>
        <p className="text-lg mb-12" style={{ color: "var(--text-muted)" }}>
          {site.booking.description}
        </p>

        {/* Cal.com embed - replace username and event slug with actual cal.com account */}
        <div
          style={{
            width: "100%",
            height: "600px",
            overflow: "hidden",
            borderRadius: "8px",
            border: `1px solid var(--border)`,
          }}
        >
          <iframe
            src="https://cal.com/randomcreation/walk-through?embed=true&layout=month"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
            scrolling="no"
          />
        </div>

        <p className="text-sm mt-8" style={{ color: "var(--text-dim)" }}>
          Can't find a time that works? Call <a href="tel:303-218-0821">{site.closing.phone}</a> and we'll find something.
        </p>
      </div>
    </main>
  );
}
