import AdminProjectForm from "../../components/admin/AdminProjectForm";
import prisma from "../../../lib/prisma";
import { Code2, Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  let projects: any[] = [];
  try {
    const projectsData = await prisma.projects.findMany({
      orderBy: { created_at: "desc" },
    });
    projects = projectsData.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description || "",
      image: p.image_url || "",
      tags: p.tags || [],
      link: p.link || "",
    }));
  } catch {
    projects = [];
  }

  return (
    <div>
      <div
        className="flex items-center gap-3 mb-10"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(167,119,227,.1)", color: "var(--accent-2)" }}
        >
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
            Projects
          </h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            {projects.length} project{projects.length !== 1 ? "s" : ""} in database
          </p>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Plus className="w-4 h-4" style={{ color: "var(--accent-2)" }} />
          <h2 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
            Add Project
          </h2>
        </div>
        <AdminProjectForm submitLabel="Add Project" />
      </div>

      {projects.length > 0 && (
        <div>
          <p className="text-label mb-4">Existing projects</p>
          <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-start justify-between gap-4 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold truncate" style={{ fontSize: "var(--step-0)" }}>
                    {p.title}
                  </h3>
                  <p className="text-small truncate" style={{ color: "var(--text-muted)" }}>
                    {p.tags?.join(", ")} {p.description ? `· ${p.description.substring(0, 60)}…` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length === 0 && (
        <div className="card flex flex-col items-center gap-3 py-12 text-center">
          <Code2 className="w-8 h-8" style={{ color: "var(--text-dim)" }} />
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            No projects in database yet. Add one above.
          </p>
        </div>
      )}
    </div>
  );
}
