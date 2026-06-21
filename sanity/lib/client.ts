import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "fallback-id";
const dataset = process.env.SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || "2025-02-01",
  useCdn: true,
});
