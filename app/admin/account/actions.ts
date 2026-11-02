"use server";

import { requireAdmin } from "@/lib/auth";
import { authenticate, setPassword, AccountLockedError, MIN_PASSWORD_LENGTH } from "@/lib/admin-users";

export type ChangePasswordResult = { ok: boolean; message: string };

export async function changePassword(_prev: ChangePasswordResult | null, form: FormData): Promise<ChangePasswordResult> {
  const session = await requireAdmin();
  const email = session.user!.email!;
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  const confirm = String(form.get("confirm") ?? "");

  if (next.length < MIN_PASSWORD_LENGTH) return { ok: false, message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` };
  if (next !== confirm) return { ok: false, message: "The new passwords don't match." };
  if (next === current) return { ok: false, message: "Choose a password different from the current one." };

  try {
    if (!(await authenticate(email, current))) return { ok: false, message: "Current password is incorrect." };
  } catch (e) {
    if (e instanceof AccountLockedError) return { ok: false, message: "Too many failed attempts. Try again in 15 minutes." };
    throw e;
  }

  await setPassword(email, next);
  return { ok: true, message: "Password changed. Use the new one next time you sign in." };
}
