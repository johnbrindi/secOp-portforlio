// Creates an admin account, or resets its password (also clears any lockout).
// Usage: npm run admin:set-password -- you@example.com 'new-password'
import { setPassword } from "../lib/admin-users";

const [email, password] = process.argv.slice(2);
if (!email?.includes("@") || !password) {
  console.error("Usage: npm run admin:set-password -- <email> '<password>'");
  process.exit(1);
}
setPassword(email, password)
  .then((user) => {
    console.log(`Admin password set for ${user.email}`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
