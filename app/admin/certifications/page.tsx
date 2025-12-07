"use client";
import AdminTable from '../../components/admin/AdminTable';
import AdminCertificationForm from '../../components/admin/AdminCertificationForm';
import { useState } from 'react';

export default function AdminCertifications() {
  const [certs, setCerts] = useState<any[]>([]);

  function handleAddCert(data: any) {
    setCerts([...certs, data]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-cyan-400">Manage Certifications</h1>
      <AdminCertificationForm onSubmit={handleAddCert} submitLabel="Add Certification" />
      <div className="mt-8">
        <AdminTable columns={["title", "issuer", "date"]} data={certs} />
      </div>
    </div>
  );
}
