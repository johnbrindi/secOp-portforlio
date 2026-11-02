import type { MetadataRoute } from "next";
import { PERSON } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${PERSON.name} — Portfolio`,
    short_name: PERSON.shortName,
    description: PERSON.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#09090f",
    theme_color: "#09090f",
    icons: [
      { src: "/icon", sizes: "48x48", type: "image/png" },
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    // Long-press shortcuts on the installed app (admin pages still require sign-in).
    shortcuts: [
      { name: "Opportunities", url: "/admin/opportunities", icons: [{ src: "/icons/96", sizes: "96x96" }] },
      { name: "Scholarships", url: "/admin/opportunities?view=scholarships", icons: [{ src: "/icons/96", sizes: "96x96" }] },
    ],
  };
}
