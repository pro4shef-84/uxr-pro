"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <p className="text-4xl mb-3">✅</p>
        <h3 className="text-xl font-bold text-green-800 mb-2">Message received!</h3>
        <p className="text-green-700 text-sm">
          We&apos;ll be in touch within one business day to schedule your free audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work email *</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service interested in</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        >
          <option value="">Select a service…</option>
          <option value="workflow-automation">Workflow Automation Starter</option>
          <option value="ai-growth">AI Growth Engine</option>
          <option value="enterprise">Enterprise AI Transformation</option>
          <option value="other">Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your biggest bottleneck *</label>
        <textarea
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          placeholder="e.g. Our team spends 10 hours/week manually copying data between systems…"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Book My Free Audit →"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        No spam, ever. We respond within one business day.
      </p>
    </form>
  );
}
