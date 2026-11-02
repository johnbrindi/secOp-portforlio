// Prints an ADMIN_PASSWORD_HASH value for the email + password admin sign-in.
// Usage: npm run admin:hash-password -- 'new-password'
import { hashPassword } from "../lib/password";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error("Usage: npm run admin:hash-password -- '<password of at least 10 characters>'");
  process.exit(1);
}
console.log(hashPassword(password));
