"use client";
import AdminProfileForm from '../../components/admin/AdminProfileForm';

export default function AdminProfile() {
  function handleProfileUpdate(data: any) {
    // Update profile logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Edit Profile</h1>
      <AdminProfileForm onSubmit={handleProfileUpdate} submitLabel="Update Profile" />
    </div>
  );
}
