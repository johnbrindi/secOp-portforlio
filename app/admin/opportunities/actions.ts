"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { runDigest } from "@/lib/opportunities/run";
import { sendPush } from "@/lib/push";

// "Run now" on /admin/opportunities: same pipeline as the daily cron, emails included.
export async function runDigestNow() {
  await requireAdmin();
  await runDigest({ trigger: "manual" });
  revalidatePath("/admin/opportunities");
}

type BrowserSubscription = { endpoint: string; keys: { p256dh: string; auth: string } };

export async function savePushSubscription(sub: BrowserSubscription, userAgent: string) {
  await requireAdmin();
  if (!sub?.endpoint?.startsWith("https://") || !sub.keys?.p256dh || !sub.keys?.auth) {
    throw new Error("Invalid push subscription");
  }
  await prisma.push_subscriptions.upsert({
    where: { endpoint: sub.endpoint },
    create: { endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, user_agent: userAgent.slice(0, 300) },
    update: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
  });
  revalidatePath("/admin/opportunities");
}

export async function removePushSubscription(endpoint: string) {
  await requireAdmin();
  await prisma.push_subscriptions.deleteMany({ where: { endpoint } });
  revalidatePath("/admin/opportunities");
}

export async function sendTestPush() {
  await requireAdmin();
  return sendPush({
    title: "Notifications are working",
    body: "You'll be notified about new visitors, opportunities and scholarships.",
    url: "/admin/opportunities",
  });
}
