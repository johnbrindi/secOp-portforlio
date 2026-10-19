import type { Metadata } from "next";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BlogList from "./_components/BlogList";
import posts from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from Mazwewoh John Brindi: SOC operations, SIEM tuning, penetration testing methodology, CTF writeups, and network security.",
  alternates: { canonical: "/blog" },
};

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogListPage() {
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

          <BlogList posts={sortedPosts} />

        </div>
      </main>
      <Footer />
    </>
  );
}
