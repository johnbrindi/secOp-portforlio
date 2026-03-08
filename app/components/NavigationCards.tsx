import { User, Code2, BookOpen, Award, ArrowRight } from "lucide-react";

const routes = [
  {
    name: "About",
    description: "Who I am, what shaped me, and how I think about security.",
    icon: User,
    path: "/about",
    accent: "var(--accent)",
  },
  {
    name: "Projects",
    description: "Real work — from IDS design to web exploitation labs.",
    icon: Code2,
    path: "/projects",
    accent: "var(--accent-2)",
  },
  {
    name: "Blog",
    description: "Write-ups, research notes, and honest security takes.",
    icon: BookOpen,
    path: "/blog",
    accent: "var(--accent)",
  },
  {
    name: "Certifications",
    description: "Credentials that validate the hands-on practice.",
    icon: Award,
    path: "/certifications",
    accent: "var(--accent-2)",
  },
];

export default function NavigationCards() {
  return (
    <section className="section">
      <div className="container">

        {/* Section heading */}
        <div className="mb-12">
          <p className="text-label mb-3">Explore</p>
          <h2 className="text-title">
            Everything I do,{" "}
            <span className="gradient-text">in one place</span>
          </h2>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px),1fr))",
          }}
        >
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <a
                key={route.path}
                href={route.path}
                className="card group flex flex-col gap-5 p-6 no-underline"
                style={{ minHeight: "180px" }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `color-mix(in srgb, ${route.accent} 15%, transparent)`,
                    color: route.accent,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="font-display font-semibold mb-1.5"
                    style={{ fontSize: "var(--step-1)" }}
                  >
                    {route.name}
                  </h3>
                  <p
                    className="text-small leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {route.description}
                  </p>
                </div>

                {/* Arrow cue */}
                <div
                  className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: route.accent }}
                >
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
