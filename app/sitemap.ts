import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import posts from "./blog/posts";

// Google uses <lastmod> (when it's accurate) to schedule recrawls and ignores
// <priority>/<changefreq>, so only lastmod is emitted. Bump a page's date here when
// its main content changes — not for cosmetic edits. Blog posts are added automatically.
const PAGES: { path: string; lastModified: string; images?: string[] }[] = [
  { path: "", lastModified: "2026-10-19", images: ["/me.jpg"] },
  { path: "/about", lastModified: "2026-10-19", images: ["/pic.jpg"] },
  {
    path: "/projects",
    lastModified: "2026-10-19",
    images: ["/projects/mpls-1.png", "/projects/troubleshooting-1.png", "/projects/ssh-hardening.png"],
  },
  { path: "/zigex", lastModified: "2026-10-19" },
  { path: "/blog", lastModified: "2026-10-19" },
  { path: "/certifications", lastModified: "2026-10-19" },
  { path: "/achievements", lastModified: "2026-10-19" },
  { path: "/lab", lastModified: "2026-10-19" },
  { path: "/cv", lastModified: "2026-10-19" },
  { path: "/contact", lastModified: "2026-10-19" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: new Date(p.lastModified),
      ...(p.images ? { images: p.images.map((src) => `${SITE_URL}${src}`) } : {}),
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      ...(post.image ? { images: [post.image] } : {}),
    })),
  ];
}
