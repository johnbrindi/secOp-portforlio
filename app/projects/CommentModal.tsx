"use client";
import React, { useState } from "react";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: { name: string; email: string; comment: string }) => void;
}

export default function CommentModal({ open, onClose, onSubmit }: CommentModalProps) {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Comment</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
            setForm({ name: "", email: "", comment: "" });
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-2 p-2 border rounded"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-2 p-2 border rounded"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Your Comment"
            className="w-full mb-2 p-2 border rounded"
            required
            value={form.comment}
            onChange={e => setForm({ ...form, comment: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
