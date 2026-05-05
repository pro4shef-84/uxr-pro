import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an AI automation strategist at Random Creation. A business owner just described a painful manual process they deal with every day.

Analyze it and respond with EXACTLY this JSON structure (no markdown, no preamble):
{
  "pain": "One sentence capturing the core frustration",
  "time_saved": "Estimated hours saved per week (e.g. '8–12 hours/week')",
  "automations": [
    {
      "title": "Short action title (max 6 words)",
      "description": "1–2 sentences on what gets automated and how",
      "tool": "Primary tool/platform that would power this (e.g. Zapier, Make, custom AI agent, Claude API)"
    },
    {
      "title": "...",
      "description": "...",
      "tool": "..."
    },
    {
      "title": "...",
      "description": "...",
      "tool": "..."
    }
  ],
  "quick_win": "The single thing they could automate this week with zero budget"
}

Be specific and practical. Reference real tools. Speak to their exact situation.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI not configured." }), { status: 503 });
  }

  const { problem } = await req.json();
  if (!problem || problem.trim().length < 10) {
    return new Response(JSON.stringify({ error: "Please describe your problem in more detail." }), { status: 400 });
  }

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{ role: "user", content: `My biggest manual bottleneck: ${problem}` }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
