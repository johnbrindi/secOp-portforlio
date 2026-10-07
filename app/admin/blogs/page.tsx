import AdminBlogForm from "../../components/admin/AdminBlogForm";
import prisma from "../../../lib/prisma";
import { FileText, Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog Posts — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminBlogs() {
  let blogs: any[] = [];
  try {
    const blogsData = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
    });
    blogs = blogsData.map((b: any) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt || "",
      content: b.content || "",
      category: b.category || "",
      tags: b.tags || [],
      image: b.image_url || "",
      featured: b.featured || false,
    }));
  } catch {
    blogs = [];
  }

  return (
    <div>
      <div
        className="flex items-center gap-3 mb-10"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
        >
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
            Blog Posts
          </h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            {blogs.length} published post{blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Add post form */}
      <div className="card p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Plus className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <h2 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
            New Post
          </h2>
        </div>
        <AdminBlogForm submitLabel="Publish Post" />
      </div>

      {/* Existing posts */}
      {blogs.length > 0 && (
        <div>
          <p className="text-label mb-4">Published posts</p>
          <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
            {blogs.map((blog, i) => (
              <div
                key={blog.id}
                className="flex items-start justify-between gap-4 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-display font-semibold truncate"
                    style={{ fontSize: "var(--step-0)" }}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-small truncate" style={{ color: "var(--text-muted)" }}>
                    {blog.category} · {blog.excerpt}
                  </p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {blog.featured && (
                    <span
                      className="text-label px-2 py-0.5 rounded-full self-start"
                      style={{
                        fontSize: ".6rem",
                        color: "#4ade80",
                        background: "rgba(74,222,128,.1)",
                        border: "1px solid rgba(74,222,128,.2)",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {blogs.length === 0 && (
        <div
          className="card flex flex-col items-center gap-3 py-12 text-center"
        >
          <FileText className="w-8 h-8" style={{ color: "var(--text-dim)" }} />
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            No posts yet. Create your first post above.
          </p>
        </div>
      )}
    </div>
  );
}
