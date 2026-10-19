import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import posts from "./blog/posts";

// Bump when page content changes meaningfully — a constant date avoids telling
// crawlers every page changed on every deploy.
const CONTENT_UPDATED = new Date("2026-10-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/zigex", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/certifications", priority: 0.7, changeFrequency: "monthly" },
    { path: "/achievements", priority: 0.7, changeFrequency: "monthly" },
    { path: "/lab", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/cv", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
