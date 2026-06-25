"use client";

import Link from "next/link";
import { Shield, MessageSquare, FileText, Code2, Award, User, Wrench, Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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

      {/* Footer Actions */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "2px" }}>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: ".55em .75em",
            borderRadius: "8px",
            color: "#f87171",
            fontSize: "var(--step--1)",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all .15s ease",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            textAlign: "left",
            width: "100%",
          }}
          className="hover:bg-[rgba(248,113,113,0.1)]"
        >
          <LogOut style={{ width: "14px", height: "14px" }} />
          Sign Out
        </button>

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
