
import Link from 'next/link';


export default function AdminDashboard() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 rounded-xl shadow-lg">
			<h1 className="text-3xl font-extrabold mb-8 text-cyan-400 drop-shadow">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
				<Link href="/admin/blogs" className="block p-6 rounded-lg bg-gray-800 hover:bg-cyan-900 transition-colors border border-gray-700 shadow text-lg font-semibold text-cyan-300 hover:text-white">Manage Blogs</Link>
				<Link href="/admin/projects" className="block p-6 rounded-lg bg-gray-800 hover:bg-cyan-900 transition-colors border border-gray-700 shadow text-lg font-semibold text-cyan-300 hover:text-white">Manage Projects</Link>
				<Link href="/admin/certifications" className="block p-6 rounded-lg bg-gray-800 hover:bg-cyan-900 transition-colors border border-gray-700 shadow text-lg font-semibold text-cyan-300 hover:text-white">Manage Certifications</Link>
				<Link href="/admin/profile" className="block p-6 rounded-lg bg-gray-800 hover:bg-cyan-900 transition-colors border border-gray-700 shadow text-lg font-semibold text-cyan-300 hover:text-white">Edit Profile</Link>
				<Link href="/admin/skills" className="block p-6 rounded-lg bg-gray-800 hover:bg-cyan-900 transition-colors border border-gray-700 shadow text-lg font-semibold text-cyan-300 hover:text-white">Update Skills & Expertise</Link>
			</div>
		</div>
	);
}