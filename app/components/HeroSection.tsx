import { Shield, Terminal, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center section pt-[7rem]">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">

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
              I'm <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mazweoh John Brindi N.</strong> — a SOC analyst,
              network administrator, and web pentester who thinks like an attacker
              to build defenses that actually hold.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animate-fade-up-4 flex flex-wrap gap-3 pt-2">
              <a href="/projects" className="btn btn-primary">
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="btn btn-outline">
                Get in Touch
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
          <div className="hidden md:block relative flex-shrink-0">
            {/* Background aura */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
                transform: "scale(1.3)",
                zIndex: 0,
              }}
            />

            {/* Avatar ring */}
            <div
              className="relative w-56 h-56 rounded-full overflow-hidden"
              style={{
                border: "1px solid var(--border-hi)",
                boxShadow: "0 0 0 6px var(--surface), 0 0 40px var(--accent-glow)",
                zIndex: 1,
              }}
            >
              <img
                src="/me.jpg"
                alt="Mazweoh John Brindi"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <div
              className="absolute -bottom-4 -left-6 card flex items-center gap-2 px-3 py-2"
              style={{ zIndex: 2, background: "var(--surface-2)" }}
            >
              <Shield className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <span className="text-small font-medium">SOC Analyst</span>
            </div>
            <div
              className="absolute -top-3 -right-4 card flex items-center gap-2 px-3 py-2"
              style={{ zIndex: 2, background: "var(--surface-2)" }}
            >
              <Terminal className="w-4 h-4" style={{ color: "var(--accent-2)" }} />
              <span className="text-small font-medium">Web Pentester</span>
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
