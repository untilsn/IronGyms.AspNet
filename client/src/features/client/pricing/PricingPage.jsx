import PricingHero from "./components/PricingHero";
import PricingGrid from "./components/PricingGrid";
import ComparisonSection from "./components/ComparisonSection";
import PricingCta from "./components/PricingCta";

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PricingGrid />
      <ComparisonSection />
      <PricingCta />
    </main>
  );
}
