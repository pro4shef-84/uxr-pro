"use client";

import { useState } from "react";

interface FormState { name: string; email: string; company: string; service: string; message: string }
const initial: FormState = { name: "", email: "", company: "", service: "", message: "" };

const inputCls = `w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all`;
const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border-2)",
  color: "var(--text)",
  caretColor: "var(--accent)",
};

export default function ContactForm() {
  const [form, setForm]     = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError]   = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-3">✅</p>
        <h3 className="font-display font-bold text-lg mb-2" style={{ color: "var(--text)" }}>Message received!</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const label = (text: string) => (
    <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
      {text}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {label("Full name *")}
          <input name="name" required value={form.name} onChange={handleChange}
            className={inputCls} style={inputStyle} placeholder="Jane Smith" />
        </div>
        <div>
          {label("Work email *")}
          <input name="email" type="email" required value={form.email} onChange={handleChange}
            className={inputCls} style={inputStyle} placeholder="jane@company.com" />
        </div>
      </div>

      <div>
        {label("Company")}
        <input name="company" value={form.company} onChange={handleChange}
          className={inputCls} style={inputStyle} placeholder="Acme Inc." />
      </div>

      <div>
        {label("Service interested in")}
        <select name="service" value={form.service} onChange={handleChange}
          className={inputCls} style={{ ...inputStyle, backgroundColor: "rgba(255,255,255,0.04)" }}>
          <option value="">Select a service…</option>
          <option value="workflow-automation">Automation Starter</option>
          <option value="ai-growth">AI Growth Engine</option>
          <option value="enterprise">Enterprise AI</option>
          <option value="other">Not sure yet</option>
        </select>
      </div>

      <div>
        {label("Biggest bottleneck *")}
        <textarea name="message" required rows={4} value={form.message} onChange={handleChange}
          className={`${inputCls} resize-none`} style={inputStyle}
          placeholder="e.g. Our team spends 10 hours/week manually copying data between systems…" />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-accent w-full justify-center disabled:opacity-50">
        {status === "loading" ? "Sending…" : "Send Message →"}
      </button>

      <p className="text-xs text-center" style={{ color: "var(--text-dim)" }}>
        No spam. We respond within one business day.
      </p>
    </form>
  );
}
