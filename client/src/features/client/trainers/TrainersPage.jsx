import TrainersHero from "./components/TrainersHero";
import TrainerSpotlightCarousel from "./components/TrainerSpotlightCarousel";
import TrainWithUsSection from "./components/TrainWithUsSection";
import MarqueeTicker from "./components/MarqueeTicker";
import WhyChooseSection from "./components/WhyChooseSection";
import SuccessStoriesCarousel from "./components/SuccessStoriesCarousel";

export default function TrainersPage() {
  return (
    <>
      <TrainersHero />
      <TrainerSpotlightCarousel />
      <TrainWithUsSection />
      <MarqueeTicker />
      <WhyChooseSection />
      <SuccessStoriesCarousel />
    </>
  );
}
