"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminProjectForm from '../../components/admin/AdminProjectForm';
import { useState, useEffect } from 'react';

export default function AdminProjects() {
  type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
  };
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  async function handleAddProject(data: Project) {
    setLoading(true);
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const newProject = await res.json();
    setProjects([newProject, ...projects]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Projects</h1>
      <AdminProjectForm onSubmit={handleAddProject} submitLabel={loading ? 'Adding...' : 'Add Project'} />
      <div className="mt-8">
        <AdminTable columns={["title", "description", "tags"]} data={projects} />
      </div>
    </div>
  );
}
