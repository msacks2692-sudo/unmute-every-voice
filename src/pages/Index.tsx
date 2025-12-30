import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Mission from "@/components/Mission";
import Founder from "@/components/Founder";
import Journey from "@/components/Journey";
import Barriers from "@/components/Barriers";
import Impact from "@/components/Impact";
import InteractiveDemo from "@/components/InteractiveDemo";
import PayPalSection from "@/components/PayPalSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { AccessibilityButton } from "@/components/AccessibilityButton";
import DustParticles from "@/components/DustParticles";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import SnowEffect from "@/components/SnowEffect";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <main id="main-content" className="min-h-screen relative">
        <Navbar />
        
        {/* Snow effect */}
        <SnowEffect />
        
        {/* Global dust/bubble particles effect */}
        <div className="fixed inset-0 pointer-events-none z-30">
          <DustParticles />
        </div>
        
        <Hero />
        <Story />
        <Mission />
        <Founder />
        <Journey />
        <Barriers />
        <Impact />
        <InteractiveDemo />
        <PayPalSection />
        <CTA />
        <Footer />
        <AccessibilityButton />
      </main>
    </>
  );
};

export default Index;
