"use client";
import React, { useState } from 'react';

export default function AdminProfileForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Update Profile',
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    title: initialData?.title || '',
    bio: initialData?.bio || '',
    image: initialData?.image || '',
    imageFile: null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      image: form.image || (form.imageFile ? URL.createObjectURL(form.imageFile) : ''),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{submitLabel}</h2>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <input
        name="title"
        type="text"
        placeholder="Professional Title (e.g. Cybersecurity Analyst, Web Developer)"
        value={form.title}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="bio"
        placeholder="Short Bio / About You"
        value={form.bio}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <div>
        <label className="block text-gray-300 mb-2">Profile Image</label>
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
