import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

// Admin accounts live in the admin_users table. Whoever has a row there is an
// admin, whether they sign in with email + password or with Okta.
// Manage accounts with:  npm run admin:set-password -- <email> '<password>'
// or change your own password on /admin/account.

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
export const MIN_PASSWORD_LENGTH = 10;

const normalize = (email: string) => email.trim().toLowerCase();

export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  return (await prisma.admin_users.count({ where: { email: normalize(email) } })) > 0;
}

export class AccountLockedError extends Error {
  constructor() {
    super("TooManyAttempts");
  }
}

// Returns the admin's email on success, null on a wrong email or password.
// Throws AccountLockedError while the account is locked after repeated failures.
export async function authenticate(email: string, password: string): Promise<string | null> {
  const user = await prisma.admin_users.findUnique({ where: { email: normalize(email) } });
  if (!user) {
    // Same work as a real check, so response time doesn't reveal which emails exist.
    verifyPassword(password, "scrypt:AAAAAAAAAAAAAAAAAAAAAA:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    return null;
  }
  if (user.locked_until && user.locked_until > new Date()) throw new AccountLockedError();

  if (!verifyPassword(password, user.password_hash)) {
    const attempts = user.failed_attempts + 1;
    await prisma.admin_users.update({
      where: { id: user.id },
      data: attempts >= MAX_FAILED_ATTEMPTS
        ? { failed_attempts: 0, locked_until: new Date(Date.now() + LOCK_MINUTES * 60_000) }
        : { failed_attempts: attempts },
    });
    if (attempts >= MAX_FAILED_ATTEMPTS) throw new AccountLockedError();
    return null;
  }

  await prisma.admin_users.update({
    where: { id: user.id },
    data: { failed_attempts: 0, locked_until: null, last_login_at: new Date() },
  });
  return user.email;
}

export async function setPassword(email: string, password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  const password_hash = hashPassword(password);
  return prisma.admin_users.upsert({
    where: { email: normalize(email) },
    create: { email: normalize(email), password_hash },
    update: { password_hash, failed_attempts: 0, locked_until: null },
  });
}
