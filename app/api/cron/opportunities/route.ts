import { NextRequest, NextResponse } from "next/server";
import { runDigest } from "@/lib/opportunities/run";

// Runs Mondays and Thursdays (see vercel.json and lib/opportunities/schedule.ts). Vercel Cron sends `Authorization: Bearer $CRON_SECRET`.
// Manual test without emailing or saving:  GET /api/cron/opportunities?dry=1
// Run history and status: /admin/opportunities
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await runDigest({ trigger: "cron", dry: req.nextUrl.searchParams.has("dry") });
    return NextResponse.json(summary, { status: summary.errors.length ? 500 : 200 });
  } catch (error) {
    console.error("[opportunities cron error]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
