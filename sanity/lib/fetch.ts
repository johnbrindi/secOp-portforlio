import { cache } from "react";
import { sanityClient } from "./client";
import { projectBySlugQuery, projectsQuery, skillsQuery } from "./queries";
import type { Project, Skill } from "@/sanity/types";

export const getProjects = cache(async () => {
  try {
    return await sanityClient.fetch<Project[]>(projectsQuery);
  } catch (error) {
    console.warn("Sanity fetch failed ( likely missing project ID ). Returning empty array.");
    return [];
  }
});

export const getProjectBySlug = cache(async (slug: string) => {
  try {
    return await sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
  } catch (error) {
    console.warn("Sanity fetch failed ( likely missing project ID ). Returning null.");
    return null;
  }
});

export const getSkills = cache(async () => {
  try {
    return await sanityClient.fetch<Skill[]>(skillsQuery);
  } catch (error) {
    console.warn("Sanity fetch failed ( likely missing project ID ). Returning empty array.");
    return [];
  }
});
