"use client";
import BlogCard from "../components/BlogCard" 
import dummyBlogs from "./dummyBlogs";
import { useRouter } from "next/navigation";

import { useState } from "react";

const categories = ['All', 'Web Security', 'Network Security', 'Malware Analysis', 'Pentesting', 'Cloud Security', 'CTF Writeups'];

export default function BlogListPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = selectedCategory === 'All'
    ? dummyBlogs
    : dummyBlogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Blog</h1>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={{ ...blog, id: String(blog.id) }}
            onClick={() => router.push(`/blog/${blog.id}`)}
          />
        ))}
      </div>
    </div>
  );
}