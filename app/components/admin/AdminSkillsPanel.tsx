"use client";

import React, { useState } from 'react';
import AdminSkillsForm from './AdminSkillsForm';

export default function AdminSkillsPanel({ skills }: { skills: string[] }) {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        body: JSON.stringify({ skills: formData.get('skills')?.toString() ?? '' }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Failed to update skills.');
      }

      setMessage({ type: 'success', text: 'Skills updated successfully.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.message || 'Failed to update skills.' });
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className={`rounded-xl border px-4 py-3 ${message.type === 'success' ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-rose-400/30 bg-rose-500/10 text-rose-100'}`}>
          {message.text}
        </div>
      )}
      <AdminSkillsForm onSubmit={handleSubmit} initialData={{ skills }} />
    </div>
  );
}
