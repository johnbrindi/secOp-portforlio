import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { sendPush } from "@/lib/push";

// Receives one beacon per browser session from app/components/PwaClient.tsx and
// pushes a "new visitor" notification to the admin's devices.
// Guards: bots and the admin are ignored, the same visitor notifies at most once
// per 30 minutes, and at most 30 visitor notifications go out per hour.

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|headless|lighthouse|pingdom|monitor|curl|wget|python|axios|node-fetch/i;
const REPEAT_WINDOW_MS = 30 * 60_000;
const MAX_NOTIFICATIONS_PER_HOUR = 30;

function device(ua: string) {
  const os = /android/i.test(ua) ? "Android" : /iphone|ipad/i.test(ua) ? "iOS" : /windows/i.test(ua) ? "Windows"
    : /mac os/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : "Unknown OS";
  const browser = /edg\//i.test(ua) ? "Edge" : /opr\//i.test(ua) ? "Opera" : /chrome\//i.test(ua) ? "Chrome"
    : /firefox\//i.test(ua) ? "Firefox" : /safari\//i.test(ua) ? "Safari" : "Browser";
  return `${browser} on ${os}`;
}

function header(req: NextRequest, name: string) {
  const v = req.headers.get(name);
  try {
    return v ? decodeURIComponent(v) : null;
  } catch {
    return v;
  }
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (!rateLimit(`visit:${ip}`, 10, 3_600_000).ok) return new NextResponse(null, { status: 204 });

  // Your own visits don't count.
  const session = await getServerSession(authOptions).catch(() => null);
  if (isAdminEmail(session?.user?.email)) return new NextResponse(null, { status: 204 });

  let path = "/";
  let referrer: string | null = null;
  try {
    const body = await req.json();
    if (typeof body.path === "string" && body.path.startsWith("/")) path = body.path.slice(0, 200);
    if (typeof body.referrer === "string") {
      const host = new URL(body.referrer).hostname.replace(/^www\./, "");
      if (host && host !== req.nextUrl.hostname) referrer = host.slice(0, 100);
    }
  } catch {
    // Missing or malformed body: keep defaults.
  }

  try {
    const ipHash = createHash("sha256").update(`${process.env.VISIT_HASH_SALT || ""}:${ip}`).digest("hex");
    const country = header(req, "x-vercel-ip-country");
    const city = header(req, "x-vercel-ip-city");
    const since = new Date(Date.now() - REPEAT_WINDOW_MS);
    const [recentSameVisitor, notifiedLastHour] = await Promise.all([
      prisma.visits.count({ where: { ip_hash: ipHash, created_at: { gte: since } } }),
      prisma.visits.count({ where: { notified: true, created_at: { gte: new Date(Date.now() - 3_600_000) } } }),
    ]);
    const notify = recentSameVisitor === 0 && notifiedLastHour < MAX_NOTIFICATIONS_PER_HOUR;

    await prisma.visits.create({
      data: { ip_hash: ipHash, path, referrer, country, city, device: device(ua), notified: notify },
    });

    if (notify) {
      const where = [city, country].filter(Boolean).join(", ") || "Unknown location";
      await sendPush({
        title: `New visitor · ${where}`,
        body: `Viewing ${path}${referrer ? ` · from ${referrer}` : ""} · ${device(ua)}`,
        url: "/admin/opportunities?view=visitors",
      });
    }
  } catch (e) {
    console.error("[visit error]", e);
  }
  return new NextResponse(null, { status: 204 });
}
