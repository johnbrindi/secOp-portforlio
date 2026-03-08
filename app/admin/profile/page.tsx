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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(setProfile);
  }, []);

  async function handleProfileUpdate(data: Profile) {
    setLoading(true);
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const updated = await res.json();
    setProfile(updated);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Edit Profile</h1>
      <AdminProfileForm onSubmit={handleProfileUpdate} initialData={profile} submitLabel={loading ? 'Updating...' : 'Update Profile'} />
    </div>
  );
}
