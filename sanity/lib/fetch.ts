import { cache } from "react";
import { sanityClient } from "./client";
import { projectBySlugQuery, projectsQuery, skillsQuery } from "./queries";
import type { Project, Skill } from "@/sanity/types";

export const getProjects = cache(async () => {
  return sanityClient.fetch<Project[]>(projectsQuery);
});

export const getProjectBySlug = cache(async (slug: string) => {
  return sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
});

export const getSkills = cache(async () => {
  return sanityClient.fetch<Skill[]>(skillsQuery);
});
