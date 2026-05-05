import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AutomateIQ — AI Automation Consulting",
  description:
    "AutomateIQ helps growing businesses eliminate manual work with AI-powered automation. Custom workflows, AI agents, and integration consulting.",
  openGraph: {
    title: "AutomateIQ — AI Automation Consulting",
    description: "Turn hours of manual work into minutes with AI-powered automation.",
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
