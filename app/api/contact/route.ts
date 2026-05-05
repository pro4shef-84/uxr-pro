import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hello@automateiq.io";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "AutomateIQ Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Service: ${service || "—"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
