'use client'; // Add this line at the top

import { useState, useEffect } from 'react';
import { Shield, Code, Award, BookOpen, Mail, Github, Linkedin, Terminal, Lock, Globe, ChevronDown } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'Penetration Testing', level: 90, icon: <Lock className="w-5 h-5" /> },
    { name: 'Network Security', level: 100, icon: <Globe className="w-5 h-5" /> },
    { name: 'Malware Analysis', level: 80, icon: <Terminal className="w-5 h-5" /> },
    { name: 'Security Auditing', level: 88, icon: <Shield className="w-5 h-5" /> },
    { name: 'Web App Security', level: 92, icon: <Code className="w-5 h-5" /> },
  ];

  const routes = [
    { name: 'About Me', icon: <Shield className="w-6 h-6" />, path: '/about', color: 'from-blue-500 to-cyan-500' },
    { name: 'Projects', icon: <Code className="w-6 h-6" />, path: '/projects', color: 'from-purple-500 to-pink-500' },
    { name: 'Blog', icon: <BookOpen className="w-6 h-6" />, path: '/blog', color: 'from-green-500 to-emerald-500' },
    { name: 'Certifications', icon: <Award className="w-6 h-6" />, path: '/certifications', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold">SecOps M. JohnBrindi</span>
          </div>
          <div className="hidden md:flex gap-6">
            {routes.map((route) => (
              <a 
                key={route.path}
                href={route.path} 
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                {route.name}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/johnbrindi/" className="hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mazwewohjohnbrindi/" className="hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/50">
              <span className="text-cyan-400 text-sm font-semibold">🛡️ Security Professional</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">MAZWEOH JOHN BRINDI N.</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A SOC Analyse | Network Administrator | Security Researcher | Pysics&Computer Science tutor
            </p>
            <p className="text-gray-400 leading-relaxed">
              As a cyber security practional, i  am passionate about protecting organizations and individuals in an ever-evolving digital landscape. My strengths in attention to detail, problem-solving, and effective communication and collaboration equip me to tackle complex security challenges efficiently as I have been able to make some progress such as designing an IDS. I am driven by a passion for safeguarding people and systems and am eager to contribute to the security goals of forward-thinking organizations. By leveraging my skills and values, I aim to help organizations meet and exceed their security objectives, creating a safer digital environment for all.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="/projects" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                View Projects
              </a>
              <a href="/contact" className="px-8 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300">
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Profile Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/50">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  {/* <span className="text-6xl">👤</span> */}
               <img src="/pic.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-500/30 animate-bounce">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-purple-500/30 animate-bounce" style={{animationDelay: '0.3s'}}>
                <Terminal className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Core Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-cyan-400">{skill.icon}</div>
                  <span className="font-semibold text-lg">{skill.name}</span>
                  <span className="ml-auto text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{width: `${skill.level}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Explore My Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, idx) => (
              <a
                key={idx}
                href={route.path}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${route.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${route.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {route.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{route.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {route.name === 'About Me' && 'Learn more about my journey and background'}
                    {route.name === 'Projects' && 'Explore my cybersecurity projects and research'}
                    {route.name === 'Blog' && 'Read my writeups and security insights'}
                    {route.name === 'Certifications' && 'View my certifications and achievements'}
                  </p>
                  <div className="mt-4 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2">
                    Explore →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-300 text-lg mb-8">
            Interested in collaborating or need security consultation? Feel free to reach out!
          </p>
          <a href="mailto:johnbrindimazwewoh@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 CyberSec Portfolio. Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}