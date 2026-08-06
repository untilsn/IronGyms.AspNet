import MarketingFooter from "../../../components/marketing/MarketingFooter";
import MarketingNavbar from "../../../components/marketing/MarketingNavbar";
import HeroSection from "./components/HeroSection";
import MembershipSection from "./components/MembershipSection";
import ParallaxSection from "./components/ParallaxSection";
import ProgramsSection from "./components/ProgramsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TrainersSection from "./components/TrainersSection";

export default function HomePage() {
  return (
    <div className="bg-base-100 text-base-content antialiased selection:bg-primary selection:text-primary-content">
      <MarketingNavbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <TrainersSection />
        <ParallaxSection />
        <TestimonialsSection />
        <MembershipSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
