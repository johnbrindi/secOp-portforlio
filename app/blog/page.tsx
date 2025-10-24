'use client';

import { useState, useEffect } from 'react';
import { Shield, Search, Tag, Calendar, Clock, ArrowRight, Github, Linkedin, ChevronLeft, TrendingUp, Heart, MessageCircle, Share2, Edit, Trash2, Plus, X, Facebook, Twitter } from 'lucide-react';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');

  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Web Security',
    tags: '',
    image: '',
    featured: false
  });

  const categories = ['All', 'Web Security', 'Network Security', 'Malware Analysis', 'Pentesting', 'Cloud Security', 'CTF Writeups'];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const result = await window.storage.list('blog:post:', true);
      if (result && result.keys) {
        const loadedPosts = await Promise.all(
          result.keys.map(async (key) => {
            const postData = await window.storage.get(key, true);
            return postData ? JSON.parse(postData.value) : null;
          })
        );
        setPosts(loadedPosts.filter(p => p !== null).sort((a, b) => new Date(b.date) - new Date(a.date)));
      }
    } catch (error) {
      console.log('No posts found yet');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const savePost = async () => {
    const post = {
      id: editingPost?.id || Date.now().toString(),
      ...newPost,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(t => t),
      date: editingPost?.date || new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min`,
      likes: editingPost?.likes || 0,
      comments: editingPost?.comments || []
    };

    try {
      await window.storage.set(`blog:post:${post.id}`, JSON.stringify(post), true);
      await loadPosts();
      setShowEditor(false);
      setEditingPost(null);
      setNewPost({ title: '', excerpt: '', content: '', category: 'Web Security', tags: '', image: '', featured: false });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  };

  const deletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await window.storage.delete(`blog:post:${postId}`, true);
        await loadPosts();
        if (selectedPost?.id === postId) setSelectedPost(null);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const likePost = async (post) => {
    const updatedPost = { ...post, likes: post.likes + 1 };
    try {
      await window.storage.set(`blog:post:${post.id}`, JSON.stringify(updatedPost), true);
      await loadPosts();
      if (selectedPost?.id === post.id) setSelectedPost(updatedPost);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const addComment = async () => {
    if (!commentText.trim() || !commenterName.trim()) return;

    const updatedPost = {
      ...selectedPost,
      comments: [
        ...(selectedPost.comments || []),
        {
          id: Date.now().toString(),
          name: commenterName,
          text: commentText,
          date: new Date().toISOString()
        }
      ]
    };

    try {
      await window.storage.set(`blog:post:${selectedPost.id}`, JSON.stringify(updatedPost), true);
      await loadPosts();
      setSelectedPost(updatedPost);
      setCommentText('');
      setCommenterName('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const sharePost = (post, platform) => {
    const url = `${window.location.origin}/blog#${post.id}`;
    const text = `Check out this article: ${post.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find(post => post.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <p className="text-xl">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-lg shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Blog</span>
            </button>
            <div className="flex gap-4">
              <a href="https://github.com/johnbrindi/" className="hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mazwewohjohnbrindi/" className="hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>

        <article className="pt-24 pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
                {selectedPost.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">{selectedPost.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {selectedPost.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {selectedPost.likes} likes
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {selectedPost.comments?.length || 0} comments
              </span>
            </div>

            {selectedPost.image && (
              <div className="rounded-2xl overflow-hidden mb-8">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPost.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-b border-gray-700 py-6 mb-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => likePost(selectedPost)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5" />
                  Like ({selectedPost.likes})
                </button>

                <div className="flex gap-3">
                  <button onClick={() => sharePost(selectedPost, 'facebook')} className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button onClick={() => sharePost(selectedPost, 'twitter')} className="p-3 bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button onClick={() => sharePost(selectedPost, 'linkedin')} className="p-3 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button onClick={() => sharePost(selectedPost, 'whatsapp')} className="p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                Comments ({selectedPost.comments?.length || 0})
              </h2>

              <div className="mb-8 space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <textarea
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
                <button
                  onClick={addComment}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Post Comment
                </button>
              </div>

              <div className="space-y-4">
                {selectedPost.comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-cyan-400">{comment.name}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  if (showEditor) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
              <button onClick={() => { setShowEditor(false); setEditingPost(null); }} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <textarea
                placeholder="Excerpt (short description)"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                rows="2"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />

              <textarea
                placeholder="Full content (supports line breaks)"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows="12"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />

              <select
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Tags (comma separated: SQLi, Python, IDS)"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newPost.image}
                onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.featured}
                  onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                  className="w-5 h-5"
                />
                <span>Feature this post</span>
              </label>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={savePost}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </button>
                <button
                  onClick={() => { setShowEditor(false); setEditingPost(null); }}
                  className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChevronLeft className="w-5 h-5" />
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold hidden sm:inline">SecOps M. JohnBrindi</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition-colors"
            >
              {isAdmin ? '👤 Reader Mode' : '✏️ Admin Mode'}
            </button>
            <a href="https://github.com/johnbrindi/" className="hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mazwewohjohnbrindi/" className="hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/50 mb-6">
              <span className="text-cyan-400 text-sm font-semibold">📝 Security Blog & Writeups</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Insights from the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Cyber Frontline</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Sharing knowledge, writeups, and research on cybersecurity, penetration testing, and defensive strategies.
            </p>
          </div>

          {isAdmin && (
            <div className="text-center">
              <button
                onClick={() => setShowEditor(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Create New Post
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {categories.map((category) => (
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
          </div>
        </div>
      </section>

      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full overflow-hidden">
                  {featuredPost.image && (
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {featuredPost.likes}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  {isAdmin && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => {
                          setEditingPost(featuredPost);
                          setNewPost({
                            title: featuredPost.title,
                            excerpt: featuredPost.excerpt,
                            content: featuredPost.content,
                            category: featuredPost.category,
                            tags: featuredPost.tags.join(', '),
                            image: featuredPost.image,
                            featured: featuredPost.featured
                          });
                          setShowEditor(true);
                        }}
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deletePost(featuredPost.id)}
                        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedPost(featuredPost)}
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-4 transition-all"
                  >
                    Read Full Article <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Articles'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">No articles published yet.</p>
              {isAdmin && (
                <button
                  onClick={() => setShowEditor(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-700">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Shield className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/30">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {isAdmin && (
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setNewPost({
                              title: post.title,
                              excerpt: post.excerpt,
                              content: post.content,
                              category: post.category,
                              tags: post.tags.join(', '),
                              image: post.image,
                              featured: post.featured
                            });
                            setShowEditor(true);
                          }}
                          className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="px-3 py-1 bg-red-600 rounded text-xs hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-cyan-400 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Get the latest security insights and writeups delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 CyberSec Portfolio. Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}