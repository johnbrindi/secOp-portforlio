import { Shield, Terminal } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/50">
            <span className="text-cyan-400 text-base md:text-lg font-semibold">🛡️ Security Operation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">MAZWEOH JOHN BRINDI N.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
            A SOC Analyst | Network Administrator | Security Researcher | Web Pentester.
          </p>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            As a cyber security practional, I am passionate about protecting organizations and individuals in an ever-evolving digital landscape. My strengths in attention to detail, problem-solving, and effective communication and collaboration equip me to tackle complex security challenges efficiently as I have been able to make some progress such as designing an IDS. I am driven by a passion for safeguarding people and systems and am eager to contribute to the security goals of forward-thinking organizations. By leveraging my skills and values, I aim to help organizations meet and exceed their security objectives, creating a safer digital environment for all.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="/projects" className="px-8 py-3 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              View Projects
            </a>
            <a href="/contact" className="px-8 py-3 text-lg border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300">
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
                <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
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
        {/* You can add a scroll down icon here if needed */}
      </div>
    </section>
  );
}
