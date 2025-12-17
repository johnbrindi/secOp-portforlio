import AdminSkillsForm from '../../components/admin/AdminSkillsForm';
import { createClient } from '@/utils/supabase/server';

export default async function AdminSkills() {
  const supabase = await createClient();
  const { data: skillsData } = await supabase.from('skills').select('name');

  // Flatten for the form which expects a list of strings
  const skills = skillsData?.map(s => s.name) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Update Core Skills & Expertise</h1>
      <AdminSkillsForm initialData={{ skills }} />
    </div>
  );
}
