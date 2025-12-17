import AdminTable from '../../components/admin/AdminTable';
import AdminProjectForm from '../../components/admin/AdminProjectForm';
import { createClient } from '@/utils/supabase/server';

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Projects</h1>
      <AdminProjectForm />
      <div className="mt-8">
        <AdminTable columns={["title", "description", "tags"]} data={projects || []} />
      </div>
    </div>
  );
}
