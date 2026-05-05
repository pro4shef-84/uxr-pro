import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_NOTIFY = process.env.CONTACT_EMAIL ?? "hello@randomcreation.io";

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

function buildResultsEmail(email: string, problem: string, result: AuditResult | null): string {
  if (!result) {
    return `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111">
        <h1 style="font-size:24px;font-weight:800;margin-bottom:8px">We got your submission</h1>
        <p style="color:#666;margin-bottom:24px">You described: <em>${problem}</em></p>
        <p style="color:#666">Our team will prepare a custom automation analysis and reach out within one business day.</p>
        <a href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
           style="display:inline-block;margin-top:24px;padding:14px 28px;background:#4f46e5;color:#fff;font-weight:700;border-radius:12px;text-decoration:none">
          📅 Skip the wait — book a call →
        </a>
      </div>`;
  }

  const automationsHtml = result.automations
    .map(
      (a, i) => `
      <div style="background:#f8f8ff;border-left:3px solid #6366f1;border-radius:12px;padding:16px;margin-bottom:12px">
        <p style="font-size:11px;font-weight:700;color:#6366f1;margin:0 0 6px;text-transform:uppercase;letter-spacing:.05em">#${i + 1}</p>
        <p style="font-weight:700;margin:0 0 6px;color:#111">${a.title}</p>
        <p style="color:#555;font-size:14px;margin:0 0 8px">${a.description}</p>
        <span style="font-size:12px;background:#e8e8ff;color:#4f46e5;padding:4px 10px;border-radius:999px;font-weight:600">${a.tool}</span>
      </div>`
    )
    .join("");

  return `
    <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111">
      <p style="font-size:12px;font-weight:700;color:#6366f1;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Random Creation · AI Audit</p>
      <h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:6px">Your automation roadmap</h1>
      <p style="color:#888;font-size:14px;margin-bottom:28px">Based on: <em>${problem}</em></p>

      <div style="background:#eef2ff;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <p style="margin:0;color:#444;font-size:14px">${result.pain}</p>
        <div style="text-align:center;margin-left:16px;flex-shrink:0">
          <p style="font-size:22px;font-weight:800;color:#4f46e5;margin:0">${result.time_saved}</p>
          <p style="font-size:11px;color:#888;margin:0">saved/week</p>
        </div>
      </div>

      <h2 style="font-size:16px;font-weight:700;margin-bottom:12px">3 automations to build first</h2>
      ${automationsHtml}

      <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:16px;margin:20px 0">
        <p style="font-weight:700;color:#92400e;font-size:13px;margin:0 0 6px">⚡ Quick win this week</p>
        <p style="color:#78350f;font-size:14px;margin:0">${result.quick_win}</p>
      </div>

      <a href="https://calendar.app.google/iDaJdHCUkck5Pvoo7"
         style="display:block;text-align:center;padding:16px;background:#4f46e5;color:#fff;font-weight:700;border-radius:12px;text-decoration:none;font-size:15px;margin-top:24px">
        📅 Book a free call to implement this →
      </a>

      <p style="color:#aaa;font-size:12px;text-align:center;margin-top:20px">
        Random Creation · Denver, CO · <a href="mailto:hello@randomcreation.io" style="color:#aaa">hello@randomcreation.io</a>
      </p>
    </div>`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email not configured." }, { status: 503 });
  }

  try {
    const { email, problem, result } = await req.json() as {
      email: string;
      problem: string;
      result: AuditResult | null;
    };

    if (!email || !problem) {
      return NextResponse.json({ error: "Email and problem are required." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    // Send results to the lead
    await resend.emails.send({
      from: "Random Creation <onboarding@resend.dev>",
      to: email,
      subject: result
        ? `Your AI audit: ${result.time_saved} saved — 3 automations to build first`
        : "Your Random Creation automation audit",
      html: buildResultsEmail(email, problem, result),
    });

    // Notify owner of new lead
    await resend.emails.send({
      from: "Random Creation Leads <onboarding@resend.dev>",
      to: TO_NOTIFY,
      replyTo: email,
      subject: `New lead: ${email}`,
      text: [
        `Email: ${email}`,
        `Problem: ${problem}`,
        result ? `Time saved: ${result.time_saved}` : "",
        result ? `Automations: ${result.automations.map((a) => a.title).join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/capture]", err);
    return NextResponse.json({ error: "Failed to capture lead." }, { status: 500 });
  }
}
