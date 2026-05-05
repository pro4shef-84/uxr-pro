"use client";

import { useState, useRef } from "react";

interface Automation {
  title: string;
  description: string;
  tool: string;
}

interface AuditResult {
  pain: string;
  time_saved: string;
  automations: Automation[];
  quick_win: string;
}

type Phase = "input" | "email-gate" | "results" | "error";

const EXAMPLES = [
  "We manually copy data from email inquiries into our CRM every morning",
  "My team builds reports from 5 spreadsheets every Friday — takes 3 hours",
  "We chase unpaid invoices by hand every week",
];

export default function AuditWidget() {
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [emailSending, setEmailSending] = useState(false);
  const [error, setError] = useState("");

  // Stream runs in background while email gate is shown
  const streamResultRef = useRef<AuditResult | null>(null);
  const streamDoneRef = useRef(false);

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
      if (!res.ok) throw new Error("AI unavailable");
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        try {
          streamResultRef.current = JSON.parse(buffer);
        } catch {
          // still buffering
        }
      }
      streamDoneRef.current = true;
    } catch {
      streamDoneRef.current = true; // unblock email submit even on error
    }
  };

  const handleAnalyze = (input?: string) => {
    const text = input ?? problem;
    if (!text.trim()) return;
    if (input) setProblem(input);
    setPhase("email-gate");
    setError("");
    // Fire and forget — stream in background
    startStream(text);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSending(true);

    // Wait for stream to finish (max 15s)
    const start = Date.now();
    while (!streamDoneRef.current && Date.now() - start < 15000) {
      await new Promise((r) => setTimeout(r, 200));
    }

    const auditResult = streamResultRef.current;

    // Capture email + send results via Resend
    try {
      await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, problem, result: auditResult }),
      });
    } catch {
      // non-blocking — still show results even if email fails
    }

    setResult(auditResult);
    setEmailSending(false);
    setPhase("results");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── Step 1: Input ── */}
      {phase === "input" && (
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
          <p className="text-indigo-200 text-sm font-medium mb-3">
            Describe your biggest manual bottleneck ↓
          </p>
          <textarea
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAnalyze();
            }}
            placeholder="e.g. We manually copy customer data from emails into our CRM every morning…"
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-indigo-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleAnalyze(ex)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-indigo-200 hover:bg-white/20 transition-colors text-left"
              >
                {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleAnalyze()}
            disabled={!problem.trim()}
            className="w-full py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze My Workflow →
          </button>
        </div>
      )}

      {/* ── Step 2: Email gate (streams in background) ── */}
      {phase === "email-gate" && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl text-center">
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">
            ✦ Your automation audit is ready
          </p>
          <h2 className="text-xl font-bold text-white mb-1">
            Where should we send your results?
          </h2>
          <p className="text-sm text-white/60 mb-6">
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
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
            <button
              type="submit"
              disabled={emailSending || !email.trim()}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {emailSending ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Preparing your audit…
                </>
              ) : (
                "Get My Free Audit →"
              )}
            </button>
          </form>

          <p className="text-xs text-white/40 mt-4">No spam. Unsubscribe anytime.</p>

          <div className="mt-6 flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1.5 w-8 rounded-full bg-white/20 overflow-hidden"
              >
                <div
                  className="h-full bg-indigo-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-2">Claude is analyzing your workflow…</p>
        </div>
      )}

      {/* ── Step 3: Results ── */}
      {phase === "results" && result && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">
                  AI Diagnosis
                </p>
                <p className="text-gray-800 font-medium">{result.pain}</p>
              </div>
              <div className="text-center bg-brand-50 rounded-xl px-5 py-3 flex-shrink-0">
                <p className="text-2xl font-extrabold text-brand-600">{result.time_saved}</p>
                <p className="text-xs text-gray-500 mt-0.5">estimated savings</p>
              </div>
            </div>
          </div>

          {/* 3 automations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.automations.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-xl border-l-2 border-indigo-400">
                <span className="inline-block text-xs font-bold text-brand-600 bg-brand-50 rounded-full px-2 py-0.5 mb-3">
                  #{i + 1}
                </span>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{a.description}</p>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">
                  {a.tool}
                </span>
              </div>
            ))}
          </div>

          {/* Quick win */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-3 items-start shadow-xl">
            <span className="text-2xl flex-shrink-0">⚡</span>
            <div>
              <p className="font-bold text-yellow-800 text-sm mb-1">Quick win this week</p>
              <p className="text-yellow-700 text-sm leading-relaxed">{result.quick_win}</p>
            </div>
          </div>

          {/* Email capture success + CTA */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <p className="text-white font-semibold mb-1">
              ✅ Results sent to <span className="text-indigo-300">{email}</span>
            </p>
            <p className="text-white/60 text-sm mb-5">
              Check your inbox for the full automation playbook.
            </p>
            <a
              href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              📅 Book a free call to implement this →
            </a>
          </div>
        </div>
      )}

      {/* ── No results fallback ── */}
      {phase === "results" && !result && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <p className="text-white font-semibold mb-2">We&apos;ve got your details!</p>
          <p className="text-white/60 text-sm mb-5">
            Something went sideways with the AI — check your inbox, we&apos;ll follow up personally.
          </p>
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors"
          >
            📅 Book a free call →
          </a>
        </div>
      )}

      {error && (
        <p className="mt-3 text-red-300 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
