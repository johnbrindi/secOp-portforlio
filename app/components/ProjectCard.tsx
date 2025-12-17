import React from "react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 cursor-pointer hover:bg-cyan-900 transition-colors flex flex-col justify-between min-h-[220px]"
      onClick={onClick}
    >
      <div>
        <h2 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h2>
        <p className="text-gray-300 mb-2 whitespace-pre-line">{project.description}</p>
        {project.image && (
          <img src={project.image} alt={project.title} className="rounded-lg w-full max-h-40 object-cover mb-2" />
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-400">{project.likes} Likes</span>
        <span className="text-sm text-gray-400">{project.comments?.length || 0} Comments</span>
      </div>
    </div>
  );
}
