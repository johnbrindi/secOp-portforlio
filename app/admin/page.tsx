import Link from "next/link";
import { Shield, FileText, Code2, Award, User, Wrench, MessageSquare, BarChart3, ArrowRight } from "lucide-react";
import prisma from "../../lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — JohnBrindi",
};

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [posts, contacts] = await Promise.all([
      prisma.posts.count(),
      prisma.contacts.count(),
    ]);
    return { posts, contacts };
  } catch {
    return { posts: 0, contacts: 0 };
  }
}

const sections = [
  {
    title: "Messages",
    description: "View and respond to contact form submissions.",
    icon: MessageSquare,
    href: "/admin/messages",
    color: "#4ade80",
  },
  {
    title: "Blog Posts",
    description: "Create, edit, and publish blog articles.",
    icon: FileText,
    href: "/admin/blogs",
    color: "var(--accent)",
  },
  {
    title: "Projects",
    description: "Manage portfolio projects and case studies.",
    icon: Code2,
    href: "/admin/projects",
    color: "var(--accent-2)",
  },
  {
    title: "Certifications",
    description: "Update earned and in-progress certifications.",
    icon: Award,
    href: "/admin/certifications",
    color: "#f59e0b",
  },
  {
    title: "Profile",
    description: "Edit your bio, title, and profile information.",
    icon: User,
    href: "/admin/profile",
    color: "var(--accent)",
  },
  {
    title: "Skills",
    description: "Update your skills and expertise areas.",
    icon: Wrench,
    href: "/admin/skills",
    color: "var(--accent-2)",
  },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Page header */}
      <div
        className="flex items-center gap-3 mb-10"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
        >
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
            Admin Dashboard
          </h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            Mazwewoh John Brindi — portfolio management
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="card p-5">
          <p className="text-small mb-1" style={{ color: "var(--text-muted)" }}>Blog Posts</p>
          <p className="font-display font-bold" style={{ fontSize: "var(--step-3)" }}>
            {stats.posts}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-small mb-1" style={{ color: "var(--text-muted)" }}>Messages</p>
          <p className="font-display font-bold" style={{ fontSize: "var(--step-3)" }}>
            {stats.contacts}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-small mb-1" style={{ color: "var(--text-muted)" }}>Status</p>
          <p
            className="font-display font-bold flex items-center gap-2"
            style={{ fontSize: "var(--step-3)", color: "#4ade80" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#4ade80] animate-pulse inline-block" />
            Online
          </p>
        </div>
      </div>

      {/* Sections grid */}
      <p className="text-label mb-6">Manage</p>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}
      >
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="card group flex flex-col gap-4 p-6 no-underline"
              style={{ minHeight: "160px" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `color-mix(in srgb, ${section.color} 14%, transparent)`,
                  color: section.color,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-semibold mb-1" style={{ fontSize: "var(--step-1)" }}>
                  {section.title}
                </h2>
                <p className="text-small" style={{ color: "var(--text-muted)" }}>
                  {section.description}
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 group-hover:gap-3"
                style={{ color: section.color }}
              >
                Open <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Back to site */}
      <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        <Link
          href="/"
          className="btn btn-outline text-small"
          style={{ padding: ".5em 1.2em" }}
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}