"use client";
import AdminSkillsForm from '../../components/admin/AdminSkillsForm';
import { useState, useEffect } from 'react';

export default function AdminSkills() {
  const [skills, setSkills] = useState<string[]>([]);


  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(setSkills);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Update Core Skills & Expertise</h1>
      <AdminSkillsForm initialData={{ skills }} submitLabel="Update Skills & Expertise" />
    </div>
  );
}
