import React from 'react';

export default function AdminForm({ children, onSubmit, title }: { children: React.ReactNode; onSubmit: (e: React.FormEvent) => void; title?: string }) {
  return (
    <form onSubmit={onSubmit} className="admin-form space-y-4 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      {title && <h2 className="text-xl font-bold mb-2 text-cyan-400">{title}</h2>}
      {children}
      <button type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-semibold transition-colors">Save</button>
    </form>
  );
}
