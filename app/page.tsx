import { getSkills } from "@/sanity/lib/fetch";
import {
  HeroSection,
  SkillsSection,
  NavigationCards,
  CTASection,
} from "./components";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default async function Home() {
  const skills = await getSkills();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection skills={skills} />
        <NavigationCards />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
