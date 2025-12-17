import React from "react";

type CommentFormProps = {
  onSubmit: (form: { name: string; comment: string }) => void;
};

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [form, setForm] = React.useState({ name: "", comment: "" });

  function handleChange(e: { target: { name: any; value: any; }; }) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (form.name && form.comment) {
      onSubmit(form);
      setForm({ name: "", comment: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto mt-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">Add a Comment</h3>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <textarea
        name="comment"
        placeholder="Your Comment"
        value={form.comment}
        onChange={handleChange}
        rows={3}
        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
        required
      />
      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
      >
        Post Comment
      </button>
    </form>
  );
}
