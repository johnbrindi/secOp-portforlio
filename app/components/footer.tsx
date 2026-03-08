import { Github, Linkedin, Shield } from "lucide-react";
import Link from "next/link";

const links = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className="container py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span
              className="font-display font-semibold tracking-tight"
              style={{ fontSize: "var(--step-1)" }}
            >
              JohnBrindi
              <span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </div>
          <p
            className="text-small"
            style={{ color: "var(--text-muted)", maxWidth: "28ch" }}
          >
            SOC Analyst · Network Admin · Security Researcher
          </p>
        </div>

        {/* Nav — pure CSS hover via Tailwind group/peer or transition classes */}
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-small font-medium transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Socials + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-2">
            <a
              href="https://github.com/johnbrindi/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                background: "var(--surface-2)",
              }}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mazwewohjohnbrindi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                background: "var(--surface-2)",
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-small" style={{ color: "var(--text-dim)" }}>
            © {year} Mazweoh John Brindi N.
          </p>
        </div>
      </div>
    </footer>
  );
}
