import AdminTable from '../../components/admin/AdminTable';
import AdminBlogForm from '../../components/admin/AdminBlogForm';
import prisma from '../../../lib/prisma';

export default async function AdminBlogs() {
  const blogsData = await prisma.posts.findMany({
    orderBy: { created_at: 'desc' }
  });

  const blogs = blogsData.map((b: any) => ({
    id: b.id,
    title: b.title,
    excerpt: b.excerpt || '',
    content: b.content || '',
    category: b.category || '',
    tags: b.tags || [],
    image: b.image_url || '',
    likes: 0
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Blogs</h1>
      <AdminBlogForm submitLabel="Add Blog" />
      <div className="mt-8">
        <AdminTable columns={["title", "category", "tags", "excerpt"]} data={blogs} />
      </div>
    </div>
  );
}
