import React from "react";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  tags?: string[];
};

type BlogCardProps = {
  blog: Blog;
  onClick: () => void;
};

export default function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 cursor-pointer hover:bg-cyan-900 transition-colors flex flex-col justify-between min-h-[220px]"
      onClick={onClick}
    >
      <div>
        <h2 className="text-xl font-bold text-cyan-400 mb-2">{blog.title}</h2>
        <p className="text-gray-300 mb-2 whitespace-pre-line">{blog.excerpt}</p>
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="rounded-lg w-full max-h-40 object-cover mb-2" />
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-400">{blog.category}</span>
        <span className="text-sm text-gray-400">{blog.tags?.join(', ')}</span>
      </div>
    </div>
  );
}
