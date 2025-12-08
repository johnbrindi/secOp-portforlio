import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}
