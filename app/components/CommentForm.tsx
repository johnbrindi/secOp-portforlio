"use client";

import React from "react";

type CommentFormProps = {
  onSubmit: (form: { name: string; comment: string }) => void;
};

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [form, setForm] = React.useState({ name: "", comment: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (form.name && form.comment) {
      onSubmit(form);
      setForm({ name: "", comment: "" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 w-full max-w-2xl space-y-4 rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-lg"
    >
      <h3 className="mb-2 text-xl font-bold text-cyan-400">Add a Comment</h3>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-lg bg-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="comment"
        placeholder="Your Comment"
        value={form.comment}
        onChange={handleChange}
        rows={3}
        className="w-full resize-none rounded-lg bg-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50"
      >
        Post Comment
      </button>
    </form>
  );
}
