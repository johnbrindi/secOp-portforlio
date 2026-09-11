import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/zigex", "/about", "/cv"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/", "/zigex", "/about"],
      },
      {
        userAgent: "bingbot",
        allow: ["/", "/zigex", "/about"],
      }
    ],
    sitemap: "https://mazwewohjohnbrindi.vercel.app/sitemap.xml",
  };
}
