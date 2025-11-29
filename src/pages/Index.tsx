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

const Index = () => {
  return (
    <main className="min-h-screen">
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
  );
};

export default Index;
