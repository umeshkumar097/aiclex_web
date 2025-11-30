import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "../components/Hero";
import AiSalesAgentHero from "@/components/AISalesHero";
import ValueMarqueeSection from "@/components/ValueMarqueeSection";
import MarketingCards from "@/components/MarketingCards";
import ProcessSteps from "@/components/ProcessSteps";
import PartnerSlider from "@/components/PartnerSlider";
import TestimonialSection from "@/components/TestimonialSection";
import TeamSection from "@/components/TeamSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";


export default function Home() {

  
  return (
    <main>
      <Hero />
      <AiSalesAgentHero />
      <ValueMarqueeSection />
      <MarketingCards />
      <ProcessSteps />
      <PartnerSlider />
      <TestimonialSection />
      <TeamSection />
      <NewsletterSection />
      <ContactSection />
     
    
      
    </main>
  );
}
