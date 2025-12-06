import { Lock, Globe, Terminal, Shield, Code } from 'lucide-react';

const skills = [
  { name: 'Penetration Testing', icon: <Lock className="w-7 h-7" /> },
  { name: 'Network Security', icon: <Globe className="w-7 h-7" /> },
  { name: 'Malware Analysis', icon: <Terminal className="w-7 h-7" /> },
  { name: 'Security Auditing', icon: <Shield className="w-7 h-7" /> },
  { name: 'Web App Security', icon: <Code className="w-7 h-7" /> },
];

export default function SkillsSection() {
  return (
    <section className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Core Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {skills.map((skill, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-6">
              <div className="text-cyan-400">{skill.icon}</div>
              <span className="font-semibold text-2xl">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
