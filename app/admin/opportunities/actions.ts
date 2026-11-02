"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { runDigest } from "@/lib/opportunities/run";

// "Run now" on /admin/opportunities: same pipeline as the daily cron, emails included.
export async function runDigestNow() {
  await requireAdmin();
  await runDigest({ trigger: "manual" });
  revalidatePath("/admin/opportunities");
}
