import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Random Creation — AI Automation Studio",
  description:
    "Random Creation builds AI-powered automation systems that eliminate manual work. Describe your bottleneck and our AI maps your solution instantly.",
  openGraph: {
    title: "Random Creation — AI Automation Studio",
    description: "Describe your biggest manual bottleneck. Our AI maps your automation roadmap in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
