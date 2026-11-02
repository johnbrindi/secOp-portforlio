import webpush from "web-push";
import prisma from "@/lib/prisma";

// Web push to the admin's subscribed devices (enabled on /admin/opportunities).
// Needs VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY and VAPID_SUBJECT; without them
// notifications are skipped and everything else keeps working.

export type PushMessage = {
  title: string;
  body: string;
  url: string;
  // Notifications with the same tag replace each other instead of stacking.
  tag?: string;
};

export const pushConfigured = () =>
  !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.VAPID_SUBJECT);

export async function sendPush(message: PushMessage): Promise<{ sent: number; failed: number }> {
  if (!pushConfigured()) return { sent: 0, failed: 0 };
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!, process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!,
  );

  const subscriptions = await prisma.push_subscriptions.findMany();
  let sent = 0;
  let failed = 0;
  await Promise.all(subscriptions.map(async (s) => {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify(message),
        { TTL: 24 * 3600 },
      );
      sent++;
    } catch (e) {
      failed++;
      // 404/410: the browser dropped this subscription (uninstalled, permission revoked).
      const status = (e as { statusCode?: number }).statusCode;
      if (status === 404 || status === 410) {
        await prisma.push_subscriptions.delete({ where: { id: s.id } }).catch(() => {});
      } else {
        console.error("[push error]", status, e);
      }
    }
  }));
  return { sent, failed };
}
