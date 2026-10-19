import { urlFor } from "@/sanity/lib/image";
import type { Skill } from "@/sanity/types";
import PortableTextContent from "./PortableTextContent";
import coreSkills from "./skillsData";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">

        {/* Section heading */}
        <div className="mb-12">
          <p className="text-label mb-3">Expertise</p>
          <h2 className="text-title" style={{ maxWidth: "24ch" }}>
            What I bring to{" "}
            <span className="gradient-text">the table</span>
          </h2>
        </div>

        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px),1fr))",
            background: "var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {skills.length === 0 && coreSkills.map((skill) => (
            <div
              key={skill.title}
              className="skill-cell group flex flex-col gap-4 p-6 transition-colors duration-200"
              style={{ background: "var(--surface)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold"
                  style={{
                    background: "var(--accent-glow)",
                    color: "var(--accent)",
                    fontSize: "var(--step-1)",
                  }}
                  aria-hidden
                >
                  {skill.title.charAt(0)}
                </div>
                <div>
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--step-1)" }}
                  >
                    {skill.title}
                  </h3>
                  <p className="text-label mt-0.5" style={{ fontSize: ".65rem" }}>
                    {skill.category}
                  </p>
                </div>
              </div>

              <p className="text-small" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                {skill.summary}
              </p>

              <ul className="flex flex-wrap gap-1.5 mt-auto" aria-label={`${skill.title} tools`}>
                {skill.tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-small px-2 py-0.5 rounded-full"
                    style={{ background: "var(--surface-3)", color: "var(--text-dim)", fontSize: ".68rem" }}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {skills.map((skill) => (
            <div
              key={skill._id}
              className="skill-cell group flex flex-col gap-4 p-6 transition-colors duration-200"
              style={{ background: "var(--surface)" }}
            >
              {/* Icon + title row */}
              <div className="flex items-center gap-4">
                {skill.iconImage ? (
                  <img
                    src={urlFor(skill.iconImage).width(64).height(64).fit("crop").url()}
                    alt={skill.iconImage.alt || skill.title}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      fontSize: "var(--step-1)",
                    }}
                  >
                    {skill.title.charAt(0)}
                  </div>
                )}

                <div>
                  <p
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--step-1)" }}
                  >
                    {skill.title}
                  </p>
                  {skill.category && (
                    <p className="text-label mt-0.5" style={{ fontSize: ".65rem" }}>
                      {skill.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {skill.description?.length ? (
                <PortableTextContent
                  value={skill.description}
                  className="text-small"
                />
              ) : null}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
