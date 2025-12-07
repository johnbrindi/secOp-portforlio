import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar p-6 border-r border-gray-800 min-h-screen w-56 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <nav className="flex flex-col gap-4">
        <Link href="/admin" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Dashboard</Link>
        <Link href="/admin/blogs" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Blogs</Link>
        <Link href="/admin/projects" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Projects</Link>
        <Link href="/admin/certifications" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Certifications</Link>
        <Link href="/admin/profile" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Profile</Link>
        <Link href="/admin/skills" className="px-3 py-2 rounded text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors font-medium">Skills</Link>
      </nav>
    </aside>
  );
}
