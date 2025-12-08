import { Shield, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const routes = [
	{ name: 'About Me', path: '/about' },
	{ name: 'Projects', path: '/projects' },
	{ name: 'Blog', path: '/blog' },
	{ name: 'Certifications', path: '/certifications' },
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur-lg shadow-lg">
			<div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Shield className="w-10 h-10 text-cyan-400" />
					<span className="text-2xl md:text-3xl font-bold">SecOps M. JohnBrindi</span>
				</div>
				<div className="hidden md:flex gap-8">
					{routes.map((route) => (
						<a 
							key={route.path}
							href={route.path} 
							className="hover:text-cyan-400 text-lg md:text-xl font-medium transition-colors duration-300"
						>
							{route.name}
						</a>
					))}
				</div>
				<div className="flex gap-5 md:gap-5">
					<a href="https://github.com/johnbrindi/" className="hover:text-cyan-400 transition-colors">
						<Github className="w-7 h-7" />
					</a>
					<a href="https://www.linkedin.com/in/mazwewohjohnbrindi/" className="hover:text-cyan-400 transition-colors">
						<Linkedin className="w-7 h-7" />
					</a>
					<button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open Menu">
						{menuOpen ? <X className="w-8 h-8 text-cyan-400" /> : <Menu className="w-8 h-8 text-cyan-400" />}
					</button>
				</div>
			</div>
			{/* Mobile menu */}
			{menuOpen && (
				<div className="md:hidden bg-gray-900/95 backdrop-blur-lg shadow-lg px-6 py-4">
					<div className="flex flex-col gap-6">
						{routes.map((route) => (
							<a 
								key={route.path}
								href={route.path} 
								className="hover:text-cyan-400 text-lg font-medium transition-colors duration-300"
								onClick={() => setMenuOpen(false)}
							>
								{route.name}
							</a>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
