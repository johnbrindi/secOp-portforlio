import { Shield, Code, BookOpen, Award } from 'lucide-react';

const routes = [
  { name: 'About Me', icon: <Shield className="w-8 h-8" />, path: '/about', color: 'from-blue-500 to-cyan-500' },
  { name: 'Projects', icon: <Code className="w-8 h-8" />, path: '/projects', color: 'from-purple-500 to-pink-500' },
  { name: 'Blog', icon: <BookOpen className="w-8 h-8" />, path: '/blog', color: 'from-green-500 to-emerald-500' },
  { name: 'Certifications', icon: <Award className="w-8 h-8" />, path: '/certifications', color: 'from-orange-500 to-red-500' },
];

export default function NavigationCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Explore My Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {routes.map((route, idx) => (
            <a
              key={idx}
              href={route.path}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-10 border border-gray-700 hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${route.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${route.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {route.icon}
                </div>
                <h3 className="text-3xl font-bold mb-3">{route.name}</h3>
                <p className="text-gray-400 text-lg">
                  {route.name === 'About Me' && 'Learn more about my journey and background'}
                  {route.name === 'Projects' && 'Explore my cybersecurity projects and research'}
                  {route.name === 'Blog' && 'Read my writeups and security insights'}
                  {route.name === 'Certifications' && 'View my certifications and achievements'}
                </p>
                <div className="mt-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2 text-lg">
                  Explore →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
