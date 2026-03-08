"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminCertificationForm from '../../components/admin/AdminCertificationForm';
import { useState, useEffect } from 'react';

export default function AdminCertifications() {
  type Certification = {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    link: string;
    image: string;
  };
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(setCerts);
  }, []);

  async function handleAddCert(data: Certification) {
    setLoading(true);
    const res = await fetch('/api/certifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const newCert = await res.json();
    setCerts([newCert, ...certs]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Certifications</h1>
      <AdminCertificationForm onSubmit={handleAddCert} submitLabel={loading ? 'Adding...' : 'Add Certification'} />
      <div className="mt-8">
        <AdminTable columns={["title", "issuer", "date"]} data={certs} />
      </div>
    </div>
  );
}
