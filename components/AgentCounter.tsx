"use client";

import { useEffect, useState } from "react";

export default function AgentCounter() {
  const [count, setCount] = useState(23);

  useEffect(() => {
    const tick = () => {
      setCount((c) => c + 1);
      // Random interval 8–14s
      setTimeout(tick, 8000 + Math.random() * 6000);
    };
    const t = setTimeout(tick, 8000 + Math.random() * 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
      </span>
      <span className="font-mono text-sm text-white font-semibold tabular-nums">
        {count} agents running now
      </span>
      <span className="text-white/40 text-xs hidden sm:inline">
        across {Math.floor(count * 0.55)} client workflows
      </span>
    </div>
  );
}
