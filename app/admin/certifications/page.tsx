import AdminTable from '../../components/admin/AdminTable';
import AdminCertificationForm from '../../components/admin/AdminCertificationForm';
import { createClient } from '@/utils/supabase/server';

export default async function AdminCertifications() {
  const supabase = await createClient();
  const { data: certs } = await supabase.from('certifications').select('*').order('date_issued', { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Certifications</h1>
      {/* Form now handles submission via Server Action */}
      <AdminCertificationForm />
      <div className="mt-8">
        <AdminTable columns={["title", "issuer", "date_issued"]} data={certs || []} />
      </div>
    </div>
  );
}
