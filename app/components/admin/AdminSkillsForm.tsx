"use client";
import React, { useState } from 'react';
import { createSkill } from '@/app/actions/skill';

export default function AdminSkillsForm({
  initialData,
  onSubmit, // Deprecated
  onCancel,
  submitLabel = 'Update Skills & Expertise',
}: {
  initialData?: any;
  onSubmit?: any;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [skills, setSkills] = useState(initialData?.skills?.join(', ') || '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('skills', skills);

    await createSkill(formData);

    // Optionally clear or keep the list. 
    // Usually "Update" implies keeping it, but "Add" passes new ones.
    // The server action appends. Let's clear to indicate success? 
    // Or keep it to show current state? 
    // The previous implementation added new skills. 
    // Let's clear it so user can add more.
    setSkills('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{submitLabel}</h2>
      <textarea
        name="skills"
        placeholder="List your skills, separated by commas (e.g. SIEM, Python, Threat Hunting, Web Dev)"
        value={skills}
        onChange={e => setSkills(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
