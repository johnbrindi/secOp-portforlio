import AdminSidebar from "../components/admin/AdminSidebar";

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
          // On mobile, add top padding to account for the fixed top bar
          paddingTop: "clamp(4.5rem, 10vw, 2.5rem)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
