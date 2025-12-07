export default function AboutMePage() {
  return (
    <main className="px-4 py-12 max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-40 h-40 mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/50">
          <img src="/pic.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2 text-center">
        MAZWEOH JOHN BRINDI N.
      </h1>
      <h2 className="text-xl text-gray-400 mb-4 text-center">
        SOC Analyst | Network Administrator | Security Researcher | Web Pentester
      </h2>
      <p className="text-gray-400 text-lg text-center mb-8">
        As a cyber security practional, I am passionate about protecting organizations and individuals in an ever-evolving digital landscape. My strengths in attention to detail, problem-solving, and effective communication and collaboration equip me to tackle complex security challenges efficiently as I have been able to make some progress such as designing an IDS. I am driven by a passion for safeguarding people and systems and am eager to contribute to the security goals of forward-thinking organizations. By leveraging my skills and values, I aim to help organizations meet and exceed their security objectives, creating a safer digital environment for all.
      </p>
    </main>
  );
}
