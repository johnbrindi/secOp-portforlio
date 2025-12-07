"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminBlogForm from '../../components/admin/AdminBlogForm';
import { useState } from 'react';

export default function AdminBlogs() {
  // Placeholder state for blogs
  const [blogs, setBlogs] = useState<any[]>([]);


  function handleAddBlog(data: any) {
    // Add blog logic here (handle image upload, etc.)
    // For now, just add to local state
    setBlogs([...blogs, {
      ...data,
      tags: data.tags.split(',').map((t: string) => t.trim()),
      image: data.image || (data.imageFile ? URL.createObjectURL(data.imageFile) : ''),
    }]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Blogs</h1>
      <AdminBlogForm onSubmit={handleAddBlog} submitLabel="Add Blog" />
      <div className="mt-8">
        <AdminTable columns={["title", "category", "tags", "excerpt"]} data={blogs} />
      </div>
    </div>
  );
}
