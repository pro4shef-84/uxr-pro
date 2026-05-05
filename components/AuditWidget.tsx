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

const EXAMPLES = [
  "We manually copy data from email inquiries into our CRM every morning",
  "My team spends Friday afternoons building reports from 5 different spreadsheets",
  "We chase unpaid invoices by hand — it takes 3 hours every week",
];

export default function AuditWidget() {
  const [problem, setProblem] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const bufferRef = useRef("");

  const run = async (text?: string) => {
    const input = text ?? problem;
    if (!input.trim()) return;
    if (text) setProblem(text);
    setStatus("loading");
    setResult(null);
    setError("");
    bufferRef.current = "";

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: input }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bufferRef.current += decoder.decode(value, { stream: true });
        // Try to parse partial JSON as it streams
        try {
          const parsed = JSON.parse(bufferRef.current);
          setResult(parsed);
        } catch {
          // not valid JSON yet — keep buffering
        }
      }

      // Final parse
      const parsed = JSON.parse(bufferRef.current);
      setResult(parsed);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Input */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
        <p className="text-indigo-200 text-sm font-medium mb-3">
          Describe your biggest manual bottleneck ↓
        </p>
        <textarea
          rows={3}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g. We manually copy customer data from emails into our CRM every morning…"
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-indigo-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => run(ex)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-indigo-200 hover:bg-white/20 transition-colors text-left"
            >
              {ex.length > 48 ? ex.slice(0, 48) + "…" : ex}
            </button>
          ))}
        </div>
        <button
          onClick={() => run()}
          disabled={status === "loading" || !problem.trim()}
          className="w-full py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              AI is analyzing your workflow…
            </span>
          ) : (
            "Analyze My Workflow →"
          )}
        </button>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-500">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">AI Diagnosis</p>
                <p className="text-gray-800 font-medium">{result.pain}</p>
              </div>
              <div className="text-center bg-brand-50 rounded-xl px-5 py-3 flex-shrink-0">
                <p className="text-2xl font-extrabold text-brand-600">{result.time_saved}</p>
                <p className="text-xs text-gray-500 mt-0.5">estimated savings</p>
              </div>
            </div>
          </div>

          {/* Automations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.automations.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-xl">
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

          {/* CTA */}
          <a
            href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition-colors shadow-xl text-base"
          >
            📅 Book a free call to implement this →
          </a>
        </div>
      )}
    </div>
  );
}
