"use client";
import AdminSkillsForm from '../../components/admin/AdminSkillsForm';

export default function AdminSkills() {
  function handleSkillsUpdate(skills: string[]) {
    // Update skills logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Update Core Skills & Expertise</h1>
      <AdminSkillsForm onSubmit={handleSkillsUpdate} submitLabel="Update Skills & Expertise" />
    </div>
  );
}
