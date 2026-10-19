import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

async function notifyOwner(entry: { name: string; email: string; subject: string | null; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to,
      reply_to: entry.email,
      subject: `Portfolio contact: ${entry.subject || "New message"} — ${entry.name}`,
      html: `<p><strong>${escapeHtml(entry.name)}</strong> &lt;${escapeHtml(entry.email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(entry.message)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[contact notify error]", res.status, await res.text());
  }
}

export async function POST(req: NextRequest) {
  // 5 submissions per IP per 10 minutes (best-effort, per server instance)
  const limit = rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later or email directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const { name, email, subject, message, website } = body;

    // Honeypot: real users never see this field. Pretend success so bots don't retry.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Message received." }, { status: 200 });
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > LIMITS.name) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.length > LIMITS.email || !EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (subject != null && (typeof subject !== "string" || subject.length > LIMITS.subject)) {
      return NextResponse.json(
        { error: "Subject must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > LIMITS.message) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters." },
        { status: 400 }
      );
    }

    const entry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || null,
      message: message.trim(),
    };

    // Save to Neon DB via Prisma
    await prisma.contacts.create({
      data: { ...entry, read: false },
    });

    // Email notification (enabled when RESEND_API_KEY and CONTACT_NOTIFY_EMAIL are set)
    try {
      await notifyOwner(entry);
    } catch (error) {
      console.error("[contact notify error]", error);
    }

    return NextResponse.json(
      { success: true, message: "Message received. I will respond within 1-2 days." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact API error]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }
}
