"use client";
import React, { useState } from 'react';

const categories = [
  'Web Security',
  'Network Security',
  'Malware Analysis',
  'Pentesting',
  'Cloud Security',
  'CTF Writeups',
];

export default function AdminBlogForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Publish Post',
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || categories[0],
    tags: initialData?.tags?.join(', ') || '',
    image: initialData?.image || '',
    imageFile: null,
    featured: initialData?.featured || false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type, checked, files } = e.target as any;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, just pass the form data. You can handle image upload logic in the parent.
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">{submitLabel}</h2>
      <input
        name="title"
        type="text"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="excerpt"
        placeholder="Excerpt (short description)"
        value={form.excerpt}
        onChange={handleChange}
        rows={2}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <textarea
        name="content"
        placeholder="Full content (supports line breaks)"
        value={form.content}
        onChange={handleChange}
        rows={10}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        name="tags"
        type="text"
        placeholder="Relevant tags (comma separated: SIEM, Threat Intel, Web Dev, Python, CTF, SOC, Red Team, Blue Team)"
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
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          name="featured"
          type="checkbox"
          checked={form.featured}
          onChange={handleChange}
          className="w-5 h-5"
        />
        <span className="text-gray-300">Feature this post</span>
      </label>
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
