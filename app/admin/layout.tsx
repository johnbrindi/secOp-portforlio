import AdminSidebar from "../components/admin/AdminSidebar";
import type { Metadata } from "next";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        }}
      >
        {children}
      </main>
    </div>
  );
}
