"use client";

import { useState, useEffect } from "react";
import { Shield, Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";

const routes = [
	{ name: "About", path: "/about" },
	{ name: "Projects", path: "/projects" },
	{ name: "Blog", path: "/blog" },
	{ name: "Lab", path: "/lab" },
	{ name: "Achievements", path: "/achievements" },
	{ name: "Certifications", path: "/certifications" },
	{ name: "Contact", path: "/contact" },
];

// Ticker items — Latest Activity strip inside the navbar
const TICKER_ITEMS = [
	{ icon: "●", color: "#6e8efb", text: "Actively researching web app pentesting techniques" },
	{ icon: "●", color: "#a777e3", text: "New blog post: SIEM tuning for SOC teams" },
	{ icon: "●", color: "#6e8efb", text: "DVWA lab — SQL Injection & CSRF modules complete" },
	{ icon: "●", color: "#4ade80", text: "Available for security consulting engagements" },
	{ icon: "●", color: "#a777e3", text: "CTF Write-up: Web Exploitation Challenge published" },
	{ icon: "●", color: "#4ade80", text: "Cybersecurity Lead — DevFest Bamenda 2025" },
];

const DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	return (
		<header
			className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
					? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]"
					: "bg-transparent"
				}`}
		>
			{/* ── Ticker Strip ────────────────────────────────── */}
			<div
				className="border-b border-[var(--border)] overflow-hidden"
				style={{ height: "32px" }}
			>
				<div className="ticker-track h-full flex items-center">
					{DOUBLED.map((item, i) => (
						<span
							key={i}
							className="flex items-center gap-2 px-8 whitespace-nowrap text-small text-[var(--text-muted)]"
						>
							<span style={{ color: item.color, fontSize: "8px" }}>●</span>
							{item.text}
						</span>
					))}
				</div>
			</div>

			{/* ── Main Nav Row ────────────────────────────────── */}
			<div className="container flex items-center justify-between py-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_16px_var(--accent-glow)] transition-shadow duration-300">
						<Shield className="w-4 h-4 text-white" />
					</div>
					<span className="font-display font-semibold text-[var(--step-1)] tracking-tight">
						JohnBrindi<span className="text-[var(--accent)]">.</span>
					</span>
				</Link>

				{/* Desktop links */}
				<nav className="hidden lg:flex items-center gap-1">
					{routes.map((r) => (
						<Link
							key={r.path}
							href={r.path}
							className="px-3 py-2 rounded-md text-[var(--step--1)] text-[var(--text-muted)] font-medium hover:text-[var(--text)] hover:bg-[var(--surface-3)] transition-all duration-200 tracking-wide"
						>
							{r.name}
						</Link>
					))}
				</nav>

				{/* Right actions */}
				<div className="flex items-center gap-3">
					<a
						href="https://github.com/johnbrindi/"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="w-9 h-9 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] transition-all duration-200"
					>
						<Github className="w-5 h-5" />
					</a>
					<a
						href="https://www.linkedin.com/in/mazwewohjohnbrindi/"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
						className="w-9 h-9 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-3)] transition-all duration-200"
					>
						<Linkedin className="w-5 h-5" />
					</a>

					{/* Mobile hamburger */}
					<button
						className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-3)] transition-colors"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
					>
						{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* ── Mobile Menu ─────────────────────────────────── */}
			{menuOpen && (
				<div className="lg:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
					<nav className="container py-4 flex flex-col gap-1">
						{routes.map((r) => (
							<Link
								key={r.path}
								href={r.path}
								onClick={() => setMenuOpen(false)}
								className="px-4 py-3 rounded-md text-[var(--step-0)] text-[var(--text-muted)] font-medium hover:text-[var(--text)] hover:bg-[var(--surface-3)] transition-all duration-200"
							>
								{r.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
