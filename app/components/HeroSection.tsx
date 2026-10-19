import { ArrowRight, Download, MapPin, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const STATS = [
  { value: "4-site", label: "MPLS backbone for CRTV" },
  { value: "50+", label: "Students mentored at SEED" },
  { value: "11", label: "Cisco security certificates" },
];

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">

        {/* Portrait — first on mobile, right column on desktop */}
        <div className="hero-visual animate-fade-up animate-fade-up-1">
          <div className="hero-portrait">
            <div className="hero-portrait-glow" aria-hidden />
            <div className="hero-portrait-frame">
              <Image
                src="/me.jpg"
                alt="Mazwewoh John Brindi, network and infrastructure engineer"
                width={1200}
                height={1800}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 767px) 220px, 400px"
                className="hero-portrait-img"
              />
            </div>

            <div className="hero-badge hero-badge-top">
              <Network className="w-4 h-4" style={{ color: "var(--accent)" }} aria-hidden />
              <span>
                <strong>MPLS L3VPN</strong>
                <small>CRTV · 4 sites</small>
              </span>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <ShieldCheck className="w-4 h-4" style={{ color: "#4ade80" }} aria-hidden />
              <span>
                <strong>Security Lead</strong>
                <small>SOC · Pentesting</small>
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="hero-text">
          <p className="hero-status animate-fade-up animate-fade-up-1">
            <span className="hero-status-dot" aria-hidden />
            Open to opportunities
            <span className="hero-status-loc inline-flex items-center gap-[.45rem]">
              <span className="hero-status-sep" aria-hidden>·</span>
              <MapPin className="w-3.5 h-3.5" aria-hidden />
              Bamenda, Cameroon · Remote
            </span>
          </p>

          <h1 id="hero-title" className="hero-title animate-fade-up animate-fade-up-2">
            <span className="hero-name">Mazwewoh John Brindi</span>
            <span className="hero-headline">
              Network engineer building infrastructure that{" "}
              <span className="gradient-text">stays up and stays secure.</span>
            </span>
          </h1>

          <p className="hero-bio animate-fade-up animate-fade-up-3">
            Network &amp; infrastructure engineer and security lead based in Bamenda, Cameroon. I designed a four-site MPLS L3VPN
            backbone for <strong>CRTV</strong>, build SOC labs with Wazuh and Suricata, founded and lead
            <strong> ZIGEX</strong> as CEO, and teach cybersecurity at <strong>SEED</strong>.
          </p>

          <div className="hero-actions animate-fade-up animate-fade-up-4">
            <Link href="/projects" className="btn btn-primary">
              View projects <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get in touch
            </Link>
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Download className="w-4 h-4" aria-hidden />
              Download CV
            </a>
          </div>

          <dl className="hero-stats animate-fade-up animate-fade-up-4">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat">
                <dt className="hero-stat-label">{s.label}</dt>
                <dd className="hero-stat-value font-display">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
