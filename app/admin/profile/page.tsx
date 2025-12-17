import AdminProfileForm from '../../components/admin/AdminProfileForm';
import { createClient } from '@/utils/supabase/server';

export default async function AdminProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Edit Profile</h1>
      <AdminProfileForm initialData={profile} />
    </div>
  );
}
