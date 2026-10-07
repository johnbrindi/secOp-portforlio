import { Shield, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen flex flex-col justify-center section pt-[7rem]">
      <div className="container">
        <div className="hero-grid">

          {/* Left: Text */}
          <div className="hero-text">

            {/* Status pill */}
            <div className="animate-fade-up animate-fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-hi)] bg-[var(--surface-2)]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-label tracking-[.16em]">Open to opportunities</span>
            </div>

            {/* Headline */}
            <h1 className="text-display animate-fade-up animate-fade-up-2" style={{ lineHeight: 1.05 }}>
              Network<br />
              engineer.<br />
              <span className="gradient-text">Security</span><br />
              <span className="gradient-text">defender.</span>
            </h1>

            {/* Sub-copy */}
            <p
              className="animate-fade-up animate-fade-up-3 hero-bio"
            >
              I&apos;m <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mazwewoh John Brindi N.</strong> Enterprise networking and IT infrastructure engineer with hands-on experience designing carrier-grade MPLS backbones, resolving high-stakes network failures, and leading backend system architecture. Mentored 50+ students in networking and cybersecurity at SEED. Networking infrastructure intern at CRTV Yaounde.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animate-fade-up-4 flex flex-wrap gap-3 pt-2">
              <Link href="/projects" className="btn btn-primary">
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>

            {/* Quick stats */}
            <div className="hero-stats animate-fade-up animate-fade-up-4">
              {[
                { value: "50+", label: "Students mentored" },
                { value: "MPLS", label: "L3VPN architect" },
                { value: "CRTV", label: "Network intern" },
              ].map((s) => (
                <div key={s.label} className="hero-stat-item">
                  <p className="hero-stat-value font-display font-bold">
                    {s.value}
                  </p>
                  <p className="text-small" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="hero-avatar-col animate-fade-up animate-fade-up-2">
            <div className="hero-avatar-wrap">
              {/* Subtle ring accent */}
              <div className="hero-avatar-glow" />

              {/* Photo */}
              <div className="hero-avatar-ring">
                <img
                  src="/me.jpg"
                  alt="Mazwewoh John Brindi"
                  className="hero-avatar-img"
                />
              </div>

              {/* Badge: Network Engineer */}
              <div
                className="hero-badge hero-badge-bottom card flex items-center gap-2 px-3 py-2"
                style={{ background: "var(--surface-2)" }}
              >
                <Shield className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-small font-medium">Network Engineer</span>
              </div>

              {/* Badge: Security Defender */}
              <div
                className="hero-badge hero-badge-top card flex items-center gap-2 px-3 py-2"
                style={{ background: "var(--surface-2)" }}
              >
                <Network className="w-4 h-4" style={{ color: "var(--accent-2)" }} />
                <span className="text-small font-medium">Security Defender</span>
              </div>
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
