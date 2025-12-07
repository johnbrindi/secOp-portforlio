export default function Footer() {
	return (
		<footer className="py-10 px-6 border-t border-gray-800 mt-10">
			<div className="max-w-7xl mx-auto text-center text-gray-400 text-lg">
				<p>© 2025 CyberSec Portfolio. Built with Next.js & Tailwind CSS</p>
				<a
					href="/admin"
					className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
					tabIndex={-1}
					aria-label="Admin Dashboard"
				>
					Admin
				</a>
			</div>
		</footer>
	);
}
