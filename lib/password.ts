import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Admin password hashing for the email + password sign-in (lib/auth.ts).
// Format: "scrypt:<salt>:<hash>" (base64url), stored in ADMIN_PASSWORD_HASH.
// To set a new password:  npm run admin:hash-password -- 'new-password'

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt:${salt.toString("base64url")}:${scryptSync(password, salt, KEY_LENGTH).toString("base64url")}`;
}

export function verifyPassword(password: string, stored: string | undefined): boolean {
  // Tolerate copy-paste slips in the env var: surrounding spaces or quotes.
  const [scheme, salt, hash] = (stored || "").trim().replace(/^["']|["']$/g, "").split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = scryptSync(password, Buffer.from(salt, "base64url"), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
