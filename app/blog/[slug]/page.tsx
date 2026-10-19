"use client";

import dummyBlogs from "../dummyBlogs";
import { use, useState } from "react";
import {
  Heart,
  ArrowLeft,
  Clock,
  Share2,
  Linkedin,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const blog = dummyBlogs.find((b) => String(b.id) === id);
  const relatedBlogs = dummyBlogs
    .filter((b) => b.id !== id && b.category === blog?.category)
    .slice(0, 2);

  const [likeCount, setLikeCount] = useState(blog ? blog.likes || 0 : 0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleLike() {
    if (liked) return;
    setLikeCount((c) => c + 1);
    setLiked(true);
  }

  function handleShare(platform: "twitter" | "linkedin") {
    if (!blog) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${blog.title} — by Mazwewoh John Brindi`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  }

  function handleCopyLink() {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="pt-[7rem] pb-[var(--space-xl)]">
          <div className="container text-center py-20">
            <p className="text-label mb-4">404</p>
            <h1 className="text-headline mb-4">Article not found</h1>
            <Link href="/blog" className="btn btn-outline">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Convert markdown-style code blocks and headings to styled HTML
  function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="font-display font-semibold mt-10 mb-4"
            style={{ fontSize: "var(--step-2)", color: "var(--text)" }}
          >
            {line.replace("## ", "")}
          </h2>
        );
        i++;
      } else if (line.startsWith("```")) {
        // Code block
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre
            key={key++}
            className="font-mono rounded-lg p-4 my-4 overflow-x-auto"
            style={{
              background: "var(--surface-3)",
              color: "var(--text-muted)",
              fontSize: ".82rem",
              lineHeight: 1.7,
              border: "1px solid var(--border)",
            }}
          >
            {codeLines.join("\n")}
          </pre>
        );
        i++; // skip closing ```
      } else if (line.startsWith("| ") || line.startsWith("|---")) {
        // Table — collect all rows
        const tableLines: string[] = [line];
        i++;
        while (i < lines.length && lines[i].startsWith("|")) {
          tableLines.push(lines[i]);
          i++;
        }
        const rows = tableLines.filter((l) => !l.startsWith("|---"));
        elements.push(
          <div key={key++} className="overflow-x-auto my-6">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "var(--step--1)",
              }}
            >
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri}>
                    {row
                      .split("|")
                      .filter((_, ci) => ci > 0 && ci < row.split("|").length - 1)
                      .map((cell, ci) => {
                        const Tag = ri === 0 ? "th" : "td";
                        return (
                          <Tag
                            key={ci}
                            style={{
                              padding: ".5em .75em",
                              borderBottom: "1px solid var(--border)",
                              color:
                                ri === 0 ? "var(--text)" : "var(--text-muted)",
                              fontWeight: ri === 0 ? 600 : 400,
                              textAlign: "left",
                            }}
                          >
                            {cell.trim()}
                          </Tag>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={key++}
            className="text-small ml-5 my-1"
            style={{ color: "var(--text-muted)", listStyleType: "disc" }}
          >
            {line.replace("- ", "")}
          </li>
        );
        i++;
      } else if (line.trim() === "") {
        elements.push(<div key={key++} style={{ height: ".75em" }} />);
        i++;
      } else {
        elements.push(
          <p
            key={key++}
            className="text-small leading-relaxed"
            style={{ color: "var(--text-muted)", lineHeight: 1.8 }}
          >
            {line}
          </p>
        );
        i++;
      }
    }
    return elements;
  }

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-small font-medium mb-10 transition-all duration-200 hover:gap-3"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {/* Header */}
            <div className="mb-10">
              {blog.category && (
                <span className="text-label" style={{ color: "var(--accent)", fontSize: ".65rem" }}>
                  {blog.category}
                </span>
              )}
              <h1 className="text-headline mt-3 mb-4">{blog.title}</h1>

              {/* Meta row */}
              <div
                className="flex flex-wrap items-center gap-4 pb-6"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="flex items-center gap-1.5 text-small"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime} min read
                </span>
                <span className="text-small" style={{ color: "var(--text-muted)" }}>
                  {formatDate(blog.publishedAt)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((t) => (
                    <span
                      key={t}
                      className="text-small px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--surface-3)",
                        color: "var(--text-dim)",
                        fontSize: ".67rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero image */}
            {blog.image && (
              <div
                className="overflow-hidden rounded-[var(--radius-lg)] mb-10"
                style={{ height: "340px" }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article content */}
            <div className="mb-12">
              {renderContent(blog.content)}
            </div>

            {/* Actions row */}
            <div
              className="flex flex-wrap items-center gap-3 py-6 mb-12"
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
            >
              <button
                onClick={handleLike}
                className="btn text-small flex items-center gap-2"
                style={{
                  background: liked ? "rgba(249,115,22,.12)" : "var(--surface-2)",
                  color: liked ? "#f97316" : "var(--text-muted)",
                  borderColor: liked ? "rgba(249,115,22,.3)" : "var(--border)",
                  padding: ".5em 1.1em",
                  cursor: liked ? "default" : "pointer",
                }}
              >
                <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
                {likeCount > 0 ? likeCount : ""} {liked ? "Liked" : "Like this"}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-small" style={{ color: "var(--text-dim)" }}>
                  Share:
                </span>
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200"
                  style={{ color: "var(--text-muted)", background: "var(--surface-2)" }}
                  aria-label="Share on Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200"
                  style={{ color: "var(--text-muted)", background: "var(--surface-2)" }}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200"
                  style={{
                    color: copied ? "var(--accent)" : "var(--text-muted)",
                    background: "var(--surface-2)",
                  }}
                  aria-label="Copy link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related posts */}
            {relatedBlogs.length > 0 && (
              <div>
                <p className="text-label mb-6">Related articles</p>
                <div className="flex flex-col gap-4">
                  {relatedBlogs.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="card group flex gap-4 p-4 no-underline"
                    >
                      {related.image && (
                        <div
                          className="flex-shrink-0 overflow-hidden rounded-lg"
                          style={{ width: "80px", height: "64px" }}
                        >
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div>
                        <span className="text-label" style={{ fontSize: ".6rem", color: "var(--accent)" }}>
                          {related.category}
                        </span>
                        <h3
                          className="font-display font-semibold leading-snug mt-1"
                          style={{ fontSize: "var(--step-0)" }}
                        >
                          {related.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
