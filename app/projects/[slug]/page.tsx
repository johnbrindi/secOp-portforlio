import { notFound } from "next/navigation";
import PortableTextContent from "@/app/components/PortableTextContent";
import { getProjectBySlug, getProjects } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-10 text-white">
      <article className="mx-auto max-w-4xl rounded-2xl border border-gray-700 bg-gray-800/70 p-6 shadow-xl">
        <div className="mb-6">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-400">Project</p>
          <h1 className="text-4xl font-bold text-white">{project.title}</h1>
          {project.publishedAt ? (
            <p className="mt-3 text-sm text-gray-400">
              {new Date(project.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}
        </div>

        {project.mainImage ? (
          <img
            src={urlFor(project.mainImage).width(1600).height(900).fit("crop").url()}
            alt={project.mainImage.alt || project.title}
            className="mb-8 h-auto w-full rounded-xl object-cover"
          />
        ) : null}

        <PortableTextContent value={project.description} />

        {project.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-500/30 px-4 py-2 text-sm text-cyan-200">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-4">
          {project.projectUrl ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-gray-950 transition hover:bg-cyan-400"
            >
              Live project
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gray-600 px-5 py-3 font-semibold text-white transition hover:border-cyan-400"
            >
              Source code
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}
