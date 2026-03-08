import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/types";
import PortableTextContent from "./PortableTextContent";

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex min-h-[220px] cursor-pointer flex-col justify-between rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-lg transition-colors hover:bg-cyan-900"
      onClick={onClick}
    >
      <div>
        <h2 className="mb-2 text-xl font-bold text-cyan-400">{project.title}</h2>
        {project.mainImage ? (
          <img
            src={urlFor(project.mainImage).width(1200).height(675).fit("crop").url()}
            alt={project.mainImage.alt || project.title}
            className="mb-4 max-h-56 w-full rounded-lg object-cover"
          />
        ) : null}
        <PortableTextContent value={project.description} className="mb-4" />
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-500/30 px-3 py-1 text-xs text-cyan-200"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {project.publishedAt
            ? new Date(project.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Draft"}
        </span>
        <span className="text-sm text-cyan-300">
          {project.projectUrl ? "Open project" : "Project details"}
        </span>
      </div>
    </div>
  );
}
