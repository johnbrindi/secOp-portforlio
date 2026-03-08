import { urlFor } from "@/sanity/lib/image";
import type { Skill } from "@/sanity/types";
import PortableTextContent from "./PortableTextContent";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Core Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-6">
                {skill.iconImage ? (
                  <img
                    src={urlFor(skill.iconImage).width(96).height(96).fit("crop").url()}
                    alt={skill.iconImage.alt || skill.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <span className="text-2xl font-semibold">{skill.title.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-2xl">{skill.title}</span>
                  {skill.category ? (
                    <p className="mt-1 text-sm uppercase tracking-[0.24em] text-cyan-400/80">
                      {skill.category}
                    </p>
                  ) : null}
                </div>
              </div>
              {skill.description?.length ? (
                <PortableTextContent value={skill.description} className="mt-5 text-sm" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
