"use client";

import dummyBlogs from "../dummyBlogs";
import { useState } from "react";
import { Heart, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = dummyBlogs.find(b => String(b.id) === params.id);
  const [comments, setComments] = useState<{ name: string; email: string; comment: string; time: string }[]>([]);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", comment: "" });
  const [likeCount, setLikeCount] = useState(blog ? (blog.likes || 0) : 0);

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.comment.trim()) return;
    setComments([...comments, { ...commentForm, time: "just now" }]);
    setCommentForm({ name: "", email: "", comment: "" });
  }

  function handleLike() {
    setLikeCount(likeCount + 1);
  }

  function handleShare(platform: string) {
    if (!blog) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Check out this article: ${blog.title}`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }

  if (!blog) return <div className="text-center text-cyan-400 mt-20">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="rounded-2xl w-full max-h-96 object-cover mb-6" />
          )}
          <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
            {blog.category}
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
            <span>{blog.tags?.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 mx-1">{tag}</span>
            ))}</span>
          </div>
          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          <button onClick={handleLike} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105">
            <Heart className="w-5 h-5" /> Like ({likeCount})
          </button>
          <button onClick={() => handleShare('facebook')} className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('twitter')} className="p-3 bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('linkedin')} className="p-3 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors">
            <Linkedin className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((c, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-cyan-400">{c.name}</span>
                  <span className="text-sm text-gray-400">{c.email}</span>
                  <span className="text-sm text-gray-400">{c.time}</span>
                </div>
                <p className="text-gray-300">{c.comment}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddComment} className="space-y-4 p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full max-w-2xl mx-auto mt-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Add a Comment</h3>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={commentForm.name}
              onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={commentForm.email}
              onChange={e => setCommentForm({ ...commentForm, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <textarea
              name="comment"
              placeholder="Your Comment"
              value={commentForm.comment}
              onChange={e => setCommentForm({ ...commentForm, comment: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              required
            />
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}