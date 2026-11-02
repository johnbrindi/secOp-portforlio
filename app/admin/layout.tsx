import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { authOptions, isAdmin } from "@/lib/auth";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminPwa from "../components/admin/AdminPwa";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
  // Only admin pages link the manifest, so only the admin dashboard is installable.
  manifest: "/admin-app.webmanifest",
  appleWebApp: { capable: true, title: "JB Admin", statusBarStyle: "black-translucent" },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: proxy.ts already gates /admin, but never render admin data without a verified session
  const session = await getServerSession(authOptions);
  if (!(await isAdmin(session?.user?.email))) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <AdminPwa />
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
