"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import type { Blog } from "../posts";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogList({ posts }: { posts: Blog[] }) {
  const [selected, setSelected] = useState("All");

  // Only offer categories that actually have posts
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = selected === "All" ? posts : posts.filter((b) => b.category === selected);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter articles by category">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            aria-pressed={selected === cat}
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
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="card group flex flex-col overflow-hidden no-underline"
          >
            <article className="flex flex-col flex-1">
              {blog.image && (
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src={blog.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <Clock className="w-3 h-3" aria-hidden />
                    {blog.readTime} min read
                  </span>
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
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
                  Read article <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </div>
              </div>
            </article>
          </Link>
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
    </>
  );
}
