import { Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">Let's Work Together</h2>
        <p className="text-gray-300 text-2xl mb-10">
          Interested in collaborating or need security consultation? Feel free to reach out!
        </p>
        <a href="mailto:johnbrindimazwewoh@gmail.com" className="inline-flex items-center gap-3 px-10 py-5 text-xl bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
          <Mail className="w-7 h-7" />
          Get In Touch
        </a>
      </div>
    </section>
  );
}
