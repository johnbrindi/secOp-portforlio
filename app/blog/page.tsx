"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import dummyBlogs from "./dummyBlogs";
import { Clock, ArrowRight } from "lucide-react";

const CATEGORIES = [
  "All",
  "SOC",
  "Web Security",
  "Network Security",
  "Pentesting",
  "CTF Writeups",
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogListPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? dummyBlogs
      : dummyBlogs.filter((b) => b.category === selected);

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-12">
            <p className="text-label mb-3">Writing</p>
            <h1 className="text-headline mb-4">
              Field notes &{" "}
              <span className="gradient-text">research</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              Write-ups from CTF challenges, SOC operations, and hands-on security research.
              No fluff — just practical field knowledge.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className="btn text-small"
                style={
                  selected === cat
                    ? {
                        background: "var(--accent)",
                        color: "#fff",
                        borderColor: "transparent",
                        boxShadow: "0 4px 16px var(--accent-glow)",
                        padding: ".4em 1em",
                      }
                    : {
                        background: "var(--surface-2)",
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                        padding: ".4em 1em",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            }}
          >
            {filtered.map((blog) => (
              <article
                key={blog.id}
                className="card group flex flex-col cursor-pointer overflow-hidden"
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                {blog.image && (
                  <div className="overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 p-6 flex-1">
                  {blog.category && (
                    <span className="text-label" style={{ fontSize: ".65rem", color: "var(--accent)" }}>
                      {blog.category}
                    </span>
                  )}

                  <h2
                    className="font-display font-semibold leading-snug"
                    style={{ fontSize: "var(--step-1)" }}
                  >
                    {blog.title}
                  </h2>

                  <p
                    className="text-small flex-1"
                    style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
                  >
                    {blog.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-small" style={{ color: "var(--text-dim)" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {blog.readTime} min
                    </span>
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>

                  {blog.tags?.length ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="text-small px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--surface-3)",
                            color: "var(--text-dim)",
                            fontSize: ".68rem",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div
                    className="flex items-center gap-1.5 text-small font-medium mt-2 transition-all duration-300 group-hover:gap-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-label mb-2">No articles</p>
              <p className="text-body" style={{ color: "var(--text-muted)" }}>
                No articles in this category yet.
              </p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}