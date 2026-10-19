import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ShareButtons from "../_components/ShareButtons";
import posts from "../posts";
import { JsonLd, MAX_TITLE, PERSON_ID, breadcrumbSchema } from "@/lib/seo";
import { PERSON, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = posts.find((b) => b.slug === slug);
  if (!blog) return { title: "Article not found" };

  const title = `${blog.title} | ${PERSON.name}`.length > MAX_TITLE ? { absolute: blog.title } : blog.title;

  return {
    title,
    description: blog.excerpt,
    keywords: blog.tags,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: `/blog/${blog.slug}`,
      publishedTime: blog.publishedAt,
      authors: ["Mazwewoh John Brindi"],
      tags: blog.tags,
      ...(blog.image ? { images: [{ url: blog.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.image ? { images: [blog.image] } : {}),
    },
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = posts.find((b) => b.slug === slug);

  if (!blog) {
    // Old links used numeric ids (/blog/1) — send them to the canonical slug URL
    const legacy = posts.find((b) => b.id === slug);
    if (legacy) permanentRedirect(`/blog/${legacy.slug}`);
    notFound();
  }

  const url = `${SITE_URL}/blog/${blog.slug}`;
  const relatedBlogs = posts
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 2);

  const jsonLd = {
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    url,
    mainEntityOfPage: url,
    keywords: blog.tags.join(", "),
    ...(blog.image ? { image: blog.image } : {}),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <JsonLd data={[jsonLd, breadcrumbSchema([["Blog", "/blog"], [blog.title, `/blog/${blog.slug}`]])]} />
        <div className="container">
          <article style={{ maxWidth: "720px", margin: "0 auto" }}>

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
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
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
                className="relative overflow-hidden rounded-[var(--radius-lg)] mb-10"
                style={{ height: "340px" }}
              >
                <Image
                  src={blog.image}
                  alt=""
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
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
              <p className="text-small" style={{ color: "var(--text-muted)" }}>
                Questions or corrections?{" "}
                <Link href="/contact" style={{ color: "var(--accent)" }}>Get in touch</Link>
              </p>
              <div className="ml-auto">
                <ShareButtons title={blog.title} url={url} />
              </div>
            </div>

            {/* Related posts */}
            {relatedBlogs.length > 0 && (
              <div>
                <p className="text-label mb-6">Related articles</p>
                <div className="flex flex-col gap-4">
                  {relatedBlogs.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="card group flex gap-4 p-4 no-underline"
                    >
                      {related.image && (
                        <div
                          className="relative flex-shrink-0 overflow-hidden rounded-lg"
                          style={{ width: "80px", height: "64px" }}
                        >
                          <Image
                            src={related.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
