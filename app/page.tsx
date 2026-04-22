import Image from "next/image";
import { Button } from "@/components/ui/button"
import Hero from "../components/Hero";
import AiSalesAgentHero from "@/components/AISalesHero";
import ValueMarqueeSection from "@/components/ValueMarqueeSection";
import BentoServices from "@/components/BentoServices";
import ProcessSteps from "@/components/ProcessSteps";
import TestimonialSection from "@/components/TestimonialSection";
import TeamSection from "@/components/TeamSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import LatestBlogs from "@/components/LatestBlogs";
import HomeLeadForm from "@/components/HomeLeadForm";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import BlogLeadPopup from "@/components/BlogLeadPopup";

export const dynamic = 'force-dynamic';

export default function Home() {

  
  return (
    <main>
      <Hero />
      <AiSalesAgentHero />
      
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
        <HomeLeadForm 
          title="Start Your AI Journey Today" 
          subtitle="Get a free consultation and customized proposal for your project."
        />
      </div>

      <ValueMarqueeSection />
      <BentoServices />
      <PortfolioSection />
      <ClientsSection />
      <ProcessSteps />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-[#001341] rounded-[3rem] p-1 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center">
                <div className="p-10 md:p-16 md:w-1/2 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Scale faster <br/><span className="text-[#ff914d]">with Aiclex</span></h2>
                    <p className="text-blue-200 mb-8 font-medium">Over 50+ businesses trust us with their digital transformation. Join the elite today.</p>
                </div>
                <div className="p-4 md:p-10 md:w-1/2 w-full">
                    <HomeLeadForm 
                        title="Book a Strategy Call" 
                        subtitle="Or request a Zoom meeting proposal directly."
                        type="Zoom"
                    />
                </div>
            </div>
        </div>
      </section>

      <LatestBlogs />
      <BlogLeadPopup />
      <TestimonialSection />
      <TeamSection />
      {/* <NewsletterSection /> */}
      <ContactSection />
     
    
      
    </main>
  );
}
