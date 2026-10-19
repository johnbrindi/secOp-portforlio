import type { MetadataRoute } from "next";
import { PERSON } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON.name} — Portfolio`,
    short_name: PERSON.shortName,
    description: PERSON.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090f",
    theme_color: "#09090f",
    icons: [
      { src: "/icon", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
