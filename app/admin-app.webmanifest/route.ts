import type { MetadataRoute } from "next";

// Manifest for the installable admin app, linked only from app/admin/layout.tsx so the
// public portfolio never offers an install. Served outside /admin because browsers
// fetch manifests without cookies; it contains no private data.
export function GET() {
  const manifest: MetadataRoute.Manifest = {
    id: "/admin",
    name: "JB Admin — Opportunities",
    short_name: "JB Admin",
    description: "Private dashboard: opportunities, Master's scholarships, visitors and notifications.",
    start_url: "/admin/opportunities",
    scope: "/admin",
    display: "standalone",
    background_color: "#09090f",
    theme_color: "#09090f",
    icons: [
      { src: "/icons/192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Opportunities", url: "/admin/opportunities?view=tech", icons: [{ src: "/icons/96.png", sizes: "96x96" }] },
      { name: "Scholarships", url: "/admin/opportunities?view=scholarships", icons: [{ src: "/icons/96.png", sizes: "96x96" }] },
      { name: "Visitors", url: "/admin/opportunities?view=visitors", icons: [{ src: "/icons/96.png", sizes: "96x96" }] },
    ],
  };
  return Response.json(manifest, { headers: { "Content-Type": "application/manifest+json" } });
}
