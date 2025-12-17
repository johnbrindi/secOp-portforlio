import AdminTable from '../../components/admin/AdminTable';
import AdminBlogForm from '../../components/admin/AdminBlogForm';
import { createClient } from '@/utils/supabase/server';

export default async function AdminBlogs() {
  const supabase = await createClient();
  const { data: blogs } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Blogs</h1>
      {/* We don't pass onSubmit anymore, the form handles it via Server Action */}
      <AdminBlogForm />
      <div className="mt-8">
        <AdminTable columns={["title", "category", "tags", "excerpt"]} data={blogs || []} />
      </div>
    </div>
  );
}
