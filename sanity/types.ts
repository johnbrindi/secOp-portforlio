import type { Image } from "sanity";

export type PortableTextBlock = {
  _key: string;
  _type: string;
  children?: Array<{
    _key: string;
    _type: "span";
    marks?: string[];
    text: string;
  }>;
  markDefs?: Array<Record<string, unknown>>;
  style?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  description: PortableTextBlock[];
  mainImage?: Image & { alt?: string };
  tags?: string[];
  projectUrl?: string;
  githubUrl?: string;
  publishedAt?: string;
};

export type Skill = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: PortableTextBlock[];
  iconImage?: Image & { alt?: string };
  category?: string;
  order?: number;
};
