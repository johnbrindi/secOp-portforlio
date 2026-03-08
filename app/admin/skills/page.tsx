"use client";
import AdminSkillsForm from '../../components/admin/AdminSkillsForm';
import { useState, useEffect } from 'react';

export default function AdminSkills() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(setSkills);
  }, []);

  async function handleSkillsUpdate(skillsArr: string[]) {
    setLoading(true);
    // For simplicity, just add new skills (no update/delete logic)
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: skillsArr.join(', ') })
    });
    const newSkill = await res.json();
    setSkills([newSkill, ...skills]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Update Core Skills & Expertise</h1>
      <AdminSkillsForm onSubmit={handleSkillsUpdate} initialData={{ skills }} submitLabel={loading ? 'Updating...' : 'Update Skills & Expertise'} />
    </div>
  );
}
