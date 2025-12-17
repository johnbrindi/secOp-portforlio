"use client";
import { useRouter } from "next/navigation";
import { initialProjects } from "./projectsData";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => router.push(`/projects/${project.id}`)}
          />
        ))}
      </div>
    </div>
  );
}