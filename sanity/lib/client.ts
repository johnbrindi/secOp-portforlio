import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID environment variable.");
}

if (!dataset) {
  throw new Error("Missing SANITY_DATASET environment variable.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || "2025-02-01",
  useCdn: true,
});
