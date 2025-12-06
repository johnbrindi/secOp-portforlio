
'use client';

import { HeroSection, SkillsSection, NavigationCards, CTASection, ScrollIndicator } from './components';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <HeroSection />
      <ScrollIndicator />
      <SkillsSection />
      <NavigationCards />
      <CTASection />
      <Footer />
    </div>
  );
}