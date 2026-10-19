import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { authOptions, isAdminEmail } from "@/lib/auth";
import AdminSidebar from "../components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: proxy.ts already gates /admin, but never render admin data without a verified session
  const session = await getServerSession(authOptions);
  if (!isAdminEmail(session?.user?.email)) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          overflowX: "hidden",
          // On mobile, add top padding to account for the fixed top bar
          paddingTop: "clamp(4.5rem, 10vw, 2.5rem)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
