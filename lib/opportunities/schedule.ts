// When the digests go out. Keep in sync with the cron in vercel.json ("0 5 * * 1,4").
export const RUN_WEEKDAYS_UTC = [1, 4]; // Monday, Thursday
export const RUN_HOUR_UTC = 5; // 06:00 in Cameroon (UTC+1)
export const SCHEDULE_LABEL = "Mondays and Thursdays at 06:00 Cameroon time";

// Longest gap between runs is Thursday → Monday (4 days); allow some slack before flagging.
export const STALE_AFTER_MS = 4.5 * 86_400_000;

export function nextRun(now = new Date()): Date {
  for (let i = 0; i <= 7; i++) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() + i);
    d.setUTCHours(RUN_HOUR_UTC, 0, 0, 0);
    if (d > now && RUN_WEEKDAYS_UTC.includes(d.getUTCDay())) return d;
  }
  throw new Error("unreachable");
}
