import { Mic, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const contributions = [
  {
    id: "devfest",
    title: "DevFest Bamenda 2025",
    role: "Cybersecurity Lead",
    org: "Google Developer Groups",
    description:
      "Led the cybersecurity track at DevFest Bamenda 2025, delivering sessions on practical security for developers and digital empowerment for youth across Cameroon.",
    icon: Mic,
    accentColor: "var(--accent)",
    tags: ["Speaking", "Security Education", "GDG"],
  },
  {
    id: "zigex-community",
    title: "ZIGEX Community Initiative",
    role: "Founder",
    org: "ZIGEX Platform",
    description:
      "Built and scaled a platform serving 500+ students across Cameroon with access to internships, career resources, and professional networking opportunities.",
    icon: Users,
    accentColor: "#4ade80",
    tags: ["Community", "Youth", "Tech Access"],
  },
];

export default function CommunitySection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-label mb-3">Community</p>
            <h2 className="text-title">
              Beyond the <span className="gradient-text">terminal</span>
            </h2>
          </div>
          <Link
            href="/about#community"
            className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 hover:gap-3"
            style={{ color: "var(--accent)" }}
          >
            Full story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {contributions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="card group flex flex-col gap-4 p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `color-mix(in srgb, ${item.accentColor} 14%, transparent)`,
                      color: item.accentColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-small" style={{ color: "var(--accent-2)", fontSize: ".72rem" }}>
                      {item.role} · {item.org}
                    </p>
                  </div>
                </div>

                <p className="text-small leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-small px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--surface-3)",
                        color: "var(--text-dim)",
                        fontSize: ".67rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
