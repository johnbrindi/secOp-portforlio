import type { Metadata } from "next";
import { UserCog } from "lucide-react";
import prisma from "../../../lib/prisma";
import { requireAdmin } from "@/lib/auth";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = { title: "Account — Admin" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await requireAdmin();
  const account = await prisma.admin_users.findUnique({
    where: { email: session.user!.email!.toLowerCase() },
    select: { email: true, last_login_at: true, created_at: true },
  });
  const fmt = (d: Date | null | undefined) =>
    d ? d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Douala" }) : "—";

  return (
    <div style={{ maxWidth: 520 }}>
      <div
        className="flex items-center gap-3 mb-8"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(110,142,251,.1)", color: "var(--accent)" }}
        >
          <UserCog className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>Account</h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>{account?.email ?? session.user?.email}</p>
        </div>
      </div>

      <div className="card p-5 mb-6 grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <p className="text-label" style={{ color: "var(--text-dim)" }}>Last sign-in</p>
          <p className="text-small mt-1">{fmt(account?.last_login_at)}</p>
        </div>
        <div>
          <p className="text-label" style={{ color: "var(--text-dim)" }}>Account created</p>
          <p className="text-small mt-1">{fmt(account?.created_at)}</p>
        </div>
      </div>

      <div className="card p-6">
        <p className="font-display font-semibold mb-1">Change password</p>
        <p className="text-small mb-5" style={{ color: "var(--text-muted)" }}>
          Stored only as a secure hash in the database. At least 10 characters.
        </p>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
