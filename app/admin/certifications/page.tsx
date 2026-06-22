import AdminTable from '../../components/admin/AdminTable';
import AdminCertificationForm from '../../components/admin/AdminCertificationForm';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminCertifications() {
  const certsData = await prisma.certifications.findMany({
    orderBy: { created_at: 'desc' }
  });

  const certs = certsData.map((c: any) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer || '',
    date: c.date_issued || '',
    description: c.description || '',
    link: c.link || '',
    image: c.image_url || ''
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Certifications</h1>
      <AdminCertificationForm submitLabel="Add Certification" />
      <div className="mt-8">
        <AdminTable columns={["title", "issuer", "date"]} data={certs} />
      </div>
    </div>
  );
}
