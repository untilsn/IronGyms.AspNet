import HeroSection from "./components/HeroSection";
import ProgramsSection from "./components/ProgramsSection";
import TrainersSection from "./components/TrainersSection";
import ParallaxSection from "./components/ParallaxSection";
import TestimonialsSection from "./components/TestimonialsSection";
import MembershipSection from "./components/MembershipSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProgramsSection />
      <TrainersSection />
      <ParallaxSection />
      <TestimonialsSection />
      <MembershipSection />
    </main>
  );
}
