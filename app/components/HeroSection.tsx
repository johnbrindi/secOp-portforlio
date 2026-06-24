import { Shield, Terminal, ArrowRight, Download, Network } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center section pt-[7rem]">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ──────────────────────────────── */}
          <div className="space-y-8 max-w-2xl">

            {/* Status pill */}
            <div className="animate-fade-up animate-fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-hi)] bg-[var(--surface-2)]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-label tracking-[.16em]">Open to opportunities</span>
            </div>

            {/* Headline */}
            <h1 className="text-display animate-fade-up animate-fade-up-2">
              Security researcher.<br />
              <span className="gradient-text">Threat hunter.</span><br />
              Human first.
            </h1>

            {/* Sub-copy */}
            <p
              className="animate-fade-up animate-fade-up-3"
              style={{
                fontSize: "var(--step-1)",
                color: "var(--text-muted)",
                lineHeight: 1.65,
                maxWidth: "52ch",
              }}
            >
              I&apos;m <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mazwewoh John Brindi N.</strong> — a Cybersecurity Lead,
              SOC analyst, and web pentester. Founder of <strong style={{ color: "var(--accent)" }}>ZIGEX</strong>.
              I think like an attacker to build defenses that actually hold.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animate-fade-up-4 flex flex-wrap gap-3 pt-2">
              <Link href="/projects" className="btn btn-primary">
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
              {/* TODO: Replace href with actual CV PDF path once uploaded */}
              <a
                href="/cv-mazwewoh-john-brindi.pdf"
                download
                className="btn btn-outline"
                style={{ borderColor: "var(--border)" }}
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Quick stats */}
            <div
              className="animate-fade-up animate-fade-up-4 flex flex-wrap gap-6 pt-4"
              style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--space-md)" }}
            >
              {[
                { value: "3+", label: "Years in security" },
                { value: "10+", label: "Projects completed" },
                { value: "500+", label: "ZIGEX users" },
                { value: "CTF", label: "Active competitor" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-display font-bold"
                    style={{ fontSize: "var(--step-2)", letterSpacing: "-.02em" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-small" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Avatar ───────────────────────────── */}
          <div className="hidden md:flex flex-col items-center relative flex-shrink-0">
            {/* Background aura */}
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
                transform: "scale(1.25)",
                zIndex: 0,
              }}
            />

            {/* Avatar frame — large, rectangular with rounded corners */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "320px",
                height: "400px",
                borderRadius: "24px",
                border: "1px solid var(--border-hi)",
                boxShadow: "0 0 0 6px var(--surface), 0 0 60px var(--accent-glow)",
                zIndex: 1,
              }}
            >
              <img
                src="/profile.jpg"
                alt="Mazwewoh John Brindi — DevFest Bamenda 2025"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>

            {/* Floating badges */}
            <div
              className="absolute -bottom-4 -left-8 card flex items-center gap-2 px-3 py-2"
              style={{ zIndex: 2, background: "var(--surface-2)" }}
            >
              <Shield className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span className="text-small font-medium">SOC Analyst</span>
            </div>
            <div
              className="absolute -top-3 -right-8 card flex items-center gap-2 px-3 py-2"
              style={{ zIndex: 2, background: "var(--surface-2)" }}
            >
              <Terminal className="w-4 h-4" style={{ color: "var(--accent-2)" }} />
              <span className="text-small font-medium">Web Pentester</span>
            </div>
            <div
              className="absolute bottom-20 -right-10 card flex items-center gap-2 px-3 py-2"
              style={{ zIndex: 2, background: "var(--surface-2)" }}
            >
              <Network className="w-4 h-4" style={{ color: "#4ade80" }} />
              <span className="text-small font-medium">Founder · ZIGEX</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        aria-hidden
      >
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--border-hi), transparent)" }}
        />
        <span className="text-label" style={{ color: "var(--text-dim)", fontSize: ".65rem" }}>
          scroll
        </span>
      </div>
    </section>
  );
}
