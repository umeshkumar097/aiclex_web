import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "../components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AiSalesAgentHero from "@/components/AISalesHero";
import ValueMarqueeSection from "@/components/ValueMarqueeSection";
import MarketingCards from "@/components/MarketingCards";
import ProcessSteps from "@/components/ProcessSteps";


export default function Home() {
  return (
    <main>
      <Hero />
      {/* <FeatureSection /> */}
      <AiSalesAgentHero />
      <ValueMarqueeSection />
      <MarketingCards />
      <ProcessSteps />
    </main>
  );
}
