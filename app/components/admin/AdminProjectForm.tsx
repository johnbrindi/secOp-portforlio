"use client";
import React, { useState } from 'react';
import { createProject } from '@/app/actions/project';

export default function AdminProjectForm({
  initialData,
  onSubmit, // Deprecated
  onCancel,
  submitLabel = 'Add Project',
}: {
  initialData?: any;
  onSubmit?: any;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    imageFile: null as File | null,
    tags: initialData?.tags?.join(', ') || '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('tags', form.tags);
    formData.append('image', form.image);
    if (form.imageFile) {
      formData.append('imageFile', form.imageFile);
    }

    try {
      await createProject(formData);
      alert('Project created successfully!');

      if (!initialData) {
        setForm({
          title: '',
          description: '',
          image: '',
          imageFile: null,
          tags: '',
        });
      }
    } catch (error: any) {
      alert('Failed to create project: ' + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{submitLabel}</h2>
      <input
        name="title"
        type="text"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <input
        name="tags"
        type="text"
        placeholder="Relevant tags (comma separated: SIEM, SOC, Python, Threat Intel)"
        value={form.tags}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        autoComplete="off"
      />
      <div>
        <label className="block text-gray-300 mb-2">Upload Image</label>
        <input
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-gray-300"
        />
        {form.image && (
          <img src={form.image} alt="Preview" className="mt-2 rounded-lg max-h-40" />
        )}
      </div>
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
