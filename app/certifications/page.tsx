import CertificationCard from './CertificationCard';
import certificationsData from './certificationsData';

export default function CertificationsPage() {
  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Certifications</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificationsData.map(cert => (
          <CertificationCard key={cert.id} {...cert} />
        ))}
      </div>
    </main>
  );
}
