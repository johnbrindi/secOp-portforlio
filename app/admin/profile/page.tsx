import AdminProfileForm from '../../components/admin/AdminProfileForm';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProfile() {
  const profileData = await prisma.profiles.findFirst({
    orderBy: { updated_at: 'desc' }
  });

  const profile = profileData ? {
    id: profileData.id,
    name: profileData.name || '',
    title: profileData.title || '',
    bio: profileData.bio || '',
    image: profileData.image_url || ''
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Edit Profile</h1>
      <AdminProfileForm initialData={profile || undefined} submitLabel="Update Profile" />
    </div>
  );
}
