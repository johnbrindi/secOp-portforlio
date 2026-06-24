import { getSkills } from "@/sanity/lib/fetch";
import {
  HeroSection,
  SkillsSection,
  NavigationCards,
  CTASection,
} from "./components";
import FeaturedProjects from "./components/FeaturedProjects";
import CommunitySection from "./components/CommunitySection";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default async function Home() {
  const skills = await getSkills();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <SkillsSection skills={skills} />
        <CommunitySection />
        <NavigationCards />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
