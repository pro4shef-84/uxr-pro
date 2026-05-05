"use client";

const LOGS = [
  { time: "01:03 AM", agent: "agent_02", action: "mapped 1,204 Zapier triggers", result: "18 automation gaps identified" },
  { time: "02:17 AM", agent: "agent_05", action: "deployed Slack→CRM sync", result: "$2,340/mo labor recovered" },
  { time: "03:41 AM", agent: "agent_01", action: "reran approval workflow loop #14", result: "cycle time −68%" },
  { time: "04:08 AM", agent: "agent_03", action: "rebuilt invoice chase sequence", result: "DSO reduced by 9 days" },
  { time: "04:55 AM", agent: "agent_07", action: "optimized lead routing rules", result: "response time 4h → 4 min" },
  { time: "05:22 AM", agent: "agent_04", action: "connected HubSpot + Airtable + Slack", result: "7 manual handoffs eliminated" },
  { time: "06:14 AM", agent: "agent_06", action: "shipped onboarding automation v3", result: "3-day process → 4 hours" },
  { time: "07:39 AM", agent: "agent_02", action: "ran experiment loop #31", result: "conversion +4.2%" },
];

export default function AgentTicker() {
  // Duplicate for seamless loop
  const items = [...LOGS, ...LOGS];

  return (
    <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden relative">
      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {items.map((log, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono text-xs shrink-0">
            <span className="text-slate-600">[{log.time}]</span>
            <span className="text-slate-500">↳ {log.agent}</span>
            <span className="text-emerald-400">· {log.action}</span>
            <span className="text-slate-400">· {log.result}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
