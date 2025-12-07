"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminProjectForm from '../../components/admin/AdminProjectForm';
import { useState } from 'react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  function handleAddProject(data: any) {
    setProjects([...projects, data]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Projects</h1>
      <AdminProjectForm onSubmit={handleAddProject} submitLabel="Add Project" />
      <div className="mt-8">
        <AdminTable columns={["title", "description", "tags"]} data={projects} />
      </div>
    </div>
  );
}
