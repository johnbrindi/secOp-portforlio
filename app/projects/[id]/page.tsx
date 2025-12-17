import { initialProjects } from "./projectsData";
import ProjectCard from "../../components/ProjectCard";
import CommentForm from "../../components/CommentForm";
import { useState } from "react";

export default function ProjectDetailPage({ params }) {
  const project = initialProjects.find(p => p.id === Number(params.id));
  const [comments, setComments] = useState(project?.comments || []);

  function handleAddComment(form) {
    setComments([...comments, { ...form, time: "just now" }]);
  }

  if (!project) return <div className="text-center text-cyan-400 mt-20">Project not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <ProjectCard project={project} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((c, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-cyan-400">{c.name}</span>
                  <span className="text-sm text-gray-400">{c.time}</span>
                </div>
                <p className="text-gray-300">{c.comment}</p>
              </div>
            ))}
          </div>
          <CommentForm onSubmit={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
