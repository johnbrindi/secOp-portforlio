"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import AdminCertificationForm from './AdminCertificationForm';
import AdminTable from './AdminTable';

export type CertificationRow = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
  image: string;
};

async function sendCertificationRequest(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const errorMessage = payload?.error || response.statusText || 'Request failed.';
    throw new Error(errorMessage);
  }

  return response.json();
}

export default function AdminCertificationPanel({ certifications }: { certifications: CertificationRow[] }) {
  const router = useRouter();
  const [selectedCertification, setSelectedCertification] = useState<CertificationRow | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = () => startTransition(() => router.refresh());

  async function handleSubmit(formData: FormData) {
    const body = {
      title: formData.get('title')?.toString() ?? '',
      issuer: formData.get('issuer')?.toString() ?? '',
      date: formData.get('date')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      link: formData.get('link')?.toString() ?? '',
      image: formData.get('image')?.toString() ?? '',
    };

    try {
      if (selectedCertification) {
        await sendCertificationRequest(`/api/certifications/${selectedCertification.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        setMessage({ type: 'success', text: 'Certification updated successfully.' });
        setSelectedCertification(null);
      } else {
        await sendCertificationRequest('/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        setMessage({ type: 'success', text: 'Certification added successfully.' });
      }

      refresh();
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.message || 'Unable to save certification.' });
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this certification permanently?')) {
      return;
    }

    try {
      await sendCertificationRequest(`/api/certifications/${id}`, {
        method: 'DELETE',
      });
      setSelectedCertification(null);
      setMessage({ type: 'success', text: 'Certification deleted successfully.' });
      refresh();
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.message || 'Unable to delete certification.' });
    }
  }

  function handleEdit(row: CertificationRow) {
    setSelectedCertification(row);
    setMessage(null);
  }

  function handleCancel() {
    setSelectedCertification(null);
    setMessage(null);
  }

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`rounded-xl border px-4 py-3 ${
            message.type === 'success'
              ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
              : 'border-rose-400/30 bg-rose-500/10 text-rose-100'
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      <AdminCertificationForm
        key={selectedCertification?.id ?? 'new'}
        initialData={selectedCertification ?? undefined}
        submitLabel={selectedCertification ? 'Update Certification' : 'Add Certification'}
        onSubmit={handleSubmit}
        onCancel={selectedCertification ? handleCancel : undefined}
      />

      <div className="mt-6">
        <AdminTable
          columns={["title", "issuer", "date"]}
          data={certifications}
          actions={(row) => (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleEdit(row as CertificationRow)}
                className="rounded-lg px-3 py-2 bg-slate-800 text-sm font-medium text-cyan-200 hover:bg-slate-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDelete(String(row.id))}
                className="rounded-lg px-3 py-2 bg-rose-600 text-sm font-medium text-white hover:bg-rose-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
