"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminBlogForm from '../../components/admin/AdminBlogForm';
import { useState, useEffect } from 'react';

export default function AdminBlogs() {
  type Blog = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    image: string;
    likes?: number;
  };
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  async function handleAddBlog(data: Blog) {
    setLoading(true);
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        tags: data.tags,
        image: data.image || '',
      })
    });
    const newBlog = await res.json();
    setBlogs([newBlog, ...blogs]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Blogs</h1>
      <AdminBlogForm onSubmit={handleAddBlog} submitLabel={loading ? 'Adding...' : 'Add Blog'} />
      <div className="mt-8">
        <AdminTable columns={["title", "category", "tags", "excerpt"]} data={blogs} />
      </div>
    </div>
  );
}
