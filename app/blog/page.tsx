"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import dummyBlogs from "./dummyBlogs";

const CATEGORIES = [
  "All",
  "Web Security",
  "Network Security",
  "Malware Analysis",
  "Pentesting",
  "Cloud Security",
  "CTF Writeups",
];

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
              Write-ups from CTF challenges, lessons from real engagements, and
              honest takes on the security landscape.
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
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {filtered.map((blog) => (
              <article
                key={blog.id}
                className="card group flex flex-col cursor-pointer overflow-hidden"
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                {blog.image && (
                  <div className="overflow-hidden" style={{ height: "180px" }}>
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
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}