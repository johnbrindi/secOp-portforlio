import AdminTable from '../../components/admin/AdminTable';
import AdminProjectForm from '../../components/admin/AdminProjectForm';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProjects() {
  const projectsData = await prisma.projects.findMany({
    orderBy: { created_at: 'desc' }
  });

  const projects = projectsData.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description || '',
    image: p.image_url || '',
    tags: p.tags || []
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Projects</h1>
      <AdminProjectForm submitLabel="Add Project" />
      <div className="mt-8">
        <AdminTable columns={["title", "description", "tags"]} data={projects} />
      </div>
    </div>
  );
}
