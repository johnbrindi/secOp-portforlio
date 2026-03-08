import Link from "next/link";
import { getProjects } from "@/sanity/lib/fetch";
import ProjectCard from "../components/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 text-white">
      <h1 className="mb-8 text-3xl font-bold text-cyan-400">Projects</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project._id} href={`/projects/${project.slug.current}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}
