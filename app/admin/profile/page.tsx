"use client";
import AdminProfileForm from '../../components/admin/AdminProfileForm';
import { useState, useEffect } from 'react';

export default function AdminProfile() {
  type Profile = {
    id: string;
    name: string;
    title: string;
    bio: string;
    image: string;
  };
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(setProfile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Edit Profile</h1>
      <AdminProfileForm initialData={profile || undefined} submitLabel="Update Profile" />
    </div>
  );
}
