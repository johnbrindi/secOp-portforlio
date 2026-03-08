export const projectsQuery = `*[_type == "project"] | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  slug,
  description,
  mainImage,
  tags,
  projectUrl,
  githubUrl,
  publishedAt
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  mainImage,
  tags,
  projectUrl,
  githubUrl,
  publishedAt
}`;

export const skillsQuery = `*[_type == "skill"] | order(order asc, title asc){
  _id,
  title,
  slug,
  description,
  iconImage,
  category,
  order
}`;
