"use client";
import React from "react";
import { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  color: {
    bg: string;
    border: string;
    title: string;
    accent: string;
  };
  onAddComment: () => void;
}

export default function ProjectCard({ project, color, onAddComment }: ProjectCardProps) {
  return (
    <div className={`${color.bg} border-2 ${color.border} rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      {project.image && (
        <img src={project.image} alt={project.title} className="rounded h-36 object-cover mb-4" />
      )}
      <h2 className={`text-2xl font-bold mb-2 ${color.title}`}>{project.title}</h2>
      <p className="mb-4 text-sm whitespace-pre-line text-gray-700">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.comments.length > 0 ? (
          project.comments.map(comment => (
            <div key={comment.name} className={`px-3 py-1 rounded-full text-xs font-medium ${color.accent}`}>
              <strong>{comment.name}:</strong> {comment.comment}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
      <div className="flex items-center justify-between text-xs mt-auto mb-2">
        <span className="flex items-center gap-1 font-semibold text-amber-600">{project.likes} ⭐</span>
        <span className="text-gray-600 font-medium">{project.comments.length} Comments</span>
        <button
          className={`${color.title} font-semibold underline text-xs hover:opacity-70 transition`}
          onClick={onAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
