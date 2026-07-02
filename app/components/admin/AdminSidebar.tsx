"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  MessageSquare,
  FileText,
  Code2,
  Award,
  User,
  Wrench,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Logo row */}
      <div
        className="flex items-center justify-between mb-8"
        style={{ paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
          >
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-display font-semibold"
            style={{ fontSize: "var(--step-0)", letterSpacing: "-.01em" }}
          >
            Admin<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden"
          style={{ color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: ".6em .85em",
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
      <div
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: ".6em .85em",
            borderRadius: "8px",
            color: "#f87171",
            fontSize: "var(--step--1)",
            fontWeight: 500,
            transition: "all .15s ease",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            textAlign: "left",
            width: "100%",
          }}
        >
          <LogOut style={{ width: "14px", height: "14px" }} />
          Sign Out
        </button>

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: ".6em .85em",
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
    </>
  );

  return (
    <>
      {/* ── Mobile top bar ────────────────────────────── */}
      <div
        className="md:hidden flex items-center gap-3 px-5 py-3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          style={{ color: "var(--text)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
          >
            <Shield className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-semibold" style={{ fontSize: "var(--step--1)" }}>
            Admin<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </div>
      </div>

      {/* ── Mobile drawer overlay ──────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────── */}
      <aside
        className="md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "240px",
          zIndex: 50,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform .25s ease",
          overflowY: "auto",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Desktop sidebar (always visible) ──────────── */}
      <aside
        className="hidden md:flex"
        style={{
          width: "220px",
          minWidth: "220px",
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: "1.5rem 1rem",
          flexDirection: "column",
          gap: "0",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
