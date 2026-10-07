"use client";
import React, { useState } from 'react';
import { createSkill } from '@/app/actions/skill';

type AdminSkillsFormProps = {
  initialData?: {
    skills?: string[];
  };
  onCancel?: () => void;
  onSubmit?: (formData: FormData) => Promise<void>;
  submitLabel?: string;
};

export default function AdminSkillsForm({
  initialData,
  onCancel,
  onSubmit,
  submitLabel = 'Update Skills & Expertise',
}: AdminSkillsFormProps) {
  const [skills, setSkills] = useState(initialData?.skills?.join(', ') || '');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('skills', skills);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await createSkill(formData);
      }

      setStatus({ type: 'success', text: 'Skills updated successfully.' });
      setSkills('');
    } catch (error: any) {
      setStatus({ type: 'error', text: error?.message || 'Failed to update skills.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{submitLabel}</h2>
      {status && (
        <div className={`rounded-xl border px-4 py-3 ${status.type === 'success' ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-rose-400/30 bg-rose-500/10 text-rose-100'}`} role="status">
          {status.text}
        </div>
      )}
      <textarea
        name="skills"
        placeholder="List your skills, separated by commas (e.g. SIEM, Python, Threat Hunting, Web Dev)"
        value={skills}
        onChange={e => setSkills(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:cursor-not-allowed disabled:opacity-60"
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
