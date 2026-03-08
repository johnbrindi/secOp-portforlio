import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Portfolio Studio",
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "production",
  schema: {
    types: schemaTypes,
  },
});
