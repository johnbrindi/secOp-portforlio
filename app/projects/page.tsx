"use client";
import React, { useState } from 'react';
import { initialProjects, Project } from './projectsData';
import CommentModal from './CommentModal';
import ProjectCard from './ProjectCard';

// ...existing code...

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(initialProjects);

  const handleOpenModal = (projectId: number) => {
    setActiveProject(projectId);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveProject(null);
  };
  
  const handleSubmitComment = (form: { name: string; email: string; comment: string }) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeProject
          ? {
              ...p,
              comments: [
                ...p.comments,
                { name: form.name, email: form.email, comment: form.comment, time: "just now" },
              ],
            }
          : p
      )
    );
    handleCloseModal();
  };

  const projectColors = [
    { bg: 'bg-gradient-to-br from-purple-50 to-blue-50', border: 'border-purple-200', title: 'text-purple-600', accent: 'bg-purple-100 text-purple-700' },
    { bg: 'bg-gradient-to-br from-emerald-50 to-teal-50', border: 'border-emerald-200', title: 'text-emerald-600', accent: 'bg-emerald-100 text-emerald-700' },
    { bg: 'bg-gradient-to-br from-orange-50 to-red-50', border: 'border-orange-200', title: 'text-orange-600', accent: 'bg-orange-100 text-orange-700' },
    { bg: 'bg-gradient-to-br from-cyan-50 to-blue-50', border: 'border-cyan-200', title: 'text-cyan-600', accent: 'bg-cyan-100 text-cyan-700' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <div className="container mx-auto py-12 flex-1 px-4">
        <h1 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</h1>
        <p className="text-center text-gray-600 mb-10">Explore our cybersecurity solutions</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              color={projectColors[idx % projectColors.length]}
              onAddComment={() => handleOpenModal(project.id)}
            />
          ))}
        </div>
        <CommentModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitComment}
        />
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white flex flex-col items-center mt-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-2">Ready to Collaborate?</h3>
          <p className="mb-6 text-center text-sm max-w-xl text-blue-100">
            Let's discuss your cybersecurity needs with our expertise that can help secure your organization.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl">Get In Touch</button>
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition shadow-lg hover:shadow-xl border-2 border-white/30">Download Resume</button>
          </div>
        </div>
      </div>
    </main>
  );
}