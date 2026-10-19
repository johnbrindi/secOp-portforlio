import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { JsonLd, PERSON_ID, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BlogList from "./_components/BlogList";
import posts from "./posts";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Network & Security Field Notes",
  description:
    "Field notes from Mazwewoh John Brindi on SOC operations, SIEM tuning, penetration testing methodology, CTF writeups, MPLS and network security.",
  path: "/blog",
});

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <JsonLd
          data={[
            breadcrumbSchema([["Blog", "/blog"]]),
            {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog#blog`,
              name: "Network & Security Field Notes",
              url: `${SITE_URL}/blog`,
              author: { "@id": PERSON_ID },
              blogPost: sortedPosts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `${SITE_URL}/blog/${p.slug}`,
                datePublished: p.publishedAt,
              })),
            },
          ]}
        />
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

          <BlogList posts={sortedPosts} />

        </div>
      </main>
      <Footer />
    </>
  );
}
