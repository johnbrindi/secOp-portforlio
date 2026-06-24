import Link from "next/link";
import { Shield, MessageSquare, FileText, Code2, Award, User, Wrench, Home } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: Code2 },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
];

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 mb-8"
        style={{ paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
        >
          <Shield className="w-3.5 h-3.5 text-white" />
        </div>
        <span
          className="font-display font-semibold"
          style={{ fontSize: "var(--step-0)", letterSpacing: "-.01em" }}
        >
          Admin
          <span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: ".55em .75em",
                borderRadius: "8px",
                color: "var(--text-muted)",
                fontWeight: 500,
                fontSize: "var(--step--1)",
                textDecoration: "none",
                transition: "all .15s ease",
              }}
              className="admin-nav-link"
            >
              <Icon style={{ width: "15px", height: "15px", flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: ".55em .75em",
            borderRadius: "8px",
            color: "var(--text-dim)",
            fontSize: "var(--step--1)",
            textDecoration: "none",
          }}
        >
          <Home style={{ width: "14px", height: "14px" }} />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
