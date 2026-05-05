"use client";

import { useState, useRef } from "react";

interface Automation { title: string; description: string; tool: string }
interface AuditResult { pain: string; time_saved: string; automations: Automation[]; quick_win: string }
type Phase = "input" | "email-gate" | "results";

const EXAMPLES = [
  "We copy data from email inquiries into our CRM every morning",
  "Team builds reports from 5 spreadsheets every Friday — 3 hours",
  "We chase unpaid invoices manually every week",
];

export default function AuditWidget() {
  const [problem, setProblem]       = useState("");
  const [email, setEmail]           = useState("");
  const [phase, setPhase]           = useState<Phase>("input");
  const [result, setResult]         = useState<AuditResult | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const streamResultRef = useRef<AuditResult | null>(null);
  const streamDoneRef   = useRef(false);

  const startStream = async (input: string) => {
    streamResultRef.current = null;
    streamDoneRef.current = false;
    let buffer = "";
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: input }),
      });
      if (!res.ok) throw new Error();
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += dec.decode(value, { stream: true });
        try { streamResultRef.current = JSON.parse(buffer); } catch { /* buffering */ }
      }
    } catch { /* handled below */ }
    streamDoneRef.current = true;
  };

  const handleAnalyze = (input?: string) => {
    const text = input ?? problem;
    if (!text.trim()) return;
    if (input) setProblem(input);
    setPhase("email-gate");
    startStream(text);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSending(true);
    const start = Date.now();
    while (!streamDoneRef.current && Date.now() - start < 15000) {
      await new Promise((r) => setTimeout(r, 200));
    }
    const auditResult = streamResultRef.current;
    try {
      await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, problem, result: auditResult }),
      });
    } catch { /* non-blocking */ }
    setResult(auditResult);
    setEmailSending(false);
    setPhase("results");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* ── Input ── */}
      {phase === "input" && (
        <div className="glass-strong rounded-3xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Describe your bottleneck ↓
          </p>
          <textarea
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAnalyze(); }}
            placeholder="e.g. We manually copy customer data from emails into our CRM every morning…"
            className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 placeholder-opacity-40"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              caretColor: "var(--accent)",
            }}
          />
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleAnalyze(ex)}
                className="text-xs px-3 py-1.5 rounded-full transition-colors text-left"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {ex.length > 52 ? ex.slice(0, 52) + "…" : ex}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleAnalyze()}
            disabled={!problem.trim()}
            className="btn-accent w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Analyze My Workflow →
          </button>
        </div>
      )}

      {/* ── Email gate ── */}
      {phase === "email-gate" && (
        <div className="glass-strong rounded-3xl p-8 text-center">
          <span
            className="pill mb-4 inline-flex"
            style={{ color: "var(--accent)", borderColor: "var(--accent-dim)", background: "var(--accent-dim)" }}
          >
            ✦ Your automation audit is ready
          </span>
          <h2 className="font-display font-bold text-xl mt-2 mb-1" style={{ color: "var(--text)" }}>
            Where should we send your results?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Plus: the 5 highest-ROI automations for your industry — built from 50+ client engagements.
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-2)",
                color: "var(--text)",
                caretColor: "var(--accent)",
              }}
            />
            <button
              type="submit"
              disabled={emailSending || !email.trim()}
              className="btn-accent w-full justify-center disabled:opacity-50"
            >
              {emailSending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Preparing your audit…
                </span>
              ) : "Get My Free Audit →"}
            </button>
          </form>

          <p className="text-xs mt-4" style={{ color: "var(--text-dim)" }}>No spam. Unsubscribe anytime.</p>

          {/* Streaming progress dots */}
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1 w-8 rounded-full overflow-hidden" style={{ background: "var(--border-2)" }}>
                <div
                  className="h-full rounded-full animate-pulse"
                  style={{ background: "var(--accent)", opacity: 0.6, animationDelay: `${i * 200}ms` }}
                />
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-dim)" }}>Claude is analyzing your workflow…</p>
        </div>
      )}

      {/* ── Results ── */}
      {phase === "results" && result && (
        <div className="space-y-4">
          {/* Header card */}
          <div className="bento-card p-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brand)" }}>
                AI Diagnosis
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{result.pain}</p>
            </div>
            <div
              className="text-center rounded-xl px-5 py-3 flex-shrink-0"
              style={{ background: "var(--accent-dim)", border: "1px solid rgba(185,255,102,0.2)" }}
            >
              <p className="font-display font-extrabold text-2xl" style={{ color: "var(--accent)" }}>
                {result.time_saved}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>saved/week</p>
            </div>
          </div>

          {/* 3 automation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.automations.map((a, i) => {
              const hrs  = String(2 + i).padStart(2, "0");
              const mins = String((i * 17 + 11) % 60).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="bento-card p-5"
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    animation: `fade-up 0.4s ease-out ${i * 0.15}s both`,
                  }}
                >
                  <p className="font-mono text-xs mb-2" style={{ color: "var(--text-dim)" }}>
                    ↳ run complete · 0{hrs}:{mins} AM
                  </p>
                  <span
                    className="pill text-xs mb-3 inline-flex"
                    style={{ color: "var(--accent)", background: "var(--accent-dim)", borderColor: "transparent" }}
                  >
                    #{i + 1}
                  </span>
                  <h3 className="font-display font-semibold text-sm mb-2" style={{ color: "var(--text)" }}>
                    {a.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {a.description}
                  </p>
                  <span
                    className="pill text-xs"
                    style={{ color: "var(--text-muted)", fontSize: "10px" }}
                  >
                    {a.tool}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick win */}
          <div
            className="bento-card p-5 flex gap-3 items-start"
            style={{ borderLeft: "2px solid #f59e0b" }}
          >
            <span className="text-2xl flex-shrink-0">⚡</span>
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: "#fbbf24" }}>Quick win this week</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{result.quick_win}</p>
            </div>
          </div>

          {/* Email confirm + CTA */}
          <div className="glass-strong rounded-3xl p-6 text-center">
            <p className="text-sm mb-1" style={{ color: "var(--text)" }}>
              ✅ Results sent to <span style={{ color: "var(--accent)" }}>{email}</span>
            </p>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              Check your inbox for the full automation playbook.
            </p>
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex"
            >
              📅 Book a free call to implement this →
            </a>
          </div>
        </div>
      )}

      {/* Fallback */}
      {phase === "results" && !result && (
        <div className="glass-strong rounded-3xl p-8 text-center">
          <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>We&apos;ve got your details!</p>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Something went sideways — we&apos;ll follow up personally.
          </p>
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex"
          >
            📅 Book a free call →
          </a>
        </div>
      )}
    </div>
  );
}
