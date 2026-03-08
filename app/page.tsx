import { getSkills } from "@/sanity/lib/fetch";
import {
  HeroSection,
  SkillsSection,
  NavigationCards,
  CTASection,
  ScrollIndicator,
} from "./components";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default async function Home() {
  const skills = await getSkills();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <HeroSection />
      <ScrollIndicator />
      <SkillsSection skills={skills} />
      <NavigationCards />
      <CTASection />
      <Footer />
    </div>
  );
}
